const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
};

export default function ContactForm({ formData, setFormData, onSubmit, editingId, onCancel }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData(initialForm);
    onCancel?.();
  };

  return (
    <section className="card">
      <h2>{editingId ? 'Cập nhật liên hệ' : 'Thêm liên hệ mới'}</h2>
      <form className="form-grid" onSubmit={onSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Họ và tên"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit">{editingId ? 'Cập nhật' : 'Thêm liên hệ'}</button>
          <button type="button" className="secondary" onClick={handleClear}>
            {editingId ? 'Hủy sửa' : 'Làm mới'}
          </button>
        </div>
      </form>
    </section>
  );
}
