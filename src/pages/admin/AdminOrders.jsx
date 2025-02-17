import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, clearToken, checkAdmin, redirectToLogin } from '@/utils/auth';
import FullPageLoading from '@/components/FullPageLoading';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import Pagination from '@/components/Pagination';
import { useDispatch } from 'react-redux';
import { createAsyncMessage, MESSAGE_TYPES } from '@/store/messageSlice';
dayjs.locale('zh-tw');

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminOrders() {
  const [loading, setLoading] = useState(true); // 加載狀態
  const [orders, setOrders] = useState([]); // 訂單清單
  const [page, setPage] = useState(1); // 頁碼
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const [productModal, setProductModal] = useState({
    isShow: false,
    products: {}
  }); // 產品清單 Modal
  const [userModal, setUserModal] = useState({
    isShow: false,
    user: {}
  }); // 訂單者資訊 Modal
  const [clearOrdersModal, setClearOrdersModal] = useState(false); // 清空訂單 Modal
  const [deleteOrderModal, setDeleteOrderModal] = useState({
    isShow: false,
    orderId: null
  }); // 刪除訂單 Modal
  const dispatch = useDispatch();

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
        dispatch(createAsyncMessage({ type: MESSAGE_TYPES.FAIL, message: "取得訂單失敗" }));
        return;
      }
      setOrders(response.data.orders);
      setTotalPages(response.data.pagination.total_pages); // 取得總頁數
    } catch (error) {
      console.error("取得訂單失敗", error);
      dispatch(createAsyncMessage({ type: MESSAGE_TYPES.FAIL, message: "取得訂單失敗: " + error }));
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
    openDeleteOrderModal(orderId);
  };

  /**
   * handleConfirmDeleteOrder 函式用於確認刪除訂單。
   * 
   * @returns {void}
   * 
   * 此函式會先將 loading 狀態設為 true，然後嘗試呼叫 axios.delete 來刪除指定的訂單。
   * 如果刪除成功，會重新撈取訂單清單並關閉刪除訂單的模態框。
   * 如果刪除失敗，會在控制台顯示錯誤訊息並彈出警告框。
   * 最後，無論成功或失敗，都會將 loading 狀態設為 false。
   */
  const handleConfirmDeleteOrder = async () => {
    setLoading(true);
    try {
      const result =  await axios.delete(`${API_BASE}/api/${API_PATH}/admin/order/${deleteOrderModal.orderId}`);
      if (!result.data.success) {
        console.error("刪除訂單失敗", result.data);
        dispatch(createAsyncMessage({ type: MESSAGE_TYPES.FAIL, message: "刪除訂單失敗" }));
        return;
      }
      // 重新撈取訂單清單
      fetchOrders(page);
      closeDeleteOrderModal();
    } catch (error) {
      console.error("刪除訂單失敗", error);
      dispatch(createAsyncMessage({ type: MESSAGE_TYPES.FAIL, message: "刪除訂單失敗: " + error }));
    } finally {
      setLoading(false);
    }
  };

  /**
   * 開啟刪除訂單的模態框。
   * 
   * @param {string} orderId - 要刪除的訂單 ID。
   */
  const openDeleteOrderModal = (orderId) => {
    setDeleteOrderModal({
      isShow: true,
      orderId: orderId
    });
  };

  /**
   * 關閉刪除訂單的模態框。
   * 將模態框的顯示狀態設置為 false，並將 orderId 設置為 null。
   */
  const closeDeleteOrderModal = () => {
    setDeleteOrderModal({
      isShow: false,
      orderId: null
    });
  };
  
  /**
   * 清空所有訂單的處理函式。
   * 此函式會發送一個請求至伺服器以刪除所有訂單，並在成功後清空本地的訂單清單。
   * 
   * @async
   * @function handleConfirmClearOrders
   * @returns {Promise<void>} 無返回值
   * @throws 會在請求失敗時拋出錯誤並在控制台顯示錯誤訊息
   */
  const handleConfirmClearOrders = async () => {
    setLoading(true);
    try {
      const result = await axios.delete(`${API_BASE}/api/${API_PATH}/admin/orders/all`);
      if (!result.data.success) {
        console.error("全部刪除失敗", result.data);
        dispatch(createAsyncMessage({ type: MESSAGE_TYPES.FAIL, message: "全部刪除失敗" }));
        return;
      }
      // 清空訂單清單
      setOrders([]);
      closeClearOrdersModal();
    } catch (error) {
      console.error("全部刪除失敗", error);
      dispatch(createAsyncMessage({ type: MESSAGE_TYPES.FAIL, message: "全部刪除失敗: " + error }));
    } finally {
      setLoading(false);
    }
  };

  /**
   * 開啟清空訂單 Modal。
   */
  const openClearOrdersModal = () => {
    setClearOrdersModal(true);
  };

  /**
   * 關閉清空訂單 Modal。
   */
  const closeClearOrdersModal = () => {
    setClearOrdersModal(false);
  };

  /**
   * 返回登入頁面
   */
  const goToLoginPage = () => {
    redirectToLogin(navigate);
  };

  /**
   * 開啟產品 Modal。
   * 
   * @param {Array} products - 要顯示在 Modal 中的產品列表。
   */
  const openProductModal = (products) => {
    setProductModal({
      isShow: true,
      products: products
    });
  };

  /**
   * 關閉產品 Modal。
   * 將產品 Modal 的狀態設置為不顯示，並清空產品資料。
   */
  const closeProductModal = () => {
    setProductModal({
      isShow: false,
      products: {}
    });
  };

  /**
   * 開啟用戶 Modal 並設置用戶信息。
   * 
   * @param {Object} order - 訂單對象。
   * @param {Object} order.user - 訂單中的用戶對象。
   * @param {string} order.message - 訂單中的消息。
   */
  const openUserModal = (order) => {
    const user = order.user;
    user.message = order.message;
    setUserModal({
      isShow: true,
      user: user
    });
  };

  /**
   * 關閉使用者 Modal。
   * 將 `isShow` 設為 `false` 並重置 `user` 為空對象。
   */
  const closeUserModal = () => {
    setUserModal({
      isShow: false,
      user: {}
    });
  };

  return (
    <>
      {loading && <FullPageLoading />}
      <h2 className="text-center">訂單管理</h2>
      <div className="table-responsive">
        {orders.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>編號</th>
                <th>產品數量</th>
                <th>已付款</th>
                <th>總金額</th>
                <th>時間</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{Object.keys(order.products).length}</td>
                  <td>{order.is_paid ? '是' : '否'}</td>
                  <td>{order.total}</td>
                  <td>{dayjs(order.create_at*1000).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-1" onClick={() => openProductModal(order.products)}>產品清單</button>
                    <button className="btn btn-warning btn-sm me-1" onClick={() => openUserModal(order)}>訂單者資訊</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteOrder(order.id)}>刪除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>目前沒有訂單</p>
        )}
        <button className="btn btn-danger" onClick={openClearOrdersModal}>全部刪除</button>
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
      {/* Pagination */}

      {/* 產品清單 Modal */}
      <div className={`modal fade ${productModal.isShow ? 'show' : ''}`} style={{ display: productModal.isShow ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">產品清單</h5>
              <button type="button" className="btn-close" onClick={closeProductModal}></button>
            </div>
            <div className="modal-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>分類</th>
                    <th>圖片</th>
                    <th>商品名稱</th>
                    <th>價格</th>
                    <th>數量</th>
                    <th>總計</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(productModal.products).map(product => (
                    <tr key={product.id}>
                      <td>{product.product.category}</td>
                      <td><img src={product.product.imageUrl} alt={product.product.title} style={{ width: '50px', height: '50px' }} /></td>
                      <td>{product.product.title}</td>
                      <td>{product.product.price}</td>
                      <td>{product.qty}</td>
                      <td>{product.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {productModal.isShow && <div className="modal-backdrop fade show"></div>}

      {/* 訂單者資訊 Modal */}
      <div className={`modal fade ${userModal.isShow ? 'show' : ''}`} style={{ display: userModal.isShow ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">訂單者資訊</h5>
              <button type="button" className="btn-close" onClick={closeUserModal}></button>
            </div>
            <div className="modal-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Email</th>
                    <td>{userModal.user.email}</td>
                  </tr>
                  <tr>
                    <th>收件人姓名</th>
                    <td>{userModal.user.name}</td>
                  </tr>
                  <tr>
                    <th>收件人電話</th>
                    <td>{userModal.user.tel}</td>
                  </tr>
                  <tr>
                    <th>收件人地址</th>
                    <td>{userModal.user.address}</td>
                  </tr>
                  <tr>
                    <th>留言</th>
                    <td>{userModal.user.message}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {userModal.isShow && <div className="modal-backdrop fade show"></div>}

      {/* 確認清空訂單 Modal */}
      <div className={`modal fade ${clearOrdersModal ? 'show' : ''}`} style={{ display: clearOrdersModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold text-danger" id="clearCartModalLabel">確認清空訂單</h5>
              <button type="button" className="btn-close" onClick={closeClearOrdersModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>您確定要清空所有訂單嗎？</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeClearOrdersModal}>取消</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmClearOrders}>確定</button>
            </div>
          </div>
        </div>
      </div>
      {clearOrdersModal && <div className="modal-backdrop fade show"></div>}

      {/* 刪除確認 Modal */}
      <div className={`modal fade ${deleteOrderModal.isShow ? 'show' : ''}`} style={{ display: deleteOrderModal.isShow ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold text-danger" id="clearCartModalLabel">確認刪除訂單</h5>
              <button type="button" className="btn-close" onClick={closeDeleteOrderModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>您確定要刪除此訂單嗎？</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeDeleteOrderModal}>取消</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteOrder}>確定</button>
            </div>
          </div>
        </div>
      </div>
      {deleteOrderModal.isShow && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default AdminOrders;
