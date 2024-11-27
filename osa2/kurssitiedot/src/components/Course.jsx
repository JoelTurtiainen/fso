const Course = ({ course }) => {
  const exercises = course.parts.map(part => part.exercises)
  const sum = exercises.reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong>total of {sum} exercises</strong>
    </div>
  )
}

const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  );
};

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

export default Course
