
Laro.register('SOGOU.$fsm', function (La) {
  this.init = function (list) {
    this.$ = new La.AppFSM(this, list);
  }

  this.setState = function (state, msg, suspendCurrent) {
    this.$.setState(state, msg, suspendCurrent);
  }

});
