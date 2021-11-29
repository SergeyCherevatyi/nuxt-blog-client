<template>
  <b-card
    :style="{width: '500px'}"
  >
    <b-form
      class="comment-form"
      :model:="controls"
      ref="form"
      @submit.prevent="onSubmit"
    >
      <h2>Login to admin panel</h2>
      <b-form-group label="Login" prop="login">
        <b-form-input
          v-model.trim="controls.login"
          required
        />
      </b-form-group>

      <b-form-group label="Password" prop="password" >
        <b-form-input
          v-model.trim="controls.password"
          type="password"
          required
        />
      </b-form-group>
      <b-button
        class="btn-log"
        type="submit"
        variant="primary"
        pill
        :disabled="disabled"
      >
        Log in
      </b-button>
    </b-form>
  </b-card>
</template>

<script>

// Todo improve validation
export default {
  layout: 'empty',
  head: {
    title: `Login to the admin panel | ${process.env.appName}`
  },
  data() {
    return {
      disabled: false,
      controls: {
        login: '',
        password: ''
      }
    }
  },
  mounted() {
    const { message } = this.$route.query

    switch (message) {
      case 'login':
        this.$toast.info('Please sign in')
        break
      case 'logout':
        this.$toast.info('You have successfully logged out')
        break
      case 'session':
        this.$toast.info('Your session has timed out, please login again')
        break
    }
  },
  methods: {
    onSubmit() {
    const validate = async () => {
      this.disabled = true
      try{
        if (this.controls.login.length >= 2 && this.controls.password.length >= 6) {

          const formData = {
            login: this.controls.login,
            password: this.controls.password
          }

          await this.$store.dispatch('auth/login', formData)

          this.$router.push('/admin')
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
.btn-log {
  margin-top: 1rem;
}
</style>
