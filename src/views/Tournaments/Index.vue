<template>
  <div class="tournaments-container">
    <h1>Tournaments</h1>
    <b-container>
      <b-table class="mt-3" outlined hover :items="items" :fields="fields">
        <template v-slot:cell(name)="data">
          <a
            href="#"
            v-if="data.item.private"
            v-b-modal.modal-1
            @click="sendItem(data.item)"
          >{{ data.value }}</a>
          <a :href="data.item.route" v-else>{{ data.value }}</a>
        </template>
      </b-table>
    </b-container>
    <router-link to="/tournaments/create">
      <b-button variant="success">Add New Tournament</b-button>
    </router-link>
    <b-modal id="modal-1" title="Password" @ok="checkPassword">
      <p class="my-4">Please enter the password to this championship</p>
      <b-input type="password" v-model="submittedPassword"></b-input>
      <p class="wrong-password-p" v-if="wrongPassword">Wrong Password</p>
    </b-modal>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import * as moment from 'moment'

export default {
  name: 'tournaments',
  data () {
    return {
      fields: [ 'name', 'date' ],
      items: [],
      submittedPassword: '',
      selectedItem: null,
      wrongPassword: false
    }
  },
  methods: {
    checkPassword: function (bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.selectedItem.password === this.submittedPassword) {
        this.$router.push(`tournaments/${this.selectedItem.name}`)
      } else {
        this.wrongPassword = true
      }
    },
    sendItem: function (item) {
      this.selectedItem = item
    }
  },
  created () {
    const self = this
    db.collection('tournaments').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          name: doc.data().name,
          private: doc.data().private,
          date: moment(doc.data().date.toDate()).format('YYYY. MM. DD. hh:mm'),
          password: doc.data().password,
          route: `/tournaments/${doc.data().name}`
        }
        self.items.push(data)
      })
    })
  }
}
</script>

<style lang="scss">
.wrong-password-p{
  color: #f00;
}
</style>
