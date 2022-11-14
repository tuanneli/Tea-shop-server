import {Schema, model} from "mongoose";

const Role = new Schema({
    value: {type: String, required: true, default: "USER"}
});

export default model('Role', Role);