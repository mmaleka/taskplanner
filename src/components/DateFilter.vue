<template>
  <v-container fill-height fluid>

    <v-row
    align='center'
    justify='center'
    >
      <v-col
      cols="8"
      sm="6"
      md="4"
      >

      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>

      </v-col>
    </v-row>

    <v-row>
    <v-col>
    <!-- <v-list
      v-for="cat in all_categories" :key="cat.id"
      flat
      subheader
      three-line
    > -->
      <!-- <v-subheader>{{ cat.name }}</v-subheader> -->


      <div
      v-for="item in all_todos"
      :key="item.id"
      >
        <div
        
        >
        <v-list-item-group
          multiple
          active-class=""
        >
          <v-list-item>
            <template>

              <v-checkbox
                v-model="item.done"
                :label="`${item.item}`"
                @click="EditItem(item.id, item.done, item.item)"
              ></v-checkbox>

              <v-spacer></v-spacer>
              
              <v-btn
                depressed
                @click="DeleteItem(item.id)"
              >
                  <v-icon center>mdi-delete</v-icon>
              </v-btn>


            </template>
          </v-list-item>

        </v-list-item-group>
        </div>
      </div>
      
    <!-- </v-list>       -->
    </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
    name: 'DateFilter',
    components: {
    },
    data: () => ({

      disabled: false,
      dense: true,
      twoLine: true,
      threeLine: false,
      shaped: false,
      flat: false,
      subheader: false,
      inactive: false,
      subGroup: false,
      nav: false,
      avatar: false,
      rounded: false,
      checkbox1: true,

      date: new Date().toISOString().substr(0, 10),
    //   date: '',
      menu: false,
      modal: false,
      menu2: false,

    }),

    
    
    methods: {
        ...mapActions(['fetchCatergories', 'fetchTodos']),

        EditItem(itemId, itemDone, itemItem){
        // let user_id = VueJwtDecode.decode(this.$store.getters.userjwt).user_id
        const ItemData  = {
            itemId: itemId,
            itemDone: itemDone,
            itemItem: itemItem
            // user_id: user_id,
        }
        // finally save the comment here
        this.$store.dispatch('EditItem', ItemData)
        // mapGetters(['product_comments'])
        },

        DeleteItem(itemId){
        const ItemData  = {
            itemId: itemId,
        }
        this.$store.dispatch('DeleteItem', ItemData)
        this.fetchCatergories();
        mapGetters(['all_categories', 'all_todos'])
        },

        FetchTodos(){
            console.log("fetch to dos here");
            // this.interval = setInterval(() => {
            // // let filter_date = this.date;
            //     console.log("this.date: ", this.date);
            //     this.fetchTodos(this.date)}, 3000);
        },


    },

    computed: {
      ...mapGetters(['all_categories', 'all_todos']),
      all_categories: function () {
        return this.$store.getters.all_categories;
      },

      all_todos: function () {
          return this.$store.getters.all_todos
      },
      
    },


    mounted() {
        
        this.FetchTodos()
        this.interval = setInterval(() => {
          // let filter_date = this.date;
          console.log("this.date: ", this.date);
          this.fetchTodos(this.date)}, 1000);
    },

    
}
</script>

<style>

</style>