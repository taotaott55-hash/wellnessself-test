import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Test from './pages/Test.jsx'
import Result from './pages/Result.jsx'
export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900">
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" className="h-8 w-8" alt="logo" />
            <span className="font-semibold">YourBrand 健康实验室</span>
          </Link>
          <nav className="text-sm">
            <Link to="/" className="px-3 py-1 rounded-lg hover:bg-gray-100">首页</Link>
            <Link to="/test" className="px-3 py-1 rounded-lg hover:bg-gray-100">开始测评</Link>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
      <footer className="mt-16 border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} YourBrand · All rights reserved</div>
          <div>本工具仅作健康自我管理参考，不替代临床诊断</div>
        </div>
      </footer>
    </div>
  )
}
