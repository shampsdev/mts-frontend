import { Header } from './components/header/header.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home.page';
import { FindPage } from './pages/find.page';
import { UserSheet } from './components/sheet/user-sheet.component';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/find' element={<FindPage />} />
        </Routes>
        <UserSheet />
      </BrowserRouter>
    </div>
  );
}
