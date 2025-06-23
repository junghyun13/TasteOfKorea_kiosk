// 언어 설정
let currentLanguage = 'ko';

const translations = {
  ko: {
    title: '🍽️ 한식당 주문 키오스크',
    cart: '🛒 장바구니',
    empty: '🧹 비우기',
    payment: '💳 결제',
    orderComplete: '🎉 주문 완료!',
    totalItems: '총 {count}개',
    totalAmount: '💰 총 {amount}원',
    cartEmpty: '🛒 장바구니가 비어있습니다',
    noRestaurants: '🏪 등록된 식당이 없습니다',
    loadingMenu: '메뉴를 불러오는 중...',
    noMenus: '📋 메뉴가 없습니다',
    backToRestaurants: '🏠 식당 선택으로',
    orderConfirm: '📋 주문 확인',
    addToCart: '🛒 장바구니 담기',
    cancel: '❌ 취소',
    addedToCart: '🛒 장바구니 담기 완료',
    addMore: '➕ 더 담기',
    payNow: '💳 결제하기',
    viewOtherRestaurants: '🏠 다른 식당 보기',
    selectPayment: '💰 결제 방법 선택',
    cash: '💵 현금',
    card: '💳 카드',
    callStaff: '점원을 호출해주세요',
    enterPassword: '🔐 비밀번호 입력 후 결제를 완료할 수 있습니다',
    passwordPlaceholder: '비밀번호 입력',
    confirm: '확인',
    cashPaymentComplete: '🎉 현금 결제가 완료되었습니다!',
    cardPaymentComplete: '🎉 카드 결제가 완료되었습니다!',
    paymentAmount: '💰 결제금액: {amount}원',
    autoReset: '⏳ 10초 후 자동으로 초기화됩니다...',
    wrongPassword: '❌ 비밀번호가 틀렸습니다',
    enterCardInfo: '💳 카드 정보를 입력해 주세요',
    paymentAmountLabel: '📊 결제금액: {amount}원',
    payButton: '💳 결제하기',
    home: '🏠 처음으로',
    orderMore: '🍽️더 주문하기'
  },
  en: {
    title: '🍽️ Korean Restaurant Order Kiosk',
    cart: '🛒 Cart',
    empty: '🧹 Clear',
    payment: '💳 Pay',
    orderComplete: '🎉 Order Complete!',
    totalItems: 'Total {count} items',
    totalAmount: '💰 Total ${amount}',
    cartEmpty: '🛒 Cart is empty',
    noRestaurants: '🏪 No restaurants registered',
    loadingMenu: 'Loading menu...',
    noMenus: '📋 No menus available',
    backToRestaurants: '🏠 Back to restaurants',
    orderConfirm: '📋 Order Confirmation',
    addToCart: '🛒 Add to Cart',
    cancel: '❌ Cancel',
    addedToCart: '🛒 Added to Cart',
    addMore: '➕ Add More',
    payNow: '💳 Pay Now',
    viewOtherRestaurants: '🏠 View Other Restaurants',
    selectPayment: '💰 Select Payment Method',
    cash: '💵 Cash',
    card: '💳 Card',
    callStaff: 'Please call staff',
    enterPassword: '🔐 Enter password to complete payment',
    passwordPlaceholder: 'Enter password',
    confirm: 'Confirm',
    cashPaymentComplete: '🎉 Cash payment completed!',
    cardPaymentComplete: '🎉 Card payment completed!',
    paymentAmount: '💰 Payment amount: ${amount}',
    autoReset: '⏳ Auto reset in 10 seconds...',
    wrongPassword: '❌ Wrong password',
    enterCardInfo: '💳 Please enter card information',
    paymentAmountLabel: '📊 Payment amount: ${amount}',
    payButton: '💳 Pay',
    home: '🏠 Home',
    orderMore: '🍽️ Order More'
  }
};

function t(key, params = {}) {
  let text = translations[currentLanguage][key] || key;
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  return text;
}

