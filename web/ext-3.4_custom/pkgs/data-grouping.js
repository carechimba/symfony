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
Ext.data.GroupingStore=Ext.extend(Ext.data.Store,{constructor:function(d){d=d||{};this.hasMultiSort=true;this.multiSortInfo=this.multiSortInfo||{sorters:[]};var e=this.multiSortInfo.sorters,c=d.groupField||this.groupField,b=d.sortInfo||this.sortInfo,a=d.groupDir||this.groupDir;if(c){e.push({field:c,direction:a})}if(b){e.push(b)}Ext.data.GroupingStore.superclass.constructor.call(this,d);this.addEvents("groupchange");this.applyGroupField()},remoteGroup:false,groupOnSort:false,groupDir:"ASC",clearGrouping:function(){this.groupField=false;if(this.remoteGroup){if(this.baseParams){delete this.baseParams.groupBy;delete this.baseParams.groupDir}var a=this.lastOptions;if(a&&a.params){delete a.params.groupBy;delete a.params.groupDir}this.reload()}else{this.sort();this.fireEvent("datachanged",this)}},groupBy:function(e,a,d){d=d?(String(d).toUpperCase()=="DESC"?"DESC":"ASC"):this.groupDir;if(this.groupField==e&&this.groupDir==d&&!a){return}var c=this.multiSortInfo.sorters;if(c.length>0&&c[0].field==this.groupField){c.shift()}this.groupField=e;this.groupDir=d;this.applyGroupField();var b=function(){this.fireEvent("groupchange",this,this.getGroupState())};if(this.groupOnSort){this.sort(e,d);b.call(this);return}if(this.remoteGroup){this.on("load",b,this,{single:true});this.reload()}else{this.sort(c);b.call(this)}},sort:function(g,c){if(this.remoteSort){return Ext.data.GroupingStore.superclass.sort.call(this,g,c)}var f=[];if(Ext.isArray(arguments[0])){f=arguments[0]}else{if(g==undefined){f=this.sortInfo?[this.sortInfo]:[]}else{var e=this.fields.get(g);if(!e){return false}var b=e.name,a=this.sortInfo||null,d=this.sortToggle?this.sortToggle[b]:null;if(!c){if(a&&a.field==b){c=(this.sortToggle[b]||"ASC").toggle("ASC","DESC")}else{c=e.sortDir}}this.sortToggle[b]=c;this.sortInfo={field:b,direction:c};f=[this.sortInfo]}}if(this.groupField){f.unshift({direction:this.groupDir,field:this.groupField})}return this.multiSort.call(this,f,c)},applyGroupField:function(){if(this.remoteGroup){if(!this.baseParams){this.baseParams={}}Ext.apply(this.baseParams,{groupBy:this.groupField,groupDir:this.groupDir});var a=this.lastOptions;if(a&&a.params){a.params.groupDir=this.groupDir;delete a.params.groupBy}}},applyGrouping:function(a){if(this.groupField!==false){this.groupBy(this.groupField,true,this.groupDir);return true}else{if(a===true){this.fireEvent("datachanged",this)}return false}},getGroupState:function(){return this.groupOnSort&&this.groupField!==false?(this.sortInfo?this.sortInfo.field:undefined):this.groupField}});Ext.reg("groupingstore",Ext.data.GroupingStore);