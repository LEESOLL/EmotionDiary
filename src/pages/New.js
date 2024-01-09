import DiaryEditor from "../components/DiaryEditor";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const New = () => {
  return <DiaryEditor />;
};

export default New;
