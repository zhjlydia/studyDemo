Laro.register('SOGOU.$func', function (La) {

    this.drawArcSlow = function(obj) {
        var ctx = obj.ctx,
        x = obj.x + this.canvas.width/2,
        y = obj.y + this.canvas.height/2,
        t = obj.t,
        T = obj.T,
        r = obj.r,
        line_weight = obj.line_weight,
        color = obj.color,
        f_theta = obj.f_theta,
        t_theta = obj.t_theta,
        bezier = obj.bezier;
        if(t > T)
            t = T;
        var theta = f_theta + bezier(t / T) * (t_theta - f_theta);
        ctx.lineWidth = line_weight;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.arc(x, y, r, f_theta, theta);
        this.ctx.stroke();

        this.ctx.closePath();
        // console.log(this.canvas.width/2);
    }

    this.resetDnaMain = function() {
        for(var i = 0; i < this.dnaMainBalls.length; i++) {
            ball = this.dnaMainBalls[i];
            ball.xpos = ball.xpos / this.lastScale * this.scale;
            ball.ypos = ball.ypos / this.lastScale * this.scale;
            ball.bi_w = ball.bi_w / this.lastScale * this.scale;
            ball.width = ball.width / this.lastScale * this.scale;
        }
    }
});