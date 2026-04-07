'use client';

import { useState } from 'react';
import { ChefHat, Loader2, Plus, X } from 'lucide-react';

interface Recipe {
  name: string;
  ingredients_used: string[];
  missing_ingredients: string[];
  steps: string[];
}

export default function HomePage() {
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 解析食材输入（支持中英文逗号）
  const parseIngredients = (input: string): string[] => {
    return input
      .split(/[,，]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  // 生成菜单
  const handleGenerate = async () => {
    const ingredients = parseIngredients(ingredientsInput);
    
    if (ingredients.length === 0) {
      setError('请输入至少一个食材');
      return;
    }

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成失败，请重试');
      }

      if (Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
      } else {
        throw new Error('返回格式错误');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 移除食材
  const removeIngredient = (index: number) => {
    const ingredients = parseIngredients(ingredientsInput);
    ingredients.splice(index, 1);
    setIngredientsInput(ingredients.join(', '));
  };

  // 显示已输入的食材标签
  const renderIngredientTags = () => {
    const ingredients = parseIngredients(ingredientsInput);
    return ingredients.map((ingredient, index) => (
      <span
        key={index}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium"
      >
        {ingredient}
        <button
          onClick={() => removeIngredient(index)}
          className="hover:text-emerald-600"
        >
          <X className="h-4 w-4" />
        </button>
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* 导航栏 */}
      <nav className="border-b border-emerald-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-emerald-900">FridgeChef AI</span>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              冰箱里的智能厨师
            </h1>
            <p className="text-lg text-emerald-700">
              输入你有的食材，AI 为你生成美味菜谱
            </p>
          </div>

          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              输入你的食材（用逗号分隔）
            </label>
            
            <textarea
              value={ingredientsInput}
              onChange={(e) => setIngredientsInput(e.target.value)}
              placeholder="例如：鸡蛋, 西红柿, 豆腐, 青椒"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[100px] resize-y"
            />
            
            {/* 已输入的食材标签 */}
            {parseIngredients(ingredientsInput).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {renderIngredientTags()}
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <X className="h-5 w-5 text-red-600" />
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={loading || parseIngredients(ingredientsInput).length === 0}
              className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                loading || parseIngredients(ingredientsInput).length === 0
                  ? 'bg-emerald-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30'
              } text-white`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  正在生成菜单...
                </>
              ) : (
                <>
                  <ChefHat className="h-6 w-6" />
                  生成菜单
                </>
              )}
            </button>
          </div>

          {/* 结果展示 */}
          {recipes.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-emerald-900">
                为您推荐 {recipes.length} 道菜
              </h2>
              
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* 菜名 */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                    <h3 className="text-2xl font-bold">{recipe.name}</h3>
                  </div>

                  {/* 菜单内容 */}
                  <div className="p-6">
                    {/* 使用的食材 */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                        <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-700 text-xs">✓</span>
                        </div>
                        使用的食材
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.ingredients_used.map((ing, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-800"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 缺少的食材 */}
                    {recipe.missing_ingredients.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                          <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-700 text-xs">!</span>
                          </div>
                          缺少的食材
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {recipe.missing_ingredients.map((ing, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-200 text-sm font-medium text-red-800"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 制作步骤 */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <div className="h-5 w-5 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-700 text-xs">📝</span>
                        </div>
                        制作步骤
                      </h4>
                      <ol className="space-y-2">
                        {recipe.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">
                              {i + 1}
                            </span>
                            <span className="flex-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 提示 */}
          <div className="mt-12 bg-emerald-50 rounded-2xl p-6 text-center">
            <h3 className="font-semibold text-emerald-900 mb-2">使用提示</h3>
            <p className="text-sm text-emerald-700">
              输入您冰箱里现有的食材，AI 将为您推荐最适合的菜谱。支持中英文逗号分隔，例如：
              <code className="bg-emerald-100 px-2 py-1 rounded mx-1">鸡蛋, 西红柿</code>
              或
              <code className="bg-emerald-100 px-2 py-1 rounded mx-1">egg, tomato</code>
            </p>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-emerald-200 bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-emerald-800">
          <p className="text-sm">© 2026 FridgeChef AI - 您的智能厨房助手</p>
        </div>
      </footer>
    </div>
  );
}