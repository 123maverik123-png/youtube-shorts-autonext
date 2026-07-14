# 🎤 YouTube Shorts Voice Control

[![Install](https://img.shields.io/badge/Install-Tampermonkey-green.svg)](https://raw.githubusercontent.com/123maverik123-png/youtube-shorts-autonext/main/youtube-shorts-autonext.user.js)
[![Chrome](https://img.shields.io/badge/Chrome-✅_Working-blue)](https://www.google.com/chrome/)
[![Edge](https://img.shields.io/badge/Edge-✅_Working-0078D7)](https://www.microsoft.com/edge)
[![Firefox](https://img.shields.io/badge/Firefox-❌_Not_Supported-orange)](https://www.mozilla.org/firefox/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-3.0.0-brightgreen)](https://github.com/123maverik123-png/youtube-shorts-autonext/releases)

Voice control for YouTube Shorts. Browse hands-free! Say commands instead of clicking buttons.

---

## ⚠️ Important

> **Works only in Google Chrome and Chromium-based browsers** (Edge, Opera, Brave, etc.).  
> **Firefox is NOT supported** due to Web Speech API limitations.

---

## ✨ Features

- 🎤 **Voice commands** — control Shorts with your voice
- ⏭️ **Auto-switch** — automatically go to next video when current ends
- 🔒 **Single switch** — prevents multiple switches
- ⌨️ **Keyboard shortcuts** — control without voice too
- 🚀 **Lightweight** — minimal performance impact
- 🔄 **SPA navigation** — works with YouTube navigation without page reload
- 🎯 **Multi-language commands** — supports English and Russian

---

## 🎤 Voice Commands

| Say | Action |
|-----|--------|
| **"next"** | Go to next video ⏩ |
| **"back"** | Go to previous video ⏪ |
| **"pause"** | Pause / Play video ⏸️ |
| **"like"** | Like current video ❤️ |
| **"home"** | Go to YouTube Home 🏠 |

**Russian commands are also supported:** "дальше", "назад", "пауза", "лайк", "главная"

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` / `↑` | Previous video |
| `→` / `↓` | Next video |
| `Space` | Pause / Play |
| `L` | Like video |
| `H` | Go to YouTube Home |
| `V` | Toggle voice ON/OFF |

---

## ⚠️ Browser Support

| Browser | Voice Support | Status |
|---------|---------------|--------|
| **Chrome** | ✅ Full support | ✅ Works |
| **Edge** | ✅ Full support | ✅ Works |
| **Opera** | ✅ Full support | ✅ Works |
| **Brave** | ✅ Full support | ✅ Works |
| **Firefox** | ❌ Not supported | ❌ Doesn't work |
| **Safari** | ❌ Not supported | ❌ Doesn't work |

---

## 🔧 Installation

### Step 1: Install Tampermonkey

| Browser | Extension Link |
|---------|----------------|
| **Chrome** | [Tampermonkey on Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| **Edge** | [Tampermonkey on Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| **Opera** | [Tampermonkey on Opera Add-ons](https://addons.opera.com/extensions/details/tampermonkey-beta/) |

### Step 2: Install the Script

Click the button below or copy the URL:

[![Install](https://img.shields.io/badge/📦_Install_Script-Tampermonkey-00C853?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/123maverik123-png/youtube-shorts-autonext/main/youtube-shorts-autonext.user.js)

**Or copy this URL:**

https://raw.githubusercontent.com/123maverik123-png/youtube-shorts-autonext/main/youtube-shorts-autonext.user.js



### Step 3: Done!

Open any YouTube Shorts in **Google Chrome** and say:
- **"next"** — to switch to the next video
- **"like"** — to like the current video
- **"home"** — to go to YouTube Home

---

## 📖 How to Use

### Voice Control ON/OFF

- Press **`V`** on your keyboard to toggle voice control on/off
- You'll see a feedback message at the bottom of the screen

### Give a Voice Command

Simply say one of the commands into your microphone:

1. Click on the YouTube page to ensure it's focused
2. Say **"next"**, **"back"**, **"pause"**, **"like"**, or **"home"**
3. The script will execute the action immediately

### Auto-Switch

The script automatically goes to the next video when the current one ends. No action required!

---

## 🛠️ Technical Details

The script works by:
1. Monitoring the video's current time every 300ms
2. Detecting when `currentTime >= duration - 0.3` (video is ending)
3. Automatically clicking the "Next" button or simulating ArrowDown key
4. Using Web Speech API for voice recognition
5. Supporting SPA navigation on YouTube

---

## 📋 Commands Reference

### English Commands

| Command | Action |
|---------|--------|
| `next` | Next video |
| `back` | Previous video |
| `pause` | Pause / Play |
| `like` | Like video |
| `home` | YouTube Home |

### Russian Commands

| Command | Action |
|---------|--------|
| `дальше` | Next video |
| `назад` | Previous video |
| `пауза` | Pause / Play |
| `лайк` | Like video |
| `главная` | YouTube Home |

---

## 🐛 Troubleshooting

### Script doesn't work

1. Make sure you're on `youtube.com/shorts/...`
2. Check if Tampermonkey is enabled (green icon)
3. Refresh the page (F5)
4. Open console (F12) and check for errors
5. Make sure you're using **Google Chrome** (not Firefox)

### Voice commands not working

1. Check if voice is ON (press `V`)
2. Allow microphone access (click the lock icon in address bar → YouTube → Microphone → Allow)
3. Check system microphone settings
4. Speak clearly and louder

### Multiple switches

The script has a built-in lock to prevent this. If it still happens:
- Refresh the page
- Reinstall the script

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs (create an Issue)
- Suggest features (create an Issue)
- Submit pull requests with improvements
- Star ⭐ the repository if you find it useful!

---

## 📝 License

MIT License — free to use, modify, and distribute.

---

## 📞 Support

- Create an [Issue](https://github.com/123maverik123-png/youtube-shorts-autonext/issues)
- Star ⭐ the repository if you find it useful!
- Share with friends who love YouTube Shorts

---

## 🙏 Acknowledgments

Thanks to the YouTube Shorts community for inspiration and testing!

---

**Made with ❤️ for the YouTube Shorts community**
