import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * 取得 Cookie 中的 hexToken
 * @returns {string|null} 返回 Token 字串，如果不存在則返回 null
 */
export const getToken = () => {
  // 取出 Token
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return token || null;
};

/**
 * 清除 Token
 * 此函式會將名為 "hexToken" 的 cookie 設定為過期，從而達到清除 Token 的效果。
 */
export const clearToken = () => {
  // 清除 Token
  document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

/**
 * 檢查使用者是否為管理員
 */
export const checkAdmin = async () => {
  let result = false;
  const token = getToken();
  if (!token) return result;

  const url = `${API_BASE}/api/user/check`;
  axios.defaults.headers.common.Authorization = token;

  try {
    const res = await axios.post(url);
    const { success } = res.data;
    if (!success) {
      console.error("使用者驗證失敗", res.data);
      throw new Error("使用者驗證失敗");
    }
    result = true;
  } catch (error) {
    console.error("使用者驗證失敗", error);
  } finally {
    return result;
  }
};
