import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );

      // targetDiary가 존재하지 않으면(없는 다이어리의 id 값을 가진 url로 접속할 경우)
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true }); // 홈화면으로 돌려보내고 잘못된 페이지로는 뒤로가기 불가능하게 하기
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
