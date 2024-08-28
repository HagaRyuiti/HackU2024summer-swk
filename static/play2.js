// wanakanaをインポート
import * as wanakana from 'https://cdn.skypack.dev/wanakana';


console.log(data);

// 辞書データの要素数を取得
var numberOfKeys = Object.keys(data).length;

// コンソールに要素数を表示
console.log("辞書データの要素数: " + numberOfKeys);

// キーの配列を取得
var keys = Object.keys(data);

window.onload = function () {
    // page2,3の遷移を行う関数
    timerStringDOM = document.getElementById('timer2');

    // 開始する前は00:00と表示
    timerStringDOM.innerHTML = '00:00'

    // すでにタイマーが動いていないことを確認する
    if(timerId == null) {
        // 変数startTimeに開始時間を所持しておく
        // 現在の時間は、基準時からの経過時間(単位：ミリ秒)
        startTime = new Date().getTime() - currentTimerTime;

        // 1秒(=1000ミリ秒)ごとにタイマーを更新する処理を記述する
        timerId = setInterval(UpdateTimer, 1000);
    }
};
  

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

// 初期表示
if (numberOfKeys > 0) {
    display2(data[keys[currentIndex]]);
}
