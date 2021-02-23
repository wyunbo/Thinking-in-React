import React from '../react';

function Counter(props) {
  React.useEffect(() => {
    console.log('Counter DidMount or DidUpdate');
    return () => {
      console.log('Counter willUnmount');
    };
  });
  return (
    <div>
      <p>{props.number}</p>
    </div>
  );
}
function functionComp(props) {
  const { title, style } = props;
  const [number, setNumber] = React.useState(0);
  return (
    <div>
      <div style={style}>{title}</div>
      <Counter number={number} />
      <button onClick={() => setNumber((number) => number + 1)}>+</button>
      <button onClick={() => setNumber((number) => number - 1)}>-</button>
    </div>
  );
}

export default functionComp;
