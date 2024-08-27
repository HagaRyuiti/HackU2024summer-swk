// タイマーの時間を表示する場所を覚えておく変数
let timerStringDOM;

// 開始時間を記録しておく変数
let startTime;

// タイマーを識別するID
let timerId = null;

// 現在の経過時間を記録しておく変数
let currentTimerTime = 0;

// ミリ秒を経過時間の文字列に直す関数
function msecToSecString(time) {
  // 単位をミリ秒から秒へ変換
  time = Math.floor(time / 1000);

  // 秒数
  const seconds = time % 60;
  // 分数
  const minutes = Math.floor(time / 60);

  // 取得した数値をも2桁の文字列になるように、必要に応じて0を補う
  const secondStr = (seconds < 10 ? '0' : '') + String(seconds);
  const minutesStr = (minutes < 10 ? '0' : '') + String(minutes);

  return minutesStr + ":" + secondStr;
}

// タイマーの時刻を更新する処理
function UpdateTimer() {
  // 現在の時刻を取得
  const nowTime = new Date().getTime();

  // タイマーの表示を更新
  timerStringDOM.innerHTML = msecToSecString(nowTime - startTime);
}

