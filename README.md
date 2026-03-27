# EOAI — Experiment Orchestrator AI

모바일 게임 성장팀을 위한 AI 실험 설계 도구 프로토타입.

KPI 데이터를 분석해 다음에 실행할 실험을 추천하고, 결과를 시뮬레이션합니다.

---

## 시작하기

```bash
yarn install
yarn dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

---

## 주요 화면

| 경로 | 설명 |
|------|------|
| `/` | 메인 대시보드 — KPI 현황, AI 진단, 실험 추천 |
| `/simulate` | 시뮬레이션 — 실험 선택 후 before/after KPI 변화 확인 |
| `/prompt` | 바이브 코딩 프롬프트 — 이 프로토타입 생성에 사용된 프롬프트 |

---

## 기술 스택

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- 백엔드 없음 — 목업 데이터 + 결정론적 로직만 사용

---

## 빌드 및 배포

```bash
# 프로덕션 빌드
yarn build

# Vercel 배포
vercel
```

Vercel에 레포를 연결하면 `main` 브랜치 push 시 자동 배포됩니다.
