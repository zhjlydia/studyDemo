Laro.register('SOGOU.$func', function (La) {
    this.breathe = function (ball, t) {
        // 缩放
        if (ball.bi_x == undefined) {
            ball.bi_x = ball.xpos;
        }
        if (ball.bi_y == undefined) {
            ball.bi_y = ball.ypos;
        }
        ball.dx = ball.dx ? ball.dx : 0;
        ball.dy = ball.dy ? ball.dy : 0;
        ball.xpos = ball.dx + ball.bi_x + 0.02 * ball.xpos * (1 + Math.sin(2 * Math.PI * t / 3 + 3 * Math.PI / 2));
        ball.ypos = ball.dy + ball.bi_y + 0.02 * ball.ypos * (1 + Math.sin(2 * Math.PI * t / 3 + 3 * Math.PI / 2));
    };

    this.vibrate = function (ball, t) {
        if (ball.step == undefined || ball.step == 0) {
            ball.step = 0;
            ball.direction = 1;
            ball.theta = randomTheta();
            ball.d = range(5, 20);
            ball.dx = 0;
            ball.dy = 0;
        }
        if (ball.direction > 0) {
            ball.step++;
            ball.dx += 1.2 * Math.cos(ball.theta) / 6;
            ball.dy += 1.2 * Math.sin(ball.theta) / 6;
            //console.log(t,t* Math.cos(theta));
        } else {
            ball.step--;
            ball.dx -= 1.2 * Math.cos(ball.theta) / 6;
            ball.dy -= 1.2 * Math.sin(ball.theta) / 6;
            // ball.zpos -= 1.2;
        }
        if (ball.step >= ball.d) {
            ball.direction = -1;
        } else if (ball.step <= 0) {
            ball.direction = 1;
        }
    };

});