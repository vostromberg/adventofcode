import { isValidPassword } from "./passwordValidator";

describe("passwordValidator", () => {
    test("111111 is valid", ()=>{
        const result = isValidPassword("111111", true);
        expect(result.isValid).toBe(true);
    });
    test("223450 is not valid", () => {
        const result = isValidPassword("223450", true);;
        expect(result.isValid).toBe(false);
    });
    test("123789 is not valid", () => {
        const result = isValidPassword("123789", true);
        expect(result.isValid).toBe(false);
    })

    test("112233 is valid", () => {
        const result = isValidPassword("112233");
        expect(result.isValid).toBe(true);
    })
    test("123444 is not valid", () => {
        const result = isValidPassword("123444");
        expect(result.isValid).toBe(false);
    })
    test("111122 is valid", () => {
        const result = isValidPassword("111122");
        expect(result.isValid).toBe(true);
    })
    test("112345 is valid", () => {
        const result = isValidPassword("112345");
        expect(result.isValid).toBe(true);
    })
})