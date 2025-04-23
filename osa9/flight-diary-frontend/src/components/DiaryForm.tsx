import { useState } from 'react';

const DiaryForm = () => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="date">date</label>
        <input id="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
      </div>
      <div>
        <label htmlFor="visibility">visibility</label>
        <input id="visibility" value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} />
      </div>
      <div>
        <label htmlFor="weather">weather</label>
        <input id="weather" value={newWeather} onChange={(event) => setNewWeather(event.target.value)} />
      </div>
      <div>
        <label htmlFor="comment">comment</label>
        <input id="comment" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
