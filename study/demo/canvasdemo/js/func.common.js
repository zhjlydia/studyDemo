Laro.register('SOGOU.$func', function (La) {
    //匀速
    this.bezier1 = generateBezier(0, 0, 1, 1);
    //先慢后快
    this.bezier2 = generateBezier(.42, 0, 1, 1);
    //先快后慢
    this.bezier3 = generateBezier(0, 0, .58, 1);
    this.bezier4 = generateBezier(.42,0,.58,1);
    this.bezier5 = generateBezier(.84, .45, .98, .73);
    this.initWordsPos = function() {
        this.w1.style.marginLeft = -670 * _this.scale + "px";
        this.w2.style.marginLeft = -491 * _this.scale + "px";
        this.w2.style.bottom = SOGOU.$func.canvas.height/2 + "px";
        this.w3.style.marginLeft = 210 * _this.scale + "px";
        this.w4.style.marginLeft = 95 * _this.scale + "px";
        var words = document.querySelectorAll(".word");
        var words_small = document.querySelectorAll(".word_l");
        for(var i = 0; i < words.length; i++) {
            words[i].style.fontSize = 55 * SOGOU.$func.scale + "px";
        }
        for(var i = 0; i < words_small.length; i++) {
            words_small[i].style.fontSize = 18 * SOGOU.$func.scale + "px";
        }
    }

    this.resizeOfballs = function() {
        var _this = this;
        Light.listen('resize', function(payload) {
            try {
                _this.initWordsPos();
                switch(sogou.manager.index) {
                    case 0:
                    case 1:
                        _this.logoParticles.forEach(function (ball, i) {
                            ball._resize(payload.scale);
                        });
                        break;
                    //线
                    case 2:
                        _this.initBallHead();
                        _this.initBallLine();
                        break;
                    //icons
                    case 3:
                    case 4:
                        // console.log("______________________resize");
                        _this.iconsParticles.forEach(function (ball, i) {
                            ball._resize(payload.scale);
                            // _this.init
                        });
                        break;
                    case 5:
                        _this.resetIconBalls();
                        _this.resetDnaBalls();
                        _this.resetDnaBgBalls();
                        _this.lastScale = _this.scale;
                        break;
                    case 6:
                        _this.resetDnaList();
                        break;
                    case 7:
                        _this.resetMainDna();
                        _this.lastScale = _this.scale;
                        break;
                    case 8:
                        _this.resetDnaMain();
                        _this.lastScale = _this.scale;
                        break;
                    case 9:
                        _this.resetRotateLogo();
                        _this.resetLogoEnd();
                        break;
                }
            } catch(e) {}
        });
    }

    this.initStage = function () {
        var canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.canvas = canvas;
        this.scale = window.innerWidth / 1920;
        this.stage = new CVS.$stage(canvas);
        this.ctx = this.stage.ctx;
        this.vpx = canvas.width / 2;
        this.vpy = canvas.height / 2;
        this.normalN = 100;
        this.normalBalls = [];
        this.angleX = 0.001;
        this.angleY = 0.001;
        this.zstep = 1;
        this.zflag = 1;
        this.w1 = document.getElementById("w1");
        this.w2 = document.getElementById("w2");
        this.w3 = document.getElementById("w3");
        this.w4 = document.getElementById("w4");
        this.initWordsPos();
        pingApp.getPv(0);
    }

    // 创建一个球
    var _this = this;
    this.createBall = function (stage, color, w, x, y, z, id) {
        return CVS.createPoint3D(stage.ctx, function () {
            //var color = 'rgb(70,147,236)';
            // this.color = color;
            this.width = w;
            this.xpos = x;
            this.ypos = y;
            this.zpos = z;
            this.draw = function () {
                var canvas_width = _this.canvas.width;
                var canvas_height = _this.canvas.height;
                //以画布中心为圆心画logo的圆
                this.ctx.translate(canvas_width / 2, canvas_height / 2);
                this.ctx.beginPath();
                try{
                    this.ctx.arc(0, 0, this.width, 0, Math.PI * 2, true);
                }catch(e) {
                   // console.trace(0);
                }
                this.ctx.closePath();
                this.ctx.fillStyle = color;
                this.ctx.fill();
                // this.ctx.fillStyle ="red";
                // this.ctx.fillText(id,0,0,50);
                this.ctx.translate(-canvas_width / 2, -canvas_height / 2);
            }
        });
    }

    //移动一个球
    this.tween = function (ball, t, T, bezier) {
        //if (!ball.end) { //散开
        if (!ball.start_t) {
            ball.start_t = 0;
        }
        if (!ball.end_t) {
            ball.end_t = 0;
        }
        var _t = (t - ball.start_t).toFixed(2);
        if( _t <= 0 )
            return;
        if (_t <= T + ball.end_t) {
            if (ball.t_xpos != undefined) {
                ball.xpos = ball.f_xpos + (ball.t_xpos - ball.f_xpos) * bezier(_t / (T + ball.end_t));
            }
            if (ball.t_ypos != undefined) {
                ball.ypos = ball.f_ypos + (ball.t_ypos - ball.f_ypos) * bezier(_t / (T + ball.end_t));
            }
            if (ball.t_zpos != undefined) {
                ball.zpos = ball.f_zpos + (ball.t_zpos - ball.f_zpos) * bezier(_t / (T + ball.end_t));
            }
            if (ball.t_width != undefined) {
                ball.width = ball.f_width + (ball.t_width - ball.f_width) * bezier(_t / (T + ball.end_t));
            }
        } else {
            ball.end = true;
        }
    }

    this.tween2 = function (ball, t, T, bezier) {
        //if (!ball.end) { //散开
        if (!ball.start_t) {
            ball.start_t = 0;
        }
        if (!ball.end_t) {
            ball.end_t = 0;
        }
        var _t = (t - ball.start_t).toFixed(2);
        if( _t <= 0 )
            return;
        if ( _t <= T + ball.end_t) {
            if (ball.t_xpos != undefined) {
                ball.xpos = ball.f_xpos + (ball.t_xpos - ball.f_xpos) * bezier(_t / (T + ball.end_t));
            }
            if (ball.t_ypos != undefined) {
                ball.ypos = ball.f_ypos + (ball.t_ypos - ball.f_ypos) * bezier(_t / (T + ball.end_t));
            }
            if (ball.t_zpos != undefined) {
                ball.zpos = ball.f_zpos + (ball.t_zpos - ball.f_zpos) * bezier(_t / (T + ball.end_t));
            }
            if (ball.t_width != undefined) {
                ball.width = ball.f_width + (ball.t_width - ball.f_width) * bezier(_t / (T + ball.end_t));
            }
        } else {
            if (ball.t_xpos != undefined) {
                ball.xpos = ball.t_xpos;
            }
            if (ball.t_ypos != undefined) {
                ball.ypos = ball.t_ypos;
            }
            if (ball.t_zpos != undefined) {
                ball.zpos = ball.t_zpos;
            }
            if (ball.t_width != undefined) {
                ball.width = ball.t_width;
            }
            ball.end = true;
        }
    }

    this.resetBallStartTime = function (balls) {
        if (balls.length) {
            for (var i = 0; i < balls.length; i++) {
                var ball = balls[i];
                ball.start_t = 0;
            }
        } else {
            balls.start_t = 0;
        }
    }

    this.sin = function (t, d, speed, start) {
        return d * (Math.sin(speed * Math.PI * t + start));
    }

    this.linear = function (t, T, d, speed) {
        if(t <= 0) {
            return 0;
        }else if(t <= T) {
            return (t/T) * speed * d;
        }
        return d;
    }

    this.cos = function (t, d, speed) {
        return d * (Math.cos(speed * Math.PI * t + 3 * Math.PI / 2));
    }

    this.initEvents = function () {
        window.addEventListener('resize', this.resizeInstance.bind(this));
    };

    /*
        随着时间按正弦波放大缩小球
        dw：放大缩小的偏移量
        t：时间
        direction：1 先变大再缩小 -1 先缩小再变大
     */
    this.scalew = function (ball, t, dw, direction) {
        // 放大缩小
        if (ball.bi_w == undefined) {
            ball.bi_w = ball.width;
        }
        if (ball.start_t == undefined) {
            ball.start_t = 0;
        }
        var _t = t - ball.start_t;
        if (direction == 1) {
            start = Math.PI / 2;
        } else {
            start = Math.PI * 3 / 2;
        }
        var width = ball.bi_w + this.sin(_t, dw, 0.5, start);
        ball.width = width >= 1 ? width : 1;
    }
    // 得到放到缩小过程中 某一时间的大小
    this.getWidthOfTime = function (ball, t, start_t, dw, width, direction) {
        // 放大缩小
        if (ball.start_t == undefined) {
            ball.start_t = 0;
        }
        var _t = t - start_t;
        if (direction == 1) {
            start = Math.PI / 2;
        } else {
            start = Math.PI * 3 / 2;
        }
        return width + this.sin(_t, dw, 0.5, start);
    }

    this.roll = function (ball, t, dx, dy) {
        //左右或上下震动
        if (ball.bi_x == undefined) {
            ball.bi_x = ball.xpos;
            ball.bi_y = ball.ypos;
        }
        if (ball.start_t == undefined) {
            ball.start_t = 0;
        }
        var _t = t - ball.start_t;
        if (dx != 0 && _t > 0) {
            ball.xpos = ball.bi_x + this.sin(_t, dx, 0.5, 0);
        }
        if (dy != 0 && _t > 0) {
            ball.ypos = ball.bi_y + this.sin(_t, dy, 0.5, 3 * Math.PI / 2);
        }
    }

    this.getRollPos = function (ball, t, start_t, x, y, dx, dy) {
        //左右或上下震动
        var _t = t - start_t;
        var pos = {x : x, y : y};
        if (dx != 0 && _t > 0) {
            pos.x = x + this.sin(_t, dx, 0.5, 0);
        }
        if (dy != 0 && _t > 0) {
            pos.y = y + this.sin(_t, dy, 0.5, 3 * Math.PI / 2);
        }
        return pos;
    }

    this.resizeInstance = function () {
        var self = this;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.canvas.width = window.innerWidth;
        this.stage.refresh(canvas);
        this.scale = window.innerWidth / 1920;
        Light.notify('resize', {
            scale: self.scale
        });
    };

    this.init = function () {
        this.initStage();
        this.resizeOfballs();
        this.initEvents();
    };
});
