Laro.register('SOGOU.$func', function (La) {

    this.initDnaList = function(init_t) {
        this.dnaList = [];
        // [x,y,scale,opacity]
        var pos_arr = arr3;
        var width = 20;
        for (var i = 0; i < pos_arr.length; i++) {
            var scale = pos_arr[i][2],
                start_t,
                margin;
            var r = width * scale * this.scale;
            var margin = 59;
            var d = 117;
            if (i <= 4) {
                start_t = 0.5;
            } else {
                start_t = 0;
            }
            var ball = this.createDNA(pos_arr[i][0], pos_arr[i][1], r, margin, d, pos_arr[i][3], start_t, init_t, scale);
            ball.scale = scale;
            ball.color = pos_arr[i][3];
            ball.start_t = start_t;
            this.dnaList.push(ball);
        }
    }

    this.resetDnaList = function() {
        console.log("remove1");
        var _this = this;
        this.dnaList.forEach(function(dna) {
            dna.forEach(function(item) {
                _this.stage.removeChild(item.ball_left);
                _this.stage.removeChild(item.ball_right);
                console.log("remove");
            });
        });
        this.initDnaList();
    }

    this.createDNA = function (x, y, r, margin, d, color, start_t, t, scale) {
        var dna = [];
        d = d * scale * this.scale;
        for (var i = 0; i < 7; i++) {
            // y += d;
            var ball_left = new this.createBall(this.stage, color, r, x * SOGOU.$func.scale, ( y + margin * i * scale ) * SOGOU.$func.scale, 0);
            var ball_right = new this.createBall(this.stage, color, r, x * SOGOU.$func.scale, (y + margin * i * scale) * SOGOU.$func.scale, 0);
            this.stage.addChild(ball_left);
            this.stage.addChild(ball_right);
            var pos = ball_left.getScreenXY();
            ball_left.x = pos.x;
            ball_left.y = pos.y;
            var pos = ball_right.getScreenXY();
            ball_right.x = pos.x;
            ball_right.y = pos.y;
            dna[i] = {};
            dna[i].ball_left = ball_left;
            dna[i].ball_right = ball_right;
            ball_left.start_t =  i * 0.4;
            ball_right.start_t = i * 0.4;

            var pos = ball_left.getScreenXY();
            ball_left.x = pos.x;
            ball_left.y = pos.y;
            var pos = ball_right.getScreenXY();
            ball_right.x = pos.x;
            ball_right.y = pos.y;
        }
        SOGOU.$func.dnaRotate(start_t + t, dna, d, 5 * scale * SOGOU.$func.scale, 5 * scale * SOGOU.$func.scale, color);
        for (var i = 0; i < 7; i++) {
            // 划线时的引导球，不可见
            var ball_connect = new SOGOU.$func.createBall(SOGOU.$func.stage, "#fff", 0, dna[i].ball_left.xpos, dna[i].ball_left.ypos, 0);
            ball_connect.f_xpos = dna[i].ball_left.x;
            ball_connect.f_ypos = dna[i].ball_left.y;
            ball_connect.t_xpos = dna[i].ball_right.x;
            ball_connect.t_ypos = dna[i].ball_right.y;
            dna[i].ball_connect = ball_connect;
        }
        return dna;
    };

    this.dnaRotate = function (t, dna, d, line_width, scale_d, color) {
        for(var i = 0; i < 7; i++ ) {
            var ball_left = dna[i].ball_left;
            var ball_right = dna[i].ball_right;
            var x = 0;
            var y = 0;
            if(!ball_left.stop) {
                this.roll(ball_left, t, d, 0);
                this.scalew(ball_left, t, scale_d, 1);
            }
            if(!ball_right.stop) {
                this.roll(ball_right, t, -d, 0);
                this.scalew(ball_right, t, scale_d, -1);
            }
            var pos = ball_left.getScreenXY();
            ball_left.x = pos.x;
            ball_left.y = pos.y;
            var pos = ball_right.getScreenXY();
            ball_right.x = pos.x;
            ball_right.y = pos.y;
        }
    }

    this.connectDnaSlow = function(t, T, dna, line_width, color, bezier) {
        for(var i = 0; i < 7; i++ ) {
            var ball_connect = dna[i].ball_connect;
            var ball_left = dna[i].ball_left;
            this.tween(ball_connect, t, T, bezier);
            var pos = ball_connect.getScreenXY();
            ball_connect.x = pos.x;
            ball_connect.y = pos.y;

            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width/2 + ball_left.x, this.canvas.height/2 + ball_left.y);
            this.ctx.lineTo(this.canvas.width/2 + ball_connect.xpos, this.canvas.height/2 + ball_connect.ypos);
            this.ctx.lineWidth = line_width;
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    this.connectDna = function(dna, line_width, color) {
        for(var i = 0; i < 7; i++ ) {
            var ball_left = dna[i].ball_left;
            var ball_right = dna[i].ball_right;
            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width/2 + ball_left.x, this.canvas.height/2 + ball_left.y);
            this.ctx.lineTo(this.canvas.width/2 + ball_right.x, this.canvas.height/2 + ball_right.y);
            this.ctx.lineWidth = line_width;
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
});