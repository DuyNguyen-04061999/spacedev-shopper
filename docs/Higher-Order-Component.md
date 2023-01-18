# Higher Order Component

- Higher Order Component (HOC) là một function nhận vào 1 (hoặc nhiều) component và trả ra một component mới. Component mới sẽ được gắn những logic mới để giúp cho việc sử dụng lại logic trong component trở nên hiệu quả hơn.

- React cung cấp sẵn những function có chức năng như một HOC:

    - `React.memo`: memolize lại component, chỉ render lại khi props thay đổi

    - `React.forwaredRef`: Nhận ref cho component

- Ngoài ra còn rất nhiều function do các thư viện tạo ra có chức năng tương tự như một HOC

