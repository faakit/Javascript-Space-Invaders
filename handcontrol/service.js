import { knownGestures } from "./gestures.js"

export default class HandControlService {
    #gestureEstimator
    #handPoseDetection
    #handsVersion
    #detector

    constructor({ fingerpose, handPoseDetection, handsVersion }) {
        this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures)
        this.#handPoseDetection = handPoseDetection
        this.#handsVersion = handsVersion
    }

    async estimate(keypoints3D) {
        const predictions = await this.#gestureEstimator.estimate(
            this.#getLandmarksFromKeypoints(keypoints3D),
            8
        )
        return predictions
    }

    async * detectGestures(predictions) {
        for (const hand of predictions) {
            if (!hand) continue
            const { gestures } = await this.estimate(hand.keypoints3D)
            if (!gestures.length) continue

            const result = gestures.reduce((previous, gesture) => {
                if (gesture.score > previous.score) {
                    return gesture
                }
                return previous
            })

            yield { event: result.name, keypoints: hand.keypoints }
        }
    }

    #getLandmarksFromKeypoints(keypoints3D) {
        return keypoints3D.map((keypoint) => ([keypoint.x, keypoint.y, keypoint.z]))
    }

    async estimateHands(video) {
        return this.#detector.estimateHands(video, {
            flipHorizontal: true
        })
    }

    async initializeDetector() {
        if (this.#detector) { return this.#detector }

        const detectorConfig = {
            runtime: "mediapipe",
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`,
            modelType: 'lite',
            maxHands: 1,
        }

        this.#detector = await this.#handPoseDetection.createDetector(
            this.#handPoseDetection.SupportedModels.MediaPipeHands,
            detectorConfig
        )

        return this.#detector
    }
}