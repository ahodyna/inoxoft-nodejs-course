const { Book } = require('../dataBase');

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
        const priceFilter = {};

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'author':
                    const authorNameArr = filters.author.split(';');
                    filterObject.author = { $in: authorNameArr }
                    break;
                case 'name':
                    filterObject.name = filters.name;
                    break;
                case 'price.gte':
                    Object.assign(priceFilter, { $gte: +filters['price.gte'] });
                    break;
                case 'price.lte':
                    Object.assign(priceFilter, { $lte: +filters['price.lte'] });
                    break;

            }
        })

          if (Object.keys(priceFilter).length) {
            filterObject.price = priceFilter;
        }

        const books = await Book
            .find(filterObject)
            .limit(+perPage)
            .skip(skip)
            .sort(sort);

        const count = await Book.countDocuments({})

        return {
            data: books,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        }
    }
};
