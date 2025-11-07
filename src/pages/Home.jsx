import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">🌿 亚健康自测 · 品牌体验版</h1>
          <p className="mt-4 text-gray-600">1～5 分量表 · 自动评分 · 分维度统计 · 结果解读 · 一键分享与导出。</p>
          <ul className="mt-5 space-y-2 text-sm text-gray-700">
            <li>✅ 自定义 LOGO / 品牌色</li>
            <li>✅ 分享封面 / 结果页文案</li>
            <li>✅ CSV 导出，可对接数据平台</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Link to="/test" className="rounded-2xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:shadow-md">开始测评</Link>
            <a href="/share-cover.png" className="rounded-2xl px-5 py-3 bg-white border font-semibold hover:shadow">下载封面</a>
          </div>
        </div>
        <div className="relative">
          <img src="/hero-illustration.svg" alt="illustration" className="w-full" />
          <div className="absolute -inset-2 rounded-3xl -z-10 bg-emerald-100/40 blur-2xl"></div>
        </div>
      </div>
    </section>
  )
}
