import { knownTypes } from '../../types'

export default function * (json: any, options?: Record<string, any>): Generator<string> {
  const types = knownTypes(json)

  for (const { name } of types) {
    yield `// BaseMapper<${name}>`
    yield `import com.baomidou.mybatisplus.core.mapper.BaseMapper;`
    yield `import org.apache.ibatis.annotations.Mapper;`
    yield ``
    yield `@Mapper`
    yield `public interface ${name}Mapper extends BaseMapper<${name}> {`
    yield ``
    yield `}`

    yield ``
    yield `// IService<${name}>`
    yield `import com.baomidou.mybatisplus.extension.plugins.pagination.Page;`
    yield `import com.baomidou.mybatisplus.extension.service.IService;`
    yield ``
    yield `public interface ${name}Repository extends IService<${name}> {`
    yield ``
    yield `}`

    yield ``
    yield `// ServiceImpl<${name}Mapper`
    yield `import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;`
    yield `import org.springframework.stereotype.Service;`
    yield ``
    yield `@Service`
    yield `public class ${name}RepositoryImpl extends ServiceImpl<${name}Mapper, ${name}> implements ${name}Repository {`
    yield ``
    yield `}`

  }
}
