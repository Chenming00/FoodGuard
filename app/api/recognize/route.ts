import { NextRequest, NextResponse } from 'next/server';

// 食物识别和分析 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: '缺少图片数据' },
        { status: 400 }
      );
    }

    // 验证图片格式（简单检查）
    if (!imageBase64.startsWith('data:image')) {
      return NextResponse.json(
        { error: '无效的图片格式' },
        { status: 400 }
      );
    }

    // 检查 API Key 配置
    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || 'https://coding.dashscope.aliyuncs.com/v1';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key 未配置，请设置 OPENAI_API_KEY 环境变量' },
        { status: 500 }
      );
    }

    console.log('开始识别，API Key:', apiKey.substring(0, 10) + '...');
    console.log('Base URL:', baseUrl);
    console.log('图片 Base64 长度:', imageBase64.length);

    // 构建请求 - 让 AI 直接返回完整的分析结果
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen3.5-plus',
        messages: [
          {
            role: 'system',
            content: `你是一个食物识别和健康分析专家。请分析上传的图片，识别出食物的名称，并分析其健康指标。

请返回以下信息：
1. foodName: 食物名称（中文）
2. 嘌呤: 嘌呤含量等级（低/中/高）
3. gi: 升糖指数（低/中/高）
4. risk: 健康风险提示（简短描述）
5. alternatives: 推荐的替代食物（3-5个）

返回格式：{"foodName": "xxx", "嘌呤": "低/中/高", "gi": "低/中/高", "risk": "xxx", "alternatives": ["xxx", "xxx", "xxx"]}`
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    console.log('API 响应状态:', response.status);
    console.log('API 响应状态文本:', response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Qwen API error 详细信息:', JSON.stringify(errorData, null, 2));
      console.error('Qwen API error 原始响应:', await response.text());
      return NextResponse.json(
        { 
          error: `识别失败: ${errorData.message || errorData.error?.message || '请重试'}`,
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('识别成功，响应数据:', JSON.stringify(data, null, 2));
    
    // 解析响应
    const content = data.choices?.[0]?.message?.content || '';
    console.log('识别结果内容:', content);
    
    // 尝试解析 JSON
    let result: {
      foodName: string;
      嘌呤: '低' | '中' | '高';
      gi: '低' | '中' | '高';
      risk?: string;
      alternatives: string[];
    } = {
      foodName: '未知食物',
      嘌呤: '中',
      gi: '中',
      risk: '无特殊风险',
      alternatives: []
    };
    
    try {
      // 清理可能的 Markdown 格式
      const cleanContent = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(cleanContent);
      result = {
        foodName: parsed.foodName || '未知食物',
        嘌呤: parsed.嘌呤 || '中',
        gi: parsed.gi || '中',
        risk: parsed.risk || '无特殊风险',
        alternatives: Array.isArray(parsed.alternatives) ? parsed.alternatives : []
      };
    } catch (e) {
      console.error('JSON 解析失败:', e);
      // 如果不是 JSON 格式，尝试提取关键信息
      const foodNameMatch = content.match(/"foodName"\s*:\s*"([^"]+)"/);
      if (foodNameMatch) {
        result.foodName = foodNameMatch[1];
      }
    }

    console.log('解析后的结果:', result);
    
    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('识别 API 错误详细信息:', error);
    return NextResponse.json(
      { error: `服务器错误: ${error instanceof Error ? error.message : '请重试'}` },
      { status: 500 }
    );
  }
}