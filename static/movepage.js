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
