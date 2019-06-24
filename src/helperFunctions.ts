export function minDimension(el: HTMLElement) {
  return el.offsetWidth < el.offsetHeight ? el.offsetWidth : el.offsetHeight;
}

export function dimensions(el: HTMLElement): vector {
  const retVal: vector = {
    x: el.offsetWidth,
    y: el.offsetHeight,
  }
  return retVal
}
