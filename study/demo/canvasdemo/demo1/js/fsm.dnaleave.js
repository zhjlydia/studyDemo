Laro.register('SOGOU.$states', function (La) {
    this.dnaleave = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            sogou.manager.lock();
            this.last_t = msg;
            this._t = 0;
            SOGOU.$func.initMainDna();
            SOGOU.$func.resetDnaBalls2();
            SOGOU.$func.resetDnaBgBalls2();
            this.step = 1;
            SOGOU.$func.lastScale = SOGOU.$func.scale;
        },
        leave: function () {
            for(var i = 0; i < SOGOU.$func.dnaBgBalls.length; i ++) {
                var ball = SOGOU.$func.dnaBgBalls[i];
                SOGOU.$func.stage.removeChild(ball);
            }
            for (var i = 0; i < SOGOU.$func.dnaBalls.length; i++) {
                var ball = SOGOU.$func.dnaBalls[i];
                SOGOU.$func.stage.removeChild(ball);
            }
        },
        update: function (dt) {
            this._t += dt;
            for (var i = 0; i < SOGOU.$func.dnaBalls.length; i++) {
                var ball = SOGOU.$func.dnaBalls[i];
                var scale = ball.getScale();
                ball.width = ball.bi_width * scale < 0 ? 0 : ball.bi_width * scale ;
            }
            if(SOGOU.$func.dnaBgBalls) {
                for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                    var ball = SOGOU.$func.dnaBgBalls[i];
                    var scale = ball.getScale();
                    ball.width = ball.bi_width * scale < 0 ? 0 : ball.bi_width * scale ;
                }
            }
        },
        transition: function () {
            if (this._t > 2) {
                if (!!sogou.manager.auto) {
                    //sogou.manager.next(true, this.stop_t);
                }
            }
        },
        draw: function () {
            var t = this._t;
            var T = 2;
            //console.log(SOGOU.$func.dnaMainBalls);
            // 主dna移动到中心
            var dnaMainBalls = SOGOU.$func.dnaMainBalls;
            for(var i = 0; i < dnaMainBalls.length; i += 2) {
                var ball_left = dnaMainBalls[i];
                var ball_right = dnaMainBalls[i+1];
                SOGOU.$func.tween2(ball_left, t + ball_left.start_t, 0.5, SOGOU.$func.bezier3);//0.5
                SOGOU.$func.tween2(ball_right, t + ball_right.start_t, 0.5, SOGOU.$func.bezier3);
                var pos = ball_left.getScreenXY();
                ball_left.x = pos.x;
                ball_left.y = pos.y;
                ball_left.bi_y = undefined;
                var pos = ball_right.getScreenXY();
                ball_right.x = pos.x;
                ball_right.y = pos.y;
                ball_right.bi_y = undefined;
                if(!ball_left.end){
                    var mid_x = (dnaMainBalls[i].xpos + dnaMainBalls[i+1].xpos)/2;
                    ball_right.bi_x = ball_left.bi_x = mid_x;
                }else {
                    if(i >= dnaMainBalls.length - 2){
                        this.stop_t = this.last_t + this._t;
                        if(this.step == 1) {
                            this.step = 2;
                            for(var i = 0; i < dnaMainBalls.length; i += 2) {
                                var ball_left = dnaMainBalls[i];
                                var ball_right = dnaMainBalls[i+1];
                                var scale = ball_left.getScale();
                                ball_right.bi_w = ball_left.bi_w = ball_left.bi_w * scale;
                            }
                        }
                        sogou.manager.next(true, this.stop_t);
                    }
                }
            }

            if(SOGOU.$func.dnaBgBalls) {
                for(var i = 0; i < SOGOU.$func.dnaBgBalls.length; i ++) {
                    var ball = SOGOU.$func.dnaBgBalls[i];
                    SOGOU.$func.tween2(ball, t, 1, SOGOU.$func.bezier3);
                    var pos = ball.getScreenXY();
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
            }

            // 主dna旋转
            this.stop_t = this.last_t + this._t;
            SOGOU.$func.dnaRotate(this.last_t + this._t, SOGOU.$func.dna_main, 117 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, SOGOU.$func.dna_main.color);
            //console.log(SOGOU.$func.dna_main[0].ball_left);
            for(var i = 0; i < dnaMainBalls.length; i += 2) {
                var ball_left = dnaMainBalls[i];
                var ball_right = dnaMainBalls[i+1];
                var scale = ball_left.getScale();
                ball_left.width = ball_left.width * scale;
                ball_right.width = ball_right.width * scale;
            }


            // 非主dna离场
            var dnaBalls = SOGOU.$func.dnaBalls;
            for(var i = 0; i < dnaBalls.length; i++) {
                var ball = dnaBalls[i];
                SOGOU.$func.tween2(ball, t + ball.start_t , 0.3, SOGOU.$func.bezier2);
                var pos = ball.getScreenXY();
                ball.x = pos.x;
                ball.y = pos.y;
            }
            // 所有的dna连接线
            SOGOU.$func.dnaList.forEach(function (item) {
                SOGOU.$func.connectDna(item, 5 * item.scale * SOGOU.$func.scale, item.color);
            });
        }
    });
});