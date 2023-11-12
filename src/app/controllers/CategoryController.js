const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    return response.status(200).json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    return response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not found' });
    }

    const category = await CategoriesRepository.update(id, { name });

    return response.status(200).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const categoryExists = CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not found' });
    }

    CategoriesRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();
