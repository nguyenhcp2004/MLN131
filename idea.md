# PROJECT PLAN: INTERACTIVE WEBSITE "HÀNH TRÌNH NHÂN QUYỀN"

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

- **Tên chủ đề:** Nhân quyền trong tiến trình xây dựng Chủ nghĩa xã hội.
- **Thông điệp chủ đạo:** "Hành trình Nhân quyền - Từ Quan niệm đến Hành động".
- **Đối tượng mục tiêu:** Sinh viên, người trẻ (Gen Z).
- **Mục tiêu kỹ thuật:** Xây dựng website Single Page (SPA) có tính tương tác cao, giao diện hiện đại, sử dụng công nghệ nhẹ (HTML/Tailwind CSS/JS).

## 2. VAI TRÒ CỦA AGENT (AGENT ROLE)

Bạn sẽ đóng vai trò là **Senior Full-stack Developer & UX Architect**. Nhiệm vụ của bạn là:

1. Chuyển đổi nội dung lý luận chính trị thành giao diện tương tác trực quan.
2. Viết code sạch, tối giản (Ưu tiên Tailwind CSS và Vanilla JS/Alpine.js để đảm bảo tốc độ).
3. Thiết kế các thành phần tương tác (Interactive Components) mà không cần hệ thống Backend phức tạp.

## 3. CẤU TRÚC CHI TIẾT & LOGIC TƯƠNG TÁC

### Phần 1: Hành trình Lịch sử (Timeline)

- **Hình thức:** Ngang (Horizontal Scroll).
- **Logic:** Sử dụng `Intersection Observer` để kích hoạt hiệu ứng khi cuộn đến các mốc: Nô lệ -> Phong kiến -> Tư bản -> XHCN.
- **Tương tác:** Click vào mỗi mốc hiện Modal/Popup giải thích ngắn gọn.

### Phần 2: Lăng kính Nhân quyền (Comparison)

- **Hình thức:** Split Screen (Màn hình chia đôi).
- **Logic:** Thanh trượt (Slider) ở giữa. Kéo sang trái hiện quan điểm Phương Tây (Cá nhân), kéo sang phải hiện quan điểm Việt Nam (Cộng đồng).
- **Nội dung:** So sánh dựa trên 3 tiêu chí: Trọng tâm, Tiếp cận, Bản chất.

### Phần 3: Bản đồ Thực tiễn (Visualization)

- **Hình thức:** Bản đồ SVG Việt Nam hoặc các Card đại diện cho từng lĩnh vực (Y tế, Giáo dục, An sinh).
- **Tương tác:** Hover/Click để hiện dữ liệu "điểm sáng" (Ví dụ: Tỷ lệ giảm nghèo, độ phủ vaccine).

### Phần 4: Thách thức & Hành động (Gamification)

- **Hình thức:** Quiz trắc nghiệm tình huống.
- **Logic:** Trình bày 3-5 tình huống thực tế (Vd: Phát hiện tham nhũng, phản biện xã hội).
- **Kết quả:** Hiển thị quy trình xử lý theo đúng pháp luật Việt Nam.

## 4. QUY ĐỊNH VỀ NỘI DUNG (CONTENT GUIDELINES)

- **Ngôn ngữ:** Tiếng Việt, văn phong hiện đại, gãy gọn.
- **Tính học thuật:** Phải bám sát nội dung "Tiết 11 - Tiết 17" của giáo trình.
- **Triết lý:** Nhấn mạnh sự thống nhất giữa Quyền và Nghĩa vụ; Dân biết - Dân bàn - Dân làm - Dân kiểm tra - Dân thụ hưởng.

## 5. TECH STACK GỢI Ý (NO-COMPLEXITY)

- **Frontend:** HTML5, Tailwind CSS (via CDN để nhanh).
- **Interactivity:** Alpine.js (cực nhẹ cho việc quản lý state/modal) hoặc Vanilla JS.
- **Animations:** AOS (Animate On Scroll) hoặc Framer Motion (nếu dùng React).
- **Data:** Lưu trữ dạng JSON ngay trong file script.

## 6. LỘ TRÌNH THỰC HIỆN (ROADMAP)

1. **Giai đoạn 1:** Dựng Layout khung với Tailwind CSS.
2. **Giai đoạn 2:** Viết logic cho Timeline và Slider so sánh.
3. **Giai đoạn 3:** Xây dựng bộ câu hỏi Quiz (Gamification).
4. **Giai đoạn 4:** Tối ưu hóa UI/UX trên di động (Responsive).

---

**ACTION REQUIRED:**
Hãy bắt đầu bằng việc tạo ra cấu trúc HTML cơ bản và Navigation Menu cho website này. Sau đó, đề xuất cho tôi giao diện Hero Section có câu hỏi "Bạn hiểu gì về quyền con người?".
