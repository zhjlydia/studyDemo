Laro.register('SOGOU.$states', function (La) {
    // logo定帧动画/呼吸效果
    this.breathe = La.BaseState.extend(function () {
    }).methods({
        enter: function () {
            console.log('page breathe');
            this._t = 0;
            this.T = 1;
            SOGOU.$func.resetBallStartTime(SOGOU.$func.logoParticles);
        },
        leave: function () {
            for (var i = 0; i < SOGOU.$func.logoParticles.length; i++) {
                ball = SOGOU.$func.logoParticles[i];
                delete ball.dx;
                delete ball.dy;
                delete ball.bi_x;
                delete ball.bi_y;
            }
            // 文案淡出
            SOGOU.$func.w1.classList.add("fadeout");
        },
        update: function (dt) {
            this._t += dt;
        },
        transition: function () {
            if (this._t > 6) {
                sogou.manager.unlock();
                if(!!sogou.manager.auto) {
                    sogou.manager.next();
                }
            }
        },
        draw: function () {
            for (var i = 0; i < SOGOU.$func.logoParticles.length; i++) {
                var ball = SOGOU.$func.logoParticles[i];
                SOGOU.$func.breathe(ball, this._t);
                SOGOU.$func.vibrate(ball, this._t);
                var pos = ball.getScreenXY();
                ball.x = pos.x;
                ball.y = pos.y;
            }
        }
    });
});
