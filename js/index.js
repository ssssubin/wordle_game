const 정답 = "APPLE";
let index = 0;
let attempts = 0; //시도하는 개수, row
let timer;
const rotate = [{ transform: "rotate(360deg)" }];
const clickKey = document.querySelector("footer");

function appStart() {
  //정답 못 맞췄을 때
  const FailGameOver = () => {
    const div = document.createElement("div"); // div라는 element 만듦
    div.innerText = "실패!!! 게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:35vh; left:42vw; background-color:white; font-weight:bold; width:250px; height:100px;"; //css 코드 그대로 작성, absolute는 body를 기준으로 설정됨
    document.body.appendChild(div); //div를 body에 삽입한다.
  };

  // 정답을 맞췄을 때
  const SuccessGameOver = () => {
    const good = document.createElement("div");
    good.innerText = "축하합니다! 정답입니다!!!!";
    good.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:35vh; left:44vw; background-color:#6baa64; color:white; font-weight:bold; width:200px; height:100px; transition: all 2s ease-in-out;";
    document.body.appendChild(good);
    good.animate(rotate, 2000);
  };

  //로직들
  const nextLine = () => {
    if (attempts === 5) return gameover(), FailGameOver();

    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); // 게임이 종료되면 key 입력이 되지 않음
    clearInterval(timer); // 게임이 끝나면 interval을 clear 시킴 => 타이머 멈춤
  };

  //키보드 키 클릭했을 때
  const clickKeyboard = (event) => {
    const key = event.target.innerText;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    ); //board-block이라는 클래스를 가지면서 data-index가 [attemps][index]인 값을 뽑는다

    if (key === "") {
      // backspace 키 클릭하면 지워짐
      handleBackspace();
    }
    // 단어가 다 입력 됐을 때
    else if (index === 5) {
      //엔터키 클릭했을 때
      if (key === "ENTER") handleEnterKey();
      else return; //함수 밖으로 나옴 -> 밑의 코드들은 실행되지 않음
    } else if ("A" <= key && key <= "Z" && key.length == 1) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const handleEnterKey = () => {
    //정답확인 코드 작성
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      const keyboard = document.querySelector(
        `.keyboard-block[data-key='${block.innerText}']`
      );

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.backgroundColor = "#6baa64";
        keyboard.style.backgroundColor = "#6baa64";
      } else if (정답.includes(입력한_글자)) {
        //입력한 글자가 정답 안에 포함되어 있을 때
        block.style.backgroundColor = "#cab458";
      } else {
        block.style.backgroundColor = "#787c7e";
        keyboard.style.backgroundColor = "#787c7e";
      }
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) return gameover(), SuccessGameOver();
    else {
      nextLine();
    }
  };

  //backspace 눌렀을 때 지워지도록
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase(); //현재 키
    const keyCode = event.keyCode; //현재 키 코드
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    ); //board-block이라는 클래스를 가지면서 data-index가 [attemps][index]인 값을 뽑는다

    if (event.key === "Backspace") {
      // backspace 키 누르면 지워짐
      handleBackspace();
    }
    // 단어가 다 입력 됐을 때
    else if (index === 5) {
      //엔터키 눌렀을 때
      if (event.key === "Enter") handleEnterKey();
      else return; //함수 밖으로 나옴 -> 밑의 코드들은 실행되지 않음
    } else if (65 <= keyCode && keyCode <= 90) {
      //알파벳만 입력하도록
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      timeh1 = document.querySelector("#time");
      timeh1.innerText = `time: ${분}:${초}`;
    }
    timer = setInterval(setTime, 1000); // setInterval의 id를 저장, 몇 번째 inteval이 돌고 있는지 control 할 수 있게 됨
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  clickKey.addEventListener("click", clickKeyboard);
}
appStart(); //함수 호출
