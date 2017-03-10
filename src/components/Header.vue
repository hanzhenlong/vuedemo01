<template>
  <div>
    <div class="mask" :class="{show: showMenu}" @click="toggleSideBar"></div>
    <header><span @click="toggleSideBar"><</span> <span v-text="title"></span> <span>></span></header>
    <side-bar :isShow="showMenu" :menus="menuArr" @changeTitle="changeTitle"></side-bar>
  </div>
</template>
<script>
  import sideBar from './SideBar.vue'
  export default{
      name: 'topNav',
      data() {
          return {
              title: "导航",
              showMenu: false,
              menuArr: ["嘻嘻", "哈哈", "呵呵", "嘿嘿", "嘎嘎"]
          };
      },
      methods: {
        toggleSideBar() {
            this.showMenu = !this.showMenu;
        },
        changeTitle(newTitle) {
            this.title = newTitle;
            this.showMenu = false;
        }
      },
      components: {
        sideBar
      }
  }
</script>
<style lang="scss" scoped="scoped">
  @import "../assets/scss/mixin.scss";

  .mask{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
    transform: translateX(-100%);
    transition: all 0s ease 0s;
  }
  .mask.show{
    transform: translateX(0);
    background-color: rgba(0,0,0,0.5);
  }
  header{
    height: 40px;
    background-color: seagreen;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    & span:nth-child(2){
      flex: 1;
    }
    & span{
      padding: 0 30px;
      @include setTapColor();
    }
  }
</style>
