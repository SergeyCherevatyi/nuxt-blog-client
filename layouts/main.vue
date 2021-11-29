<template>
  <div>
    <header>
      <app-navigation />
    </header>
    <b-container>
      <main>
        <nuxt/>
      </main>
      <footer />
    </b-container>
  </div>
</template>

<script>
 import AppNavigation from '@/components/main/Navigation'
export default {
  components: {
    AppNavigation
  }
}

</script>
