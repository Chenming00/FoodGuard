'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Camera, Image as ImageIcon, Loader2, Activity, AlertCircle, CheckCircle, ChevronLeft, XCircle, RefreshCw } from 'lucide-react';
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

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FoodResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理图片选择
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // 处理拖拽上传
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      
      const file = event.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        processFile(file);
      } else {
        setError('请上传图片文件');
      }
    },
    []
  );

  // 处理文件
  const processFile = (file: File) => {
    setError(null);
    setResult(null);
    
    if (!file.type.startsWith('image/')) {
      setError('请上传有效的图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(file);
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 移除图片
  const removeImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setError(null);
  };

  // 重新扫描
  const handleReset = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setError(null);
  };

  // 上传图片
  const handleUpload = async () => {
    if (!selectedImage || !previewImage) return;

    setIsUploading(true);
    setError(null);
    setResult(null);

    try {
      // 直接使用 FileReader 生成的 previewImage (已经是含完整前缀的 Base64)
      const base64WithPrefix = previewImage;

      // 这里调用识别 API
      const apiResponse = await fetch('/api/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: base64WithPrefix }),
      });

      const apiResult = await apiResponse.json();
      
      if (!apiResponse.ok) {
        throw new Error(apiResult.error || '识别失败，请重试');
      }

      // 检查是否有必要的字段
      if (!apiResult.foodName) {
        throw new Error('未能识别食物名称');
      }

      // 构建结果对象
      const foodResult: FoodResult = {
        foodName: apiResult.foodName,
        嘌呤: apiResult.嘌呤 || '中',
        嘌呤Description: getPurineDescription(apiResult.嘌呤 || '中'),
        gi: apiResult.gi || '中',
        giDescription: getGIDescription(apiResult.gi || '中'),
        risk: apiResult.risk || '无特殊风险',
        alternatives: apiResult.alternatives || [],
      };

      setResult(foodResult);

    } catch (err) {
      setError(err instanceof Error ? err.message : '上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  // 获取嘌呤描述
  const getPurineDescription = (level: PurineLevel): string => {
    switch (level) {
      case '低':
        return '嘌呤含量较低，适合痛风和高尿酸血症患者食用';
      case '中':
        return '嘌呤含量适中，建议适量食用';
      case '高':
        return '嘌呤含量较高，痛风和高尿酸血症患者应避免食用';
      default:
        return '嘌呤含量未知';
    }
  };

  // 获取 GI 描述
  const getGIDescription = (level: GILevel): string => {
    switch (level) {
      case '低':
        return '升糖指数较低，血糖平稳上升，适合糖尿病患者';
      case '中':
        return '升糖指数适中，建议控制摄入量';
      case '高':
        return '升糖指数较高，血糖快速上升，糖尿病患者应避免食用';
      default:
        return '升糖指数未知';
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

  if (result) {
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
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                扫描其他食物
              </button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 mb-6"
        >
          <X className="h-5 w-5" />
          返回首页
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-8 text-center">
          上传食物图片
        </h1>

        <div className="max-w-2xl mx-auto">
          {/* 上传区域 */}
          <div
            className={`relative border-4 border-dashed rounded-2xl p-8 transition-all ${
              previewImage
                ? 'border-emerald-300 bg-emerald-50/50'
                : 'border-emerald-400 hover:border-emerald-600 hover:bg-emerald-50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="预览"
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  {selectedImage ? (
                    <ImageIcon className="h-10 w-10 text-emerald-600" />
                  ) : (
                    <Upload className="h-10 w-10 text-emerald-600" />
                  )}
                </div>
                <p className="text-lg font-medium text-emerald-800 mb-2">
                  {selectedImage ? '点击移除图片' : '拖拽图片或点击上传'}
                </p>
                <p className="text-sm text-gray-500">支持 JPG、PNG、WEBP 格式，最大 5MB</p>
              </div>
            )}
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <X className="h-5 w-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* 上传按钮 */}
          {previewImage && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                isUploading
                  ? 'bg-emerald-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30'
              } text-white`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  正在识别...
                </>
              ) : (
                <>
                  <Camera className="h-6 w-6" />
                  开始识别
                </>
              )}
            </button>
          )}

          {/* 提示 */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-emerald-900 mb-3">使用提示</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-700 font-bold text-xs">1</span>
                </div>
                <span>确保食物在图片中清晰可见</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-700 font-bold text-xs">2</span>
                </div>
                <span>背景尽量简洁，避免杂乱</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-700 font-bold text-xs">3</span>
                </div>
                <span>光线充足，避免阴影遮挡食物</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}