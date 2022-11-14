export default class UserDto {
    _id;
    email;
    name;
    roles;
    activationLink;
    isActivated;

    constructor(model) {
        this._id = model.id;
        this.email = model.email;
        this.name = model.name;
        this.roles = model.roles;
        this.activationLink = model.activationLink;
        this.isActivated = model.isActivated;
    }
};