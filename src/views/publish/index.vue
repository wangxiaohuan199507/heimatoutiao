<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">
          发布文章
        </template>
      </bread-crumb>
      <!-- 容器 -->
      <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="formData.title" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <quill-editor v-model="formData.content" style="height:300px"></quill-editor>
        </el-form-item>
        <el-form-item style="margin-top:120px" prop="cover" label="封面">
          <el-radio-group v-model="formData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="channel_id" label="频道">
          <el-select v-model="formData.channel_id">
            <el-option v-for="item in channels" :value="item.id" :label="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="publishArticle()" type="primary">发布</el-button>
          <el-button @click="publishArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [], // 接收频道数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1-自动 0-无图 1-1张 3-3张
          images: [] // 放置封面地址数组
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 校验规则 title/content/channel-id 必填项
        title: [{ required: true, message: '文章标题不能为空' }, {
          min: 5,
          max: 30,
          message: '标题的长度是在5到30个字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]

      }
    }
  },
  watch: {
    // 接听事件 处理两个地址对应一个组件跳转的时候 组件不销毁 但是数据没有重置的问题
    $route: function (to, from) {
      if (to.params.articleId) {
        // 是修改
      } else {
        // 是发布
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1-自动 0-无图 1-1张 3-3张
            images: [] // 放置封面地址数组
          },
          channel_id: null // 频道id
        }
      }
    },
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = [] // 无图或者自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三图
      }
    }
  },
  methods: {
    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          // console.log('校验通过')
          // 判断是修改还是发布文章
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData // 请求体参数
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })
          // if(articleId) {
          //   // 调用修改文章接口
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // 查询参数
          //     data: this.formData // 请求体参数
          //   }).then(result => {
          //     this.$message({
          //     type: 'success',
          //     message: '保存成功'
          //   })
          //   // 跳转到文章列表页
          //   this.$router.push('/home/articles')
          //   })
          // } else {
          //   // 调用发布接口
          // this.$axios({
          //   url: '/articles',
          //   method: 'post',
          //   params: { draft }, // 查询参数
          //   data: this.formData // 请求体参数
          // }).then(() => {
          //   this.$message({
          //     type: 'success',
          //     message: '保存成功'
          //   })
          //   // 跳转到文章列表页
          //   this.$router.push('/home/articles')
          // })
          // }
        }
      })
    },
    // 通过id查询文章数据
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.loading = false
        this.formData = result.data // 将数据赋值data
      })
    }
  },

  created () {
    this.getChannels()
    // 获取id
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId) // 如果文章id存在 直接查询文章的数据
  }
}
</script>

<style>

</style>
