import axios from "axios";

//axios 인스턴스를 생성
let client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //요청이 이행되어야 할 경우 true를 반환하고, 거부되어야 할 경우 false를 반환
  validateStatus: function (status) {
    return status < 400 || status === 401;
  },
  // 브라우저가 (CORS) 요청을 보낼 때 인증 정보(예: 쿠키, HTTP 인증 토큰 등)를 함께 보내도록 합니다.
  // 쿠키 전송, 세션 유지
  // 메인 사이트와 API 서버가 서로 다른 도메인에 위치한 경우에 이 옵션을 사용할 수 있습니다.
  withCredentials: true,
});

client.interceptors.request.use(async (res) => {
  // const { config, status } = res;
  // if (status === 401) {
  //   await refreshTokens();
  //   throw new Error("refresh token");
  // }
  return res;
});

const onSuccess = function (response: any) {
  console.log("Request Successful!", response.data);
  return response.data;
};

const onError = function (error: any) {
  console.log("Request Failed:", error);
  throw new Error(error);
};

export const request = async function (options: any) {
  return client(options).then(onSuccess).catch(onError);
};
