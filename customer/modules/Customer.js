import {Schema, model} from "mongoose";

const Customer = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    statistic: {
        total: {type: Number, default: 0},
        orders: [{
            name: {type: String, ref: 'Item'},
            amount: {type: Number, default: 0},
        }],
    },
    history: [{type: Schema.Types.ObjectId, ref: 'History'}],
});

export default model('Customer', Customer);

