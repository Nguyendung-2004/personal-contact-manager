import Contact from '../models/Contact.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
};

export const searchContacts = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();

    if (!q) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json(contacts);
    }

    const regex = new RegExp(q, 'i');
    const contacts = await Contact.find({
      $or: [{ fullName: regex }, { phone: regex }, { email: regex }, { address: regex }],
    }).sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search contacts', error: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { fullName, phone, email, address } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({ message: 'Full name, phone, and email are required' });
    }

    const contact = await Contact.create({ fullName, phone, email, address });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contact', error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, email, address } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { fullName, phone, email, address },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact', error: error.message });
  }
};
