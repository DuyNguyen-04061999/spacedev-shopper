# Lời khuyên


1. Don't Repeat yourself (DRY): Đừng viết lại những gì đã làm rồi

2. Chú ý vào UI/UX:

    - Validate khi làm việc với form

    - Form/Button trong form nên có trạng thái loading

    - Hạn chế thay đổi chiều cao khi các element thay đổi trạng thái từ loading -> data

    - Sử dụng URL Search Params hợp lý, tránh việc lưu vào 1 store nào đó

3. Không sử dụng redux khi không cần thiết, chỉ sử dụng khi lưu global state và xử lý side effect phức tạp

4. Sử dụng useQuery để thực thi các api và tùy chọn storeDriver phù hợp trong trường hợp cần cache hoặc lưu global state
