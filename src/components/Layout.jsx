import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="m-3 md:m-10">
        <Outlet />
      </main>
    </>
  );
}
