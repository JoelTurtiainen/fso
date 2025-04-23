import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diaryService';
import { Diary } from './types';
import Content from './components/Content';
import Header from './components/Header';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  console.log(diaries);

  return (
    <div>
      <Header name={'Add new entry'} />
      <Notification message={errorMessage} />
      <DiaryForm diaries={diaries} setDiaries={setDiaries} notify={notify} />
      <Header name={'Diary entries'} />
      {diaries.map((diary) => (
        <Content key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;
