const { User } = require('../dataBase');
const { userNormalizator } = require('../utils/user.util')

module.exports = {
    findAll: async (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'role':
                    const rolesArr = filters.role.split(';');
                    filterObject.role = {$in : rolesArr}
                    break;
                case 'email':
                    filterObject.email = filters.email;
                    break;
            }
        })

        const users = await User
            .find(filterObject)
            .limit(+perPage)
            .skip(skip)
            .sort(sort);

        const normalizedUserArr = [];
        for (let i = 0; i < users.length; i++) {
            let userNormalized = userNormalizator(users[i])
            normalizedUserArr.push(userNormalized)
        }

        const count = await User.countDocuments({})

        return {
            data: normalizedUserArr,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        }
    }
};
