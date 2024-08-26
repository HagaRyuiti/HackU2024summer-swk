// 開始時間を記録しておく変数
let startTime;

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
function updateTimer() {
  // 現在の時刻を取得
  const nowTime = new Date().getTime();

  // タイマーの表示を更新
  document.getElementById('timer').innerHTML = msecToSecString(nowTime - startTime);
}

// ページが完全に読み込まれた後に実行される処理
window.onload = function() {
  // タイマーの開始時間を記録
  startTime = new Date().getTime();

  // 1秒ごとにタイマーを更新
  setInterval(updateTimer, 1000);
};
