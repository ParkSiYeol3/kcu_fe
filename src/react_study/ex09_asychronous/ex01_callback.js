// console.log('1. 시작');

// setTimeout(() => {
//     console.log('2. 1초 후에 실행');
// }, 1000);

// console.log('3. 끝');

function sayHello(name, callback) {
    console.log('하이', name);
    callback();
}

sayHello("진구", () => {
    console.log('진구야 밥 먹어');
})

setTimeout(() => {
    console.log('1단계: 진구가 방에서 내려옴');
    setTimeout(() => {
        console.log('2단계: 진구가 밥 먹는 중');
        setTimeout(() => {
            console.log('3단계: 진구가 밥을 다 먹음');
            setTimeout(() => {
                console.log('4단계: 진구가 방으로 감');
            }, 500);
        }, 500);
    }, 500);
}, 500);