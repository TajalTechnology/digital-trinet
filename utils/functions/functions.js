const { _response } = require('../../utils/functions/response');

module.exports = {

    /* PAGINATION */
    getPagination: (page, size) => {

        const limit = size ? +size : 10;
        const offset = page - 1 ? (page - 1) * limit : 0;
        console.log('limit:' + limit, 'offset' + offset);
        return { limit, offset };

    },

    /* PAGINATION FORMAT */
    getPagingData: (data, page, limit) => {

        const { count: totalItems, rows: records } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, totalPages, currentPage, records };

    }
}