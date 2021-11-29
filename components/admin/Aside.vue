<template>
  <div
    class="d-flex justify-content-between"
    :style="{height: '100%'}"
  >
    <!--Todo active item-->
    <b-nav
      vertical
      :style="{padding: '2rem 0 0 4.5rem' }"
      :default-active="$route.path"
    >
      <b-nav-item to="/admin" index="/analytic" class="btn btn-outline-secondary">
        <fa icon="book" />
        <span>Analytics</span>
      </b-nav-item>
      <b-nav-item to="/admin/create" index="/admin/create" class="btn btn-outline-secondary">
        <fa icon="pen" />
        <span>Create</span>
      </b-nav-item>
      <b-nav-item to="/admin/list" index="/admin/list" class="btn btn-outline-secondary">
        <fa icon="list" />
        <span>Posts</span>
      </b-nav-item>
      <b-nav-item to="/admin/user" index="/admin/user" class="btn btn-outline-secondary">
        <fa icon="user" />
        <span>Users</span>
      </b-nav-item>
      <b-nav-item to="/admin/logout" index="/admin/logout" class="btn btn-outline-secondary">
        <fa icon="arrow-right" />
        <span>Logout</span>
      </b-nav-item>
    </b-nav>
    <div class="line"></div>
  </div>

</template>


<script>

</script>

<style lang="scss" scoped>
  .line {
    border-left: 1px solid slategrey;
    height: 100%;
  }

</style>
