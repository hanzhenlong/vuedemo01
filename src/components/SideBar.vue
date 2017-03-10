<template>
    <div class="side-bar" :class="{show: isShow}">
        <avatar></avatar>
        <div class="side-menus">
          <ul>
            <li v-for="menu in menus"><a href="javascript:;" @click="changeNavTitle(menu)" v-text="menu"></a></li>
          </ul>
        </div>
    </div>
</template>
<script>
  import Avatar from './Avatar.vue'

  export default {
      data() {
         return {

         };
      },
      props: {
          isShow: {
              default: false
          },
          menus: {
              type: Array,
              required: true
          }
      },
      methods: {
          changeNavTitle(title) {
             this.$emit("changeTitle", title);
          }
      },
      components: {
          Avatar
      }
  }
</script>
<style lang="scss">
  @import "../assets/scss/mixin.scss";

  .side-bar{
    width: 50%;
    background-color: #222;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    padding-top: 60px;
    transform: translateX(-110%);
    transition: all 0.2s ease 0s;
  }
  .side-bar.show{
    transform: translateX(0);
  }
  .side-menus{
    padding-top: 40px;
  }
  .side-bar li a {
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
  }

  .side-bar li a{
    color: #fff;
    border-bottom: 1px solid #666;
    @include setTapColor(rgba(0,0,0,0.5));
  }
  .side-bar li:first-child a{
    border-top: 1px solid #666;
  }
</style>
