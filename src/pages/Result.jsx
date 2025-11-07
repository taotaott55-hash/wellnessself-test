import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function Result(){
  const { search } = useLocation()
  const qs = new URLSearchParams(search)
  const total = Number(qs.get('total') || 0)
  const level = qs.get('level') || '—'
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">结果解读</h2>
        <p className="mt-3 text-gray-700">您的总分：<span className="font-bold">{total}</span></p>
        <p className="mt-1 text-gray-700">判定状态：<span className="font-bold">{level}</span></p>
        <ul className="mt-5 space-y-2 text-sm text-gray-700">
          <li>✅ 保持规律作息与均衡饮食</li>
          <li>✅ 每周 3-5 次中等强度运动</li>
          <li>✅ 使用冥想/呼吸放松等方式管理压力</li>
        </ul>
        <div className="mt-6 flex gap-3">
          <Link to="/test" className="rounded-2xl px-5 py-3 bg-white border font-semibold hover:shadow">重新测评</Link>
          <Link to="/" className="rounded-2xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:shadow-md">返回首页</Link>
        </div>
      </div>
    </section>
  )
}
