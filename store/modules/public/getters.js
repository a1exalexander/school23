export const hasPages = (data) => !!data.length;

export const filteredPages = (data) => (query) => {
  return data.filter((el) => {
    return String(el.title).toLowerCase().indexOf(String(query).toLowerCase()) !== -1;
  })
}
