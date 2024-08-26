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

// データを表示する関数
function display(text) {
    // 質問を表示
    document.getElementById("id").innerHTML = text.id;
    document.getElementById("tango").innerHTML = text.tango;
    document.getElementById("yomi").innerHTML = text.yomi;
    document.getElementById("explain").innerHTML = text.explain;

    console.log(text.id);
    console.log(text.tango);
    console.log(text.yomi);
    console.log(text.explain);

    // question 関数を呼び出して分割とログ出力を行う
    document.getElementById('textbox').focus();
    question(text);
}

// 初期表示
if (numberOfKeys > 0) {
    display(data[keys[currentIndex]]);
}

function question(text) {
    const chartext = text.yomi.split(''); // 1文字ずつ分割
    const length = chartext.length; // 文字数を計算

    console.log(`文字数: ${length}`);
    chartext.forEach((char, index) => {
        console.log(`文字 ${index + 1}: ${char}`);
    });

    const textbox = document.getElementById('textbox');
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
                    display(data[keys[currentIndex]]);
                } else {
                    console.log("すべてのデータが表示されました。");
                    alert("すべての質問に回答しました！");
                }
            }

            const sentenceArray = document.getElementById("yomi").querySelectorAll("span");
            const arrayValue = re_textbox.split("");
            console.log(arrayValue);
        } else {
            console.warn("入力テキストが空、またはwanakanaモジュールが未定義です。");
        }
    });
}
