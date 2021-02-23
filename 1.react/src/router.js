import IndexPage from './pages/home';
import FunctionComp from './pages/functionComp';
import ClassComp from './pages/classComp';
import LifeCycle from './pages/lifeCycle';
import Hooks from './pages/hooks';

export default [
  {
    path: '/',
    name: 'Index',
    component: IndexPage,
  },
  {
    path: '/functionComp',
    name: 'FunctionComp',
    component: FunctionComp,
  },
  {
    path: '/classComp',
    name: 'ClassComp',
    component: ClassComp,
  },
  {
    path: '/lifeCycle',
    name: 'LifeCycle',
    component: LifeCycle,
  },
  {
    path: '/hooks',
    name: 'Hooks',
    component: Hooks,
  },
];
