import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]; //title 이라는 태그 갖는 엘리멘트들 다 index.html 에서 가져옴
    //거기의 0번째 타이틀태그 가져오겠다.(지금은 title 태그 하나밖에 없음)
    titleElement.innerHTML = `감정 일기장 - 새 일기쓰기`; //태그 안에 들어가는 글자
  });

  return <DiaryEditor />;
};

export default New;
