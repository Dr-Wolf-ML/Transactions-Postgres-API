const pg = require('pg');

class Pool {
    _pool = null;

    connect(options) {
        this._pool = new pg.Pool(options);

        // validate connection to DB is working
        return this._pool.query('SELECT 1 + 1;');
    }

    close() {
        return this._pool.end();
    }

    // Prepared Statement
    query(sql, params) {
        return this._pool.query(sql, params);
    }
}

module.exports = new Pool();
