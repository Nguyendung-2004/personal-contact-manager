import { useEffect, useMemo, useState } from 'react';
import api from '../api';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
};

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/contacts');
      setContacts(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Không tải được danh sách liên hệ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const endpoint = searchTerm.trim()
          ? `/api/contacts/search?q=${encodeURIComponent(searchTerm)}`
          : '/api/contacts';
        const res = await api.get(endpoint);
        setContacts(res.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Tìm kiếm thất bại');
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingId) {
        await api.put(`/api/contacts/${editingId}`, formData);
        setMessage('Cập nhật liên hệ thành công');
      } else {
        await api.post('/api/contacts', formData);
        setMessage('Thêm liên hệ thành công');
      }

      setFormData(initialForm);
      setEditingId('');
      loadContacts();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Thao tác thất bại');
    }
  };

  const handleEdit = (contact) => {
    setFormData({
      fullName: contact.fullName || '',
      phone: contact.phone || '',
      email: contact.email || '',
      address: contact.address || '',
    });
    setEditingId(contact._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa liên hệ này không?');
    if (!confirmed) return;

    try {
      await api.delete(`/api/contacts/${id}`);
      setMessage('Xóa liên hệ thành công');
      loadContacts();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Xóa thất bại');
    }
  };

  const clearEditing = () => {
    setEditingId('');
  };

  const stats = useMemo(() => {
    return {
      total: contacts.length,
    };
  }, [contacts]);

  return (
    <div className="page-grid">
      <div className="left-column">
        <ContactForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancel={clearEditing}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="right-column">
        <section className="stats-row">
          <div className="stat-card">
            <span>Tổng liên hệ</span>
            <strong>{stats.total}</strong>
          </div>
        </section>

        {message && <div className="alert">{message}</div>}

        {loading ? (
          <div className="card">Đang tải dữ liệu...</div>
        ) : (
          <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
