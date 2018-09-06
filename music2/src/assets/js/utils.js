/**
 *  数组的分块
 * @param arr 需要分块的数组
 * @param size 分块的数量
 */
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
);

/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
const throttle = (fn,delay,atleast) => {
    let timer = null
    let previous = null
    return () => {
        let now = +new Date()
        if (!previous) {
            previous = now
        }
        if (atleast && now - previous > atleast) {
            fn()
            //重置上一次开始时间为本次结束时间
            previous = now
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn()
            },delay)
        }
    }
}


/**
 * 给浏览器添加css前缀
 * @return 各种浏览器的css前缀
 */
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
const prefix = (style) => {
    if (!vendor) {  //如果供应商有问题，直接return
        return false
      }
      if(vendor === 'standard') {
        return style
      }
      return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/**
 * 数组随机打乱(洗牌函数)
 * @param arr 需要打乱的数组
 * @return Array 最终打乱的数组
 */
const shuffle = function(arr) {
    let _arr = arr.slice()  //不修改原数组
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0,i)
        // 变量的交换
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

/**
 * 获取多少道多少之间的随机整数
 * @param min 最小数字
 * @param max 最大数字
 * @return 随机数
 */
const getRandomInt = function(min,max) {
    return (Math.random() * (max - min + 1) + min) | 0
}

/**
 * 函数节流
 * @param func 需要节流的函数
 * @param delay 时间
 */
const debounce = function(func,delay) {
    let timer
    return function(...args)  {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this,args)
        },delay)
    }
}
export {
    chunk,  //数组分块
    throttle,  //函数节流
    prefix,    //各种浏览器的css前缀
    getRandomInt,   //获取多少道多少之间的随机整数
    shuffle,    //数组随机打乱(洗牌函数)
    debounce,//函数节流
}