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
Ext.data.XmlWriter=function(a){Ext.data.XmlWriter.superclass.constructor.apply(this,arguments);this.tpl=(typeof(this.tpl)==="string")?new Ext.XTemplate(this.tpl).compile():this.tpl.compile()};Ext.extend(Ext.data.XmlWriter,Ext.data.DataWriter,{documentRoot:"xrequest",forceDocumentRoot:false,root:"records",xmlVersion:"1.0",xmlEncoding:"ISO-8859-15",tpl:'<tpl for="."><\u003fxml version="{version}" encoding="{encoding}"\u003f><tpl if="documentRoot"><{documentRoot}><tpl for="baseParams"><tpl for="."><{name}>{value}</{name}></tpl></tpl></tpl><tpl if="records.length&gt;1"><{root}></tpl><tpl for="records"><{parent.record}><tpl for="."><{name}>{value}</{name}></tpl></{parent.record}></tpl><tpl if="records.length&gt;1"></{root}></tpl><tpl if="documentRoot"></{documentRoot}></tpl></tpl>',render:function(b,c,a){c=this.toArray(c);b.xmlData=this.tpl.applyTemplate({version:this.xmlVersion,encoding:this.xmlEncoding,documentRoot:(c.length>0||this.forceDocumentRoot===true)?this.documentRoot:false,record:this.meta.record,root:this.root,baseParams:c,records:(Ext.isArray(a[0]))?a:[a]})},createRecord:function(a){return this.toArray(this.toHash(a))},updateRecord:function(a){return this.toArray(this.toHash(a))},destroyRecord:function(b){var a={};a[this.meta.idProperty]=b.id;return this.toArray(a)}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.XmlReader=function(a,b){a=a||{};Ext.applyIf(a,{idProperty:a.idProperty||a.idPath||a.id,successProperty:a.successProperty||a.success});Ext.data.XmlReader.superclass.constructor.call(this,a,b||a.fields)};Ext.extend(Ext.data.XmlReader,Ext.data.DataReader,{read:function(a){var b=a.responseXML;if(!b){throw {message:"XmlReader.read: XML Document not available"}}return this.readRecords(b)},readRecords:function(d){this.xmlData=d;var a=d.documentElement||d,c=Ext.DomQuery,f=0,e=true;if(this.meta.totalProperty){f=this.getTotal(a,0)}if(this.meta.successProperty){e=this.getSuccess(a)}var b=this.extractData(c.select(this.meta.record,a),true);return{success:e,records:b,totalRecords:f||b.length}},readResponse:function(f,b){var e=Ext.DomQuery,g=b.responseXML,a=g.documentElement||g;var c=new Ext.data.Response({action:f,success:this.getSuccess(a),message:this.getMessage(a),data:this.extractData(e.select(this.meta.record,a)||e.select(this.meta.root,a),false),raw:g});if(Ext.isEmpty(c.success)){throw new Ext.data.DataReader.Error("successProperty-response",this.meta.successProperty)}if(f===Ext.data.Api.actions.create){var d=Ext.isDefined(c.data);if(d&&Ext.isEmpty(c.data)){throw new Ext.data.JsonReader.Error("root-empty",this.meta.root)}else{if(!d){throw new Ext.data.JsonReader.Error("root-undefined-response",this.meta.root)}}}return c},getSuccess:function(){return true},buildExtractors:function(){if(this.ef){return}var l=this.meta,h=this.recordType,e=h.prototype.fields,k=e.items,j=e.length;if(l.totalProperty){this.getTotal=this.createAccessor(l.totalProperty)}if(l.successProperty){this.getSuccess=this.createAccessor(l.successProperty)}if(l.messageProperty){this.getMessage=this.createAccessor(l.messageProperty)}this.getRoot=function(f){return(!Ext.isEmpty(f[this.meta.record]))?f[this.meta.record]:f[this.meta.root]};if(l.idPath||l.idProperty){var d=this.createAccessor(l.idPath||l.idProperty);this.getId=function(f){var g=d(f)||f.id;return(g===undefined||g==="")?null:g}}else{this.getId=function(){return null}}var c=[];for(var b=0;b<j;b++){e=k[b];var a=(e.mapping!==undefined&&e.mapping!==null)?e.mapping:e.name;c.push(this.createAccessor(a))}this.ef=c},createAccessor:function(){var a=Ext.DomQuery;return function(b){if(Ext.isFunction(b)){return b}switch(b){case this.meta.totalProperty:return function(c,d){return a.selectNumber(b,c,d)};break;case this.meta.successProperty:return function(d,e){var c=a.selectValue(b,d,true);var f=c!==false&&c!=="false";return f};break;default:return function(c,d){return a.selectValue(b,c,d)};break}}}(),extractValues:function(h,d,a){var g,c={};for(var e=0;e<a;e++){g=d[e];var b=this.ef[e](h);c[g.name]=g.convert((b!==undefined)?b:g.defaultValue,h)}return c}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.XmlStore=Ext.extend(Ext.data.Store,{constructor:function(a){Ext.data.XmlStore.superclass.constructor.call(this,Ext.apply(a,{reader:new Ext.data.XmlReader(a)}))}});Ext.reg("xmlstore",Ext.data.XmlStore);