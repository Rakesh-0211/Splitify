# 💸 Splitify — Expense Sharing Application

Splitify is a Splitwise-style expense-sharing app where users can:

- 👥 Create groups with selected members  
- ➕ Add shared expenses  
- 🔁 Automatically split costs  
- 🧾 See balances per user and per group  
- 🔐 Log in using just your name (auto-create profile)  
- 👁‍🗨 View only YOUR groups and balances  
- 💰 Track who owes whom (smart settlement)

Built with **MongoDB + Express + React (Vite) + Node + Tailwind CSS**

---

## 🚀 Features

✔ Quick login — just enter your name  
✔ Create groups (friends, trips, roommates)  
✔ Add expenses inside groups  
✔ See balances per user  
✔ Filter data BY user  
✔ Minimal number of settlements  
✔ Secure access — user only sees own groups  
✔ Backend + frontend structured cleanly  
✔ Auto-create users if not found  



---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/YOUR-USERNAME/splitify.git
cd splitify

---

## 🔧 Backend Setup

cd backend
npm install

bash
Copy code

Create `.env`

MONGO_URI=YOUR_MONGODB_ATLAS_URL
PORT=5000

powershell
Copy code

Start backend:

npm run dev

arduino
Copy code

Server runs at:

http://localhost:5000


---

## 🎨 Frontend Setup

cd frontend
npm install
npm run dev

yaml
Copy code

Frontend runs at:

http://localhost:5173

---

## 📡 API Endpoints

### 👤 Users

| Method | Endpoint | Description |
|-------|---------|-------------|
| POST | `/users/find-or-create-name` | Login/register by name |
| GET | `/users?userId=` | Get user |

### 👥 Groups

| Method | Endpoint | Description |
|-------|---------|-------------|
| POST | `/groups` | Create group |
| GET | `/groups?userId=` | Get groups for user |

### 💸 Expenses

| Method | Endpoint | Description |
|-------|---------|-------------|
| POST | `/expenses` | Add expense |

### 💰 Balances

| Method | Endpoint | Description |
|-------|---------|-------------|
| GET | `/balances?userId=` | Get balances for user |

---

## 🧠 Logic Overview

- Each expense stores:
  - group
  - payer
  - participants  
- App calculates **minimal settlements**
- Example output:

A owes B ₹200
C owes A ₹150

---

## 🧩 Tech Stack

- ⚛ React + Vite
- 🎨 Tailwind CSS
- 🌐 Express.js
- 🟢 Node.js
- 🍃 MongoDB Atlas
- 🔌 Axios (API)
- 🔐 Context API Auth
- 🚀 Nodemon (dev backend)

---

## 🔮 Enhancements Planned

- ✔ Settlement history  
- ✔ Group activity log  
- ✔ Invite members by link  
- ✔ Mobile UI redesign  

---

## 🤝 Contributing

Pull requests are welcome.  
Open an issue for discussion first.

---

## 📜 License

MIT

---

## ⭐ Show Support

If you like Splitify — **star the repo!** ⭐
