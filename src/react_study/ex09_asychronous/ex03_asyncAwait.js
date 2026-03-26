function waitOneSec() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("1초 후 완료");
        }, 1000);
    });
}

async function run() {
    console.log('시작');
    const result = await waitOneSec();
    console.log(result);
    console.log('끝');
}

function step(msg) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (msg.startsWith("오")) {
            console.log(msg);
            resolve();
        } else {
            reject(`실패: ${msg}는 '오'로 시작하지 않음.`);
        }
    }, 500);
    })
}

async function processSteps() {
    try {
        await step("오 1단계");
        await step("오 2단계");
        await step("오 3단계");
        await step("오 4단계");
    } catch (err) {
        console.error(`에러: ${err}`);
    } finally {
        console.log("finally는 에러 여부와 상관없이 실행.");
    }
}

processSteps();