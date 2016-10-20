Laro.register('SOGOU.$func', function (La) {
    this.forwardAndBack = function (ball, from, to) {
        if (ball.step == undefined || ball.step == 0) {
            ball.step = 0;
            ball.direction = 1;
            ball.d = to - from;
            // ball.dx = 0;
        }
        if (ball.direction > 0) {
            ball.step++;
            ball.xpos += 1.2;
        } else {
            ball.step--;
            ball.xpos -= 1.2;
        }
        if (ball.step >= ball.d) {
            ball.step = ball.d;
            ball.direction = -1;
        } else if (ball.step <= 0) {
            ball.step = 0;
            ball.direction = 1;
        }
    }

    this.bigAndSmall = function (ball) {
        ball.width += (ball.direction > 0 ? 1 : -1) * 0.03;
    }

    this.initBallHead = function() {
        if(this.ball_head) {
            this.stage.removeChild(this.ball_head);
            delete this.ball_head;
        }
        // 建第二幕的小球和线
        var width = 16 * this.scale;
        this.ball_head = new this.createBall(this.stage, "rgb(70,147,236)", width, -this.canvas.width / 2 - 50, 0, 0);
        var pos = this.ball_head.getScreenXY();
        this.ball_head.x = pos.x;
        this.ball_head.y = pos.y;
        this.ball_head.f_xpos = this.ball_head.xpos;
        this.ball_head.t_xpos = 500 * this.scale;
        this.stage.addChild(this.ball_head);
        this.ball_head.start_t = 0.5;
    };

    this.initBallLine = function() {
        if(this.line_arr) {
            for (var i = 0; i < this.line_arr.length; i++) {
                var line = this.line_arr[i]
                this.stage.removeChild(line);
            }
            delete this.line_arr;
        }
        if(this.ball_line) {
            this.stage.removeChild(this.ball_line);
            delete this.ball_line;
        }
        // 第二幕的小球后的线
        var width = this.canvas.width/2 + (500 + 200) * this.scale,
            height = 4,
            x = -(this.canvas.width/2 + (500 + 200) * this.scale),
            y = this.stage.height / 2,
            z = 0,
            color_e = color_s = "rgba(70,147,236,1)";
        this.ball_line = new this.createLine(this.stage, width, height, x, y, z, color_s, color_e);
        this.stage.addChild(this.ball_line);
        var pos = this.ball_line.getScreenXY();
        this.ball_line.x = pos.x;
        this.ball_line.y = pos.y;
        this.ball_line.f_xpos = pos.x;
        this.ball_line.t_xpos = -200 * this.scale;
        this.ball_line.start_t = 0.5;

        var line_arr = [
            { width: 221, left: 580, top: 164, a: 0.5 },
            { width: 246, left: 80, top: 220, a: 0.2 },
            { width: 350, left: 420, top: 244, a: 1 },
            { width: 210, left: 948, top: 358, a: 0.7 },
            { width: 263, left: 0, top: 395, a: 0.3 },
            { width: 371, left: 830, top: 442, a: 0.7 },
            { width: 375, left: 511, top: 678, a: 1 },
            { width: 286, left: 275, top: 846, a: 0.7 },
        ];
        //第二幕的线条
        this.line_arr = [];
        for (var i = 0; i < line_arr.length; i++) {
            var line = this.line_arr[i] = new this.createLine(this.stage, line_arr[i]["width"], height, line_arr[i]["left"], line_arr[i]["top"], z, "rgba(70,147,236,0)", "rgba(70,147,236," + line_arr[i]["a"] + ")");
            this.stage.addChild(line);
            var pos = line.getScreenXY();
            line.x = this.stage.width + pos.x;
            line.y = pos.y;
            line.f_xpos = line.x;
            line.t_xpos = -pos.x;
            line.end = false;
            line.start_t = 0.5;
        }
    };

});