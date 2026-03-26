import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
              EOAI
            </h1>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">
              목업 프로토타입
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            모바일 게임 성장을 위한 AI 실험 설계 도구
          </p>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            대시보드
          </Link>
          <Link
            href="/simulate"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            시뮬레이션
          </Link>
          <Link
            href="/prompt"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            프롬프트
          </Link>
        </nav>
      </div>
    </header>
  );
}
