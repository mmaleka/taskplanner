<template>
  <div>
    
    <v-main>

    
    <v-app-bar
      color="#4e4d91"
      dense
      dark
      app
    >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
            <span class="font-weight-light">Task</span>
            <span>planner</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        

        


    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="">
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title>
                hi  {{ $store.getters.userName1 }}
            </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
            <v-list-item-content>
                <router-link 
                class="router_link" 
                to="/"
                >
                    <v-btn block color="" dark>My Schedule</v-btn>
                </router-link>
                <router-link 
                class="router_link" 
                to="/register"
                >
                    <v-btn block color="" dark>Register</v-btn>
                </router-link>
                <router-link 
                class="router_link" 
                to="/login"
                >
                    <v-btn block color="" dark>Login</v-btn>
                </router-link>

                <!-- <router-link 
                class="router_link" 
                to="/schedule"
                >
                    <v-btn block color="" dark>My Schedule</v-btn>
                </router-link> -->

                <!-- <router-link 
                class="router_link" 
                to="/complete"
                >
                    <v-btn block color="" dark>Complete Tasks</v-btn>
                </router-link> -->

            </v-list-item-content>
        </v-list-item>
    </v-navigation-drawer>

    
    <router-view/>


    </v-main>
  </div>
</template>
<script>


export default {
    name: 'NavBar',
    components: {
        
    },
    data() {
        return {
            drawer: false
        }
    },
}
</script>

<style>

.router_link{
    text-decoration: none; color: inherit;
}

</style>