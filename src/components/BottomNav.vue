<template>
  <v-container>

  
  <v-bottom-navigation
    :value="value"
    color="teal"
    fixed
    grow
  >

    <router-link
      class="router_link" 
      to="/group/1"
      >
      <v-btn>
        <span>Nearby</span>

        <v-icon>fas fa-tachometer-alt</v-icon>
      </v-btn>
    </router-link>

    <router-link
      class="router_link" 
      to="/group/2"
      >
      <v-btn>
        <span>Nearby</span>

        <v-icon>fab fa-vuejs</v-icon>
      </v-btn>
    </router-link>



  </v-bottom-navigation>
  </v-container>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
// import VueJwtDecode from 'vue-jwt-decode';

export default {
  name: 'BottomNav',
  data: () => ({ value: 1 }),

}
</script>

<style>

</style>