import { NextRequest, NextResponse } from 'next/server';
import { recipes, findRecipesByIngredients, getAllRecipeNames } from '@/lib/menuDatabase';
import { Meal, Menu, NutritionInfo } from '@/lib/types';

// 食材分类映射
const ingredientCategories: Record<string, string[]> = {
  蔬菜: ['西红柿', '西兰花', '黄瓜', '青椒', '茄子', '冬瓜', '土豆', '胡萝卜', '洋葱', '生菜', '青菜', '小番茄', '蒜', '姜', '葱', '干辣椒'],
  水果: ['苹果', '香蕉', '橙子', '葡萄', '草莓'],
  肉类: ['猪肉', '牛肉', '鸡肉', '排骨', '羊肉'],
  海鲜: ['虾仁', '扇贝', '鱼', '虾', '蟹'],
  蛋奶: ['鸡蛋', '牛奶', '奶酪', '酸奶'],
  豆制品: ['豆腐', '豆浆', '豆干', '豆皮'],
  主食: ['大米', '面粉', '面条', '米粉', '粉丝', '面包'],
  调料: ['盐', '酱油', '醋', '油', '糖', '料酒', '香油', '淀粉', '黑胡椒']
};

// 根据食材名称获取分类
const getCategoryByIngredient = (name: string): string => {
  for (const [category, ingredients] of Object.entries(ingredientCategories)) {
    if (ingredients.some(ing => name.includes(ing) || ing.includes(name))) {
      return category;
    }
  }
  return '其他';
};

// 生成菜单
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, dietaryRestrictions } = body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { success: false, error: '请提供至少一个食材' },
        { status: 400 }
      );
    }

    // 获取可用菜谱
    const availableRecipes = findRecipesByIngredients(ingredients);
    
    // 如果没有匹配的菜谱，返回所有菜谱作为备选
    const candidateRecipes = availableRecipes.length > 0 ? availableRecipes : getAllRecipeNames().map(name => recipes.find(r => r.name === name)!).filter(Boolean) as typeof recipes;

    // 生成今日菜单（早餐、午餐、晚餐）
    const today = new Date().toISOString().split('T')[0];
    
    const meals: Meal[] = [];
    const usedIngredients = new Set<string>();

    // 早餐：清淡为主
    const breakfastRecipes = candidateRecipes.filter(r => 
      r.category === '汤类' || r.category === '家常菜' || r.category === '凉菜'
    );
    if (breakfastRecipes.length > 0) {
      const breakfast = breakfastRecipes[Math.floor(Math.random() * breakfastRecipes.length)];
      meals.push({
        type: 'breakfast',
        name: breakfast.name,
        ingredients: breakfast.ingredients.map(i => i.name),
        nutrition: breakfast.nutrition,
        instructions: breakfast.instructions
      });
      breakfast.ingredients.forEach(i => usedIngredients.add(i.name));
    }

    // 午餐：主菜 + 配菜 + 汤
    const lunchMain = candidateRecipes.find(r => 
      r.category === '主菜' || r.category === '家常菜'
    );
    if (lunchMain) {
      meals.push({
        type: 'lunch',
        name: lunchMain.name,
        ingredients: lunchMain.ingredients.map(i => i.name),
        nutrition: lunchMain.nutrition,
        instructions: lunchMain.instructions
      });
      lunchMain.ingredients.forEach(i => usedIngredients.add(i.name));
    }

    // 晚餐：轻食为主
    const dinnerRecipes = candidateRecipes.filter(r => 
      r.category === '汤类' || r.category === '凉菜' || r.category === '沙拉'
    );
    if (dinnerRecipes.length > 0) {
      const dinner = dinnerRecipes[Math.floor(Math.random() * dinnerRecipes.length)];
      meals.push({
        type: 'dinner',
        name: dinner.name,
        ingredients: dinner.ingredients.map(i => i.name),
        nutrition: dinner.nutrition,
        instructions: dinner.instructions
      });
      dinner.ingredients.forEach(i => usedIngredients.add(i.name));
    }

    // 如果没有生成足够的菜单，添加默认选项
    if (meals.length === 0) {
      meals.push({
        type: 'lunch',
        name: '清炒时蔬',
        ingredients: ['西兰花', '蒜', '盐', '橄榄油'],
        nutrition: {
          calories: 100,
          protein: 5,
          carbs: 10,
          fat: 4,
          purine: '低',
          gi: '低'
        }
      });
    }

    const menu: Menu = {
      id: Date.now().toString(),
      date: today,
      meals,
      ingredientsUsed: Array.from(usedIngredients),
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: menu,
      suggestions: {
        remainingIngredients: ingredients.filter(i => !usedIngredients.has(i)),
        recipesCount: candidateRecipes.length
      }
    });
  } catch (error) {
    console.error('生成菜单错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 获取今日菜单
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

    // 这里可以查询数据库获取历史菜单
    // 暂时返回空数据，表示需要生成新菜单
    return NextResponse.json({
      success: true,
      data: null,
      message: '请使用 POST 方法生成新菜单',
      today: date
    });
  } catch (error) {
    console.error('获取菜单错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}