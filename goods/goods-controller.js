import CategoryService from "./service/CategoryService.js";
import ItemService from "./service/ItemService.js";

class GoodsController {
    async addItem(req, res, next) {
        try {
            const {name, price, inStock, inAction, amountToAction, category} = req.body;
            const item = await ItemService.addItem(name, price, inStock, inAction, amountToAction, category);
            return res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async changeItem(req, res, next) {
        try {
            const {_id, name, price, inStock, inAction, amountToAction, category} = req.body;
            const item = await ItemService.changeItem(_id, name, price, inStock, inAction, amountToAction, category);
            return res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async getItem(req, res, next) {
        try {
            const {name} = req.body;
            const item = await ItemService.getItem(name);
            return res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async getItems(req, res, next) {
        try {
            const items = await ItemService.getItems();
            return res.status(200).json(items);
        } catch (e) {
            next(e);
        }
    }

    async addCategory(req, res, next) {
        try {
            const {name} = req.body;
            const category = await CategoryService.addCategory(name);
            return res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await CategoryService.getAll();
            return res.status(200).json(categories);
        } catch (e) {
            next(e);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const {name} = req.body;
            await ItemService.deleteItem(name);
            return res.status(200).json('Успешно удалён');
        } catch (e) {
            next(e);
        }
    }

    async changeCategory(req, res, next) {
        try {
            const {_id, name} = req.body;
            const category = await ItemService.changeCategory(_id, name);
            return res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const {name} = req.body;
            await ItemService.deleteCategory(name);
            return res.status(200).json('Успешно удалён');
        } catch (e) {
            next(e);
        }
    }
}

export default new GoodsController();