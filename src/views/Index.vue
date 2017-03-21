<template>
    <div>
      <img src="../assets/images/index.png" alt="">
    </div>
</template>
<script>
  export default {
      mounted() {
          setTimeout(()=>{
              this.$router.push('List')
          }, 2000)
      }
  }
</script>
<style lang="scss" scoped="scoped">
  img{
    display: block;
    width: 100%;
    background-color: #fff;
    margin-top: 80px;
  }
</style>
