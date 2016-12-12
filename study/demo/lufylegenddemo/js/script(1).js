window.onload=function(){
    var loader;
    init(50,"gameBody",1000,800,main);
    //导入图片
    function main(){
        loader=new LLoader();
        loader.addEventListener(LEvent.COMPLETE,loadBitmapdata);//AS的写法
        loader.load("images/image2.jpg","bitmapData")
    }
    function loadBitmapdata(event){
        var bitmapdata=new LBitmapData(loader.content);
        // var bitmap=new LBitmap(bitmapdata);
        // bitmap.scaleX=0.2;
        // bitmap.scaleY=0.2;
        var layer=new LSprite();
        addChild(layer);
        //layer.addChild(bitmap);
        layer.graphics.beginBitmapFill(bitmapdata);
        layer.graphics.drawArc(1,"#000",[340,100,50,0,360*Math.PI/180]);
    }
    //绘制图形
    function grap(){
        var graphics=new LGraphics();
        addChild(graphics);
        graphics.drawRect(1,"#000",[50,50,100,100]);
        graphics.drawRect(1,"#000",[170,50,100,100],true,'#ccc');
        graphics.drawArc(1,"#000",[340,100,50,0,360*Math.PI/180]);
        graphics.drawArc(1,"#000",[460,100,50,0,360*Math.PI/180],true,'#ccc');
        graphics.drawVertices(1,"#000",[[550,100],[630,90],[680,50],[640,120]],true,'#ccc');

        graphics.add(function(coodx,coody){
            LGlobal.canvas.strokeStyle="#ccc";
            LGlobal.canvas.moveTo(50,200);
            LGlobal.canvas.lineTo(100,250);
            LGlobal.canvas.stroke();
        })
    }
}