import { NextRequest, NextResponse } from 'next/server';

// 食物分析 API - 直接返回识别结果，不再查询数据库
// Mark as dynamic to allow using request.url
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const foodName = searchParams.get('food');

    if (!foodName) {
      return NextResponse.json(
        { error: '缺少食物名称参数' },
        { status: 400 }
      );
    }

    // 直接返回食物名称和默认分析结果
    // 实际的分析结果已经在识别阶段由 AI 返回
    const result = {
      foodName: foodName,
      嘌呤: '中',
      嘌呤Description: '嘌呤含量适中，建议适量食用',
      gi: '中',
      giDescription: '升糖指数适中，建议控制摄入量',
      risk: '请参考识别时的详细分析结果',
      alternatives: [],
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('分析 API 错误:', error);
    return NextResponse.json(
      { error: '服务器错误，请重试' },
      { status: 500 }
    );
  }
}