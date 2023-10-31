const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
// const holes = document.querySelectorAll(".hole");
// const scoreBoard =  document.querySelector(".score");
// const moles = document.querySelectorAll(".mole")
// 紀錄上次隨機的地洞
let lastHole;
// let lastHole;
// 遊戲時間是否已經到達
let timeUp = false;
// let timeUp = false;
// 遊戲得分
let score = 0;
// let score = 0;
// 倒數計時的顯示元素
const timerDisplay = document.querySelector(".controllPanel span");
// const timerDisplay = document.querySelector(".controllPanel span");
// 建立計時器
let countdown;
// let countdown;

/**
 * 地鼠出現的時間
 * @param {*} min
 * @param {*} max
 */
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
// function randomTime(min, max){
//   return Math.round(Math.random()* (max-min)+min);
// }

/**
 * 隨機出現地鼠的地洞
 * @param {*} holes
 */
function randomHole(holes) {
  // holes 是陣列，由 0 開始，所以利用 random 直接設定 random 範圍
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // 隨機有可能重複的地洞，所以建立變數排除重複
  if (hole === lastHole) {
    console.log("Ah nah thats the same one bud");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// function randomHole(holes){
//   const idx = Math.floor(Math.random() * holes.length);
//   const hole = holes[idx];
//   if(hole === lastHole){
//     console.log("Ah nah thats the same one bud");
//     return randomHole(holes);
//   }
//   lastHole = hole;
//   return hole;
// }

/**
 * 地鼠出現
 */
function peep() {
  // 地鼠出現的隨機時間
  const time = randomTime(500, 2000);
  // 地鼠出現的隨機地洞
  const hole = randomHole(holes);
  // 變更該地洞的地鼠樣式，讓其顯示
  hole.classList.add("up");
  // 地鼠出現的時間
  setTimeout(() => {
    hole.classList.remove("up");
    // 讓地鼠出現連續，遊戲時間到則停止
    if (!timeUp) peep();
  }, time);
}

// function peep(){
//   const time = randomTime(500,2000);
//   const hole = randomHole(holes);
//   holes.classList.add("up");
//   setTimeout(()=>{
//     hole.classList.remove("up");
//     if(!timeUp) peep();
//   },time);
// }

/**
 * 遊戲開始
 */
function startGame() {
  // 分數版歸 0
  scoreBoard.textContent = 0;
  // 遊戲時間標示
  timeUp = false;
  // 遊戲得分歸 0
  score = 0;
  // 地鼠開始出現
  peep();
  // 遊戲截止時間
  setTimeout(() => (timeUp = true), 30000);
  timer(30);
}

// function startGame(){
//   scoreBoard.textContent =0 ;
//   timeUp = false;
//   score = 0;
//   peep();
//   setTimeout(()=> (timeUp = true), 30000);
//   timer(30);
// }

/**
 * 打擊地鼠後得分
 * @param {*} e
 */
function bonk(e) {
  // 判斷是否真的使用滑鼠點擊
  if (!e.isTrusted) return; // cheater!
  // 分數 + 1
  score++;
  // 移除地鼠顯示
  this.parentNode.classList.remove("up");
  // 顯示得分
  scoreBoard.textContent = score;
}

// function bonk(e){
//   if(!e.isTrusted) return;
//   score++;
//   this.parentNode.classList.remove("up");
//   scoreBoard.textContent = score;
// }

/**
 * 倒數計時器
 * @param {*} seconds
 */
function timer(seconds) {
  // 先清除其他計時器，避免相互影響
  clearInterval(countdown);
  // 顯示倒數計時
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    // 每秒鐘執行，所以直接每次減 1 就好
    seconds--;
    // 小於 0 時，清除計時器
    if (seconds < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(seconds);
  }, 1000);
}

// function timer(seconds){
//   clearInterval(countdown);
//   displayTimeLeft(seconds);
//   countdown = setInterval(()=>{
//     seconds--;
//     if(seconds<0){
//       clearInterval(countdown);
//       return;
//     }
//     displayTimeLeft(seconds);
//   },1000);
// }

/**
 * 顯示倒數計時
 * @param {*} seconds 秒數
 */
function displayTimeLeft(seconds) {
  // 計算幾分鐘
  const minutes = Math.floor(seconds / 60);
  // 計算剩餘秒數
  const remainderSeconds = seconds % 60;
  // 組合顯示文字(剩餘時間)
  const display = `${paddingLeft(minutes.toString(), 2)}:${paddingLeft(
    remainderSeconds.toString(),
    2
  )}`;
  // 顯示倒數計時
  timerDisplay.textContent = display;
}
/**
 * 文字在指定長度中左邊補 0
 * @param {*} str 輸入文字
 * @param {*} lenght 補 0 的長度
 */
function paddingLeft(str, lenght) {
  if (str.length >= lenght) return str;
  else return paddingLeft("0" + str, lenght);
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
