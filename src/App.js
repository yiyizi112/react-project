import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Layout} from '@/pages/Layout'
import {Login} from '@/pages/Login'
import { Button } from 'antd';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Button type="primary">Primary Button</Button>

        <Routes>
          <Route path = '/' element={<Layout/>}></Route>
          <Route path = '/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
