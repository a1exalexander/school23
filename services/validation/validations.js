const validation = {
  password: (password) => {
    // eslint-disable-next-line
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~])(?=.{8,})/;
    return re.test(password);
  },
  lowerCase: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[a-z])/;
    return re.test(value);
  },
  upperCase: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[A-Z])/;
    return re.test(value);
  },
  specialChars: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~])/;
    return re.test(value);
  },
  oneNumber: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[0-9])/;
    return re.test(value);
  },
  minAmount: (value, n) => {
    return String(value).length >= Number(n);
  },
  digit: (value) => {
    const re = /\d+/g;
    return re.test(value);
  },
  age: (value) => {
    const re = /^(([1-9]\d?)|(1([0-6]\d)?))$/g;
    return re.test(value) && value > 15 && value < 160;
  },
  onlyPhone: (value) => {
    // eslint-disable-next-line
    const re = /^([0-9\s\-\+\(\)]+)$/g;
    return re.test(value);
  },
  phone(phone) {
    // eslint-disable-next-line
    const re = /^(((\(\+\d{2}([0-9])\)\s?)|(\+?\d{2}[0-9]\s?)|(\d?[0-9]))(\d{2}\s?\-?(\d){3}\-?\s?(\d{2})\-?\s?(\d{2})))$/;
    return re.test(phone);
  },
  email: (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    return re.test(email);
  },
  emailAt: (value) => {
    // eslint-disable-next-line
    const re = /\@/g;
    return re.test(value);
  },
  emailDomain: (value) => {
    // eslint-disable-next-line
    const re = /\@[\w\-]+\.\w{2,}/g;
    return re.test(value);
  },
  name: (value) => {
    // eslint-disable-next-line
    const re = /\d+/g;
    const re2 = /^\S+\S/g;
    return !re.test(value) && re2.test(value);
  },
  index: (value) => {
    const re = /^([0-9]){5}$/g;
    return re.test(value);
  },
};

export default validation;
