var $loading = $('#loading')
var $progress = $('#progress')
var prg = 0

var timer = 0
var now = new Date()
var timeout = 5000

var next = prg

add([10, 20], [1, 3], 10)  // 第一阶段

window.setTimeout(() => {  // 图a加载完
  add(20, [1, 3], 200)
}, 1000)

window.setTimeout(() => {  // 图c加载完
  add(30, [1, 3], 10)
}, 2000)

window.setTimeout(() => {  // 图b加载完
  add(25, [1, 3], 200)
}, 2500)

// window.onload = () => {
//   complete()
// }

// if (now - loadingStartTime > timeout) {
//   complete()
// } else {
//   window.setTimeout(() => {
//     complete()
//   }, timeout - (now - loadingStartTime))
// }

function complete () {
  add(100, [1, 5], 10, () => {
    window.setTimeout(() => {
      $loading.hide()
    }, 1000)
  })
}

function add (dist, speed, delay, callback) {
  var _dist = random(dist)
  if (next + _dist > 100) {  // 对超出部分裁剪对齐
    next = 100
  } else {
    next += _dist
  }

  progress(next, speed, delay, callback)
}

function progress (dist, speed, delay, callback) {
  var _delay = random(delay)
  var _speed = random(speed)
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    if (prg + _speed >= dist) {
      window.clearTimeout(timer)
      prg = dist
      callback && callback()
    } else {
      prg += _speed
      progress (dist, speed, delay, callback)
    }
    
    $('#progress').html(parseInt(prg) + '%')
    console.log(prg)
  }, _delay)
}

function random (n) {
  if (typeof n === 'object') {
    var times = n[1] - n[0]
    var offset = n[0]
    return Math.random() * times + offset
  } else {
    return n
  }
}