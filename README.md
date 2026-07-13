# YouTube Shorts Auto Next 🚀

Automatically skip to the next YouTube Shorts video when the current one ends.

[![Install Tampermonkey](https://img.shields.io/badge/Install-Tampermonkey-green.svg)](https://raw.githubusercontent.com/123maverik123-png/youtube-shorts-autonext/main/youtube-shorts-autonext.user.js)
[![Firefox](https://img.shields.io/badge/Firefox-✅_Working-orange)](https://www.mozilla.org/firefox/)
[![Chrome](https://img.shields.io/badge/Chrome-✅_Working-blue)](https://www.google.com/chrome/)
[![Edge](https://img.shields.io/badge/Edge-✅_Working-0078D7)](https://www.microsoft.com/edge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)](https://github.com/123maverik123-png/youtube-shorts-autonext/releases/tag/v1.0.0)

## 📖 Description

This userscript automatically advances to the next YouTube Shorts video when the current video finishes playing. No more manual clicking!

## ✨ Features

- ⏭️ **Auto-advance** - Automatically goes to the next Shorts video
- 🔒 **Single switch** - Prevents multiple switches
- ⌨️ **Manual override** - Press `F9` to manually switch
- 🦊 **Works on Firefox** - Fully compatible with Firefox and Chrome
- 🚀 **Lightweight** - Minimal performance impact

## 🔧 Installation
https://github.com/123maverik123-png/youtube-shorts-autonext/blob/main/README.md
### Prerequisites
- Install [Tampermonkey](https://www.tampermonkey.net/) (Firefox/Chrome/Edge)

### Install Script
1. Click the install button below:
   [![Install](https://img.shields.io/badge/Install-Tampermonkey-green.svg)](https://raw.githubusercontent.com/123maverik123-png/youtube-shorts-autonext/main/youtube-shorts-autonext.user.js)

2. Tampermonkey will open - click **Install**

3. Done! Open any YouTube Shorts video and enjoy automatic switching

## 🎮 How to Use

1. Navigate to any YouTube Shorts video (`youtube.com/shorts/...`)
2. The script runs automatically
3. When a video ends, it will automatically advance to the next one
4. Press `F9` at any time to manually advance

## 🛠️ Technical Details

The script works by:
1. Monitoring the video's current time
2. Detecting when `currentTime >= duration - 0.3`
3. Attempting multiple methods to advance:
   - Clicking the Next button
   - Simulating ArrowDown key press
   - Clicking via aria-label

## 📊 Browser Compatibility

| Browser | Status |
|---------|--------|
| Firefox | ✅ Fully working |
| Chrome | ✅ Fully working |
| Edge | ✅ Fully working |
| Safari | ⚠️ Not tested |

## 🐛 Troubleshooting

### Script doesn't work
1. Make sure you're on `youtube.com/shorts/...`
2. Check if Tampermonkey is enabled (green icon)
3. Refresh the page
4. Open console (F12) and check for errors

### Multiple switches
The script has a built-in lock to prevent multiple switches. If it still happens, try:
- Refresh the page
- Reinstall the script

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

MIT License - feel free to use and modify

## 📞 Support

- Create an [issue](https://github.com/yourusername/youtube-shorts-autonext/issues)
- Star ⭐ the repository if you find it useful!

---

**Made with ❤️ for the YouTube Shorts community**
