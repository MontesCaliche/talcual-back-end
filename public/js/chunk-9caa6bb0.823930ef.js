(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9caa6bb0"],{"0dc6":function(s,e,a){"use strict";a("3a65")},"3a65":function(s,e,a){},"5c9c":function(s,e,a){"use strict";a.r(e);var t=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"container my-2"},[t("div",{staticClass:"row"},[t("div",{staticClass:"card mx-auto my-3 w-50"},[t("div",{staticClass:"card-body"},[t("img",{staticClass:"imagen my-3",attrs:{src:a("942e")}}),t("h3",{staticClass:"mx-auto my-3"},[s._v("Crear Cuenta")]),t("form",{on:{submit:function(e){return e.preventDefault(),s.createUser.apply(null,arguments)}}},[t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"input-name"}},[s._v("Nombre")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.user.name,expression:"user.name"}],staticClass:"form-control",attrs:{type:"text",id:"input-name","aria-describedby":"emailHelp"},domProps:{value:s.user.name},on:{input:function(e){e.target.composing||s.$set(s.user,"name",e.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"input-email"}},[s._v("Correo electrónico")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{type:"email",id:"input-email","aria-describedby":"emailHelp"},domProps:{value:s.user.email},on:{input:function(e){e.target.composing||s.$set(s.user,"email",e.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"input-password"}},[s._v("Contraseña")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"input-password"},domProps:{value:s.user.password},on:{input:function(e){e.target.composing||s.$set(s.user,"password",e.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"input-rpassword"}},[s._v("Repita la contraseña")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.rpassword,expression:"rpassword"}],staticClass:"form-control",attrs:{type:"password",id:"input-rpassword"},domProps:{value:s.rpassword},on:{input:function(e){e.target.composing||(s.rpassword=e.target.value)}}})]),t("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"submit"}},[s._v(" Crear mi cuenta ")]),t("div",{staticClass:"my-3 mx-auto",attrs:{id:"google-signin"}},[s._v("google")])]),""!=s.message?t("div",[t("p",[s._v(s._s(s.message))])]):s._e()])])])])},r=[],o=a("5530"),i=a("2f62"),n={name:"SignUp",data:function(){return{user:{name:"",email:"",password:""},rpassword:"",message:""}},methods:Object(o["a"])(Object(o["a"])({},Object(i["b"])(["saveUser"])),{},{createUser:function(){var s=this;this.user.password===this.rpassword?this.user.password.length>=8?this.axios.post("/new-user",this.user).then((function(e){s.axios.post("/login",{email:s.user.email,password:s.user.password}).then((function(e){var a=e.data.token;s.saveUser(a)}))})).catch((function(e){console.log(e.response),s.message=e.response.data.message})):this.message="La contraseña debe contener 8 o mas caracteres":this.message="Las contraseñas no coinciden"},onSignIn:function(s){var e=s.getBasicProfile();console.log("ID: "+e.getId()),console.log("Name: "+e.getName()),console.log("Image URL: "+e.getImageUrl()),console.log("Email: "+e.getEmail())}}),computed:{},mounted:function(){gapi.signin2.render("google-signin",{onsuccess:this.onSignIn})}},l=n,c=(a("0dc6"),a("2877")),m=Object(c["a"])(l,t,r,!1,null,null,null);e["default"]=m.exports},"942e":function(s,e,a){s.exports=a.p+"img/pagWeb.8a6300d7.png"}}]);
//# sourceMappingURL=chunk-9caa6bb0.823930ef.js.map