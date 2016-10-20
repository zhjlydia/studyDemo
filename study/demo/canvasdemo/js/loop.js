Laro.register('SOGOU.$loop', function (La) {
    this.init = function () {
        this.$ = new La.Loop(this.looper, this);
    }

    this.looper = function (dt) {
        this.update(dt);
        this.draw();
    }
    this.update = function (dt) {
        SOGOU.$fsm.$.update(dt);
    }
    this.draw = function () {
        SOGOU.$func.ctx.clearRect(
            -SOGOU.$func.canvas.width,
            -SOGOU.$func.canvas.height,
            SOGOU.$func.canvas.width * 3,
            SOGOU.$func.canvas.height * 3
        );
        SOGOU.$func.stage.render();
        SOGOU.$fsm.$.draw();
    }
});
