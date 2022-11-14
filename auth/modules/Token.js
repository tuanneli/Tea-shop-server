import {Schema, model} from "mongoose";

const Token = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
});

export default model("Token", Token);