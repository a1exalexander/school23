const initialUser = {
  displayName: '',
  email: '',
  emailVerified: null,
  photoURL: '',
  isAnonymous: null,
  uid: '',
  admin: false,
  providerData: []
};
export const getUser = (propUser = initialUser, admin = false) => {
  const user = {};
  Object.keys(initialUser).forEach((key) => {
    user[key] = propUser[key];
  });
  user.admin = admin;
  return user;
};

export default getUser;
