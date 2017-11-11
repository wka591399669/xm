import $ from 'jquery';
// low b fetch不能用 后端接收有问题，改成jquery
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

// const Fetch = async (url, option = {}) => {
//   if (option.body) {
//     option.body = JSON.stringify(option.body);
//   }
//   option.headers = {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   };
//   option.method = 'POST';
//   return new Promise((resolve, reject) => {
//     fetch(setting.api + url + '.do', option)
//       .then(response => {
//         if (response.status >= 500) {
//           reject(response);
//           throw new Error(`Bad response from server:${response.status}`);
//         }
//         return response.json();
//       })
//       .then(res => {
//         resolve(res);
//       });
//   });
// };
// export default Fetch;
let Fetch = async (url, option = {}) => {
  if (window.localStorage.getItem('token')) {
    if (!option.body) {
      option.body = {};
    }
    option.body.token = window.localStorage.getItem('token');
    option.body.userId = window.localStorage.getItem('userId');
  }
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${SETTING.apiHost}${url}.do`,
      method: 'POST',
      data: option.body,
      success(e) {
        // token 失效
        if (JSON.parse(e).returnCode == 'QUERY_012') {
          Fetch.cbTokenOut && Fetch.cbTokenOut();
        }
        resolve(JSON.parse(e));
      },
      error(e) {
        Fetch.cbError && Fetch.cbError(e);
        reject(e);
      }
    });
  });
};
export default Fetch;
