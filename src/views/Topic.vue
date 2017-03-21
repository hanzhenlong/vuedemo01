<template>
    <div>
      <top-nav></top-nav>
      <div class="topic" v-if="topic.title">
        <h3 class="title">{{topic.title}}</h3>
        <div class="author-info">
          <img :src="topic.author.avatar_url" alt="">
          <div>
            <p>
              <span>{{topic.author.loginname}}</span>
              <span :class="getTabInfo(topic.tab, topic.top, topic.good, true)">{{getTabInfo(topic.tab, topic.top, topic.good, false)}}</span>
            </p>
            <p><span>发布于:{{topic.create_at | getLastTimeStr(true)}}</span><span>{{topic.visit_count}}次浏览</span></p>
          </div>
        </div>
        <div class="markdown-body" v-html="topic.content">
        </div>
        <div class="sum-reply"><span>{{topic.reply_count}}</span>回复</div>
        <div class="reply-list">
          <div class="reply-item" v-for="item in topic.replies">
            <div>
              <img :src="item.author.avatar_url" alt="">
              <div>
                  <span class="author">{{item.author.loginname}}</span>
                  发布于:{{ item.create_at | getLastTimeStr(true)}}
              </div>
              <div>
                <span class="praise">赞</span>
                <span class="praise-num">{{item.ups.length}}</span>
                <span class="go-reply">回复</span>
              </div>
            </div>
            <div class="reply_content" v-html="item.content">

            </div>
          </div>
        </div>
      </div>
      <go-top></go-top>
    </div>
</template>
<script>
  import topNav from '../components/Header.vue'
  import goTop from '../components/GoTop.vue'
  import {BaseAPI} from '../libs/BaseAPI'
  import $ from 'jquery'
  import * as utils from '../libs/utils'

  export default {
      data() {
          return {
            topic: {}
          };
      },
      filters: {
        getLastTimeStr(time, isFriendly) {
          return utils.getLastTimeStr(time, isFriendly);
        }
      },
      mounted() {
        $.ajax({
          type: 'GET',
          url: BaseAPI.topic + this.$route.params.id,
          dataType: 'json',
          success: (data) => {
            console.log(data)
            this.topic = data.data;
          },
          error: function () {
            alert("error")
          }
        });
      },
      methods: {
        getTabInfo(tab, top, good, isClass) {
          return utils.getTabInfo(tab, top, good, isClass);
        }
      },
      components: {
          topNav,
          goTop
      }
  }
</script>
<style lang="scss">
  @import "../assets/scss/github-markdown.css";
  .topic{
    padding: 14px;
    .title{
      font-size: 16px;
      color: #2c3e50;
      background-color: #f0f0f0;
      padding: 8px;
      border-radius: 5px;
    }
    .author-info{
      display: flex;
      padding: 16px 0 20px;
      font-size: 14px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 10px;
        flex-shrink: 0;
      }
      div{
        flex-grow: 1;
      }
      div p{
        flex-grow: 1;
        justify-content: space-between;
        padding-top: 2px;
        display: flex;
      }
      div p:nth-of-type(1){
        span:last-child{
          padding: 2px 8px;
          background-color: #333;
          color: #ffffff;
          border-radius: 4px;
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
      }
    }
    .sum-reply{
      font-size: 16px;
      font-weight: bold;
      padding: 14px 0;
      border-top: 1px solid #eeeeee;
      span{
        color: #42b983;
        padding-right: 6px;
      }
    }

    .reply-item{
      padding: 14px 0;
      border-top: 1px solid #eeeeee;
      font-size: 14px;
      &>div:first-child{
        display: flex;
        justify-content: space-between;
        img{
          width: 40px;
          height: 40px;
          border-radius: 5px;
          margin-right: 10px;
        }
        div{
          padding-top: 6px;
        }
        div:first-of-type{
          flex-grow: 1;
          .author{
            padding-right: 6px;
          }
        }
      }
      .reply_content{
        padding-top: 10px;
        a{
          color: blue;
          &:hover{
            color: blue ;
          }
        }
      }

    }
    /*.markdown-body a{*/
      /*color: blue;*/
      /*&:hover{*/
        /*color: blue ;*/
      /*}*/
    /*}*/
  }
</style>
