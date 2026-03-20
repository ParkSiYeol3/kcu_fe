const arr1 = [1, 2, 3];
const arr2 = [4, 5, ...arr1, 6]

console.log(arr2) // [4, 5, 1, 2, 3, 6]

const obj1 = {a: 1, b: 2}
const obj2 = {...obj1, c: 3} // {a: 1, b: 2, c: 3}

console.log(obj2);

const obj3 = {a: 1, b: 2, c: 3}

const newObj = {...obj3, b: 20}

console.log(newObj);

const fruits1 = ["apple", "banana"];
const fruits2 = ["watermelon", "chocolate"];

console.log(fruits1);
console.log(fruits2);


const user = { name: "Tom", age: 20 };
const job = { title: "Developer", company: "Google" };
const person = {
    name: "Tom", age: 20 , title: "Developer", company: "Google"
}

console.log(person);