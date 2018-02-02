Laro.register('SOGOU.$states', function (La) {
    this.vibrate = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            console.log('page: vibrate');
            this._t = 0;
            this.T = 1;
        },
        leave: function () {
            // 文案淡出
            SOGOU.$func.w3.classList.add("fadeout");
        },
        update: function (dt) {
            this._t += dt;
        },
        transition: function () {
            if (this._t > 3) {
                sogou.manager.unlock();
                if (!!sogou.manager.auto) {
                    sogou.manager.next();
                }
            }
        },
        draw: function () {
            for (var i = 0; i < SOGOU.$func.iconsParticles.length; i++) {
                var ball = SOGOU.$func.iconsParticles[i];
                if (ball.outer) {
                    SOGOU.$func.vibratePart2(ball, this._t);
                    // ball.xpos += ball.dx;
                    // ball.ypos += ball.dy;
                }
                pos = ball.getScreenXY();
                ball.x = pos.x;
                ball.y = pos.y;
            }
        }
    });
});