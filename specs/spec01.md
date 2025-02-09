# 訂單清單

## 訂單清單列表呈現

- 以表格方式呈現
- 表格內容如下：
  - 編號(`orders.id`)
  - 產品數量(`Object.keys('orders.products')`)
  - 已付款(`orders.is_paid`)
  - 總金額(`orders.total`)
  - 時間(`orders.create_at`)
  - 操作按鈕：刪除, 產品清單(`orders.product`), 訂單者資訊(`orders.user`)

## 產品清單

- 點擊[產品清單]，打開 Bootstrap Modal，以表格呈現[產品清單]
- 表格內容如下：
  - 分類(`orders.products.product.category`)
  - 圖片(`orders.products.product.imageUrl`)
  - 商品名稱(`orders.products.product.title`)
  - 價格(`orders.products.product.price`)
  - 數量(`orders.products.qty`)
  - 總計(`orders.products.total`)

### 訂單者資訊

- 點擊[訂單者資訊]，打開 Bootstrap Modal，以表格呈現[訂單者資訊]
- 表格內容如下：
  - Email(`orders.user.email`)
  - 收件人姓名(`orders.user.name`)
  - 收件人電話(`orders.user.tel`)
  - 收件人地址(`orders.user.address`)
  - 留言(`orders.user.address`)

## API 

- Request Method: `GET`
- Request URL: `​​/api​/{api_path}​/admin​/orders?page={page}`
- Request QueryString:
  - `page`：頁碼

- Response Payload:
  ```json
  {
    "success": true,
    "orders": [
      {
        "create_at": 1739098713,
        "id": "-OIeM5iU9jD6jwwyBSuj",
        "is_paid": false,
        "message": "留言留言留言留言留言留言留言...",
        "products": {
          "-OIeM5jwQKE-QClI-Rdk": {
            "final_total": 100,
            "id": "-OIeM5jwQKE-QClI-Rdk",
            "product": {
              "category": "糕點",
              "content": "濃郁可可風味布朗尼，巧克力控的最愛。",
              "description": "布朗尼，甜蜜與濃郁的完美結合。",
              "id": "-OFlH4BaV_prYBfbs1GD",
              "imageUrl": "https://meee.com.tw/V7sjN9T.png",
              "imagesUrl": [
                "https://meee.com.tw/i2VV9GA.png",
                "https://meee.com.tw/pRYRWhu.png"
              ],
              "is_enabled": 1,
              "num": 9,
              "origin_price": 105,
              "price": 100,
              "title": "布朗尼",
              "unit": "片"
            },
            "product_id": "-OFlH4BaV_prYBfbs1GD",
            "qty": 1,
            "total": 100
          }
        },
        "total": 700,
        "user": {
          "address": "台北市中正區信義路一段21-3號",
          "email": "test@gmail.com",
          "name": "Snoopy",
          "tel": "0912345678"
        },
        "num": 1
      }
    ],
    "pagination": {
      "total_pages": 1,
      "current_page": 1,
      "has_pre": false,
      "has_next": false,
      "category": ""
    },
    "messages": []
  }
  ```
