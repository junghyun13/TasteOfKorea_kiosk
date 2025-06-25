# 1. Node.js 기반 이미지
FROM node:20

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json만 먼저 복사하고 npm install
COPY package*.json ./
RUN npm install

# 4. 나머지 전체 소스 복사 (node_modules 제외)
COPY . .

# 5. 포트 오픈
EXPOSE 3000

# 6. 앱 실행
CMD ["node", "server.js"]
