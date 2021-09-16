const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { OAuth, ActionToken } = require('../dataBase');

module.exports = async () => {
    const previousMonth = dayjs.utc('2021-09-17').subtract(1, 'month');

    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await ActionToken.deleteMany({ createdAt: { $lte: previousMonth } })
};
