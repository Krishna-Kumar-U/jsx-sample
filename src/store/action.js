export const loginUser = (user) => {
    return {
        type: 'LOGIN_USER',
        payload: user
    };
};

export function logout() {
  return {
    type: 'LOGOUT',
  };
}