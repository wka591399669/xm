webpackJsonp([27],{"/KGA":function(t,e,n){var a=n("N0ZI");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("8bSs")("df21030e",a,!0)},"3Ghf":function(t,e,n){t.exports=n.p+"static/img/5isget.9d42d5b.png"},"6QG3":function(t,e,n){t.exports=n.p+"static/img/activity5Bg.036f60b.png"},B4j3:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-header"},[n("div",{staticClass:"vux-header-left"},[t._t("overwrite-left",[n("transition",{attrs:{name:t.transition}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault",void 0,e.key))return null},t.onClickBack]}},[t._v(t._s(void 0===t._leftOptions.backText?"返回":t._leftOptions.backText))])]),t._v(" "),n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:t.onClickBack}})])]),t._v(" "),t._t("left")],2),t._v(" "),t.shouldOverWriteTitle?t._e():n("h1",{staticClass:"vux-header-title",on:{click:function(e){t.$emit("on-click-title")}}},[t._t("default",[n("transition",{attrs:{name:t.transition}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.title,expression:"title"}]},[t._v(t._s(t.title))])])])],2),t._v(" "),t.shouldOverWriteTitle?n("div",{staticClass:"vux-header-title-area"},[t._t("overwrite-title")],2):t._e(),t._v(" "),n("div",{staticClass:"vux-header-right"},[t.rightOptions.showMore?n("a",{staticClass:"vux-header-more",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault",void 0,e.key))return null},function(e){t.$emit("on-click-more")}]}}):t._e(),t._v(" "),t._t("right")],2)])},i=[],r={render:a,staticRenderFns:i};e.a=r},N0ZI:function(t,e,n){e=t.exports=n("BkJT")(!0),e.push([t.i,"#ActivityCon5[data-v-74c49469]{width:100%;padding:0;margin:0;background-color:#fff;position:relative}#ActivityCon5>img[data-v-74c49469]{position:absolute;top:0;left:0;width:100%;display:block}#ActivityCon5 .main[data-v-74c49469]{position:relative;padding-top:5.85rem}#ActivityCon5 .btn[data-v-74c49469]{width:6.23rem;margin:0 auto;display:block}#ActivityCon5 ul[data-v-74c49469]{width:4.73rem;margin:0 auto;border:1px solid #564222}#ActivityCon5 ul li[data-v-74c49469]{border-bottom:1px solid #564222;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex}#ActivityCon5 ul li[data-v-74c49469]:last-child{border:none}#ActivityCon5 ul li span[data-v-74c49469]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;color:#564222;font-size:.24rem;line-height:.6rem}#ActivityCon5 ul li span[data-v-74c49469]:first-child{border-right:1px solid #564222}#ActivityCon5 .info[data-v-74c49469]{margin:0 .3rem;margin-top:.58rem;padding:.3rem;background-color:#f4f0ea;box-shadow:0 0 .17rem 0 rgba(179,147,96,.24)}#ActivityCon5 .info p[data-v-74c49469]{font-size:.24rem;color:#564222;line-height:.5rem}#ActivityCon5 .info p[data-v-74c49469]:first-child{font-size:.26rem;color:#000}","",{version:3,sources:["/Users/hongyuanqi/workspace/xmcp/xm/src/page/Activity/ActivityCon5.vue"],names:[],mappings:"AACA,+BACE,WAAY,AACZ,UAAW,AACX,SAAU,AACV,sBAAuB,AACvB,iBAAmB,CACpB,AACD,mCACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,aAAe,CAChB,AACD,qCACE,kBAAmB,AACnB,mBAAqB,CACtB,AACD,oCACE,cAAe,AACf,cAAe,AACf,aAAe,CAChB,AACD,kCACE,cAAe,AACf,cAAe,AACf,wBAA0B,CAC3B,AACD,qCACE,gCAAiC,AACjC,gBAAiB,AACjB,oBAAqB,AACrB,qBAAsB,AACtB,YAAc,CACf,AACD,gDACE,WAAa,CACd,AACD,0CACE,mBAAoB,AACpB,eAAgB,AACR,OAAQ,AAChB,kBAAmB,AACnB,cAAe,AACf,iBAAmB,AACnB,iBAAoB,CACrB,AACD,sDACE,8BAAgC,CACjC,AACD,qCACE,eAAiB,AACjB,kBAAoB,AACpB,cAAgB,AAChB,yBAA0B,AAC1B,4CAAyD,CAC1D,AACD,uCACE,iBAAmB,AACnB,cAAe,AACf,iBAAoB,CACrB,AACD,mDACE,iBAAmB,AACnB,UAAY,CACb",file:"ActivityCon5.vue",sourcesContent:["\n#ActivityCon5[data-v-74c49469] {\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  background-color: #fff;\n  position: relative;\n}\n#ActivityCon5 > img[data-v-74c49469] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  display: block;\n}\n#ActivityCon5 .main[data-v-74c49469] {\n  position: relative;\n  padding-top: 5.85rem;\n}\n#ActivityCon5 .btn[data-v-74c49469] {\n  width: 6.23rem;\n  margin: 0 auto;\n  display: block;\n}\n#ActivityCon5 ul[data-v-74c49469] {\n  width: 4.73rem;\n  margin: 0 auto;\n  border: 1px solid #564222;\n}\n#ActivityCon5 ul li[data-v-74c49469] {\n  border-bottom: 1px solid #564222;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n#ActivityCon5 ul li[data-v-74c49469]:nth-last-child(1) {\n  border: none;\n}\n#ActivityCon5 ul li span[data-v-74c49469] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  text-align: center;\n  color: #564222;\n  font-size: 0.24rem;\n  line-height: 0.6rem;\n}\n#ActivityCon5 ul li span[data-v-74c49469]:nth-child(1) {\n  border-right: 1px solid #564222;\n}\n#ActivityCon5 .info[data-v-74c49469] {\n  margin: 0 0.3rem;\n  margin-top: 0.58rem;\n  padding: 0.3rem;\n  background-color: #f4f0ea;\n  box-shadow: 0px 0px 0.17rem 0px rgba(179, 147, 96, 0.24);\n}\n#ActivityCon5 .info p[data-v-74c49469] {\n  font-size: 0.24rem;\n  color: #564222;\n  line-height: 0.5rem;\n}\n#ActivityCon5 .info p[data-v-74c49469]:nth-child(1) {\n  font-size: 0.26rem;\n  color: #000;\n}\n"],sourceRoot:""}])},OG4R:function(t,e,n){e=t.exports=n("BkJT")(!0),e.push([t.i,'.vux-header{position:relative;padding:3px 0;box-sizing:border-box;background-color:#35495e}.vux-header .vux-header-title{line-height:40px;text-align:center;font-size:18px;font-weight:400;color:#fff}.vux-header-title-area,.vux-header .vux-header-title{margin:0 88px;height:40px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vux-header .vux-header-title>span{display:inline-block}.vux-header .vux-header-left,.vux-header .vux-header-right{position:absolute;top:14px;display:block;font-size:14px;line-height:21px;color:#ccc}.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button{float:left;margin-right:8px;color:#ccc}.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active{opacity:.5}.vux-header .vux-header-left{left:18px}.vux-header .vux-header-left .vux-header-back{padding-left:16px}.vux-header .vux-header-left .left-arrow{position:absolute;width:30px;height:30px;top:-5px;left:-5px}.vux-header .vux-header-left .left-arrow:before{content:"";position:absolute;width:12px;height:12px;border:1px solid #ccc;border-width:1px 0 0 1px;-webkit-transform:rotate(315deg);transform:rotate(315deg);top:8px;left:7px}.vux-header .vux-header-right{right:15px}.vux-header .vux-header-right a,.vux-header .vux-header-right button{margin-left:8px;margin-right:0}.vux-header .vux-header-right .vux-header-more:after{content:"\\2022   \\2022   \\2022   ";font-size:16px}.vux-header-fade-in-right-enter-active{-webkit-animation:fadeinR .5s;animation:fadeinR .5s}.vux-header-fade-in-left-enter-active{-webkit-animation:fadeinL .5s;animation:fadeinL .5s}@-webkit-keyframes fadeinR{0%{opacity:0;-webkit-transform:translateX(150px);transform:translateX(150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeinR{0%{opacity:0;-webkit-transform:translateX(150px);transform:translateX(150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes fadeinL{0%{opacity:0;-webkit-transform:translateX(-150px);transform:translateX(-150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeinL{0%{opacity:0;-webkit-transform:translateX(-150px);transform:translateX(-150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}',"",{version:3,sources:["/Users/hongyuanqi/workspace/xmcp/xm/node_modules/_vux@2.7.0@vux/src/components/x-header/index.vue"],names:[],mappings:"AAgHA,YACE,kBAAmB,AACnB,cAAe,AACf,sBAAuB,AACvB,wBAA0B,CAC3B,AACD,8BACE,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,UAAY,CACb,AACD,qDAEE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,gBAAiB,AACjB,uBAAwB,AACxB,kBAAoB,CACrB,AACD,mCACE,oBAAsB,CACvB,AACD,2DAEE,kBAAmB,AACnB,SAAU,AACV,cAAe,AACf,eAAgB,AAChB,iBAAkB,AAClB,UAAY,CACb,AACD,wIAIE,WAAY,AACZ,iBAAkB,AAClB,UAAY,CACb,AACD,oKAIE,UAAa,CACd,AACD,6BACE,SAAW,CACZ,AACD,8CACE,iBAAmB,CACpB,AACD,yCACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,SAAU,AACV,SAAW,CACZ,AACD,gDACE,WAAY,AACZ,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,sBAAuB,AACvB,yBAA0B,AAC1B,iCAAkC,AAC1B,yBAA0B,AAClC,QAAS,AACT,QAAU,CACX,AACD,8BACE,UAAY,CACb,AACD,qEAEE,gBAAiB,AACjB,cAAgB,CACjB,AACD,qDACE,mCAA0C,AAC1C,cAAgB,CACjB,AACD,uCACE,8BAA+B,AACvB,qBAAuB,CAChC,AACD,sCACE,8BAA+B,AACvB,qBAAuB,CAChC,AACD,2BACA,GACI,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACxC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,mBACA,GACI,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACxC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,2BACA,GACI,UAAW,AACX,qCAAsC,AAC9B,4BAA8B,CACzC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,mBACA,GACI,UAAW,AACX,qCAAsC,AAC9B,4BAA8B,CACzC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA",file:"index.vue",sourcesContent:['/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n/**\n* loadmore\n*/\n.vux-header {\n  position: relative;\n  padding: 3px 0;\n  box-sizing: border-box;\n  background-color: #35495e;\n}\n.vux-header .vux-header-title {\n  line-height: 40px;\n  text-align: center;\n  font-size: 18px;\n  font-weight: 400;\n  color: #fff;\n}\n.vux-header-title-area,\n.vux-header .vux-header-title {\n  margin: 0 88px;\n  height: 40px;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.vux-header .vux-header-title > span {\n  display: inline-block;\n}\n.vux-header .vux-header-left,\n.vux-header .vux-header-right {\n  position: absolute;\n  top: 14px;\n  display: block;\n  font-size: 14px;\n  line-height: 21px;\n  color: #ccc;\n}\n.vux-header .vux-header-left a,\n.vux-header .vux-header-left button,\n.vux-header .vux-header-right a,\n.vux-header .vux-header-right button {\n  float: left;\n  margin-right: 8px;\n  color: #ccc;\n}\n.vux-header .vux-header-left a:active,\n.vux-header .vux-header-left button:active,\n.vux-header .vux-header-right a:active,\n.vux-header .vux-header-right button:active {\n  opacity: 0.5;\n}\n.vux-header .vux-header-left {\n  left: 18px;\n}\n.vux-header .vux-header-left .vux-header-back {\n  padding-left: 16px;\n}\n.vux-header .vux-header-left .left-arrow {\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  top: -5px;\n  left: -5px;\n}\n.vux-header .vux-header-left .left-arrow:before {\n  content: "";\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  border: 1px solid #ccc;\n  border-width: 1px 0 0 1px;\n  -webkit-transform: rotate(315deg);\n          transform: rotate(315deg);\n  top: 8px;\n  left: 7px;\n}\n.vux-header .vux-header-right {\n  right: 15px;\n}\n.vux-header .vux-header-right a,\n.vux-header .vux-header-right button {\n  margin-left: 8px;\n  margin-right: 0;\n}\n.vux-header .vux-header-right .vux-header-more:after {\n  content: "\\2022\\0020\\2022\\0020\\2022\\0020";\n  font-size: 16px;\n}\n.vux-header-fade-in-right-enter-active {\n  -webkit-animation: fadeinR .5s;\n          animation: fadeinR .5s;\n}\n.vux-header-fade-in-left-enter-active {\n  -webkit-animation: fadeinL .5s;\n          animation: fadeinL .5s;\n}\n@-webkit-keyframes fadeinR {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(150px);\n            transform: translateX(150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@keyframes fadeinR {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(150px);\n            transform: translateX(150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@-webkit-keyframes fadeinL {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(-150px);\n            transform: translateX(-150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@keyframes fadeinL {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(-150px);\n            transform: translateX(-150px);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n'],sourceRoot:""}])},RYhg:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"ActivityCon5"}},[a("img",{attrs:{src:n("6QG3"),alt:""}}),t._v(" "),a("div",{staticClass:"main"},["0"==t.info.taskState&&"1"==t.info.childTaskList[0].taskState?a("img",{staticClass:"btn",attrs:{src:n("gRNN"),alt:""},on:{click:t.getReward}}):"1"==t.info.taskState&&"2"==t.info.childTaskList[0].taskState?a("img",{staticClass:"btn",attrs:{src:n("3Ghf"),alt:""}}):a("img",{staticClass:"btn",attrs:{src:n("noMv"),alt:""}}),t._v(" "),t.info.childTaskList?a("ul",[t._m(0),t._v(" "),t._l(t.info.childTaskList[0].taskDecDetail,function(e,n){return a("li",{key:n},[a("span",[t._v("达到"+t._s(e[0]))]),t._v(" "),a("span",[t._v(t._s(e[2])+"%")])])})],2):t._e(),t._v(" "),t._m(1)])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("span",[t._v("存入金额")]),t._v(" "),n("span",[t._v("奖励金额")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"info"},[n("p",[t._v("活动说明")]),t._v(" "),n("p",[t._v("1、活动即日起生效，未下架视为长期有效。")]),t._v(" "),n("p",[t._v("2、达到要求后请在当日23:59:59秒前进行领取，如超出时间系统将视为自动放弃。")]),t._v(" "),n("p",[t._v("3、本平台保留对后动在无通知情况更改，终止，并享有最终解释权。")])])}],r={render:a,staticRenderFns:i};e.a=r},SyXH:function(t,e,n){var a=n("OG4R");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("8bSs")("76d525f3",a,!0)},TFrs:function(t,e,n){"use strict";function a(t){n("SyXH")}var i=n("wyZz"),r=n("B4j3"),A=n("46Yf"),o=a,s=A(i.a,r.a,!1,o,null,null);e.a=s.exports},X8Y2:function(t,e,n){"use strict";function a(t){n("/KGA")}Object.defineProperty(e,"__esModule",{value:!0});var i=n("nu63"),r=n("RYhg"),A=n("46Yf"),o=a,s=A(i.a,r.a,!1,o,"data-v-74c49469",null);e.default=s.exports},gRNN:function(t,e,n){t.exports=n.p+"static/img/5canget.036b5ce.png"},noMv:function(t,e,n){t.exports=n.p+"static/img/5noget.7c170ff.png"},nu63:function(t,e,n){"use strict";var a=n("lC5x"),i=n.n(a),r=n("4YfN"),A=n.n(r),o=n("J0Oq"),s=n.n(o),c=n("TFrs");e.a={name:"AvtivityCon5",components:{XHeader:c.a},data:function(){return{info:{}}},created:function(){this.getList()},methods:{getList:function(){var t=this;return s()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.$vux.loading.show({text:"Loading"}),e.next=3,t.$http("/queryTaskList");case 3:n=e.sent,n.returnList.map(function(e){"5"==e.taskId&&(t.info=A()({},e),console.log(e))}),t.$vux.loading.hide();case 6:case"end":return e.stop()}},e,t)}))()},getReward:function(){var t=this;return s()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.$vux.loading.show({text:"Loading"}),e.next=3,t.$http("/getReward",{body:{taskId:"5"}});case 3:n=e.sent,t.$vux.loading.hide(),"0000"==n.returnCode?(t.$vux.toast.show({text:"领取成功",type:"success"}),t.getList()):t.$vux.toast.show({text:n.returnMessage,type:"warn"});case 6:case"end":return e.stop()}},e,t)}))()}}}},wyZz:function(t,e,n){"use strict";var a=n("+Up5"),i=n.n(a);e.a={name:"x-header",props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},beforeMount:function(){this.$slots["overwrite-title"]&&(this.shouldOverWriteTitle=!0)},computed:{_leftOptions:function(){return i()({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}},data:function(){return{shouldOverWriteTitle:!1}}}}});
//# sourceMappingURL=27.bba257340a96eca7be32.js.map