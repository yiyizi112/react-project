import {BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import GeekLayout from '@/pages/Layout'
import {Login} from '@/pages/Login'
import {AuthComponent} from '@/components/AuthComponent'
import './App.css'
import Home from './pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'
import { history } from './utils/history'


function App() {
  // const elements = useRoutes(routes)
  return (
    <HistoryRouter history={history}> 
      <div className="App">
        <Routes>
          {/* 鉴权处理 */}
          <Route path = '/' element={
            <AuthComponent>
              <GeekLayout/>
            </AuthComponent>  
          }>
            <Route index element = {<Home/>}/>
            <Route path = 'article' element = {<Article/>}></Route>
            <Route path = 'publish' element = {<Publish/>}></Route>
            {/* {elements} */}

          </Route>
          <Route path = '/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
