interface Point {
  x: number
  y: number
}
export const deltaTransformPoint = (matrix: DOMMatrix, point: Point) => {
  const dx = point.x * matrix.a + point.y * matrix.c;
  const dy = point.x * matrix.b + point.y * matrix.d;
  return { x: dx, y: dy };
}

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
  console.log('matrix: ', matrix)
  const py = deltaTransformPoint(matrix, { x: 1, y: 0 });
  const skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));
  const sina = Math.sin((skewY + 45) * Math.PI / 180)
  const r = el.clientHeight  / Math.sqrt(2)
  const rotateOffset = r * sina - el.clientHeight / 2
  return offsetTop(parentOffset, parent) + topOffset - rotateOffset + matrix.f
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
  const px = deltaTransformPoint(matrix, { x: 0, y: 1 });
  const skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
  const cosa = Math.cos((skewX + 45) * Math.PI / 180)
  const r = el.clientHeight  / Math.sqrt(2)
  const rotateOffset = r * cosa - el.clientHeight / 2
  return offsetLeft(parentOffset, parent) + leftOffset - rotateOffset + matrix.e
}
