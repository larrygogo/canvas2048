import {
    COLOR,
    FONT,
    PROPORTION
} from '/game/config.js'

export class Game {
    constructor(w, h, sw, sh) {
        this.width = w
        this.height = h
        this.d = 0
        this.f = 25
        this.boxW = w * PROPORTION.BOX
        this.boxH = h * PROPORTION.BOX
        Game.initCnavas(w, h, sw, sh)

        this.arr = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ]
    }
    static initCnavas(w, h, sw, sh) {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.style.width = `${sw}px`
        canvas.style.height = `${sh}px`
        Game.canvas = canvas
        Game.ctx = Game.canvas.getContext('2d')
        document.body.append(canvas)
    }

    start() {
        requestAnimationFrame(() => {
            this.initPane()
            this.run()
        })
    }

    /**
     * 初始化画板
     */
    initPane() {
        let r = this.width * PROPORTION.RADUIS
        Game.ctx.clearRect(0, 0, this.width, this.height)
        this.drawArcRect(Game.ctx, this.width / 2, this.height / 2, this.width, this.height, r, '#bbada0')
        let x = this.width * (PROPORTION.GAP + PROPORTION.BOX / 2),
            y = this.height * (PROPORTION.GAP+ PROPORTION.BOX / 2),
            width = this.width * PROPORTION.BOX,
            height = this.height * PROPORTION.BOX

        for (let item of this.arr) {
            for (let detail of item) {
                this.drawArcRect(Game.ctx, x, y, width, height, r, COLOR[`BG_${0}`])
                if(detail !== null) {
                    this.drawText(detail, x, y)
                }
                x += this.width * (PROPORTION.GAP + PROPORTION.BOX)
            }
            x = this.width * (PROPORTION.GAP + PROPORTION.BOX / 2)
            y += this.height * (PROPORTION.GAP + PROPORTION.BOX)
        }
    }

    randomBox() {

    }

    run() {
        if (this.d < 98) {
            this.d += this.f
            this.f *= .7
            if (this.f < 5) {
                this.f = 5
            }
            if (this.d >= 98) {
                this.d = 98
                this.f = 25
            }
        }
        this.drawArcRect(Game.ctx, 60, 60, this.d, this.d, 5, `#ede0c8`)
        requestAnimationFrame(() => {
            this.initPane()
            this.run()
        })
    }


    drawText(text, x, y) {
        Game.ctx.save()
        Game.ctx.font = FONT[`F_${text}`]
        Game.ctx.fillStyle = COLOR[`T_${text}`]
        Game.ctx.textAlign = 'center'
        Game.ctx.textBaseline = 'middle'
        Game.ctx.fillText(text, x, y + 8) // y轴修正视觉坐标
        Game.ctx.restore()
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