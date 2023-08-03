export const offsetTop = function (el?: Element | null, parent = 'body'): number {
  if (!el) return 0
  let parentEl = document.querySelector(parent)
  if (!parentEl) {
    parentEl = document.body
  }

  if (el === parentEl) {
    return 0
  }
  const style = window.getComputedStyle(el)
  const matrix = new window.WebKitCSSMatrix(style.transform)
  const {parentOffset = undefined, topOffset = 0} = el instanceof HTMLElement ? {
    parentOffset: el.offsetParent,
    topOffset: el.offsetTop
  } : {}
  return offsetTop(parentOffset, parent) + topOffset + matrix.f
}

export const offsetLeft = function (el?: Element | null, parent = 'body'): number {
  if (!el) return 0
  let parentEl = document.querySelector(parent)
  if (!parentEl) {
    parentEl = document.body
  }

  if (el === parentEl) {
    return 0
  }
  const style = window.getComputedStyle(el)
  const matrix = new window.WebKitCSSMatrix(style.transform)
  const {parentOffset = undefined, leftOffset = 0} = el instanceof HTMLElement ? {
    parentOffset: el.offsetParent,
    leftOffset: el.offsetLeft
  } : {}
  return offsetLeft(parentOffset, parent) + leftOffset + matrix.e
}
