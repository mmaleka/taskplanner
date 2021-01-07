<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">

        <v-btn
        fab 
        dark 
        large 
        color="primary" 
        fixed 
        right 
        bottom
        v-bind="attrs"
        v-on="on"
        class="white text-center mb-16 mr-16"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add new item</span>
        </v-card-title>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="8">
                <ValidationObserver ref="observer" v-slot="{ }">
                    <form>
                    <ValidationProvider v-slot="{ errors }" name="item" rules="required|max:150">
                        <v-text-field
                        v-model="item"
                        :counter="150"
                        :error-messages="errors"
                        label="item"
                        required
                        ></v-text-field>
                    </ValidationProvider>
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
                          label="Due date"
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

                    <ValidationProvider v-slot="{ errors }" name="selectedGroup" rules="required">
                        <v-select
                        :items="all_categories"
                        :error-messages="errors"
                        v-model="selectedGroup"
                        label="Group"
                        item-text="name"
                        item-value="id"
                        required
                        ></v-select>
                    </ValidationProvider>

                    </form>
                </ValidationObserver>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="Addtodo(item, dialog, date, selectedGroup)"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { mapGetters, mapActions } from 'vuex';

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  name: 'FloatingButton',
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  methods: {
    ...mapActions(['fetchCatergories']),

    Addtodo(itemItem, dialog, date, selectedGroup){
      this.$refs.observer.validate()
      console.log(selectedGroup);
      // let user_id = VueJwtDecode.decode(this.$store.getters.userjwt).user_id
      const ItemData  = {
          itemItem: itemItem,
          dialog: dialog,
          date: date,
          group: selectedGroup,
          // user_id: user_id,
      }
      console.log(ItemData);
      ItemData.dialog = false
      // finally save the comment here
      this.$store.dispatch('AddItem', ItemData)
      this.fetchCatergories();
      // mapGetters(['all_categories'])
    },

    
  },

  computed: {
    ...mapGetters(['all_categories']),
    all_categories: function () {
      return this.$store.getters.all_categories;
    }
  },

  // computed: mapGetters(['all_categories']),
  created() {
    this.fetchCatergories();
  },

  data: () => ({
      dialog: false,
      item: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      selectedGroup: '',
  }),
}
</script>

<style>

.v-btn {
  min-width: 0;
}

</style>