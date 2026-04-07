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
            content: '你是一个食物营养专家。请分析图片并直接输出合法的JSON格式结果，不包含任何Markdown格式或多余的文字。'
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              },
              {
                type: 'text',
                text: `请识别图片中的食物，并分析其健康指标。你需要返回以下JSON格式：\n{\n  "foodName": "食物名称（中文）",\n  "嘌呤": "低/中/高",\n  "gi": "低/中/高",\n  "risk": "健康风险提示（简短描述）",\n  "alternatives": ["替代食物1", "替代食物2", "替代食物3"]\n}`
              }
            ]
          }
        ],
        temperature: 0.1, // 调低温度以获得更稳定的JSON格式
        max_tokens: 800
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
      // 提取JSON字符串：使用正则匹配 {} 块以防模型额外输出废话
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const cleanContent = jsonMatch ? jsonMatch[0] : content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
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