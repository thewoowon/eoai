# Supercent AI Application Engineer Assignment
## Prototype Planning Document for Claude Code
### Project: Experiment Orchestrator AI
### Stack: Next.js only / mock data / deployable frontend prototype

---

# 1. Project Goal

Build a **deployable Next.js prototype** for an AI-assisted experiment design tool that helps mobile game teams decide **what to test next**.

This prototype is **not** a full production system.  
It is a **front-end product prototype with mock data and deterministic simulation logic** that demonstrates the following idea clearly:

> In mobile game operations, the experiment loop already exists, but the **experiment design step** is still manual.  
> This prototype replaces the human-centered experiment design step with an AI-assisted recommendation layer.

---

# 2. Core Product Narrative

## AS-IS
Problem → **Experiment Design (Human)** → Execution → Data → Improvement → Repeat

## TO-BE
Problem → **Experiment Design (AI)** → Execution → Data → Improvement → Repeat

The prototype should visualize and simulate this transformation.

---

# 3. Assignment Mapping

This prototype must support the assignment sections below:

## ④ Prototyping Plan
- prototype objective
- implementation scope
- tools used
- input and output format

## ⑤ Prototyping Method
- how the prototype was actually built

## ⑥ Vibe Coding Instruction
- prompt used to instruct AI to generate the prototype
- role, functions, UI, technical requirements included
- do not include AI response

This document is intended to give Claude Code enough detail to start implementation immediately.

---

# 4. Product Definition

## Product Name
**Experiment Orchestrator AI**

## One-line Definition
An AI-assisted experiment planning dashboard that analyzes game KPIs and recommends the next experiments to run.

## Primary Users
- UA Marketer
- Product Manager
- Data Analyst

## User Problem
Although KPI data already exists, the process of deciding **what experiment to run next** is still manual, fragmented, and experience-dependent.

---

# 5. Prototype Scope

## What this prototype MUST do
1. Show key mobile game metrics using mock data
2. Diagnose the main issue based on those metrics
3. Recommend 3 next experiments
4. Show why each recommendation was generated
5. Simulate selecting and executing an experiment
6. Show updated KPI outcomes after experiment execution
7. Preserve the closed-loop concept:  
   metrics → recommendation → execution → updated metrics

## What this prototype MUST NOT do
1. No real backend
2. No real database
3. No authentication
4. No actual LLM API calls
5. No actual ML model serving
6. No multi-user collaboration
7. No CMS/admin tooling

This is a **high-quality product simulation**, not a real SaaS system.

---

# 6. UX Principles

The UI should feel like a real internal product used by a growth team.

## Tone
- minimal
- analytical
- dashboard-oriented
- clean and modern
- practical, not flashy

## Product Feel
Think:
- internal growth dashboard
- experimentation workspace
- AI copilot for game growth teams

---

# 7. Required Screens

Build as a small multi-page Next.js app.

## Required routes
1. `/`
2. `/simulate`
3. `/prompt`

---

# 8. Page-by-Page Requirements

---

## 8.1 `/` — Main Dashboard

### Purpose
Introduce the product and allow the user to inspect current KPI status and AI-generated experiment recommendations.

### Layout sections

#### A. Header
- Product name: Experiment Orchestrator AI
- subtitle: AI-assisted experiment design for mobile game growth
- top-right status badge: `Mock Prototype`

#### B. AS-IS vs TO-BE Section
A simple visual comparison:

- AS-IS:
  `Problem → Experiment Design (Human) → Execution → Data → Improvement → Repeat`
- TO-BE:
  `Problem → Experiment Design (AI) → Execution → Data → Improvement → Repeat`

This should be visually concise and immediately understandable.

#### C. Current KPI Overview
Use one mock game title.

Example:
- Game Title: `Burger Please`
- Genre: Arcade Idle
- Region: Global
- Network Phase: Expansion

Display KPI cards:
- CTR
- CVR
- D1 Retention
- D7 Retention
- ROAS D7
- ROAS D30

Each card must show:
- metric name
- value
- simple status badge: good / warning / critical

#### D. Problem Diagnosis Panel
A highlighted AI diagnosis section.

Example outputs:
- Primary Issue: Low CTR
- Secondary Issue: Weak D1 retention
- Confidence: High
- Reason summary: “Creative hook underperforms compared to benchmark, while early-session drop-off suggests FTUE friction.”

This section should feel like an AI-generated analysis summary.

#### E. Recommended Experiments
Show 3 recommendation cards.

