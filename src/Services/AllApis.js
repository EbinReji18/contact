
import axios from 'axios';
// import { toast } from 'react-toastify';

const base_url="https://contact-server-2wrm.onrender.com"

// Add Contact
export const addContact = async (data) => {
    try {
        const response = await axios.post(`${base_url}/contact`, data);
        if (response.status === 201) {
            // toast.success("Contact added successfully");
        }
        return response;
    } catch (error) {
        // toast.error("Failed to add contact");
        return error.response;
    }
};

// Get All Contacts
export const getContacts = async () => {
    try {
        const response = await axios.get(`${base_url}/contact`);
        if (response.status === 200) {
            return response;
        } else {
            // toast.error("Failed to fetch contacts");
            return response;
        }
    } catch (error) {
        // toast.error("An error occurred while fetching contacts");
        return error.response;
    }
};

// Delete Contact
export const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${base_url}/contact/${id}`);
        if (response.status === 200) {
            // toast.danger("Contact deleted successfully");
        }
        return response;
    } catch (error) {
        // toast.error("Failed to delete contact");
        return error.response;
    }
};

// Update Contact
export const updateContact = async (id, data) => {
    try {
        const response = await axios.put(`${base_url}/contact/${id}`, data);
        if (response.status === 200) {
            // toast.success("Contact updated successfully");
        }
        return response;
    } catch (error) {
        // toast.error("Failed to update contact");
        return error.response;
    }
};