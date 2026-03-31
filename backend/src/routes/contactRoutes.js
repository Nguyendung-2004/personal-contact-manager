import express from 'express';
import {
  createContact,
  deleteContact,
  getContacts,
  searchContacts,
  updateContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getContacts);
router.get('/search', searchContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
