# SherlockHolmesAI


### 📦 Project Overview
SherlockAI Lite is a lightweight, CSP-compliant Chrome extension that uses in-browser face-landmark detection to flag when a test‐taker looks away from their main screen during remote interviews or online exams. It injects TensorFlow.js UMD bundles locally—no remote scripts or `eval()`—and logs “🟢 Centered” or “🔴 Looking away” in the page console.

---

### ⚙️ Tech Stack
- **Manifest V3** Chrome Extension  
- **HTML/CSS/JS** for popup & background  
- **TensorFlow.js** UMD bundles (tfjs-core, tfjs-converter, face-landmarks-detection)  
- **WebRTC getUserMedia()** for webcam capture  
- **AnimationFrame** loop for real-time detection  

---

### 🚀 Installation (for local dev)
1. Clone or unzip into a folder, e.g. `sherlockai-lite/`.  
2. Download and place these files in that folder:
   - `tfjs-core.min.js`  
   - `tfjs-converter.min.js`  
   - `face-landmarks-detection.min.js`  
   - `content.js`, `popup.html`, `popup.js`, `background.js`, `manifest.json`  
3. In Chrome, go to `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select your folder.  
4. Open any webcam-enabled page (Meet, Zoom Web, Teams, or your own test HTML).  
5. Click the SherlockAI icon → **Start Tracking**, then open that tab’s DevTools → Console to see logs.

---

### 🛠️ Challenges We Faced
1. **CSP Errors**  
   - Remote `<script>` tags (MediaPipe CDN) were blocked.  
   - `eval()` usage in clmtrackr caused Manifest V3 CSP violations.

2. **Import Syntax**  
   - ES6 `import …` isn’t allowed in plain content scripts under Manifest V3.

3. **Browser API Limitations**  
   - Native FaceDetector API isn’t generally available or is blocked by page CSPs.

4. **Bundling Models**  
   - Need to include TensorFlow.js UMD bundles locally to satisfy CSP.

5. **Cross-site Support**  
   - Avoid Meet-only hacks; solution must run on arbitrary pages.

---

### ✅ What We Tried
- Dynamic `<script>` injection  
- clmtrackr (failed due to `unsafe-eval`)  
- MediaPipe via CDN (blocked by CSP)  
- Native FaceDetector API (not universally supported)  
- **Final solution**: Local TensorFlow.js UMD bundles + pure‐JS content script

---

### 🔭 Next Steps
- Tune gaze thresholds (frames, boundary ratios)  
- Capture and aggregate logs for session reports  
- Badge extension icon or popup UI for real-time alerts  
- Add mouse/tab-switch detection for multi-monitor inference  
- Hook into a small backend (optional) for persistence

---

### 🤝 Where to Find Help & Collaborators
- **Stack Overflow** (`[chrome-extension]`, `[tensorflow.js]`, `[webcam]`)  
- **Chrome Extensions Community** on Google Groups / GitHub Discussions:  
  - https://developer.chrome.com/docs/extensions/  
  - https://github.com/GoogleChrome/chrome-extensions-samples  
- **TensorFlow.js Forum**: https://discuss.tensorflow.org/c/js/  
- **Reddit**: r/ChromeExtensions, r/MachineLearning  
- **Freelance Platforms**:  
  - Upwork (search “Chrome Extension Developer”)  
  - Toptal (for vetted JS engineers)  
  - Fiverr (quick prototypes)  
- **Discord/Slack**:  
  - Chrome Extensions Slack (invite via https://chromedev.community/)  
  - TensorFlow.js Slack (#tfjs channel)  
- **Open Source Projects** to reference:  
  - https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection  
  - https://github.com/GoogleChrome/chrome-extensions-samples  

Feel free to copy this README into your repo, update it as you go, and share it with anyone you bring on board. Good luck building SherlockAI Lite! 🚀```
