<template>
  <div>
    <table class="table table-hover" >
      <thead>
      <tr>
        <th scope="col">Post</th>
        <th scope="col">Date</th>
        <th scope="col">Views</th>
        <th scope="col">Comments</th>
        <th scope="col">Operations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post of posts" :key="post.id">
        <td> <fa icon="book" /> {{ post.title }}</td>
        <td> <fa icon="clock" /> {{ post.date | date('date') }}</td>
        <td> <fa icon="eye" /> {{ post.views }}</td>
        <td> <fa icon="comments" /> {{ post.comments.length }}</td>
        <td :id="post.id">
          <b-button
            pill
            variant="outline-secondary"
            class="post-btn"
            @click="open(post._id)"
            v-b-tooltip.hover
            title="Open post"
          ><fa icon="pen" /></b-button>
          <b-button
            pill
            variant="outline-danger"
            @click="remove(post._id)"
            v-b-tooltip.hover
            title="Delete post"
          > <fa icon="trash" /></b-button>
        </td>

      </tr>
      </tbody>
    </table>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>

</template>

<script>
export default {
  head: {
    title: `Posts | ${process.env.appName}`
  },
  layout: 'admin',
  middleware: ['admin-auth'],
  async asyncData({store}) {
    const posts = await store.dispatch('posts/fetchAdmin')
    return {posts}
  },
  methods: {
    open(id) {
       this.$router.push(`/admin/post/${id}`)
    },
    async remove(id) {
      try {
        await this.$confirm(
          {
            message: `Delete post?`,
            button: {
              no: 'No',
              yes: 'Yes'
            },
             callback: async confirm => {
              if (confirm) {
                await this.$store.dispatch('posts/remove', id)
                this.posts = this.posts.filter(post => post._id !== id)
                this.$toast.success('Post has been deleted.')

              }
            }
          }
        )
      } catch (e) {
        console.error(e)
      }
    },
  }

}

</script>
