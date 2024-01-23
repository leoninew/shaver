import { underscore } from 'inflected';
import { knownTypes } from '../../types'

export default function * (json: any, options?: Record<string, any>): Generator<string> {
  const types = knownTypes(json)

  yield 'import axios from "axios";';
  yield '';

  for (const { name } of types) {
    yield `const getAll = async function () {`;
    yield `  let url = \`/api/v2/${underscore(name)}\`;`
    yield `  let resp = await axios.get(url);`
    yield `  return resp.data;`
    yield `};`
    yield ``;


    yield `const get = async function (id: string | number) {`;
    yield `  let url = \`/api/v2/${underscore(name)}/\${id}\`;`
    yield `  let resp = await axios.get(url);`
    yield `  return resp.data;`
    yield `};`
    yield ``;


    yield `const post = async function (input: ${name}CreateInput) {`;
    yield `  let url = \`/api/v2/${underscore(name)}\`;`
    yield `  let resp = await axios.post(url, input);`
    yield `  return resp.data;`
    yield `};`
    yield ``;

    yield `export interface ${name}CreateInput {`;
    yield `};`
    yield ``;


    yield `const put = async function (id: string | number, input: ${name}UpdateInput) {`;
    yield `  let url = \`/api/v2/${underscore(name)}/\${id}\`;`
    yield `  let resp = await axios.put(url, input);`
    yield `  return resp.data;`
    yield `};`
    yield ``;

    yield `export interface ${name}UpdateInput {`;
    yield `};`
    yield ``;


    yield `const remove = async function (id: string | number) {`;
    yield `  let url = \`/api/v2/${underscore(name)}/\${id}\`;`
    yield `  let resp = await axios.delete(url);`
    yield `  return resp.data;`
    yield `};`
    yield ``;

    yield `export interface ${name}Api {`;
    yield `  getAll,`;
    yield `  get,`;
    yield `  post,`;
    yield `  put,`;
    yield `  remove,`;
    yield `};`
    yield ``;
  }
}
