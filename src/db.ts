import mongoose, { model, Schema } from "mongoose";
import { string } from "zod";
// import mongoose from "mongoose";

mongoose.connect("mongodb+srv://adarsh:adarsh2025@cluster0.axypt.mongodb.net/second-brain")

const UserSchema = new Schema ({
    username: {type: String, unique: true},
    password: String
})

//HERE THIS LINE IS CREATING "USER" SECTION IN OUR LOCAL db WHICH CONTAIN UserSchema ie, USERNAME AND PASSWORD
export const UserModel = model("User", UserSchema);


const ContentSchema = new Schema({
    title: String,
    link: URL,
    tags: ({type: mongoose.Types.ObjectId, ref: 'Tag'}),
    user_id: ({type: mongoose.Types.ObjectId, ref: 'User', required: true})
})

export const ContentModel = model("Content", ContentSchema)

