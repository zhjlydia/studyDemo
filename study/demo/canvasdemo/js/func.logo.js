Laro.register('SOGOU.$func', function (La) {
    var vpx = this.vpx, vpy = this.vpy;
    var _this = this;
    this.particle = function (stage, color, canvas, id, w, x_std, y_std, z) {
        this.canvas = canvas, scale = this.scale;

        var ball = this.createBall(stage, color, w, x_std, y_std, z, id);
        ball.id = id;

        var _w = w;
        ball._resize = function (scale) {
            var state = sogou.manager.index;
            switch (state) {
                // logo入场
                case 0:
                    w = _w * scale;
                    x = x_std * scale;
                    y = y_std * scale;
                    ball.t_xpos = x;
                    ball.t_ypos = y;
                    ball.t_zpos = ball.zpos;
                    ball.width = w;

                    var t_x = ball.t_xpos;
                    var t_y = ball.t_ypos;
                    if (t_x > 0 && t_y >= 0) {
                        var theta0 = Math.atan(t_y / t_x);
                    } else if (t_x > 0 && t_y < 0) {
                        var theta0 = 2 * Math.PI + Math.atan(t_y / t_x);
                    } else if (t_x < 0) {
                        var theta0 = Math.PI + Math.atan(t_y / t_x);
                    } else if (t_x == 0 && t_y > 0) {
                        var theta0 = 0.5 * Math.PI;
                    } else if (t_x == 0 && t_y < 0) {
                        var theta0 = 1.5 * Math.PI;
                    }
                    // 内圈-右
                    if (x_std < 190 && x_std > 0 && y_std < 190 && y_std > -190) {
                        var start_t = (y_std + 190) / (5 * 380);
                        // var start_t = range(0,start_t);
                        start_t *= 5;
                        var t_theta = theta0 - 1.6 * Math.PI / 2;
                    } else if (x_std < 0 && x_std > -190 && y_std < 190 && y_std > -190) { //内圈-左
                        var start_t = (-y_std + 190) / (5 * 380);
                        start_t *= 5;
                        var t_theta = theta0 - 1.6 * Math.PI / 2;
                    } else { //外圈-上
                        var start_t = range(1000, 2000) / 1000;
                        var t_theta = theta0 - 2 * Math.PI / 2;
                    }

                    ball.start_t = start_t;
                    var r1 = 1000;
                    ball.r1 = r1;
                    ball.t_theta = t_theta;
                    break;
                // logo呼吸
                case 1:
                    ball.xpos = x_std * scale + 161 * scale;
                    ball.ypos = y_std * scale;
                    var pos = ball.getScreenXY();
                    ball.x = pos.x;
                    ball.y = pos.y;
                    ball.width = _w * scale;
                    if (ball.bi_x != undefined) {
                        ball.bi_x = ball.xpos;
                    }
                    if (ball.bi_y != undefined) {
                        ball.bi_y = ball.ypos;
                    }
                    break;
                //线
                // case 2:
                //     _this.initBallHead();
                //     _this.initBallLine();
                //     break;
                case 3:
                case 4:
                    w = _w * scale;
                    x = x_std * scale;
                    y = y_std * scale;
                    ball.xpos = x;
                    ball.ypos = y;
                    _this.initVibrate(ball);
                    ball.t_xpos = x;
                    ball.t_ypos = y;
                    ball.width = w;
                    _this.resetIcon(ball);
                    break;
                default:
            }
        }

        ball._resize(this.scale);

        ball.x = 3000;
        ball.y = 3000;
        ball.z = 0;

        // ball.startAnimTime = (+new Date);
        // ball.end = true;
        // ball.type = id;

        ball.setVanishPoint(0, 0);
        ball.setCenterPoint(0, 0, z);

        // ball.moveX = 1 - Math.random()*2;
        //stage.addChild(ball);

        return ball;
    };

    this.getParticles = function (arr, color, type) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.drawImage(image, 0, 0, w, h, this.canvas.width/2-w/4, this.canvas.height/2-h/4, w/2, h/2);
        //var imageData = this.ctx.getImageData(this.canvas.width/2-w/4, this.canvas.height/2-h/4, w/2, h/2);
        var ret = [], color_s;
        for (var i = 0; i < arr.length; i++) {
            var w = arr[i][2], color_s = color, outer = false;
            if (type === "icons") {
                if (arr[i][1] < 475 || arr[i][1] > 1430 || arr[i][0] < 434 || arr[i][0] > 580) {
                    color_s = "rgba(255,255,255," + range(0.2, 0.6) + ")";//;
                    //外围小球，定帧动画摆动用
                    outer = true;
                }
                var x = (arr[i][1] + arr[i][2] - 1920 / 2);
                var y = (arr[i][0] + arr[i][2] - 1080 / 2);
            }else {
                var x =  (arr[i][1] + arr[i][2] - 1920 / 2);
                var y = (arr[i][0] + arr[i][2] - 1080 / 2);
            }
            var ball = this.particle(this.stage, color_s, this.canvas, i, w, x, y, 0);
            ball.outer = outer;
            ret.push(ball);
        }
        return ret;
    };

    this.initParticlesLogo = function () {
        var logos = this.logoParticles = this.getParticles(arr, "rgb(70,147,236)", "logo");
    };

    // 螺旋线聚拢
    this.rotateTranslate = function (t, T) {
        for (var i = 0; i < this.logoParticles.length; i++) {
            //for (var i = 0; i < 3; i ++) {
            var ball = this.logoParticles[i];
            if (t < ball.start_t)
                continue;
            ball.t = t - ball.start_t;
            var r1 = ball.r1;
            // var r = r1 - (r1*Math.pow(ball.t/T,0.3));
            var r = r1 - (r1 * Math.pow(ball.t / T, 1));
            var t_theta = ball.t_theta;
            var theta = t_theta - 1.5 * Math.PI / 2 * Math.pow(ball.t / T, 1);
            var t_x = ball.t_xpos;
            var t_y = ball.t_ypos;
            if (ball.t > T) {
                ball.xpos = ball.t_xpos + 161 * this.scale;
                ball.ypos = ball.t_ypos;
                pos = ball.getScreenXY();
                ball.x = pos.x;
                ball.y = pos.y;
                // ball.y = r * Math.sin(theta) + t_y;
                continue;
            }
            ball.r = r;
            ball.xpos = r * Math.cos(theta) + t_x + 161 * this.scale;
            ball.ypos = r * Math.sin(theta) + t_y;
            pos = ball.getScreenXY();
            ball.x = pos.x;
            ball.y = pos.y;
        }
    };

    this.createLine = function (stage, w, h, x, y, z, color_s, color_e) {
        return CVS.createPoint3D(stage.ctx, function () {
            var color = 'rgb(70,147,236)';
            this.color = color;
            this.width = w;
            this.height = h;
            this.xpos = x;
            this.ypos = y;
            this.zpos = z;
            this.draw = function () {
                this.ctx.beginPath();
                var grad = this.ctx.createLinearGradient(0, 0, this.width, 0);
                grad.addColorStop(0, color_s);
                grad.addColorStop(1, color_e);
                this.ctx.fillStyle = grad;
                this.ctx.fillRect(0, 0, this.width, this.height);
            }
        });
    };

    this.resetBalls = function() {
        for (var i = 0; i < this.logoParticles.length; i++) {
            ball = this.logoParticles[i];
            ball.f_xpos = ball.xpos;
            ball.f_ypos = ball.ypos;
            ball.f_zpos = ball.zpos;
            ball.t_xpos = ball.f_xpos + range(-400, 450);
            ball.t_ypos = ball.f_ypos + range(-200, 150);
            ball.t_zpos = ball.f_zpos + range(0, -100);
            ball.end_t = range(0, 0.2);
            ball.end = false;
        }
    }
});
