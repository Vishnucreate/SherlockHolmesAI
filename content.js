console.log("🔍 SherlockAI Lite: starting clmtrackr fallback");

// Create and hide video element
const video = document.createElement("video");
video.style.display = "none";
document.body.appendChild(video);

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    return video.play();
  })
  .then(() => {
    console.log("📹 Camera started, initializing clmtrackr");

    // Initialize tracker
    const tracker = new clm.tracker();
    tracker.init();
    tracker.start(video);

    let offCenterCount = 0;

    function checkFrame() {
      const positions = tracker.getCurrentPosition();
      if (!positions) {
        console.log("No face detected");
        offCenterCount = 0;
      } else {
        // positions[32] is nose tip, positions[27] left eye, 32ish center of face
        const nose = positions[62]; // roughly nose center
        const normX = nose[0] / video.videoWidth;  // 0–1

        if (normX < 0.4 || normX > 0.6) {
          offCenterCount++;
        } else {
          offCenterCount = 0;
        }

        if (offCenterCount > 10) {
          console.warn("🔴 User looking away from screen!");
        } else {
          console.log("🟢 Gaze roughly centered");
        }
      }
      requestAnimationFrame(checkFrame);
    }

    requestAnimationFrame(checkFrame);
  })
  .catch(err => {
    console.warn("Camera access denied:", err);
  });
