<template>
  <b-form-group :label="lane" :label-for="lane + 'Input'">
    <b-form-input
      :name="lane + 'Input'"
      v-model="$v.lane.$model"
      :state="$v.lane.$dirty ? !$v.lane.$error : null"
      :aria-describedby="lane + 'V'"
    ></b-form-input>
    <b-form-invalid-feedback :id="lane + 'V'">This is a required field.</b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  props: ['lane', '$v'],
  data () {
    return {
    }
  }
}
</script>
