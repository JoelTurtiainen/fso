const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const allExcercises = [exercises1, exercises2, exercises3];

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} excercises={[exercises1, exercises2, exercises3]} />
      <Total numbers={allExcercises} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} excercise={props.excercises[0]} />
      <Part part={props.parts[1]} excercise={props.excercises[1]} />
      <Part part={props.parts[2]} excercise={props.excercises[2]} />
    </div>
  );
};

const Part = (props) => {
  return (
      <p>{props.part} {props.excercise}</p>
  )
}

const Total = (props) => {
  const sum = props.numbers.reduce((acc, curr) => acc + curr, 0);
  return <p>Number of exercises {sum}</p>;
};

export default App;
