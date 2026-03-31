# Personal Contact Manager

Project DevOps mini cá nhân gồm:
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Docker + Docker Compose

## Tính năng
- Xem danh sách liên hệ
- Thêm liên hệ
- Sửa liên hệ
- Xóa liên hệ
- Tìm kiếm liên hệ
- Trang thông tin cá nhân `/about`
- Health check `/health`

## Cấu trúc project

```bash
personal-contact-manager/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

## Chạy bằng Docker Compose

```bash
docker compose up --build
```

## Truy cập
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/health

## Chạy local không dùng Docker

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Yêu cầu sửa trước khi nộp
Vào file `frontend/src/pages/About.jsx` để thay:
- MSSV
- Lớp

## Gợi ý commit
- init project structure
- add backend health check and mongodb connection
- create contact crud apis
- build contact management frontend
- add dockerfiles and docker compose
