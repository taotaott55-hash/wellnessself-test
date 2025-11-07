import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sections = [
  { key:'psych', title:'一、心理与情绪状态', items:[
    '容易焦虑、烦躁或情绪波动大',
    '经常感到无精打采、提不起兴趣',
    '注意力难以集中、记忆力减退',
    '睡眠质量差（难入睡、易醒、多梦）',
    '压力大时出现心慌/发抖等躯体反应',
    '对工作或生活缺乏热情',
    '时常感到孤独、无助或被忽视',
    '对未来没有信心或感到迷茫',
    '经常叹气或莫名发愁',
    '情绪变化影响食欲或睡眠',
  ]},
  { key:'body', title:'二、身体状况', items:[
    '经常感到疲倦或乏力',
    '起床后仍觉得没休息好',
    '容易感冒/口腔溃疡/过敏',
    '头痛、头晕或眼睛干涩',
    '胃口不好、腹胀、便秘或腹泻',
    '肌肉酸痛、颈肩僵硬',
    '手脚冰冷或出汗异常',
    '心慌、胸闷或偶有血压不稳',
    '脱发、皮肤暗沉、易长痘',
    '体重忽增忽减、代谢紊乱',
  ]},
  { key:'life', title:'三、生活方式与行为习惯', items:[
    '经常熬夜或睡眠不足',
    '久坐不动、运动量少',
    '饮食不规律/常外卖/重口味',
    '依赖咖啡因/甜食/酒精提神',
    '长时间使用手机或电脑',
    '缺乏户外活动和阳光',
    '社交减少、情绪封闭',
    '压力长期得不到释放',
    '缺乏兴趣爱好或放松方式',
    '无规律体检或忽视身体信号',
  ]},
]

const MAX = 5
function levelInfo(total){
  if(total<=30) return { key:'good', label:'健康状态良好', color:'bg-emerald-500' }
  if(total<=60) return { key:'mild', label:'轻度亚健康', color:'bg-lime-500' }
  if(total<=90) return { key:'mid', label:'中度亚健康', color:'bg-amber-500' }
  return { key:'heavy', label:'重度亚健康', color:'bg-rose-500' }
}

export default function Test(){
  const [answers,setAnswers]=useState(()=>{
    const init={}; sections.forEach(s=>s.items.forEach((_,i)=>init[`${s.key}-${i}`]=0)); return init
  })
  const navigate = useNavigate()

  const totals = useMemo(()=>{
    const by={}; let total=0
    sections.forEach(s=>{
      const sum=s.items.reduce((acc,_,i)=>acc+(answers[`${s.key}-${i}`]||0),0)
      by[s.key]=sum; total+=sum
    })
    return { by, total }
  },[answers])

  const completion = useMemo(()=>{
    const vals=Object.values(answers); const filled=vals.filter(v=>v>0).length; return Math.round(filled/vals.length*100)
  },[answers])

  const onSubmit=()=>{
    const info=levelInfo(totals.total)
    const q=new URLSearchParams({ score:String(totals.total), level:info.label })
    navigate(`/result?${q.toString()}`)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">开始测评</h2>
        <div className="text-sm text-gray-600">完成度 {completion}%</div>
      </div>

      {sections.map(section=>(
        <div key={section.key} className="rounded-2xl border bg-white p-5 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
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
                  const key=`${section.key}-${qi}`
                  const val=answers[key]||0
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
                              checked={val===score} onChange={()=>setAnswers(prev=>({...prev,[key]:score}))}/>
                          </label>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">* 本工具为健康自我管理参考，不替代临床诊断。</div>
        <button onClick={onSubmit} className="rounded-2xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:shadow-md">提交并查看结果</button>
      </div>
    </section>
  )
}
