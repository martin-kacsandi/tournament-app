<template>
  <div class="team-container">
    <b-container align="left">
      <h1 v-if="$route.matched[0].name == 'team_create'">Create new team</h1>
      <h1 v-else>Edit team</h1>
      <form id="createTeam">
        <b-form-group label="Name" label-for="nameInput">
          <b-form-input
            name="nameInput"
            v-model="$v.name.$model"
            :state="$v.name.$dirty ? !$v.name.$error : null"
            aria-describedby="validation"
          ></b-form-input>
          <b-form-invalid-feedback id="validation">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Short Name" label-for="shortNameInput">
          <b-form-input
            name="shortNameInput"
            v-model="$v.shortName.$model"
            :state="$v.shortName.$dirty ? !$v.shortName.$error : null"
            aria-describedby="snValidation"
          ></b-form-input>
          <b-form-invalid-feedback
            id="snValidation"
          >This is a required field and has to be at least 3 characters.</b-form-invalid-feedback>
        </b-form-group>

        <h2>Players</h2>

        <b-form-group label="Top" label-for="topInput">
          <b-form-input
            name="topInput"
            v-model="$v.top.$model"
            :state="$v.top.$dirty ? !$v.top.$error : null"
            aria-describedby="topV"
          ></b-form-input>
          <b-form-invalid-feedback id="topV">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Jungle" label-for="jglInput">
          <b-form-input
            name="jglInput"
            v-model="$v.jgl.$model"
            :state="$v.jgl.$dirty ? !$v.jgl.$error : null"
            aria-describedby="jglV"
          ></b-form-input>
          <b-form-invalid-feedback id="jglV">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Mid" label-for="midInput">
          <b-form-input
            name="midInput"
            v-model="$v.mid.$model"
            :state="$v.mid.$dirty ? !$v.mid.$error : null"
            aria-describedby="midV"
          ></b-form-input>
          <b-form-invalid-feedback id="midV">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Marksman" label-for="adcInput">
          <b-form-input
            name="adcInput"
            v-model="$v.adc.$model"
            :state="$v.adc.$dirty ? !$v.adc.$error : null"
            aria-describedby="adcV"
          ></b-form-input>
          <b-form-invalid-feedback id="adcV">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Support" label-for="sppInput">
          <b-form-input
            name="sppInput"
            v-model="$v.spp.$model"
            :state="$v.spp.$dirty ? !$v.spp.$error : null"
            aria-describedby="sppV"
          ></b-form-input>
          <b-form-invalid-feedback id="sppV">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-button
          class="button"
          v-if="$route.matched[0].name == 'team_create'"
          @click="addTeam"
          variant="success"
        >Create team</b-button>
        <b-button class="button" v-else @click="updateTeam" variant="success">Save team</b-button>
        <router-link to="/teams">
          <b-button class="button" variant="outline-primary">Cancel</b-button>
        </router-link>
      </form>
    </b-container>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'team_create',
  data () {
    return {
      id: '',
      name: '',
      shortName: '',
      top: '',
      jgl: '',
      mid: '',
      adc: '',
      spp: ''
    }
  },
  validations: {
    name: {
      required
    },
    shortName: {
      required,
      minLength: minLength(3)
    },
    top: {
      required
    },
    jgl: {
      required
    },
    mid: {
      required
    },
    adc: {
      required
    },
    spp: {
      required
    }
  },
  methods: {
    addTeam: function () {
      this.$v.$touch()
      if (this.$v.$anyError) {
        return
      }
      let self = this
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
        self.$router.push('/teams/' + self.shortName)
      })
    },
    updateTeam: function () {
      let self = this
      db.collection('teams').doc(self.id).update({
        name: self.name,
        shortName: self.shortName,
        players: {
          top: self.top,
          jgl: self.jgl,
          mid: self.mid,
          adc: self.adc,
          spp: self.spp
        }
      }).then(() => {
        self.$router.push('/teams/' + self.shortName)
      })
    }
  },
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
