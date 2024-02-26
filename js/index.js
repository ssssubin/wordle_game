const 정답 = "APPLE";
let index = 0;
let attempts = 0; //시도하는 개수, row

function appStart() {
  //로직들
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); // 게임이 종료되면 key 입력이 되지 않음
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
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.backgroundColor = "#6baa64";
      } else if (정답.includes(입력한_글자)) {
        //입력한 글자가 정답 안에 포함되어 있을 때
        block.style.backgroundColor = "#cab458";
      } else {
        block.style.backgroundColor = "#787c7e";
      }
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase(); //현재 키
    const keyCode = event.keyCode; //현재 키 코드
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    ); //board-block이라는 클래스를 가지면서 data-index가 00인 값을 뽑는다

    // 단어가 다 입력 됐을 때
    if (index === 5) {
      //엔터키 눌렀을 때
      if (event.key === "Enter") handleEnterKey();
      else return; //함수 밖으로 나옴 -> 밑의 코드들은 실행되지 않음
    } else if (65 <= keyCode && keyCode <= 90) {
      //알파벳만 입력하도록
      thisBlock.innerText = key;
      index += 1;
    }
  };
  window.addEventListener("keydown", handleKeydown);
}
appStart(); //함수 호출
