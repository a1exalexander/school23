export const hasNews = (news) => !!news.length;

export const filteredNews = (news) => (query) => {
  return news.filter((el) => {
    return String(el.title).toLowerCase().indexOf(String(query).toLowerCase()) !== -1;
  })
}
