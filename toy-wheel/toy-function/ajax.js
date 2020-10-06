function ajax(url, method = "GET", data = null) {
  let xhr = new XMLHttpRequest();
  // 接收返回值
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      success(JSON.parse(xhr.responseText));
    } else {
      fail(xhr.responseText)
    }
  }
  xhr.open(method, url, true);
  // 设置请求头
  if (method.toLowerCase() === 'post') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode')
  }
  xhr.send(data);
}

function success(data) {
  console.log(data);
}
function fail(err) {
  console.log(err);
}

// ======================================================
/**
 * testing
 */