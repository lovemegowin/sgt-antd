// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  let x = localStorage.getItem('antd-pro-authority'||'admin');
  console.log(x);
  return localStorage.getItem('antd-pro-authority'||'admin');
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}
