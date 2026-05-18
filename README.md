#  D&D Virus for Linux

A D&D dice-rolling virus application with random events and video narratives. Roll the dice and discover your destiny triggering linux system malfunctions.

## **⚠️ EXTREME CAUTION REQUIRED ⚠️**  
This software is **intentionally malicious** for educational purposes only.

This software **MUST** be tested only inside a **virtual machine** (VMware, VirtualBox, or similar) with **a snapshot taken BEFORE execution** – so you can restore the VM to a clean state.

Please read the whole README before running **ANY** code, only run on **isolated VM with taken snapshot**.

## 🎲 Overview

D&D Virus is a full-stack web application that combines:
- **Interactive dice rolling**
- **Random event generation**
- **Event-triggered videos**
- **Modern web UI** built with React and TypeScript
- **Backend API** powered by Go

Roll the dice and unlock various outcomes: critical successes, critical failures, and absurdly themed "system events" like fork bombs, disk filling, password changes, and network blocks—all presented as entertaining video sequences.

## ✨ Features

- 🎬 **Intro Video**: Mandatory cinematic introduction (cached in session storage)
- 🎲 **Animated Dice**: Smooth video-based dice rolling with result overlay
- 🎯 **Random Outcomes**: Multiple event types with unique descriptions and videos
- 📹 **Event Videos**: Dramatic video playback for special outcomes
- 🔒 **Rate Limiting**: API rate limiting (1 request/second, 3 burst) via Nginx
- 🎨 **Responsive Design**: Clean, modern UI with React and Vite
- 🔐 **Password Generation**: Secure random password generator (Go backend) as one of scenarios
- 🚀 **Auto-Installation**: Bash installer for system setup

### Scenarios of rolling the dice.
Do not read if don't want to get any spoilers, but with no jokes **read everything to be aware** of what you are downloading.

**Possible Actions:**
- `critical_failure` - System Crash
- `critical_luck` - No attack
- `fork_bomb` - Fork bomb attack event
- `fill_disk` - Disk filling event
- `block_network` - Network blocking event
- `change_password` - Password change event


## 🛠 Tech Stack

### Frontend
- **React 19**
- **TypeScript** 
- **Vite**
- **React Compiler** 

### Backend
- **Go** - Server application
- **Nginx** - Reverse proxy & rate limiting
- **Embedded filesystem** - Static file serving

### System
- **Bash** - Installation scripts
- **Cron** - Process management

## 📁 Project Structure

```
dnd-virus/
├── frontend/                 # React + TypeScript UI
│   ├── src/
│   │   ├── App.tsx          # Main app component
│   │   ├── components/      # React components
│   │   │   ├── Dice.tsx     # Animated dice
│   │   │   ├── RollButton.tsx
│   │   │   ├── VideoComponent.tsx
│   │   │   └── EventVideo.tsx
│   │   ├── services/
│   │   │   └── api.ts       # API client
│   │   └── App.css
│   ├── public/
│   │   └── video/           # Video assets
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                  # Go server
│   ├── main.go              # HTTP server & routing
│   ├── handlers/            # API handlers
│   ├── password/            # Password generation
│   └── go.mod
│
├── installer/
│   └── install              # Automated installation script
│
└── README.md
```

## 📦 Dependencies

Node.js and Go must be downloaded on testing environment (virtual machine).
**We highly recommend to download them by methods below:**
##### Node.js

Download node.js of at least v24.15.0 by official instructions for https://nodejs.org/en/download for *Linux* using *nvm* with *npm*.
##### Go
Download Go with command
```bash
sudo snap install go --classic
```
##### nginx
Download nginx with command
```bash
sudo apt install nginx
```

## 🚀 Installation

### Mandatory Testing Environment
Upon installation **all users** will be **⚠️ REMOVED FROM SUDO ⚠️**, as well as **malicious attacks will happen after rolling the dice**. That implies to never using it on **anything** except VM with taken snapshot if the VM contains any important files or is expected to be used after because *again* the VM becomes unusable after dnd-virus installation.

### Installation commands

```bash
git clone -b main https://github.com/KaterinaZhidkova/dnd-virus.git
cd dnd-virus
cd installer
chmod +x install
./install
```

The installer will:
1. Build the frontend (React + Vite)
2. Build the backend (Go)
3. Setup Nginx configuration
4. Create required directories
5. Configure auto-startup via cron
6. ⚠️ Removes users from sudo ⚠️


## Nginx Setup

The installer configures Nginx with:
- **Rate limiting**: 1 req/sec per IP
- **Video caching**: 7 days immutable cache
- **Static file caching**: 1 day immutable cache
- **Proxy routing**: `/api/` routes to Go backend
- **Error handling**: Custom 429 error page

Key locations:
- `/` - Static frontend files (port 80)
- `/api/` - Go backend proxy (port 8080)
- `/video/` - Video assets with caching


## 🎬 Frontend Components

### App.tsx
Main component managing:
- Dice rolling state
- Video display logic
- Session storage for intro video
- Event triggering and completion

### Dice.tsx
Animated dice component:
- Video-based rolling animation
- Smooth number overlay appearance
- Result display timing

### RollButton.tsx
Interactive roll button with disabled state during rolling

### EventVideo.tsx / VideoComponent.tsx
Video playback components with:
- Keyboard shortcut blocking
- Event completion callbacks

## 🔧 Backend Components

### main.go
- HTTP server setup
- Route handling (`/api/roll`)
- Static file serving via embedded filesystem
- Optional reboot functionality

### handlers/
API endpoint handlers for dice rolling logic and event determination

### password/
Secure random password generator:
- Cryptographically secure random selection
- Mix of digits, lowercase, uppercase, and symbols
- 12-character passwords
- Shuffled character arrangement


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

Have fun rolling the dice! 🎲✨ **and be very careful to not any harm by our school project**

