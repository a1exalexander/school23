import auth from './modules/auth';
import notifications from './modules/notifications';
import news from './modules/news';

const reducer = (state, action) => {
  return {
    auth: auth.reducer(state, action),
    notifications: notifications.reducer(state, action),
    news: news.reducer(state, action),
  }
}

export default reducer;
