import './App.css'
import Header from './components/Header';
import Main from './components/Main';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Header />
        <Main />
      </RecoilRoot>
    </div>
  );
}