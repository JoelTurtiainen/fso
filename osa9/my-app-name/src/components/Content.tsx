import Part from './Part';
import { CoursePart } from './types';

const Content = ({ part }: { part: CoursePart }) => {
  return <Part part={part} />;
};

export default Content;
