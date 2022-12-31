import './App.css';
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Welcome from './components//Welcome'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// https://medium.com/@rrohit.maheshwari/react-app-using-redux-e6a1a69822d1

const App = props => {
  return (
    <div className="App">
      <h2>React redux sample app</h2>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Welcome />}></Route>
          <Route path='login' element={<LoginForm />}></Route>
          <Route path='register' element={<RegisterForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
