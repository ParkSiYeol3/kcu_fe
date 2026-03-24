function getMessage(status) {
  switch(status) {
    case 'success':
      return '성공';
    case 'error':
      return '실패';
    default:
      return 'unknown';
  }
}

// console.log(getMessage('success'));
// console.log(getMessage('error'));
// console.log(getMessage(''));

function getMessage2(status) {
  let result; 
  switch(status) {
    case 'success':
      result = '성공';
      break;
    case 'error':
      result = '실패';
      break;
    default:
      result = 'unknown';
  }
  return result
}

// console.log(getMessage2('success'));
// console.log(getMessage2('error'));
// console.log(getMessage2(''));

function playYut(num) {
  if (num === undefined) {
    const random = Math.random() * 5
    num = Math.floor(random)
    console.log(`random: ${random.toFixed(3)}, num: ${num}`);
  }
  switch(num) {
    case 0:
      return "윷";
    case 1:
      return "도";
    case 2:
      return "개";
    case 3:
      return "걸";
    case 4:
      return "모";
    default:
      return "에러"
  }
}

console.log(playYut(0))
console.log(playYut(1))
console.log(playYut(2))
console.log(playYut(3))
console.log(playYut(4))
console.log(playYut(5))
console.log(playYut())
// console.log(playYut())