<template>
    <div>
      <div>
        <img :src="userInfo.avatar_url" alt="" class="avatar">
        <span>{{userInfo.loginname}}</span>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })

    }
  }
</script>
<style scoped="scoped" lang="scss">
  div>div{
    display: flex;
    flex-direction: column;
    align-items: center;
    img.avatar{
      display: block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    span{
      color: #ffffff;
      line-height: 30px;
    }
  }

</style>
