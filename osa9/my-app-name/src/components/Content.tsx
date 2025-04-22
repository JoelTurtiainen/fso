interface ContentProps {
  name: string;
  count: number;
}

const Content = (props: ContentProps) => <p> {props.name} {props.count} </p>

export default Content
