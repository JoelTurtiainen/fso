import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({ stats }) => {
  const [good, neutral, bad] = stats;

  const total = [good + neutral + bad]
  const average = ((-bad + good) / total).toFixed(1);
  const positive = (good / total * 100).toFixed(1);

  if (total > 0) {
    return (
      <table>
        <tbody>
          <Stat text={"good"} value={good} />
          <Stat text={"neutral"} value={neutral} />
          <Stat text={"bad"} value={bad} />

          <Stat text={"total"} value={total} />
          <Stat text={"average"} value={average} />
          <Stat text={"positive"} value={positive} />
        </tbody>
      </table>
    )
  } else {
    return (<p>No feedback given</p>)
  }
}

const Stat = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = [good, neutral, bad]

  return (
    <>

      <div>
        <h2>give feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text={"good"} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
        <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      </div>

      <div>
        <h2>statistics</h2>
        <Statistics stats={all} />
      </div>

    </>
  )
}

export default App
