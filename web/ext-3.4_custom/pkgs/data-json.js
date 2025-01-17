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
Ext.data.JsonWriter=Ext.extend(Ext.data.DataWriter,{encode:true,encodeDelete:false,constructor:function(a){Ext.data.JsonWriter.superclass.constructor.call(this,a)},render:function(c,d,b){if(this.encode===true){Ext.apply(c,d);c[this.meta.root]=Ext.encode(b)}else{var a=Ext.apply({},d);a[this.meta.root]=b;c.jsonData=a}},createRecord:function(a){return this.toHash(a)},updateRecord:function(a){return this.toHash(a)},destroyRecord:function(b){if(this.encodeDelete){var a={};a[this.meta.idProperty]=b.id;return a}else{return b.id}}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.JsonReader=function(a,b){a=a||{};Ext.applyIf(a,{idProperty:"id",successProperty:"success",totalProperty:"total"});Ext.data.JsonReader.superclass.constructor.call(this,a,b||a.fields)};Ext.extend(Ext.data.JsonReader,Ext.data.DataReader,{read:function(a){var b=a.responseText;var c=Ext.decode(b);if(!c){throw {message:"JsonReader.read: Json object not found"}}return this.readRecords(c)},readResponse:function(e,b){var g=(b.responseText!==undefined)?Ext.decode(b.responseText):b;if(!g){throw new Ext.data.JsonReader.Error("response")}var a=this.getRoot(g),f=this.getSuccess(g);if(f&&e===Ext.data.Api.actions.create){var d=Ext.isDefined(a);if(d&&Ext.isEmpty(a)){throw new Ext.data.JsonReader.Error("root-empty",this.meta.root)}else{if(!d){throw new Ext.data.JsonReader.Error("root-undefined-response",this.meta.root)}}}var c=new Ext.data.Response({action:e,success:f,data:(a)?this.extractData(a,false):[],message:this.getMessage(g),raw:g});if(Ext.isEmpty(c.success)){throw new Ext.data.JsonReader.Error("successProperty-response",this.meta.successProperty)}return c},readRecords:function(a){this.jsonData=a;if(a.metaData){this.onMetaChange(a.metaData)}var m=this.meta,h=this.recordType,b=h.prototype.fields,l=b.items,i=b.length,j;var g=this.getRoot(a),e=g.length,d=e,k=true;if(m.totalProperty){j=parseInt(this.getTotal(a),10);if(!isNaN(j)){d=j}}if(m.successProperty){j=this.getSuccess(a);if(j===false||j==="false"){k=false}}return{success:k,records:this.extractData(g,true),totalRecords:d}},buildExtractors:function(){if(this.ef){return}var l=this.meta,h=this.recordType,e=h.prototype.fields,k=e.items,j=e.length;if(l.totalProperty){this.getTotal=this.createAccessor(l.totalProperty)}if(l.successProperty){this.getSuccess=this.createAccessor(l.successProperty)}if(l.messageProperty){this.getMessage=this.createAccessor(l.messageProperty)}this.getRoot=l.root?this.createAccessor(l.root):function(f){return f};if(l.id||l.idProperty){var d=this.createAccessor(l.id||l.idProperty);this.getId=function(g){var f=d(g);return(f===undefined||f==="")?null:f}}else{this.getId=function(){return null}}var c=[];for(var b=0;b<j;b++){e=k[b];var a=(e.mapping!==undefined&&e.mapping!==null)?e.mapping:e.name;c.push(this.createAccessor(a))}this.ef=c},simpleAccess:function(b,a){return b[a]},createAccessor:function(){var a=/[\[\.]/;return function(c){if(Ext.isEmpty(c)){return Ext.emptyFn}if(Ext.isFunction(c)){return c}var b=String(c).search(a);if(b>=0){return new Function("obj","return obj"+(b>0?".":"")+c)}return function(d){return d[c]}}}(),extractValues:function(h,d,a){var g,c={};for(var e=0;e<a;e++){g=d[e];var b=this.ef[e](h);c[g.name]=g.convert((b!==undefined)?b:g.defaultValue,h)}return c}});Ext.data.JsonReader.Error=Ext.extend(Ext.Error,{constructor:function(b,a){this.arg=a;Ext.Error.call(this,b)},name:"Ext.data.JsonReader"});Ext.apply(Ext.data.JsonReader.Error.prototype,{lang:{response:"An error occurred while json-decoding your server response","successProperty-response":'Could not locate your "successProperty" in your server response.  Please review your JsonReader config to ensure the config-property "successProperty" matches the property in your server-response.  See the JsonReader docs.',"root-undefined-config":'Your JsonReader was configured without a "root" property.  Please review your JsonReader config and make sure to define the root property.  See the JsonReader docs.',"idProperty-undefined":'Your JsonReader was configured without an "idProperty"  Please review your JsonReader configuration and ensure the "idProperty" is set (e.g.: "id").  See the JsonReader docs.',"root-empty":'Data was expected to be returned by the server in the "root" property of the response.  Please review your JsonReader configuration to ensure the "root" property matches that returned in the server-response.  See JsonReader docs.'}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.ArrayReader=Ext.extend(Ext.data.JsonReader,{readRecords:function(r){this.arrayData=r;var l=this.meta,d=l?Ext.num(l.idIndex,l.id):null,b=this.recordType,q=b.prototype.fields,z=[],e=true,g;var u=this.getRoot(r);for(var y=0,A=u.length;y<A;y++){var t=u[y],a={},p=((d||d===0)&&t[d]!==undefined&&t[d]!==""?t[d]:null);for(var x=0,m=q.length;x<m;x++){var B=q.items[x],w=B.mapping!==undefined&&B.mapping!==null?B.mapping:x;g=t[w]!==undefined?t[w]:B.defaultValue;g=B.convert(g,t);a[B.name]=g}var c=new b(a,p);c.json=t;z[z.length]=c}var h=z.length;if(l.totalProperty){g=parseInt(this.getTotal(r),10);if(!isNaN(g)){h=g}}if(l.successProperty){g=this.getSuccess(r);if(g===false||g==="false"){e=false}}return{success:e,records:z,totalRecords:h}}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.ArrayStore=Ext.extend(Ext.data.Store,{constructor:function(a){Ext.data.ArrayStore.superclass.constructor.call(this,Ext.apply(a,{reader:new Ext.data.ArrayReader(a)}))},loadData:function(e,b){if(this.expandData===true){var d=[];for(var c=0,a=e.length;c<a;c++){d[d.length]=[e[c]]}e=d}Ext.data.ArrayStore.superclass.loadData.call(this,e,b)}});Ext.reg("arraystore",Ext.data.ArrayStore);Ext.data.SimpleStore=Ext.data.ArrayStore;Ext.reg("simplestore",Ext.data.SimpleStore);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.JsonStore=Ext.extend(Ext.data.Store,{constructor:function(a){Ext.data.JsonStore.superclass.constructor.call(this,Ext.apply(a,{reader:new Ext.data.JsonReader(a)}))}});Ext.reg("jsonstore",Ext.data.JsonStore);