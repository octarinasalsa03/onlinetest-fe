export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    Authorization: "Bearer " + user.token,
  };

  // if (user && user.token) {
  //   return {
  //     Authorization: "Bearer " + user.token,
  //   };
  // } else {
  // }
}
