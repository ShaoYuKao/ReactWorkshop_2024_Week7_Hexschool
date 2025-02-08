import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div>
      <header>AdminLayout Header</header>
      <main>
        <h1>AdminLayout Layout</h1>
        <Outlet />
      </main>
      <footer>AdminLayout Footer</footer>
    </div>
  );
}

export default AdminLayout;