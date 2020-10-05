function toySetInterval(fn, time) {
  const inner = () => {
    fn();
    setTimeout(inner, time);
  }
  inner()
}

// ======================================================
/**
 * testing
 */
toySetInterval(function () {
  console.log(1);
}, 1000);