webpackJsonp([43],{"0O+3":function(e,n,t){"use strict";var a=t("+Up5"),r=t.n(a);n.a={name:"x-header",props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},beforeMount:function(){this.$slots["overwrite-title"]&&(this.shouldOverWriteTitle=!0)},computed:{_leftOptions:function(){return r()({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}},data:function(){return{shouldOverWriteTitle:!1}}}},AX0K:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"RunChart"}},[t("XHeader",{attrs:{"left-options":{backText:""}}},[e._v("走势图")]),e._v(" "),t("ul",{staticClass:"runTitle"},[t("li",e._l(e.selectSSC,function(n,a){return t("span",{key:a,class:{select:e.selectNum==a},on:{click:function(n){e.selectClick(a)}}},[e._v(e._s(n.name))])}))]),e._v(" "),t("ul",{staticClass:"runTable"},[t("li",[t("span",[e._v("期数")]),e._v(" "),e._l(e.runDataList[0].issueResult,function(n,a){return t("span",{key:a},[e._v(e._s(a))])})],2),e._v(" "),e._l(e.runDataList,function(n,a){return t("li",{key:a},[t("span",[e._v(e._s(n.issueId))]),e._v(" "),e._l(n.issueResult,function(n,a){return t("span",{key:a},[e._v(e._s(n))])})],2)}),e._v(" "),t("li",[t("span",[e._v("平均遗漏")]),e._v(" "),t("span",[e._v(e._s(e.runDataMap.averageLost[0][1]))])]),e._v(" "),t("li",[t("span",[e._v("最大遗漏")]),e._v(" "),t("span",[e._v(e._s(e.runDataMap.maxLost[0][1]))])])],2),e._v(" "),t("canvas",{attrs:{id:"canvas"}})],1)},r=[],i={render:a,staticRenderFns:r};n.a=i},EXKW:function(e,n,t){n=e.exports=t("BkJT")(!0),n.push([e.i,'.vux-header{position:relative;padding:3px 0;box-sizing:border-box;background-color:#35495e}.vux-header .vux-header-title{line-height:40px;text-align:center;font-size:18px;font-weight:400;color:#fff}.vux-header-title-area,.vux-header .vux-header-title{margin:0 88px;height:40px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vux-header .vux-header-title>span{display:inline-block}.vux-header .vux-header-left,.vux-header .vux-header-right{position:absolute;top:14px;display:block;font-size:14px;line-height:21px;color:#ccc}.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button{float:left;margin-right:8px;color:#ccc}.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active{opacity:.5}.vux-header .vux-header-left{left:18px}.vux-header .vux-header-left .vux-header-back{padding-left:16px}.vux-header .vux-header-left .left-arrow{position:absolute;width:30px;height:30px;top:-5px;left:-5px}.vux-header .vux-header-left .left-arrow:before{content:"";position:absolute;width:12px;height:12px;border:1px solid #ccc;border-width:1px 0 0 1px;-webkit-transform:rotate(315deg);transform:rotate(315deg);top:8px;left:7px}.vux-header .vux-header-right{right:15px}.vux-header .vux-header-right a,.vux-header .vux-header-right button{margin-left:8px;margin-right:0}.vux-header .vux-header-right .vux-header-more:after{content:"\\2022   \\2022   \\2022   ";font-size:16px}.vux-header-fade-in-right-enter-active{-webkit-animation:fadeinR .5s;animation:fadeinR .5s}.vux-header-fade-in-left-enter-active{-webkit-animation:fadeinL .5s;animation:fadeinL .5s}@-webkit-keyframes fadeinR{0%{opacity:0;-webkit-transform:translateX(150px);transform:translateX(150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeinR{0%{opacity:0;-webkit-transform:translateX(150px);transform:translateX(150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes fadeinL{0%{opacity:0;-webkit-transform:translateX(-150px);transform:translateX(-150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeinL{0%{opacity:0;-webkit-transform:translateX(-150px);transform:translateX(-150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}',"",{version:3,sources:["F:/Git/xm/node_modules/_vux@2.7.4@vux/src/components/x-header/index.vue"],names:[],mappings:"AAgHA,YACE,kBAAmB,AACnB,cAAe,AACf,sBAAuB,AACvB,wBAA0B,CAC3B,AACD,8BACE,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,UAAY,CACb,AACD,qDAEE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,gBAAiB,AACjB,uBAAwB,AACxB,kBAAoB,CACrB,AACD,mCACE,oBAAsB,CACvB,AACD,2DAEE,kBAAmB,AACnB,SAAU,AACV,cAAe,AACf,eAAgB,AAChB,iBAAkB,AAClB,UAAY,CACb,AACD,wIAIE,WAAY,AACZ,iBAAkB,AAClB,UAAY,CACb,AACD,oKAIE,UAAa,CACd,AACD,6BACE,SAAW,CACZ,AACD,8CACE,iBAAmB,CACpB,AACD,yCACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,SAAU,AACV,SAAW,CACZ,AACD,gDACE,WAAY,AACZ,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,sBAAuB,AACvB,yBAA0B,AAC1B,iCAAkC,AAC1B,yBAA0B,AAClC,QAAS,AACT,QAAU,CACX,AACD,8BACE,UAAY,CACb,AACD,qEAEE,gBAAiB,AACjB,cAAgB,CACjB,AACD,qDACE,mCAA0C,AAC1C,cAAgB,CACjB,AACD,uCACE,8BAA+B,AACvB,qBAAuB,CAChC,AACD,sCACE,8BAA+B,AACvB,qBAAuB,CAChC,AACD,2BACA,GACI,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACxC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,mBACA,GACI,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACxC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,2BACA,GACI,UAAW,AACX,qCAAsC,AAC9B,4BAA8B,CACzC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,mBACA,GACI,UAAW,AACX,qCAAsC,AAC9B,4BAA8B,CACzC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA",file:"index.vue",sourcesContent:['/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n/**\n* loadmore\n*/\n.vux-header {\n  position: relative;\n  padding: 3px 0;\n  box-sizing: border-box;\n  background-color: #35495e;\n}\n.vux-header .vux-header-title {\n  line-height: 40px;\n  text-align: center;\n  font-size: 18px;\n  font-weight: 400;\n  color: #fff;\n}\n.vux-header-title-area,\n.vux-header .vux-header-title {\n  margin: 0 88px;\n  height: 40px;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.vux-header .vux-header-title > span {\n  display: inline-block;\n}\n.vux-header .vux-header-left,\n.vux-header .vux-header-right {\n  position: absolute;\n  top: 14px;\n  display: block;\n  font-size: 14px;\n  line-height: 21px;\n  color: #ccc;\n}\n.vux-header .vux-header-left a,\n.vux-header .vux-header-left button,\n.vux-header .vux-header-right a,\n.vux-header .vux-header-right button {\n  float: left;\n  margin-right: 8px;\n  color: #ccc;\n}\n.vux-header .vux-header-left a:active,\n.vux-header .vux-header-left button:active,\n.vux-header .vux-header-right a:active,\n.vux-header .vux-header-right button:active {\n  opacity: 0.5;\n}\n.vux-header .vux-header-left {\n  left: 18px;\n}\n.vux-header .vux-header-left .vux-header-back {\n  padding-left: 16px;\n}\n.vux-header .vux-header-left .left-arrow {\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  top: -5px;\n  left: -5px;\n}\n.vux-header .vux-header-left .left-arrow:before {\n  content: "";\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  border: 1px solid #ccc;\n  border-width: 1px 0 0 1px;\n  -webkit-transform: rotate(315deg);\n          transform: rotate(315deg);\n  top: 8px;\n  left: 7px;\n}\n.vux-header .vux-header-right {\n  right: 15px;\n}\n.vux-header .vux-header-right a,\n.vux-header .vux-header-right button {\n  margin-left: 8px;\n  margin-right: 0;\n}\n.vux-header .vux-header-right .vux-header-more:after {\n  content: "\\2022\\0020\\2022\\0020\\2022\\0020";\n  font-size: 16px;\n}\n.vux-header-fade-in-right-enter-active {\n  -webkit-animation: fadeinR .5s;\n          animation: fadeinR .5s;\n}\n.vux-header-fade-in-left-enter-active {\n  -webkit-animation: fadeinL .5s;\n          animation: fadeinL .5s;\n}\n@-webkit-keyframes fadeinR {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(150px);\n            transform: translateX(150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@keyframes fadeinR {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(150px);\n            transform: translateX(150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@-webkit-keyframes fadeinL {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(-150px);\n            transform: translateX(-150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@keyframes fadeinL {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(-150px);\n            transform: translateX(-150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n'],sourceRoot:""}])},MbWt:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"vux-header"},[t("div",{staticClass:"vux-header-left"},[e._t("overwrite-left",[t("transition",{attrs:{name:e.transition}},[t("a",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(n){if(!("button"in n)&&e._k(n.keyCode,"preventDefault",void 0,n.key))return null},e.onClickBack]}},[e._v(e._s(void 0===e._leftOptions.backText?"返回":e._leftOptions.backText))])]),e._v(" "),t("transition",{attrs:{name:e.transition}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:e.onClickBack}})])]),e._v(" "),e._t("left")],2),e._v(" "),e.shouldOverWriteTitle?e._e():t("h1",{staticClass:"vux-header-title",on:{click:function(n){e.$emit("on-click-title")}}},[e._t("default",[t("transition",{attrs:{name:e.transition}},[t("span",{directives:[{name:"show",rawName:"v-show",value:e.title,expression:"title"}]},[e._v(e._s(e.title))])])])],2),e._v(" "),e.shouldOverWriteTitle?t("div",{staticClass:"vux-header-title-area"},[e._t("overwrite-title")],2):e._e(),e._v(" "),t("div",{staticClass:"vux-header-right"},[e.rightOptions.showMore?t("a",{staticClass:"vux-header-more",on:{click:[function(n){if(!("button"in n)&&e._k(n.keyCode,"preventDefault",void 0,n.key))return null},function(n){e.$emit("on-click-more")}]}}):e._e(),e._v(" "),e._t("right")],2)])},r=[],i={render:a,staticRenderFns:r};n.a=i},WD9h:function(e,n,t){var a=t("g5Vc");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("8bSs")("6396f34d",a,!0)},dTCN:function(e,n,t){"use strict";function a(e){t("uf3h")}var r=t("0O+3"),i=t("MbWt"),A=t("/Xao"),o=a,s=A(r.a,i.a,!1,o,null,null);n.a=s.exports},g5Vc:function(e,n,t){n=e.exports=t("BkJT")(!0),n.push([e.i,"#RunChart{color:#fff}#RunChart .runTitle li{display:-webkit-box;display:flex;display:-webkit-flex;-webkit-justify-content:space-around;justify-content:space-around;text-align:center;height:1rem;line-height:.6rem}#RunChart .runTitle li span{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:.6rem;margin:.2rem .15rem;font-size:.32rem;background:#2e2525;border-radius:.2rem}#RunChart .runTitle li span.select{background:#745b0c;border-radius:.2rem}#RunChart .runTable li{display:-webkit-box;display:flex;display:-webkit-flex;text-align:center;line-height:.8rem;font-size:.28rem}#RunChart .runTable li:nth-of-type(2n-1){background:rgba(88,78,73,.555)}#RunChart .runTable li:nth-of-type(2n){background:rgba(36,33,31,.555)}#RunChart .runTable li:first-of-type{border-top:1px solid #9c7b1e;background:rgba(116,50,19,.555)}#RunChart .runTable li span{-webkit-box-flex:1;-webkit-flex:1;flex:1;border-bottom:1px solid #9c7b1e;border-right:1px solid #9c7b1e}#RunChart .runTable li span:first-of-type{-webkit-box-flex:3;-webkit-flex:3;flex:3}","",{version:3,sources:["F:/Git/xm/src/page/RunChart/RunChart.vue"],names:[],mappings:"AACA,UACE,UAAY,CACb,AACD,uBACE,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AACtB,qCAAsC,AAC9B,6BAA8B,AACtC,kBAAmB,AACnB,YAAa,AACb,iBAAmB,CACpB,AACD,4BACE,mBAAoB,AACpB,eAAgB,AACR,OAAQ,AAChB,aAAc,AACd,oBAAqB,AACrB,iBAAkB,AAClB,mBAAoB,AACpB,mBAAqB,CACtB,AACD,mCACE,mBAAoB,AACpB,mBAAqB,CACtB,AACD,uBACE,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AACtB,kBAAmB,AACnB,kBAAmB,AACnB,gBAAkB,CACnB,AACD,yCACE,8BAAoC,CACrC,AACD,uCACE,8BAAoC,CACrC,AACD,qCACE,6BAA8B,AAC9B,+BAAqC,CACtC,AACD,4BACE,mBAAoB,AACpB,eAAgB,AACR,OAAQ,AAChB,gCAAiC,AACjC,8BAAgC,CACjC,AACD,0CACE,mBAAoB,AACpB,eAAgB,AACR,MAAQ,CACjB",file:"RunChart.vue",sourcesContent:["\n#RunChart {\n  color: #fff;\n}\n#RunChart .runTitle li {\n  display: -webkit-box;\n  display: flex;\n  display: -webkit-flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  text-align: center;\n  height: 1rem;\n  line-height: .6rem;\n}\n#RunChart .runTitle li span {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  height: .6rem;\n  margin: .2rem .15rem;\n  font-size: .32rem;\n  background: #2e2525;\n  border-radius: .2rem;\n}\n#RunChart .runTitle li span.select {\n  background: #745b0c;\n  border-radius: .2rem;\n}\n#RunChart .runTable li {\n  display: -webkit-box;\n  display: flex;\n  display: -webkit-flex;\n  text-align: center;\n  line-height: .8rem;\n  font-size: .28rem;\n}\n#RunChart .runTable li:nth-of-type(2n-1) {\n  background: rgba(88, 78, 73, 0.555);\n}\n#RunChart .runTable li:nth-of-type(2n) {\n  background: rgba(36, 33, 31, 0.555);\n}\n#RunChart .runTable li:nth-of-type(1) {\n  border-top: 1px solid #9c7b1e;\n  background: rgba(116, 50, 19, 0.555);\n}\n#RunChart .runTable li span {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  border-bottom: 1px solid #9c7b1e;\n  border-right: 1px solid #9c7b1e;\n}\n#RunChart .runTable li span:nth-of-type(1) {\n  -webkit-box-flex: 3;\n  -webkit-flex: 3;\n          flex: 3;\n}\n"],sourceRoot:""}])},qcmg:function(e,n,t){"use strict";function a(e){t("WD9h")}Object.defineProperty(n,"__esModule",{value:!0});var r=t("rZlP"),i=t("AX0K"),A=t("/Xao"),o=a,s=A(r.a,i.a,!1,o,null,null);n.default=s.exports},rZlP:function(e,n,t){"use strict";var a=t("lC5x"),r=t.n(a),i=t("J0Oq"),A=t.n(i),o=t("dTCN");n.a={name:"RunChart",components:{XHeader:o.a},data:function(){return{countSize:10,selectSSC:[{name:"万",value:""},{name:"千",value:""},{name:"百",value:""},{name:"十",value:""},{name:"个",value:""}],selectPK10:[{name:"一位",value:""},{name:"两位",value:""},{name:"三位",value:""},{name:"四位",value:""},{name:"五位",value:""},{name:"六位",value:""},{name:"七位",value:""},{name:"八位",value:""},{name:"九位",value:""},{name:"十位",value:""}],selectKS:[{name:"百",value:""},{name:"十",value:""},{name:"个",value:""}],select11S5:[{name:"第一位",value:""},{name:"第二位",value:""},{name:"第三位",value:""},{name:"第四位",value:""},{name:"第五位",value:""}],runDataList:[],runDataMap:{},selectNum:0,context:{}}},created:function(){this.getRunData(),this.lineNum()},mounted:function(){var e=document.querySelector("#canvas");this.context=e.getContext("2d")},methods:{getRunData:function(){var e=this;return A()(r.a.mark(function n(){var t;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$http("/queryGameLostForGameType",{body:{countSize:e.countSize,gameType:"CQSSC",issueId:20171009061}});case 2:t=n.sent,e.runDataList=t.returnList,e.runDataMap=t.returnMap,console.dir(runDataMap);case 6:case"end":return n.stop()}},n,e)}))()},selectClick:function(e){this.selectNum=e},lineNum:function(){for(var e="",n=1;n<11;n++)e+="T"+n+"_"+Math.floor(1+10*Math.random())+",";e=e.substring(0,e.length-1),CreateLine(e,20,"#ff6600","canvas","#d5d5d5")},CreateLine:function(e,n,t,a,r){for(var i=e.split(","),A=i.length-1;A>0;A--){var o=$("#"+i[A]),s=$("#"+i[A-1]),l=s.outerWidth(),u=s.outerHeight(),C=s.offset(),c=C.top,d=C.left,h=o.offset(),f=h.top,p=h.left,x=Math.min(d,p),v=Math.min(c,f);o.css("background",r).css("color","red"),s.css("background",r).css("color","red");var B=document.createElement("canvas");B.width=Math.abs(d-p)<n?n:Math.abs(d-p),B.height=Math.abs(c-f),B.style.top=v+parseInt(u/2)+"px",B.style.left=x+parseInt(l/2)+"px",B.style.position="absolute";var b=B.getContext("2d");b.save(),b.strokeStyle=t,b.lineWidth=1,b.lineJoin="round",b.beginPath(),b.moveTo(d-x,c-v),b.lineTo(p-x,f-v),b.closePath(),b.stroke(),b.restore(),$("#"+a).append(B)}}}}},uf3h:function(e,n,t){var a=t("EXKW");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("8bSs")("9d918118",a,!0)}});
//# sourceMappingURL=43.7204cd1a41e5ad8fc5a6.js.map