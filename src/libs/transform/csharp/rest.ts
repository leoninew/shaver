import { knownTypes } from '../../types'

export default function * (json: any, options?: Record<string, any>): Generator<string> {
  const types = knownTypes(json)

  for (const { name } of types) {
    yield `[ApiController]")]`;
    yield `[Route("[controller]")]`;
    yield `public class ${name}Controller : ControllerBase`;
    yield `{`;

    yield `    [HttpGet]`;
    yield `    public ${name}ListOutput GetAll()`;
    yield `    {`;
    yield `        throw new NotImplementException();`;
    yield `    }`;
    yield ``;

    yield `    [HttpGet]`;
    yield `    public ${name}DetailOutput Get(Int32 id)`;
    yield `    {`;
    yield `        throw new NotImplementException();`;
    yield `    }`;
    yield ``;

    yield `    [HttpPost]`;
    yield `    public Object Post([FromBody] ${name}CreateInput input)`;
    yield `    {`;
    yield `        throw new NotImplementException();`;
    yield `    }`;
    yield ``;

    yield `    [HttpPut]`;
    yield `    [Route("{id}")]`;
    yield `    public Object Put(Int32 id, [FromBody] ${name}UpdateInput input)`;
    yield `    {`;
    yield `        throw new NotImplementException();`;
    yield `    }`;
    yield ``;

    yield `    [HttpDelete]`;
    yield `    [Route("{id}")]`;
    yield `    public Boolean Delete(Int32 id)`;
    yield `    {`;
    yield `        throw new NotImplementException();`;
    yield `    }`;
    yield `}`;
    yield ``;
  }
}
