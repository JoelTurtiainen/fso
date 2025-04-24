import React, { useState } from 'react';
import { createDiary } from '../services/diaryService';
import { DiaryFormProps } from '../types';
import styles from '../style.module.css';
import axios from 'axios';

const DiaryForm = (props: DiaryFormProps) => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = { date: newDate, visibility: newVisibility, weather: newWeather, comment: newComment };
    createDiary(newDiary)
      .then((data) => {
        props.setDiaries(props.diaries.concat(data));
        setNewDate('');
        // setNewVisibility('');
        // setNewWeather('');
        setNewComment('');
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && typeof error.response?.data === 'string') {
          console.error(error.response);
          const errormsg = error.response.data.replace('Something went wrong. ', '');
          props.notify(errormsg);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <form onSubmit={submitForm} className={styles.form}>
      <fieldset>
        <legend>date</legend>
        <input type="date" id="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
      </fieldset>
      <fieldset className={styles.pl1}>
        <legend>visibility</legend>
        {['great', 'good', 'ok', 'poor'].map((v) => (
          <React.Fragment key={v}>
            <label htmlFor={v}>{v}</label>
            <input type="radio" name="visibility" id={v} value={newVisibility} onChange={() => setNewVisibility(v)} />
          </React.Fragment>
        ))}
      </fieldset>
      <fieldset className={styles.pl1}>
        <legend>weather</legend>
        {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((v) => (
          <React.Fragment key={v}>
            <label htmlFor={v}>{v}</label>
            <input type="radio" name="weather" id={v} value={newWeather} onChange={() => setNewWeather(v)} />
          </React.Fragment>
        ))}
      </fieldset>
      <fieldset>
        <legend>comment</legend>
        <input id="comment" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
      </fieldset>

      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
