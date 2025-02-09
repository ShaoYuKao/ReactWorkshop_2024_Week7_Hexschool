# 管理控制台 - 訂單 (Orders)

## 訂單清單列表

- Request Method: `GET`
- Request URL: `​/api​/{api_path}​/admin​/orders?page={page}`
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

## 訂單更新

- Request Method: `PUT`
- Request URL: `​/api​/{api_path}​/admin​/order​/{id}`
- Request QueryString:
  - `id`：要修改的訂單 ID

- Response Payload:
  ```json
  {
    "data": {
      "create_at": 1523539519,
      "is_paid": false,
      "message": "這是留言",
      "products": {
        "L8nBrq8Ym4ARI1Kog4t": {
          "id": "L8nBrq8Ym4ARI1Kog4t",
          "product_id": "-L8moRfPlDZZ2e-1ritQ",
          "qty": "3"
        }
      },
      "user": {
        "address": "kaohsiung",
        "email": "test@gmail.com",
        "name": "test",
        "tel": "0912346768"
      },
      "num": 2
    }
  }
  ```

## 訂單刪除

- Request Method: `DELETE`
- Request URL: `​​/api​/{api_path}​/admin​/order​/{id}`
- Request QueryString:
  - `id`：要刪除的訂單 ID

- Response Payload:
  ```json
  {
    "success": true,
    "message": "已刪除"
  }
  ```

## 訂單全部清除

- Request Method: `DELETE`
- Request URL: `​​/api​/{api_path}​/admin​/orders​/all`

- Response Payload:
  ```json
  {
    "success": true,
    "message": "已刪除"
  }
  ```
