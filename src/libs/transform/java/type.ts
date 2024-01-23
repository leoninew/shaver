import { camelize } from 'inflected';
import { isObject, knownTypes, Types } from "../../types";

const JavaTypes: Record<string, string> = {
  [Types.Empty]: 'Object',
  [Types.String]: 'String',
  [Types.Number]: 'Integer',
  [Types.Boolean]: 'Boolean',
};

const getTargetType = (originalType: string) => {
  return JavaTypes[originalType] ?? originalType
}

const getListType = (originalType: string): string => {
  let typeName = originalType;
  let depth = 0;
  while (typeName.endsWith('[]')) {
    typeName = typeName.substring(0, typeName.length - 2);
    depth += 1;
  }

  let targetType = getTargetType(typeName);
  for (let i = 0; i < depth; i++) {
    targetType = `List<${targetType}>`;
  }
  return targetType;
}

export default function* (json: any, options?: Record<string, any>): Generator<string> {
  const types = knownTypes(json);
  const keepBrief = options?.keepBrief;
  const useJackson = options?.useJackson;
  const useLombok = options?.useLombok;

  const headers = [];
  const classes = [];
  let jsonPropertyUsed = 0;
  let listUsed = 0;

  for (const { name, type } of types) {
    const isObjectType = isObject(type);
    if (!isObjectType) {
      continue;
    }

    if (useLombok) {
      classes.push(`@Data`);
    }
    classes.push(`public class ${name} {`);
    const typeMap = type as Record<string, string>;
    const typeMembers = Object.keys(typeMap);
    for (const member of typeMembers) {
      const originalType = typeMap[member];
      let targetType;
      if (originalType.endsWith('[]')) {
        listUsed += 1;
        targetType = getListType(originalType);
      } else {
        targetType = getTargetType(originalType);
      }

      const memberName = camelize(member, false);
      const useOriginalName = (keepBrief && memberName === member) || !useJackson;

      if (useOriginalName) {
        classes.push(`    private ${targetType} ${member};`);
        continue;
      }

      if (useJackson) {
        if (keepBrief) {
          if (memberName !== member) {
            const lowerName = camelize(memberName, false);
            if (lowerName !== member) {
              classes.push(`    @JsonProperty("${member}")`);
              jsonPropertyUsed += 1;
            }
          }
        } else {
          classes.push(`    @JsonProperty("${member}")`);
          jsonPropertyUsed += 1;
        }
      }
      classes.push(`    private ${targetType} ${memberName};`);
    }

    if (!useLombok) {
      for (const member of typeMembers) {
        const memberType = typeMap[member];
        const targetType = JavaTypes[memberType] ?? memberType;
        const targetTypeName = targetType.endsWith('[]') ? getListType(targetType) : targetType;
        const memberName = camelize(member, false);
        const upperMemberName = camelize(member);

        classes.push(`    `);
        classes.push(`    public ${targetTypeName} get${upperMemberName}() {`);
        classes.push(`        return this.${memberName};`);
        classes.push(`    }`);
        classes.push(`    `);
        classes.push(`    public void set${upperMemberName}(${targetTypeName} ${memberName}) {`);
        classes.push(`        this.${memberName} = ${memberName};`);
        classes.push(`    }`);

      }
    }
    classes.push(`}\n`);
  }

  if (jsonPropertyUsed) {
    headers.push(`import com.fasterxml.jackson.annotation.JsonProperty;`);
  }
  if (useLombok) {
    headers.push(`import lombok.Data;`);
  }
  if (listUsed) {
    headers.push('');
    headers.push(`import java.util.List;`);
  }
  if (headers.length > 0) {
    headers.push('');
  }

  for (const line of headers) {
    yield line;
  }

  for (const line of classes) {
    yield line;
  }
}
