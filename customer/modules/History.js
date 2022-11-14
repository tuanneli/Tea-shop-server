import {model, Schema} from "mongoose";

const History = new Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    order: [{
        name: {type: String, ref: 'Item'},
        price: {type: Number, default: 0},
        amount: {type: Number, default: 0},
    }],
    date: {type: Date, default: Date.now},
});


export default model('History', History);