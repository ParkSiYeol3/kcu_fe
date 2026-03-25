// const colors = ['red', 'green', 'blue'];
// const [first, second, third] = colors;
// console.log(first, second, third);

// const user = {name:'Alice', age:25}
// const {name, age} = user;
// const {name:userName, age:userAge} = user;
// console.log(name, age)
// console.log(userName, userAge);

// const nums = [10, 20, 30];
// const [_, a, b] = nums;
// console.log(a,b)

// const obj = {id:1, title:"hello"}
// const {title} = obj
// console.log(title)

// const fullName = {firstName:"John", lastName:"Snow"}
// const {firstName:fName} = fullName;
// console.log(fName)

const post = {
  id: 1,
  title: "비구조화 연습",
  author: {
    id: 99,
    name: "Alice"
  },
  comments: [
    { id: 10, text: "좋은 글이네요!" },
    { id: 11, text: "잘 읽었습니다." }
  ]
};

const {title, comments:[{text},{id}], author:{name}} = post
console.log(text, id)