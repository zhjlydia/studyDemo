var sogou = SOGOU;

var _list = [
    0, SOGOU.$states.logo,
    1, SOGOU.$states.breathe,

    2, SOGOU.$states.expand,

    3, SOGOU.$states.roll,
    4, SOGOU.$states.vibrate,

    5, SOGOU.$states.disperse,
    6, SOGOU.$states.dna,

    7, SOGOU.$states.dnaleave,
    8, SOGOU.$states.dna2circle,
    9, SOGOU.$states.rotatelogo,
];

sogou.manager = {
  index: 0,
  auto: true,
  max: _list.length - 1,
  locked: false,
  from: '',
  lock: function() {
    this.locked = true;
  },
  unlock: function() {
    this.locked = false;
  },
  init: function() {
    sogou.$func.init();
    sogou.$fsm.init(_list);
    sogou.$fsm.setState(this.index);
    SOGOU.$loop.init();
  },
  next: function(force, msg) {
    if (this.max == this.index) return;
    if (this.locked && !force) return;
    this.from = 'next';
    console.log(msg);
    sogou.$fsm.setState(++this.index, msg);
  },
  previous: function() {
    if (this.index == 1) return;
    if (this.locked) return;
    this.from = 'previous';
    sogou.$fsm.setState(--this.index);
  },
  reverse: function() {
    if (this.locked) return;
    Light.notify('reverse');
  }
};

document.addEventListener('keydown', function(e) {
  var which = e.which;
  switch(which) {
    case 37:
    case 38:
      sogou.manager.reverse();
      break;
    case 39:
    case 40:
      sogou.manager.next();
      break;
    default:
      break;
  }
});

sogou.manager.init();
