import Brush from "./Brush";

export default class Eraser extends Brush {

    // draw(x, y) {
    //     this.ctx.strokeStyle = "white"
    //     this.ctx.lineTo(x, y)
    //     this.ctx.stroke()
    // }

    static draw(ctx, x, y) {
        ctx.strokeStyle = 'white'
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}