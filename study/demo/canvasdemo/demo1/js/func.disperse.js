Laro.register('SOGOU.$func', function (La) {
    this.initDnaBgBalls = function() {
        this.dnaBgBalls = [];
        for (var i = 0; i < 30; i++) {
            var f_x = range(-this.canvas.width / 3, this.canvas.width / 3);
            var t_x = f_x + range(-100, 100);
            var f_y = range(-this.canvas.height / 3, this.canvas.height / 3);
            var t_y = f_y + range(-100, 100);
            var ball = new this.createBall(this.stage, "rgba(255,255,255," + range(0, 0.5) + ")", range(2, 7), 3000, 3000, 250);
            ball.f_xpos = f_x;
            ball.f_ypos = f_y;
            ball.f_zpos = 200;
            ball.t_xpos = t_x;
            ball.t_ypos = t_y;
            ball.t_zpos = 0;
            ball.t_width = ball.width;
            ball.start_t = 0.5;
            this.dnaBgBalls.push(ball);
        }
    }

    this.resetDnaBgBalls = function() {
        for (var i = 0; i < this.dnaBgBalls.length; i++) {
            ball = this.dnaBgBalls[i];
            ball.t_xpos = ball.t_xpos / this.lastScale * this.scale;
            ball.t_ypos = ball.t_ypos / this.lastScale * this.scale;
            ball.t_width = ball.t_width / this.lastScale * this.scale;
        }
    }

    this.initDnaBalls = function() {
        var pos_arr = arr3;
        var width = 20;
        this.dnaBalls = [];
        for (var i = 0; i < pos_arr.length; i++) {
            var end_t = 0;//i * 0.1;
            for (var j = 0; j < 7; j++) {
                var scale = pos_arr[i][2];
                var color = pos_arr[i][3];
                var t_width = width * scale * SOGOU.$func.scale;
                var f_width = 1;//t_width/20;
                var f_x_left = range(-SOGOU.$func.canvas.width / 3, SOGOU.$func.canvas.width / 3);
                var f_x_right = range(-SOGOU.$func.canvas.width / 3, SOGOU.$func.canvas.width / 3);
                var f_y_left = range(-SOGOU.$func.canvas.height / 3, SOGOU.$func.canvas.height / 3);
                var f_y_right = range(-SOGOU.$func.canvas.height / 3, SOGOU.$func.canvas.height / 3);
                var ball_left = new this.createBall(SOGOU.$func.stage, color, f_width, 3000, 3000, 250);
                var ball_right = new this.createBall(SOGOU.$func.stage, color, f_width, 3000, 3000, 250);
                ball_left.f_xpos = f_x_left;
                ball_left.f_ypos = f_y_left;
                ball_left.f_zpos = 0;
                ball_left.f_width = f_width;
                ball_left.width = f_width;
                ball_right.f_xpos = f_x_right;
                ball_right.f_ypos = f_y_right;
                ball_right.f_zpos = 0;
                ball_right.f_width = f_width;
                ball_right.width = f_width;

                if (i <= 4) {
                    var start_t = 0.5;
                } else {
                    var start_t = 0;
                }

                var margin = 59;
                var t_x = pos_arr[i][0] * this.scale;
                var t_y = ( pos_arr[i][1] + margin * j * scale ) * this.scale;

                var d = 117 * scale * this.scale;
                var pos = this.getRollPos(ball_left, Math.PI + 0.06 + start_t, j * 0.4, t_x, t_y, d, 0);
                ball_left.t_xpos = pos.x;
                ball_left.t_ypos = pos.y;
                ball_left.t_zpos = 0;
                ball_left.t_width = t_width;
                var pos = this.getRollPos(ball_right, Math.PI + 0.06 + start_t, j * 0.4, t_x, t_y, -d, 0);
                ball_right.t_xpos = pos.x;
                ball_right.t_ypos = pos.y;
                ball_right.t_zpos = 0;
                ball_right.t_width = t_width;

                var width_left = this.getWidthOfTime(ball_left, Math.PI + 0.06 + start_t, start_t + j * 0.4,  5 * scale * SOGOU.$func.scale, t_width, 1);

                ball_left.t_width = width_left;
                var width_right = this.getWidthOfTime(ball_left, Math.PI + 0.06 + start_t, start_t + j * 0.4,  5 * scale * this.scale, t_width, -1);
                ball_right.t_width = width_right;

                ball_left.color = ball_right.color = color;
                ball_left.scale = ball_right.scale = scale;
                ball_left.end_t = range(0,0.3);
                ball_right.end_t = range(0,0.3);
                // 主dna先到，最大的那个最后到
                if( i == 5) {
                    ball_left.end_t = 0;
                    ball_right.end_t = 0;
                }else if(i == 8) {
                    ball_left.end_t = 0.3;
                    ball_right.end_t = 0.3;
                }
                this.dnaBalls.push(ball_left);
                this.dnaBalls.push(ball_right);
                //setTimeout(function(){
                // SOGOU.$func.stage.addChild(ball);
                //}, 0.3);
            }
            //console.log(this.dnaBalls);
        }
    }

    //resize窗口时重置
    this.resetDnaBalls = function() {
        for (var i = 0; i < this.dnaBalls.length; i++) {
            var ball = this.dnaBalls[i];
            ball.t_width = ball.t_width / this.lastScale * this.scale;
            ball.t_xpos = ball.t_xpos / this.lastScale * this.scale;
            ball.t_ypos = ball.t_ypos / this.lastScale * this.scale;
        }
    }

    this.resetIconBalls = function() {
        // this.iconsParticles = this.getParticles(arr2, "#fff", "icons");
        for (var i = 0; i < this.iconsParticles.length; i++) {
            var ball = this.iconsParticles[i];
            // var a = Math.PI * 2 * Math.random();
            // var b = Math.PI * 2 * Math.random();
            ball.t_xpos = range(-this.vpx, this.vpx);
            ball.t_ypos = range(-this.vpy, this.vpy);
            //perspective: 250
            ball.t_zpos = -249;
            // ball.zpos = ball.f_zpos;
            // ball.t_zpos = 0;
        }
    }

    this.dnaRotateSingle = function (t, dna, d, line_width, scale_d, color) {
        //for(var i = 0; i < 7; i++ ) {
        var ball_left = dna.ball_left;
        var ball_right = dna.ball_right;
        var x = 0;
        var y = 0;
        this.roll(ball_left, t, d, 0);
        this.roll(ball_right, t, -d, 0);
        this.scalew(ball_left, t, scale_d, 1);
        this.scalew(ball_right, t, scale_d, -1);
        var pos = ball_left.getScreenXY();
        ball_left.x = pos.x;
        ball_left.y = pos.y;
        var pos = ball_right.getScreenXY();
        ball_right.x = pos.x;
        ball_right.y = pos.y;
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2 + ball_left.x, this.canvas.height / 2 + ball_left.y);
        this.ctx.lineTo(this.canvas.width / 2 + ball_right.x, this.canvas.height / 2 + ball_right.y);
        this.ctx.lineWidth = line_width;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.closePath();
        //}
    }
});