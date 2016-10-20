/*TMODJS:{"version":1,"md5":"018c5a486e1f6a28ce934ba1c6f87070"}*/
template('art',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,$each=$utils.$each,labels=$data.labels,lable=$data.lable,i=$data.i,$out='';$out+='  <button onclick="clickme(\'';
$out+=$escape(name);
$out+='\')">点我dd</button> ';
$each(labels,function(lable,i){
$out+=' <h2>';
$out+=$escape(lable.name);
$out+='</h2> ';
});
$out+=' ';
return new String($out);
});