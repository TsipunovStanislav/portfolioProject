import { body } from "express-validator";

export const registerValidator = [
    body(`nickName`, `Такой ник уже существует`).isLength({ min: 6, max: 16}),
    body(`email`, `Неверный формат почты`).isEmail(),
    body(`password`, `Пароль должен содеражть от 5 до 16 символов`).isLength({ min: 5, max: 16}),
    body(`fullName`, `Имя должно содержать от 2 симолов`).isLength({ min: 2, max: 100}),
    body(`avatarUrl`, `Неверная ссылка`).optional().isURL(),
];
export const loginValidator = [
    body(`email`, `Неверный формат почты`).isEmail(),
    body(`password`, `Пароль должен содеражть от 5 до 16 символов`).isLength({ min: 5, max: 16}),
];
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3, max: 30}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тегов').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

// export const deleteValidation = [
//     body(user) = user.fullName, userEmail
// ];