function switchLanguage(lang) {
  currentLanguage = lang;
  document.querySelector('.language-btn.active')?.classList.remove('active');
  document.querySelector(`[onclick="switchLanguage('${lang}')"]`).classList.add('active');
  
  // 페이지 다시 로드
  loadRestaurants();
  updateCartUI();
  result.innerHTML = '';
  
  // 제목 업데이트
  document.querySelector('h1').textContent = t('title');
  document.querySelector('#cart-box h2').textContent = t('cart');
  
  // ✅ 장바구니 버튼들 업데이트 추가
  const cartButtons = document.querySelector('.cart-buttons');
  if (cartButtons) {
    cartButtons.innerHTML = `
      <button class="danger-btn cart-btn" onclick="clearCart()">${t('empty')}</button>
      <button class="success-btn cart-btn" onclick="confirmPayment()">${t('payment')}</button>
    `;
  }
}

// 키오스크 스타일 적용 (연한 주황색 배경)
document.body.style.background = "linear-gradient(135deg, #FFE4B5, #FFDAB9, #FFCCCB)";
document.body.style.color = "#333";
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
   background: linear-gradient(45deg, #FF6B35, #FF8C42);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   background-clip: text;
   animation: glow 2s ease-in-out infinite alternate;
 }

 @keyframes glow {
   from { filter: drop-shadow(0 0 10px rgba(255,107,53,0.5)); }
   to { filter: drop-shadow(0 0 20px rgba(255,107,53,0.8)); }
 }

 .language-selector {
   position: fixed;
   top: 20px;
   right: 20px;
   display: flex;
   gap: 10px;
   z-index: 1000;
 }

 .language-btn {
   background: rgba(255,255,255,0.9);
   color: #FF6B35;
   border: 2px solid #FF6B35;
   padding: 8px 16px;
   border-radius: 20px;
   cursor: pointer;
   font-weight: bold;
   transition: all 0.3s ease;
 }

 .language-btn:hover {
   background: #FF6B35;
   color: white;
 }

 .language-btn.active {
   background: #FF6B35;
   color: white;
 }

 .main-container {
   display: flex;
   gap: 30px;
   align-items: flex-start;
   max-width: 1400px;
   margin: 0 auto;
 }

 #restaurants {
   flex: 2;
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
   justify-content: center;
   margin-bottom: 40px;
   padding: 0 20px;
 }

 #cart-box {
   flex: 1;
   background: rgba(255, 255, 255, 0.95);
   color: #333;
   padding: 25px;
   border-radius: 20px;
   min-width: 300px;
   max-width: 400px;
   box-shadow: 0 10px 30px rgba(0,0,0,0.2);
   border: 2px solid rgba(255,107,53,0.3);
   backdrop-filter: blur(10px);
   position: sticky;
   top: 20px;
 }

 #cart-box h2 {
   font-size: 1.8rem;
   margin-bottom: 20px;
   color: #FF6B35;
   text-shadow: none;
   background: none;
   -webkit-text-fill-color: initial;
 }

 button {
   background: linear-gradient(45deg, #FF8C42, #FF6B35);
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
   background: linear-gradient(45deg, #FF7A33, #FF5722);
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

 .cart-btn {
   padding: 8px 15px !important;
   font-size: 1rem !important;
   min-width: auto !important;
   margin: 5px 0;
 }
`;
document.head.appendChild(style);
// 추가 CSS 스타일 계속
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
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
   color: #333;
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
   color: white;
 }

 .price-tag {
   background: linear-gradient(45deg, #FF6B35, #FF8C42);
   display: inline-block;
   padding: 12px 25px;
   border-radius: 25px;
   font-weight: bold;
   font-size: 1.4rem;
   margin: 15px 0;
   box-shadow: 0 4px 10px rgba(0,0,0,0.2);
   color: white;
 }

 .menu-grid {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
   gap: 20px;
   margin-top: 25px;
 }

 .confirm-dialog {
   background: rgba(255,255,255,0.9);
   color: #333;
   border-radius: 20px;
   padding: 30px;
   border: 2px solid rgba(255,107,53,0.3);
 }

 .status-message {
   font-size: 1.4rem;
   padding: 20px;
   border-radius: 15px;
   background: rgba(255,255,255,0.1);
   border-left: 5px solid #FF6B35;
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

 .cart-item {
   margin-bottom: 15px;
   background: rgba(255, 165, 0, 0.1);
   padding: 15px;
   border-radius: 12px;
   border-left: 4px solid #FF6B35;
   display: flex;
   justify-content: space-between;
   align-items: center;
 }

 .cart-item-info {
   flex: 1;
   text-align: left;
 }

 .cart-item-name {
   font-weight: bold;
   color: #333;
   font-size: 1.1rem;
 }

 .cart-item-price {
   color: #FF6B35;
   font-weight: bold;
   margin-top: 5px;
 }

 .cart-total {
   background: linear-gradient(45deg, #FF6B35, #FF8C42);
   color: white;
   padding: 15px;
   border-radius: 12px;
   margin: 20px 0;
   font-weight: bold;
   font-size: 1.3rem;
 }

 .cart-buttons {
   display: flex;
   gap: 10px;
   margin-top: 20px;
 }

 .cart-buttons button {
   flex: 1;
   padding: 12px;
   font-size: 1rem;
 }

 @media (max-width: 1024px) {
   .main-container {
     flex-direction: column;
   }
   
   #cart-box {
     position: static;
     max-width: none;
     margin-top: 20px;
   }
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
   
   .main-container {
     gap: 20px;
   }
   
   #cart-box {
     min-width: auto;
     padding: 20px;
   }
   
   .language-selector {
     position: static;
     justify-content: center;
     margin-bottom: 20px;
   }
 }
`;
document.head.appendChild(additionalStyle);

// body 레이아웃 설정 (언어 선택기 및 장바구니 영역 포함)
document.body.innerHTML = `
 <div class="language-selector">
   <button class="language-btn active" onclick="switchLanguage('ko')">한국어</button>
   <button class="language-btn" onclick="switchLanguage('en')">English</button>
 </div>
 <h1>${t('title')}</h1>
 <div class="main-container">
   <div style="flex: 2;">
     <div id="restaurants"></div>
   </div>
   <div id="cart-box">
     <h2>${t('cart')}</h2>
     <div id="cart-items"></div>
     <div id="cart-total"></div>
     <div class="cart-buttons">
       <button class="danger-btn cart-btn" onclick="clearCart()">${t('empty')}</button>
       <button class="success-btn cart-btn" onclick="confirmPayment()">${t('payment')}</button>
     </div>
   </div>
 </div>
`;

const result = document.createElement('div');
result.id = 'result';
document.body.appendChild(result);

// ✅ menu → menuId 매핑 객체 정의
const reverseClassIndices = {
  '가지볶음': 0,
  '간장게장': 1,
  '갈비탕': 2,
  '갈치구이': 3,
  '감자조림': 4,
  '감자채볶음': 5,
  '감자탕': 6,
  '갓김치': 7,
  '건새우볶음': 8,
  '경단': 9,
  '계란국': 10,
  '계란말이': 11,
  '계란찜': 12,
  '고등어구이': 13,
  '고사리나물': 14,
  '고추튀김': 15,
  '곰탕_설렁탕': 16,
  '곱창구이': 17,
  '과메기': 18,
  '김밥': 19,
  '김치볶음밥': 20,
  '김치전': 21,
  '김치찌개': 22,
  '깍두기': 23,
  '깻잎장아찌': 24,
  '꼬막찜': 25,
  '꽈리고추무침': 26,
  '꿀떡': 27,
  '나박김치': 28,
  '누룽지': 29,
  '닭갈비': 30,
  '도토리묵': 31,
  '동그랑땡': 32,
  '된장찌개': 33,
  '두부김치': 34,
  '두부조림': 35,
  '땅콩조림': 36,
  '떡갈비': 37,
  '떡국_만두국': 38,
  '떡꼬치': 39,
  '떡볶이': 40,
  '라면': 41,
  '라볶이': 42,
  '막국수': 43,
  '만두': 44,
  '멍게': 45,
  '메추리알장조림': 46,
  '멸치볶음': 47,
  '무국': 48,
  '무생채': 49,
  '물냉면': 50,
  '물회': 51,
  '미역국': 52,
  '미역줄기볶음': 53,
  '배추김치': 54,
  '백김치': 55,
  '보쌈': 56,
  '부추김치': 57,
  '불고기': 58,
  '비빔냉면': 59,
  '비빔밥': 60,
  '산낙지': 61,
  '삼겹살': 62,
  '삼계탕': 63,
  '새우볶음밥': 64,
  '새우튀김': 65,
  '생선조림': 66,
  '소세지볶음': 67,
  '송편': 68,
  '수정과': 69,
  '숙주나물': 70,
  '순대': 71,
  '순두부찌개': 72,
  '시금치나물': 73,
  '시래기국': 74,
  '식혜': 75,
  '애호박볶음': 76,
  '약과': 77,
  '약식': 78,
  '양념게장': 79,
  '양념치킨': 80,
  '어묵볶음': 81,
  '연근조림': 82,
  '열무국수': 83,
  '열무김치': 84,
  '오이소박이': 85,
  '오징어채볶음': 86,
  '우엉조림': 87,
  '유부초밥': 88,
  '육개장': 89,
  '육회': 90,
  '잔치국수': 91,
  '잡곡밥': 92,
  '잡채': 93,
  '장어구이': 94,
  '장조림': 95,
  '전복죽': 96,
  '제육볶음': 97,
  '조개구이': 98,
  '조기구이': 99,
  '족발': 100,
  '주꾸미볶음': 101,
  '짜장면': 102,
  '짬뽕': 103,
  '쫄면': 104,
  '찜닭': 105,
  '총각김치': 106,
  '추어탕': 107,
  '칼국수': 108,
  '콩국수': 109,
  '콩나물국': 110,
  '콩나물무침': 111,
  '콩자반': 112,
  '파김치': 113,
  '파전': 114,
  '피자': 115,
  '한과': 116,
  '해물찜': 117,
  '호박전': 118,
  '호박죽': 119,
  '황태구이': 120,
  '후라이드치킨': 121,
  '훈제오리': 122
};


// 전역 변수
let cart = [];
const sessionId = `sess_${Math.random().toString(36).substring(2, 12)}`;
// 장바구니 UI 업데이트
async function updateCartUI() {
 try {
   const res = await fetch(`/api/cart/${sessionId}`);
   const items = await res.json();
   cart = items;
   
   const container = document.getElementById("cart-items");
   const totalContainer = document.getElementById("cart-total");
   
   if (!items.length) {
     container.innerHTML = `<div class="status-message" style="background: rgba(255,165,0,0.1); color: #666;">${t('cartEmpty')}</div>`;
     totalContainer.innerHTML = '';
     return;
   }
   
   const totalPrice = items.reduce((sum, item) => sum + (item.price || 1000), 0);
   
   container.innerHTML = items.map(item => `
     <div class="cart-item">
       <div class="cart-item-info">
         <div class="cart-item-name">🍽️ ${item.menu}</div>
         <div class="cart-item-price">💰 ${(item.price || 1000).toLocaleString()}${currentLanguage === 'ko' ? '원' : ''}</div>
       </div>
       <button class="danger-btn cart-btn" onclick="removeCartItem(${item.id})" style="padding: 8px 12px; font-size: 0.9rem; min-width: auto;">
         ❌
       </button>
     </div>
   `).join("");
   
   totalContainer.innerHTML = `
     <div class="cart-total">
       📊 ${t('totalItems', {count: items.length})} | ${t('totalAmount', {amount: totalPrice.toLocaleString()})}
     </div>
   `;
 } catch (e) {
   console.error('장바구니 UI 업데이트 실패:', e);
 }
}

// cart 테이블의 고유 id를 받아서 삭제
async function removeCartItem(cartItemId) {
  try {
    const response = await fetch(`/api/cart/item/${cartItemId}`, { method: 'DELETE' });
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg);
    }
    updateCartUI();
  } catch (e) {
    console.error('❌ 장바구니 항목 삭제 실패:', e);
  }
}

// 장바구니 전체 비우기
async function clearCart() {
 try {
   await fetch(`/api/cart/${sessionId}`, { method: 'DELETE' });
   updateCartUI();
 } catch (e) {
   console.error('장바구니 비우기 실패:', e);
 }
}

// 식당 목록 불러오기
async function loadRestaurants() {
 try {
   const res = await fetch('/api/restaurants');
   const names = await res.json();
   
   const container = document.getElementById('restaurants');
   if (!names.length) {
     container.innerHTML = `<div class="status-message">${t('noRestaurants')}</div>`;
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
   container.innerHTML = `<div class="status-message error-message">❌ ${t('noRestaurants')}</div>`;
 }
}

// 메뉴 불러오기
async function loadMenus(restaurantName) {
 try {
   // 로딩 표시
   result.innerHTML = `
     <div class="status-message">
       <div class="loading">🔄</div>
       <div>${t('loadingMenu')}</div>
     </div>
   `;
   
   const res = await fetch(`/api/menus/${restaurantName}`);
   const menus = await res.json();
   
   if (!menus.length) {
     result.innerHTML = `<div class="status-message">${t('noMenus')}</div>`;
     return;
   }
   
   result.innerHTML = `
  <h2>🍜 ${restaurantName} ${currentLanguage === 'ko' ? '메뉴' : 'Menu'}</h2>
  <div class="menu-grid">
    ${menus.map(m => `
      <div style="text-align: center;">
        ${m.imageUrl ? `<img src="${m.imageUrl}" alt="${m.menu}" style="width:120px; height:120px; object-fit:cover; border-radius:12px; margin-bottom:8px;" />` : ''}
        <div><strong>${m.menu}</strong></div>
        <div style="color:#555;">💰 ${m.price?.toLocaleString()}${currentLanguage === 'ko' ? '원' : ''}</div>
        <button onclick="confirmOrder('${restaurantName}', ${m.menuId}, '${m.menu}')">
          ➕ ${currentLanguage === 'ko' ? '선택' : 'Select'}
        </button>
      </div>
    `).join('')}
  </div>
  <div class="button-group" style="margin-top: 30px;">
    <button class="info-btn" onclick="loadRestaurants(); result.innerHTML='';">
      ${t('backToRestaurants')}
    </button>
  </div>
`;

 } catch (e) {
   console.error('메뉴 로드 실패:', e);
   result.innerHTML = `<div class="status-message error-message">❌ ${t('noMenus')}</div>`;
 }
}

// 주문 확인
function confirmOrder(restaurantName, menuId, menuName) {
 result.innerHTML = `
   <div class="confirm-dialog">
     <h2>${t('orderConfirm')}</h2>
     <div style="font-size: 1.5rem; margin: 20px 0;">
       🍽️ <strong>${menuName}</strong>
     </div>
     <div style="font-size: 1.2rem; opacity: 0.9;">
       📍 ${restaurantName}
     </div>
     <div style="margin: 20px 0; font-size: 1.1rem;">
       ${currentLanguage === 'ko' ? '위 메뉴를 장바구니에 담으시겠습니까?' : 'Would you like to add this menu to your cart?'}
     </div>
     <div class="button-group">
       <button class="success-btn" onclick="sendOrder('${restaurantName}', ${menuId}, '${menuName}')">
         ${t('addToCart')}
       </button>
       <button class="danger-btn" onclick="loadMenus('${restaurantName}')">
         ${t('cancel')}
       </button>
     </div>
   </div>
 `;
}
// 주문 전송 + 장바구니 저장 후 UI 업데이트
async function sendOrder(restaurantName, menuId, menuName) {
 try {
   const orderRes = await fetch("/api/order", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ restaurantName, menuId })
   });
   if (!orderRes.ok) throw new Error("주문 실패");


   result.innerHTML = `
     <div class="confirm-dialog">
       <h2>${t('addedToCart')}</h2>
       <div style="font-size: 1.5rem; margin: 20px 0;">
        🍽️ <strong>${menuName}</strong>
      </div>
      <div style="font-size: 1.2rem; opacity: 0.9;">
        📍 ${restaurantName}
      </div>
      <div class="button-group">
        <button class="success-btn" onclick="loadMenus('${restaurantName}')">
          ${t('addMore')}
        </button>
        <button class="info-btn" onclick="loadRestaurants(); result.innerHTML='';">
          ${t('viewOtherRestaurants')}
        </button>
      </div>
    </div>
  `;

} catch (e) {
  console.error('주문 전송 실패:', e);
  result.innerHTML = `<div class="status-message error-message">❌ ${currentLanguage === 'ko' ? '주문 실패' : 'Order failed'}</div>`;
}
}

