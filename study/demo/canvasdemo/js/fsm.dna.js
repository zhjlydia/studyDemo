Laro.register('SOGOU.$states', function (La) {
    this.dna = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            console.log('page: dna');
            this._t = 0;
            this.T = 1;
            this.init_t = Math.PI + 0.06;
            SOGOU.$func.initDnaList(this.init_t);
            // 文案旋转入
            SOGOU.$func.w4.classList.add("rotatein");
            document.body.style.perspective = "none";
        },
        leave: function () {
            SOGOU.$func.dnaList.forEach(function (item) {
                for(var j = 0 ; j < 7; j++) {
                    var ball_left = item[j].ball_left;
                    var ball_right = item[j].ball_left;
                    delete ball_left.end_t;
                    delete ball_left.f_xpos;
                    delete ball_left.f_ypos;
                    delete ball_left.f_zpos;
                    delete ball_left.t_xpos;
                    delete ball_left.t_ypos;
                    delete ball_left.t_zpos;
                    delete ball_right.end_t;
                    delete ball_right.f_xpos;
                    delete ball_right.f_ypos;
                    delete ball_right.f_zpos;
                    delete ball_right.t_xpos;
                    delete ball_right.t_ypos;
                    delete ball_right.t_zpos;
                    delete ball_left.bi_x;
                    delete ball_right.bi_x;
                }
            });
            // 文案旋旋转出
            SOGOU.$func.w4.classList.add("rotateout");
        },
        update: function (dt) {
            this._t += dt;
        },
        transition: function () {
            if (this._t > 4) {
                sogou.manager.unlock();
                if (!!sogou.manager.auto) {
                    sogou.manager.next(true, this.stop_t);
                }
            }
        },
        draw: function () {
            var t = this._t;
            var wait_t = 0.3;
            // 划线
            if(t < wait_t) {
                SOGOU.$func.dnaList.forEach(function (item) {
                    SOGOU.$func.connectDnaSlow(t, wait_t, item, 5 * item.scale * SOGOU.$func.scale, item.color, SOGOU.$func.bezier1);
                });
            }

            // 背景球摆动
            for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                var ball = SOGOU.$func.dnaBgBalls[i];
                SOGOU.$func.vibratePart2(ball, this._t, 0.5);
                    // ball.xpos += ball.dx;
                    // ball.ypos += ball.dy;
                pos = ball.getScreenXY();
                ball.x = pos.x;
                ball.y = pos.y;
            }

            // 旋转
            if(t >= wait_t){
                start_t = t + this.init_t - wait_t;
                this.stop_t = start_t;
                SOGOU.$func.dnaList.forEach(function (item,index) {
                    SOGOU.$func.dnaRotate(start_t + item.start_t, item, 117 * item.scale * SOGOU.$func.scale, 5 * item.scale * SOGOU.$func.scale, 5 * item.scale * SOGOU.$func.scale, item.color);
                    SOGOU.$func.connectDna(item, 5 * item.scale * SOGOU.$func.scale, item.color);
                });
            }
        }
    });
});
