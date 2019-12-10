import {FONT, COLOR} from './config.js'
export default class Box {
    constructor(value = 2, width, height, maxWidth, maxHeight, status = 'DEFAULT') {
        this.width = width
        this.maxWidth = maxWidth

        this.height = height
        this.maxHeight = maxHeight

        this.status = status

        this.value = value
        this.color = COLOR[`T_${text}`]
        this.font = FONT[`F_${text}`]
        this.bgColor = COLOR[`BG_${text}`]
    }

    setStatus(status) {
        this.status = status
    }

    draw(ctx) {
        if(this.status === 'DEFAULT') {
            this.drawArcRect()
        }
    }


    /**
     * 圆角正方形
     * @param {*} ctx 
     * @param {*} x x坐标
     * @param {*} y y坐标
     * @param {*} length 正方形边长
     * @param {*} r 圆角半径
     * @param {*} color 填充颜色
     */
    drawArcRect(ctx, x, y, w, h, r, color) {
        ctx.save()
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(x - w / 2 + r, y - h / 2)
        ctx.lineTo(x + w / 2 - r, y - h / 2)
        ctx.arc(x + w / 2 - r, y - h / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI)

        ctx.lineTo(x + w / 2, y + h / 2 - r)
        ctx.arc(x + w / 2 - r, y + h / 2 - r, r, 0 * Math.PI, 0.5 * Math.PI)

        ctx.lineTo(x - w / 2 + r, y + h / 2)
        ctx.arc(x - w / 2 + r, y + h / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI)

        ctx.lineTo(x - w / 2, y - h / 2 + r)
        ctx.arc(x - w / 2 + r, y - h / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}
