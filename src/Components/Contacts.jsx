import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact, updateContact } from '../Services/AllApis';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Contacts({ response }) {
  const [contactList, setContactList] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [showModal, setShowModal] = useState(false); // Modal control

  useEffect(() => {
    getData();
  }, [response]);

  const getData = async () => {
    const result = await getContacts();
    if (result.status === 200) {
      setContactList(result.data);
    } else {
      toast.error('Failed to fetch contacts');
    }
  };

  const delContact = async (id) => {
    const result = await deleteContact(id);
    if (result.status === 200) {
      getData();
      toast.danger('Contact Deleted');
    } else {
      toast.error('Failed to delete contact');
    }
  };

  const handleEdit = (contact) => {
    setEditContact(contact.id);
    setFormData({ name: contact.name, phone: contact.phone, email: contact.email });
    setShowModal(true); // Show the modal when editing
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateContact(editContact, formData);
    if (result.status === 200) {
      setEditContact(null);
      setFormData({ name: '', phone: '', email: '' });
      getData();
      toast.success('Contact Updated');
      setShowModal(false); // Close the modal on success
    } else {
      toast.error('Failed to update contact');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal without submitting
    setEditContact(null);
  };

  return (
    <>
      <h2 className="mt-4 text-center ">Contacts</h2>
      <div className="d-flex justify-content-center p-5 w-100" >
        {contactList.length > 0 ? (

        <div className="table-responsive w-100">
          <table className="table table-striped table-hover table-bordered ">
            <thead className='table-dark'>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((item) => (
                <tr key={item.id}>
                  <td>{item?.name}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.email}</td>
                  <td className='text-center'>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm "
                      onClick={() => delContact(item.id)}
                    >
                      <i
                        className="fa-solid fa-trash-can"
                        style={{ color: '#ff4d00' }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <h2 className="text-center text-danger">No Contacts Added Yet</h2>
        )}
      </div>

      {/* Modal for updating contact */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="info"  onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Contacts;
