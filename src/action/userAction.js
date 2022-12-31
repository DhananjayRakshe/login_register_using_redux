
const set_user = () => {
  return {
    type: "SET_USER"
  };
};

const logout = () => {
  return {
    type: "LOGOUT"
  };
};

export default {
  set_user,
  logout
};