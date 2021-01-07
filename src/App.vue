<template>
  <v-app>
    <NavBar />
    <FloatingButton />
    <!-- <BottomNav /> -->
    <v-main>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar';
import FloatingButton from '@/components/FloatingButton';
// import BottomNav from './components/BottomNav';

export default {
  name: 'App',

  components: {
    NavBar,
    // BottomNav,
    FloatingButton,
  },

  data: () => ({
    //
  }),
};
</script>
