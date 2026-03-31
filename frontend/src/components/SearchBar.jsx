export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <section className="card">
      <h2>Tìm kiếm liên hệ</h2>
      <input
        type="text"
        placeholder="Nhập tên, số điện thoại, email hoặc địa chỉ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </section>
  );
}
