// wanakanaをインポート
//import * as wanakana from 'https://cdn.skypack.dev/wanakana';

console.log(data);

// 辞書データの要素数を取得
var numberOfKeys = Object.keys(data).length;

// コンソールに要素数を表示
console.log("辞書データの要素数: " + numberOfKeys);

// キーの配列を取得
var keys = Object.keys(data);

// 現在のデータインデックス
let currentIndex = 0;

//skipした回数
let skipsum = 0;

window.SkipButtonClick = function SkipButtonClick() {
    //skip回数を加算
    skipsum++;

    // 次のデータに進む
    currentIndex++;
    if (currentIndex < numberOfKeys) {
        display3(data[keys[currentIndex]]);
    } else {
        console.log("すべてのデータが表示されました。");
        resultPage('page4');
    }
}

// page4の遷移を行う関数
function resultPage(pageId) {
    console.log(skipsum);
    // すべてのページを非表示にする
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    // 選択されたページを表示する
    var selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');

    timerStringDOM = document.getElementById('timer4');

    // すでにタイマーが動いていることを確認する
    if(timerId != null) {
        // タイマーIDで指定したタイマーをストップする
        clearInterval(timerId);
        timerId = null;

        // 現在までの経過時間を記録してタイマーの表示を更新
        const nowTime = new Date().getTime();
        currentTimerTime = nowTime - startTime;

        timerStringDOM.innerHTML = msecToSecString(currentTimerTime);
    }

    scoreShow(currentTimerTime, skipsum);

    // スコアを計算し、サーバーにデータを送信
    const score = (1000 - currentTimerTime / 100 - skipsum * 40) * 100;
    const roundedScore = Math.round(score);
    
    sendDataToServer(roundedScore, currentTimerTime, data);
}

function scoreShow(time, dec) {
    console.log(dec);
    const score = (1000 - time / 100 - dec * 40) * 100; 
    console.log(score);
    const roundedScore = Math.round(score);
    document.getElementById("score4").innerHTML = roundedScore;

    console.log(roundedScore);

    //sendDataToServer(roundedScore, time, dec);
}

function sendDataToServer(score, time, data) {
    // 送信するデータを作成
    const payload = {
        score: score,
        time: time,
        data: data
    };

    // POSTリクエストでデータを送信
    fetch('/save_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log('サーバーからの応答:', data);
    })
    .catch((error) => {
        console.error('エラー:', error);
    });
}

