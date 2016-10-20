Laro.register('SOGOU.$func', function (La) {
    this.initParticlesIcons = function() {
        this.iconsParticles = this.getParticles(arr2, "#fff", "icons");
        for (var i = 0; i < this.iconsParticles.length; i++) {
            var ball = this.iconsParticles[i];
            // var a = Math.PI * 2 * Math.random();
            // var b = Math.PI * 2 * Math.random();
            ball.f_xpos = range(-this.vpx, this.vpx);
            ball.f_ypos = range(-this.vpy, this.vpy);
            //perspective: 250
            ball.f_zpos = -249;
            ball.zpos = ball.f_zpos;
            ball.t_zpos = 0;
        }
    }
    this.resetIcon = function(ball, start_t) {
        if(start_t) {
            ball.start_t = start_t;
        }
        ball.t_width = ball.width;
    }
});
