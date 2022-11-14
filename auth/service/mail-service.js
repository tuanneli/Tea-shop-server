import nodeMailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            ////// Later make it true
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_APP_PASSWORD,
            }
        })
    }

    async sendActivationLink(user, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.TO_ACTIVATION_LINK,
            subject: "Подтверждение аккаунта",
            text: '',
            html:
                `
                    <div>
                        <h1>Чтобы активировать аккунт нажмите на ссылку</h1>
                        <p>Зарегестрировать пользователя ${user.email}: ${user.name}</p>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

export default new MailService();