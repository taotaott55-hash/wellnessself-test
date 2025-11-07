import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sections = [
  { key:'psych', title:'一、心理与情绪状态', items:[
    '容易焦虑、烦躁或情绪波动大',
    '经常感到无精打采、提不起兴趣',
    '注意力难以集中、记忆力减退',
    '睡眠质量差（难入睡、易醒、多梦）',
    '对工作或生活缺乏热情',
  ]},
  { key:'body', title:'二、身体状况', items:[
    '经常感到疲倦或乏力',
    '起床后仍觉得没休息好',
    '头痛、头晕或眼睛干涩',
    '胃口不好、腹胀、便秘或腹泻',
    '肌肉酸痛、颈肩僵硬',
  ]},
  { key:'life', title:'三、生活方式与行为习惯', items:[
    '经常熬夜或睡眠不足',
    '久坐不动、运动量少',
    '饮食不规律/常外卖/重口味',
    '长时间使用手机或电脑',
    '压力长期得不到释放',
  ]},
]
function levelByScore(total){
  if (total <= 20) return {label:'健康状态良好', color:'bg-emerald-500'}
  if (total <= 40) return {label:'轻度亚健康', color:'bg-lime-500'}
  if (total <= 60) return {label:'中度亚健康', color:'bg-amber-500'}
  return {label:'重度亚健康', color:'bg-rose-500'}
}
export default function Test(){
  const [answers, setAnswers] = useState(()=>{
    const o = {}; sections.forEach(s=>s.items.forEach((_,i)=>o[`${s.key}-${i}`]=0)); return o
  })
  const nav = useNavigate()
  const total = useMemo(()=> Object.values(answers).reduce((a,b)=>a+(b||0),0), [answers])
  const level = levelByScore(total)
  const submit = () => {
    const qs = new URLSearchParams({ total: String(total), level: level.label })
    nav(`/result?${qs.toString()}`)
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">问卷（1=几乎没有 · 5=经常/严重）</h2>
      {sections.map(section=>(
        <section key={section.key} className="rounded-2xl border bg-white p-5 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="w-[56%] py-2 pr-4">题目</th>
                  {[1,2,3,4,5].map(n=>(<th key={n} className="py-2 pr-2">{n}</th>))}
                </tr>
              </thead>
              <tbody>
                {section.items.map((q,qi)=>{
                  const key = `${section.key}-${qi}`; const val = answers[key] || 0
                  return (
                    <tr key={key} className="border-t">
                      <td className="py-2 pr-4 align-top">
                        <div className="max-w-prose text-gray-800">{qi+1}. {q}</div>
                        <div className="mt-1 text-[11px] text-gray-400">1=几乎没有 · 3=偶尔/中等 · 5=经常/严重</div>
                      </td>
                      {[1,2,3,4,5].map(score=>(
                        <td key={score} className="py-2 pr-2">
                          <label className="inline-flex items-center justify-center">
                            <input type="radio" name={key} className="h-4 w-4 accent-emerald-600"
                              checked={val===score} onChange={()=>setAnswers(p=>({...p,[key]:score}))} />
                          </label>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-sm text-gray-600">当前总分</div>
        <div className="mt-1 text-3xl font-bold">{total}</div>
        <div className="mt-2 text-sm">状态：<span className={`inline-block rounded-full px-2 py-0.5 text-white ${level.color}`}>{level.label}</span></div>
        <button onClick={submit} className="mt-4 rounded-2xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:shadow-md">
          提交并查看结果
        </button>
      </div>
    </div>
  )
}
