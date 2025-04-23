import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diaryService';
import { Diary } from './types';
import Content from './components/Content';
import Header from './components/Header';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  console.log(diaries);

  return (
    <div>
      <Header name={'Add new entry'} />
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <Header name={'Diary entries'} />
      {diaries.map((diary) => (
        <Content key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;
