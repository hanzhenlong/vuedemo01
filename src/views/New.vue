<template>
    <div>
      <top-nav :title="pageTitle"></top-nav>
      <section>
        <div class="topic-type">
          <span>选择分类：</span>
          <select v-model="topic.tab">
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
          </select>
          <button @click="addTopic">发布</button>
        </div>
        <div class="topic-title">
          <input type="text" placeholder="标题，字数10个以上" v-model="topic.title" :class="{'err': err == 'title'}">
        </div>
        <div class="topic-content">
          <textarea placeholder="回复支持Markdown语法,请注意标记代码" v-model="topic.content" :class="{'err': err == 'content'}"></textarea>
        </div>
      </section>
    </div>
</template>
<script>
  import topNav from '../components/Header.vue'
  import { mapGetters } from 'vuex'
  import $ from 'jquery'
  import axios from 'axios'
  import { BaseAPI } from '../libs/BaseAPI'

  export default {
    data() {
      return {
        pageTitle: '主题',
        topic: {
          title: '',
          tab: 'share',
          content: ''
        },
        err: '',
        authorTxt: '<br/><br/><a class="from" href="https://github.com/shinygang/Vue-cnodejs">I‘m webapp-cnodejs-vue</a>'
      };
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      addTopic() {
        let title = $.trim(this.topic.title);
        let content = $.trim(this.topic.content);

        if (!title || title.length<10) {
          this.err = 'title';
          return false;
        }
        if (!content) {
          this.err = 'content';
          return false;
        }

        let postData = {
          ...this.topic,
          content: this.topic.content + this.authorTxt,
          accesstoken: this.userInfo.token
        };
        axios.post(BaseAPI.topics,postData)
          .then((response) => {
            if (response.statusText === "OK") {
              this.$router.push({
                name: 'List'
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    components: {
      topNav
    }
  }
</script>
<style lang="scss">
  section{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .topic-type, .topic-title{
      height: 46px;
      border-bottom: 1px solid #eeeeee;
      padding: 0 14px;
      display: flex;
      align-items: center;
    }
    .topic-type{
      justify-content: space-between;
      select{
        flex-grow: 1;
        margin-right: 20px;
        outline:none;
      }
      button{
        border: 0;
        background-color: seagreen;
        padding: 6px 10px;
        color: #ffffff;
        border-radius: 4px;
        outline: none;
      }
    }
    .topic-title input{
      width: 100%;
      height: 46px;
      border: 0;
      outline: none;
      padding: 0 10px;
      box-sizing: border-box;
      &.err{
        border: 1px solid red;
      }
    }
    .topic-content{
      padding: 14px;
      textarea{
        border: 1px solid #eee;
        width: 100%;
        height: 500px;
        outline: none;
        padding: 6px;
        box-sizing: border-box;
        &.err{
          border-color: red;
        }
      }
    }
  }
</style>
