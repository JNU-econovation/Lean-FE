// 비밀번호 유효성 검사
export const isValidPassword = (password) => {
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialChar.test(password);
};

// 비밀번호 일치 검사
export const doPasswordsMatch = (password, confirm) => {
    return password === confirm;
};

// 에러 메시지 표시
export const showError = (input, message) => {
    const errorDiv = input.parentElement.querySelector('.error-message') 
        || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    
    if (!input.parentElement.querySelector('.error-message')) {
        input.parentElement.appendChild(errorDiv);
    }
};

// 에러 메시지 제거
export const clearError = (input) => {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
};