// 키오스크 스타일 적용
document.body.style.background = "linear-gradient(135deg, #ff6b35, #f7931e, #ff8c42)";
document.body.style.color = "white";
document.body.style.fontSize = "1.2rem";
document.body.style.textAlign = "center";
document.body.style.paddingTop = "30px";
document.body.style.fontFamily = "'Arial', sans-serif";
document.body.style.minHeight = "100vh";
document.body.style.margin = "0";
document.body.style.padding = "20px";

// CSS 스타일 추가
const style = document.createElement('style');
style.textContent = `
  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 30px;
    text-shadow: 0 4px 8px rgba(0,0,0,0.3);
    background: linear-gradient(45deg, #fff, #ffe4b5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from { filter: drop-shadow(0 0 10px rgba(255,255,255,0.5)); }
    to { filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)); }
  }

  #restaurants {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-bottom: 40px;
    padding: 0 20px;
  }

  button {
    background: linear-gradient(45deg, #ff8c42, #ff6b35);
    border: none;
    color: white;
    padding: 20px 40px;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 8px 15px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    min-width: 150px;
  }

  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
    z-index: 1;
  }

  button:hover::before {
    left: 100%;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.3);
    background: linear-gradient(45deg, #ff7a33, #ff5722);
  }

  button:active {
    transform: translateY(0);
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }

  .success-btn {
    background: linear-gradient(45deg, #4CAF50, #45a049) !important;
  }

  .success-btn:hover {
    background: linear-gradient(45deg, #45a049, #3d8b40) !important;
  }

  .danger-btn {
    background: linear-gradient(45deg, #f44336, #d32f2f) !important;
  }

  .danger-btn:hover {
    background: linear-gradient(45deg, #d32f2f, #b71c1c) !important;
  }

  .info-btn {
    background: linear-gradient(45deg, #2196F3, #1976D2) !important;
  }

  .info-btn:hover {
    background: linear-gradient(45deg, #1976D2, #1565C0) !important;
  }

  #result {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    margin: 30px auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.2);
    max-width: 600px;
    min-height: 100px;
  }

  #result h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  #result div {
    font-size: 1.3rem;
    margin: 15px 0;
    line-height: 1.5;
  }

  #result img {
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
    margin-top: 20px;
  }

  #result img:hover {
    transform: scale(1.05);
  }

  .loading {
    display: inline-block;
    animation: spin 1s linear infinite;
    font-size: 2rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .order-complete {
    background: linear-gradient(45deg, #4CAF50, #45a049);
    border-radius: 15px;
    padding: 25px;
    margin: 20px 0;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  .price-tag {
    background: linear-gradient(45deg, #ff6b35, #ff8c42);
    display: inline-block;
    padding: 12px 25px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 1.4rem;
    margin: 15px 0;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-top: 25px;
  }

  .confirm-dialog {
    background: rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 30px;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .status-message {
    font-size: 1.4rem;
    padding: 20px;
    border-radius: 15px;
    background: rgba(255,255,255,0.1);
    border-left: 5px solid #ff6b35;
    margin: 20px 0;
  }

  .error-message {
    background: rgba(244, 67, 54, 0.2);
    border-left-color: #f44336;
  }

  .button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    button {
      padding: 15px 25px;
      font-size: 1.2rem;
      min-width: 120px;
    }
    
    #result {
      margin: 20px 10px;
      padding: 20px;
    }
    
    .menu-grid {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 15px;
    }
  }
`;
document.head.appendChild(style);

// 결과 영역
const result = document.createElement('div');
result.id = 'result';
document.body.innerHTML = `<h1>🍽️ 한식당 주문 키오스크</h1><div id="restaurants"></div>`;
document.body.appendChild(result);

// ✅ 식당 목록 불러오기
async function loadRestaurants() {
  try {
    const res = await fetch('/api/restaurants');
    const names = await res.json();
    
    const container = document.getElementById('restaurants');
    if (!names.length) {
      container.innerHTML = '<div class="status-message">🏪 등록된 식당이 없습니다.</div>';
      return;
    }
    
    container.innerHTML = names.map(name => `
      <button onclick="loadMenus('${name}')">
        🏪 ${name}
      </button>
    `).join('');
  } catch (e) {
    console.error('식당 목록 로드 실패:', e);
    const container = document.getElementById('restaurants');
    container.innerHTML = '<div class="status-message error-message">❌ 식당 목록을 불러올 수 없습니다.</div>';
  }
}

loadRestaurants(); // 페이지 로드 시 자동 실행

