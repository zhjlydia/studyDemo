window.onload=function(){
    var loader;
    init(50,"gameBody",500,350,main);
    function main(){
        loader=new LLoader();
        loader.addEventListener(LEvent.COMPLETE,loadBitmapdata);//AS的写法
        loader.load("images/image1.jpg","bitmapData")
    }
    function loadBitmapdata(event){
        var bitmapdata=new LBitmapData(loader.content);
        var bitmap=new LBitmap(bitmapdata);
        bitmap.scaleX=0.2;
        bitmap.scaleY=0.2;
        var layer=new LSprite();
        addChild(layer);
        layer.addChild(bitmap);
    }
}