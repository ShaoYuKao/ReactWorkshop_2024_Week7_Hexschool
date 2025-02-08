import { Outlet, Link, useLocation } from 'react-router-dom';

function AdminLayout() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <header className="p-3">
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <label className="navbar-brandv h2">後台</label>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/admin/products" className={`nav-link px-2 ${pathname === '/admin/products' ? 'active' : ''}`}>產品管理</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/orders" className={`nav-link px-2 ${pathname === '/admin/orders' ? 'active' : ''}`}>訂單管理</Link>
                  </li>
                </ul>

                <form className="d-flex">
                  <button className="btn btn-outline-success" type="button">登出</button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <footer>
        <div className="container">
          <p>© 2024 React 作品實戰冬季班 第六週</p>
        </div>
      </footer>
    </div>
  );
}

export default AdminLayout;