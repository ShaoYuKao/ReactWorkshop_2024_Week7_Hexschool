import { Outlet, Link, useLocation } from 'react-router-dom';

function FrontendLayout() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <header className="p-3">
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              {/* <a className="navbar-brand" href="#">Navbar</a> */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" className={`nav-link px-2 ${pathname === '/' ? 'active' : ''}`}>首頁</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/product" className={`nav-link px-2 ${pathname === '/product' ? 'active' : ''}`}>產品</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link to="/cart" className={`nav-link px-2 ${pathname === '/cart' ? 'active' : ''}`}>購物車</Link>
                  </li>
                </ul>
                <form className="d-flex">
                  <Link to="/login" className="btn btn-outline-primary me-2">登入</Link>
                </form>
              </div>
            </div>
          </nav>

        </div>
      </header>
      
      <main className="content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-light text-center py-3">
        <div className="container">
          <p className="text-center">© 2024 React 作品實戰冬季班 第六週</p>
        </div>
      </footer>
    </>
  );
}

export default FrontendLayout;
