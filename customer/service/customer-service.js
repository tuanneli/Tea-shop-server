import Customer from "../modules/Customer.js";
import History from "../modules/History.js";
import ApiError from "../../error/ApiError.js";
import bcrypt from "bcryptjs";

class CustomerService {
    async register(name, phone) {
        const candidate = await Customer.findOne({phone});
        if (candidate) {
            throw ApiError.badRequest('Такой клиент уже зарегестрирован');
        }
        // const hashPhone = await bcrypt.hash(phone, 5);
        return await Customer.create({name, phone});
    }

    async findOne(phone) {
        const customer = await Customer.findOne({phone}).populate({path: 'history', model: 'History'});
        if (!customer) {
            throw ApiError.badRequest('Такого клиента нет');
        }
        return customer;
    }

    async findAll() {
        return Customer.find();
    }

    async addOrders(orders, historyId, total, phone) {
        const customerData = await Customer.findOne({phone}).populate({path: 'history', model: 'History'});
        await Customer.findOneAndUpdate({phone}, {
            statistic: {total, orders},
            history: [...customerData.history, historyId]
        });
        const customer = await Customer.findOne({phone}).populate({path: 'history', model: 'History'});
        if (!customer) {
            throw ApiError.badRequest('Такого клиента нет');
        }
        return customer;
    }

    async addHistory(history, customerId) {
        const historyData = await History.create({customer: customerId, order: history.order});
        if (!historyData) {
            throw ApiError.badRequest('Ошибка при создании');
        }
        return historyData;
    }
}

export default new CustomerService();