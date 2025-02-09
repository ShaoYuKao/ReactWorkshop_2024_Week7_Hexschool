import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullPageLoading from '@/components/FullPageLoading';
import { clearToken, redirectToLogin } from '@/utils/auth';

const API_BASE = import.meta.env.VITE_API_BASE;

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [loading, setLoading] = useState(false); // 加載狀態

  /**
   * 執行登出操作的非同步函式。
   * 
   * 此函式會向伺服器發送登出請求，並根據伺服器回應的結果進行處理。
   * 如果登出成功，會清除瀏覽器中的 cookie 並更新認證狀態。
   * 如果登出失敗，會在控制台顯示錯誤訊息。
   * 
   * @async
   * @function logout
   * @throws {Error} 如果伺服器回應登出失敗，會拋出錯誤。
   */
  const logout = async () => {
    setLoading(true);
    const url = `${API_BASE}/logout`;

    try {
      const res = await axios.post(url);
      const { success, message } = res.data;
      if (!success) {
        throw new Error(message);
      }
    } catch (error) {
      console.error("登出失敗", error);
    } finally {
      axios.defaults.headers.common["Authorization"] = undefined;
      clearToken();
      setLoading(false);
      redirectToLogin(navigate);
    }
  };

  return (
    <>
      {loading && <FullPageLoading />}
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
                  <button className="btn btn-outline-success" type="button" onClick={logout}>登出</button>
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

export default AdminLayout;