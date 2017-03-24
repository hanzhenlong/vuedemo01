<template>
    <div>
      <top-nav title="用户信息"></top-nav>
      <div class="user-info">
        <img :src="user.avatar_url" alt="">
        <div class="user-name">{{user.loginname}}</div>
        <div>
          <span>{{getLastTimeStr(user.create_at, false)}}</span>
          <span>积分：{{user.score}}</span>
        </div>
      </div>
      <div class="tabs">
        <a href="javascript:;" class="active">最近回复</a>
        <a href="javascript:;">最新发布</a>
      </div>
      <div class="tab-contents">
        <div class="tab-content">

        </div>
      </div>
    </div>
</template>
<script>
  import topNav from '../components/Header.vue'
  import { mapGetters } from 'vuex'
  import { BaseAPI } from '../libs/BaseAPI'
  import axios from 'axios'
  import * as utils from '../libs/utils'

  export default {
    data() {
      return {
        user: {}
      };
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      getLastTimeStr(time, isFriendly) {
        console.log(utils.getLastTimeStr(time, isFriendly))
        return utils.getLastTimeStr(time, isFriendly);
      }
    },
    mounted() {
      axios.get(BaseAPI.baseUrl+'/user/'+this.userInfo.loginname)
        .then((response) => {
          if (response.statusText === "OK") {
            this.user = response.data.data;
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    components: {
      topNav
    }
  }
</script>
<style lang="scss">
  .user-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eee;
    padding:14px;
    font-size: 14px;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    div:last-child{
      align-self: stretch;
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      span:last-child{
        color: #80bd01;
      }
    }
  }
  .tabs{
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    font-weight: bold;
    a{
      flex-grow: 1;
      text-align: center;
      &:first-child{
        border-right: 1px solid #eee;
      }
      &.active{
        border-bottom: 2px solid seagreen;
        color: seagreen;
      }
    }

  }
</style>
