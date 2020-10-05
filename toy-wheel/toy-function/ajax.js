function ajax(url, method = "GET", data = null) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      success(JSON.parse(xhr.responseText));
    } else {
      fail(xhr.responseText)
    }
  }
  xhr.open(method, url, true);
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