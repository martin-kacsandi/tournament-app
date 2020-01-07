/* eslint-disable camelcase */

import { extend } from 'vee-validate'
import { required, required_if, min } from 'vee-validate/dist/rules'

extend('required_if', {
  ...required_if,
  message: 'This field is required'
})

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('min', {
  ...min,
  params: ['length'],
  message: 'This field must be at least {length} characters'
})
