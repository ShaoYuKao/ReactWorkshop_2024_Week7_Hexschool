import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FullPageLoading from '../../components/FullPageLoading';
import Pagination from '../../components/Pagination';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Product() {
  const searchCategoryRef = useRef(null); // 分類搜尋的參考
  const [products, setProducts] = useState([]); // 產品列表
  const [page, setPage] = useState(1);  // 當前頁數
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const [searchTerm, setSearchTerm] = useState(''); // 搜尋關鍵字
  const [loading, setLoading] = useState(false); // 加載狀態

  useEffect(() => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/products?page=${page}&category=${searchTerm}`)
      .then(response => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.total_pages);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        alert('取得產品資料失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  }, [page, searchTerm]);

  /**
   * 處理搜尋操作的函式
   * 當呼叫此函式時，會將頁面重置為第一頁，並設定搜尋關鍵字
   */
  const handleSearch = () => {
    setPage(1); // 重置頁面為第一頁
    setSearchTerm(searchCategoryRef.current.value); // 設定搜尋關鍵字
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
      <h2 className="text-center">產品 Page</h2>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="searchCategory">分類：</label>
        </div>
        <div className="col-auto">
          <input id="searchCategory" ref={searchCategoryRef} className="form-control" type="search" placeholder="搜尋分類" aria-label="搜尋分類" name="searchCategory" autoComplete='off' />
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>搜尋</button>
        </div>
      </div>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>分類</th>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.category}</td>
              <td style={{ width: '200px' }}>
                <div style={{ height: '100px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </td>
              <td>{product.title}</td>
              <td>
                <del className="h6">{product.origin_price}</del>
                <div className="h5">{product.price}</div>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <Link to={`/product/${product.id}`} className="btn btn-outline-secondary">查看更多</Link>
                </div>
              </td>
            </tr>
          ))}
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
    </>
  );
}

export default Product;
