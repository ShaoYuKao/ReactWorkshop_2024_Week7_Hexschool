import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullPageLoading from '@/components/FullPageLoading';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null); // 選擇的產品
  const [loading, setLoading] = useState(false); // 加載狀態

  useEffect(() => {
    if (false === !!id) {
      navigate('/product');
    }
    getSingleProductInto(id);
  }, []);

  /**
   * 單一產品細節 API 呼叫
   * @param {string} productId - 產品ID
   */
  const getSingleProductInto = (productId) => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/product/${productId}`)
      .then(response => {
        setSelectedProduct(response.data.product);  // 設定選擇的產品
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        alert('取得產品細節失敗!!');
        navigate('/product');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  return (
    <>
      {loading && <FullPageLoading />}
      <h2 className="text-center">商品資訊</h2>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="mb-2">
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  圖片
                </label>
                <img
                  className="img-fluid"
                  src={selectedProduct?.imageUrl || ""}
                  alt={selectedProduct?.title || ""}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">標題</label>
              <input
                id="selectedProductTitle"
                type="text"
                className="form-control"
                placeholder=""
                defaultValue={selectedProduct?.title || ""}
                disabled
              />
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="category" className="form-label">分類</label>
                <input
                  id="category"
                  type="text"
                  className="form-control"
                  placeholder=""
                  defaultValue={selectedProduct?.category || ""}
                  disabled
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="unit" className="form-label">單位</label>
                <input
                  id="unit"
                  type="text"
                  className="form-control"
                  placeholder=""
                  defaultValue={selectedProduct?.unit || ""}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="origin_price" className="form-label">原價</label>
                <input
                  id="origin_price"
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder=""
                  defaultValue={selectedProduct?.origin_price || ""}
                  disabled
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="price" className="form-label">售價</label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder=""
                  defaultValue={selectedProduct?.price || ""}
                  disabled
                />
              </div>
            </div>
            <hr />

            <div className="mb-3">
              <label htmlFor="description" className="form-label">產品描述</label>
              <textarea
                id="description"
                className="form-control"
                placeholder=""
                defaultValue={selectedProduct?.description || ""}
                disabled
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">說明內容</label>
              <textarea
                id="content"
                className="form-control"
                placeholder=""
                defaultValue={selectedProduct?.content || ""}
                disabled
              ></textarea>
            </div>
            {/* <div className="mb-3">
              <div className="form-check">
                <input
                  id="is_enabled"
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedProduct?.is_enabled || false}
                  disabled
                />
                <label className="form-check-label" htmlFor="is_enabled">
                  是否啟用
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="text-center">
        <button type="button" class="btn btn-primary" onClick={() => navigate(-1)}>回上一頁</button>
      </div>
    </>
  );
}

export default SingleProduct;
