# 1. Node.js 기반 이미지
FROM node:20

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 전체 파일 복사 (node_modules 포함)
COPY . .

# 4. 환경변수 설정 (필요 시 .env 로드 패키지 필요)
# RUN npm install dotenv  # dotenv를 코드에서 사용한다면 필요

# 5. 포트 오픈
EXPOSE 3000

# 6. 앱 실행
CMD ["node", "server.js"]
