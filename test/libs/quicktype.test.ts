import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";

describe('quicktype', () => {

    async function fromJSON(targetLanguage: string, jsonString: string, typeName?: string) {
        const jsonInput = jsonInputForTargetLanguage(targetLanguage);

        // We could add multiple samples for the same desired
        // type, or many sources for other types. Here we're
        // just making one type from one piece of sample JSON.
        await jsonInput.addSource({
            name: typeName ?? "Root",
            samples: [jsonString]
        });

        const inputData = new InputData();
        inputData.addInput(jsonInput);

        return await quicktype({
            inputData,
            lang: targetLanguage
        });
    }

    test('fromJSON', async () => {
        const jsonString = JSON.stringify({ "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false });
        const result = await fromJSON("csharp", jsonString, undefined);
        console.log(result.lines.join('\n'));
    });
});