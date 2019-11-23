import nookies from 'nookies';
import { actions } from '../store/modules/auth'

export default async (ctx) => {
  const { ADMIN_TOKEN } = nookies.get(ctx);
  ctx.reduxStore.dispatch(actions.setAuthStatus(!!ADMIN_TOKEN));
  return ADMIN_TOKEN;
}