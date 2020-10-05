function toyJsonp(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  document.body.appendChild(script)
}