export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.body.accessToken) {
    return { Authorization: "Bearer " + user.body.accessToken };
  } else {
    return {};
  }
}
