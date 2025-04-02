import './App.css';
import PedroMessage from './components/PedroMessage';

import Angela from "./components/Angela";
import Lilly from './components/Lily';
import Pedro from "./components/Pedro";
import Petra from './components/Petra';
import Robert from './components/Robert';
import AngelaMessage from './components/AngelaMessage';
import LillyMessage from './components/LillyMessage';
import PetraMessage from './components/PetraMessage';
import RobertMessage from './components/RobertMessage';


export default function App() {
  return (
    <div>
      <Angela />
      <Pedro />
      <Lilly />
      <Petra />
      <Robert />
    <PedroMessage />
    <AngelaMessage />
    <LillyMessage />
    <PetraMessage />
    <RobertMessage />
    
    </div>
  )
}