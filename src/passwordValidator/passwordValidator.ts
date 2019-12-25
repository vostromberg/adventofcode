export interface IPasswordValidationResult {
    isValid: boolean;
    hasValidFormat: boolean;
    hasTwoAdjacentDigits: boolean;
    doesntDecrease: boolean;
}

export const isValidPassword = (password: string): IPasswordValidationResult => {
    let result: IPasswordValidationResult = {
        isValid: false,
        hasValidFormat: hasValidFormat(password),
        hasTwoAdjacentDigits: hasTwoAdjacentDigits(password),
        doesntDecrease: doesntDecrease(password)
    };
    result.isValid = result.hasValidFormat && result.hasTwoAdjacentDigits && result.doesntDecrease;
    return result;
}

export const hasValidFormat = (password: string) => {
    return /^\d{6}$/.test(password);
}

export const hasTwoAdjacentDigits = (password: string) => {
    return /(?:^|(?<=(.)))(?!\1)(.)\2{1}(?!\2)/.test(password);
    //return /(\d)\1/.test(password);
}

export const hasAdjacentPairs = (password: string) => {

    const adjacentNumbers = [];
    let lastDigit: string = "";
    let currenDigitCount = 1;
    for (var i = 0; i < password.length; i++) {
        let currentDigit = password[i];
        if (currentDigit === lastDigit) {
            currenDigitCount++;
        }
        else{
            if(currenDigitCount > 1){
                adjacentNumbers.push(currenDigitCount);
            }
            currenDigitCount = 1;
        }
        lastDigit = currentDigit;
    }
    return adjacentNumbers.filter(x => x < 3).length > 0;
}

export const doesntDecrease = (password: string) => {
    let lastNumber = parseInt(password[0]);
    for (var i = 1; i < password.length; i++) {
        if (parseInt(password[i]) < lastNumber) {
            return false;
        }
        lastNumber = parseInt(password[i]);
    }
    return true;
}