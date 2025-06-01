export const VALIDATION_REQUIRED = 'Обязательное поле';
export const VALIDATION_NUMBER_PATTERN = {
    value: /^\d{1,10}$/,
    message: 'Должно быть числом. До 10 цифр.',
};

export const VALIDATION_STRING_PATTERN = {
    value: /^[a-zA-Zа-яА-ЯёЁ0-9-]{1,23}$/,
    message: 'Допустимы буквы (русские и латинские), цифры и дефис. До 23 символов.',
};


export const VALIDATION_EMAIL_PATTERN = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    message: 'Введите корректный email.',
};

export const VALIDATION_NAME_FILED_PATTERN = {
    value: /^[a-zA-Z0-9]{1,23}$/,
    message: 'Допустимы латинские буквы, цифры. До 23 символов.',
};