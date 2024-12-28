"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const JWT_PASSWORD = "Adarsh@2025";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/app/v1/SignUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.status(200).json({
            message: `Hello User, Your are signed in`
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User of already exists"
        });
    }
}));
app.post("/app/v1/SignIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existngUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (existngUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existngUser._id
        }, JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "incorrect credentials"
        });
    }
}));
app.post("/app/v1/share", (req, res) => {
});
app.get("/app/v1/sharelink", (req, res) => {
});
app.listen(3000, () => {
    console.log("Litsning to port 3000");
});
