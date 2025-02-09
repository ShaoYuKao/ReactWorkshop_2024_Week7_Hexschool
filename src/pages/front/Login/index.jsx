import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullPageLoading from '../../../components/FullPageLoading';
import './Login.css';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function index() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  }); // 登入表單資料
  const [loading, setLoading] = useState(false); // 加載狀態

  /**
   * 使用者點擊[登入]按鈕，處理表單提交的異步函數
   * @param {Event} e 表單提交事件
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;

      // 寫入 cookie token
      // expires 設置有效時間
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

      axios.defaults.headers.common.Authorization = token;
      // 轉址到 /admin/products
      navigate("/admin/products");
    } catch (error) {
      alert("登入失敗: " + error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 處理輸入變更事件的函式
   * @param {Object} e 事件對象
   * @param {string} e.target.id - 觸發事件的元素的 ID
   * @param {string} e.target.value - 觸發事件的元素的值
   */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      {loading && <FullPageLoading />}
      <div className="container login">
        <h2 className="mb-3 font-weight-normal text-center">請先登入</h2>
        <div className="d-flex justify-content-center align-items-center" style={{ width: '50%' }}>
          <form id="form" className="form-signin" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="name@example.com"
                value={formData.username}
                onChange={handleInputChange}
                required
                autoFocus
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button
              className="btn btn-lg btn-primary w-100 mt-3"
              type="submit"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </>
    
  );
}

export default index;
