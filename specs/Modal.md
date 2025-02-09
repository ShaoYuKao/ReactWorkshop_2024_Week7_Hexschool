以下是一個簡單的範例，說明如何以 ES 模組方式引入 Bootstrap 5 並利用 JavaScript 建立一個互動視窗 (Modal) 的實例，然後手動呼叫 .show() 與 .hide() 方法來打開與隱藏模態視窗。

### 1. HTML 結構
先建立一個模態視窗的 HTML 結構，記得要包含必要的 class 與 aria 屬性：

```html
<!-- Modal HTML -->
<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">模態視窗標題</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="關閉"></button>
      </div>
      <div class="modal-body">
        這裡是模態視窗內容
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        <button type="button" class="btn btn-primary">儲存變更</button>
      </div>
    </div>
  </div>
</div>
```

### 2. 使用 JavaScript 透過模組方式控制模態視窗

在支援 ES 模組的環境中，您可以這樣寫：

```javascript
// 引入 Bootstrap 模組 (請根據實際環境調整模組路徑)
import { Modal } from 'bootstrap';

// 取得模態視窗的 DOM 元素
const myModalEl = document.getElementById('myModal');

// 建立模態視窗的實例，options 可根據需求設定（預設值通常已足夠）
const myModal = new Modal(myModalEl, {
  backdrop: 'static',    // 是否包含背景遮罩 (也可設為 'static' 以避免點擊背景關閉)
  keyboard: true,    // 是否允許按下 ESC 鍵關閉
});

// 手動打開模態視窗
myModal.show();

// 手動隱藏模態視窗（例如可在某個事件中調用）
myModal.hide();
```

### 3. 小結說明
- **模組引入**：透過 `import { Modal } from 'bootstrap'` 以 ES 模組方式引入 Bootstrap 的模態視窗功能。
- **建立實例**：透過 `new Modal(...)` 建立模態視窗實例後，您就可以使用其提供的 API 來控制模態，例如 `.show()`、`.hide()`、`.toggle()` 等方法。
- **HTML 標記**：標記中要包含 `.modal` 與 `.fade` 以啟用淡入淡出效果，並注意正確的 aria 屬性有助於無障礙設計。

以上就是使用 Bootstrap 5 模組方式、透過 JavaScript 控制互動視窗的基本做法。

---

**引用：**

- Bootstrap 5 模組使用與 Modal API 參考文件：https://getbootstrap.com/docs/5.0/components/modal/  
- Bootstrap JavaScript 模組說明：https://getbootstrap.com/docs/5.0/getting-started/javascript/