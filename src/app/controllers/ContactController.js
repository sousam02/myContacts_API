/* eslint-disable camelcase */
const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // list all registers
    const contacts = await ContactsRepository.findAll();
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
      return response.status(400).json({ error: 'Email is already been taken' });
    }

    const contact = ContactsRepository.create({
      name, email, number, category_id,
    });

    return response.status(200).json(contact);
  }

  update() {
    // Edit a register
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
