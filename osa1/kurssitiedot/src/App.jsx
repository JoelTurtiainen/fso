const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

   return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>
  );
};

const Part = ({part, exercise}) => {
  return (
      <p>{part} {exercise}</p>
  )
}

const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((acc, curr) => acc + curr, 0);

  return <p>Number of exercises {sum}</p>;
};

export default App;
