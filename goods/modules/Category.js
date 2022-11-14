import {Schema, model} from "mongoose";

const Category = new Schema({
    name: {type: String, required: true, unique: true},
});

export default model('Category', Category);