import { Outlet } from 'react-router-dom';

function FrontendLayout() {
  return (
    <div>
      <header>Frontend Header</header>
      <main>
        <h1>Frontend Layout</h1>
        <Outlet />
      </main>
      <footer>Frontend Footer</footer>
    </div>
  );
}

export default FrontendLayout;
