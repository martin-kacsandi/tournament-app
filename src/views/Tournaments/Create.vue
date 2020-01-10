<template>
  <div class="team-container">
    <b-container align="left">
      <h1 v-if="$route.matched[0].name == 'tournament_create'">Create new tournament</h1>
      <h1 v-else>Edit tournament</h1>
      <ValidationObserver v-slot="{ invalid }" ref="tournamentForm">
        <form id="createTournament" @submit.prevent="submitTournament">
          <b-form-group label="Name" label-for="nameInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="nameInput"
                v-model="tournament.name"
                :state="v.validated ? v.valid : null"
                aria-describedby="validationName"
              ></b-form-input>
              <b-form-invalid-feedback id="validationName">{{ v.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Private" label-for="privateInput">
            <ValidationProvider rules vid="tournament.isPrivate" v-slot="x">
              <b-form-checkbox v-model="tournament.isPrivate" name="privateInput" switch></b-form-checkbox>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Password" label-for="passwordInput" v-if="tournament.isPrivate">
            <ValidationProvider rules="required_if:tournament.isPrivate,true" v-slot="v">
              <b-form-input
                name="passwordInput"
                v-model="tournament.password"
                type="password"
                :state="v.validated ? v.valid : null"
                aria-describedby="validationPw"
              ></b-form-input>
              <b-form-invalid-feedback id="validationPw">{{ v.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Date" label-for="dateInput">
            <ValidationProvider rules="required" v-slot="v">
              <flatPickr
                :class="{'form-date': true, 'invalid': v.errors.length}"
                v-model="tournament.date"
                :config="flatpickrConfig"
                :state="v.validated ? v.valid : null"
                placeholder="Select date"
                aria-describedby="validationDate"
              ></flatPickr>
              <span
                class="error-message"
                v-if="v.errors.length"
                id="validationDate"
              >This field is required.</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Stream link" label-for="linkInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="linkInput"
                v-model="tournament.link"
                :state="v.validated ? v.valid : null"
                aria-describedby="validationLink"
              ></b-form-input>
              <b-form-invalid-feedback id="validationLink">{{ v.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <h4>Matchups</h4>

          <b-container>
            <b-row>
              <b-col>
                <b-form-group label="Match 1" label-for="t1m1Input">
                  <ValidationProvider rules="required" v-slot="v">
                    <b-form-select
                    name="t1m1Input"
                    v-model="tournament.matches.game1.team1"
                    aria-describedby="validationM1T1"
                    :options="teams"
                    :state="v.validated ? v.valid : null"
                    ></b-form-select>
                    <b-form-invalid-feedback id="validationM1T1">Select a team.</b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>

                <b-form-group label="VS" label-for="t1m2Input">
                  <ValidationProvider rules="required" v-slot="v">
                    <b-form-select
                    name="t1m2Input"
                    v-model="tournament.matches.game1.team2"
                    aria-describedby="validationM1T2"
                    :options="teams"
                    :state="v.validated ? v.valid : null"
                    ></b-form-select>
                    <b-form-invalid-feedback id="validationM1T2">Select a team.</b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Match 2" label-for="t2m1Input">
                  <ValidationProvider rules="required" v-slot="v">
                    <b-form-select
                    name="t2m1Input"
                    v-model="tournament.matches.game2.team1"
                    aria-describedby="validationM2T1"
                    :options="teams"
                    :state="v.validated ? v.valid : null"
                    ></b-form-select>
                    <b-form-invalid-feedback id="validationM2T1">Select a team.</b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
                <b-form-group label="VS" label-for="t2m1Input">
                  <ValidationProvider rules="required" v-slot="v">
                    <b-form-select
                    name="t2m2Input"
                    v-model="tournament.matches.game2.team2"
                    aria-describedby="validationM1T1"
                    :options="teams"
                    :state="v.validated ? v.valid : null"
                    ></b-form-select>
                    <b-form-invalid-feedback id="validationM2T2">Select a team.</b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col align="right">
                <b-button variant="primary" @click="randomTeams">Random</b-button>
              </b-col>
            </b-row>
          </b-container>
          <b-button type="submit" class="button" variant="success">Save team</b-button>
          <router-link :to="'/tournaments/' + tournament.name">
            <b-button class="button" variant="outline-primary">Cancel</b-button>
          </router-link>
        </form>
      </ValidationObserver>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Tournament, Matches } from '@/types'

import { db } from '@/firebase/db'
import { ValidationObserver } from 'vee-validate'
import * as rules from '@/rules/rules'
import * as flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import firebase from 'firebase/app'
import * as _ from 'lodash'
import moment from 'moment'

@Component({
  components: {
    flatPickr
  },
  name: 'tournament_create'
})
export default class TournamentCreate extends Vue {
  tournament: Tournament = new Tournament()
  flatpickrConfig: any = { dateFormat: 'Y. m. d.' };
  teams: string[] = [];
  $refs!: {
    tournamentForm: InstanceType<typeof ValidationObserver>;
  };

  submitTournament () {
    this.$refs.tournamentForm.validate(rules).then((success: boolean) => {
      if (!success) {
        return
      }
      if (this.$route.matched[0].name === 'tournament_create') {
        this.addTournament()
      } else if (this.$route.matched[0].name === 'tournament_edit') {
        this.updateTournament()
      }
    })
  }

  randomTeams () {
    let randomArray = _.shuffle(this.teams)

    this.tournament.matches.game1.team1 = randomArray[0]
    this.tournament.matches.game1.team2 = randomArray[1]
    this.tournament.matches.game2.team1 = randomArray[2]
    this.tournament.matches.game2.team2 = randomArray[3]
  }

  addTournament () {
    let date: Date = moment(this.tournament.date).toDate()
    db.collection('tournaments').add({
      name: this.tournament.name,
      date: firebase.firestore.Timestamp.fromDate(date),
      link: this.tournament.link,
      password: this.tournament.password,
      private: this.tournament.isPrivate,
      matches: this.tournament.matches
    }).then(() => {
      this.$router.push('/tournaments/' + this.tournament.name)
    })
  }

  updateTournament () {
    db.collection('tournaments').doc(this.tournament.id).update({
      name: this.tournament.name,
      date: firebase.firestore.Timestamp.fromDate(moment(this.tournament.date).toDate()),
      link: this.tournament.link,
      password: this.tournament.password,
      private: this.tournament.isPrivate,
      matches: this.tournament.matches
    }).then(() => {
      this.$router.push('/tournaments/' + this.tournament.name)
    })
  }

  created () {
    db.collection('teams').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.teams.push(doc.data().name)
      })
    })

    let routerId = this.$route.params.id
    if (routerId) {
      db.collection('tournaments').where('name', '==', routerId).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.tournament.id = doc.id
          this.tournament.name = doc.data().name
          this.tournament.date = doc.data().date.toDate()
          this.tournament.link = doc.data().link
          this.tournament.isPrivate = doc.data().private
          this.tournament.password = doc.data().password
          this.tournament.matches = doc.data().matches
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .error{
    color: #f00;
    font-size: 14px;
    margin: 0;
  }

  .form-date{
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0;

    &.invalid{
      border-color: #dc3545;
    }
  }

  .error-message{
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