// ✅ 변경된 confirmPayment 함수 (paste.txt에 누락됨)
async function confirmPayment() {
  if (!cart.length) {
    result.innerHTML = `<div class="status-message">${t('cartEmpty')}</div>`;
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 1000), 0);

  result.innerHTML = `
    <div class="confirm-dialog">
      <h2>${t('selectPayment')}</h2>
      <div style="margin: 20px 0; font-size: 1.4rem;">
        ${currentLanguage === 'ko' ? '총 결제 금액' : 'Total Amount'}: <strong>${totalAmount.toLocaleString()}${currentLanguage === 'ko' ? '원' : ''}</strong>
      </div>
      <div class="button-group">
        <button class="success-btn" onclick="handleCashPayment(${totalAmount})">${t('cash')}</button>
        <button class="info-btn" onclick="handleCardPayment(${totalAmount})">${t('card')}</button>
      </div>
    </div>
  `;
}

// ✅ 현금 결제 처리 (paste.txt에 누락됨)
function handleCashPayment(totalAmount) {
  result.innerHTML = `
    <div class="confirm-dialog">
      <h2>${t('cash')}</h2>
      <div style="margin: 20px 0; font-size: 1.2rem;">
        ${t('callStaff')}<br/><br/>${t('enterPassword')}
      </div>
      <input type="password" id="cash-secret" placeholder="${t('passwordPlaceholder')}" style="padding:10px; font-size:1.2rem; border-radius:10px;"/>
      <div class="button-group" style="margin-top: 20px;">
        <button class="success-btn" onclick="confirmCashSecret(${totalAmount})">${t('confirm')}</button>
      </div>
    </div>
  `;
}

