<template>
  <b-container>
    <h1>{{ tournament.name }}</h1>
    <b-list-group align="left">
      <b-list-group-item>
        <div class="listElement">
          <span class="title">Name</span>
          <span class="value">{{ tournament.name }}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <div class="listElement">
          <span class="title">Private</span>
          <span class="value">{{ tournament.private ? "Yes" : "No" }}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <div class="listElement">
          <span class="title">Date</span>
          <span class="value">{{ tournament.date }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>
    <a :href="'//' + tournament.link" target="_blank">
      <b-button class="button">Watch</b-button>
    </a>
    <router-link :to="'/tournaments/' + tournament.name + '/edit'">
      <b-button class="button" variant="primary">Edit</b-button>
    </router-link>
    <b-button class="button" variant="danger" v-b-modal.modal-1>Delete</b-button>
    <b-modal id="modal-1" title="Deleting team" @ok="deleteTournament">
      <p class="my-4">Are you sure you want to delete this tournament?</p>
      <h2>{{this.tournament.name}}</h2>
    </b-modal>
  </b-container>
</template>

<script>
import { db } from '@/firebase/db'

export default {
  props: ['tournament'],
  data () {
    return {
    }
  },
  methods: {
    deleteTournament: function () {
      let self = this
      db.collection('tournaments').doc(self.tournament.id).delete().then(() => {
        self.$router.push('/tournaments')
      })
    }
  }
}
</script>
