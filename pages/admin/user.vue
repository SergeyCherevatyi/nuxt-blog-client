<template>
  <b-form
    class="comment-form"
    :model:="controls"
    ref="form"
    @submit.prevent="onSubmit"
  >
    <h2>Create user</h2>
    <b-form-group label="Login" prop="login">
      <b-form-input
        v-model.trim="controls.login"
        :state="loginState" />
      <b-form-invalid-feedback>
        Enter at least 2 letters
      </b-form-invalid-feedback>
      <b-form-text>
        Your Login.
      </b-form-text>
    </b-form-group>

    <b-form-group label="Login" prop="login">
      <b-form-input
        v-model.trim="controls.password"
        :state="passState"
        type="password"
      />
      <b-form-invalid-feedback>
        Enter at least 8 letters
      </b-form-invalid-feedback>
      <b-form-text>
        Your Password.
      </b-form-text>
    </b-form-group>

    <b-button
      class="btn-log mt-3"
      type="submit"
      variant="primary"
      pill
      :disabled="disabled"
    >
      Create
    </b-button>
  </b-form>
</template>

<script>
export default {
  layout: 'admin',
  head: {
    title: `Create user | ${process.env.appName}`
  },
  middleware: ['admin-auth'],
  data() {
    return {
      disabled: false,
      controls: {
        login: '',
        password: ''
      }
    }
  },
  computed: {
    loginState() {
      return this.controls.login.length > 1 ? true : false
    },
    passState() {
      return this.controls.password.length > 7 ? true : false
    }
  },
  methods: {
    onSubmit() {
      const validate = async () => {
        this.disabled = true
        try{
          if (this.loginState && this.passState) {

            const formData = {
              login: this.controls.login,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/createUser', formData)
            this.$toast.success('New user has benn added')
            this.controls.login = ''
            this.controls.password = ''
            this.disabled = false

          } else {
            this.$toast.error('Invalid login or password')
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

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
