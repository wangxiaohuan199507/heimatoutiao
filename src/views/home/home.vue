<template>
  <!-- 走马灯 -->
    <el-carousel height="500px" type="card" :interval="5000" arrow="always">
        <el-carousel-item  v-for="item in list" :key="item">
            <img :src="item" alt="">
        </el-carousel-item>

    </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['https://www.veer.com/topic/497/', 'https://www.veer.com/topic/145/', 'https://www.veer.com/topic/185/', 'https://www.veer.com/topic/78/', 'https://www.veer.com/topic/76/', 'https://www.veer.com/topic/77/']
    }
  }
}
</script>

<style>

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
