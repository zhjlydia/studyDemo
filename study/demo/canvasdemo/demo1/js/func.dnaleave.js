Laro.register('SOGOU.$func', function (La) {
    this.initMainDna = function() {
        this.dnaMainBalls = [];
        var dna_main = SOGOU.$func.dna_main = SOGOU.$func.dnaList[5];
        var dx = Math.abs(dna_main[0].ball_right.xpos + dna_main[0].ball_left.xpos)/2;
        var dy = Math.abs(dna_main[0].ball_left.ypos + dna_main[6].ball_left.ypos)/2;
        for(var i = 0 ; i < 7; i++) {
            var ball_left = dna_main[i].ball_left;
            var ball_right = dna_main[i].ball_right;
            ball_left.f_zpos = 0;
            ball_left.t_zpos = 69;
            ball_left.f_xpos = ball_left.xpos;
            ball_left.f_ypos = ball_left.ypos;
            ball_left.t_xpos = ball_left.xpos + dx;
            ball_left.t_ypos = ball_left.ypos + dy;
            ball_right.f_xpos = ball_right.xpos;
            ball_right.f_ypos = ball_right.ypos;
            ball_right.t_xpos = ball_right.xpos + dx;
            ball_right.t_ypos = ball_right.ypos + dy;
            ball_right.f_zpos = 0;
            ball_right.t_zpos = 69;
            this.dnaMainBalls.push(ball_left);
            this.dnaMainBalls.push(ball_right);
        }
    }

    this.resetMainDna = function() {
        for(var i = 0; i < this.dnaMainBalls.length; i++) {
            var ball = this.dnaMainBalls[i];
            ball.t_xpos = ball.t_xpos/this.lastScale * this.scale;
            ball.t_ypos = ball.t_ypos/this.lastScale * this.scale;
            ball.bi_w = ball.bi_w / this.lastScale * this.scale;
        }
    }

    this.resetDnaBalls2 = function() {
        this.dnaBalls = [];
        for(var i = 0 ; i < SOGOU.$func.dnaList.length; i++) {
            // 主nda不离场
            if(i == 5) {
                continue;
            }
            var dna = SOGOU.$func.dnaList[i];
            for(var j = 0 ; j < 7; j++) {
                var ball_left = dna[j].ball_left;
                var ball_right = dna[j].ball_right;
                ball_left.f_zpos = ball_right.f_zpos = 0;
                ball_left.t_zpos = ball_right.t_zpos = -200;
                ball_left.bi_width = ball_left.width;
                ball_right.bi_width = ball_right.width;
                ball_left.start_t = ball_right.start_t = 0;
                this.dnaBalls.push(ball_left);
                this.dnaBalls.push(ball_right);
            }
        }
    }

    this.resetDnaBgBalls2 = function() {
        if(SOGOU.$func.dnaBgBalls) {
            for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                var ball = SOGOU.$func.dnaBgBalls[i];
                ball.f_zpos = ball.zpos;
                ball.t_zpos = -300;
                ball.bi_width = ball.width;
                ball.start_t = 0;
            }
        }
    }
});