class ContactController {
  index(request, response) {
    // list all registers
    response.status(407).send('Send from Contact Controller');
  }

  show() {
    // get ONE register
  }

  store() {
    // Create a new register
  }

  update() {
    // Edit a register
  }

  delete() {
    // Delete a register
  }
}

module.exports = new ContactController();
