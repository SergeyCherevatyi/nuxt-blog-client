<template>
  <b-card class="comment">
    <div class="comment-header">
      <span>{{comment.name}}</span>
      <span><fa icon="clock" /> {{new Date(comment.date).toLocaleString()}}</span>
    </div>
    <div class="comment-text">
      {{comment.text}}
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}

</script>

<style lang="scss" scoped>
  .comment {
    margin-bottom: 1rem;
  }
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    font-size: .8rem;
  }
  .comment-text {
    white-space: pre-line;
  }
  .comment {
    box-shadow: 1.5px 1.5px 1.5px black;
  }
</style>
