<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link to="/cart">Cart ({{ cartCount }})</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        <router-link to="/goose">Goose</router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link to="/axios">Axios test</router-link>
      </li>      
    </ol>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'cartCount'
    ])
  }
}
</script>
