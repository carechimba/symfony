/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/*!
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
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.DirectProxy=function(a){Ext.apply(this,a);if(typeof this.paramOrder=="string"){this.paramOrder=this.paramOrder.split(/[\s,|]/)}Ext.data.DirectProxy.superclass.constructor.call(this,a)};Ext.extend(Ext.data.DirectProxy,Ext.data.DataProxy,{paramOrder:undefined,paramsAsHash:true,directFn:undefined,doRequest:function(b,c,a,e,j,k,m){var h=[],g=this.api[b]||this.directFn;switch(b){case Ext.data.Api.actions.create:h.push(a.jsonData);break;case Ext.data.Api.actions.read:if(g.directCfg.method.len>0){if(this.paramOrder){for(var d=0,f=this.paramOrder.length;d<f;d++){h.push(a[this.paramOrder[d]])}}else{if(this.paramsAsHash){h.push(a)}}}break;case Ext.data.Api.actions.update:h.push(a.jsonData);break;case Ext.data.Api.actions.destroy:h.push(a.jsonData);break}var l={params:a||{},request:{callback:j,scope:k,arg:m},reader:e};h.push(this.createCallback(b,c,l),this);g.apply(window,h)},createCallback:function(d,a,b){var c=this;return function(e,f){if(!f.status){if(d===Ext.data.Api.actions.read){c.fireEvent("loadexception",c,b,f,null)}c.fireEvent("exception",c,"remote",d,b,f,null);b.request.callback.call(b.request.scope,null,b.request.arg,false);return}if(d===Ext.data.Api.actions.read){c.onRead(d,b,e,f)}else{c.onWrite(d,b,e,f,a)}}},onRead:function(f,e,a,d){var b;try{b=e.reader.readRecords(a)}catch(c){this.fireEvent("loadexception",this,e,d,c);this.fireEvent("exception",this,"response",f,e,d,c);e.request.callback.call(e.request.scope,null,e.request.arg,false);return}this.fireEvent("load",this,d,e.request.arg);e.request.callback.call(e.request.scope,b,e.request.arg,true)},onWrite:function(f,d,a,c,b){var e=d.reader.extractData(d.reader.getRoot(a),false);var g=d.reader.getSuccess(a);g=(g!==false);if(g){this.fireEvent("write",this,f,e,c,b,d.request.arg)}else{this.fireEvent("exception",this,"remote",f,d,a,b)}d.request.callback.call(d.request.scope,e,c,g)}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.DirectStore=Ext.extend(Ext.data.Store,{constructor:function(a){var b=Ext.apply({},{batchTransactions:false},a);Ext.data.DirectStore.superclass.constructor.call(this,Ext.apply(b,{proxy:Ext.isDefined(b.proxy)?b.proxy:new Ext.data.DirectProxy(Ext.copyTo({},b,"paramOrder,paramsAsHash,directFn,api")),reader:(!Ext.isDefined(b.reader)&&b.fields)?new Ext.data.JsonReader(Ext.copyTo({},b,"totalProperty,root,idProperty"),b.fields):b.reader}))}});Ext.reg("directstore",Ext.data.DirectStore);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Direct=Ext.extend(Ext.util.Observable,{exceptions:{TRANSPORT:"xhr",PARSE:"parse",LOGIN:"login",SERVER:"exception"},constructor:function(){this.addEvents("event","exception");this.transactions={};this.providers={}},addProvider:function(e){var c=arguments;if(c.length>1){for(var d=0,b=c.length;d<b;d++){this.addProvider(c[d])}return}if(!e.events){e=new Ext.Direct.PROVIDERS[e.type](e)}e.id=e.id||Ext.id();this.providers[e.id]=e;e.on("data",this.onProviderData,this);e.on("exception",this.onProviderException,this);if(!e.isConnected()){e.connect()}return e},getProvider:function(a){return this.providers[a]},removeProvider:function(b){var a=b.id?b:this.providers[b];a.un("data",this.onProviderData,this);a.un("exception",this.onProviderException,this);delete this.providers[a.id];return a},addTransaction:function(a){this.transactions[a.tid]=a;return a},removeTransaction:function(a){delete this.transactions[a.tid||a];return a},getTransaction:function(a){return this.transactions[a.tid||a]},onProviderData:function(d,c){if(Ext.isArray(c)){for(var b=0,a=c.length;b<a;b++){this.onProviderData(d,c[b])}return}if(c.name&&c.name!="event"&&c.name!="exception"){this.fireEvent(c.name,c)}else{if(c.type=="exception"){this.fireEvent("exception",c)}}this.fireEvent("event",c,d)},createEvent:function(a,b){return new Ext.Direct.eventTypes[a.type](Ext.apply(a,b))}});Ext.Direct=new Ext.Direct();Ext.Direct.TID=1;Ext.Direct.PROVIDERS={};
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Direct.Transaction=function(a){Ext.apply(this,a);this.tid=++Ext.Direct.TID;this.retryCount=0};Ext.Direct.Transaction.prototype={send:function(){this.provider.queueTransaction(this)},retry:function(){this.retryCount++;this.send()},getProvider:function(){return this.provider}};
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Direct.Event=function(a){Ext.apply(this,a)};Ext.Direct.Event.prototype={status:true,getData:function(){return this.data}};Ext.Direct.RemotingEvent=Ext.extend(Ext.Direct.Event,{type:"rpc",getTransaction:function(){return this.transaction||Ext.Direct.getTransaction(this.tid)}});Ext.Direct.ExceptionEvent=Ext.extend(Ext.Direct.RemotingEvent,{status:false,type:"exception"});Ext.Direct.eventTypes={rpc:Ext.Direct.RemotingEvent,event:Ext.Direct.Event,exception:Ext.Direct.ExceptionEvent};
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.direct.Provider=Ext.extend(Ext.util.Observable,{priority:1,constructor:function(a){Ext.apply(this,a);this.addEvents("connect","disconnect","data","exception");Ext.direct.Provider.superclass.constructor.call(this,a)},isConnected:function(){return false},connect:Ext.emptyFn,disconnect:Ext.emptyFn});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.direct.JsonProvider=Ext.extend(Ext.direct.Provider,{parseResponse:function(a){if(!Ext.isEmpty(a.responseText)){if(typeof a.responseText=="object"){return a.responseText}return Ext.decode(a.responseText)}return null},getEvents:function(h){var f=null;try{f=this.parseResponse(h)}catch(g){var d=new Ext.Direct.ExceptionEvent({data:g,xhr:h,code:Ext.Direct.exceptions.PARSE,message:"Error parsing json response: \n\n "+f});return[d]}var c=[];if(Ext.isArray(f)){for(var b=0,a=f.length;b<a;b++){c.push(Ext.Direct.createEvent(f[b]))}}else{c.push(Ext.Direct.createEvent(f))}return c}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.direct.PollingProvider=Ext.extend(Ext.direct.JsonProvider,{priority:3,interval:3000,constructor:function(a){Ext.direct.PollingProvider.superclass.constructor.call(this,a);this.addEvents("beforepoll","poll")},isConnected:function(){return !!this.pollTask},connect:function(){if(this.url&&!this.pollTask){this.pollTask=Ext.TaskMgr.start({run:function(){if(this.fireEvent("beforepoll",this)!==false){if(typeof this.url=="function"){this.url(this.baseParams)}else{Ext.Ajax.request({url:this.url,callback:this.onData,scope:this,params:this.baseParams})}}},interval:this.interval,scope:this});this.fireEvent("connect",this)}else{if(!this.url){throw"Error initializing PollingProvider, no url configured."}}},disconnect:function(){if(this.pollTask){Ext.TaskMgr.stop(this.pollTask);delete this.pollTask;this.fireEvent("disconnect",this)}},onData:function(d,h,g){if(h){var c=this.getEvents(g);for(var b=0,a=c.length;b<a;b++){var f=c[b];this.fireEvent("data",this,f)}}else{var f=new Ext.Direct.ExceptionEvent({data:f,code:Ext.Direct.exceptions.TRANSPORT,message:"Unable to connect to the server.",xhr:g});this.fireEvent("data",this,f)}}});Ext.Direct.PROVIDERS.polling=Ext.direct.PollingProvider;
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.direct.RemotingProvider=Ext.extend(Ext.direct.JsonProvider,{enableBuffer:10,maxRetries:1,timeout:undefined,constructor:function(a){Ext.direct.RemotingProvider.superclass.constructor.call(this,a);this.addEvents("beforecall","call");this.namespace=(Ext.isString(this.namespace))?Ext.ns(this.namespace):this.namespace||window;this.transactions={};this.callBuffer=[]},initAPI:function(){var g=this.actions;for(var h in g){var d=this.namespace[h]||(this.namespace[h]={}),e=g[h];for(var f=0,b=e.length;f<b;f++){var a=e[f];d[a.name]=this.createMethod(h,a)}}},isConnected:function(){return !!this.connected},connect:function(){if(this.url){this.initAPI();this.connected=true;this.fireEvent("connect",this)}else{if(!this.url){throw"Error initializing RemotingProvider, no url configured."}}},disconnect:function(){if(this.connected){this.connected=false;this.fireEvent("disconnect",this)}},onData:function(a,g,h){if(g){var j=this.getEvents(h);for(var b=0,c=j.length;b<c;b++){var d=j[b],k=this.getTransaction(d);this.fireEvent("data",this,d);if(k){this.doCallback(k,d,true);Ext.Direct.removeTransaction(k)}}}else{var f=[].concat(a.ts);for(var b=0,c=f.length;b<c;b++){var k=this.getTransaction(f[b]);if(k&&k.retryCount<this.maxRetries){k.retry()}else{var d=new Ext.Direct.ExceptionEvent({data:d,transaction:k,code:Ext.Direct.exceptions.TRANSPORT,message:"Unable to connect to the server.",xhr:h});this.fireEvent("data",this,d);if(k){this.doCallback(k,d,false);Ext.Direct.removeTransaction(k)}}}}},getCallData:function(a){return{action:a.action,method:a.method,data:a.data,type:"rpc",tid:a.tid}},doSend:function(d){var f={url:this.url,callback:this.onData,scope:this,ts:d,timeout:this.timeout},b;if(Ext.isArray(d)){b=[];for(var c=0,a=d.length;c<a;c++){b.push(this.getCallData(d[c]))}}else{b=this.getCallData(d)}if(this.enableUrlEncode){var e={};e[Ext.isString(this.enableUrlEncode)?this.enableUrlEncode:"data"]=Ext.encode(b);f.params=e}else{f.jsonData=b}Ext.Ajax.request(f)},combineAndSend:function(){var a=this.callBuffer.length;if(a>0){this.doSend(a==1?this.callBuffer[0]:this.callBuffer);this.callBuffer=[]}},queueTransaction:function(a){if(a.form){this.processForm(a);return}this.callBuffer.push(a);if(this.enableBuffer){if(!this.callTask){this.callTask=new Ext.util.DelayedTask(this.combineAndSend,this)}this.callTask.delay(Ext.isNumber(this.enableBuffer)?this.enableBuffer:10)}else{this.combineAndSend()}},doCall:function(h,a,b){var g=null,e=b[a.len],f=b[a.len+1];if(a.len!==0){g=b.slice(0,a.len)}var d=new Ext.Direct.Transaction({provider:this,args:b,action:h,method:a.name,data:g,cb:f&&Ext.isFunction(e)?e.createDelegate(f):e});if(this.fireEvent("beforecall",this,d,a)!==false){Ext.Direct.addTransaction(d);this.queueTransaction(d);this.fireEvent("call",this,d,a)}},doForm:function(i,b,f,h,e){var d=new Ext.Direct.Transaction({provider:this,action:i,method:b.name,args:[f,h,e],cb:e&&Ext.isFunction(h)?h.createDelegate(e):h,isForm:true});if(this.fireEvent("beforecall",this,d,b)!==false){Ext.Direct.addTransaction(d);var a=String(f.getAttribute("enctype")).toLowerCase()=="multipart/form-data",g={extTID:d.tid,extAction:i,extMethod:b.name,extType:"rpc",extUpload:String(a)};Ext.apply(d,{form:Ext.getDom(f),isUpload:a,params:h&&Ext.isObject(h.params)?Ext.apply(g,h.params):g});this.fireEvent("call",this,d,b);this.processForm(d)}},processForm:function(a){Ext.Ajax.request({url:this.url,params:a.params,callback:this.onData,scope:this,form:a.form,isUpload:a.isUpload,ts:a})},createMethod:function(d,a){var b;if(!a.formHandler){b=function(){this.doCall(d,a,Array.prototype.slice.call(arguments,0))}.createDelegate(this)}else{b=function(e,f,c){this.doForm(d,a,e,f,c)}.createDelegate(this)}b.directCfg={action:d,method:a};return b},getTransaction:function(a){return a&&a.tid?Ext.Direct.getTransaction(a.tid):null},doCallback:function(c,f){var d=f.status?"success":"failure";if(c&&c.cb){var b=c.cb,a=Ext.isDefined(f.result)?f.result:f.data;if(Ext.isFunction(b)){b(a,f)}else{Ext.callback(b[d],b.scope,[a,f]);Ext.callback(b.callback,b.scope,[a,f])}}}});Ext.Direct.PROVIDERS.remoting=Ext.direct.RemotingProvider;