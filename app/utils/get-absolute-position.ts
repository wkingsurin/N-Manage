export default function getAbsoultePoistion(elem: HTMLElement) {
  const rect = elem.getBoundingClientRect()
  return {x: rect.left, y: rect.top, width: rect.width}
}