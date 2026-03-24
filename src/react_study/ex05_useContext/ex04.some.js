// const nuts = [1, 3, 5, 7];

// // console.log(nuts.some((n) => (n%2 === 0)));
// // console.log(nuts.some((n) => (n>4)));

// // // const users = [
// // //   { id: 'id1', pw: "1234" },
// // //   { id: 'id2', pw: "5678" },
// // //   { id: 'id3', pw: "9012" }
// // // ];

// // // const inputId = 'id2';
// // // const inputPw = '1234';

// // // const isValid = users.some((u) => {
// // //     return (u.id === inputId) && (u.pw === inputPw);
// // // });

const nuts = [2, 4, 6, 8];

console.log(nuts.some((n) => (n%2 === 1)));

const members = [
  { name: '박시열', age: 30 },
  { name: '김철수', age: 25 },
  { name: '신짱구', age: 35 }
];

const hasTeenager = members.some((m) => m.age >= 25);
console.log(hasTeenager);