# 📟 Minishell Web — Matrix Edition

A high-fidelity Unix terminal emulator built with **React** and **Tailwind CSS**, designed to showcase a pure C-style development environment with a stunning Matrix aesthetic.

![Matrix Rain](https://img.shields.io/badge/Aesthetic-Matrix-00ff41?style=for-the-badge&logo=matrix)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

- **Matrix Rain Background:** Immersive animated character rain for the ultimate developer vibe.
- **Virtual Filesystem:** Fully navigable directory structure (~, src/, include/, etc.).
- **Interactive Commands:**
  - ls: List directory contents (directories marked with /).
  - cd: Navigate through the virtual folders.
  - vim: Open a simulated full-screen text editor to view/edit files.
  - gcc: A functional compiler simulator that generates executable binaries.
  - ./executable: Run compiled binaries (like a.out) and see the output.
- **1337 Standards:** Pre-configured main.c following 1337 rules (using unistd.h and write instead of printf).
- **Responsive Design:** A polished terminal experience that works on both desktop and mobile.

## 🛠️ Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Ramingooo/minishell-web.git

# Navigate to the project directory
cd minishell-web

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

## ⌨️ Command Examples

Try these inside the terminal:

```bash
ramingooo@shell:~$ ls
ramingooo@shell:~$ cd src
ramingooo@shell:~/src$ vim main.c
ramingooo@shell:~/src$ gcc main.c
ramingooo@shell:~/src$ ./a.out
Hello World
```

---
Built with 💚 by [Ramingooo](https://Ramingooo.github.io/Portfolio)
