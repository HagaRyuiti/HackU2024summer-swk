// wanakanaをインポート
import * as wanakana from 'https://cdn.skypack.dev/wanakana';

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

// データを表示する関数
function display2(text) {
    // 質問を表示
    document.getElementById("number2").innerHTML = currentIndex + 1;
    document.getElementById("tango2").innerHTML = text.tango;
    document.getElementById("yomi2").innerHTML = text.yomi;
    document.getElementById("explain2").innerHTML = text.explain;

    console.log(text.id);
    console.log(text.tango);
    console.log(text.yomi);
    console.log(text.explain);

    // question 関数を呼び出して分割とログ出力を行う
    document.getElementById('textbox2').focus();
    question2(text);
}

// データを表示する関数
function display3(text) {
    // 質問を表示
    document.getElementById("number3").innerHTML = currentIndex + 1;
    document.getElementById("explain3").innerHTML = text.explain;

    console.log(text.id);
    console.log(text.explain);

    // question 関数を呼び出して分割とログ出力を行う
    document.getElementById('textbox3').focus();
    question3(text);
}

// 初期表示
if (numberOfKeys > 0) {
    display2(data[keys[currentIndex]]);
    display3(data[keys[currentIndex]]);
}

//正否判定をする関数
function question2(text) {
    const chartext = text.yomi.split(''); // 1文字ずつ分割
    const length = chartext.length; // 文字数を計算

    console.log(`文字数: ${length}`);
    chartext.forEach((char, index) => {
        console.log(`文字 ${index + 1}: ${char}`);
    });

    const textbox = document.getElementById('textbox2');
    textbox.addEventListener("input", () => {
        const inputText = textbox.value;
        console.log("入力テキスト:", inputText);

        if (inputText && wanakana) {
            const re_textbox = wanakana.toHiragana(inputText);
            console.log("変換後テキスト:", re_textbox);

            const answer = wanakana.toHiragana(text.yomi);
            console.log("変換後テキスト:", answer);

            // 入力が正しいかチェック
            if (re_textbox === answer) {
                console.log("正解！");
                textbox.value = ''; // テキストボックスをクリア

                // 次のデータに進む
                currentIndex++;
                if (currentIndex < numberOfKeys) {
                    display2(data[keys[currentIndex]]);
                } else {
                    console.log("すべてのデータが表示されました。");
                    resultPage('page4');
                }
            }

            //const sentenceArray = document.getElementById("yomi").querySelectorAll("span");
            const arrayValue = re_textbox.split("");
            console.log(arrayValue);
        } else {
            console.warn("入力テキストが空、またはwanakanaモジュールが未定義です。");
        }
    });
}

//正否判定をする関数
function question3(text) {
    const chartext = text.yomi.split(''); // 1文字ずつ分割
    const length = chartext.length; // 文字数を計算

    console.log(`文字数: ${length}`);
    chartext.forEach((char, index) => {
        console.log(`文字 ${index + 1}: ${char}`);
    });

    const textbox = document.getElementById('textbox3');
    textbox.addEventListener("input", () => {
        const inputText = textbox.value;
        console.log("入力テキスト:", inputText);

        if (inputText && wanakana) {
            const re_textbox = wanakana.toHiragana(inputText);
            console.log("変換後テキスト:", re_textbox);

            const answer = wanakana.toHiragana(text.yomi);
            console.log("変換後テキスト:", answer);

            // 入力が正しいかチェック
            if (re_textbox === answer) {
                console.log("正解！");
                textbox.value = ''; // テキストボックスをクリア

                // 次のデータに進む
                currentIndex++;
                if (currentIndex < numberOfKeys) {
                    display3(data[keys[currentIndex]]);
                } else {
                    console.log("すべてのデータが表示されました。");
                    resultPage('page4');
                }
            }

            //const sentenceArray = document.getElementById("yomi").querySelectorAll("span");
            const arrayValue = re_textbox.split("");
            console.log(arrayValue);
        } else {
            console.warn("入力テキストが空、またはwanakanaモジュールが未定義です。");
        }
    });
}

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
}

function scoreShow(time, dec) {
    console.log(dec);
    const score = (1000 - time / 100 - dec * 40) * 100; 
    console.log(score);
    const roundedScore = Math.round(score);
    document.getElementById("score4").innerHTML = roundedScore;

    console.log(roundedScore);
}
