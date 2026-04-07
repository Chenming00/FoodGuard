// 食材类型定义
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  notes?: string;
  createdAt: string;
}

// 营养信息
export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  purine: '低' | '中' | '高';
  gi: '低' | '中' | '高';
}

// 菜餐类型
export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  ingredients: string[];
  nutrition: NutritionInfo;
  instructions?: string;
}

// 菜单类型
export interface Menu {
  id: string;
  date: string;
  meals: Meal[];
  ingredientsUsed: string[];
  suggestions?: {
    remainingIngredients: string[];
    recipesCount: number;
  };
  createdAt: string;
}

// 菜谱类型
export interface Recipe {
  id: string;
  name: string;
  category: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string;
  nutrition: NutritionInfo;
  prepTime: number; // 分钟
  servings: number;
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 食材添加请求
export interface AddIngredientRequest {
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  notes?: string;
}

// 菜单生成请求
export interface GenerateMenuRequest {
  ingredients: string[];
  dietaryRestrictions?: string[];
}