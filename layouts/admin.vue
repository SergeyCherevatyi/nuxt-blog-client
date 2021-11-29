<template>
  <div class="admin-wrap">
    <b-container :style="{height: '100%'}" >
      <b-row :style="{height: '100%'}">
        <b-col :lg="3">
          <AppAside />
        </b-col>
        <b-col class="mt-3">
          <nuxt/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AppAside from '@/components/admin/Aside'
export default {
  components: {
    AppAside
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      this.$toast.error(value.response.data.message)
    }
  }
}

</script>

<style lang="scss" scoped>
.admin-wrap {
  width: 100%;
  height: 100vh;
}

</style>
