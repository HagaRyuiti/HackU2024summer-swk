let currentIndex = 0;
let data=[];
let typeInput=document.getElementById('inputField');
let randomArray=[];
let randomIndex=0;

function displayWord() {
    if (currentIndex < data.length) {
        document.getElementById('wordDisplay').textContent = data[currentIndex].tango;
        document.getElementById('latinDisplay').textContent = data[currentIndex].latin;
        document.getElementById('latinDisplay').classList.add('default');
        document.getElementById('inputField').value = '';
        document.getElementById('inputField').focus();
        document.getElementById('missDisplay').textContent = ''; // エラーメッセージをリセット
    } else {
        document.getElementById('wordDisplay').textContent = 'お疲れ様でした！';
        document.getElementById('inputField').style.display = 'none';
        document.getElementById('latinDisplay').style.display = 'none';
        setTimeout(() => {
            window.location.href = 'index.html'; // 3秒後にindex.htmlにリダイレクト
        }, 3000); // 3000ミリ秒 = 3秒
    }
}

function checkInput() {
    let str = data[currentIndex].latin;
    let userInput = typeInput.value;
    userInput = userInput.replace(/[^a-zA-Z]-~/g, '');
    typeInput.value = userInput;
    // 入力が正しいかを確認
    if (userInput === str.substring(0, userInput.length)) {
        // 部分的に一致している場合は何もせず、次の文字の入力を待つ
        document.getElementById('missDisplay').textContent = '';
        document.getElementById('latinDisplay').classList.remove('default');
        document.getElementById('latinDisplay').classList.remove('no');
        document.getElementById('latinDisplay').classList.add('ok');
    } else {
        // 入力が間違っている場合、自動的にバックスペース
        document.getElementById('missDisplay').textContent = 'まちがってるよ';
        // 最後の文字を削除
        typeInput.value = userInput.slice(0, -1);
        document.getElementById('latinDisplay').classList.add('no');
        document.getElementById('latinDisplay').classList.remove('ok');
        //デバッグ用
        console.log('TypeErr');
    }

    // 入力が完全に一致した場合の処理
    if (userInput === str) {
        randomIndex++;
        currentIndex=randomArray[randomIndex];
        console.log(currentIndex);
        displayWord();
    }
}



function loadData() {
    fetch('data.json') // 外部JSONファイルを取得
        .then(response => {
            if (!response.ok) {
                throw new Error('ネットワークエラー: ' + response.statusText);
            }
            return response.json(); // JSON形式でレスポンスを解析
        })
        .then(jsonData => {
            data = jsonData; // データをグローバル変数に保存
            console.log('データが読み込まれました:', data); // デバッグ用にデータを表示
            displayWord(); // データがロードされたら単語を表示
        })
        .catch(error => {
            console.error('データの読み込みに失敗しました:', error);
        });
}

window.onload = function() {
    for(let i=0;i<10;i++){
        randomArray[i]=i;
    }
    for(let i=9;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [randomArray[i],randomArray[j]]=[randomArray[j],randomArray[i]];
    }
    console.log('OK');
    console.log(randomArray);
    currentIndex=randomArray[randomIndex];
    loadData(); // データをロード

};

window.oninput=function(){
    checkInput();
};