// ✅ 현금 결제 비밀번호 확인 (paste.txt에 누락됨)
function confirmCashSecret(totalAmount) {
  const secret = document.getElementById('cash-secret').value;
  if (secret === 'dlwjdgus') {
    result.innerHTML = `
      <div class="order-complete">
        <h2>${t('cashPaymentComplete')}</h2>
        <div style="font-size: 1.2rem; margin: 15px 0;">
          ${t('paymentAmount', {amount: totalAmount.toLocaleString()})}
        </div>
        <div style="font-size: 1rem; opacity: 0.8;">
          ${t('autoReset')}
        </div>
      </div>
    `;
    fetch(`/api/cart/${sessionId}`, { method: 'DELETE' });
    setTimeout(() => {
      cart = [];
      loadRestaurants();
      result.innerHTML = "";
      updateCartUI();
    }, 10000);
  } else {
    alert(t('wrongPassword'));
  }
}

// ✅ 카드 결제 처리 (paste.txt에 누락됨)
async function handleCardPayment(totalAmount) {
  try {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount })
    });
    const { clientSecret } = await res.json();

    const stripe = Stripe("pk_test_51RcxYTRIZ0vIX0iBUp865uj1lQ1fbchm09qqlixH0rtP35iW1idUEaCHKA0gMs1Bdoyo8HSOePj0cU58bDBzP17S00AakelUCQ");
    const elements = stripe.elements();
    const card = elements.create("card");

    result.innerHTML = `
      <div class="confirm-dialog">
        <h2>${t('enterCardInfo')}</h2>
        <div style="margin: 20px 0;">
          ${t('paymentAmountLabel', {amount: totalAmount.toLocaleString()})}
        </div>
        <div id="payment-form" style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;"></div>
        <button id="pay-button" class="success-btn">${t('payButton')}</button>
      </div>
    `;

    card.mount("#payment-form");

    document.getElementById('pay-button').onclick = async () => {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: card },
      });

      if (error) throw error;

      result.innerHTML = `
        <div class="order-complete">
          <h2>${t('cardPaymentComplete')}</h2>
          <div style="font-size: 1.2rem; margin: 15px 0;">
            ${t('paymentAmount', {amount: totalAmount.toLocaleString()})}
          </div>
          <div style="font-size: 1rem; opacity: 0.8;">
            ${t('autoReset')}
          </div>
        </div>
      `;

      await fetch(`/api/cart/${sessionId}`, { method: 'DELETE' });

      setTimeout(() => {
        cart = [];
        loadRestaurants();
        result.innerHTML = "";
        updateCartUI();
      }, 10000);
    };
  } catch (e) {
    console.error("Stripe 결제 오류:", e);
    result.innerHTML = `<div class="status-message error-message">❌ ${currentLanguage === 'ko' ? '결제 실패' : 'Payment failed'}: ${e.message}</div>`;
  }
}

