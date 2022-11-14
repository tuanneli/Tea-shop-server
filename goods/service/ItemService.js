import Item from "../modules/Item.js";
import ApiError from "../../error/ApiError.js";
import Category from "../modules/Category.js";


class ItemService {
    async addItem(name, price, inStock, inAction, amountToAction, category) {
        const candidate = await Item.findOne({name});
        if (candidate) {
            throw ApiError.badRequest('Такой товар уже существует');
        }
        const categoryData = await Category.findOne({name: category});
        if (!categoryData) {
            throw ApiError.badRequest('Такой категории не существует');
        }
        return await Item.create({name, price, inStock, inAction, amountToAction, category: categoryData._id});
    }

    async changeItem(_id, name, price, inStock, inAction, amountToAction, category) {
        const candidate = await Item.findById(_id);
        if (!candidate) {
            throw ApiError.badRequest('Такого товара не существует');
        }
        const categoryData = await Category.findOne({name: category});
        if (!categoryData) {
            throw ApiError.badRequest('Такой категории не существует');
        }
        return Item.findByIdAndUpdate(_id, {
            name: name,
            price: price,
            inStock: inStock,
            inAction: inAction,
            amountToAction: amountToAction,
            category: categoryData._id
        });
    }

    async getItem(name) {
        const item = await Item.findOne({name: {'$regex': `^${name}$`, $options: 'i'}});
        if (!item) {
            throw ApiError.badRequest('Такого товара нет');
        }
        return item;
    }

    async getItems() {
        return Item.find({}).populate({path: 'category', model: 'Category'});
    }

    async deleteItem(name) {
        return Item.findOneAndDelete({name});
    }

    async changeCategory(_id, name) {
        return Category.findByIdAndUpdate(_id, {name});
    }

    async deleteCategory(name) {
        return Category.findOneAndDelete({name});
    }
}

export default new ItemService();