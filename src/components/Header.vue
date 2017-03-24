<template>
  <div>
    <div class="mask" :class="{show: showMenu}" @click="toggleSideBar"></div>
    <header>
      <span @click="goBack">< 返回</span>
      <span @click="toggleSideBar" v-text="title"></span>
      <span><router-link :to="{name: 'New'}">新增 ></router-link></span>
    </header>
    <div class="header-back"></div>
    <side-bar :isShow="showMenu"></side-bar>
  </div>
</template>
<script>
  import sideBar from './SideBar.vue'
  export default{
    name: 'topNav',
    data() {
      return {
        showMenu: false
      };
    },
    props: {
      title: {
        type: String,
        default: '全部'
      }
    },
    methods: {
      toggleSideBar() {
        this.showMenu = !this.showMenu;
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    watch: {},
    components: {
      sideBar
    }
  }
</script>
<style lang="scss" scoped="scoped">
  @import "../assets/scss/mixin.scss";

  .mask {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: all 0s ease 0s;
  }

  .mask.show {
    transform: translateX(0);
    background-color: rgba(0, 0, 0, 0.5);
  }

  header {
    height: 40px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: rgba(46, 139, 87, 0.9);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 800;
    & span:nth-child(2) {
      flex: 1;
    }
    & span {
      padding: 0 30px;
      @include setTapColor();
      a, a:hover{
        color: #ffffff;
      }
    }
  }

  .header-back {
    height: 40px;
    visibility: hidden;
  }
</style>
