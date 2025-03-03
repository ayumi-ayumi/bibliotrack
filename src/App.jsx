import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookshelf from "./pages/Bookshelf";
import AddBook from "./pages/AddBook";
import Page404 from "./pages/NotFound";
import Layout from "./components/Layout";
import { BookProvider } from "./contexts/BookContext";
import ToReadPile from "./pages/ToReadPile";

function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true , v7_startTransition: true }}>
      <BookProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/toread" element={<ToReadPile />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;
