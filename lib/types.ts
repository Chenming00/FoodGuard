// 食物健康数据类型定义

export type PurineLevel = '低' | '中' | '高';
export type GILevel = '低' | '中' | '高';

export interface FoodItem {
  id: string;
  name: string;
 嘌呤: PurineLevel;
  gi: GILevel;
  risk?: string;
  alternatives: string[];
  createdAt: string;
}

export interface FoodAnalysisResult {
  foodName: string;
 嘌呤: PurineLevel;
 嘌呤Description: string;
  gi: GILevel;
  giDescription: string;
  risk?: string;
  alternatives: string[];
}

export interface RecognizeResponse {
  foodName: string;
  confidence: number;
}

export interface RecommendResponse {
  alternatives: string[];
  suggestions: string;
}

// 上传图片请求
export interface UploadRequest {
  imageBase64: string;
}

// 上传图片响应
export interface UploadResponse {
  success: boolean;
  message?: string;
}