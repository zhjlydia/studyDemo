Laro.register('SOGOU.$states', function (La) {

    this.disperse = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            console.log('page: disperse');
            sogou.manager.lock();
            this._t = 0;
            this.T = 1;
            //icons 的小球原路退回,交换f_pox 和t_pos;
            if(SOGOU.$func.iconsParticles) {
                for (var i = 0; i < SOGOU.$func.iconsParticles.length; i++) {
                    var ball = SOGOU.$func.iconsParticles[i];
                    var f_xpos = ball.f_xpos;
                    ball.f_xpos = ball.t_xpos;
                    ball.t_xpos = f_xpos;
                    var f_ypos = ball.f_ypos;
                    ball.f_ypos = ball.t_ypos;
                    ball.t_ypos = f_ypos;
                    var f_zpos = ball.f_zpos;
                    ball.f_zpos = ball.t_zpos;
                    ball.t_zpos = f_zpos;
                }
            }

            //dna的背景球
            SOGOU.$func.initDnaBgBalls();

            //dna的小球
            SOGOU.$func.initDnaBalls();

            SOGOU.$func.lastScale = SOGOU.$func.scale;
            setTimeout(function () {
                for (var i = 0; i < SOGOU.$func.dnaBalls.length; i++) {
                    SOGOU.$func.stage.addChild(SOGOU.$func.dnaBalls[i]);
                }
                for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                    SOGOU.$func.stage.addChild(SOGOU.$func.dnaBgBalls[i]);
                }
            }, 600);
            this.dnaList = [];
        },
        leave: function () {
            // 删除此屏的dna小球
            if(SOGOU.$func.dnaBalls) {
                for (var i = 0; i < SOGOU.$func.dnaBalls.length; i++) {
                    SOGOU.$func.stage.removeChild(SOGOU.$func.dnaBalls[i]);
                }
            }
        },
        update: function (dt) {
            this._t += dt;
            if(SOGOU.$func.iconsParticles) {
                for (var i = 0; i < SOGOU.$func.iconsParticles.length; i++) {
                    var ball = SOGOU.$func.iconsParticles[i];
                    var scale = ball.getScale();
                    ball.width = ball.t_width * scale;
                }
            }
        },
        transition: function () {
            // if (this._t > 5) {
            //     sogou.manager.next(true);
            // }
        },
        draw: function () {
            //
            if (this._t > 0.7) {
                for (var i = 0; i < SOGOU.$func.dnaBalls.length; i++) {
                    var ball = SOGOU.$func.dnaBalls[i];
                    SOGOU.$func.tween2(ball, this._t, 1.5, SOGOU.$func.bezier4); //1.5
                    var pos = ball.getScreenXY();
                    ball.x = pos.x;
                    ball.y = pos.y;
                    if(ball.end && i == SOGOU.$func.dnaBalls.length -1) {
                        sogou.manager.next(true);
                    }
                }
            }
            if(SOGOU.$func.iconsParticles) {
                for (var i = 0; i < SOGOU.$func.iconsParticles.length; i++) {
                    var ball = SOGOU.$func.iconsParticles[i];
                    SOGOU.$func.tween2(ball, this._t, 1.2, SOGOU.$func.bezier1);
                    var pos = ball.getScreenXY();
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
            }
            //dna背景出场
            if (this._t > 0.7) {
                for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                    var ball = SOGOU.$func.dnaBgBalls[i];
                    SOGOU.$func.tween2(ball, this._t, 1, SOGOU.$func.bezier1);
                    var pos = ball.getScreenXY();
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
            }
        }
    });
});