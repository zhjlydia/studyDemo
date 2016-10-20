Laro.register('SOGOU.$states', function (La) {
    //logo散开离场&小球和线入场
    this.expand = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            console.log('page: expand');
            sogou.manager.lock();
            this.state = 2;
            this._t = 0;
            this.T = 1, this.step = 0;

            var f = this.f = SOGOU.$func;
            if (!f.logoParticles) {
                f.initParticlesLogo();
            }

            f.resetBalls();
            f.resetBallStartTime(f.logoParticles);

            f.initBallHead();
            f.initBallLine();

            this.bezier1 = generateBezier(.53, .24, .88, .55);
            this.bezier2 = generateBezier(0, 0, 1, 1);

        },
        leave: function () {
            this.f.stage.removeChild(this.f.ball_head);
            this.f.stage.removeChild(this.f.ball_line);
            for (var i = 0; i < this.f.line_arr.length; i++) {
                this.f.stage.removeChild(this.f.line_arr[i]);
            }
        },
        update: function (dt) {
            this._t += dt;
        },
        transition: function () {
            if (this._t > 6) {
                sogou.manager.unlock();
                if (!!sogou.manager.auto) {
                    sogou.manager.next();
                }
            }
        },
        draw: function () {
            // 散开并向右移动
            for (var i = 0; i < this.f.logoParticles.length; i++) {
                var ball = this.f.logoParticles[i];
                if (!ball.end) {
                    // logo小球散开
                    this.f.tween(ball, this._t, 0.5, SOGOU.$func.bezier2);
                } else {
                    // logo小球从右离场
                    if (!ball.step2) {
                        ball.step2 = true;
                        ball.t_xpos = this.f.canvas.width * 2.1 / 2;
                        ball.f_xpos = ball.xpos;
                        ball.t_ypos = ball.ypos;
                        ball.f_ypos = ball.ypos;
                        ball.t_zpos = ball.zpos;
                        ball.f_zpos = ball.zpos;
                        ball.start_t = this._t;
                    } else {
                        this.f.tween(ball, this._t, 0.5, SOGOU.$func.bezier2);
                    }
                }
                var pos = ball.getScreenXY();
                ball.x = pos.x;
                ball.y = pos.y;
            }

            // 左边的圆球和线入场
            // delay -> start_t
            if (this._t <= this.f.ball_head.start_t) {
                return;
            }

            this.f.tween2(this.f.ball_head, this._t, 1, this.bezier2);
            var pos = this.f.ball_head.getScreenXY();
            this.f.ball_head.x = pos.x;
            this.f.ball_head.y = pos.y;
            // 文案淡入
            SOGOU.$func.w2.classList.add("slideright");

            if (!this.f.ball_line.end) {
                this.f.tween2(this.f.ball_line, this._t, 1, this.bezier1);
                pos = this.f.ball_line.getScreenXY();
                this.f.ball_line.x = pos.x;
                this.f.ball_line.y = pos.y;
            }

            if (this.f.ball_line.end) {
                delete this.f.ball_head.f_xpos;
                delete this.f.ball_head.t_xpos;
                // this.f.ball_head.xpos =
                this.f.forwardAndBack(this.f.ball_head, SOGOU.$func.canvas.width/2  + (500-150) * SOGOU.$func.scale, SOGOU.$func.canvas.width/2  + 500 * SOGOU.$func.scale)
                this.f.bigAndSmall(this.f.ball_head);

                var pos = this.f.ball_head.getScreenXY();
                this.f.ball_head.x = pos.x;
                this.f.ball_head.y = pos.y;

                this.f.forwardAndBack(
                    this.f.ball_line,
                    -200 * this.f.scale,
                    -50 * this.f.scale
                );
                pos = this.f.ball_line.getScreenXY();
                this.f.ball_line.x = pos.x;
                this.f.ball_line.y = pos.y;

                // 其他的线条从右入场
                for (var i = 0; i < this.f.line_arr.length; i++) {
                    if (this.f.line_arr[i].end) {
                        this.f.line_arr[i].end = false;
                        this.f.line_arr[i].start_t = this._t;
                    };
                    this.f.tween(this.f.line_arr[i], this._t, range(0.5, 5), this.bezier2);
                    pos = this.f.line_arr[i].getScreenXY();
                    this.f.line_arr[i].x = pos.x;
                    this.f.line_arr[i].y = pos.y;
                }
            }


        }
    });

});