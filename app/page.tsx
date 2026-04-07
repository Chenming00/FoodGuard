import Link from 'next/link';
import { Activity, ChefHat, Box, AlertCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* 导航栏 */}
      <nav className="border-b border-green-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-emerald-900">冰箱食物保卫者</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-emerald-800">
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                首页
              </Link>
              <Link href="/ingredients" className="hover:text-emerald-600 transition-colors">
                食材管理
              </Link>
              <Link href="/menu" className="hover:text-emerald-600 transition-colors">
                今日菜单
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="mb-4 text-4xl md:text-6xl font-bold text-emerald-900">
              冰箱食物保卫者
            </h1>
            <p className="text-lg md:text-xl text-emerald-700 max-w-2xl">
              管理您的冰箱食材，AI 智能生成健康菜单，让每一口都营养均衡
            </p>
          </div>

          {/* 功能卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl w-full">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Box className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">食材管理</h3>
              <p className="text-sm text-gray-600">添加和管理您的冰箱食材，实时监控保质期</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <ChefHat className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">智能菜单</h3>
              <p className="text-sm text-gray-600">基于现有食材，AI 生成健康营养的每日菜单</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">健康分析</h3>
              <p className="text-sm text-gray-600">分析每道菜的嘌呤和升糖指数，吃得更健康</p>
            </div>
          </div>

          {/* 快速入口 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl w-full">
            <Link
              href="/ingredients"
              className="group block bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-center"
            >
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <Box className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-900">开始管理食材</h3>
              <p className="text-gray-600">添加您的冰箱食材，开始智能菜单生成</p>
            </Link>

            <Link
              href="/menu"
              className="group block bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-center"
            >
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <ChefHat className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-900">查看今日菜单</h3>
              <p className="text-gray-600">基于食材生成的健康营养菜单</p>
            </Link>
          </div>

          {/* 健康提示 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900">健康小贴士</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">嘌呤知识</h3>
                <p className="text-sm text-gray-600">
                  嘌呤是人体代谢产物，高嘌呤食物可能导致尿酸升高，痛风患者需注意控制摄入。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">升糖指数（GI）</h3>
                <p className="text-sm text-gray-600">
                  GI 值高的食物会快速升高血糖，糖尿病患者应选择低 GI 食物，保持血糖稳定。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-green-200 bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-emerald-800">
          <p className="text-sm">© 2026 冰箱食物保卫者 - 让每一口都营养健康</p>
        </div>
      </footer>
    </div>
  );
}