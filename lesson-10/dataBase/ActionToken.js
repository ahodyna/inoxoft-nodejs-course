const { Schema, model } = require('mongoose');
const dataBaseTablesEnum = require('../configs/dataBaseTables.enum');

const ActionTokenSchema  = new Schema({
    token:{
        type: String,
        required: true
    },
    [dataBaseTablesEnum.USER]:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseTablesEnum.USER
    },

}, {timestamps: true});

module.exports = model(dataBaseTablesEnum.ACTION_TOKEN, ActionTokenSchema ) 