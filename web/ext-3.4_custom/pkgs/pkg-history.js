/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.History=(function(){var e,c;var j=false;var d;function f(){var k=location.href,l=k.indexOf("#"),m=l>=0?k.substr(l+1):null;if(Ext.isGecko){m=decodeURIComponent(m)}return m}function a(){c.value=d}function g(k){d=k;Ext.History.fireEvent("change",k)}function h(l){var k=['<html><body><div id="state">',Ext.util.Format.htmlEncode(l),"</div></body></html>"].join("");try{var n=e.contentWindow.document;n.open();n.write(k);n.close();return true}catch(m){return false}}function b(){if(!e.contentWindow||!e.contentWindow.document){setTimeout(b,10);return}var n=e.contentWindow.document;var l=n.getElementById("state");var k=l?l.innerText:null;var m=f();setInterval(function(){n=e.contentWindow.document;l=n.getElementById("state");var p=l?l.innerText:null;var o=f();if(p!==k){k=p;g(k);location.hash=k;m=k;a()}else{if(o!==m){m=o;h(o)}}},50);j=true;Ext.History.fireEvent("ready",Ext.History)}function i(){d=c.value?c.value:f();if(Ext.isIE){b()}else{var k=f();setInterval(function(){var l=f();if(l!==k){k=l;g(k);a()}},50);j=true;Ext.History.fireEvent("ready",Ext.History)}}return{fieldId:"x-history-field",iframeId:"x-history-frame",events:{},init:function(l,k){if(j){Ext.callback(l,k,[this]);return}if(!Ext.isReady){Ext.onReady(function(){Ext.History.init(l,k)});return}c=Ext.getDom(Ext.History.fieldId);if(Ext.isIE){e=Ext.getDom(Ext.History.iframeId)}this.addEvents("ready","change");if(l){this.on("ready",l,k,{single:true})}i()},add:function(k,l){if(l!==false){if(this.getToken()==k){return true}}if(Ext.isIE){return h(k)}else{location.hash=k;return true}},back:function(){history.go(-1)},forward:function(){history.go(1)},getToken:function(){return j?d:f()}}})();Ext.apply(Ext.History,new Ext.util.Observable());