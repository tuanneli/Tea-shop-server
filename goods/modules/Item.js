import {Schema, model} from "mongoose";

const Item = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    inStock: {type: Boolean},
    inAction: {type: Boolean},
    amountToAction: {type: String},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
});

export default model('Item', Item);