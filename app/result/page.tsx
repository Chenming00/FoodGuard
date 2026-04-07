'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RefreshCw,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

type PurineLevel = '低' | '中' | '高';
type GILevel = '低' | '中' | '高';

interface FoodResult {
  foodName: string;
  嘌呤: PurineLevel;
  嘌呤Description: string;
  gi: GILevel;
  giDescription: string;
  risk?: string;
  alternatives: string[];
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const foodName = searchParams.get('food') || '';
  
  const [result, setResult] = useState<FoodResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (foodName) {
      fetchResult(foodName);
    }
  }, [foodName]);

  const fetchResult = async (name: string) => {
    try {
      setLoading(true);
      setError(null);

      // 调用分析 API
      const response = await fetch(`/api/analyze?food=${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error('获取分析结果失败');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取结果失败');
    } finally {
      setLoading(false);
    }
  };

  const getPurineColor = (level: PurineLevel) => {
    switch (level) {
      case '低': return 'bg-green-100 text-green-800 border-green-200';
      case '中': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '高': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGIColor = (level: GILevel) => {
    switch (level) {
      case '低': return 'bg-green-100 text-green-800 border-green-200';
      case '中': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '高': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPurineIcon = (level: PurineLevel) => {
    switch (level) {
      case '低': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case '中': return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      case '高': return <XCircle className="h-6 w-6 text-red-600" />;
      default: return <Activity className="h-6 w-6 text-gray-600" />;
    }
  };

  const getGIIcon = (level: GILevel) => {
    switch (level) {
      case '低': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case '中': return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      case '高': return <XCircle className="h-6 w-6 text-red-600" />;
      default: return <Activity className="h-6 w-6 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-emerald-800 font-medium">正在分析食物...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">获取结果失败</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <Activity className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">未找到食物信息</h2>
          <p className="text-gray-600 mb-6">无法识别或数据库中没有该食物的信息</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 mb-6"
        >
          <ChevronLeft className="h-5 w-5" />
          返回首页
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-8 text-center">
          食物健康分析结果
        </h1>

        {/* 食物卡片 */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
              <h2 className="text-2xl font-bold">{result.foodName}</h2>
              <p className="text-emerald-100 mt-1">AI 识别结果</p>
            </div>

            <div className="p-6">
              {/* 嘌呤分析 */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  {getPurineIcon(result.嘌呤)}
                  <h3 className="text-lg font-semibold text-gray-900">嘌呤等级</h3>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getPurineColor(result.嘌呤)}`}>
                  <span className="font-semibold">{result.嘌呤}</span>
                  <span className="text-sm opacity-90">{result.嘌呤Description}</span>
                </div>
              </div>

              {/* GI 分析 */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  {getGIIcon(result.gi)}
                  <h3 className="text-lg font-semibold text-gray-900">升糖指数（GI）</h3>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getGIColor(result.gi)}`}>
                  <span className="font-semibold">{result.gi}</span>
                  <span className="text-sm opacity-90">{result.giDescription}</span>
                </div>
              </div>

              {/* 健康风险 */}
              {result.risk && (
                <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-1">健康风险提示</h4>
                      <p className="text-sm text-orange-800">{result.risk}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 替代食物 */}
              {result.alternatives.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">推荐替代食物</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.alternatives.map((alt, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-green-200 text-sm font-medium text-green-800"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/scan"
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              扫描其他食物
            </Link>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-emerald-700 border border-emerald-200 px-6 py-4 rounded-xl font-semibold transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}