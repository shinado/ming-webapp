const https = require("https");
const crypto = require("crypto");
const querystring = require("querystring");
const ENDPOINT = "https://www.okx.com";

// 定义 API 凭证和项目 ID
const api_config = {
  api_key: process.env.OKX_API_KEY,
  secret_key: process.env.OKX_SECRET_KEY,
  passphrase: process.env.OKX_PASS_PHRASE,
};

function preHash(timestamp, method, request_path, params) {
  // 根据字符串和参数创建预签名
  let query_string = "";
  if (method === "GET" && params) {
    query_string = "?" + querystring.stringify(params);
  }
  if (method === "POST" && params) {
    query_string = JSON.stringify(params);
  }
  return timestamp + method + request_path + query_string;
}

function sign(message, secret_key) {
  // 使用 HMAC-SHA256 对预签名字符串进行签名
  const hmac = crypto.createHmac("sha256", secret_key);
  hmac.update(message);
  return hmac.digest("base64");
}

function createSignature(method, request_path, params) {
  // 获取 ISO 8601 格式时间戳
  const timestamp = new Date().toISOString().slice(0, -5) + "Z";
  // 生成签名
  const message = preHash(timestamp, method, request_path, params);
  const signature = sign(message, api_config["secret_key"]);
  return { signature, timestamp };
}

export async function sendGetRequest(request_path, params) {
  // 生成签名
  const { signature, timestamp } = createSignature("GET", request_path, params);

  // 生成请求头
  const headers = {
    "Content-Type": "application/json",
    "OK-ACCESS-KEY": api_config["api_key"],
    "OK-ACCESS-SIGN": signature,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-PASSPHRASE": api_config["passphrase"],
    // 'OK-ACCESS-PROJECT': api_config['project'] // 这仅适用于 WaaS APIs
  };

  const url =
    ENDPOINT +
    request_path +
    (params ? `?${querystring.stringify(params)}` : "");

  const options = {
    hostname: "www.okx.com",
    path: url,
    method: "GET",
    headers: headers,
  };

  console.log("url: ", url);
  console.log("headers: ", headers);
  const response = await fetch(url, {
    headers: headers,
    method: "GET",
  });
  const data = await response.json();
  return data;
}
