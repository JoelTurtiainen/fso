import Course from "./components/Course";

const App = ({ courses }) => (
  <>
    <h1>Web development curriculum</h1>
    {courses.map((course) => <Course key={course.id} course={course} />)}
  </>
);

export default App;
