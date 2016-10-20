Laro.register('SOGOU.$func', function (La) {
    this.resetLogoEnd = function() {
        logo_box = document.getElementById("logo_box");
        logo_box.style.width = logo_box.style.height = 426 * SOGOU.$func.scale + "px";
        logo = document.getElementById("logo");
        logo_sogou_wrap = document.getElementById("logo_sogou_wrap");
        logo_sogou = document.getElementById("logo_sogou");
        dl_btn = document.getElementById("dl_btn");
        logo_sogou_wrap.style.width = 577 * SOGOU.$func.scale + "px";
        logo_sogou_wrap.style.height = Math.ceil(64 * SOGOU.$func.scale) + "px";
        logo_sogou_wrap.style.top = SOGOU.$func.canvas.height/2 + 80 * SOGOU.$func.scale + "px";
        dl_btn.style.width = 260 * SOGOU.$func.scale + "px";
        dl_btn.style.height = 70 * SOGOU.$func.scale + "px";
        dl_btn.style.fontSize = 24 * SOGOU.$func.scale + "px";
        dl_btn.style.lineHeight = 70 * SOGOU.$func.scale + "px";
        dl_btn.style.borderRadius = 70 * SOGOU.$func.scale + "px";
        dl_btn.style.top = SOGOU.$func.canvas.height/2 + (247+100) * SOGOU.$func.scale + "px";
    }
    this.resetRotateLogo = function() {
        this.circles[0].radius = (213 - 9/2) * this.scale;
    }
    this.rotateX = function(p, a) {
        var d = Math.sqrt(p[2] * p[2] + p[1] * p[1]),
            na = Math.atan2(p[1], p[2]) + a;
        return [p[0], d * Math.sin(na), d * Math.cos(na)];
    }

    this.rotateY = function(p, a) {
        var d = Math.sqrt(p[2] * p[2] + p[0] * p[0]),
            na = Math.atan2(p[2], p[0]) + a;
        return [d * Math.cos(na), p[1], d * Math.sin(na)];
    }

    this.rotateZ = function(p, a) {
        var d = Math.sqrt(p[1] * p[1] + p[0] * p[0]),
            na = Math.atan2(p[1], p[0]) + a;
        return [d * Math.cos(na), d * Math.sin(na), p[2]];
    }

    this.loxo = function(radius, angle, segments) {
        var r = [];
        for(var i = 0; i < segments; i++)
        {
            var a = Math.PI2 * i / segments,
                c = Math.cos(a),
                s = Math.sin(a);
            var ax = Math.PI * .5;
            ax -= (c + 1) * .5 * angle;
            r.push([radius * c, radius * s * Math.sin(ax), radius * s * Math.cos(ax)]);
        }
        // console.log(r);
        return r;
    }

    this.twistEasing = function(t) {
        return (t < .5) ? 2 * t * t : 1 - 2 * (t = 1 - t) * t;
    }

});