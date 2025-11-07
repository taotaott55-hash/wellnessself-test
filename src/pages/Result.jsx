import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Result(){
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const score = Number(params.get('score') || 0)
  const level = params.get('level') || '—'

  const share = async () => {
    const url = window.location.origin + '/'
    const text = `我刚做了亚健康自测：总分 ${score}，状态 ${level}。来测一下～`
    try {
      if (navigator.share) {
        await navigator.share({ title: '亚健康自测', text, url })
      } else {
        await navigator.clipboard.writeText(url)
        alert('链接已复制：' + url)
      }
    } catch(e){ console.log(e) }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 text-center">
      <img src="/share-cover.png" alt="" className="mx-auto h-28" />
      <h1 className="mt-4 text-3xl font-bold">测评完成</h1>
      <p className="mt-2 text-gray-600">你的总分为 <span className="font-semibold text-gray-900">{score}</span>，状态：<span className="font-semibold text-gray-900">{level}</span></p>

      <div className="mt-6 grid sm:grid-cols-3 gap-4 text-left">
        {[
          '规律作息：固定上/下床时间，优先恢复睡眠质量',
          '均衡饮食：减少精制糖/酒精，多蔬果与蛋白质',
          '运动处方：每周 3-5 次中等强度有氧 + 力量'
        ].map((t,i)=>(
          <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">✅ {t}</div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button onClick={share} className="rounded-2xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:shadow-md">分享给朋友</button>
        <Link to="/test" className="rounded-2xl px-5 py-3 bg-white border font-semibold hover:shadow">重新测评</Link>
        <Link to="/" className="rounded-2xl px-5 py-3 bg-white border font-semibold hover:shadow">返回首页</Link>
      </div>
    </section>
  )
}
