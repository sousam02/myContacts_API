/* eslint-disable camelcase */
const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

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

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }
    return response.json(contact);
  }

  async store(request, response) {
    // Create a new register
    const {
      name, email, number, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return response.status(400).json({ error: 'Email is already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      number,
      category_id: category_id || null,
    });

    return response.status(201).json(contact);
  }

  async update(request, response) {
    // Edit a register
    const { id } = request.params;

    const {
      name, email, number, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(400).json({ error: 'Contact Not Found' });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'Email is already in use' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      number,
      category_id: category_id || null,
    });

    return response.json(contact);
  }

  async delete(request, response) {
    // Delete a register

    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

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