Each card must include:
- experiment title
- target area (creative / onboarding / monetization)
- expected KPI impact
- rationale
- effort level
- priority
- CTA button: `Run Simulation`

Example experiment card:
- Title: `Replace first 3-second hook with failure-driven scenario`
- Target Area: Creative
- Expected Impact: CTR +0.8~1.4pp
- Rationale: Current CTR below benchmark; failure-tension hooks tend to improve ad stop-rate
- Effort: Low
- Priority: High

#### F. Recommendation Logic Summary
Small panel:
- input metrics used
- decision rules used
- why this recommendation was chosen

This increases credibility.

---

## 8.2 `/simulate` — Experiment Simulation Page

### Purpose
Allow users to simulate choosing one recommendation and see KPI changes.

### Layout sections

#### A. Selected Experiment Summary
Show:
- experiment name
- target problem
- expected KPI movement
- implementation description

#### B. Before vs After KPI Comparison
Display KPI comparison cards or small charts:
- before value
- after value
- delta

Metrics:
- CTR
- CVR
- D1
- D7
- ROAS D7
- ROAS D30

#### C. Simulation Result Narrative
Text block that explains:
- what changed
- what improved
- what did not improve
- suggested next step

Example:
“CTR improved meaningfully after creative hook adjustment, but D1 retention remains below benchmark. The next recommended action is FTUE friction reduction.”

#### D. Next Loop Recommendation
Show 2 follow-up experiments after simulation.

This is essential because the product concept is **closed-loop optimization**.

#### E. CTA
Buttons:
- `Back to Dashboard`
- `View Vibe Coding Prompt`

---

## 8.3 `/prompt` — Vibe Coding Prompt Page

### Purpose
Display the actual prompt used to instruct AI to build the prototype.

### Layout sections
- title
- short intro
- code block containing the final vibe coding prompt
- copy button

This page exists because the assignment explicitly asks for the prompt.

---

# 9. Functional Requirements

## 9.1 KPI Diagnosis Logic
The prototype must include deterministic mock diagnosis logic.

### Example rules
Use a local ruleset such as:

- If CTR < 1.2 → diagnose creative weakness
- If D1 < 32% → diagnose FTUE / onboarding issue
- If ROAS D7 < 20% and CTR is okay → diagnose monetization / CVR issue
- If multiple issues present → rank by business urgency

The logic does not need to be statistically correct.  
It needs to be **coherent, plausible, and product-like**.

---

## 9.2 Experiment Recommendation Logic
Based on diagnosis, produce 3 recommendations from static mock templates.

### Example mapping

#### Low CTR
- Replace hook with failure-driven scenario
- Add immediate reward preview in first 3 seconds
- Use competitor-inspired progression framing

#### Low D1
- Reduce FTUE friction
- Introduce faster first reward
- Simplify first-session task loop

#### Low ROAS / monetization
- Test earlier value surfacing
- Add limited-time starter pack trigger
- Rebalance ad/IAP exposure timing

Recommendations should be represented as structured objects.

---

## 9.3 Simulation Logic
When the user clicks `Run Simulation`, navigate to `/simulate` with the chosen experiment.

The simulation should:
- apply deterministic KPI deltas
- show before/after changes
- produce a narrative summary
- generate 2 next-loop recommendations

No randomness required unless implemented in a controlled way.

---

# 10. Mock Data Requirements

## Base mock entity
Use one game object.

Example structure:
- id
- title
- genre
- region
- lifecycleStage
- metrics
- benchmark
- availableExperiments

## Example metrics
- ctr: 0.9
- cvr: 18.5
- d1: 28
- d7: 9
- roasD7: 14
- roasD30: 42

## Example benchmark
- ctr: 1.4
- cvr: 20
- d1: 35
- d7: 12
- roasD7: 18
- roasD30: 50

Use plausible but simple values.

---

# 11. UI Requirements

## Design direction
- modern internal tool
- lots of white space
- strong hierarchy
- card-based layout
- subtle depth
- no excessive decoration

## Components needed
- navbar / header
- metric cards
- diagnosis card
- recommendation cards
- comparison cards
- process flow section
- prompt code viewer
- buttons
- badges / status pills

## Visual hierarchy
1. diagnosis
2. recommendations
3. KPI context
4. loop explanation

The user should immediately understand:
- what is wrong
- what AI suggests
- what happens if executed

---

# 12. Technical Requirements

## Framework
- Next.js (App Router preferred)
- TypeScript
- Tailwind CSS

