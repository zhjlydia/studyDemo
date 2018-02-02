// logo入场动画
Laro.register('SOGOU.$states', function (La) {
    var duration = 1.5;
    var delay = 2;
    this.logo = La.BaseState.extend(function () {
    }).methods({
        enter: function () {
            console.log('page: logo');
            sogou.manager.lock();
            if (sogou.manager.from == 'previous') {
                this._t = duration;
            } else {
                SOGOU.$func.initParticlesLogo();
                for (var i = 0; i < SOGOU.$func.logoParticles.length; i++) {
                    var ball = SOGOU.$func.logoParticles[i];
                    SOGOU.$func.stage.addChild(ball);
                }
                this._t = 0;
                //
            }
        },
        leave: function () {
        },
        update: function (dt) {
            this._t += dt;
        },
        transition: function () {
            if (this._t > duration + delay) {
                sogou.manager.next(true);
            }
        },
        draw: function () {
            SOGOU.$func.rotateTranslate(this._t, duration);
            if(this._t > 3) {
                SOGOU.$func.w1.classList.add("fadein");
            }
        }
    });
});
