# 1. Node.js 기반 이미지
FROM node:20

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 종속성 설치 (효율적 캐시 사용 위해 먼저 복사)
COPY package*.json ./
RUN npm install

# 4. 나머지 전체 소스 복사 (node_modules는 무시됨)
COPY . .

# 5. 포트 열기
EXPOSE 3000

EXPOSE 3001  # ✅ 이 줄 추가

# 6. 앱 실행
CMD ["node", "server.js"]
