<template>
  <div class="team-container">
    <b-container align="left">
      <h1 v-if="$route.matched[0].name == 'team_create'">Create new team</h1>
      <h1 v-else>Edit team</h1>
      <ValidationObserver v-slot="{ invalid }" ref="teamForm">
        <form id="createTeam" @submit.prevent="submitTeam">
          <b-form-group label="Name" label-for="nameInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="nameInput"
                v-model="name"
                :state="v.validated ? v.valid : null"
                aria-describedby="validation"
              ></b-form-input>
              <b-form-invalid-feedback id="validation">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Short Name" label-for="shortNameInput">
            <ValidationProvider rules="required|min:3" v-slot="v">
              <b-form-input
                name="shortNameInput"
                v-model="shortName"
                :state="v.validated ? v.valid : null"
                aria-describedby="snValidation"
              ></b-form-input>
              <b-form-invalid-feedback
                id="snValidation"
              >{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <h2>Players</h2>

          <b-form-group label="Top" label-for="topInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="topInput"
                v-model="top"
                :state="v.validated ? v.valid : null"
                aria-describedby="topV"
              ></b-form-input>
              <b-form-invalid-feedback id="topV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Jungle" label-for="jglInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="jglInput"
                v-model="jgl"
                :state="v.validated ? v.valid : null"
                aria-describedby="jglV"
              ></b-form-input>
              <b-form-invalid-feedback id="jglV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Mid" label-for="midInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="midInput"
                v-model="mid"
                :state="v.validated ? v.valid : null"
                aria-describedby="midV"
              ></b-form-input>
              <b-form-invalid-feedback id="midV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Marksman" label-for="adcInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="adcInput"
                v-model="adc"
                :state="v.validated ? v.valid : null"
                aria-describedby="adcV"
              ></b-form-input>
              <b-form-invalid-feedback id="adcV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Support" label-for="sppInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="sppInput"
                v-model="spp"
                :state="v.validated ? v.valid : null"
                aria-describedby="sppV"
              ></b-form-input>
              <b-form-invalid-feedback id="sppV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>
          <b-button type="submit" class="button" variant="success">Save team</b-button>
          <router-link to="/teams">
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

import { db } from '@/firebase/db'
import { ValidationObserver, validate } from 'vee-validate'
import * as rules from '@/rules/rules'

@Component
export default class TeamCreate extends Vue {
  id: string = ''
  name: string = ''
  shortName: string = ''
  top: string = ''
  jgl: string = ''
  mid: string = ''
  adc: string = ''
  spp: string = ''
  $refs!: {
    teamForm: InstanceType<typeof ValidationObserver>;
  }

  submitTeam () {
    this.$refs.teamForm.validate(rules).then((success) => {
      if (!success) {
        return
      }
      if (this.$route.matched[0].name === 'team_create') {
        this.addTeam()
      } else if (this.$route.matched[0].name === 'team_edit') {
        this.updateTeam()
      }
    })
  }

  addTeam () {
    db.collection('teams').add({
      name: this.name,
      shortName: this.shortName,
      players: {
        top: this.top,
        jgl: this.jgl,
        mid: this.mid,
        adc: this.adc,
        spp: this.spp
      }
    }).then(() => {
      this.$router.push('/teams/' + this.shortName)
    })
  }

  updateTeam () {
    db.collection('teams').doc(this.id).update({
      name: this.name,
      shortName: this.shortName,
      players: {
        top: this.top,
        jgl: this.jgl,
        mid: this.mid,
        adc: this.adc,
        spp: this.spp
      }
    }).then(() => {
      this.$router.push('/teams/' + this.shortName)
    })
  }
  created () {
    let routerShortName = this.$route.params.shortName
    if (routerShortName) {
      let query = db.collection('teams').where('shortName', '==', routerShortName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.id = doc.id
          this.name = doc.data().name
          this.shortName = doc.data().shortName
          this.top = doc.data().players.top
          this.jgl = doc.data().players.jgl
          this.mid = doc.data().players.mid
          this.adc = doc.data().players.adc
          this.spp = doc.data().players.spp
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

  b-button{
    margin: 20px 10px;
  }
</style>
