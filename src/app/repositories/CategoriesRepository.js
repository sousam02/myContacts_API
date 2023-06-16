const database = require('../../database/index');

class CategoriesRepository {
  async create({ name }) {
    const [row] = await database.query(`
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
    `, [name]);

    return row;
  }

  async findAll() {
    const rows = await database.query(`
        SELECT * FROM categories ORDER BY name
    `);

    return rows;
  }
}

module.exports = new CategoriesRepository();
