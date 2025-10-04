# TaskNest-MERN
Mini Project Quản lý Công việc Cá nhân (Personal Task Management)

---
## Hướng dẫn sử dụng sau khi clone dự án về
---

### 1. Yêu cầu môi trường (Prerequisites)
- **Node.js** >= 16.x  
- **npm** >= 8.x  
- **MongoDB** (cài local hoặc sử dụng **MongoDB Atlas**)  
- **Git** (để clone repository)

---

### 2. Cài đặt Backend

1. Mở terminal và chuyển vào thư mục backend:
    ```bash
    cd server
    ```

2. Cài đặt dependencies:
    ```bash
    npm install
    ```

3. Tạo file `.env` trong thư mục `backend` với nội dung ví dụ:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/tasknest
    ```

4. Chạy server backend:
    - Chạy với chế độ dev (tự reload khi sửa code):
      ```bash
      npm run dev
      ```
    - Hoặc chạy bình thường:
      ```bash
      npm start
      ```
    - Hoặc chạy với node:
      ```bash
      node server.js
      ```

---

### 3. Cài đặt Frontend

1. Mở terminal mới, chuyển vào thư mục frontend:
    ```bash
    cd client
    ```

2. Cài đặt dependencies:
    ```bash
    npm install
    ```

3. Chạy ứng dụng React:
    ```bash
    npm run dev
    ```

---

### 4. Truy cập website

Mở trình duyệt và truy cập:  
[http://localhost:5173/](http://localhost:5173/)

![Homepage](client/public/homepage.png)
![ThongKe](client/public/thongke.png)

---

### 5. Lưu ý (Notes)

- Đảm bảo backend chạy ở **cổng 5000** (hoặc cập nhật API endpoint trong frontend nếu đổi cổng).  
- Nếu sử dụng **MongoDB Atlas**, thay đổi `MONGO_URI` trong file `.env` cho phù hợp.  
- Nếu gặp lỗi **CORS**, kiểm tra cấu hình `cors` trong backend.  
- Nên cài **nodemon** toàn cục để tự reload khi code backend thay đổi:  
  ```bash
  npm install -g nodemon

---
Dưới đây là phiên bản được trình bày lại đẹp hơn và chuyên nghiệp hơn cho mục **Triển khai web TaskNest trên Vercel**:

---

### 🚀 6. Triển khai dự án TaskNest trên Vercel

🔗 **Link truy cập website:**  
👉 [https://task-nest-mern-zfa9.vercel.app/](https://task-nest-mern-zfa9.vercel.app/)

📌 **Giới thiệu nhanh:**  
TaskNest là nền tảng quản lý công việc cá nhân, hiển thị thống kê nhiệm vụ theo dạng biểu đồ (thanh ngang, tròn, đường) và theo dõi tiến độ hoàn thành. Hiện tại, chưa có nhiệm vụ nào được thêm vào hệ thống.

---

### 📅 7. Kế hoạch & Tiến độ triển khai dự án

#### 🔗 Timeline dự án trên Jira  
👉 [Xem timeline tại đây](https://student-team-vnphuphm.atlassian.net/jira/software/projects/L0MPNP/boards/232/timeline)

#### 📊 Biểu đồ luồng tích lũy (Cumulative Flow Diagram)  
👉 [Xem biểu đồ tại đây](https://student-team-vnphuphm.atlassian.net/jira/software/projects/L0MPNP/boards/232/reports/cumulative?atlOrigin=eyJpIjoiN2Q4ZjZhNTAwZGNkNDdhNjgzOGY2OTBmOGUyNWE0OWEiLCJwIjoiaiJ9)

#### 📁 Báo cáo tiến độ (.csv)  
👉 [Tải file báo cáo tại đây](https://drive.google.com/file/d/1aNGZjWRiV5P2qxpGkAVX5ttaxhvbcJp1/view?usp=sharing)

---



---