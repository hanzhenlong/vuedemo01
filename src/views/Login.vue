<template>
    <div>
      <top-nav title="登录"></top-nav>
      <div class="login-info">
        <input type="text" placeholder="accesstoken" v-model="token">
        <button @click="login">登录</button>
      </div>
    </div>
</template>
<script>
  import topNav from '../components/Header.vue'
  import {BaseAPI} from '../libs/BaseAPI'
  import axios from 'axios'

  export default {
    data(){
      return {
        token:''
      };
    },
    methods: {
      login(){
        if (this.token === '') {
          alert('输入token');
          return false;
        }
        axios.post(BaseAPI.baseUrl + '/accesstoken', {
          accesstoken: this.token
        }).then((response) => {
          if (response.statusText === 'OK') {
            let user = {
              loginname: response.data.loginname,
              avatar_url: response.data.avatar_url,
              userId: response.data.id,
              token: this.token
            }
            window.sessionStorage.user = JSON.stringify(user);
            this.$store.dispatch('setUserInfo', user);
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            this.$router.push({
              path: redirect
            });
          }
          console.log(response);
        }).catch((error) => {
          alert(error);
        });
      }
    },
    mounted() {
      setTimeout(()=>{
        console.log(this.$store.state.userInfo)
      }, 2000)
    },
    components: {
      topNav
    }
  }
</script>
<style lang="scss">
  body{
    background: none;
  }
  .login-info{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding: 0 14px;
    input{
      margin-top: 40px;
      margin-bottom: 60px;
      height: 40px;
      border: none;
      border-bottom: 1px solid rgb(46, 139, 87);
      outline: none;
    }
    button{
      height: 40px;
      background-color: rgb(46, 139, 87);
      color: #ffffff;
      border-radius: 5px;
      text-align: center;
      border: none;
      outline: none;
    }
  }
</style>
