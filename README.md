# DocuAI

**AI가 채워주는 공문서, 3초면 완성**

공인중개사, 법무사, 일반 시민을 위한 상업용 AI 공문서 자동작성 플랫폼입니다.

## 기술 스택

- **프론트엔드**: React + Vite, Tailwind CSS
- **백엔드**: Vercel Serverless Functions (`api/`)
- **DB/인증**: Supabase (Auth, PostgreSQL)
- **AI**: Anthropic Claude API
- **PDF**: pdf-lib

## 로컬 실행

1. 의존성 설치: `npm install`
2. `.env` 생성 (`.env.example` 참고)
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (클라이언트)
   - API 키는 서버 전용이므로 프론트엔드 코드에 넣지 마세요.
3. Supabase에서 `supabase/schema.sql` 실행 (테이블 + RLS)
4. 프론트만 실행: `npm run dev`
5. API 포함 전체 실행: `vercel dev` (Vercel CLI 설치 필요)

## 배포 (Vercel)

1. 프로젝트를 Vercel에 연결
2. 환경 변수 설정:
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (api에서 사용량/프로필 조회·갱신용)
3. 빌드 후 배포

## 요금제

- **Free**: 월 3회 AI 자동완성
- **Pro**: 월 9,900원, 무제한

## 품질 기준

- 모바일/태블릿/데스크탑 반응형
- 로딩: 스피너·스켈레톤
- 에러: Toast 알림
- 빈 상태: 전용 UI
- API 키는 `api/` 서버에만 존재
