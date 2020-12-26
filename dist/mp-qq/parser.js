"use strict";function t(t){for(var i=Object.create(null),s=t.split(","),e=s.length;e--;)i[s[e]]=!0;return i}function i(t,i){for(var s=t.indexOf("&");-1!=s;){var e=t.indexOf(";",s+3),n=void 0;if(-1==e)break;"#"==t[s+1]?(n=parseInt(("x"==t[s+2]?"0":"")+t.substring(s+2,e)),isNaN(n)||(t=t.substr(0,s)+String.fromCharCode(n)+t.substr(e+1))):(n=t.substring(s+1,e),(a.entities[n]||"amp"==n&&i)&&(t=t.substr(0,s)+(a.entities[n]||"&")+t.substr(e+1))),s=t.indexOf("&",s+1)}return t}function s(t){this.options=t.data||{},this.tagStyle=Object.assign(a.tagStyle,this.options.tagStyle),this.imgList=t.imgList||[],this.plugins=t.plugins||[],this.attrs=Object.create(null),this.stack=[],this.nodes=[]}function e(t){this.handler=t}var a={trustTags:t("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),blockTags:t("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),ignoreTags:t("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),voidTags:t("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),entities:{lt:"<",gt:">",quot:'"',apos:"'",ensp:" ",emsp:" ",nbsp:" ",semi:";",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…"},tagStyle:{address:"font-style:italic",big:"display:inline;font-size:1.2em",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",u:"text-decoration:underline"}},n=qq.getSystemInfoSync().windowWidth,r=t(" ,\r,\n,\t,\f"),o=0;s.prototype.parse=function(t){for(var i=this.plugins.length;i--;)this.plugins[i].onUpdate&&(t=this.plugins[i].onUpdate(t,a)||t);for(new e(this).parse(t);this.stack.length;)this.popNode();return this.nodes},s.prototype.expose=function(){for(var t=this.stack.length;t--;){var i=this.stack[t];if("a"==i.name||i.c)return;i.c=1}},s.prototype.hook=function(t){for(var i=this.plugins.length;i--;)if(this.plugins[i].onParse&&0==this.plugins[i].onParse(t,this))return!1;return!0},s.prototype.getUrl=function(t){var i=this.options.domain;return i&&i.includes("://")&&("/"==t[0]?t="/"==t[1]?i.split("://")[0]+":"+t:i+t:t.includes("data:")||t.includes("://")||(t=i+"/"+t)),t},s.prototype.parseStyle=function(t){var i=t.attrs,s=(this.tagStyle[t.name]||"").split(";").concat((i.style||"").split(";")),e={},a="";i.id&&(this.options.useAnchor?this.expose():"img"!=t.name&&"a"!=t.name&&"video"!=t.name&&"audio"!=t.name&&(i.id=void 0)),i.width&&(e.width=parseFloat(i.width)+(i.width.includes("%")?"%":"px"),i.width=void 0),i.height&&(e.height=parseFloat(i.height)+(i.height.includes("%")?"%":"px"),i.height=void 0);for(var o=0,h=s.length;o<h;o++){var l=s[o].split(":");if(!(l.length<2)){var c=l.shift().trim().toLowerCase(),d=l.join(":").trim();if("-"==d[0]&&d.lastIndexOf("-")>0||d.includes("safe"))a+=";".concat(c,":").concat(d);else if(!e[c]||d.includes("import")||!e[c].includes("import")){if(d.includes("url")){var p=d.indexOf("(")+1;if(p){for(;'"'==d[p]||"'"==d[p]||r[d[p]];)p++;d=d.substr(0,p)+this.getUrl(d.substr(p))}}else d.includes("rpx")&&(d=d.replace(/[0-9.]+\s*rpx/g,function(t){return parseFloat(t)*n/750+"px"}));e[c]=d}}}return t.attrs.style=a,e},s.prototype.onTagName=function(t){this.tagName=this.xml?t:t.toLowerCase(),"svg"==this.tagName&&(this.xml=!0)},s.prototype.onAttrName=function(t){t=this.xml?t:t.toLowerCase(),"data-"==t.substr(0,5)?"data-src"==t?this.attrName="src":"img"==this.tagName||"a"==this.tagName?this.attrName=t:this.attrName=void 0:(this.attrName=t,this.attrs[t]="T")},s.prototype.onAttrVal=function(t){var s=this.attrName||"";"style"==s||"href"==s?this.attrs[s]=i(t,!0):s.includes("src")?this.attrs[s]=this.getUrl(i(t,!0)):s&&(this.attrs[s]=t)},s.prototype.onOpenTag=function(t){var i=Object.create(null);i.name=this.tagName,i.attrs=this.attrs,this.attrs=Object.create(null);var s=i.attrs,e=this.stack[this.stack.length-1],r=e?e.children:this.nodes,h=this.xml?t:a.voidTags[i.name];if("embed"==i.name){var l=s.src||"";l.includes(".mp4")||l.includes(".3gp")||l.includes(".m3u8")||(s.type||"").includes("video")?i.name="video":(l.includes(".mp3")||l.includes(".wav")||l.includes(".aac")||l.includes(".m4a")||(s.type||"").includes("audio"))&&(i.name="audio"),s.autostart&&(s.autoplay="T"),s.controls="T"}if("video"!=i.name&&"audio"!=i.name||("video"!=i.name||s.id||(s.id="v"+o++),s.controls||s.autoplay||(s.controls="T"),i.src=[],s.src&&(i.src.push(s.src),s.src=void 0),this.expose()),h){if(!this.hook(i)||a.ignoreTags[i.name])return void("base"!=i.name||this.options.domain?"source"==i.name&&e&&("video"==e.name||"audio"==e.name)&&s.src&&e.src.push(s.src):this.options.domain=s.href);var c=this.parseStyle(i);if("img"==i.name){if(s.src&&(s.src.includes("webp")&&(i.webp="T"),s.src.includes("data:")&&!s["original-src"]&&(s.ignore="T"),!s.ignore||i.webp||s.src.includes("cloud://"))){var d;for(d=this.stack.length;d--;){var p=this.stack[d];if("a"==p.name||"table"==p.name)break;var u=p.attrs.style||"";if(!u.includes("flex:")||c.width&&c.width.includes("%"))if(u.includes("flex")&&"100%"==c.width)for(var g=d+1;g<this.stack.length;g++){var f=this.stack[g].attrs.style||"";if(!f.includes(";width")&&!f.includes(" width")&&0!=f.indexOf("width")){c.width="";break}}else u.includes("inline-block")&&(c.width&&"%"==c.width[c.width.length-1]?(p.attrs.style+=";max-width:"+c.width,c.width=""):p.attrs.style+=";max-width:100%");else{c.width="100% !important",c.height="";for(var m=d+1;m<this.stack.length;m++)this.stack[m].attrs.style=(this.stack[m].attrs.style||"").replace("inline-","")}p.c=1}if(-1==d){i.i=this.imgList.length;var v=s["original-src"]||s.src;if(this.imgList.includes(v)){var y=v.indexOf("://");if(-1!=y){y+=3;for(var b=v.substr(0,y);y<v.length&&"/"!=v[y];y++)b+=Math.random()>.5?v[y].toUpperCase():v[y];b+=v.substr(y),v=b}}this.imgList.push(v)}else s.ignore="T"}"inline"==c.display&&(c.display=""),s.ignore&&(c["max-width"]="100%",s.style+=";-webkit-touch-callout:none"),parseInt(c.width)>n&&(c.height=void 0),c.width&&(c.width.includes("auto")?c.width="":(i.w="T",c.height&&!c.height.includes("auto")&&(i.h="T")))}else if("svg"==i.name)return r.push(i),this.stack.push(i),void this.popNode();for(var x in c)c[x]&&(s.style+=";".concat(x,":").concat(c[x].replace(" !important","")));s.style=s.style.substr(1)||void 0}else("pre"==i.name||(s.style||"").includes("white-space")&&s.style.includes("pre"))&&(this.pre=i.pre=!0),"video"!=i.name&&"audio"!=i.name&&(i.children=[]),this.stack.push(i);r.push(i)},s.prototype.onCloseTag=function(t){t=this.xml?t:t.toLowerCase();var i;for(i=this.stack.length;i--&&this.stack[i].name!=t;);if(-1!=i)for(;this.stack.length>i;)this.popNode();else if("p"==t||"br"==t){var s=this.stack.length?this.stack[this.stack.length-1].children:this.nodes;s.push({name:t,attrs:{}})}},s.prototype.popNode=function(){var t=this.stack.pop(),i=t.attrs,s=t.children,e=this.stack[this.stack.length-1],r=e?e.children:this.nodes;if(!this.hook(t)||a.ignoreTags[t.name])return"title"==t.name&&s.length&&"text"==s[0].type&&this.options.setTitle&&qq.setNavigationBarTitle({title:s[0].text}),void r.pop();if(t.pre){t.pre=this.pre=void 0;for(var o=this.stack.length;o--;)this.stack[o].pre&&(this.pre=!0)}if("svg"==t.name){var h="",l=i.style;return i.style="",i.viewbox&&(i.viewBox=i.viewbox),i.xmlns="http://www.w3.org/2000/svg",function t(i){h+="<"+i.name;for(var s in i.attrs){var e=i.attrs[s];e&&(h+=" ".concat(s,'="').concat(e,'"'))}if(i.children){h+=">";for(var a=0;a<i.children.length;a++)t(i.children[a]);h+="</"+i.name+">"}else h+="/>"}(t),t.name="img",t.attrs={src:"data:image/svg+xml;utf8,"+h.replace(/#/g,"%23"),style:l,ignore:"T"},t.children=void 0,void(this.xml=!1)}var c={};if(i.align&&("table"==t.name?"center"==i.align?c["margin-inline-start"]=c["margin-inline-end"]="auto":c.float=i.align:c["text-align"]=i.align,i.align=void 0),"font"==t.name&&(i.color&&(c.color=i.color,i.color=void 0),i.face&&(c["font-family"]=i.face,i.face=void 0),i.size)){var d=parseInt(i.size);isNaN(d)||(d<1?d=1:d>7&&(d=7),c["font-size"]=["xx-small","x-small","small","medium","large","x-large","xx-large"][d-1]),i.size=void 0}if((i.class||"").includes("align-center")&&(c["text-align"]="center"),Object.assign(c,this.parseStyle(t)),parseInt(c.width)>n&&(c["max-width"]="100%"),a.blockTags[t.name])t.name="div";else if(a.trustTags[t.name]||this.xml)if("a"==t.name||"ad"==t.name)this.expose();else if("ul"!=t.name&&"ol"!=t.name||!t.c){if("table"==t.name){var p=parseFloat(i.cellpadding),u=parseFloat(i.cellspacing),g=parseFloat(i.border);if(t.c&&(isNaN(p)&&(p=2),isNaN(u)&&(u=2)),g&&!c.border&&(c.border=g+"px solid gray"),t.flag&&t.c){t.flag=void 0,c.display="grid",u?i.style+=";grid-gap"+u+"px;padding:"+u+"px":g&&(i.style+=";border-left:0;border-top:0");var f,m=1,v=1,y=[],b=[],x={};!function t(i){for(var s=0;s<i.length;s++)"tr"==i[s].name?y.push(i[s]):t(i[s].children||[])}(s);for(var w=0;w<y.length;w++){for(var k=0;k<y[w].children.length;k++){var N=y[w].children[k];if("td"==N.name||"th"==N.name){for(;x[m+"."+v];)v++;if(N.c=1,N.attrs.style=(N.attrs.style||"")+(g?";border:".concat(g,"px solid gray")+(u?"":";border-right:0;border-bottom:0"):"")+(p?";padding:".concat(p,"px"):""),N.attrs.colspan&&(N.attrs.style+=";grid-column-start:".concat(v,";grid-column-end:").concat(v+parseInt(N.attrs.colspan)),N.attrs.rowspan||(N.attrs.style+=";grid-row-start:".concat(m,";grid-row-end:").concat(m+1)),v+=parseInt(N.attrs.colspan)-1),N.attrs.rowspan){N.attrs.style+=";grid-row-start:".concat(m,";grid-row-end:").concat(m+parseInt(N.attrs.rowspan)),N.attrs.colspan||(N.attrs.style+=";grid-column-start:".concat(v,";grid-column-end:").concat(v+1));for(var T=1;T<N.attrs.rowspan;T++)x[m+T+"."+v]=1}b.push(N),v++}}f||(f=v-1,i.style+=";grid-template-columns:repeat(".concat(f,",auto)")),v=1,m++}t.children=b}else t.c&&(c.display="table"),isNaN(u)||(c["border-spacing"]=u+"px"),(g||p||t.c)&&function i(s){for(var e=0;e<s.length;e++){var a=s[e];"text"!=a.type&&(t.c&&(a.c=1),"th"==a.name||"td"==a.name?(g&&(a.attrs.style="border:".concat(g,"px solid gray;").concat(a.attrs.style||"")),p&&(a.attrs.style="padding:".concat(p,"px;").concat(a.attrs.style||""))):i(a.children||[]))}}(s);if(this.options.scrollTable&&!(i.style||"").includes("inline")){var O=Object.assign({},t);t.name="div",t.attrs={style:"overflow-x:auto;padding:1px"},t.children=[O],i=O.attrs}}else if("td"!=t.name&&"th"!=t.name||!i.colspan&&!i.rowspan){if("ruby"==t.name){t.name="span";for(var C=0;C<s.length-1;C++)"text"==s[C].type&&"rt"==s[C+1].name&&(s[C]={name:"span",attrs:{style:"display:inline-block"},children:[{name:"div",attrs:{style:"font-size:50%;text-align:start"},children:s[C+1].children},s[C]]},s.splice(C+1,1))}}else for(var A=this.stack.length;A--;)if("table"==this.stack[A].name){this.stack[A].flag=1;break}}else{var S={a:"lower-alpha",A:"upper-alpha",i:"lower-roman",I:"upper-roman"};S[i.type]&&(i.style+=";list-style-type:"+S[i.type],i.type=void 0),t.c=1;for(var I=s.length;I--;)"li"==s[I].name&&(s[I].c=1)}else t.name="span";if((c.display||"").includes("flex")&&!t.c)for(var j=s.length;j--;){var z=s[j];z.f&&(z.attrs.style=(z.attrs.style||"")+z.f,z.f=void 0)}var L=e&&(e.attrs.style||"").includes("flex")&&!t.c;L&&(t.f=";max-width:100%");for(var q in c)if(c[q]){var F=";".concat(q,":").concat(c[q].replace(" !important",""));L&&(q.includes("flex")&&"flex-direction"!=q||"-"==c[q][0])?t.f+=F:i.style+=F}i.style=i.style.substr(1)||void 0},s.prototype.onText=function(t){if(!this.pre){for(var s,e="",a=0,n=t.length;a<n;a++)r[t[a]]?(" "!=e[e.length-1]&&(e+=" "),"\n"!=t[a]||s||(s=!0)):e+=t[a];if(" "==e&&s)return;t=e}var o=Object.create(null);if(o.type="text",o.text=i(t),this.hook(o)){(this.stack.length?this.stack[this.stack.length-1].children:this.nodes).push(o)}},e.prototype.parse=function(t){this.content=t||"",this.i=0,this.start=0,this.state=this.text;for(var i=this.content.length;-1!=this.i&&this.i<i;)this.state()},e.prototype.checkClose=function(t){var i="/"==this.content[this.i];return!!(">"==this.content[this.i]||i&&">"==this.content[this.i+1])&&(t&&this.handler[t](this.content.substring(this.start,this.i)),this.i+=i?2:1,this.start=this.i,this.handler.onOpenTag(i),this.state=this.text,!0)},e.prototype.text=function(){if(this.i=this.content.indexOf("<",this.i),-1==this.i)return void(this.start<this.content.length&&this.handler.onText(this.content.substring(this.start,this.content.length)));var t=this.content[this.i+1];if(t>="a"&&t<="z"||t>="A"&&t<="Z")this.start!=this.i&&this.handler.onText(this.content.substring(this.start,this.i)),this.start=++this.i,this.state=this.tagName;else if("/"==t||"!"==t||"?"==t){this.start!=this.i&&this.handler.onText(this.content.substring(this.start,this.i));var i=this.content[this.i+2];if("/"==t&&(i>="a"&&i<="z"||i>="A"&&i<="Z"))return this.i+=2,this.start=this.i,void(this.state=this.endTag);var s="--\x3e";"!"==t&&"-"==this.content[this.i+2]&&"-"==this.content[this.i+3]||(s=">"),this.i=this.content.indexOf(s,this.i),-1!=this.i&&(this.i+=s.length,this.start=this.i)}else this.i++},e.prototype.tagName=function(){if(r[this.content[this.i]]){for(this.handler.onTagName(this.content.substring(this.start,this.i));r[this.content[++this.i]];);this.i<this.content.length&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)}else this.checkClose("onTagName")||this.i++},e.prototype.attrName=function(){var t=this.content[this.i];if(r[t]||"="==t){this.handler.onAttrName(this.content.substring(this.start,this.i));for(var i="="==t,s=this.content.length;++this.i<s;)if(t=this.content[this.i],!r[t]){if(this.checkClose())return;if(i)return this.start=this.i,void(this.state=this.attrVal);if("="!=this.content[this.i])return this.start=this.i,void(this.state=this.attrName);i=!0}}else this.checkClose("onAttrName")||this.i++},e.prototype.attrVal=function(){var t=this.content[this.i],i=this.content.length;if('"'==t||"'"==t){if(this.start=++this.i,this.i=this.content.indexOf(t,this.i),-1==this.i)return;this.handler.onAttrVal(this.content.substring(this.start,this.i))}else for(;this.i<i;this.i++){if(r[this.content[this.i]]){this.handler.onAttrVal(this.content.substring(this.start,this.i));break}if(this.checkClose("onAttrVal"))return}for(;r[this.content[++this.i]];);this.i<i&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)},e.prototype.endTag=function(){var t=this.content[this.i];if(r[t]||">"==t||"/"==t){if(this.handler.onCloseTag(this.content.substring(this.start,this.i)),">"!=t&&(this.i=this.content.indexOf(">",this.i),-1==this.i))return;this.start=++this.i,this.state=this.text}else this.i++},module.exports=s;