import { NextRequest, NextResponse } from 'next/server';
import { sampleFoods, findFoodByName } from '@/lib/foodDatabase';

// 食物推荐 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { foodName, type } = body; // type: 'low-purine' 或 'low-gi'

    if (!foodName) {
      return NextResponse.json(
        { error: '缺少食物名称参数' },
        { status: 400 }
      );
    }

    // 查找当前食物
    const currentFood = findFoodByName(foodName);
    
    if (!currentFood) {
      return NextResponse.json(
        { error: '未找到该食物的健康数据' },
        { status: 404 }
      );
    }

    // 根据类型推荐替代食物
    let alternatives: string[] = [];

    if (type === 'low-purine' && currentFood.嘌呤 === '高') {
      // 推荐低嘌呤食物
      alternatives = sampleFoods
        .filter((food) => food.嘌呤 === '低')
        .map((food) => food.name);
    } else if (type === 'low-gi' && currentFood.gi === '高') {
      // 推荐低 GI 食物
      alternatives = sampleFoods
        .filter((food) => food.gi === '低')
        .map((food) => food.name);
    } else {
      // 默认返回当前食物的替代建议
      alternatives = currentFood.alternatives || [];
    }

    // 构建响应
    const result = {
      foodName: foodName,
      type: type || 'default',
      alternatives: alternatives.slice(0, 10), // 限制返回数量
      suggestions: getSuggestions(currentFood, type),
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('推荐 API 错误:', error);
    return NextResponse.json(
      { error: '服务器错误，请重试' },
      { status: 500 }
    );
  }
}

// 获取建议文本
function getSuggestions(food: any, type?: string): string {
  if (type === 'low-purine') {
    return `您当前食用的食物嘌呤含量较高，建议选择以下低嘌呤食物替代，有助于控制尿酸水平`;
  } else if (type === 'low-gi') {
    return `您当前食用的食物升糖指数较高，建议选择以下低 GI 食物替代，有助于控制血糖`;
  } else {
    return `根据您的健康需求，以下是一些健康的替代食物建议`;
  }
}