## State handling
Keep it simple:
- React state
- or small local mock data utilities

No need for Redux, Zustand, or server state library.

## Data
All data local and static.

Suggested folder structure:
- `app/`
- `components/`
- `lib/mock-data.ts`
- `lib/diagnosis.ts`
- `lib/recommendations.ts`
- `lib/simulation.ts`
- `types/`

## Routing
- `/`
- `/simulate`
- `/prompt`

Use URL params or lightweight local state for selected experiment.

## Deployment readiness
The project should run cleanly with:
- install
- dev
- build

Must be deployable to Vercel easily.

---

# 13. Non-Functional Requirements

## Performance
- fast initial render
- no heavy dependencies unless justified

## Code quality
- clean component boundaries
- typed data models
- readable naming
- reusable UI pieces
- simple architecture

## Demo readiness
The prototype should look convincing enough for:
- screen recording
- GIF demo
- portfolio-style presentation

---

# 14. Deliverable Expectations from Claude Code

Claude Code should generate:

## A. Working Next.js prototype
Deployable frontend app with the required routes and UI

## B. Clear code structure
Well-organized components and utility functions

## C. Mock logic
Diagnosis, recommendation, and simulation logic using local data

## D. Prompt page
A page that displays the vibe coding instruction used

## E. README
Short README with:
- setup
- run
- build
- deploy guidance

---

# 15. Content Requirements for Each Assignment Section

This section exists so the final PPT/document can be filled easily.

---

## 15.1 ④ Prototyping Plan

### Prototype Objective
To verify whether KPI-based AI assistance can reduce manual effort in experiment design and recommend the next best experiment for game growth teams.

### Implementation Scope
A frontend-only prototype that:
- displays mobile game KPI status
- diagnoses issues
- recommends 3 experiments
- simulates experiment execution and KPI change

### Tools Used
- Next.js
- TypeScript
- Tailwind CSS
- local mock data
- deterministic recommendation logic

### Input / Output
#### Input
- KPI values such as CTR, D1, D7, ROAS
- selected experiment

#### Output
- diagnosis summary
- recommended experiments
- simulated KPI improvements
- follow-up recommendations

---

## 15.2 ⑤ Prototyping Method

### Actual Build Method
The prototype was built as a frontend-only product simulation using Next.js and mock data.  
Instead of connecting real analytics pipelines or LLM APIs, structured local data and deterministic recommendation rules were used to simulate the decision-support experience.  
This approach made it possible to focus on product structure, user flow, and AI interaction design while keeping the prototype deployable and easy to demo.

---

## 15.3 ⑥ Vibe Coding Prompt
Claude Code must also expose the final prompt in `/prompt`.

---

# 16. Final Vibe Coding Prompt for Claude Code

Use the following prompt as the actual implementation instruction.

## PROMPT START

You are a senior product engineer and frontend engineer.

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
1. `/` main dashboard
2. `/simulate` experiment simulation page
3. `/prompt` page that shows this exact prompt in a code block

### Main dashboard requirements
Display:
- app header with product title and `Mock Prototype` badge
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
- `Run Simulation` button

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
- minimal README with install/run/build instructions

## PROMPT END

---

# 17. Suggested File/Folder Design

```text
app/
  layout.tsx
  page.tsx
  simulate/page.tsx
  prompt/page.tsx

components/
  header.tsx
  process-flow.tsx
  metric-card.tsx
  diagnosis-panel.tsx
  recommendation-card.tsx
  comparison-card.tsx
  section-title.tsx

lib/
  mock-data.ts
  diagnosis.ts
  recommendations.ts
  simulation.ts
  utils.ts

types/
  index.ts
```

---

# 18. Acceptance Criteria

The work is complete if:

1. A Next.js app runs successfully
2. The main dashboard clearly communicates the product concept
3. KPI diagnosis works using mock rules
4. 3 recommendations are rendered coherently
5. Simulation page shows before/after KPI changes
6. Closed-loop concept is visible
7. Prompt page displays the vibe coding instruction
8. The project can be deployed to Vercel
9. The UI looks polished enough for a hiring assignment
10. The prototype supports PPT screenshots and a short demo video

---

# 19. Final Instruction to Claude Code

Do not over-engineer.
Do not build backend infrastructure.
Do not add unnecessary product complexity.

Focus on:

* clarity of concept
* polish of UI
* coherence of logic
* assignment fitness
* deployability

This is a product-thinking prototype, not a production analytics platform.
