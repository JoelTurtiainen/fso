import { Diary } from '../types';
import styles from '../style.module.css';

const Content = ({ diary }: { diary: Diary }) => {
  return (
    <ul className={styles.noStyle}>
      <li>
        <b>{String(diary.date)}</b>
      </li>
      <li>{diary.weather}</li>
      <li>{diary.visibility}</li>
    </ul>
  );
};

export default Content;
