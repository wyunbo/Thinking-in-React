import React from '../react';

function Counter({ data }) {
  React.useEffect(() => {
    console.log('Counter DidMount or DidUpdate');
    return () => {
      console.log('Counter willUnmount');
    };
  });
  return (
    <div>
      <p>{data.number}</p>
    </div>
  );
}

function memberReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state.concat(action.payload);
    case 'remove':
      return state.filter((item) => item.userId !== action.payload);
    default:
      return [];
  }
}

function functionComp(props) {
  const { title, style } = props;
  const [number, setNumber] = React.useState(0);
  const [members, memberDispatch] = React.useReducer(memberReducer, []);
  const data = React.useMemo(
    () => ({
      number,
    }),
    [number]
  );

  function addMember() {
    memberDispatch({
      type: 'add',
      payload: {
        name: `name${members.length}`,
        userId: `id${members.length}`,
        teamId: `team${members.length}`,
      },
    });
  }

  function removeMember(userId) {
    memberDispatch({
      type: 'remove',
      payload: userId,
    });
  }

  const plusClick = React.useCallback(() => {
    setNumber((number) => number + 1);
  }, [number]);

  const minusClick = () => {
    setNumber((number) => number - 1);
  };

  return (
    <div>
      <div style={style}>{title}</div>
      <div style={style}>useEffect, useState</div>
      <Counter data={data} />
      <button onClick={plusClick}>+</button>
      <button onClick={minusClick}>-</button>
      <div style={style}>useReducer, Member list</div>
      {members.length ? (
        <ul>
          {members.map((item) => (
            <li key={item.userId}>
              <span>{item.name} | </span>
              <span>{item.userId} | </span>
              <span>{item.teamId} | </span>
              <a href="javascript:;" onClick={() => removeMember(item.userId)}>
                Remove
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div>No record</div>
      )}
      <button onClick={() => addMember()}>+</button>
    </div>
  );
}

export default functionComp;
