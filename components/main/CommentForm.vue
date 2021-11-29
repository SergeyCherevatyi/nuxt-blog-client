<template>
  <div>
    <b-form
      class="comment-form"
      :model:="controls"
      ref="form"
      @submit.prevent="onSubmit"
    >
      <h1>Add comment</h1>

      <b-form-group label="* Your Name" prop="name">
        <b-form-input
          v-model="controls.name"
          required
        />
      </b-form-group>

      <b-form-group label="* Comment text" prop="text">
        <b-form-textarea
          v-model="controls.text"
          resize="none"
          :rows="2"
          required
        />
      </b-form-group>

      <b-button
        class="btn-sub"
        type="submit"
        variant="primary"
        pill
        :disabled="disabled"
      >
        <fa icon="comment"></fa>
        Add comment
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      disabled: false,
      controls: {
        name: '',
        text: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      this.disabled = true

      const formData = {
        name: this.controls.name,
        text: this.controls.text,
        postId: this.postId
      }
    try {
      if (this.controls.name.length >= 2 && /^(([a-zA-Z' -]{1,80})|([а-яА-ЯЁёІіЇїҐґЄє' -]{1,80}))$/u.test(this.controls.name)) {

          const newComment = await this.$store.dispatch('comment/create', formData)
          console.log(newComment)
          this.$toast.success('Comment has been added')
          this.disabled = false
          this.$emit('created', newComment)
      } else {
        this.$toast.error('Invalid name')
        this.disabled = false
      }
    } catch (e) {
        console.log(e)
      this.disabled = false
    }
    }
  }
}

</script>

<style lang="scss" scoped>
  .comment-form {
    padding-bottom: 3rem;
  }
  .btn-sub {
    margin-top: 1rem;
  }
</style>
