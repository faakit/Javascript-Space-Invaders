export default class HandControlController {
    #service
    #camera
    x
    y
    event

    constructor({ service, camera }) {
        this.#service = service
        this.#camera = camera
    }

    async estimateHands() {
        await this.#service.initializeDetector()
        try {
            const hands = await this.#service.estimateHands(this.#camera.video)
            for await (const gesture of this.#service.detectGestures(hands)) {
                if (gesture) {
                    this.x = gesture.x
                    this.y = gesture.y
                    this.event = gesture.event
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    static async initialize(deps) {
        return new HandControlController(deps)
    }
}