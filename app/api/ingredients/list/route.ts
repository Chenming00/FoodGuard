import { NextRequest, NextResponse } from 'next/server';
import { Ingredient } from '@/lib/types';

// 模拟食材数据库（实际应用中应使用 Supabase 或其他数据库）
let ingredients: Ingredient[] = [];

// 如果有预设数据，可以在这里初始化
const loadIngredients = (): Ingredient[] => {
  return ingredients;
};

const saveIngredients = (data: Ingredient[]) => {
  ingredients = data;
};

// 获取所有食材
export async function GET() {
  try {
    const allIngredients = loadIngredients();
    
    return NextResponse.json({
      success: true,
      data: allIngredients
    });
  } catch (error) {
    console.error('获取食材列表错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 添加食材
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, quantity, unit, expiryDate, category, notes } = body;

    if (!name || !quantity || !unit || !expiryDate || !category) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name,
      quantity,
      unit,
      expiryDate,
      category,
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    const allIngredients = loadIngredients();
    allIngredients.push(newIngredient);
    saveIngredients(allIngredients);

    return NextResponse.json({
      success: true,
      data: newIngredient
    });
  } catch (error) {
    console.error('添加食材错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 删除食材
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: '缺少食材ID' },
        { status: 400 }
      );
    }

    const allIngredients = loadIngredients();
    const filteredIngredients = allIngredients.filter(ing => ing.id !== id);
    
    if (filteredIngredients.length === allIngredients.length) {
      return NextResponse.json(
        { success: false, error: '未找到该食材' },
        { status: 404 }
      );
    }

    saveIngredients(filteredIngredients);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('删除食材错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}