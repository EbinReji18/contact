import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addContact } from '../Services/AllApis';
import { toast } from 'react-toastify';


function Add({ res }) {
    const [show, setShow] = useState(false);
    const [contact, setContact] = useState({ name: '', phone: '', email: '' });
    const [loading, setLoading] = useState(false);

    // Open the modal
    const handleShow = () => setShow(true);

    // Close the modal and reset the form
    const handleClose = () => {
        setShow(false);
        setContact({ name: '', phone: '', email: '' }); // Reset form data when modal closes
    };

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    // Handle contact addition
    const handleAdd = async () => {
        const { name, phone, email } = contact;

        if (!name || !phone || !email) {
            toast.warning('All fields are required');
            return;
        }

        setLoading(true);
        try {
            const result = await addContact(contact);
            if (result.status === 201) {
                toast.success('Contact Added');
                res(result); // Notify parent component of added contact
                handleClose(); // Close modal and reset form on success
            } else {
                toast.error('Adding contact failed');
            }
        } catch (error) {
            toast.error('An error occurred while adding the contact');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='d-grid p-5'>
                <button className='btn btn-outline-info' onClick={handleShow}>
                    Add To Contacts
                </button>
            </div>

            {/* Modal for adding contact */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <input
                            className='form-control mb-3'
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={contact.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='form-control mb-3'
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={contact.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='form-control mb-3'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={contact.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose} disabled={loading}>
                        {loading ? 'Closing...' : 'Close'}
                    </Button>
                    <Button variant="outline-info" onClick={handleAdd} disabled={loading}>
                        {loading ? 'Adding...' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Add;