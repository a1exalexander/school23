import auth from './modules/auth';
import notifications from './modules/notifications';
import news from './modules/news';
import publicInfo from './modules/public';
import { clockReducer } from './modules/clock';

const reducer = (state, action) => {
  return {
    auth: auth.reducer(state, action),
    notifications: notifications.reducer(state, action),
    news: news.reducer(state, action),
    publicInfo: publicInfo.reducer(state, action),
    clock: clockReducer(state, action)
  };
};

export default reducer;
