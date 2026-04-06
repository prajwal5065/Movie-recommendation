# 🎬 Movie Recommendation System

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-CDN-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

**A personalized movie recommendation system that learns your taste through genre, mood, and decade preferences — built with React + Vite and a Python Flask backend.**

[✨ Features](#-features) · [🛠️ Tech Stack](#️-tech-stack) · [🚀 Getting Started](#-getting-started) · [📁 Project Structure](#-project-structure)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧠 Overview

**Movie Recommendation System** is a full-stack web application that delivers personalized movie suggestions based on user preferences. It guides users through an onboarding flow to capture their favorite genres, moods, and preferred decades — then continuously refines recommendations based on their ratings.

---

## ✨ Features

- 🎯 **User Onboarding** — Collects genre, mood, and decade preferences on first launch
- 🎭 **Genre-Based Recommendations** — Suggests movies filtered by your favorite genres
- 🌗 **Mood-Based Filtering** — Matches movies to your current vibe (e.g., feel-good, thrilling, emotional)
- 📅 **Decade-Based Discovery** — Explore classics or modern hits by era
- ⭐ **Rating-Based Learning** — Improves future recommendations based on how you rate movies
- 💅 **Modern UI** — Clean, responsive interface built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | React 18 |
| **Build Tool** | Vite |
| **Language** | JavaScript (ES6+) |
| **Styling** | Tailwind CSS (CDN) |
| **Backend** | Python · Flask |
| **Routing** | React Router |
| **State** | React Hooks (useState, useEffect) |

---

## 📁 Project Structure

```
Movie-recommendation/
│
├── public/
│   └── vite.svg                  # App favicon
│
├── src/
│   ├── assets/
│   │   └── react.svg             # React logo asset
│   ├── App.jsx                   # Root component & routing
│   ├── App.css                   # Global styles
│   ├── main.jsx                  # React entry point
│   ├── index.css                 # Base CSS
│   └── recommendation.js         # Recommendation logic & filtering
│
├── app.py                        # Flask backend server
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint rules
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

```
User Onboarding
      │
      ▼
┌──────────────────────────┐
│  Collect Preferences     │  ← Genre · Mood · Decade
└──────────────────────────┘
      │
      ▼
┌──────────────────────────┐
│  recommendation.js       │  ← Filters & scores movies
│  (Filtering Engine)      │     based on user profile
└──────────────────────────┘
      │
      ▼
┌──────────────────────────┐
│  Flask API  (app.py)     │  ← Serves movie data
└──────────────────────────┘
      │
      ▼
┌──────────────────────────┐
│  Personalized Results    │  ← Cards displayed in React UI
└──────────────────────────┘
      │
      ▼
┌──────────────────────────┐
│  User Rates Movie ⭐     │  ← Feedback loop refines future
└──────────────────────────┘    recommendations
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **Python** 3.8+
- **pip**

---

### 1. Clone the Repository

```bash
git clone https://github.com/prajwal5065/Movie-recommendation.git
cd Movie-recommendation
```

---

### 2. Start the Backend (Flask)

```bash
# Install Python dependencies
pip install flask flask-cors

# Run the Flask server
python app.py
```

The backend will run at `http://localhost:5000`

---

### 3. Start the Frontend (React + Vite)

```bash
# Install Node dependencies
npm install

# Start the dev server
npm run dev
```

The frontend will run at `http://localhost:5173`

> ⚠️ Make sure **both** the Flask backend and Vite frontend are running simultaneously for the app to work correctly.

---

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [prajwal5065](https://github.com/prajwal5065)

⭐ Star this repo if you found it helpful!

</div>
