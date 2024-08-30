// wanakanaをインポート
import * as wanakana from 'https://cdn.skypack.dev/wanakana';

data=data.data;

console.log(data);

// 辞書データの要素数を取得
var numberOfKeys = Object.keys(data).length;

// コンソールに要素数を表示
console.log("辞書データの要素数: " + numberOfKeys);

// キーの配列を取得し、ランダムにシャッフル
var keys = Object.keys(data);
shuffleArray(keys);  // 配列をシャッフル

let currentIndex = 0;
let skipsum = 0;
let typeInput = document.getElementById('inputField');
let timerId = null;
let startTime;
let currentTimerTime = 0;
let skippedProblems = [];  // スキップされた問題のインデックスを格納する配列

window.onload = function() {
    start(); // ページがロードされたときにタイマーを開始
    displayWord(); // 初回の単語を表示
};

window.oninput = function () {
    checkInput();
};

// 関数定義をすべて追加
window.displayWord = displayWord;
window.checkInput = checkInput;
window.SkipButtonClick = SkipButtonClick;
window.sendDataToServer = sendDataToServer;
window.scoreShow = scoreShow;
window.msecToSecString = msecToSecString;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // 要素を交換
    }
}

function start() {
    // `timerStringDOM` を関数内で定義する
    let timerStringDOM = document.getElementById('timer3');

    // 開始する前は00:00と表示
    timerStringDOM.innerHTML = '00:00';

    // すでにタイマーが動いていないことを確認する
    if (timerId == null) {
        // 変数startTimeに開始時間を所持しておく
        // 現在の時間は、基準時からの経過時間(単位：ミリ秒)
        startTime = new Date().getTime() - currentTimerTime;

        // 1秒(=1000ミリ秒)ごとにタイマーを更新する処理を記述する
        timerId = setInterval(UpdateTimer, 1000);
    }
}

// 単語を表示する関数
function displayWord() {
    if (currentIndex < numberOfKeys) {
        document.getElementById('explainDisplay').textContent = data[keys[currentIndex]].explain;
        document.getElementById('latinDisplay').classList.add('default');
        document.getElementById('inputField').value = '';
        document.getElementById('inputField').focus();
        document.getElementById('missDisplay').textContent = ''; // エラーメッセージをリセット
    } else {
        document.getElementById('explainDisplay').textContent = 'お疲れ様でした！';
        document.getElementById('inputField').style.display = 'none';
        document.getElementById('button').style.display = 'none';
        document.getElementById('missDisplay').style.display = 'none';
        console.log(skipsum);
        var pages = document.querySelectorAll('.page');
        pages.forEach(function (page) {
            page.classList.remove('active');
        });

        // `timerStringDOM` を関数内で定義する
        let timerStringDOM = document.getElementById('timer4');

        if (timerId != null) {
            clearInterval(timerId);
            timerId = null;

            const nowTime = new Date().getTime();
            currentTimerTime = nowTime - startTime;

            timerStringDOM.innerHTML = msecToSecString(currentTimerTime);
        }

        scoreShow(currentTimerTime, skipsum);

        const score = (1000 - currentTimerTime / 500 - skipsum * 40) * 10;
        const roundedScore = Math.round(score);

        //sendDataToServer(roundedScore, currentTimerTime, data);

        setTimeout(() => {
            // Flaskの/indexルートに移動する
            window.location.href = '/title';
        }, 10000); // 10000ミリ秒 = 10秒
    }
}

// 入力をチェックする関数
function checkInput() {
    let yomi = data[keys[currentIndex]].yomi; // 正しい読み（ひらがな）
    let correctRomaji = wanakana.toRomaji(yomi); // 正しい読みのローマ字変換
    let userInput = typeInput.value; // ユーザーの入力

    // 入力のクリーニング（正規表現でローマ字以外を除去）
    //userInput = userInput.replace(/[^a-zA-Z]/g, '');
    typeInput.value = userInput;

    // 入力が正しいかを確認
    if (userInput === correctRomaji.substring(0, userInput.length)) {
        document.getElementById('missDisplay').textContent = '';
        document.getElementById('latinDisplay').classList.remove('default');
        document.getElementById('latinDisplay').classList.remove('no');
        document.getElementById('latinDisplay').classList.add('ok');
    } else {
        document.getElementById('missDisplay').textContent = 'まちがってるよ';
        typeInput.value = userInput.slice(0, -1); // 最後の文字を削除
        document.getElementById('latinDisplay').classList.add('no');
        document.getElementById('latinDisplay').classList.remove('ok');
    }

    // 入力が完全に一致した場合の処理
    if (userInput === correctRomaji) {
        currentIndex++;
        displayWord();
    }
}

// skipボタンのクリック処理
function SkipButtonClick() {
    skippedProblems.push(currentIndex);  // スキップされた問題のインデックスを記録
    skipsum++;
    currentIndex++;
    if (currentIndex < numberOfKeys) {
        displayWord();
    } else {
        console.log("すべてのデータが表示されました。");
        displayWord();
    }
}


function scoreShow(time, dec) {
    const score = (1000 - time / 100 - dec * 40) * 100;
    const roundedScore = Math.round(score);
    document.getElementById("score4").innerHTML = roundedScore;
    console.log(roundedScore);
}

function msecToSecString(msec) {
    const sec = Math.floor(msec / 1000);
    const min = Math.floor(sec / 60);
    return `${min}:${sec % 60}`;
}

function UpdateTimer() {
    if (timerId != null) {
        const nowTime = new Date().getTime();
        currentTimerTime = nowTime - startTime;
        document.getElementById('timer3').innerHTML = msecToSecString(currentTimerTime);
    }
}
