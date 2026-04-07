import Link from 'next/link';
import { Upload, Activity, AlertCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* 导航栏 */}
      <nav className="border-b border-green-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-emerald-900">Food Health Scanner</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-emerald-800">
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                首页
              </Link>
              <Link href="/scan" className="hover:text-emerald-600 transition-colors">
                扫描食物
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
              智能食物健康扫描
            </h1>
            <p className="text-lg md:text-xl text-emerald-700 max-w-2xl">
              上传食物图片，AI 自动识别食物并分析嘌呤和升糖指数，为您提供健康风险提示和替代建议
            </p>
          </div>

          {/* 功能卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl w-full">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">智能识别</h3>
              <p className="text-sm text-gray-600">AI 技术精准识别食物种类</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">健康分析</h3>
              <p className="text-sm text-gray-600">分析嘌呤和升糖指数指标</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <AlertCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">健康建议</h3>
              <p className="text-sm text-gray-600">提供风险提示和替代食物</p>
            </div>
          </div>

          {/* 上传按钮 */}
          <div className="mb-12">
            <Link
              href="/scan"
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
            >
              <Upload className="h-6 w-6" />
              开始扫描食物
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
          <p className="text-sm">© 2026 Food Health Scanner. 为您的健康保驾护航</p>
        </div>
      </footer>
    </div>
  );
}