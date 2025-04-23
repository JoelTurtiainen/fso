import { JSX } from 'react';
import { assertNever } from '../utils';
import { CoursePart } from './types';

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  const noStyle = { listStyle: 'none', padding: 0 };
  switch (part.kind) {
    case 'basic':
      return (
        <ul style={noStyle}>
          <li>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </li>
          <li>
            <i>{part.description}</i>
          </li>
        </ul>
      );
    case 'group':
      return (
        <ul style={noStyle}>
          <li>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </li>
          <li>project exercises {part.groupProjectCount}</li>
        </ul>
      );
    case 'background':
      return (
        <ul style={noStyle}>
          <li>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </li>
          <li>
            <i>{part.description}</i>
          </li>
          <li>{part.backgroundMaterial}</li>
        </ul>
      );
    case 'special':
      return (
        <ul style={noStyle}>
          <li>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </li>
          <li>
            <i>{part.description}</i>
          </li>
          <li>required skills: {part.requirements.join(', ')}</li>
        </ul>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
