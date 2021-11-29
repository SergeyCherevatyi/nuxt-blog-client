<template>
  <div>
    <h1 class="mb-4">Create new post.</h1>
    <b-form
      class="comment-form"
      :model:="controls"
      ref="form"
      @submit.prevent="onSubmit"
    >
      <b-form-group label="Enter post title" prop="title">
        <b-form-input
          v-model.trim="controls.title"
          :state="titleState" />
        <b-form-invalid-feedback>
          The text must not be empty.
        </b-form-invalid-feedback>
        <b-form-text>
          Your Title.
        </b-form-text>
      </b-form-group>


      <b-form-group label="Text in .md or .html format" prop="text">
        <b-form-textarea
          v-model="controls.text"
          :state="textState"
          resize="none"
          :rows="10"
        />
        <b-form-invalid-feedback>
          The text must not be empty.
        </b-form-invalid-feedback>
        <b-form-text>
          Your text.
        </b-form-text>
      </b-form-group>

<!--      <div class="input-group mb-3 mt-4">-->
<!--        <input-->
<!--          type="file"-->
<!--          class="form-control"-->
<!--          id="inputGroupFile02"-->
<!--          @change="handleImageChange"-->
<!--        >-->
<!--        <label class="input-group-text" for="inputGroupFile02">Upload </label>-->
<!--      </div>-->

      <div>
        <b-form-file
          class="mt-3"
          plain
          @change="handlerImageFile"
          ref="file-input"
        ></b-form-file>
      </div>

      <b-button
        class="btn-log mt-3"
        variant="success"
        @click="handleModal"
        pill
      >
        Preview
      </b-button>

      <b-modal ref="my-modal" id="prevModal" scrollable hide-footer title="Preview" size="xl">
        <div class="d-block text-center">
          <div :key="controls.text">
            <vue-mark>{{controls.text}}</vue-mark>
          </div>
        </div>

      </b-modal>

      <b-button
        class="btn-log mt-3"
        type="submit"
        variant="primary"
        pill
        :disabled="disabled"
      >
        Create post
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  head: {
    title: `Create post | ${process.env.appName}`
  },
  layout: 'admin',
  middleware: ['admin-auth'],
  data() {
    return {
      image: null,
      disabled: false,
      controls: {
        title: '',
        text: '',
      }
    }
  },
  computed: {
    textState() {
      return this.controls.text.length > 0 ? true : false
    },
    titleState() {
      return this.controls.title.length > 0 ? true : false
    }
  },
  methods: {
    handleModal() {
      this.$bvModal.show('prevModal')
    },
    handlerImageFile(event) {
      this.image = event.target.files.item(0)
    },
    onSubmit() {
      const validate = async () => {
        this.disabled = true
        try {
          if (this.textState && this.titleState && this.image) {
            const formData = {
              title: this.controls.title,
              text: this.controls.text,
              image: this.image
            }
            await this.$store.dispatch('posts/create', formData)

            this.$toast.success('Post has been created.')
            this.controls.title = ''
            this.controls.text = ''
            this.image = null
            this.$refs['file-input'].reset()
          } else {
            this.$toast.error('Form not valid.')
          }
        } catch (e) {
          console.log('error', e)
        } finally {
          this.disabled = false
        }
      }
      validate()
    }
  }

}

</script>

<style scoped lang="scss">

</style>
