<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{post.title}}</h1>
        <nuxt-link to="/"><fa icon="arrow-left" /> Back</nuxt-link>



      </div>
      <div class="post-info">
        <small><fa icon="clock" /> {{post.date | date}}</small>
        <small>
          <fa icon="eye" /> {{post.views}}
        </small>
      </div>
      <div class="post-image">
        <img :src="`/images${post.imageUrl}`">
      </div>
    </header>
    <main class="post-content">
      <vue-mark>{{post.text}}</vue-mark>
    </main>
    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createCommentHandler"
        :postId="post._id"
      />

      <div class="comments" v-if="post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>No comments yet</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'


export default {
  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  layout: 'main',
  validate({params}) {
    return Boolean(params.id)
  },
  components: {
    AppComment,
    AppCommentForm,
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('posts/fetchById', params.id)
    await  store.dispatch('posts/addView', post)
    return {
      post: {...post, views: ++post.views}
    }
  },
  data() {
    return {
      canAddComment: true
    }
  },
  methods: {
    createCommentHandler(comment) {
      this.post.comments.unshift(comment)
      this.canAddComment = false
    }
  }

}
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }
  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .post-image img {
    width: 100%;
    height: auto;
  }
  .post-header {
    margin-bottom: 1.5rem;
  }
  .post-content {
    margin-bottom: 2rem;
  }
</style>
