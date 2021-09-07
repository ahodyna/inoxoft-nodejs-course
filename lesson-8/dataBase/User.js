const { Schema, model } = require('mongoose');
const dataBaseTablesEnum = require('../configs/dataBaseTables.enum');
const userRolesEnum = require('../configs/userRoles.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.USER, userSchema);
