const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Import the server instance
const { expect } = chai;

chai.use(chaiHttp);

describe('Items API', () => {
  // Test for GET /api/items
  it('should GET all items', (done) => {
    chai.request(server) // Pass the server instance
      .get('/api/items')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test for POST /api/items
  it('should POST a new item', (done) => {
    const newItem = {
      name: 'Test Item',
      description: 'This is a test item',
      price: 19.99,
    };
    chai.request(server) // Pass the server instance
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(newItem.name);
        done();
      });
  });

  // Test for PUT /api/items/:id
  it('should UPDATE an existing item', (done) => {
    const updatedItem = {
      name: 'Updated Item',
      description: 'This is an updated item',
      price: 29.99,
    };
    chai.request(server) // Pass the server instance
      .put('/api/items/1') // Assuming an item with ID 1 exists
      .send(updatedItem)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Item updated');
        done();
      });
  });

  // Test for DELETE /api/items/:id
  it('should DELETE an item', (done) => {
    chai.request(server) // Pass the server instance
      .delete('/api/items/1') // Assuming an item with ID 1 exists
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Item deleted');
        done();
      });
  });
});
