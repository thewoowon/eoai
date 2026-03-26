import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EOAI",
  description:
    "모바일 게임 성장을 위한 AI 실험 설계 도구. KPI 분석부터 실험 추천, 시뮬레이션까지.",
  openGraph: {
    title: "EOAI — Experiment Orchestrator AI",
    description:
      "모바일 게임 성장을 위한 AI 실험 설계 도구. KPI 분석부터 실험 추천, 시뮬레이션까지.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Experiment Orchestrator AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EOAI — Experiment Orchestrator AI",
    description:
      "모바일 게임 성장을 위한 AI 실험 설계 도구. KPI 분석부터 실험 추천, 시뮬레이션까지.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
