import express from "express"
import mongoose from "mongoose";
import * as validation from "./validation.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from "./controllers/userController.js"
import * as postController from "./controllers/postController.js"

mongoose
    .connect('mongodb+srv://CDb:12345@clusterforportfolio.xosqaxc.mongodb.net/')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('DB error', err)); 

const app = express();

app.use(express.json());


app.post('/auth/register', validation.registerValidator, userController.register );
app.post('/auth/login', validation.loginValidator, userController.login);
app.get('/auth/me', checkAuth, userController.getMe);


app.get('/posts', postController.getAll);
app.get('/posts/:id', postController.getOne);
app.post('/posts', checkAuth ,validation.postCreateValidation ,postController.create);
app.delete('/posts/:id', checkAuth ,postController.remove);
app.patch('/posts/:id', postController.update);

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log("Server OK")
})