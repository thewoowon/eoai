"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import SectionTitle from "@/components/section-title";

const VIBE_PROMPT = `You are a senior product engineer and frontend engineer.

Build a deployable Next.js prototype for an internal mobile game growth tool called **Experiment Orchestrator AI**.

### Product concept
This tool helps UA marketers, PMs, and data analysts decide what experiment to run next.

The key idea is:
- AS-IS: Problem → Experiment Design (Human) → Execution → Data → Improvement → Repeat
- TO-BE: Problem → Experiment Design (AI) → Execution → Data → Improvement → Repeat

The app should demonstrate how AI can replace the human-centered experiment design step.

### Technical constraints
- Use Next.js with TypeScript
- Use Tailwind CSS
- No backend
- No database
- No authentication
- No external AI API calls
- Use only local mock data and deterministic logic
- Must be deployable to Vercel
- Must build successfully

### Routes
Create the following pages:
1. \`/\` main dashboard
2. \`/simulate\` experiment simulation page
3. \`/prompt\` page that shows this exact prompt in a code block

### Main dashboard requirements
Display:
- app header with product title and \`Mock Prototype\` badge
- AS-IS vs TO-BE process comparison
- KPI overview cards for one mock mobile game
- AI diagnosis section
- 3 experiment recommendation cards
- recommendation logic summary

Use a modern internal tool style with strong visual hierarchy, clean spacing, and card-based layout.

### KPI cards
Show:
- CTR
- CVR
- D1 Retention
- D7 Retention
- ROAS D7
- ROAS D30

Each metric should show:
- label
- value
- status badge such as good / warning / critical

### Diagnosis logic
Use local rule-based logic such as:
- low CTR → creative issue
- low D1 → onboarding / FTUE issue
- low ROAS with okay CTR → monetization issue

Generate:
- primary issue
- secondary issue
- confidence
- short reason summary

### Recommendation cards
Show 3 experiment recommendations.
Each card must include:
- title
- target area
- expected KPI impact
- rationale
- effort
- priority
- \`Run Simulation\` button

### Simulation page requirements
When the user selects an experiment:
- show selected experiment summary
- show before vs after KPI comparison
- show narrative result summary
- show 2 next-loop recommendations
- provide buttons back to dashboard and to prompt page

### Simulation logic
Use deterministic mock changes per experiment.
Example:
- creative hook experiment improves CTR and slightly affects CVR
- FTUE experiment improves D1 and D7
- monetization experiment improves ROAS D7 and ROAS D30

### Prompt page requirements
Display the exact vibe coding prompt in a readable code block.
Include a copy button.

### Architecture expectations
Organize code well:
- reusable components
- typed data models
- mock data in separate file
- diagnosis logic in utility file
- recommendation logic in utility file
- simulation logic in utility file

### Suggested folders
- app/
- components/
- lib/
- types/

### UX goal
The app should feel like a believable internal growth analytics product.
It should be concise, clean, and demo-friendly.

### Deliverables
Generate:
- complete working code
- readable project structure
- minimal README with install/run/build instructions`;

export default function PromptPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(VIBE_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        <section>
          <SectionTitle label="바이브 코딩 프롬프트" />
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <p className="text-sm text-zinc-600 leading-relaxed mb-2">
              아래 프롬프트는 Claude Code에게 이 프로토타입 생성을 지시하는 데 사용된 실제 프롬프트입니다.
              역할 정의, 제품 컨텍스트, 기술 제약 조건, UI 및 로직 요구사항이 포함되어 있습니다.
            </p>
            <p className="text-xs text-zinc-400">
              이 페이지는 과제 ⑥ 바이브 코딩 지시문 항목을 충족합니다.
            </p>
          </div>
        </section>

        <section>
          <div className="rounded-xl border border-zinc-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-700">
              <span className="text-xs text-zinc-400 font-mono">vibe-coding-prompt.txt</span>
              <button
                onClick={handleCopy}
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-zinc-700 text-zinc-200 hover:bg-zinc-600 transition-colors cursor-pointer"
              >
                {copied ? "복사됨!" : "복사"}
              </button>
            </div>
            <pre className="bg-zinc-950 text-zinc-200 text-xs font-mono leading-relaxed p-6 overflow-x-auto whitespace-pre-wrap">
              {VIBE_PROMPT}
            </pre>
          </div>
        </section>

        <div className="flex gap-3">
          <Link
            href="/"
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            ← 대시보드로 돌아가기
          </Link>
          <Link
            href="/simulate"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
          >
            시뮬레이션으로 이동 →
          </Link>
        </div>

      </main>
    </div>
  );
}
