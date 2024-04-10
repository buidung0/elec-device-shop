# Website Bán Đồ Điện Tử

## Giới thiệu
Đây là một website bán đồ điện tử, được phát triển bằng ngôn ngữ lập trình JavaScript và framework Express.js, sử dụng cơ sở dữ liệu MongoDB để lưu trữ thông tin sản phẩm và người dùng.

## Các Chức Năng Chính
1. **Đăng Nhập và Đăng Ký**
   - Đăng Nhập: Người dùng có thể đăng nhập vào tài khoản của họ bằng email và mật khẩu đã đăng ký trước đó. Sử dụng JWT (JSON Web Tokens) để xác thực và quản lý phiên làm việc.
   - Đăng Ký: Người dùng mới có thể tạo tài khoản bằng cách cung cấp thông tin cần thiết như tên, email, mật khẩu và xác nhận đăng ký qua email.

2. **Tìm Kiếm Sản Phẩm**
   - Tìm Kiếm Nâng Cao: Người dùng có thể tìm kiếm sản phẩm theo nhiều tiêu chí như loại sản phẩm, thương hiệu, giá cả, và nhiều hơn nữa. Sử dụng tính năng tìm kiếm đa tiêu chí để cải thiện trải nghiệm người dùng.
   - Bộ Lọc Kết Quả: Cung cấp bộ lọc để người dùng thu hẹp kết quả tìm kiếm dựa trên các yếu tố như mức giá, thương hiệu, đánh giá, và một số tiêu chí khác.

3. **Xem Chi Tiết Sản Phẩm**
   - Thông Tin Chi Tiết: Hiển thị thông tin đầy đủ về sản phẩm bao gồm mô tả, hình ảnh, giá cả, và các đặc điểm kỹ thuật.
   - Đánh Giá và Nhận Xét: Người dùng có thể xem đánh giá và nhận xét từ các người dùng khác để đưa ra quyết định mua hàng. Cung cấp chức năng đánh giá và nhận xét sản phẩm để tạo lòng tin cho người dùng.

4. **Giỏ Hàng và Thanh Toán**
   - Thêm Vào Giỏ Hàng: Cho phép người dùng thêm sản phẩm vào giỏ hàng và điều chỉnh số lượng mua. Sử dụng cơ chế lưu trữ tạm thời để lưu trữ thông tin giỏ hàng của người dùng.
   - Thanh Toán An Toàn: Cung cấp giao diện thanh toán an toàn và thuận tiện thông qua các phương thức thanh toán trực tuyến phổ biến như PayPal.

5. **Quản Lý Tài Khoản**
   - Thông Tin Tài Khoản: Người dùng có thể cập nhật thông tin cá nhân như địa chỉ giao hàng, thông tin thanh toán, và mật khẩu.
   - Lịch Sử Đơn Hàng: Hiển thị lịch sử các đơn hàng đã đặt và trạng thái của chúng.
