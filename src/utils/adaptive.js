;(function () {
  function resetFontSize() {
    const docEl = document.documentElement
    docEl.style.fontSize = `${docEl.clientWidth / 10}px`
  }
  resetFontSize()
  window.addEventListener('resize', resetFontSize)
})()
