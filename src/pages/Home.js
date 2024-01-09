import React, { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    //이 과정은 시간이 걸리는 과정이기 때문에 diaryList가 없으면 실행될 필요가 없음. 그래서 조건 걸어줌
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1 //지금 년도 지금 월 1일이 됨
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0 //지금 년도 지금 월 마지막날이 됨
      ).getTime();

      // 이렇게 첫번째 일과 마지막 일을 추리면 이 날 사이에 작성된 일기만을 추릴 수 있음

      setData(
        diaryList.filter(
          (item) => firstDay <= item.date && item.date <= lastDay
        )
      );
    }
  }, [diaryList, curDate]); // diaryList를 의존성 배열에 넣어야 하는 이유는 diaryList가 수정 변겅 삭제가 일어나면 이 부분도 재렌더링 되어야 하기 때문에

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
