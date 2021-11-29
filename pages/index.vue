<template>
  <b-row class="justify-content-lg-center">
    <b-col :xs="24" :sm="18" :md="12" :lg="8" >
      <app-post
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </b-col>
  </b-row>

</template>

<script>
import AppPost from '@/components/main/Post'
export default {
  head: {
    title: `Main | ${process.env.appName}`
  },
  async asyncData({store}) {
    const posts = await store.dispatch('posts/fetch')
    return {posts}
  },
  layout: 'main',
  components: {
    AppPost
  }
}
</script>

<style lang="scss" scoped>

</style>
