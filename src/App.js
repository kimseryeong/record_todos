import './App.css'
import Header from './components/Header';
import Calendar from './components/Calendar';
import TodoTemplate from './components/TodoTemplate';
import Main from './components/Main';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Header />
        <Main>
          <TodoTemplate />
          <Calendar/>
        </Main>
      </RecoilRoot>
    </div>
  );
}