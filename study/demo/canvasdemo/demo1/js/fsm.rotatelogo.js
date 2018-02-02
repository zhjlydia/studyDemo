Laro.register('SOGOU.$states', function (La) {
    this.rotatelogo = La.BaseState.extend(function () {
    }).methods({
        enter: function (msg, fromState) {
            var radius = (213 - 9/2) * SOGOU.$func.scale;
            this._t = 0;
            SOGOU.$func.circles = [
                { color: '#fff', radius: radius, angle: Math.PI / 2 }
            ];
            this.segmentsPerCircle = 400;
            this.speed = 1;
            this.angleOffset = 0;
            this.angleOffsetGoal = 0;
            this.logo_box = document.getElementById("logo_box");
            this.logo = document.getElementById("logo");
            this.dl_btn = document.getElementById("dl_btn");
            this.logo_sogou_wrap = document.getElementById("logo_sogou_wrap");
            this.logo_sogou = document.getElementById("logo_sogou");
        },
        leave: function () {

        },
        update: function (dt) {
            this._t += dt;
        },
        transition: function () {
            if (this._t > 2) {
                sogou.manager.unlock();
                if (!!sogou.manager.auto) {
                    //sogou.manager.next(true, this.stop_t);
                }
            }
        },
        draw: function () {
            SOGOU.$func.ctx.translate(SOGOU.$func.canvas.width *.5, SOGOU.$func.canvas.height * .5);
            var t = this._t * 1000,
            ctx = SOGOU.$func.ctx,
            circles = SOGOU.$func.circles,
            segmentsPerCircle = this.segmentsPerCircle,
            speed = this.speed;
            Math.PI2 = 2 * Math.PI;
            // console.log(t);
            var loxo = SOGOU.$func.loxo,
                rotateX = SOGOU.$func.rotateX,
                rotateY = SOGOU.$func.rotateY,
                rotateZ = SOGOU.$func.rotateZ;
            this.angleOffset += (this.angleOffsetGoal - this.angleOffset) * .1;
            //ctx.clearRect(-c.width*.5,-c.height*.5,c.width,c.height);
            if(t * 1e-3 * speed < Math.PI) {
                var t = t * 1e-3 * speed % Math.PI;
            }else if(this.stop){
                SOGOU.$func.ctx.translate(-SOGOU.$func.canvas.width *.5, -SOGOU.$func.canvas.height * .5);
                return;
            }else if(t >= Math.PI){
                var t = Math.PI;
            }

            SOGOU.$func.ctx.lineCap = "round";
            SOGOU.$func.ctx.lineWidth = 9 * SOGOU.$func.scale;
            // console.log(t);
            var rotationY = -t - Math.PI * .5;
            var rotationZ = Math.PI * .5 * Math.cos(t);
            var twist = SOGOU.$func.twistEasing((Math.cos(t * 2 + Math.PI) + 1) * .5),
                twistAngle = twist * 2 * Math.PI2,
                twistSign = (t * 2 > Math.PI ? 1 : -1);
            var circlesPoints = [];
            var i, l, j, ll;
            for(i = 0, l = circles.length; i < l; i++)
            {
                var pts = SOGOU.$func.loxo(circles[i].radius, twistAngle, segmentsPerCircle);
                if(!this.x || this.x < 10) {
                    this.x = this.x? ++this.x : 1;
                }
                for(j = 0, ll = segmentsPerCircle; j < ll; j++)
                {
                    pts[j] = rotateX(pts[j], circles[i].angle * (1 - twist) * twistSign);
                    pts[j] = rotateY(rotateZ(rotateY(pts[j], rotationY), rotationZ), Math.PI/2);
                }
                circlesPoints.push(pts);
            }
            for(i = circles.length - 1; i >= 0; i--)
            {
                ctx.strokeStyle = circles[i].color;
                ctx.beginPath();
                for(j = 0, ll = segmentsPerCircle; j < ll; j++)
                {
                    var p = circlesPoints[i][j];
                    if(p[2] < 0) continue;
                    var prev = circlesPoints[i][j == 0 ? ll - 1 : j - 1];
                    ctx.moveTo(prev[0], prev[1]);
                    ctx.lineTo(p[0], p[1]);
                }
                ctx.stroke();
            }
            for(i = 0, l = circles.length; i < l; i++)
            {
                ctx.strokeStyle = circles[i].color;
                ctx.beginPath();
                for(j = 0, ll = segmentsPerCircle; j < ll; j++)
                {
                    var p = circlesPoints[i][j];
                    if(p[2] > 0) continue;
                    var prev = circlesPoints[i][j == 0 ? ll - 1 : j - 1];
                    ctx.moveTo(prev[0], prev[1]);
                    ctx.lineTo(p[0], p[1]);
                }
                ctx.stroke();
            }
            // SOGOU.$func.ctx.translate(-SOGOU.$func.canvas.width *.5, -SOGOU.$func.canvas.height * .5);
            if(t >= Math.PI * 0.9) {
                this.logo_box.style.width = this.logo_box.style.height = 426 * SOGOU.$func.scale + "px";
                this.logo_box.classList.add("fadein");
                var _this = this;
                this.logo_box.addEventListener("webkitAnimationEnd", function(){
                    _this.stop = true;
                    _this.logo.classList.add("slideup");
                    SOGOU.$func.resetLogoEnd();
                    _this.logo_sogou_wrap.style.display = "block";
                    _this.logo_sogou.classList.add("write");
                    _this.dl_btn.classList.add("dlfadein");
                }, false);
            }
            SOGOU.$func.ctx.translate(-SOGOU.$func.canvas.width *.5, -SOGOU.$func.canvas.height * .5);
            // if(t >= Math.PI) {

            // }
        }
    });
});