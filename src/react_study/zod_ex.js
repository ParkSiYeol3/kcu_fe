import z from "zod";

function validateAndLog(schema, value) {
    try {
        const result = schema.parse(value);
        console.log("성공: ", result)
    } catch (err) {
        console.log(`에러: ${err} | 입력값: ${value}`)
    }
}

// const nameSchema = z.string("문자열이어야 해!!")

// validateAndLog(nameSchema, [1, 2, 3])

// const emailSchema = z.email();

// validateAndLog(emailSchema, "abc@abc.com")

// const userSchema = z.object({
//     name: z.string("obj: name은 문자열"),
//     age: z.number()
// })

// validateAndLog(userSchema, `{name: 13, age: '15}`)

// const bookSchema = z.object({
//     title: z.string().min(2).max(20),
//     publishYear: z.number().min(1900).max(2025)
// })

// validateAndLog(bookSchema, {title: "귀멸의 칼날", publishYear: 2018})
// validateAndLog(bookSchema, {title: "박시열", publishYear: 2001})

// const signupSchema = z.object({
//     email: z.email("올바른 이메일 형식이 아닙니다."),
//     password: z.string()
//     .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
//     .regex(/[[!@#$%^&*()]]/, "특수문자를 포함해야 합니다.")
//     .regex(/[0-9]/, "숫자를 포함해야 합니다.")
//     .regex(/[a-zA-Z]/, "영문자를 포함해야 합니다."),
//     passwordConfirm: z.string()
// }).refine((d) => d.password === d.passwordConfirm, {
//     message:"비밀번호 불일치",
//     path: ['passwordConfirm']
// })

// validateAndLog(signupSchema, {
//   email: "test@test.com",
//   password: "123",
//   passwordConfirm: "abc123!@"
// })

// - 연습문제 2 - 상품 등록
//     - `productName`: 문자열, 3~10자
//     - `price`: 숫자, 0 이상
//     - `stock`: 숫자, 0 이상
//     - `seller_email`: 이메일
//     - **추가 조건**: `price >= 30000` 이면 `stock >= 1`
//         - 위반 시 에러 경로는 `stock`

const productSchema = z.object({
  productName: z.string().min(3).max(10),
  price: z.number().min(0),
  stock: z.number().min(0),
  seller_email: z.email(),
}).refine((d)=>{
  if (d.price >= 30000) {
    return d.stock >= 1
  }
  return true;
}, {
  message: "가격이 30000원 이상이면 재고가 1 이상이어야 합니다.",
  path: ['stock']
})

validateAndLog(productSchema, {
  productName:"만연필",
  price: 30000,
  stock: 1,
  seller_email: "abc@def.com"
})