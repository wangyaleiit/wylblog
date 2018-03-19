<template>
	<div class="mdui-list" style="padding: 0px;">
		<div class="mdui-card mdui-ripple" style="margin-top: 2%;margin-bottom:12px;">
		    <div class="mdui-card-primary">
			    <div class="mdui-card-primary-title">{{art.title}}</div>
				<div class="mdui-card-primary-subtitle" style="margin-top: 10px;">
					<font v-for="tag in art.tag.split(',')" :key="tag" style="background-color:#00C853;color: #FFFFFF;font-size: small;padding: 1px 5px;border-radius: 5px;margin-right:10px">{{ tag }}</font>
					<i class="mdui-icon material-icons" style="font-size: 16px;">&#xe916;</i>&nbsp;{{art.updateDate}}&emsp;
				</div>
		    </div>
		    <div class="mdui-card-content" > 
		    	 <div style="text-align: left" v-html="art.htmlcontent" v-highlight></div>
		    </div>
		    <div class="mdui-divider-inset-dark" style="margin:10px 20px"></div>
		    <div class="mdui-card-primary" style="padding: 10px 24px;">
			    <div class="mdui-card-primary-subtitle">
					<i class="mdui-icon material-icons" style="font-size: 14px;">&#xe54e;</i>&emsp;{{art.topicName}}
		    	</div>
		    </div>
		</div>
		<div class="mdui-float-left" v-if="preArt !== null">
			<button class="mdui-btn  mdui-btn-icon mdui-btn-dense mdui-color-light-blue-a700N mdui-ripple" @click="preHand(preArt.id)">
				<li class="mdui-icon material-icons ">&#xe408;</li>
			</button>&emsp;{{preArt.title}}
		</div>
		<div class="mdui-float-right" v-if="nextArt !== null">
			{{nextArt.title}} &emsp;<button class="mdui-btn  mdui-btn-icon mdui-btn-dense mdui-color-light-blue-a700N mdui-ripple" @click="nextHand(nextArt.id)">
				<i class="mdui-icon material-icons">&#xe409;</i>
			</button>
		</div>
		<div id="SOHUCS" :sid="art.id"></div> 
	</div>
</template>

<script>
import { getRequest } from '@/apis/fetch'
export default {
	data(){
		return{
			loading:true,
			art:{},
			preArt:{},
			nextArt:{}
		}
	},
  created(){
	 this.$Loading.start()
	 let appid = 'cytwmDjzw'
	 let conf = 'prod_8a03409ecc7f3da4233854705b724cf6'
	 let width = window.innerWidth || document.documentElement.clientWidth 
	 if (width < 960) { 
		window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>'); } else { var loadJs=function(d,a){var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("charset","UTF-8");b.setAttribute("src",d);if(typeof a==="function"){if(window.attachEvent){b.onreadystatechange=function(){var e=b.readyState;if(e==="loaded"||e==="complete"){b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};loadJs("http://changyan.sohu.com/upload/changyan.js",function(){window.changyan.api.config({appid:appid,conf:conf})}); 
	 } 
	 this.loadData(this.$route.params.id)
  },
  methods:{
     preHand(id){
		this.loadData(id)
	 },
	 nextHand(id){
		this.loadData(id)
	 },
	 loadData(id){
		getRequest('/front/queryByKey/'+ id).then(resp=>{
			if (resp.data.success) {
				this.art = resp.data.result.art
			    this.preArt = resp.data.result.preArt
				this.nextArt = resp.data.result.nextArt
				this.$Loading.finish()
			}
		})
	 }
  }
}

// (function(){ 
// var appid = 'cytwmDjzw'; 
// var conf = 'prod_8a03409ecc7f3da4233854705b724cf6'; 
// var width = window.innerWidth || document.documentElement.clientWidth; 
// if (width < 960) { 
//   window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>'); } else { var loadJs=function(d,a){var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("charset","UTF-8");b.setAttribute("src",d);if(typeof a==="function"){if(window.attachEvent){b.onreadystatechange=function(){var e=b.readyState;if(e==="loaded"||e==="complete"){b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};loadJs("https://changyan.sohu.com/upload/changyan.js",function(){window.changyan.api.config({appid:appid,conf:conf})}); 
// } })();
</script>

<style>
blockquote{
  display:block;
  background: #fff;
  padding: 15px 20px 15px 45px;
  margin: 0 0 20px;
  position: relative;
 
  /*字体*/
  font-family: Georgia, serif;
  font-size: 16px;
  line-height: 1.2;
  color: #666;
  text-align: justify;
  
  /*边框 - (选项)*/
  border-left: 15px solid #c76c0c;
  border-right: 2px solid #c76c0c;
 
  /*盒子阴影 - (选项)*/
  -moz-box-shadow: 2px 2px 15px #ccc;
  -webkit-box-shadow: 2px 2px 15px #ccc;
  box-shadow: 2px 2px 15px #ccc;
}
blockquote::before{
  content: "\201C"; /*左双引号的Unicode编码*/
 
  /*字体*/
  font-family: Georgia, serif;
  font-size: 60px;
  font-weight: bold;
  color: #999;
 
  /*位置*/
  position: absolute;
  left: 10px;
  top:5px;
}
blockquote::after{
  content: ""; /*如果要显示右双引号，则写 content: "\201D"; */
}
</style>