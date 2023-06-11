/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Moises',
    email: 'moises@gmail.com',
    phone: 12341234,
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'José',
    email: 'jose@gmail.com',
    phone: 12344234,
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(
        contacts.find((contact) => (id === contact.id)),
      );
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(
        contacts.find((contact) => (email === contact.email)),
      );
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create({
    name, email, number, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(), name, email, number, category_id,
      };
      contacts.push(
        newContact,
      );

      resolve({
        newContact,
      });
    });
  }
}

module.exports = new ContactRepository();
