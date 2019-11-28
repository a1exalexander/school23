import auth from './modules/auth';
import notifications from './modules/notifications';
import news from './modules/news';
import law from './modules/law';

const reducer = (state, action) => {
  return {
    auth: auth.reducer(state, action),
    notifications: notifications.reducer(state, action),
    news: news.reducer(state, action),
    law: law.reducer(state, action),
  }
}

export default reducer;
