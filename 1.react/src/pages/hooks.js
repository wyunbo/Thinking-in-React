import React from '../react';

function Animation(props) {
  const ref = React.useRef();
  const layoutRef = React.useRef();
  React.useEffect(() => {
    ref.current.style.WebkitTransform = 'translate(400px)';
    ref.current.style.transition = 'all 1000ms';
  });
  React.useLayoutEffect(() => {
    layoutRef.current.style.WebkitTransform = 'translate(400px)';
    layoutRef.current.style.transition = 'all 1000ms';
  });
  const style = {
    width: '200px',
    height: '100px',
    backgroundColor: 'green',
  };
  const layoutStyle = { ...style, backgroundColor: 'yellow' };
  return (
    <div>
      <div style={props.style}>{props.title}</div>
      <div ref={ref} style={style}>
        useEffect
      </div>
      <div ref={layoutRef} style={layoutStyle}>
        useLayoutEffect
      </div>
    </div>
  );
}

export default Animation;
