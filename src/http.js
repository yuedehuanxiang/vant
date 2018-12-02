import axios from "axios";
import { Notify, Toast } from "vant";

//mac

let toast;
function startLoading() {
  toast = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: "spinner",
    message: "加载中..."
  });
}

function endLoading() {
  toast.clear();
}

const ajax = axios.create({
  baseURL: "https://www.easy-mock.com/mock/5c03214b0694c411d85d8354",
  timeout: 4000
});

// 请求拦截
ajax.interceptors.request.use(
  config => {
    // 加载动画
    startLoading();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
ajax.interceptors.response.use(
  response => {
    // 结束加载动画
    setTimeout(() => {
      endLoading();
    }, 1000);
    return response;
  },
  error => {
    // 错误提醒
    endLoading();
    console.log(error.response);
    Notify(error.response.data);

    return Promise.reject(error);
  }
);

// export default axios.create({
//   baseURL: "https://www.easy-mock.com/mock/5c03214b0694c411d85d8354",
//   timeout: 3000
// });

export default ajax;
