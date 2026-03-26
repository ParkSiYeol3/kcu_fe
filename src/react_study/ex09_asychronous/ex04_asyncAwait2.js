function step(msg, time = 1000) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (msg.startsWith("오")) {
            console.log(msg);
            resolve(msg);
        } else {
            reject(`실패: ${msg}는 '오'로 시작하지 않음.`);
        }
    }, time);
    })
}

async function processAllSteps() {
    try {
        await Promise.all([
            step("오 1단계"),
            step("앗 2단계"),
            step("오 3단계", 2000),
        ]);
    } catch (error) {
        console.error(`에러: ${error}`);
    } finally {
        console.log("promiseAll 종료");
    }
}

// processAllSteps();

async function processAllSettled() {
    const res = await Promise.allSettled([
        step("오 1단계"),
        step("앗 2단계"),
        step("오 3단계", 2000),
    ]);
    res.forEach((r, i) => {
        if (r.status === "fulfilled") {
            console.log(`${i + 1}단계: 성공`)
            console.log(`${i + 1}단계: value = ${r.value}`);
            console.log(`${i + 1}단계: reason = ${r.reason}`);
        } else {
            console.log(`${i + 1}단계: 실패`)
            console.log(`${i + 1}단계: value = ${r.value}`);
            console.log(`${i + 1}단계: reason = ${r.reason}`);
        }
    })
    console.log("모든 단계 종료 (부분 성공 허용)");
}

// processAllSettled();

async function processAny() {
    try {
        const res = await Promise.any([
            step("앗 1단계"),
            step("앗 2단계"),
            step("오 3단계", 2000),
        ]);
        console.log("가장 먼저 성공한 단계:", res);
    } catch(err) {
        console.error("모든 단계 실패:", err);
    } finally {
        console.log("promiseAny 종료");
    }
}

// processAny();

async function processRace() {
    try {
        const winner = await Promise.race([
            step("오 1단계"),
            step("우 2단계", 500),
            step("앗 3단계", 100),
        ]);
        console.log("가장 먼저 끝난 결과:", winner);
    } catch(err) {
        console.error("race 에러:", err);
    } finally {
        console.log("promiseRace 종료");
    }
}

processRace();