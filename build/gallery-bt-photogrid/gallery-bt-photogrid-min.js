YUI.add("gallery-bt-photogrid",function(a){var b="widthChange",h="columnWidthChange",i=100,e="bpg_",g={COLUMN:e+"column",MODULE:e+"module"},f={COLUMN:'<div class="'+g.COLUMN+'"></div>'},d={vertical:1,horizontal:1},c=a.Base.create("btphotogrid",a.Widget,[a.Bottle.SyncScroll],{initializer:function(){this.parseImageData();this.set("syncScrollMethod",this._updateColumns);this._bpgEventHandlers=new a.EventHandle([this.after(b,this._updateColumns),this.after(h,this._updateColumns)]);},destructor:function(){this._bpgEventHandlers.detach();delete this._bpgEventHandlers;},renderUI:function(){this._updateColumns(true);},parseImageData:function(m,k){var j=k?this._bpgImages:[],l=this.get("photoNode"),n=m||this.get("contentBox");if(!k){this._bpgPending=0;}n.all(this.get("moduleNode")).each(function(q){var p={icon:q.getData("icon"),img:q.getData("img"),width:q.getData("width"),height:q.getData("height"),module:q.addClass(g.MODULE)},o=q.one(l);if(!p.icon){return;}p.load=a.Node.create('<img src="'+p.icon+'" />');if(o){o.append(p.load);}else{q.insert(p.load,0);}if(!p.height||!p.width){this._bpgPending+=1;p.load.once("load",function(r){var s=r.target;this.height=s.get("height");this.width=s.get("width");this._bpgPending-=1;},p);}j.push(p);},this);this._bpgImages=j;},_minColumn:function(){var j=9999,k;this.get("contentBox").all("> div").each(function(m){var l=m.get("offsetHeight");if(l<j){j=l;k=m;}});return k;},renderImages:function(){var j,k=i;if(this._bpgImages.length<=this._bpgRendered){this.syncScroll();return;}j=this._bpgImages[this._bpgRendered];if(j.width){this._minColumn().append(j.module);this._bpgRendered+=1;k=1;}a.later(k,this,this.renderImages);},_updateColumns:function(p){var m=this.get("contentBox"),k=m.get("offsetWidth"),s=this.get("columnWidth"),o=Math.round(k/s),q=Math.floor(k/o),n=k-q*(o-1),l=f.COLUMN,j=p||(this._bpgColumns!==o),r;if(j){m.all(this.get("moduleNode")).remove();m.set("innerHTML","");this._bpgColumns=o;for(r=0;r<o;r++){m.append(l);}}m.all("> div").each(function(u,t){u.set("offsetWidth",t?q:n);});this.syncScroll();if(j){this._bpgRendered=0;this.renderImages();}}},{ATTRS:{columnWidth:{value:200,validator:function(j){return(j*1>0);},setter:function(j){return j*1;}},gridType:{value:"vertical",validator:function(j){return d[j]?true:false;}},moduleNode:{value:"> div",validator:a.Lang.isString},photoNode:{value:".img",validator:a.Lang.isString}},HTML_PARSER:{columnWidth:function(j){return j.getData("column-width");},gridType:function(j){return j.getData("grid-type");},moduleNode:function(j){return j.getData("module-node");},photoNode:function(j){return j.getData("photo-node");}}});a.namespace("Bottle").PhotoGrid=c;},"@VERSION@",{requires:["gallery-bt-syncscroll"]});