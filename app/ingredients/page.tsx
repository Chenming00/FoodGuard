'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Box, 
  AlertCircle, 
  CheckCircle,
  ChefHat,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  createdAt: string;
}

const categories = [
  { value: '蔬菜', label: '蔬菜', color: 'bg-green-100 text-green-800' },
  { value: '水果', label: '水果', color: 'bg-red-100 text-red-800' },
  { value: '肉类', label: '肉类', color: 'bg-rose-100 text-rose-800' },
  { value: '海鲜', label: '海鲜', color: 'bg-cyan-100 text-cyan-800' },
  { value: '蛋奶', label: '蛋奶', color: 'bg-yellow-100 text-yellow-800' },
  { value: '豆制品', label: '豆制品', color: 'bg-gray-100 text-gray-800' },
  { value: '主食', label: '主食', color: 'bg-orange-100 text-orange-800' },
  { value: '调料', label: '调料', color: 'bg-purple-100 text-purple-800' },
];

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: 1,
    unit: '个',
    expiryDate: '',
    category: '蔬菜',
    notes: ''
  });

  // 加载食材列表
  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('/api/ingredients/list');
      const data = await response.json();
      if (data.success) {
        setIngredients(data.data);
      }
    } catch (error) {
      console.error('加载食材失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 添加食材
  const handleAddIngredient = async () => {
    if (!newIngredient.name || !newIngredient.expiryDate) {
      alert('请填写必要信息');
      return;
    }

    try {
      const response = await fetch('/api/ingredients/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIngredient)
      });
      const data = await response.json();
      
      if (data.success) {
        setIngredients(prev => [...prev, data.data]);
        setShowAddModal(false);
        setNewIngredient({
          name: '',
          quantity: 1,
          unit: '个',
          expiryDate: '',
          category: '蔬菜',
          notes: ''
        });
      }
    } catch (error) {
      console.error('添加食材失败:', error);
      alert('添加失败，请重试');
    }
  };

  // 删除食材
  const handleDeleteIngredient = async (id: string) => {
    if (!confirm('确定要删除这个食材吗？')) return;

    try {
      const response = await fetch('/api/ingredients/list', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      
      if (data.success) {
        setIngredients(prev => prev.filter(ing => ing.id !== id));
      }
    } catch (error) {
      console.error('删除食材失败:', error);
      alert('删除失败，请重试');
    }
  };

  // 检查过期食材
  const getExpiryStatus = (date: string) => {
    const expiry = new Date(date);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'expired', label: '已过期', color: 'bg-red-100 text-red-800' };
    if (diffDays <= 3) return { status: 'warning', label: '即将过期', color: 'bg-orange-100 text-orange-800' };
    return { status: 'fresh', label: '新鲜', color: 'bg-green-100 text-green-800' };
  };

  // 统计食材数量
  const getStats = () => {
    const total = ingredients.length;
    const expired = ingredients.filter(ing => getExpiryStatus(ing.expiryDate).status === 'expired').length;
    const warning = ingredients.filter(ing => getExpiryStatus(ing.expiryDate).status === 'warning').length;
    return { total, expired, warning };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-800 font-medium">加载中...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900">冰箱食材管理</h1>
            <p className="text-emerald-700 mt-1">管理您的食材，生成健康菜单</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Plus className="h-5 w-5" />
            添加食材
          </button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Box className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总食材数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">新鲜食材</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total - stats.expired - stats.warning}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">即将过期</p>
                <p className="text-2xl font-bold text-gray-900">{stats.warning}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 生成菜单按钮 */}
        <div className="mb-8">
          <Link
            href="/menu"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-xl hover:scale-105 w-full md:w-auto"
          >
            <ChefHat className="h-6 w-6" />
            生成今日菜单
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* 食材列表 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">食材列表</h2>
          </div>
          
          {ingredients.length === 0 ? (
            <div className="p-12 text-center">
              <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Box className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无食材</h3>
              <p className="text-gray-600 mb-6">点击"添加食材"按钮开始管理您的冰箱</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                立即添加食材
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">食材名称</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">数量</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">分类</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">保质期</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">状态</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ingredients.map((ing) => {
                    const expiryStatus = getExpiryStatus(ing.expiryDate);
                    const category = categories.find(c => c.value === ing.category);
                    
                    return (
                      <tr key={ing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{ing.name}</div>
                          {ing.notes && (
                            <div className="text-xs text-gray-500 mt-1">{ing.notes}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {ing.quantity} {ing.unit}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category?.color || 'bg-gray-100 text-gray-800'}`}>
                            {category?.label || ing.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {ing.expiryDate}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${expiryStatus.color}`}>
                            {expiryStatus.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteIngredient(ing.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 添加食材弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">添加食材</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">食材名称</label>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  placeholder="例如：西红柿"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">数量</label>
                  <input
                    type="number"
                    value={newIngredient.quantity}
                    onChange={(e) => setNewIngredient({ ...newIngredient, quantity: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">单位</label>
                  <select
                    value={newIngredient.unit}
                    onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="个">个</option>
                    <option value="g">克</option>
                    <option value="kg">千克</option>
                    <option value="ml">毫升</option>
                    <option value="L">升</option>
                    <option value="把">把</option>
                    <option value="片">片</option>
                    <option value="段">段</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setNewIngredient({ ...newIngredient, category: cat.value })}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                        newIngredient.category === cat.value
                          ? cat.color
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">保质期</label>
                <input
                  type="date"
                  value={newIngredient.expiryDate}
                  onChange={(e) => setNewIngredient({ ...newIngredient, expiryDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                <textarea
                  value={newIngredient.notes}
                  onChange={(e) => setNewIngredient({ ...newIngredient, notes: e.target.value })}
                  placeholder="可选：添加备注信息"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                取消
              </button>
              <button
                onClick={handleAddIngredient}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}