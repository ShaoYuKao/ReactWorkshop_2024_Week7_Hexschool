import { useEffect, useState } from "react";
import { getToken, clearToken, checkAdmin, redirectToLogin } from '@/utils/auth';
import FullPageLoading from '@/components/FullPageLoading';

function AdminOrders() {
  const [loading, setLoading] = useState(false); // 加載狀態

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
    } else {
      goToLoginPage();
    }
  }, []);

  /**
   * 返回登入頁面
   */
  const goToLoginPage = () => {
    redirectToLogin(navigate);
  }

  return (
    <>
      {loading && <FullPageLoading />}
      <h2 className="text-center">訂單管理</h2>
    </>
  );
}

export default AdminOrders;
