function getCookie1(offset) { var endstr = document.cookie.indexOf(";", offset); if (endstr == -1) endstr = document.cookie.length; return unescape(document.cookie.substring(offset, endstr)); }
function getCookie2(name) { var arg = name + "="; var alen = arg.length; var clen = document.cookie.length; var i = 0; while (i < clen) { var j = i + alen; if (document.cookie.substring(i, j) == arg) return getCookie1(j); i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break; } return null; }
function setCookie(name, value, exptime, domain) { var domain = domain ? domain : "ie.sogou.com"; var exp = new Date(); exp.setTime(exp.getTime() + exptime); document.cookie = name + "=" + value + ";path=/;expires=" + exp.toGMTString() + ";domain=" + domain + ";"; }
function checkSE() { var seUA = navigator.userAgent.toLowerCase(); if (seUA.indexOf(" se ") < 0) { try { window.external.StartPageCall(""); try { if (window.external.StartPageCall != undefined) return true; else return false; } catch (e) { return true; } return true; } catch (e) { return false; } } return true; }

var PingbackApp = function(){
    var pingServerUrl = "http://ping.ie.sogou.com/";
    var n = new Date().getTime();
    var c = escape(n*1000+Math.round(Math.random()*1000));
    var sogou = checkSE()?1:0;
    // getSEVersion("getversion",function(){

    // });
    // var version = getSEVersion("getversion");
    // console.log(checkSE());
    this.getUid = function(){
        var uid = "";
        if(getCookie2("SMYUV") != null) {
            uid = getCookie2("SMYUV");
        } else {
            uid = c;
            setCookie("SMYUV", uid, 2592000000, "sogou.com");
        }
        return uid;
    };
    this.getYYID = function(){
        var yyid = "";
        if(getCookie2("YYID") != null) {
            yyid = getCookie2("YYID");
        } else {
            yyid = "";
        }
        return yyid;
    };
    this.refurl = document.referrer == ""? "" : encodeURIComponent(document.referrer);
    this.pl = encodeURIComponent(location.href);
    var u = this.getUid();
    this.getPv = function(idx){
        var t2 = new Date().getTime();
        var loadtime_onload = t2-t1;
        var loadtime_body = t3-t1;
        console.log('t3',t3);
        var pvImg =document.createElement('img');
        pvImg.src = pingServerUrl + "pv.GIF?t="+ c +"&u="+ u +"&r="+ this.refurl +"&pl="+this.pl+"&load="+ loadtime_body +"&onloadtime="+ loadtime_onload +"&oSiteVer=feature7.0&sogou="+sogou+"&idx="+idx;
    };
    this.getDlBtnClick = function(type, info,func){
        var n = new Date().getTime();
        var c = escape(n*1000+Math.round(Math.random()*1000));
        var parm = "";
        for(var key in info){
            parm+="&"+key+"="+info[key];
        }
        // var idx = info.idx;
        var ctImg = document.createElement('img');

        ctImg.src = pingServerUrl + "ct.GIF?t="+ c +"&u="+ u +"&pl="+ this.pl +"&type="+ type +"&oSiteVer=feature7.0"+ parm +"&sogou="+sogou;
        ctImg.onerror = ctImg.onload = function(){
            func&&func();
        }

    };

    this.getClick = function(evt) {
        evt=evt?evt:window.event;
        var srcElem=(evt.target)?evt.target:evt.srcElement;
        try{
            while(srcElem.tagName.toUpperCase()=="A" || srcElem.tagName.toUpperCase()=="INPUT" || srcElem.tagName.toUpperCase()=="IMG") {
                is_link = false;
                if(srcElem.tagName.toUpperCase()=="A" || srcElem.tagName.toUpperCase()=="INPUT") {
                    is_link = true;
                }
                var linkname=srcElem.innerHTML?srcElem.innerHTML:srcElem.value;
                linkname = escape(linkname);
                var linkurl = srcElem.href?srcElem.href:srcElem.value;
                linkurl = encodeURIComponent(linkurl);
                clickFrom = window.location.href;
                if(linkname=="" || address=="") {break;}
                var n=new Date().getTime();
                var c=escape(n*1000+Math.round(Math.random()*1000));
                var parent = srcElem.parentNode;
                while(!parent.id){
                    parent = parent.parentNode;
                }
                mod = parent.id;
                var clickImg =document.createElement('img');
                if(is_link) {
                    clickImg.src = pingServerUrl + "ct.GIF?t="+c+"&u="+ u +"&r="+this.refurl+"&pl="+this.pl+"&on=" + linkname + "&ol=" + linkurl + "&mod=" + mod + "&clickfrom="+clickFrom;
                }
                srcElem = srcElem.parentNode;
            }
        } catch(e){
        }
        return true;
    }
};

var pingApp = new PingbackApp();