<template>
  <div>
    <top-nav ref="topNav" :title="getTitleStr(searchKey.tab)"></top-nav>
    <div class="content-list">
      <router-link :to="{name: 'Topic', params: {id: item.id}}" v-for="item in items" :key="item.id">
        <div>
          <span :class="getTabInfo(item.tab, item.top, item.good, true)" >{{getTabInfo(item.tab, item.top, item.good, false)}}</span>
          <h3>{{item.title}}</h3>
        </div>
        <div>
          <img :src="item.author.avatar_url" alt="">
          <div class="other-info">
            <p>
              <span>{{item.author.loginname}}</span>
              <span v-if="item.reply_count > 0"><b>{{item.reply_count}}</b>/{{item.visit_count}}</span>
            </p>
            <p><span>{{item.create_at | getLastTimeStr(true)}}</span><span>{{item.last_reply_at | getLastTimeStr(true)}}</span></p>
          </div>
        </div>
      </router-link>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
    </div>
    <go-top></go-top>
    <router-view></router-view>
  </div>
</template>
<script>
  import topNav from '../components/Header'
  import goTop from '../components/GoTop.vue';
  import InfiniteLoading from 'vue-infinite-loading';
  import $ from 'jquery'
  import {BaseAPI} from '../libs/BaseAPI'
  import * as utils from '../libs/utils'
  import axios from 'axios'


  export default {
    name: 'List',
    data() {
      return {
        items: [],
        showMenu: false,
        searchKey: {
          page: 1,
          limit: 10,
          tab: "all"
        }
      }
    },
    filters: {
      getLastTimeStr(time, isFriendly) {
        return utils.getLastTimeStr(time, isFriendly);
      }
    },
    methods: {
      getTitleStr(tab) {
        var str = '';
        switch (tab) {
          case 'share':
            str = '分享';
            break;
          case 'ask':
            str = '问答';
            break;
          case 'job':
            str = '招聘';
            break;
          case 'good':
            str = '精华';
            break;
          default:
            str = '全部';
            break;
        }
        return str;
      },
      getData() {
//        $.ajax({
//          type: 'GET',
//          url: BaseAPI.topics,
//          data: this.searchKey,
//          dataType: 'json',
//          success: (data)=>{
//            console.log(data.data);
//            this.items = this.items.concat(data.data);
//            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
//            this.searchKey.page++;
//          },
//          error: ()=>{
//            alert("error")
//          }
//        });
        axios.get(BaseAPI.topics, {
            params: this.searchKey
          })
          .then((response) => {
            console.log(response);
            this.items = this.items.concat(response.data.data);
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onInfinite() {
        this.searchKey.page++;
        this.getData();
      },
      getTabInfo(tab, top, good, isClass) {
        return utils.getTabInfo(tab, top, good, isClass);
      }
    },
    mounted() {
      let query = this.$route.query;
      if (query && query.tab) {
        this.searchKey.tab = query.tab;
      }
      // 如果从详情页面返回，并且之前存有对应的查询条件和参数
      // 则直接渲染之前的数据
      if (window.sessionStorage.getItem('searchKey') && window.sessionStorage.getItem('tab') === this.searchKey.tab) {
        this.items = JSON.parse(window.sessionStorage.getItem('items'));
        this.searchKey = JSON.parse(window.sessionStorage.getItem('searchKey'));
        this.$nextTick(() => $(window).scrollTop(window.sessionStorage.getItem('scrollTop')));
      } else {
        this.getData();
      }
    },
    beforeRouteLeave(to, from, next) {
      // 如果跳转到详情页面，则记录关键数据
      // 以便从详情页返回到该页面的时候继续加载之前页面的数据
      if (to.name === 'Topic') {
        window.sessionStorage.setItem('scrollTop', $(window).scrollTop());
        window.sessionStorage.setItem('searchKey', JSON.stringify(this.searchKey));
        window.sessionStorage.setItem('items', JSON.stringify(this.items));
        window.sessionStorage.setItem('tab', from.query.tab || 'all');
      }
      $(window).off('scroll');
      next();
    },
    beforeRouteEnter(to, from, next) {
      console.log(2);
      next()
    },
    watch: {
      '$route' (to, from){
        if(to.query && to.query.tab){
          this.searchKey.tab = to.query.tab;
          this.items = [];
        }
        this.searchKey.page = 1;
        this.getData();
        // 隐藏左侧菜单
        this.$refs.topNav.showMenu = false;
      }
    },
    components: {
      topNav,
      InfiniteLoading,
      goTop
    }
  }
</script>
<style lang="scss">
  .content-list {
    display: flex;
    flex-direction: column;
    a {
      display: flex;
      padding: 14px;
      border-bottom: 1px solid #eee;
      flex-direction: column;
      div {
        display: flex;
        overflow: hidden;
        flex-grow: 1;
        h3 {
          font-size: 16px;
          color: #333;
          text-align: left;
          padding-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
      div:first-child {
        margin-bottom: 10px;
      }
      div:first-child span {
        flex-shrink: 0;
        height: 22px;
        padding: 0 6px;
        border-radius: 4px;
        color: #ffffff;
        font-size: 14px;
        background-color: #333;
        line-height: 22px;
        margin-left: 2px;
        &.top{
          background-color: #e74c3c;
        }
        &.job{
          background-color: #9b59b6;
        }
        &.ask{
          background-color: #3498db;
        }
        &.share{
          background-color: #1abc9c;
        }
        &.good{
          background-color: #e67e22;
        }
      }
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        -ms-flex-negative: 0;
        flex-shrink: 0;
      }
      .other-info{
        flex-direction: column;
      }
      .other-info p{
        font-size: 14px;
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        b{
          color: #42b983;
          padding-right: 2px;
        }
      }
    }
  }
</style>
