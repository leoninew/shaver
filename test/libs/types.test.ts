import { Container } from "../../src/libs/types";

describe('parse', () => {
    const parse = function (json: any) {
        const container = new Container(json, "root");
        container.parse();
        console.log(container.toFragment('ts'));
    };


    test('parse simple object', () => {
        parse({
            "streetAddress": "21 2nd Street",
            "city": "New York",
            "state": "NY",
            "postalCode": "10021"
        });
    });

    test('parse nest object', () => {
        parse({
            "firstName": "John",
            "lastName": "Smith",
            "sex": "male",
            "age": 25,
            "address": {
                "streetAddress": "21 2nd Street",
                "city": "New York",
                "state": "NY",
                "postalCode": "10021"
            }
        });
    });

    test('parse simple array', () => {
        parse(["Wuhan", "Beijing"]);
    });

    test('parse nest array', () => {
        parse([[{ "a": { "name": 1 } }]]);
    });

    test('parse simple object array', () => {
        parse([
            {
                "type": "home",
                "number": "212 555-1234"
            },
            {
                "type": "fax",
                "number": "646 555-4567"
            }]);
    });

    test('parse complex object', () => {
        const json = {
            "firstName": "John",
            "lastName": "doe",
            "age": 26,
            "address": {
                "streetAddress": "naist street",
                "city": "Nara",
                "postalCode": "630-0192"
            },
            "phoneNumbers": [
                {
                    "type": "iPhone",
                    "number": "0123-4567-8888"
                },
                {
                    "type": "home",
                    "number": "0123-4567-8910"
                }
            ]
        };
        parse(json);
    });
})