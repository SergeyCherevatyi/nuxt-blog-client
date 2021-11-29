<template>
    <b-card
      class="post"
    >
      <b-card-header class="header">
        <h2>{{post.title}}</h2>
          <span> <fa icon="clock" /> {{ post.date | date }}</span>
      </b-card-header>
        <b-card-img
          :src="`images${post.imageUrl}`"
          alt="Image"
          class="post-img"
        />
      <b-card-footer class="footer">
        <b-button pill variant="outline-secondary" class="post-btn" @click="openPost">Open</b-button>

        <span>
           <fa icon="comments" /> {{ post.comments.length }}
        </span>
      </b-card-footer>
    </b-card>
</template>

<script>
export default {
  // Todo check link! 10 string
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost() {
      const id = this.post._id
      this.$router.push(`/post/${id}`)
    }
  }
}

</script>

<style lang="scss" scoped>
  .card-body {
    padding: 0;
  }
  .post {
    margin-bottom: 1.5rem;
  }
  .post:hover {
    box-shadow: 0 0 0 1.5px #b0bec5
  ;
    transition: box-shadow .3s linear;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .post-img {
    width: 100%;
    height: auto;
  }
  .post-btn {
    width: 10rem;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

</style>
