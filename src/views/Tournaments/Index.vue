<template>
  <div class="tournaments-container">
    <b-container align="left">
      <h1>Tournaments</h1>
      <b-table class="mt-3" outlined hover :items="items" :fields="fields">
        <template v-slot:cell(name)="data">
          <a
            href="#"
            v-if="data.item.isPrivate"
            @click="itemClicked(data.item)"
            v-b-modal.modal-1
          >{{ data.value }}</a>
          <a v-else :href="data.item.route">{{ data.value }}</a>
        </template>
      </b-table>
       <router-link to="/tournaments/create">
        <b-button variant="primary">Add New Tournament</b-button>
      </router-link>
    </b-container>
    <b-modal id="modal-1" title="Password" @ok="checkPassword">
      <p class="my-4">Please enter the tournament's password</p>
      <b-input type="password" v-model="submittedPassword"></b-input>
      <p class="wrong-password-p" v-if="wrongPassword">Wrong Password</p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Tournament, Matches } from '@/types'

import { db } from '@/firebase/db'
import moment from 'moment'

@Component
export default class Tournaments extends Vue {
  fields: string[] = [ 'name', 'date' ];
  items:Tournament[] = [];
  submittedPassword: string = '';
  selectedItem: Tournament = new Tournament('', '', '', '', false);
  wrongPassword: boolean = false;

  checkPassword (bvModalEvt: any) {
    bvModalEvt.preventDefault()
    if (this.selectedItem.password === this.submittedPassword) {
      this.$router.push(`tournaments/${this.selectedItem.name}`)
    } else {
      this.wrongPassword = true
    }
  }

  itemClicked (item: Tournament) {
    this.selectedItem = item
  }

  created () {
    db.collection('tournaments').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = new Tournament(
          doc.data().name,
          doc.data().link,
          moment(doc.data().date.toDate()).format('YYYY. MM. DD.'),
          doc.data().password,
          doc.data().private,
          doc.data().matches,
          `/tournaments/${doc.data().name}`)
        this.items.push(data)
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
