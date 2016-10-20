/*TMODJS:{"version":1,"md5":"bdb329b6afb37f0a88819de65d965361"}*/
template('list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<ul> ';
$each(list,function(value,i){
$out+=' <li>索引 ';
$out+=$escape(i+1);
$out+='：';
$out+=$escape(value.name);
$out+=$escape(value.age);
$out+=$escape(value.description);
$out+='</li> ';
if(value.yes){
$out+=' ';
include('./art',value);
$out+=' ';
}
$out+=' ';
});
$out+=' </ul>';
return new String($out);
});