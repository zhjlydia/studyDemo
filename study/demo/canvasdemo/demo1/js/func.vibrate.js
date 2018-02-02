Laro.register('SOGOU.$func', function (La) {
    this.initVibrate = function(ball) {
        ball.step = 0;
        ball.direction = 1;
        ball.theta = randomTheta();
        ball.d = range(10, 50);
        ball.dx = 0;
        ball.dy = 0;
        ball.bi_x = ball.xpos;
        ball.bi_y = ball.ypos;
    }
    this.vibratePart2 = function (ball, t, speed) {
        speed = speed ? speed : 1.2;
        if (ball.step == undefined || ball.step == 0) {
            this.initVibrate(ball);
        }
        if (ball.direction > 0) {
            ball.step++;
            ball.dx += speed * Math.cos(ball.theta) / 6;
            ball.xpos = ball.bi_x + ball.dx;
            ball.dy += speed * Math.sin(ball.theta) / 6;
            ball.ypos = ball.bi_y + ball.dy;
            //console.log(t,t* Math.cos(theta));
        } else {
            ball.step--;
            ball.dx -= speed * Math.cos(ball.theta) / 6;
            ball.xpos = ball.bi_x + ball.dx;
            ball.dy -= speed * Math.sin(ball.theta) / 6;
            ball.ypos = ball.bi_y + ball.dy;
            // ball.zpos -= 1.2;
        }
        if (ball.step >= ball.d) {
            ball.direction = -1;
        } else if (ball.step <= 0) {
            ball.direction = 1;
        }
    }

});