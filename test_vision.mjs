import https from 'https';

https.get('https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg', (res) => {
  const data = [];
  res.on('data', (chunk) => data.push(chunk));
  res.on('end', () => {
    const base64 = 'data:image/jpeg;base64,' + Buffer.concat(data).toString('base64');
    fetch('https://coding.dashscope.aliyuncs.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-sp-ff32a349bc874aa98040815d852d801c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen3.5-plus',
        messages: [
          {
            role: 'system',
            content: '你是一个食物识别和健康分析专家。请分析上传的图片，识别出食物的名称，并分析其健康指标。\n\n请返回以下信息：\n1. foodName: 食物名称（中文）\n2. 嘌呤: 嘌呤含量等级（低/中/高）\n3. gi: 升糖指数（低/中/高）\n4. risk: 健康风险提示（简短描述）\n5. alternatives: 推荐的替代食物（3-5个）\n\n返回格式：{"foodName": "xxx", "嘌呤": "低/中/高", "gi": "低/中/高", "risk": "xxx", "alternatives": ["xxx", "xxx", "xxx"]}'
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: base64 }
              }
            ]
          }
        ]
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(console.error);
  });
});