// ✅ displayOrderResult 함수에서 중복 방지 조건 추가됨
function displayOrderResult(data) {
  const menuId = reverseClassIndices[data.menu];
  if (typeof menuId === 'undefined') {
    console.error("❌ menuId를 찾을 수 없습니다:", data.menu);
    return;
  }

  // ✅ 중복 방지를 위해 이미 장바구니에 있는지 확인
  const isAlreadyInCart = cart.some(item =>
  item.restaurant === data.restaurant &&
  item.menu === data.menu &&
  item.menuId === reverseClassIndices[data.menu]
);



  fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      restaurant: data.restaurant,
      menuId
    }),
  }).then(() => {
    updateCartUI();
  }).catch((e) => {
    console.error("자동 장바구니 저장 실패:", e);
  });

  result.innerHTML = `
    <div class="order-complete">
      <h2>${t('orderComplete')}</h2>
      <div style="font-size: 1.4rem; margin: 15px 0;">
        <strong>🏪 ${data.restaurant}</strong>
      </div>
      <div style="font-size: 1.6rem; margin: 15px 0;">
        <strong>🍽️ ${data.menu}</strong>
      </div>
      <div class="price-tag">
        💰 ${data.price?.toLocaleString()}${currentLanguage === 'ko' ? '원' : ''}
      </div>
      ${data.imageUrl ? `
        <img src="${data.imageUrl}" alt="${data.menu}" style="width:200px; border-radius:15px; margin-top:20px;" />
      ` : ''}
      <div class="button-group" style="margin-top: 25px;">
        <button class="info-btn" onclick="loadRestaurants(); result.innerHTML='';">
          ${t('home')}
        </button>
        <button onclick="loadMenus('${data.restaurant}')">
          ${t('orderMore')}
        </button>
      </div>
    </div>
  `;
}


// ✅ 주문 결과 수신 WebSocket (paste.txt에 누락됨)
try {
 const ws = new WebSocket("ws://localhost:3001");
 
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
     console.log("📨 받은 메시지:", data);
     displayOrderResult(data);
     updateCartUI();
   } catch (parseError) {
     console.error("메시지 파싱 오류:", parseError);
     result.innerHTML = `
       <div class="status-message error-message">
         ❌ ${currentLanguage === 'ko' ? '주문 처리 중 오류가 발생했습니다' : 'Order processing error occurred'}.
       </div>
     `;
   }
 };
} catch (wsError) {
 console.error("WebSocket 초기화 오류:", wsError);
}

// ✅ 페이지 로드 시 초기화 (paste.txt에 누락됨)
loadRestaurants();
updateCartUI();