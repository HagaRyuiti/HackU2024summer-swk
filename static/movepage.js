// page1の遷移を行う関数
function showPage1(pageId) {
    // タイマーをリセット
    clearInterval(timerId); // タイマーが動いている場合は停止
    timerId = null; // タイマーIDをリセット
    startTime = 0; // 開始時間をリセット
    currentTimerTime = 0; // 経過時間をリセット
    //timerStringDOM = document.getElementById('timer1');
    //timerStringDOM.innerHTML = '00:00'; // タイマー表示をリセット

    // データのインデックスをリセット
    currentIndex = 0;

    // skipした回数をリセット
    skipsum = 0;

    // ディスプレイの表示をリセット
    document.getElementById("number2").innerHTML = '';
    document.getElementById("tango2").innerHTML = '';
    document.getElementById("yomi2").innerHTML = '';
    document.getElementById("explain2").innerHTML = '';
    document.getElementById("textbox2").value = '';
    
    document.getElementById("number3").innerHTML = '';
    document.getElementById("explain3").innerHTML = '';
    document.getElementById("textbox3").value = '';

    // すべてのページを非表示にする
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    // 選択されたページを表示する
    var selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');
}

// page2の遷移を行う関数
function showPage2(pageId) {
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


    // すべてのページを非表示にする
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    // 選択されたページを表示する
    var selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');
}

// page3の遷移を行う関数
function showPage3(pageId) {
    timerStringDOM = document.getElementById('timer3');

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


    // すべてのページを非表示にする
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    // 選択されたページを表示する
    var selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');
}
