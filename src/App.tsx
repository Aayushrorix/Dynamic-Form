import './App.css';
import AddForm from './components/AddForm';
import AddQuestions from './components/AddQuestions';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Preview from './components/Preview';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route  path='/add-form' element={<AddForm/>}/>
          <Route  path='/edit-form/:oldId' element={<AddForm/>}/>
          <Route  path='/add-questions/:id' element={<AddQuestions/>}/>
          <Route  path='/preview/:id' element={<Preview/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;