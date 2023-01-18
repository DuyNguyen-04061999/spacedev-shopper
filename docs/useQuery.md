# useQuery

1. Dùng để call api khi vào 1 page nào đó

2. Dùng để cache dữ liệu bằng các storeDriver

3. Dùng để thực thi 1 chức năng mutation nào đó

4. Quản lý global stage của ứng dụng

5. Quản lý data dạng array, sử dụng id data key mặc định


# So sánh redux và useQuery

## Giống nhau

Redux và useQuery có những chức năng giống nhau là cùng có thể lưu trữ global state nhưng cách thức và độ phức tạp khác nhau

useQuery mạnh về sự đơn giản khi thực thi các api khi vào page hoặc thực hiện 1 action service nào đó, xử lý loading dễ dàng

Redux mạnh về xử lý những side effect phức tạp, các side effect liên quan nhau khi kết hợp với redux-saga hoặc thunk

## useQuery

Chỉ dùng để thực thi các api

Có thể dùng để cache và lưu global state dùng chung cho các page

Có thể sử dụng để tạo các action để tận dụng các xử lý trong useQuery bằng props `enabled`

## Redux

Dùng để lưu global state dùng chung

Thực thi các side effect phức tạp như authen, cart

Xử lý loading, cache,... khó hơn khi sử dụng useQuery

## Kết luận

Không có thư viện nào hoàn toàn vượt trội, mỗi thư viện có những thế mạnh riêng trong những trường hợp cụ thể

Trong dự án chúng ta vừa có thể sử dụng redux và useQuery, tận dụng thế mạnh của từng thư viện để xử lý từng trường hợp


