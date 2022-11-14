import Category from "../modules/Category.js";
import ApiError from "../../error/ApiError.js";

class CategoryService {
    async addCategory(name) {
        const candidate = await Category.findOne({name});
        if (candidate) {
            throw ApiError.badRequest('Категоряя уже существует');
        }
        return await Category.create({name});
    }

    async getAll() {
        return Category.find();
    }
}

export default new CategoryService();