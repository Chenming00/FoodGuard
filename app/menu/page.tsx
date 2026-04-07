'use client';

import { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Plus, 
  RefreshCw, 
  Clock, 
  Flame, 
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    purine: '低' | '中' | '高';
    gi: '低' | '中' | '高';
  };
  instructions?: string;
}

interface Menu {
  id: string;
  date: string;
  meals: Meal[];
  ingredientsUsed: string[];
  createdAt: string;
}

export default function MenuPage() {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 加载今日菜单
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const response = await fetch('/api/menu/generate?date=' + new Date().toISOString().split('T')[0]);
      const data = await response.json();
      if (data.success) {
        setMenu(data.data);
      }
    } catch (error) {
      console.error('加载菜单失败:', error);
    }
  };

  // 生成新菜单
  const handleGenerateMenu = async () => {
    setLoading(true);
    setError(null);

    try {
      // 首先获取当前食材列表
      const ingredientsResponse = await fetch('/api/ingredients/list');
      const ingredientsData = await ingredientsResponse.json();
      
      if (!ingredientsData.success || !ingredientsData.data || ingredientsData.data.length === 0) {
        setError('请先添加食材再生成菜单');
        setLoading(false);
        return;
      }

      // 获取食材名称列表
      const ingredientNames = ingredientsData.data.map((ing: any) => ing.name);

      // 调用菜单生成 API
      const response = await fetch('/api/menu/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredientNames })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMenu(data.data);
      } else {
        setError(data.error || '生成菜单失败');
      }
    } catch (error) {
      console.error('生成菜单失败:', error);
      setError('生成菜单失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 获取嘌呤颜色
  const getPurineColor = (level: '低' | '中' | '高') => {
    switch (level) {
      case '低': return 'bg-green-100 text-green-800';
      case '中': return 'bg-yellow-100 text-yellow-800';
      case '高': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取GI颜色
  const getGIColor = (level: '低' | '中' | '高') => {
    switch (level) {
      case '低': return 'bg-green-100 text-green-800';
      case '中': return 'bg-yellow-100 text-yellow-800';
      case '高': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取菜餐名称
  const getMealName = (type: string) => {
    switch (type) {
      case 'breakfast': return '早餐';
      case 'lunch': return '午餐';
      case 'dinner': return '晚餐';
      case 'snack': return '加餐';
      default: return type;
    }
  };

  // 计算总营养
  const getTotalNutrition = () => {
    if (!menu) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    return menu.meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.nutrition.calories,
      protein: acc.protein + meal.nutrition.protein,
      carbs: acc.carbs + meal.nutrition.carbs,
      fat: acc.fat + meal.nutrition.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900">今日菜单</h1>
            <p className="text-emerald-700 mt-1">基于冰箱食材的智能菜单推荐</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/ingredients"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-emerald-700 border border-emerald-200 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              返回食材
            </Link>
            <button
              onClick={handleGenerateMenu}
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <RefreshCw className="h-5 w-5" />
                  生成新菜单
                </>
              )}
            </button>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* 生成菜单按钮（空状态） */}
        {!menu && !error && (
          <div className="text-center mb-12">
            <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="h-12 w-12 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">暂无今日菜单</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              点击"生成新菜单"按钮，系统将根据您的冰箱食材智能推荐健康菜谱
            </p>
            <button
              onClick={handleGenerateMenu}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <ChefHat className="h-6 w-6" />
                  生成今日菜单
                </>
              )}
            </button>
          </div>
        )}

        {/* 菜单展示 */}
        {menu && (
          <>
            {/* 菜单概览 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {menu.date} 的菜单
                  </h2>
                  <p className="text-gray-600 mt-1">
                    使用了 {menu.ingredientsUsed.length} 种食材
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">总营养摄入</div>
                  <div className="text-2xl font-bold text-emerald-700">
                    {getTotalNutrition().calories} kcal
                  </div>
                </div>
              </div>

              {/* 营养统计 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">热量</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    {getTotalNutrition().calories} kcal
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 w-5 rounded-full bg-purple-600" />
                    <span className="text-sm font-medium text-gray-700">蛋白质</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-700">
                    {getTotalNutrition().protein} g
                  </div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 w-5 rounded-full bg-orange-600" />
                    <span className="text-sm font-medium text-gray-700">碳水</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-700">
                    {getTotalNutrition().carbs} g
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 w-5 rounded-full bg-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">脂肪</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {getTotalNutrition().fat} g
                  </div>
                </div>
              </div>
            </div>

            {/* 菜餐列表 */}
            <div className="space-y-6">
              {menu.meals.map((meal, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <ChefHat className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{getMealName(meal.type)}</h3>
                          <p className="text-emerald-100 text-sm">{meal.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-emerald-100 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>约30分钟</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* 菜餐信息 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* 食材 */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-700 text-xs">食材</span>
                          </div>
                          所需食材
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {meal.ingredients.map((ing, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-800"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 健康指标 */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-700 text-xs">健康</span>
                          </div>
                          健康指标
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Flame className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">热量: {meal.nutrition.calories} kcal</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-4 w-4 rounded-full bg-gray-400" />
                            <span className="text-gray-600">蛋白: {meal.nutrition.protein} g</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-4 w-4 rounded-full bg-gray-400" />
                            <span className="text-gray-600">碳水: {meal.nutrition.carbs} g</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-4 w-4 rounded-full bg-gray-400" />
                            <span className="text-gray-600">脂肪: {meal.nutrition.fat} g</span>
                          </div>
                        </div>
                      </div>

                      {/* 嘌呤和GI */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <div className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-700 text-xs">营养</span>
                          </div>
                          嘌呤 & GI
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPurineColor(meal.nutrition.purine)}`}>
                              嘌呤: {meal.nutrition.purine}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGIColor(meal.nutrition.gi)}`}>
                              GI: {meal.nutrition.gi}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 制作步骤 */}
                    {meal.instructions && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <div className="h-5 w-5 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-700 text-xs">步骤</span>
                          </div>
                          制作步骤
                        </h4>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {meal.instructions}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 剩余食材建议 */}
            {menu.suggestions?.remainingIngredients && menu.suggestions.remainingIngredients.length > 0 && (
              <div className="mt-8 bg-emerald-50 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2">剩余食材建议</h3>
                    <p className="text-sm text-emerald-800 mb-3">
                      您还有以下食材未使用，可以考虑在明天的菜单中使用：
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {menu.suggestions.remainingIngredients.map((ing, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-emerald-200 text-sm font-medium text-emerald-800"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}