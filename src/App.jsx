import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import { BookProvider } from './contexts/BookContext';
import { AuthProvider } from './contexts/AuthProvider';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Bookshelf from './pages/Bookshelf';
import AddBook from './pages/AddBook';
import ToReadPile from './pages/ToReadPile';
import Page404 from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <BookProvider>
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="bookshelf" element={<Bookshelf />} />
                <Route path="add" element={<AddBook />} />
                <Route path="toread" element={<ToReadPile />} />
              </Route>
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BookProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
