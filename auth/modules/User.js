import {model, Schema} from "mongoose";

const User = new Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, unique: true, required: true},
});

export default model('User', User);