// 메뉴 불러오기
async function loadMenus(restaurantName) {
  try {
    // 로딩 표시
    result.innerHTML = `
      <div class="status-message">
        <div class="loading">🔄</div>
        <div>메뉴를 불러오는 중...</div>
      </div>
    `;
    
    const res = await fetch(`/api/menus/${restaurantName}`);
    const menus = await res.json();
    
    if (!menus.length) {
      result.innerHTML = '<div class="status-message">📋 메뉴가 없습니다.</div>';
      return;
    }
    
    result.innerHTML = `
      <h2>🍜 ${restaurantName} 메뉴</h2>
      <div class="menu-grid">
        ${menus.map(m => `
          <button onclick="confirmOrder('${restaurantName}', ${m.menuId}, '${m.menu}')">
            🍽️ ${m.menu}
          </button>
        `).join('')}
      </div>
      <div class="button-group" style="margin-top: 30px;">
        <button class="info-btn" onclick="loadRestaurants(); result.innerHTML='';">
          🏠 식당 선택으로
        </button>
      </div>
    `;
  } catch (e) {
    console.error('메뉴 로드 실패:', e);
    result.innerHTML = '<div class="status-message error-message">❌ 메뉴를 불러올 수 없습니다.</div>';
  }
}

// 주문 확인
function confirmOrder(restaurantName, menuId, menuName) {
  result.innerHTML = `
    <div class="confirm-dialog">
      <h2>📋 주문 확인</h2>
      <div style="font-size: 1.5rem; margin: 20px 0;">
        🍽️ <strong>${menuName}</strong>
      </div>
      <div style="font-size: 1.2rem; opacity: 0.9;">
        📍 ${restaurantName}
      </div>
      <div style="margin: 20px 0; font-size: 1.1rem;">
        위 메뉴를 주문하시겠습니까?
      </div>
      <div class="button-group">
        <button class="success-btn" onclick="sendOrder('${restaurantName}', ${menuId}, '${menuName}')">
          ✅ 주문하기
        </button>
        <button class="danger-btn" onclick="loadMenus('${restaurantName}')">
          ❌ 취소
        </button>
      </div>
    </div>
  `;
}

// 주문 전송
function sendOrder(restaurantName, menuId, menuName) {
  fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ restaurantName, menuId })
  }).catch(e => {
    console.error('주문 전송 실패:', e);
  });
  
  result.innerHTML = `
    <div class="status-message">
      <div class="loading">🔄</div>
      <div>주문 요청 전송 중...</div>
      <div style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">
        잠시만 기다려 주세요
      </div>
    </div>
  `;
}

// 주문 결과 표시 함수
function displayOrderResult(data) {
  result.innerHTML = `
    <div class="order-complete">
      <h2>🎉 주문 완료!</h2>
      <div style="font-size: 1.4rem; margin: 15px 0;">
        <strong>🏪 ${data.restaurant}</strong>
      </div>
      <div style="font-size: 1.6rem; margin: 15px 0;">
        <strong>🍽️ ${data.menu}</strong>
      </div>
      <div class="price-tag">
        💰 ${data.price?.toLocaleString()}원
      </div>
      ${data.imageUrl ? `
        <img src="${data.imageUrl}" alt="${data.menu}" style="width:200px; border-radius:15px; margin-top:20px;" />
      ` : ''}
      <div class="button-group" style="margin-top: 25px;">
        <button class="info-btn" onclick="loadRestaurants(); result.innerHTML='';">
          🏠 처음으로
        </button>
        <button onclick="loadMenus('${data.restaurant}')">
          🍽️ 더 주문하기
        </button>
      </div>
    </div>
  `;
}

// 주문 결과 수신
try {
  const ws = new WebSocket("ws://localhost:3001");
  
  // ✅ WebSocket 연결 성공 여부 확인 로그
  ws.onopen = () => {
    console.log("✅ WebSocket 연결 성공");
  };
  
  ws.onerror = (err) => {
    console.error("❌ WebSocket 에러:", err);
  };
  
  ws.onclose = () => {
    console.log("🔌 WebSocket 연결 종료");
  };
  
  ws.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      console.log("📨 받은 메시지:", data); // ✅ 수신 확인용 로그
      displayOrderResult(data);
    } catch (parseError) {
      console.error("메시지 파싱 오류:", parseError);
      result.innerHTML = `
        <div class="status-message error-message">
          ❌ 주문 처리 중 오류가 발생했습니다.
        </div>
      `;
    }
  };
} catch (wsError) {
  console.error("WebSocket 초기화 오류:", wsError);
}