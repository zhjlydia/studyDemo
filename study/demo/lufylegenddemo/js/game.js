var backLayer, loadingLayer, background, stageLayer;
var stageSpeed = 0;
var STAGE_STEP = 1;
var MOVE_STEP=1;
var hero;
var g=0.08;
var imgList = {};
var imgData = new Array(
    { name: "back", path: "./images/back.png" },
    { name: "floor0", path: "./images/floor0.png" },
    { name: "floor1", path: "./images/floor1.png" },
    { name:"hero", path: "./images/hero.png"}
);

function main() {
    //游戏主层初始化
    backLayer = new LSprite();
    //在主层上绘制黑色背景
    backLayer.graphics.drawRect(1, "#000000", [0, 0, 320, 504], true, "#000000");
    addChild(backLayer);
    //进度条读取层初始化
    loadingLayer = new LoadingSample2(50);
    backLayer.addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function (progress) {
            loadingLayer.setProgress(progress);
        }, gameInit
    );
}
//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(result) {
    //取得图片读取结果
    imgList = result;
    //移除进度条层
    backLayer.removeChild(loadingLayer);
    loadingLayer = null;
    //显示游戏标题
    var title = new LTextField();
    title.y = 100;
    title.size = 30;
    title.color = "#ffffff";
    title.text = "是男人就下100层";
    title.x = (LGlobal.width - title.getWidth()) / 2;
    backLayer.addChild(title);
    //显示说明文
    backLayer.graphics.drawRect(1, "#ffffff", [50, 240, 220, 40]);
    var txtClick = new LTextField();
    txtClick.size = 18;
    txtClick.color = "#ffffff";
    txtClick.text = "点击页面开始游戏";
    txtClick.x = (LGlobal.width - txtClick.getWidth()) / 2;
    txtClick.y = 245;
    backLayer.addChild(txtClick);
    //添加点击事件，点击画面则游戏开始
    backLayer.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
        gameStart(false);
    });
}
//游戏画面初始化
function gameStart(restart) {
    //背景层清空
    backLayer.die();
    backLayer.removeAllChild();

    background = new Background();
    backLayer.addChild(background);
    hero=new Character();
    hero.x=100;
    hero.y=140;
    hero.hp=hero.maxHp;
    backLayer.addChild(hero);
    stageInit();
    backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
}
function onframe() {
    background.run();
    if (stageSpeed-- < 0) {
        stageSpeed = 100;
        addStage();
    }
    var key = null,found=false;
    hero.jsJump=true;
    for (key in stageLayer.childList) {
        var _child = stageLayer.childList[key];
        if(_child.y<-_child.getHeight()){
            stageLayer.removeChild(_child);
        }
        if(!found && hero.x+30>=_child.x && hero.x<=_child.x+90 && hero.y+50>=_child.y+_child.hy && hero._charaOld+50<=_child.y+_child.hy+1){
            hero.isJump=false;
            hero.changeAction();
            _child.child=hero;
            hero.speed=0;
            hero.y=_child.y-49+_child.hy;
            _child.hitRun();
            found=true;
        }
        else{
            _child.child=null;
        }
        _child.onframe();
    }
    if(hero.jsJump){
        hero.animate.setAction(1,0);
    }
    if(hero){
        hero.onframe();
        if(hero.hp<=0){
            backLayer.removeChild(hero);
            hero=null;
            gameover();
        }
    }
}
function gameover(){
    
}
function stageInit() {
    stageLayer = new LSprite();
    backLayer.addChild(stageLayer);
}
function addStage() {
    var mstage;
    mstage = new Floor01();
    mstage.y = 504;
    mstage.x = Math.random() * 280;
    stageLayer.addChild(mstage);
}
if(!LGlobal.canTouch){
    LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN, down);
    LEvent.addEventListener(window,LKeyboardEvent.up, up);
}
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, mousedown);
    backLayer.addEventListener(LMouseEvent.MOUSE_up, mouseup);
function up(){
    hero.moveType=null;
    hero.changeAction();
}
function down(event){
    if(hero.moveType){
        return;
    }
    if(event.keyCode==37){
        hero.moveType="left";
    }
    else if(event.keyCode==39){
        hero.moveType="right";
    }
    hero.changeAction();
}
function mousedown(event){
    if(event.offsetX<=LGlobal.width*0.5){
        down({keyCode:37});
    }
    else{
        down({keyCode:39});
    }
}
function mouseup(event){
    hero.moveType=null;
    hero.changeAction();
}

