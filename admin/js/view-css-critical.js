O10N[1](function(D,a,F,K,h,n){function G(){var b=a("#critical_css_conditions_container").data("file");try{var g=m.get()}catch(c){return void h[51]("error","Failed to parse condition JSON: "+c.message,!1,!0,function(){})}var d=a('<span class="spinner"></span>');d.insertAfter(a("#critical_css_conditions_container .cancel"));d.css("visibility","visible");d={};d.file=b;d.conditions=JSON.stringify(g);h[24]("critical_css_save_conditions",d,function(c,d,e){if(a("#critical_css_conditions_container .spinner").remove(),
c)h[51]("error",c,!1,!0,function(){}),h[11]("","failed to delete",b,c);else if(p(),c=a('#critical-css-files tr[data-file="'+b+'"]'),c.length){if(c.data("conditions",e&&e[0]?e[0]:""),e[0])1===e[0].length?a(".conditions span",c).html(n[28]):a(".conditions span",c).html(n[29].replace("%d",e[0].length)),e=JSON.stringify(e[0]),50<e.length&&(e=e.substr(0,40)+"&hellip;]"),a(".conditions .json",c).html(e);a("html, body").animate({scrollTop:c.offset().top-50},200)}})}function H(){a(this);var b=a(this).closest("tr");
if(b.hasClass("edit_conditions"))return p(b);p();var g=b.data("file")||"",d=b.data("conditions");a("#critical-css-files tr").removeClass("edit_conditions");b.addClass("edit_conditions");a("td.options a.conditions",b).addClass("button-green");a("#critical_css_conditions_container").show();a("#critical_css_conditions_container").data("file",g);a("#critical_css_conditions_container .subhead .file").html(g);a("html, body").animate({scrollTop:a("#critical_css_conditions_container").offset().top-150},200);
h[55](function(b){h[15](function(){a("#critical_css_conditions").html("");var c,e={name:g,mode:"code",modes:["code","tree"],onError:function(a){h[11]("","JSON",a.toString());alert("JSON error. Please verify your input.\n\nSee console for details.")},onChange:function(){try{var b=m.get()}catch(A){return}a("#critical_css_conditions_src").val(JSON.stringify(b))},onModeChange:function(a){"tree"===a&&m.expandAll()},search:!1,schema:h[4]("css.critical.conditions"),ajv:h[59]};if(d)if("string"==typeof d)try{c=
JSON.parse(d)}catch(l){c=[]}else c=d;else c=[];(m=new b(a("#critical_css_conditions")[0],e,c)).compact();m.aceEditor.setOptions({autoScrollEditorIntoView:!0,maxLines:1/0});m.focus();a("#critical_css_conditions_src").data("json-editor",m)})})}function p(b){b||(b=a("#critical-css-files tr"));b.removeClass("edit_conditions");a("td.options a.conditions",b).removeClass("button-green");a("#critical_css_conditions_container").hide()}function I(){var b=a(this),g=a(this).closest("tr"),d=g.data("file");g.addClass("delete");
h[15](function(){setTimeout(function(){if(confirm(n[24])){p();var c=a('<span class="spinner"></span>');b.replaceWith(c);c.css("visibility","visible");c={};c.file=d;c.files=JSON.stringify(q());h[24]("critical_css_delete_file",c,function(b){b?(h[51]("error",b,!1,!0,function(){}),h[11]("","failed to delete",d,b)):(a('tr[rel="'+d+'"]',a("#critical-css-files")).remove(),C(function(){var b=q();b instanceof Array||(b=[]);for(var c=b.length,g=0;g<c;g++)b[g]&&b[g].file===d&&b.splice(g,1);a('input[name="o10n[css.critical.files]"]').val(JSON.stringify(b));
r()}))})}else g.removeClass("delete")})})}function v(){var b=a("#add_critical_css_file_form .submit"),g=a(this).hasClass("add-edit"),d=a("#add_critical_css_file_form"),c={};if(c.file=a("input.file",d).val(),c.title=a("input.title",d).val(),c.priority=a("input.priority",d).val(),c.files=JSON.stringify(q()),""!==a.trim(c.file)){if(!/^[a-zA-Z0-9\-\_\.]+(\.css)?$/.test(c.file))return a(".add_critical_file input.file").focus(),void h[61](b,a("input.file",d).data("invalid"));if(/^[a-zA-Z0-9\-\_\.]+\.css$/.test(c.file)||
(c.file+=".css"),""===a.trim(c.priority)||isNaN(parseInt(c.priority))||1>parseInt(c.priority))return a("input.priority",d).focus(),void h[61](b,a("input.priority",d).data("invalid"));a("button",d).prop("disabled",!0);var x=setTimeout(function(){a(".add_critical_file button").prop("disabled",!1);a("button").prop("disabled",!1)},3E3);h[61](b,n[21]);h[62](b);h[24]("critical_css_add_file",c,function(e,l,A){if(h[62](b,!0),a("button",d).prop("disabled",!1),x&&clearTimeout(x),e)h[51]("error",e,!1,!0,function(){}),
h[11]("","failed to save",c,e);else{if(l)return void h[61](b,l);a("input.file",d).val("");a("input.title",d).val("");a("input.priority",d).val("");a("input.file",d).blur();h[61](b,n[22],3E3);C(function(){if(g){if(A&&A[1]){var b=a('#critical-css-files tr[data-file="'+A[1]+'"] a.edit').attr("href");document.location.href=b}}else r(),a("#add_critical_css_file_form").hide()})}})}else a("input.file",d).focus()}function J(){if(y){for(var b,g=y,d=document.createDocumentFragment(),c=g.length,h=0;h<c;h++){if(criticalCssParams=
g[h],criticalCssParams.error)(b=a(t.cloneNode(!0).firstElementChild)).attr("data-type","error"),b.attr("data-file",criticalCssParams.filepath),a(".title",b).html(criticalCssParams.title?criticalCssParams.title:criticalCssParams.file),a(".error",b).html(criticalCssParams.error),a(".filepath",b).html(criticalCssParams.filepath);else{if(criticalCssParams.file)(b=a(u.cloneNode(!0).firstElementChild)).attr("data-type","file"),b.attr("data-file",criticalCssParams.filepath),a(".edit",b).attr("href",criticalCssParams.edit_url),
a(".title",b).html(criticalCssParams.title?criticalCssParams.title:criticalCssParams.file),a(".title",b).attr("href",criticalCssParams.edit_url),a(".filepath",b).html(criticalCssParams.filepath),a(".date",b).html(criticalCssParams.date),a(".size span",b).html(criticalCssParams.hsize);else{if(!criticalCssParams.V)continue;(b=a(B.cloneNode(!0).firstElementChild)).attr("data-type","auto");b.attr("data-file",criticalCssParams.filepath);b.attr("data-auto",JSON.stringify(void 0));a(".title",b).html(criticalCssParams.title?
criticalCssParams.title:criticalCssParams.file);a(".error",b).html(criticalCssParams.error)}a(".priority input",b).val(criticalCssParams.priority);a(".priority input",b).attr("name","o10n[sort]["+criticalCssParams.file+"]")}if(criticalCssParams.conditions){b.attr("data-conditions",JSON.stringify(criticalCssParams.conditions));1===criticalCssParams.conditions.length?a(".conditions span",b).html(n[28]):a(".conditions span",b).html(n[29].replace("%d",criticalCssParams.conditions.length));var e=JSON.stringify(criticalCssParams.conditions);
50<e.length&&(e=e.substr(0,40)+"&hellip;]");a(".conditions .json",b).html(e)}a(d).append(b)}a("#critical-css-files tr").remove();a("#critical-css-files").append(d)}}function C(b){var g={files:0};h[24]("critical_css_files_list",g,function(d,c,x){d?(h[51]("error",d,!1,!0,function(){}),h[11]("","failed to save",g,d)):(y=x[0],a('input[name="o10n[css.critical.files]"]').val(JSON.stringify(x[1])),J(),b&&b())})}function r(b){var g=q();if(g instanceof Array||(g=[]),0===a("#critical-css-files tr").length)a("#critical-css-files-empty").show();
else{if(a("#critical-css-files-empty").hide(),b)if(l=parseInt(b.val()),!isNaN(l)){var d=b.closest("tr"),c=d.prev(),d=d.next(),h=!1;c.length&&(e=parseInt(a(".priority input",c).val()),isNaN(e)||l!==e||(a(".priority input",c).val(l+1),a(b).val(e),h=!0));!h&&d.length&&(c=parseInt(a(".priority input",d).val()),isNaN(c)||l!==c||(a(".priority input",d).val(l+1),b.val(c)))}b=a("#critical-css-files tr").get();b.sort(function(b,c){var d=parseInt(a(".priority input",b).val()),e=parseInt(a(".priority input",
c).val());return isNaN(d)&&(d=1),isNaN(e)&&(e=1),d===e?0:d<e?-1:1});a.each(b,function(b,c){a("#critical-css-files").append(c)});var e=0;a("#critical-css-files tr").each(function(b,c){var d=parseInt(a(".priority input",c).val());isNaN(d)&&(d=1);d<=e&&(d=e+1,a(".priority input",c).val(d));e=d});var l;b=g.length;for(c=0;c<b;c++)g[c].file&&(l=parseInt(a('#critical-css-files tr[data-file="'+g[c].file+'"] .priority input').val()),isNaN(l)||(g[c].priority=l));g.sort(function(a,b){return isNaN(a.priority)&&
(a.priority=1),isNaN(b.priority)&&(b.priority=1),a.priority===b.priority?0:a.priority<b.priority?-1:1});a('input[name="o10n[css.critical.files]"]').val(JSON.stringify(g))}}function q(){var b=a('input[name="o10n[css.critical.files]"]').val();if(b)try{return JSON.parse(b)}catch(g){}return[]}!function(a,h,d,c){function b(a,b){return Math.max(0,a[0]-b[0],b[0]-a[1])+Math.max(0,a[2]-b[1],b[1]-a[3])}function e(f,b,c,d){var k=f.length;d=d?"offset":"position";for(c=c||0;k--;){var z=f[k].el?f[k].el:a(f[k]),
e=z[d]();e.left+=parseInt(z.css("margin-left"),10);e.top+=parseInt(z.css("margin-top"),10);b[k]=[e.left-c,e.left+z.outerWidth()+c,e.top-c,e.top+z.outerHeight()+c]}}function g(a,b){var f=b.offset();return{left:a.left-f.left,top:a.top-f.top}}function n(a,c,d){c=[c.left,c.top];d=d&&[d.left,d.top];for(var f,k=a.length,e=[];k--;)f=a[k],e[k]=[k,b(f,c),d&&b(f,d)];return e=e.sort(function(a,f){return f[1]-a[1]||f[2]-a[2]||f[0]-a[0]})}function m(f){this.options=a.extend({},w,f);this.containers=[];this.options.a||
(this.scrollProxy=a.proxy(this.scroll,this),this.dragProxy=a.proxy(this.drag,this),this.dropProxy=a.proxy(this.drop,this),this.placeholder=a(this.options.placeholder),f.isValidTarget||(this.options.isValidTarget=c))}function p(f,b){this.el=f;this.options=a.extend({},r,b);this.group=m.get(this.options);this.a=this.options.a||this.group;this.handle=this.a.options.handle||this.a.options.itemSelector;var c=this.a.options.itemPath;this.target=c?this.el.find(c):this.el;this.target.on(t.start,this.handle,
a.proxy(this.o,this));this.options.drop&&this.group.containers.push(this)}var r={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},w={afterMove:function(){},containerPath:"",containerSelector:"ol, ul",distance:0,delay:0,handle:"",itemPath:"",itemSelector:"li",bodyClass:"dragging",draggedClass:"dragged",isValidTarget:function(){return!0},onCancel:function(){},onDrag:function(a,b){a.css(b)},onDragStart:function(f,b){f.css({height:f.outerHeight(),width:f.outerWidth()});f.addClass(b.group.options.draggedClass);
a("body").addClass(b.group.options.bodyClass)},onDrop:function(f,b){f.removeClass(b.group.options.draggedClass).removeAttr("style");a("body").removeClass(b.group.options.bodyClass)},onMousedown:function(a,b,c){if(!c.target.nodeName.match(/^(input|select|textarea)$/i))return c.preventDefault(),!0},placeholderClass:"placeholder",placeholder:'<li class="placeholder"></li>',pullPlaceholder:!0,serialize:function(f,b,c){f=a.extend({},f.data());return c?[b]:(b[0]&&(f.children=b),delete f.W,delete f.sortable,
f)},tolerance:0},q={},v=0,y={left:0,top:0,bottom:0,right:0},t={start:"touchstart.sortable mousedown.sortable",drop:"touchend.sortable touchcancel.sortable mouseup.sortable",drag:"touchmove.sortable mousemove.sortable",scroll:"scroll.sortable"};m.get=function(a){return q[a.group]||(a.group===c&&(a.group=v++),q[a.group]=new m(a)),q[a.group]};m.prototype={o:function(f,b){this.K=a(b.el[0].ownerDocument);var c=a(f.target).closest(this.options.itemSelector);c.length&&(this.item=c,this.G=b,!this.item.is(this.options.exclude)&&
this.options.onMousedown(this.item,w.onMousedown,f))&&(this.I(f),this.J("on"),this.U(),this.C=!0)},drag:function(a){if(!this.s){if(!this.M(a)||!this.m)return;this.options.onDragStart(this.item,this.G,w.onDragStart,a);this.item.before(this.placeholder);this.s=!0}this.I(a);this.options.onDrag(this.item,g(this.b,this.item.offsetParent()),w.onDrag,a);a=this.v(a);var f=this.h,b=this.options.tolerance;(!f||f.top-b>a.top||f.bottom+b<a.top||f.left-b>a.left||f.right+b<a.left)&&(this.i()||(this.placeholder.detach(),
this.w=c))},drop:function(a){this.J("off");this.C=!1;this.s&&(this.placeholder.closest("html")[0]?this.placeholder.before(this.item).detach():this.options.onCancel(this.item,this.G,w.onCancel,a),this.options.onDrop(this.item,this.N(this.item),w.onDrop,a),this.A(),this.B(),this.w=this.h=c,this.s=!1)},i:function(a,b){a||(a=this.H||this.b,b=this.T||this.S);for(var f=n(this.O(),a,b),d=f.length;d--;){var e=f[d][0];if(!f[d][1]||this.options.pullPlaceholder)if(e=this.containers[e],!e.disabled){if(!this.c()){var k=
e.u();a=g(a,k);b=g(b,k)}if(e.i(a,b))return!0}}this.h&&(this.h=c)},g:function(a,b,c,d){var f=this.w;!d&&f&&f[0]===b[0]||(b[c](this.placeholder),this.w=b,this.h=d,this.options.afterMove(this.placeholder,a,b))},O:function(){return this.l||e(this.containers,this.l=[],this.options.tolerance,!this.c()),this.l},N:function(a){return a.closest(this.options.containerSelector).data("sortable")},c:function(){if(this.offsetParent===c){var a=this.containers.length-1,b=this.containers[a].u();if(!this.options.a)for(;a--;)if(b[0]!=
this.containers[a].u()[0]){b=!1;break}this.offsetParent=b}return this.offsetParent},I:function(a){a=this.v(a);if(this.c()){var b=g(a,this.c());this.T=this.H;this.H=b}this.S=this.b;this.b=a},M:function(a){a=this.v(a);return Math.max(Math.abs(this.b.left-a.left),Math.abs(this.b.top-a.top))>=this.options.distance},v:function(a){var b=a.originalEvent||a.originalEvent.touches&&a.originalEvent.touches[0];return{left:a.pageX||b.pageX,top:a.pageY||b.pageY}},U:function(){var a=this;(this.m=!this.options.delay)||
(clearTimeout(this.L),this.L=setTimeout(function(){a.m=!0},this.options.delay))},scroll:function(){this.A();this.B()},J:function(b){var c=this;a.each(["drag","drop","scroll"],function(a,f){c.K[b](t[f],c[f+"Proxy"])})},B:function(){this.offsetParent=c},A:function(){this.traverse(function(a){a._clearDimensions()})},traverse:function(a){a(this);for(var b=this.containers.length;b--;)this.containers[b].traverse(a)},_clearDimensions:function(){this.l=c},_destroy:function(){q[this.options.group]=c}};p.prototype=
{o:function(a){var b=this.a;!this.disabled&&!b.C&&this.options.drag&&this.R(a)&&b.o(a,this)},R:function(a){return 1==a.which||"touchstart"==a.type&&1==a.originalEvent.touches.length},i:function(a,b){var c=n(this.P(),a,b),f=c.length,d=this.a,e=!d.options.isValidTarget||d.options.isValidTarget(d.item,this);if(!f&&e)return d.g(this,this.target,"append"),!0;for(;f--;)if(d=c[f][0],!c[f][1]&&this.F(d)){if(this.D(d).i(a,b))return!0}else if(e)return this.g(d,a),!0},g:function(b,c){var d=a(this.items[b]),
f=this.f[b],e="after",g=d.outerWidth(),h=d.outerHeight(),k=d.offset(),k={left:k.left,right:k.left+g,top:k.top,bottom:k.top+h};this.options.vertical?c.top<=(f[2]+f[3])/2?(e="before",k.bottom-=h/2):k.top+=h/2:c.left<=(f[0]+f[1])/2?(e="before",k.right-=g/2):k.left+=g/2;this.F(b)&&(k=y);this.a.g(this,d,e,k)},P:function(){return this.f||(this.items=this.j(this.el,"item").filter(":not(."+this.group.options.placeholderClass+", ."+this.group.options.draggedClass+")").get(),e(this.items,this.f=[],this.options.tolerance)),
this.f},u:function(){var a=this.el;return"relative"===a.css("position")||"absolute"===a.css("position")||"fixed"===a.css("position")?a:a.offsetParent()},F:function(a){return this.options.nested&&this.D(a)},D:function(b){var d=a.data(this.items[b],"subContainers");if(d===c){var f=this.j(this.items[b],"container");if(d=!1,f[0])d=a.extend({},this.options,{a:this.a,group:v++}),d=f.sortable(d).data("sortable").group;a.data(this.items[b],"subContainers",d)}return d},j:function(b,c){var d=this.a.options,
f=d[c+"Path"],d=d[c+"Selector"];return b=a(b),f&&(b=b.find(f)),b.children(d)},_serialize:function(b,c){var d=this,f=this.j(b,c?"item":"container").not(this.options.exclude).map(function(){return d._serialize(a(this),!c)}).get();return this.a.options.serialize(b,f,c)},traverse:function(b){a.each(this.items||[],function(){var c=a.data(this,"subContainers");c&&c.traverse(b)});b(this)},_clearDimensions:function(){this.f=c},_destroy:function(){var b=this;this.target.off(t.start,this.handle);this.el.removeData("sortable");
this.options.drop&&(this.group.containers=a.grep(this.group.containers,function(a){return a!=b}));a.each(this.items||[],function(){a.removeData(this,"subContainers")})}};var u={enable:function(){this.traverse(function(a){a.disabled=!1})},disable:function(){this.traverse(function(a){a.disabled=!0})},serialize:function(){return this._serialize(this.el,!0)},refresh:function(){this.traverse(function(a){a._clearDimensions()})},destroy:function(){this.traverse(function(a){a._destroy()})}};a.extend(p.prototype,
u);a.fn.sortable=function(b){var d=Array.prototype.slice.call(arguments,1);return this.map(function(){var e=a(this),f=e.data("sortable");return f&&u[b]?u[b].apply(f,d)||this:(f||b!==c&&"object"!=typeof b||e.data("sortable",new p(e,b)),this)})}}(jQuery);var u,B,t,y,m;return h[45](function(){r()}),h[14](function(){u||(u=document.importNode(a("#critical-css-files-file")[0].content,!0));B||(B=document.importNode(a("#critical-css-files-auto")[0].content,!0));t||(t=document.importNode(a("#critical-css-files-error")[0].content,
!0));a("#critical-css-files > template").remove();h[15](function(){function b(b){var c=a("#criticalcss_editor select")[0].selectize.getValue();""!==c?(/\?/.test(c)?c+="&":c+="?",D.open(c+"o10n-css=1"+(b?"#editor":""),"o10n-css")):a("#criticalcss_editor select")[0].selectize.open()}function g(){a("#add_critical_css_file_form").show();a("html, body").animate({scrollTop:a("#add_critical_css_file_form").offset().top-200},200)}a("#critical-css-files").sortable({containerSelector:"tbody",itemPath:"",handle:"span.grip",
itemSelector:"tr",placeholder:'<tr class="placeholder"><td colspan="3" style="border-bottom-color:'+h[33]()+'">&nbsp;</td></tr>',onDrop:function(b,c){b.removeClass(c.group.options.draggedClass).removeAttr("style");a("body").removeClass(c.group.options.bodyClass);var d=b.prev(),e=b.next();if(d.length){var g=parseInt(a(".priority input",d).val());isNaN(g)&&(g=1);d=g+1;a(".priority input",b).val(d)}else d=parseInt(a(".priority input",b).val()),isNaN(d)&&(d=1),e.length&&(d=(g=parseInt(a(".priority input",
e).val()))<d&&1<g?g-1:g,a(".priority input",b).val(d));if(e.length&&(g=parseInt(a(".priority input",e).val()),isNaN(g)&&(g=1),g<=d))for(g=d;e.length;)g++,a(".priority input",e).val()<g&&a(".priority input",e).val(g),e=e.next();r(a(".priority input",b))}});a("#add_critical_css_file").on("click",function(){a("#add_critical_css_file_form").toggle(0,function(){a("#add_critical_css_file_form").is(":visible")&&g()})});a("#add_critical_css_file_form .submit .add").on("click",v);a("#add_critical_css_file_form .submit .add-edit").on("click",
v);a("#add_critical_css_file_form input").on("keypress",function(a){"13"==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),v.call(this))});a("#critical-css-files").on("click",".options .delete",I);a("#critical-css-files").on("click","a.conditions",H);a("#critical-css-files").on("change",".priority input",function(){r(a(this))});a("#critical-css-files-empty a.add").on("click",function(){g()});a("#critical_css_conditions_container .cancel").on("click",function(){p()});a("#critical_css_conditions_container .save").on("click",
G);a("#criticalcss_editor .splitview").on("click",function(){b()});a("#criticalcss_editor .editor").on("click",function(){b(!0)})})}),F});