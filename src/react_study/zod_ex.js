import z from "zod";

function validateAndLog(schema, value) {
    try {
        const result = schema.parse(value);
        console.log("성공: ", result)
    } catch (err) {
        console.log(`에러: ${err} | 입력값: ${value}`)
    }
}

const nameSchema = z.string("문자열이어야 해!!")

validateAndLog(nameSchema, [1, 2, 3])

const emailSchema = z.email();

validateAndLog(emailSchema, "abc@abc.com")