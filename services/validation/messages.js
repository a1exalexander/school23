const isEmail = {
  'required': 'Email required',
  'valid': 'Please, enter a valid email',
}

const required = {
  'required': 'This field is required',
  'valid': 'This field is required',
}

const equals = {
  'required': 'This field is required',
  'valid': `This value does't match`,
}

const password = {
  'required': 'Password required',
  'valid': 'Please, enter a valid password',
  'lowerCase': 'Please, enter a lowercase character',
  'upperCase': 'Please, enter a uppercase character',
  'specialChars': 'Please, enter a special character',
  'oneNumber': 'Please, enter a number character',
  'minAmount': 'Please, enter a minimum of 8 characters',
}

const defaultMessages = {
  'required': 'This field is required',
  'valid': 'Please, enter a valid value',
}

export default { equals, isEmail, required, password, defaultMessages };
