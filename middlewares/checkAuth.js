import nookies from 'nookies';
import { actions } from '../store/modules/auth';

export default async (ctx) => {
  const { ADMIN_TOKEN } = nookies.get(ctx);
  if (ctx && ctx.store && !ADMIN_TOKEN) {
    ctx.store.dispatch(actions.cleanAuth());
  }
  return !!ADMIN_TOKEN;
};
