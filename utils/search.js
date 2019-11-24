import { isObject } from './index';

const filterSearch = (query) => (el) => {
  if (isObject(el)) {
    return Object.values(el).some((value) => {
      return String(value).toLowerCase().indexOf(String(query).toLowerCase()) !== -1;
    })
  }
  return String(el).toLowerCase().indexOf(String(query).toLowerCase()) !== -1;
}

export default filterSearch;
