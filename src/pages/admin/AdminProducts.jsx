import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as bootstrap from "bootstrap";
import { getToken, clearToken, checkAdmin } from '@/utils/auth';
import FullPageLoading from '@/components/FullPageLoading';
import ProductModal from '@/components/ProductModal';
import Pagination from '@/components/Pagination';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
const initTempProduct = {
  id: "",
  imageUrl: "",
  imagesUrl: [],
  title: "",
  category: "",
  unit: "",
  origin_price: 0,
  price: 0,
  description: "",
  content: "",
  is_enabled: false,
};

function AdminProducts() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);  // 是否為管理員
  const [products, setProducts] = useState([]); // 產品列表
  const [loading, setLoading] = useState(false); // 加載狀態
  const [page, setPage] = useState(1);  // 當前頁數
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const productModalRef = useRef(null); // 產品 Modal 的 ref

  const [tempProduct, setTempProduct] = useState({
    ...initTempProduct
  }); // 暫存產品資料

  useEffect(() => {
    if (getToken()) {
      setLoading(true);
      const result = checkAdmin();
      if (!result) {
        clearToken();
        setLoading(false);
        goToLoginPage();
      }
      setLoading(false);

      productModalRef.current = new bootstrap.Modal('#productModal', {
        keyboard: false,
        backdrop: 'static'
      });

      setIsAuth(true);
    } else {
      goToLoginPage();
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      fetchProducts();
    }
  }, [isAuth, page]);

  /**
   * 返回登入頁面
   */
  const goToLoginPage = () => {
    navigate("/login");
  }

  /**
   * 處理產品資料變更事件
   * @param {Object} e 事件對象
   * @param {string} e.target.id - 觸發事件的元素的 ID
   * @param {string} e.target.value - 觸發事件的元素的值
   */
  const handletempProductChange = (e) => {
    const { id, value } = e.target;
    setTempProduct((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  /**
   * 處理圖片變更事件
   * @param {number} index - 圖片索引
   * @param {string} value - 圖片網址
   */
  const handleImageChange = (index, value) => {
    const newImagesUrl = [...tempProduct.imagesUrl];
    newImagesUrl[index] = value;
    setTempProduct((prevData) => ({
      ...prevData,
      imagesUrl: newImagesUrl,
    }));
  };

  /**
   * 新增圖片欄位
   */
  const handleAddImage = () => {
    setTempProduct((prevData) => {
      if (prevData.imagesUrl.length >= 5) {
        return prevData;
      }
      return {
        ...prevData,
        imagesUrl: [...prevData.imagesUrl, ""],
      };
    });
  };

  /**
   * 刪除最後一個圖片欄位
   */
  const handleRemoveImage = () => {
    setTempProduct((prevData) => ({
      ...prevData,
      imagesUrl: prevData.imagesUrl.slice(0, -1),
    }));
  };

  /**
   * 提交產品表單
   * 根據 tempProduct.id 判斷是新增還是編輯產品
   * @returns {Promise<void>} 無返回值
   */
  const handleSubmitProduct = async () => {
    if (false === checkRequired()) {
      return;
    }

    if (false === checkPrice(tempProduct.origin_price)) {
      alert("原價請輸入大於 0 的數字");
      return;
    }

    if (false === checkPrice(tempProduct.price)) {
      alert("售價請輸入大於 0 的數字");
      return;
    }

    setLoading(true);
    closeProductModal();

    let imagesUrl = [];
    if (tempProduct.imagesUrl) {
      // 清除 tempProduct.imagesUrl 裡的空字串
      imagesUrl = tempProduct.imagesUrl.filter((url) => url.trim() !== "");
    }

    const reqPayload = {
      ...tempProduct,
      imagesUrl,
      origin_price: Number(tempProduct.origin_price),
      price: Number(tempProduct.price),
    };

    try {
      const response = tempProduct.id
        ? await axios.put(`${API_BASE}/api/${API_PATH}/admin/product/${tempProduct.id}`, { data: reqPayload })
        : await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, { data: reqPayload });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      alert(tempProduct.id ? "編輯商品成功" : "新增商品成功");
      clearTempProduct();
      fetchProducts();
    } catch (error) {
      alert((tempProduct.id ? "編輯" : "新增") + "商品失敗: " + error);
      openProductModal();
    } finally {
      setLoading(false);
    }
  };

  /**
   * 檢查必填欄位是否有值
   * @returns {boolean} 如果所有必填欄位都有值，返回 true，否則返回 false。
   */
  const checkRequired = () => {
    if (!tempProduct.imageUrl || !tempProduct.title || !tempProduct.category || !tempProduct.unit || !tempProduct.origin_price || !tempProduct.price) {
      if (!tempProduct.imageUrl) {
        alert("請輸入圖片網址");
        return false;
      };
      if (!tempProduct.title) {
        alert("請輸入標題");
        return false;
      }
      if (!tempProduct.category) {
        alert("請輸入分類");
        return false;
      }
      if (!tempProduct.unit) {
        alert("請輸入單位");
        return false;
      }
      if (!tempProduct.origin_price) {
        alert("請輸入原價");
        return false;
      }
      if (!tempProduct.price) {
        alert("請輸入售價");
        return false;
      }
    }
    return true;
  }

  /**
   * 檢查價格是否為正數
   * @param {number} number - 要檢查的數字
   * @returns {boolean} 如果數字是正數，返回 true，否則返回 false
   */
  const checkPrice = (number) => {
    const num = Number(number);
    if (isNaN(num) || num < 0) {
      return false;
    }
    return true;
  }

  /**
   * 關閉產品 Modal
   */
  const closeProductModal = () => {
    productModalRef.current.hide();
  }

  /**
   * 清除暫存產品資料
   */
  const clearTempProduct = () => {
    setTempProduct({
      ...initTempProduct
    });
  }

  /**
   * 從伺服器獲取產品資料並更新狀態。
   * @async
   * @function fetchProducts
   * @returns {Promise<void>} 無返回值。
   * @throws 取得產品資料失敗時拋出錯誤。
   */
  const fetchProducts = async () => {
    if (!isAuth) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`
      );
      const { total_pages, has_pre, has_next, category } = response.data.pagination;
      setProducts(response.data.products);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("取得產品資料失敗", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 開啟產品 Modal
   */
  const openProductModal = () => {
    productModalRef.current.show();
  }

  /**
   * 開啟新增產品 Modal
   */
  const handleCreateProduct = () => {
    clearTempProduct();
    openProductModal();
  };

  /**
   * 處理編輯產品的邏輯
   * @param {Object} product - 要編輯的產品對象
   */
  const handleEditProduct = (product) => {
    setTempProduct(product);
    openProductModal();
  };

  /**
   * 刪除商品
   * @param {string} productId - 要刪除的商品 ID
   */
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("確定要刪除此商品嗎？")) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${productId}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      alert("刪除商品成功");
      fetchProducts();
    } catch (error) {
      alert("刪除商品失敗: " + error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 處理頁面變更的函式
   * @param {number} newPage - 新的頁面號碼
   * @returns {void} 
   */
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {loading && <FullPageLoading />}
      <h2 className="text-center">產品管理</h2>

      {isAuth && (
          <>
            {/* <div className="container mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary d-block ms-auto"
                onClick={logout}
              >登出</button>
            </div> */}

            <div className="container">
              <div className="text-end mt-4">
                <button className="btn btn-primary" onClick={handleCreateProduct}>
                  建立新的產品
                </button>
              </div>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120" className="text-center">原價</th>
                    <th width="120" className="text-center">售價</th>
                    <th width="100" className="text-center">是否啟用</th>
                    <th width="120">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <tr key={item.id}>
                        {/* 分類 */}
                        <td>{item.category}</td>
                        {/* 產品名稱 */}
                        <td>{item.title}</td>
                        {/* 原價 */}
                        <td className="text-center">{item.origin_price}</td>
                        {/* 售價 */}
                        <td className="text-center">{item.price}</td>
                        {/* 是否啟用 */}
                        <td className="text-center">
                          {item.is_enabled ? (<span className="text-success">啟用</span>) : (<span>未啟用</span>)}
                        </td>
                        <td>
                          <div className="btn-group">
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleEditProduct(item)}>
                              編輯
                            </button>
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteProduct(item.id)}>
                              刪除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">尚無產品資料</td>
                    </tr>
                  )}

                </tbody>
              </table>
              {/* Pagination */}
              {
                totalPages > 1 && (
                  <Pagination 
                    totalPages={totalPages} 
                    currentPage={page} 
                    onPageChange={handlePageChange} 
                  />
                )
              }
              {/* Pagination */}
            </div>
          </>
        ) 
      }

      <ProductModal
        tempProduct={tempProduct}
        handletempProductChange={handletempProductChange}
        handleImageChange={handleImageChange}
        handleAddImage={handleAddImage}
        handleRemoveImage={handleRemoveImage}
        handleSubmitProduct={handleSubmitProduct}
        setTempProduct={setTempProduct}
      />
    </>
  );
}

export default AdminProducts;
