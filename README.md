# E-Mind Platform — 生産管理システム (Production Management System)

Nền tảng quản lý dự án, hợp đồng & tài chính vận hành doanh nghiệp.

## 🚀 Hướng Dẫn Khởi Chạy (Cách Chạy Source)

Dự án là ứng dụng Web tĩnh (HTML5 / Vanilla JS / CSS3), không cần build phức tạp.

### Cách 1: Sử dụng Node.js / npm (Khuyên dùng)
```bash
# Cài đặt hoặc chạy trực tiếp máy chủ dev
npm run dev
```
Trình duyệt sẽ mở tại: **[http://localhost:3001](http://localhost:3001)** (hoặc `http://localhost:3001/login.html`)

### Cách 2: Sử dụng Python
```bash
python -m http.server 3001
```
Mở trình duyệt: **[http://localhost:3001/login.html](http://localhost:3001/login.html)**

### Cách 3: Mở trực tiếp
Mở file `login.html` hoặc `go-admin.html` trực tiếp bằng trình duyệt (Chrome, Edge, Firefox, Safari).

---

## 🔑 Tài Khoản Đăng Nhập Mặc Định

Tất cả tài khoản đều dùng mật khẩu chung: `1234`

| ID tài khoản | Vai trò / Quyền | Mô tả |
| :--- | :--- | :--- |
| **`admin`** | Quản trị viên hệ thống (Admin) | Toàn quyền xem Bàn điều hành doanh nghiệp, dòng tiền, hợp đồng, thành viên |
| **`company`** | Quản trị viên công ty (Company) | Quản lý dự án, thành viên công ty E-Mind |
| **`emind`** | Đầy đủ vai trò (Both) | Hệ thống + Công ty + Quản lý dự án |
| **`company2`** | Đa công ty (Multi-Company) | Quản lý 3 workspace công ty (ABC, Techno, DevStar) |

> 💡 **Mẹo:** Có thể vào nhanh quyền Admin bằng cách mở file **`go-admin.html`**.

---

## 🌟 Các Tính Năng Chính

- 📊 **Executive Dashboard (Bàn điều hành hợp nhất)**: Thống kê doanh thu B2B/B2C, MRR, ARR, LTV, tỷ lệ chuyển đổi.
- 💵 **Sổ dòng tiền & Hợp đồng**: Theo dõi doanh thu theo ngày/tháng, đối soát số ghế/user, tính toán chiết khấu chu kỳ thanh toán.
- 📅 **Quản lý tiến độ & Gantt Chart**: Lịch trình dự án sản xuất, task, tiến độ.
- 👥 **Quản lý tài nguyên & Thành viên**: Phân bổ nhân sự, theo dõi công số.
- 🏢 **Quản lý Công ty & Gói cước (Licensing)**: Quản lý khách hàng doanh nghiệp, lịch sử hợp đồng và giấy phép.
- 💬 **Giao tiếp nội bộ & File sharing**: Trao đổi tin nhắn, tài liệu đính kèm.

---

## 🛠️ Công Nghệ
- **HTML5 & CSS3** (Giao diện tối ưu, thiết kế thương hiệu Teal `#089490`)
- **Vanilla JavaScript** (Hiệu năng cao, phản hồi tức thì, không phụ thuộc nặng nề vào thư viện)
- Không cần cấu hình môi trường phức tạp hay build tool nặng.
