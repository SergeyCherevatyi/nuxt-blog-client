<template>
  <div class="page-wrap">
    <b-breadcrumb class="mb">
      <b-breadcrumb-item to="/admin/list">Posts</b-breadcrumb-item>
      <b-breadcrumb-item>{{post.title}}</b-breadcrumb-item>
    </b-breadcrumb>

    <b-form
      class="comment-form"
      :model:="controls"
      ref="form"
      @submit.prevent="onSubmit"
    >
      <b-form-group label="Text in .md or .html format" prop="text">
        <b-form-textarea
          v-model.trim="controls.text"
          :state="textState"
          resize="none"
          :rows="10"
        />
        <b-form-invalid-feedback>
          The text must not be empty.
        </b-form-invalid-feedback>
        <b-form-text>
          <span class="mr"> <fa icon="clock" /> {{ post.date | date }}</span>
          <span> <fa icon="eye" /> {{ post.views }}</span>
        </b-form-text>

      </b-form-group>

      <b-button
        class="btn-log mt-3"
        type="submit"
        variant="primary"
        pill
        :disabled="disabled"
      >
        Update
      </b-button>
    </b-form>

  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head() {
    return {
      title: `${this.post.title } | ${process.env.appName}`
    }
  },
  validate({params}) {
    return Boolean(params.id)
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('posts/fetchAdminById', params.id)
    return {post}
  },
  data() {
    return {
      disabled: false,
      controls: {
        text: ''
      }
    }
  },
  computed: {
    textState() {
      return this.controls.text.length > 4 ? true : false
    }
  },
  mounted() {
    this.controls.text = this.post.text
  },
  methods: {
    onSubmit() {
      const validate = async () => {
        this.disabled = true
        try {
          if (this.textState) {

            const formData = {
              text: this.controls.text,
              id: this.post._id
            }

            await this.$store.dispatch('posts/update', formData)

            this.$toast.success('Post has been updated.')
            this.disabled = false

          } else {
            this.$toast.error('The text must not be empty.')
            this.disabled = false
          }
        } catch (e) {
          console.log('error', e)
          this.disabled = false
        }
      }
      validate()
    }
  }
}
</script>

<style scoped lang="scss">
  .page-wrap {
    width: 600px;
  }

  .mr {
    margin-right: 2rem;
  }
</style>

