import React from './react';
import ReactDOM from './react-dom';

// JSX
const element = (
  <div>
    <span>Welcome, </span>
    <span>xxx</span>
  </div>
);
//Need JSX translate, babel translate
// JSX translation -> React.createElement
let result = React.createElement(
  'div',
  null,
  React.createElement('span', null, 'Welcome, '),
  React.createElement('span', null, 'xxx')
);
// -> virtual DOM
// result = {
//   type: 'div',
//   props: {
//     children: [
//       { type: 'span', props: { chidlren: 'Welcome' } },
//       { type: 'span', props: { children: 'xxx' } },
//     ],
//   },
// };

console.log(element, result);

ReactDOM.render(result, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
