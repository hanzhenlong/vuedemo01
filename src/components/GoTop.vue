<template>
    <div>
      <span class="go-top" v-show="showGoTop" @click="goTop">
        Top
      </span>
    </div>
</template>
<script>
  import $ from 'jquery'
 export default {
   data() {
     return {
       showGoTop: false
     };
   },
   methods: {
      goTop() {
        $(document).scrollTop(0);
      }
   },
   mounted() {
       $(window).scroll((e)=>{
          var flag = $(document).scrollTop() > 500;
          if(flag){
             this.showGoTop = true;
          } else {
            this.showGoTop = false;
          }
       });
   }
 }
</script>
<style>
  .go-top{
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: rgba(46, 139, 87, 0.8);
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    border-radius: 50%;
  }
</style>
