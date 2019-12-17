<template>
  <b-form-group :label="name">
    <b-input :id="name.toLowerCase().replace(' ', '-')" @input="changeMessage" :value="value"></b-input>
    <p v-if="error" class="error" >{{name}} is required</p>
  </b-form-group>
</template>

<script>
export default {
  props: ['name', 'error', 'value'],
  data () {
    return {
      input: ''
    }
  },
  methods: {
    changeMessage (event) {
      this.input = event
      this.$emit('inputChanged', this.input)
    }
  }
}
</script>
