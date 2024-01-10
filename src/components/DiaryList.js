import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  // value - select 가 어떤걸 선택하고 있는지
  // onChange - selec 가 선택하는 걸로 기능을 바꿀 함수
  // select 태그 안에 들어갈 옵션
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest"); // 일기 정렬 시 사용할 변수 선언(정렬기준선택)
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else if (filter === "bad") {
        return parseInt(item.emotion) > 3;
      }
    };

    // 일기를 날짜순으로 정렬해서 반환하는 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        // 문자열로 들어올 수도 있기 때문에 parseInt 써준다
        return parseInt(b.date) - parseInt(a.date); //일기 느린순 정렬
      } else {
        return parseInt(a.date) - parseInt(b.date); //일기 빠른순 정렬
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 배열의 깊은 복사 (sort 그냥 해버리면 원본배열이 변경되기 때문에)
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((item) => filterCallBack(item));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
