/* eslint-disable camelcase */
const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    // list all registers
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // get ONE register
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not Found' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    // Create a new register
    const {
      name, email, number, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'Email is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, number, category_id,
    });

    return response.status(200).json(contact);
  }

  async update(request, response) {
    // Edit a register
    const { id } = request.params;

    const {
      name, email, number, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(400).json({ error: 'Contact Not Found' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'Email is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, number, category_id,
    });

    return response.json(contact);
  }

  async delete(request, response) {
    // Delete a register

    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    ContactsRepository.delete(id);

    // 204: No content
    return response.sendStatus(204);
  }
}

module.exports = new ContactController();
