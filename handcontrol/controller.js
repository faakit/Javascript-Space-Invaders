export default class HandControlController {
  #service;
  #camera;
  keypoints;
  event;

  constructor({ service, camera }) {
    this.#service = service;
    this.#camera = camera;
  }

  async estimateHands() {
    await this.#service.initializeDetector();
    try {
      const hands = await this.#service.estimateHands(this.#camera.video);
      for await (const gesture of this.#service.detectGestures(hands)) {
        this.keypoints = gesture.keypoints;
        if (gesture) {
          this.event = gesture.event;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async drawHands(canvas) {
    try {
      if (this.keypoints) {
        for (const keypoint of this.keypoints) {
          const { x, y } = this.#cameraToCanvasPosition(
            keypoint.x,
            keypoint.y,
            canvas
          );
          canvas.context.fillStyle = "purple";
          canvas.context.fillRect(x, y, 5, 5);
        }

        const { x: wristX, y: wristY } = this.#cameraToCanvasPosition(
          this.keypoints[0].x,
          this.keypoints[0].y,
          canvas
        );
        const { x: thumbCmcX, y: thumbCmcY } = this.#cameraToCanvasPosition(
          this.keypoints[1].x,
          this.keypoints[1].y,
          canvas
        );
        const { x: thumbMcpX, y: thumbMcpY } = this.#cameraToCanvasPosition(
          this.keypoints[2].x,
          this.keypoints[2].y,
          canvas
        );
        const { x: thumbIpX, y: thumbIpY } = this.#cameraToCanvasPosition(
          this.keypoints[3].x,
          this.keypoints[3].y,
          canvas
        );
        const { x: thumbTipX, y: thumbTipY } = this.#cameraToCanvasPosition(
          this.keypoints[4].x,
          this.keypoints[4].y,
          canvas
        );
        const { x: indexFingerMcpX, y: indexFingerMcpY } =
          this.#cameraToCanvasPosition(
            this.keypoints[5].x,
            this.keypoints[5].y,
            canvas
          );
        const { x: indexFingerPipX, y: indexFingerPipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[6].x,
            this.keypoints[6].y,
            canvas
          );
        const { x: indexFingerDipX, y: indexFingerDipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[7].x,
            this.keypoints[7].y,
            canvas
          );
        const { x: indexFingerTipX, y: indexFingerTipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[8].x,
            this.keypoints[8].y,
            canvas
          );
        const { x: middleFingerMcpX, y: middleFingerMcpY } =
          this.#cameraToCanvasPosition(
            this.keypoints[9].x,
            this.keypoints[9].y,
            canvas
          );
        const { x: middleFingerPipX, y: middleFingerPipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[10].x,
            this.keypoints[10].y,
            canvas
          );
        const { x: middleFingerDipX, y: middleFingerDipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[11].x,
            this.keypoints[11].y,
            canvas
          );
        const { x: middleFingerTipX, y: middleFingerTipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[12].x,
            this.keypoints[12].y,
            canvas
          );
        const { x: ringFingerMcpX, y: ringFingerMcpY } =
          this.#cameraToCanvasPosition(
            this.keypoints[13].x,
            this.keypoints[13].y,
            canvas
          );
        const { x: ringFingerPipX, y: ringFingerPipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[14].x,
            this.keypoints[14].y,
            canvas
          );
        const { x: ringFingerDipX, y: ringFingerDipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[15].x,
            this.keypoints[15].y,
            canvas
          );
        const { x: ringFingerTipX, y: ringFingerTipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[16].x,
            this.keypoints[16].y,
            canvas
          );
        const { x: pinkyFingerMcpX, y: pinkyFingerMcpY } =
          this.#cameraToCanvasPosition(
            this.keypoints[17].x,
            this.keypoints[17].y,
            canvas
          );
        const { x: pinkyFingerPipX, y: pinkyFingerPipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[18].x,
            this.keypoints[18].y,
            canvas
          );
        const { x: pinkyFingerDipX, y: pinkyFingerDipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[19].x,
            this.keypoints[19].y,
            canvas
          );
        const { x: pinkyFingerTipX, y: pinkyFingerTipY } =
          this.#cameraToCanvasPosition(
            this.keypoints[20].x,
            this.keypoints[20].y,
            canvas
          );

        canvas.context.beginPath();
        canvas.context.moveTo(wristX, wristY);
        canvas.context.lineTo(thumbCmcX, thumbCmcY);
        canvas.context.lineTo(thumbMcpX, thumbMcpY);
        canvas.context.lineTo(thumbIpX, thumbIpY);
        canvas.context.lineTo(thumbTipX, thumbTipY);
        canvas.context.stroke();

        canvas.context.beginPath();
        canvas.context.moveTo(wristX, wristY);
        canvas.context.lineTo(indexFingerMcpX, indexFingerMcpY);
        canvas.context.lineTo(indexFingerPipX, indexFingerPipY);
        canvas.context.lineTo(indexFingerDipX, indexFingerDipY);
        canvas.context.lineTo(indexFingerTipX, indexFingerTipY);
        canvas.context.stroke();

        canvas.context.beginPath();
        canvas.context.moveTo(wristX, wristY);
        canvas.context.lineTo(middleFingerMcpX, middleFingerMcpY);
        canvas.context.lineTo(middleFingerPipX, middleFingerPipY);
        canvas.context.lineTo(middleFingerDipX, middleFingerDipY);
        canvas.context.lineTo(middleFingerTipX, middleFingerTipY);
        canvas.context.stroke();

        canvas.context.beginPath();
        canvas.context.moveTo(wristX, wristY);
        canvas.context.lineTo(ringFingerMcpX, ringFingerMcpY);
        canvas.context.lineTo(ringFingerPipX, ringFingerPipY);
        canvas.context.lineTo(ringFingerDipX, ringFingerDipY);
        canvas.context.lineTo(ringFingerTipX, ringFingerTipY);
        canvas.context.stroke();

        canvas.context.beginPath();
        canvas.context.moveTo(wristX, wristY);
        canvas.context.lineTo(pinkyFingerMcpX, pinkyFingerMcpY);
        canvas.context.lineTo(pinkyFingerPipX, pinkyFingerPipY);
        canvas.context.lineTo(pinkyFingerDipX, pinkyFingerDipY);
        canvas.context.lineTo(pinkyFingerTipX, pinkyFingerTipY);
        canvas.context.stroke();
      }
    } catch (error) {
      console.error(error);
    }
  }

  checkGestures(player, engine) {
    if (!this.keypoints) return;

    const { x: wristX, y: _ } = this.#cameraToCanvasPosition(
      this.keypoints[0].x,
      this.keypoints[0].y,
      engine.canvas
    );
    if (player.x + engine.canvas.offset < wristX - 10) {
      player.move(5);
    } else if (player.x + engine.canvas.offset > wristX + 10) {
      player.move(-5);
    }
    if (
      this.event === "shoot" &&
      !engine.cooldown &&
      engine.gameStatus === "running"
    ) {
      engine.shoot.playClone(engine.muted);
      engine.cooldown = engine.defaultCooldown;
      engine.rockets.push(player.shoot());
    }
    if (this.event === "pause") {
      if (engine.gameStatus === "running" && !engine.holdingGesture) {
        engine.pause();
      } else if (
        (engine.gameStatus === "over" || engine.gameStatus === "startScreen") &&
        !engine.holdingGesture
      ) {
        engine.start();
      } else if (engine.gameStatus === "paused" && !engine.holdingGesture) {
        engine.resume();
      }
      engine.holdingGesture = true;
    }
    if (engine.holdingGesture && this.event !== "pause") {
      engine.holdingGesture = false;
    }
  }

  #cameraToCanvasPosition(keypointX, keypointY, canvas) {
    const { videoWidth, videoHeight } = this.#camera.video;
    const { width, height, offset } = canvas;

    const x = (keypointX * width) / videoWidth + offset;
    const y = (keypointY * height) / videoHeight;

    return { x, y };
  }

  static async initialize(deps) {
    return new HandControlController(deps);
  }
}
