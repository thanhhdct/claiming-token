# Run the project
Dùng lệnh ```npm run dev```

Lưu ý: cần đổi biến ```CONTRACT_ADDRESS``` trong dapp/src/components/DiscoverWalletProviders.tsx cho đúng với contract address sau khi deploy

giao diện ban đầu:

![image](https://github.com/user-attachments/assets/7b573546-1f48-4ecf-a164-a609b9f622bf)

click Connect Wallet => tự động lấy ra account đang active trong metamask

![image](https://github.com/user-attachments/assets/0c2980be-d008-450c-a94c-ca493a676fa7)

# Set Reward
Nếu là owner của contract sẽ có thêm chức năng set reward cho user

owner của contract là account đầu tiên trong list account khi khởi tạo local network

![image](https://github.com/user-attachments/assets/d2121f4a-40b3-42c2-85d8-f5e380bb95a2)

Để đăng nhập được owner đó trong metamask cần import private key, sau đó switch sang account trên sẽ có thêm giao diện để set reward

![image](https://github.com/user-attachments/assets/10d8fa2e-ce60-4d51-bec8-753176c22995)

owner set reward => click set => hiển thị modal confirm của metamask => click confirm

![image](https://github.com/user-attachments/assets/ddab7c09-eb5c-4382-a4bc-5ac680cad17b)

# Claim Reward
Switch sang account được set balance, click Claim Reward

![image](https://github.com/user-attachments/assets/832fa2da-f088-4fc1-9145-696899ba8a6f)

Sau khi confirm và click get balance, token balance được cập nhật

![image](https://github.com/user-attachments/assets/14b729c5-2c19-4fca-a320-d81c41b53b2d)

view Token balance trên metamask

![image](https://github.com/user-attachments/assets/35d0bbb2-d2cc-49a7-a7d8-92489f6d14da)
