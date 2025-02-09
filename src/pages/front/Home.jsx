import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <header className="bg-dark text-white text-center py-5">
          <div className="container">
              <h1 className="display-4">Brew & Bites</h1>
              <p className="lead">最精選的咖啡與手工糕點，帶給你最美好的時光。</p>
              <Link to="/product" className="btn btn-primary btn-lg">探索產品</Link>
          </div>
      </header>

      {/* 產品區塊 */}
      <section id="products" className="py-5">
          <div className="container">
              <h2 className="text-center mb-4">精選產品</h2>
              <div className="row">
                  <div className="col-md-4">
                      <div className="card">
                          <img src="https://i.meee.com.tw/yaFrrLY.jpg" className="card-img-top" alt="精品咖啡" />
                          <div className="card-body">
                              <h5 className="card-title">精品咖啡</h5>
                              <p className="card-text">嚴選世界各地咖啡豆，細膩烘焙，完美風味。</p>
                              <a href="javascript:void(0)" className="btn btn-outline-primary">查看更多</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="card">
                          <img src="https://i.meee.com.tw/4VnzLrV.jpg" className="card-img-top" alt="手工糕點" />
                          <div className="card-body">
                              <h5 className="card-title">手工糕點</h5>
                              <p className="card-text">純手工精緻製作，每一口都是幸福的滋味。</p>
                              <a href="javascript:void(0)" className="btn btn-outline-primary">查看更多</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="card">
                          <img src="https://i.meee.com.tw/3kUSZGx.jpg" className="card-img-top" alt="特調飲品" />
                          <div className="card-body">
                              <h5 className="card-title">特調飲品</h5>
                              <p className="card-text">專業調製的特調飲品，為你的日常增添美好。</p>
                              <a href="javascript:void(0)" className="btn btn-outline-primary">查看更多</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 關於我們 */}
      <section id="about" className="bg-light py-5 mb-3">
          <div className="container">
              <h2 className="text-center mb-4">關於我們</h2>
              <p className="text-center">Brew & Bites 堅持以最優質的原料，帶給消費者最好的體驗。我們的咖啡、糕點與飲品皆來自職人用心製作，讓你在每一次品嚐時都能感受到美好時光。</p>
          </div>
      </section>
    </div>
  );
}

export default Home;
