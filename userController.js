import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator";
import userModel from "../models/user.js"

export const register = async(req, res) => {
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);


    const doc = new userModel({
        nickName: req.body.nickName,
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,

    })

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    },
    `12345`,
    {
        expiresIn: '30d',
    },
);


    const {passwordHash, ...userData} = user._doc;


    res.json({
        ...userData,
        token
    });
} catch(err) {
    console.log(err);
    res.status(500).json({
        message: 'Пользователь с такой почтой уже существует',
    });
}


}

export const login = async (req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }


        const token = jwt.sign({
            _id: user._id,
        },
        `12345`,
        {
            expiresIn: '30d',
    },
);

    const {passwordHash, ...userData} = user._doc;

    res.json({
        ...userData,
        token,
    });

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удвлось авторизоваться',
        });
    }
}

export const getMe = async (req, res) => {
    try{ 
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        };

        const { passwordHash, ...userData } = user._doc;

    res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
}
