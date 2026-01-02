# Node.js LTS Server for Magisk

![Magisk](https://img.shields.io/badge/Magisk-Module-green) ![Nodejs](https://img.shields.io/badge/Node.js-LTS-green) ![License](https://img.shields.io/badge/License-MIT-orange)

A standalone, lightweight, and fully functional Node.js LTS runtime module for Android, powered by Magisk.
Run JavaScript apps, Telegram Bots (Long Polling/Websocket), or local automation scripts on your device without the need for Termux or active background apps.

## 🌟 Features

- **Latest Node.js LTS:** Includes pre-compiled **Node.js v24.12.0** binary.
- **Standalone:** Runs independently with its own libraries (Libicu, Libssl, Libuv, C-ares, etc.).
- **Auto-Start:** Automatically starts your app/bot on system boot (Global Service method).
- **Auto Entry Point:** Automatically detects and runs `index.js`, `main.js`, or `app.js`.
- **Root Access:** Runs with root privileges (via Magisk), allowing system-level operations.

## 📋 Requirements

- Rooted Android Device (Android 7.0+)
- **Magisk Manager** (Magisk v20.4 or newer)
- **Busybox for Android NDK** module installed (Required for script execution)

## 📦 Installation

1.  Download the latest `nodejs-lts.zip` release.
2.  Open **Magisk Manager**.
3.  Go to the **Modules** tab.
4.  Tap **"Install from storage"** and select the zip file.
5.  Reboot your device.

The service will start automatically after system boot.

## 🚀 Deployment (How to use)

Unlike PHP, Node.js applications often require `node_modules`.

1.  Develop your bot/app on PC or Termux (run `npm install` there).
2.  Copy your **entire project folder** (including `node_modules`) to the module's app directory.
3.  Ensure your main script is named `index.js`, `main.js`, or `app.js`.

**Deploy Path:**
`/data/adb/modules/nodejs/var/app/`

## ⚙️ Configuration & Paths

After installation, the module resides in `/data/adb/modules/nodejs/`.

| Item                              | Path                                |
| :-------------------------------- | :---------------------------------- |
| **App Root (Place scripts here)** | `/data/adb/modules/nodejs/var/app/` |
| **Log Files**                     | `/data/adb/modules/nodejs/var/log/` |
| **PID Files**                     | `/data/adb/modules/nodejs/var/tmp/` |
| **Binary & Scripts**              | `/data/adb/modules/nodejs/bin/`     |

> **Note:** To edit files or copy project folders, use a root explorer (like MT Manager, Mixplorer) or terminal via `su`.

## 🛠️ Manual Usage (Terminal)

You can control the server manually using `su` via Terminal (Termux/ADB):

**Check Status (RAM/PID):**

```bash
/data/adb/modules/nodejs/bin/node_run -t
```

**Start Server:**

```bash
/data/adb/modules/nodejs/bin/node_run -s
```

**Stop Server:**

```bash
/data/adb/modules/nodejs/bin/node_run -k
```

**Restart Server:**

```bash
/data/adb/modules/nodejs/bin/node_run -r
```

## 📜 License

This project is a bundle of software with different licenses:

- **Module Scripts** (node_run, service.d, etc.) are licensed under the **MIT License**.
- **Node.js Binary** is licensed under the **Node.js License**.
- **Libraries** (libicu, openssl, etc.) are copyright of their respective owners.

## 🤝 Credits

- **Node.js Foundation** - For the Node.js source.
- **Termux** - For the build environment and libraries.
- **Busybox NDK** - For the underlying shell utilities.
- **Magisk** - For the module system.
