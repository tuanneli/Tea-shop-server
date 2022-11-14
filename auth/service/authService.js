import User from "../modules/User.js";
import Role from "../modules/Role.js";
import * as uuid from 'uuid';
import UserDto from "../../dto/userDto.js";
import TokenService from "./tokenService.js";
import tokenService from "./tokenService.js";
import bcrypt from "bcryptjs";
import ApiError from "../../error/ApiError.js";

class AuthService {
    async registration(email, name, password, role) {
        const candidate = await User.findOne({email});
        if (candidate) {
            throw ApiError.badRequest('Пользователь уже зарегестрирован');
        }
        const hashPassword = bcrypt.hashSync(password, 5);
        const activationLink = uuid.v4();
        const userRole = await Role.findOne({value: role});
        const user = await User.create({email, name, password: hashPassword, roles: [userRole.value], activationLink});
        const userDto = new UserDto(user);
        // await MailService.sendActivationLink(userDto, `${process.env.API_URL}/auth/activate/${activationLink}`);
        const tokens = TokenService.generateTokens({userDto});
        await TokenService.saveToken(userDto._id, tokens.refreshToken);
        return {
            user: userDto,
            ...tokens
        }
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.badRequest(`Неверная почта или пароль`);
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw ApiError.badRequest("Неверная почта или пароль");
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({userDto});
        await TokenService.saveToken(userDto._id, tokens.refreshToken);
        return {
            user: userDto,
            ...tokens
        };
    }

    async logout(refreshToken) {
        return TokenService.removeToken(refreshToken);
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink});
        if (!user) {
            throw ApiError.badRequest('Неверная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async findAll() {
        return User.find();
    }

    async deleteOne(email) {
        await User.findOneAndDelete({email});
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.authorizationFailure();
        }
        const userData = await TokenService.validateRefreshToken(refreshToken);
        const token = await TokenService.findToken(refreshToken);
        console.log('-----------in refresh')
        console.log(token?.refreshToken);
        console.log('-------------in refresh')
        if (!userData || !token) {
            throw ApiError.authorizationFailure();
        }
        const user = await User.findById(userData.userDto._id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthService();