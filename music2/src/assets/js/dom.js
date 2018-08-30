let elementStyle = document.createElement('div').style
let vendor = (() => {
    let transformNames = {
      'webkit':'webkitTransform',
      'Moz':'MozTransform',
      'O':'OTransform',
      'ms':'msTransform',
      'standard':'transform'
    }
    for(let k in transformNames) {
      if (elementStyle[transformNames[k]] !== undefined) {
        return k
      }
    }
 return false
})()

export function prefixStyle(style) {
  if (!vendor) {  //如果供应商有问题，直接return
    return false
  }
  if(vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
