<template>
  <nav>

    <nuxt-link class="link logo" to="/">Blog</nuxt-link>
    <nuxt-link class="link" to="/admin">Administration</nuxt-link>
  </nav>
</template>

<style lang="scss" scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-bottom: 1px solid #e6e6e6;
  }
</style>

<script>

export default {

}
</script>

<style scoped lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    padding: 0 5rem;
  }
  .logo {
    font-size: 2.5rem;
  }
  .link {
    color: black;
    text-decoration: none;
  }
</style>
