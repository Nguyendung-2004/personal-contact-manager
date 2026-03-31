export default function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <section className="card">
      <div className="section-header">
        <h2>Danh sách liên hệ</h2>
        <span>{contacts.length} liên hệ</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.fullName}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>{contact.address || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="small" onClick={() => onEdit(contact)}>Sửa</button>
                      <button className="small danger" onClick={() => onDelete(contact._id)}>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">Không có liên hệ nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
