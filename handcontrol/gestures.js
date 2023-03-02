const { GestureDescription, Finger, FingerCurl } = window.fp

const MoveGesture = new GestureDescription('move'); // ✊️
const ShootGesture = new GestureDescription('shoot'); // ☝
const PauseGesture = new GestureDescription('pause'); // ✋

// Move
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
MoveGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
MoveGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);
// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    MoveGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    MoveGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


// Shoot
// -----------------------------------------------------------------------------

// index: no curl
ShootGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 0.9);
// all other fingers: curled
for (let finger of [Finger.thumb, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    ShootGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ShootGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Pause
// -----------------------------------------------------------------------------

for (let finger of Finger.all) {
    PauseGesture.addCurl(finger, FingerCurl.NoCurl, 0.9);
}

export const knownGestures = [MoveGesture, ShootGesture, PauseGesture]