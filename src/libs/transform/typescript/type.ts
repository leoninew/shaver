import { isObject, knownTypes } from '../../types';

export default function * (json: any, options?: Record<string, any>): Generator<string> {
  const types = knownTypes(json)
  for (const { name, type} of types) {
    const isObjectType = isObject(type)
    if (!isObjectType) {
      continue
    }

    yield (`export interface ${name} {`)
    const typeMap = type as Record<string, string>
    const typeMembers = Object.keys(typeMap)
    for (const member of typeMembers) {
      yield(`  ${member}: ${typeMap[member]}`)
    }
    yield(`}\n`)
  }
}
