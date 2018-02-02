Laro.register('SOGOU.$states', function (La) {
    // çżťč˝Ź
    this.roll = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            console.log('page: roll');
            sogou.manager.lock();
            this._t = 0;
            this.T = 1;
            var f = this.f = SOGOU.$func;
            if (!f.ball_head) {
                f.initBallHead();
            }
            var ball_head = this.ball_head = document.getElementById("ball_head");
            var radius = f.ball_head.width;
            var left = f.ball_head.x - radius;
            ball_head.style.left = f.canvas.width / 2 + left + "px";
            ball_head.style.width = 2 * radius + "px";
            ball_head.style.height = 2 * radius + "px";
            ball_head.style.display = "block";
            ball_head.classList.add("roll");
            f.canvas.classList.add("changebgblue");
            this.start_t = 0.6;

            if (!f.iconsParticles) {
                f.initParticlesIcons();
            }
            for (var i = 0; i < f.iconsParticles.length; i++) {
                var ball = f.iconsParticles[i];
                f.stage.addChild(ball);
                f.resetIcon(ball, this.start_t);
            }

            this.bezier1 = generateBezier(0, 0, 1, 1);
            // 文案淡出
            SOGOU.$func.w2.classList.remove("slideright");
            SOGOU.$func.w2.classList.add("fadeout");
        },
        leave: function () {},
        update: function (dt) {
            this._t += dt;
            if (this._t >= this.start_t) {
                for (var i = 0; i < this.f.iconsParticles.length; i++) {
                    var ball = this.f.iconsParticles[i];
                    var scale = ball.getScale();
                    ball.width = ball.t_width * scale;
                }
            }
        },
        transition: function () {
            if (this._t > 2) {
                sogou.manager.next(true);
            }
        },
        draw: function () {
            if (this._t >= this.start_t) {
                for (var i = 0; i < this.f.iconsParticles.length; i++) {
                    var ball = this.f.iconsParticles[i];
                    if(i == 0) {
                        ball.index = 0;
                    }
                    this.f.tween2(ball, this._t, this.T, this.bezier1);
                    var pos = ball.getScreenXY();
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
            }
            if (this._t > this.T) {
                this.ball_head.style.display = "none";
                // 文案淡入
                SOGOU.$func.w3.classList.add("fadein");
            }
        }
    });
});
