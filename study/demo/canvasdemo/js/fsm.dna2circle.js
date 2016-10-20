Laro.register('SOGOU.$states', function (La) {
    this.dna2circle = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            this.last_t = msg;
            console.log(this.last_t);
            this._t = 0;
            for(var i = 0; i < SOGOU.$func.dna_main.length; i++) {
                ball = SOGOU.$func.dna_main[i];
                ball.end = false;
            }
            this.stop_index = 0;
            this.step = 0;
            this.circle_head_h = 246 * SOGOU.$func.scale;
            SOGOU.$func.lastScale = SOGOU.$func.scale;
        },
        leave: function () {
        },
        update: function (dt) {
            this._t += dt;
        },
        transition: function () {

        },
        draw: function () {
            var t = this._t,ctx = SOGOU.$func.ctx;
            if(this.step == 0){
                // 主dna旋转
                SOGOU.$func.dnaRotate(this.last_t + this._t, SOGOU.$func.dna_main, 117 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, SOGOU.$func.dna_main.color);
                SOGOU.$func.dnaList.forEach(function (item) {
                    SOGOU.$func.connectDna(item, 5 * item.scale * SOGOU.$func.scale, item.color);
                });

                // 逐个停下来
                for(var i = 0; i < SOGOU.$func.dna_main.length; i++) {
                    ball_left = SOGOU.$func.dna_main[i].ball_left;
                    ball_right = SOGOU.$func.dna_main[i].ball_right;
                    if(Math.abs(parseInt(ball_left.xpos)) <=3 && this.stop_index == i) {
                        ball_left.xpos = 0;
                        ball_right.xpos = 0;
                        ball_left.stop = true;
                        ball_right.stop = true;
                        this.stop_index ++;
                        if(this.stop_index == 7) {
                            this.step++;
                        }
                    }
                }
            }
            if(this.step == 1) {
                // 删掉7个球
                for(var i = 0; i < SOGOU.$func.dna_main.length; i++) {
                    var ball = SOGOU.$func.dna_main[i].ball_left;
                    SOGOU.$func.stage.removeChild(ball);
                    ball = SOGOU.$func.dna_main[i].ball_right;
                    SOGOU.$func.stage.removeChild(ball);
                }
                this.start_t = this._t;
                this.step++;
            }
            if(this.step == 2) {
                var T = 1, line_weight_max = 40 * SOGOU.$func.scale,
                line_dweight_max = 31 * SOGOU.$func.scale;
                var t = this._t - this.start_t;
                var line_dweight = SOGOU.$func.linear(t, T, line_dweight_max, 1);
                var line_weight = line_weight_max - line_dweight;
                SOGOU.$func.drawArcSlow({
                    ctx: SOGOU.$func.ctx,
                    x: 0,
                    y: 0,
                    t: t,
                    T: T,
                    r: 213 * SOGOU.$func.scale - (line_weight_max - line_dweight_max)/2,
                    line_weight: line_weight,
                    color: "#fff",
                    f_theta: Math.PI/2,
                    t_theta: 2.5 * Math.PI,
                    bezier: SOGOU.$func.bezier3
                });
                if(t >= T) {
                    sogou.manager.next(true);
                }
                // 增加四个圆角矩形
                var circle_head_h = this.circle_head_h - SOGOU.$func.linear(t, T, this.circle_head_h, 1);
                var height = circle_head_h/4;
                var y_bottom = radius = (213 - 9/2) * SOGOU.$func.scale;
                SOGOU.$func.ctx.translate(SOGOU.$func.canvas.width *.5, SOGOU.$func.canvas.height * .5);
                ctx.lineWidth = line_weight;
                ctx.strokeStyle = "#fff";
                for(var i = 0; i < 4; i++) {
                    if( t > T/5) {
                        ctx.lineCap = "flat";
                        var f_y = y_bottom - i * height;

                    }else
                    {
                        ctx.lineCap = "round";
                        var f_y = y_bottom - i * height - line_weight;
                    }
                    var t_y = y_bottom - (i+1) * height;
                    if(f_y < t_y) break;
                    ctx.beginPath();
                    ctx.moveTo(0, f_y);
                    ctx.lineTo(0, t_y);
                    ctx.stroke();
                    ctx.closePath();
                }
                SOGOU.$func.ctx.translate(-SOGOU.$func.canvas.width *.5, -SOGOU.$func.canvas.height * .5);
            }
        }
    });
});