//背景
function Background() {
    base(this, LSprite, []);
    var self = this;
    self.bitmapData = new LBitmapData(imgList["back"]);
    self.bitmap1 = new LBitmap(self.bitmapData);
    self.bitmap1.scale = 2;;
    self.addChild(self.bitmap1);
    self.bitmap2 = new LBitmap(self.bitmapData);
    self.bitmap2.y = self.bitmap1.getHeight();
    self.addChild(self.bitmap2);
    self.bitmap3 = new LBitmap(self.bitmapData);
    self.bitmap3.y = self.bitmap1.getHeight() * 2;
    self.addChild(self.bitmap3);
}
Background.prototype.run = function () {
    var self = this;
    self.bitmap1.y -= STAGE_STEP;
    self.bitmap2.y -= STAGE_STEP;
    self.bitmap3.y -= STAGE_STEP;
    if (self.bitmap1.y < -self.bitmap1.getHeight()) {
        self.bitmap1.y = self.bitmap2.y;
        self.bitmap2.y = self.bitmap1.y + self.bitmap1.getHeight();
        self.bitmap3.y = self.bitmap1.y + self.bitmap1.getHeight() * 2;
    }
}
//地板
function Floor() {
    base(this, LSprite, []);
    var self = this;
    self.hy = 0;
    self.setView();
}
Floor.prototype.setView = function () { }
Floor.prototype.onframe = function () {
    var self = this;
    self.y -= STAGE_STEP;
    if(self.child){
        self.child.y-=STAGE_STEP;
    }
};
Floor.prototype.hitRun = function () { };
function Floor01() {
    base(this, Floor, []);
}
Floor01.prototype.setView = function () {
    var self = this;
    self.bitmap = new LBitmap(new LBitmapData(imgList["floor0"]));
    self.addChild(self.bitmap);
}
function Floor02(){
    base(this,Floor,[]);
    var self=this;
    self.ctrlIndex=0;
}
Floor02.prototype.setView = function () {
    var self = this;
    self.bitmap = new LBitmap(new LBitmapData(imgList["floor1"],0,0,100,20));
    self.addChild(self.bitmap);
}
Floor2.prototype.hitRun = function () {
    var self=this;
    self.callParent("hitRun",arguments);
};
function Character(){
    base(this,LSprite,[]);
    var self=this;
    //控制左移还是右移
    self.moveType=null;
    self.hp=3;//当前血量
    self.maxHp=3;//最大血量
    self.hpCtrl=0;
    self.isJump=true;
    self.index=0;//动作变换的快慢
    self.speed=0;//下落速度
    self._charaOld=0;//每次下之前的y坐标

    var list=LGlobal.divideCoordinate(960,50,1,24);
    var data=new LBitmapData(imgList["hero"],0,0,40,50);
    self.animate=new LAnimation(self,data,[
    [list[0][0]],//直立
    [list[0][1]],//跳跃
    [list[0][2],list[0][3],list[0][4],list[0][5],list[0][6],list[0][7],list[0][8],list[0][8],list[0][10],list[0][11],list[0][12]],//往右
    [list[0][13],list[0][14],list[0][15],list[0][16],list[0][17],list[0][18],list[0][19],list[0][20],list[0][21],list[0][22],list[0][23]]//往左
    ]);
}
Character.prototype.onframe=function(){
    var self=this;
    self._charaOld=self.y;
    self.y+=self.speed;
    self.speed+=g;
    if(self.speed>20){
        self.speed=20;
    }
    if(self.y>LGlobal.height){
        self.hp=0;
    }
    if(self.moveType=="left"){
        self.x-=MOVE_STEP;
    }
    else if(self.moveType=="right"){
        self.x+=MOVE_STEP;
    }
    if(self.x<-10){
        self.x=-10;
    }
    else if(self.x>LGlobal.width-30){
        self.x=LGlobal.width-30;
    }
    if(self.index-- >0){
        return;
    }
    self.index=10;
    self.animate.onframe();
};
Character.prototype.changeAction=function(){
    var self=this;
    if(self.moveType=="left"){
        hero.animate.setAction(3);
    }
    else if(self.moveType=="right"){
        hero.animate.setAction(2);
    }
    if(hero.isJump){
        hero.animate.setAction(1,0);
    }
    else{
        hero.animate.setAction(0,0);
    }
}