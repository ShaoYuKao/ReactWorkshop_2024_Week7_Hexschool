import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, clearToken, checkAdmin, redirectToLogin } from '@/utils/auth';
import FullPageLoading from '@/components/FullPageLoading';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminOrders() {
  const [loading, setLoading] = useState(false); // 加載狀態
  const [orders, setOrders] = useState([]); // 訂單清單
  const [page, setPage] = useState(1); // 頁碼

  useEffect(() => {
    if (getToken()) {
      setLoading(true);
      const result = checkAdmin();
      if (!result) {
        clearToken();
        setLoading(false);
        goToLoginPage();
      } else {
        fetchOrders(page);
      }
      setLoading(false);
    } else {
      goToLoginPage();
    }
  }, [page]);

  /**
   * 非同步函式，用於根據頁碼取得訂單資料。
   * 
   * @async
   * @function fetchOrders
   * @param {number} pageNumber - 要取得的頁碼。
   * @returns {Promise<void>} 無返回值。
   * @throws 取得訂單失敗時，會在控制台輸出錯誤訊息。
   */
  const fetchOrders = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/orders?page=${pageNumber}`);
      if(!response.data.success){
        console.error("取得訂單失敗", response.data);
        alert("取得訂單失敗");
        return;
      }
      setOrders(response.data.orders);
    } catch (error) {
      console.error("取得訂單失敗", error);
      alert("取得訂單失敗");
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * 刪除指定的訂單。
   * 
   * @async
   * @function handleDeleteOrder
   * @param {string} orderId - 要刪除的訂單 ID。
   * @returns {Promise<void>} - 無返回值。
   * @throws {Error} - 如果刪除訂單失敗，則拋出錯誤。
   */
  const handleDeleteOrder = async (orderId) => {
    setLoading(true);
    try {
      const result =  await axios.delete(`${API_BASE}/api/${API_PATH}/admin/order/${orderId}`);
      if (!result.data.success) {
        console.error("刪除訂單失敗", result.data);
        return;
      }
      // 重新撈取訂單清單
      fetchOrders(page);
    } catch (error) {
      console.error("刪除訂單失敗", error);
      alert("刪除訂單失敗");
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * 清空所有訂單的處理函式。
   * 此函式會發送一個請求至伺服器以刪除所有訂單，並在成功後清空本地的訂單清單。
   * 
   * @async
   * @function handleClearOrders
   * @returns {Promise<void>} 無返回值
   * @throws 會在請求失敗時拋出錯誤並在控制台顯示錯誤訊息
   */
  const handleClearOrders = async () => {
    setLoading(true);
    try {
      const result = await axios.delete(`${API_BASE}/api/${API_PATH}/admin/orders/all`);
      if (!result.data.success) {
        console.error("全部刪除失敗", result.data);
        return;
      }
      // 清空訂單清單
      setOrders([]);
    } catch (error) {
      console.error("全部刪除失敗", error);
      alert("全部刪除失敗");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 返回登入頁面
   */
  const goToLoginPage = () => {
    redirectToLogin(navigate);
  };

  return (
    <>
      {loading && <FullPageLoading />}
      <h2 className="text-center">訂單管理</h2>
      <div>
        {orders.length > 0 ? (
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                訂單 ID: {order.id}
                <button onClick={() => handleDeleteOrder(order.id)}>刪除</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>目前沒有訂單</p>
        )}
        <button onClick={handleClearOrders}>全部刪除</button>
      </div>
    </>
  );
}

export default AdminOrders;
