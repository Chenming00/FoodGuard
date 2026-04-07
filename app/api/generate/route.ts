import { NextRequest, NextResponse } from 'next/server';

// 配置 OpenAI API
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
const MODEL_NAME = process.env.MODEL_NAME || 'qwen3.5-plus';

// 检查 API 密钥
if (!OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY 未设置，将使用模拟数据');
}

// 解析 JSON 响应
const parseJsonResponse = (text: string): any => {
  try {
    // 尝试直接解析
    return JSON.parse(text);
  } catch {
    try {
      // 尝试提取 JSON 代码块
      const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // 如果都失败，返回空数组
      return [];
    }
  }
  return [];
};

// 生成菜单 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients } = body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { success: false, error: '请提供至少一个食材' },
        { status: 400 }
      );
    }

    // 如果没有 API 密钥，返回模拟数据
    if (!OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        recipes: [
          {
            name: '西红柿炒鸡蛋',
            ingredients_used: ['西红柿', '鸡蛋', '葱'],
            missing_ingredients: ['油', '盐'],
            steps: [
              '鸡蛋打散，西红柿切块，葱切末',
              '热锅倒油，倒入蛋液炒至凝固盛出',
              '锅中留油，爆香葱末，加入西红柿翻炒至软烂',
              '加入炒好的鸡蛋，调盐，翻炒均匀即可'
            ]
          },
          {
            name: '番茄豆腐汤',
            ingredients_used: ['西红柿', '豆腐', '葱'],
            missing_ingredients: ['盐', '香油'],
            steps: [
              '西红柿切块，豆腐切块，葱切末',
              '锅中加少许油，爆香葱末，加入西红柿翻炒出汁',
              '加入适量清水，煮开后加入豆腐块',
              '煮2分钟，调盐和香油即可'
            ]
          }
        ]
      });
    }

    // 构建 Prompt
    const prompt = `你是一个专业厨师，请根据以下食材生成3-5道菜：

食材：${ingredients.join(', ')}

要求：
1. 尽量使用已有食材
2. 标出缺少的食材
3. 给出简单做法（3-5步）
4. 适合家庭制作
5. 返回 JSON

格式：
[
{
"name": "",
"ingredients_used": [],
"missing_ingredients": [],
"steps": []
}]`;

    // 调用 OpenAI API
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'system',
            content: '你是一个专业厨师，擅长根据现有食材推荐菜谱。请严格按照要求返回 JSON 格式。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI API 错误:', data);
      return NextResponse.json(
        { success: false, error: data.error?.message || '生成失败' },
        { status: response.status }
      );
    }

    const content = data.choices?.[0]?.message?.content || '';
    const recipes = parseJsonResponse(content);

    // 如果解析失败，返回模拟数据
    if (!Array.isArray(recipes) || recipes.length === 0) {
      console.warn('解析 JSON 失败，返回模拟数据');
      return NextResponse.json({
        success: true,
        recipes: [
          {
            name: '西红柿炒鸡蛋',
            ingredients_used: ['西红柿', '鸡蛋', '葱'],
            missing_ingredients: ['油', '盐'],
            steps: [
              '鸡蛋打散，西红柿切块，葱切末',
              '热锅倒油，倒入蛋液炒至凝固盛出',
              '锅中留油，爆香葱末，加入西红柿翻炒至软烂',
              '加入炒好的鸡蛋，调盐，翻炒均匀即可'
            ]
          }
        ]
      });
    }

    return NextResponse.json({
      success: true,
      recipes
    });
  } catch (error) {
    console.error('生成菜单错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}

// GET 请求 - 返回说明
export async function GET() {
  return NextResponse.json({
    message: 'FridgeChef AI - 智能菜单生成 API',
    usage: 'POST /api/generate with body: { ingredients: ["鸡蛋", "西红柿"] }'
  });
}