import { Validator } from 'vee-validate'

const existRule = {
  validate(value, { searchTermValue, searchTermName, loading }) {
    return { 
      valid: searchTermValue != undefined 
        && searchTermValue != null 
        && searchTermValue != '' 
        && value != undefined 
        && value != null 
        && value != '',
      data: {
        required: true,
      },
    }
  }
}

Validator.extend('exist', existRule, {
  computesRequired: true,
  paramNames: [ 'searchTermValue', 'searchTermName',  'loading' ],
  hasTarget: true,
})