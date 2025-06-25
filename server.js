// ✅ Node.js - server.js
//require('dotenv').config();  // 꼭 맨 위에!
const express = require('express');
const cors = require('cors');  // ✅ 추가
const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');
const path = require('path');
const Stripe = require('stripe');
const app = express();
const port = 3000;
const wsPort = 3001;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const db = new sqlite3.Database('db.sqlite');
app.use(cors({  // ✅ 위치 주의: express.json()보다 위에 있어도 됩니다
  origin: '*',  // 개발 중엔 * 가능 / 배포 시엔 실제 도메인으로
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());


// ✅ menuId → 메뉴명 매핑
const class_indices = {
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
const menuNames = Object.entries(class_indices).reduce((obj, [k, v]) => {
  obj[v] = k;
  return obj;
}, {});

// ✅ 장바구니 저장
app.post('/api/cart', (req, res) => {
  console.log('📦 받은 장바구니 요청:', req.body);  // ✅ 디버깅용 로그
  const { sessionId, restaurant, menuId } = req.body;
  if (!sessionId || !restaurant || typeof menuId === 'undefined') {
    return res.status(400).send("필수 정보 누락");
  }

  db.get(`SELECT menu, price, imageUrl FROM menus WHERE restaurant = ? AND menuId = ? LIMIT 1`,
    [restaurant, menuId], (err, row) => {
      if (err || !row) return res.status(404).send("해당 메뉴 정보 없음");
      db.run(`INSERT INTO cart (sessionId, restaurant, menuId, menu, price, imageUrl) VALUES (?, ?, ?, ?, ?, ?)`,
        [sessionId, restaurant, menuId, row.menu, row.price, row.imageUrl],
        (insertErr) => {
          if (insertErr) return res.status(500).send("장바구니 저장 오류");
          res.send("장바구니에 저장됨");
        });
    });
});

// ✅ 장바구니 삭제 (비우기)
app.delete('/api/cart/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  db.run(`DELETE FROM cart WHERE sessionId = ?`, [sessionId], function(err) {
    if (err) return res.status(500).send("장바구니 삭제 오류");
    res.send("장바구니 비움 완료");
  });
});

// ✅ 장바구니 조회
app.get('/api/cart/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  db.all(`SELECT * FROM cart WHERE sessionId = ?`, [sessionId], (err, rows) => {
    if (err) return res.status(500).send("장바구니 조회 오류");
    res.json(rows);
  });
});

app.delete('/api/cart/item/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM cart WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ error: "장바구니 항목 삭제 오류" });
    if (this.changes === 0) return res.status(404).json({ error: "해당 항목 없음" });
    res.send("장바구니 항목 삭제 완료");
  });
});



// ✅ 결제 요청
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'krw',
      payment_method_types: ['card']
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error('❌ Stripe 결제 intent 생성 오류:', e);
    res.status(500).json({ error: "결제 요청 오류" });  // ✅ 수정됨
  }
});


// ✅ 식당 목록
app.get('/api/restaurants', (req, res) => {
  db.all(`SELECT DISTINCT restaurant FROM menus`, (err, rows) => {
    if (err) return res.status(500).send("DB 오류");
    res.json(rows.map(r => r.restaurant));
  });
});

// ✅ 식당별 메뉴 조회
app.get('/api/menus/:restaurant', (req, res) => {
  const restaurant = req.params.restaurant;
  db.all(
    `SELECT menuId, menu, price, imageUrl FROM menus 
     WHERE restaurant = ? 
     GROUP BY menuId`,  // 중복 제거 목적
    [restaurant],
    (err, rows) => {
      if (err) return res.status(500).send("DB 오류");
      res.json(rows);
    }
  );
});


// ✅ 주문 처리 및 브로드캐스트
app.post('/api/order', (req, res) => {
  const { restaurantName, menuId } = req.body;
  const menuName = menuNames[menuId] || `메뉴${menuId}`;

  db.get(`SELECT price, imageUrl FROM menus WHERE restaurant = ? AND menuId = ? LIMIT 1`,
    [restaurantName, menuId], (err, row) => {
      if (err || !row) return res.status(404).send("해당 식당/메뉴 정보를 찾을 수 없습니다.");

      const data = {
        restaurant: restaurantName,
        menuId,  // ✅ 추가
        menu: menuName,
        price: row.price,
        imageUrl: row.imageUrl,
      };

      db.run(
  `REPLACE INTO menus (restaurant, menuId, menu, price, imageUrl)
   VALUES (?, ?, ?, ?, ?)`,
  [restaurantName, menuId, menuName, row.price, row.imageUrl]
);


      broadcast(data);
      res.send("Order received");
    });
});

// ✅ 정적 파일 서비스 마지막에 배치
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`✅ Kiosk server running at http://localhost:${port}`);
});

// ✅ WebSocket 설정
const wss = new WebSocket.Server({ port: wsPort });
let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  clients.forEach(c => c.send(msg));
}

// ✅ DB 테이블 생성
const dbInit = () => {
  db.run(`CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant TEXT,
    menuId INTEGER,
    menu TEXT,
    price INTEGER,
    imageUrl TEXT,
    UNIQUE(restaurant, menuId)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId TEXT,
    restaurant TEXT,
    menuId INTEGER,
    menu TEXT,
    price INTEGER,
    imageUrl TEXT
  )`);
};

db.serialize(dbInit);

