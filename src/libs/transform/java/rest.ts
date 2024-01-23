import { knownTypes } from '../../types'
import { underscore } from 'inflected';

export default function * (json: any, options?: Record<string, any>): Generator<string> {
  const types = knownTypes(json)

  yield `import lombok.RequiredArgsConstructor;`;
  yield `import lombok.extern.slf4j.Slf4j;`;
  yield `import org.springframework.web.bind.annotation.*;`;
  yield ``;

  for (const { name } of types) {
    yield `@Slf4j`;
    yield `@RestController`;
    yield `@RequiredArgsConstructor`;
    yield `@RequestMapping("/${underscore(name)}")`;
    yield `public class ${name}Controller {`;
    yield ``;

    yield `    @GetMapping(value = "")`;
    yield `    public ${name}ListOutput getAll() {`;
    yield `        throw new UnsupportedOperationException();`;
    yield `    }`;
    yield ``;

    yield `    @GetMapping(value = "{id}")`;
    yield `    public ${name}DetailOutput get(@PathVariable Integer id) {`;
    yield `        throw new UnsupportedOperationException();`;
    yield `    }`;
    yield ``;

    yield `    @PostMapping(value = "")`;
    yield `    public Object post(@RequestBody ${name}CreateInput input) {`;
    yield `        throw new UnsupportedOperationException();`;
    yield `    }`;
    yield ``;

    yield `    @PutMapping(value = "{id}")`;
    yield `    public Object put(@PathVariable Integer id, @RequestBody ${name}UpdateInput input) {`;
    yield `        throw new UnsupportedOperationException();`;
    yield `    }`;
    yield ``;

    yield `    @DeleteMapping(value = "{id}")`;
    yield `    public Boolean delete(@PathVariable Integer id) {`;
    yield `        throw new UnsupportedOperationException();`;
    yield `    }`;
    yield `}`;
    yield ``;
  }
}
