webpackJsonp([1],{"4+hh":function(t,e){},"9TP5":function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWNWgydjZoNnYyeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4="},C8mJ:function(t,e,a){t.exports=a.p+"static/img/img2.1aacb5e.jpg"},Lbzu:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i=a("Lgyv"),n=a.n(i),o=(a("4+hh"),a("giDI"),{data:function(){return{user:{id:"",password:""},url:{signUpUrl:"/login/signUp"}}},methods:{login:function(t){console.log("login start"),this.$http.post("/api/login/checkLogin",{user:this.user}).then(function(t){alert("success login")},function(t){alert(t.response.data.error)}).catch(function(t){alert(t)})}}}),l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"login"}},[t._v("\n  Login\n  "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.id,expression:"user.id"}],attrs:{placeholder:"ID"},domProps:{value:t.user.id},on:{input:function(e){e.target.composing||t.$set(t.user,"id",e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}}),t._v(" "),a("button",{on:{click:t.login}},[t._v("login")]),t._v(" "),a("router-link",{attrs:{to:"/login/signUp",tag:"button"}},[t._v("Sign Up")])],1)},staticRenderFns:[]},r=a("VU/8")(o,l,!1,null,null,null).exports;s.default.use(n.a);var c={name:"App",data:function(){return{url:{}}},components:{Login:r},computed:{},methods:{}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page-container",attrs:{id:"app"}},[e("md-app",{attrs:{"md-mode":"fixed-last"}},[e("md-app-toolbar",{staticClass:"md-large md-dense md-primary",staticStyle:{backgroundcolor:"#0100FF"}},[e("div",{staticClass:"md-toolbar-row"},[e("span",{staticClass:"md-title"},[this._v("YUMI_managerpage")])]),this._v(" "),e("div",{staticStyle:{flex:"1"}},[e("div",{attrs:{align:"right"}},[e("login")],1)]),this._v(" "),e("div",{staticClass:"md-toolbar-row"},[e("md-tabs",{staticClass:"md-primary",staticStyle:{margin:"auto",height:"30px"}},[e("md-tab",{attrs:{id:"tab-dashBoard","md-label":"회원관리",to:"/dashBoard"}}),this._v(" "),e("md-tab",{attrs:{id:"tab-profile","md-label":"채팅방 관리",to:"/managechatroom"}}),this._v(" "),e("md-tab",{attrs:{id:"tab-home","md-label":"서포터즈 신청",to:"/SupporterTab"}})],1)],1)])],1),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var m=a("VU/8")(c,d,!1,function(t){a("gUsk")},null,null).exports,u=a("/ocq"),p={data:function(){return{bottomPosition:"md-bottom-right",active:!1,supporterlists:{},submit:{name:"",email:"",contact:"",text:"",photo_path:""}}},created:function(){var t=this;this.$http.get("/api/supporter").then(function(e){t.supporterlists=e.data,console.log("Success"),console.log(t.supporterlists)})},methods:{Register:function(){this.$http.post("/api/supporter/signup",this.submit).then(function(t){console.log("Sumit Success")}).catch(function(t){console.log("Submit failed")}),this.active=!1}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"md-layout",staticStyle:{display:"block",color:"#F6F6F6"}},[s("div",{staticClass:"supportermain",staticStyle:{"min-height":"600px"}},[t._l(t.supporterlists,function(e){return s("div",{key:e.name},[s("md-card",{staticStyle:{width:"50%",margin:"4px",marginTop:"100px",display:"inline-block","vertical-align":"top"}},[s("md-card-header",[s("md-card-header-text",[s("div",{staticClass:"md-title"},[t._v("\n                "+t._s(e.name)+"\n                "),s("br"),t._v(" "),s("br")]),t._v(" "),s("div",{staticClass:"md-subhead",staticStyle:{"text-align":"left","font-weight":"bold"}},[t._v("\n                # 이메일: "+t._s(e.email)+"\n                "),s("br"),t._v("\n                # 연락처: "+t._s(e.contact)+"\n                "),s("br"),t._v("\n                # 설명글: "+t._s(e.text)+"\n                "),s("br")])]),t._v(" "),s("md-card-media",{attrs:{"md-medium":""}})],1),t._v(" "),s("md-card-actions",[s("md-button",{staticClass:"md-raised md-accent"},[t._v("Decline")]),t._v(" "),s("md-button",{staticClass:"md-raised md-primary"},[t._v("Accept")])],1)],1)],1)}),t._v(" "),s("md-dialog",{staticStyle:{width:"500px",height:"1000px"},attrs:{"md-active":t.active},on:{"update:mdActive":function(e){t.active=e},"update:md-active":function(e){t.active=e}}},[s("md-dialog-title",[t._v("서포터즈 신청")]),t._v(" "),s("md-field",{staticClass:"select"},[s("label",[t._v("신청자 이름")]),t._v(" "),s("md-input",{model:{value:t.submit.name,callback:function(e){t.$set(t.submit,"name",e)},expression:"submit.name"}})],1),t._v(" "),s("md-field",{staticClass:"select"},[s("label",[t._v("신청자 이메일")]),t._v(" "),s("md-input",{model:{value:t.submit.email,callback:function(e){t.$set(t.submit,"email",e)},expression:"submit.email"}})],1),t._v(" "),s("md-field",{staticClass:"select"},[s("label",[t._v("신청자 연락처")]),t._v(" "),s("md-input",{model:{value:t.submit.contact,callback:function(e){t.$set(t.submit,"contact",e)},expression:"submit.contact"}})],1),t._v(" "),s("md-field",{staticClass:"select"},[s("label",[t._v("사진")]),t._v(" "),s("md-file",{attrs:{accept:"image/*"},model:{value:t.submit.photo_path,callback:function(e){t.$set(t.submit,"photo_path",e)},expression:"submit.photo_path"}})],1),t._v(" "),s("md-field",{staticClass:"select"},[s("label",[t._v("설명글")]),t._v(" "),s("md-textarea",{model:{value:t.submit.text,callback:function(e){t.$set(t.submit,"text",e)},expression:"submit.text"}})],1),t._v(" "),s("md-dialog-actions",[s("md-button",{staticClass:"md-primary",on:{click:function(e){t.active=!1}}},[t._v("Close")]),t._v(" "),s("md-button",{staticClass:"md-primary",on:{click:t.Register}},[t._v("Submit")])],1)],1),t._v(" "),s("md-speed-dial",{class:t.bottomPosition,staticStyle:{marginRight:"20%",marginBottom:"8%"}},[s("md-button",{staticClass:"md-fab md-primary",on:{click:function(e){t.active=!0}}},[s("img",{attrs:{src:a("9TP5")}})])],1)],2),t._v(" "),s("div",{staticClass:"md-layout-item",staticStyle:{backgroundColor:"#FFF",height:"30px"}})])])},staticRenderFns:[]};var h=a("VU/8")(p,v,!1,function(t){a("sRU6")},null,null).exports,g={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"md-layout",staticStyle:{display:"block",color:"#F6F6F6"}},[e("div",{staticClass:"md-layout-item"},[e("img",{attrs:{src:a("C8mJ")}})]),this._v(" "),e("div",{staticClass:"md-layout-item",staticStyle:{backgroundColor:"#F2CB61",height:"30px"}},[this._v("이용방법")])])])}]},_=a("VU/8")(null,g,!1,null,null,null).exports,b={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"md-layout",staticStyle:{display:"block",color:"#F6F6F6"}},[e("div",{staticClass:"md-layout-item"},[e("img",{attrs:{src:a("C8mJ")}})]),this._v(" "),e("div",{staticClass:"md-layout-item",staticStyle:{backgroundColor:"#F2CB61",height:"30px"}},[this._v("이용방법")])])])}]},f=a("VU/8")(null,b,!1,null,null,null).exports,y={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"md-layout",staticStyle:{display:"block",color:"#F6F6F6"}},[e("div",{staticClass:"md-layout-item"},[e("img",{attrs:{src:a("C8mJ")}})]),this._v(" "),e("div",{staticClass:"md-layout-item",staticStyle:{backgroundColor:"#F2CB61",height:"30px"}},[this._v("이윤구")])])])}]},C=a("VU/8")(null,y,!1,null,null,null).exports;s.default.use(n.a);var x={data:function(){return{user:{id:"",password:"",name:"",email:"",isLoggedIn:!1},sending:!1}},methods:{signUp:function(t){var e=this;this.$http.post("/api/login/signUp",{user:this.user}).then(function(t){0===t.data.result&&alert("Error, please, try again"),1===t.data.result&&(alert("Success"),e.$router.push("/"))}).catch(function(t){alert("error")})}}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("md-card",{staticClass:"md-layout-item md-size-50 md-small-size-100"},[a("md-card-header",[a("div",{staticClass:"md-title"},[t._v("Sign Up")])]),t._v(" "),a("md-card-content",[a("md-field",[a("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),a("md-input",{attrs:{name:"name"},model:{value:t.user.name,callback:function(e){t.$set(t.user,"name",e)},expression:"user.name"}})],1),t._v(" "),a("md-field",[a("label",{attrs:{for:"id"}},[t._v("ID")]),t._v(" "),a("md-input",{attrs:{name:"id"},model:{value:t.user.id,callback:function(e){t.$set(t.user,"id",e)},expression:"user.id"}})],1),t._v(" "),a("md-field",{attrs:{"md-toggle-password":!0}},[a("label",{attrs:{for:"password"}},[t._v("Password")]),t._v(" "),a("md-input",{attrs:{name:"password",type:"password"},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}})],1),t._v(" "),a("md-field",[a("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),a("md-input",{attrs:{name:"email"},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}})],1)],1),t._v(" "),a("md-card-actions",[a("md-button",{staticClass:"md-raised md-primary",on:{click:t.signUp}},[t._v("Sign Up")])],1)],1)],1)},staticRenderFns:[]};var w=a("VU/8")(x,k,!1,function(t){a("Lbzu")},null,null).exports;s.default.use(u.a);var S=new u.a({mode:"history",routes:[{path:"/SupporterTab",name:"SupporterTab",component:h},{path:"/",name:"home",component:C},{path:"/dashBoard",name:"dashBoard",component:_},{path:"/managechatroom",name:"managechatroom",component:f},{path:"/login",name:"Login",component:r},{path:"/login/signUp",name:"SignUp",component:w}]}),F=a("mtWM"),$=a.n(F);s.default.prototype.$http=$.a,s.default.config.productionTip=!1,new s.default({el:"#app",router:S,components:{App:m},template:"<App/>"})},gUsk:function(t,e){},giDI:function(t,e){},sRU6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.67556b76cebb7942ffc3.js.map