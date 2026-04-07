import { Recipe } from './types';

// 菜谱数据库 - 包含常见家常菜
export const recipes: Recipe[] = [
  {
    id: '1',
    name: '西红柿炒鸡蛋',
    category: '家常菜',
    ingredients: [
      { name: '西红柿', quantity: '2个' },
      { name: '鸡蛋', quantity: '3个' },
      { name: '葱', quantity: '适量' },
      { name: '盐', quantity: '适量' },
      { name: '油', quantity: '适量' }
    ],
    instructions: '1. 鸡蛋打散，加少许盐；西红柿切块；葱切末\n2. 热锅倒油，倒入蛋液炒至凝固盛出\n3. 锅中留油，爆香葱末，加入西红柿翻炒至软烂\n4. 加入炒好的鸡蛋，调盐，翻炒均匀即可',
    nutrition: {
      calories: 220,
      protein: 12,
      carbs: 10,
      fat: 15,
      purine: '低',
      gi: '低'
    },
    prepTime: 15,
    servings: 2
  },
  {
    id: '2',
    name: '清炒西兰花',
    category: '家常菜',
    ingredients: [
      { name: '西兰花', quantity: '300g' },
      { name: '蒜', quantity: '3瓣' },
      { name: '盐', quantity: '适量' },
      { name: '橄榄油', quantity: '适量' }
    ],
    instructions: '1. 西兰花切小朵，用盐水浸泡10分钟\n2. 锅中水烧开，加少许盐和油，焯水1分钟捞出\n3. 热锅倒油，爆香蒜末\n4. 加入西兰花翻炒，调盐，炒匀即可',
    nutrition: {
      calories: 120,
      protein: 8,
      carbs: 15,
      fat: 5,
      purine: '低',
      gi: '低'
    },
    prepTime: 20,
    servings: 2
  },
  {
    id: '3',
    name: '青椒炒肉丝',
    category: '家常菜',
    ingredients: [
      { name: '猪肉', quantity: '200g' },
      { name: '青椒', quantity: '2个' },
      { name: '姜', quantity: '适量' },
      { name: '酱油', quantity: '适量' },
      { name: '淀粉', quantity: '适量' }
    ],
    instructions: '1. 猪肉切丝，用酱油和淀粉腌制10分钟；青椒切丝；姜切丝\n2. 热锅倒油，爆香姜丝，加入肉丝翻炒至变色\n3. 加入青椒丝翻炒至断生\n4. 调盐，炒匀即可',
    nutrition: {
      calories: 280,
      protein: 18,
      carbs: 8,
      fat: 18,
      purine: '中',
      gi: '低'
    },
    prepTime: 25,
    servings: 3
  },
  {
    id: '4',
    name: '番茄豆腐汤',
    category: '汤类',
    ingredients: [
      { name: '西红柿', quantity: '2个' },
      { name: '嫩豆腐', quantity: '200g' },
      { name: '葱', quantity: '适量' },
      { name: '盐', quantity: '适量' },
      { name: '香油', quantity: '少许' }
    ],
    instructions: '1. 西红柿切块；豆腐切块；葱切末\n2. 锅中加少许油，爆香葱末，加入西红柿翻炒出汁\n3. 加入适量清水，煮开后加入豆腐块\n4. 煮2分钟，调盐和香油即可',
    nutrition: {
      calories: 90,
      protein: 8,
      carbs: 8,
      fat: 4,
      purine: '低',
      gi: '低'
    },
    prepTime: 15,
    servings: 2
  },
  {
    id: '5',
    name: '蒸鸡蛋羹',
    category: '汤类',
    ingredients: [
      { name: '鸡蛋', quantity: '2个' },
      { name: '温水', quantity: '200ml' },
      { name: '盐', quantity: '适量' },
      { name: '香油', quantity: '少许' },
      { name: '酱油', quantity: '少许' }
    ],
    instructions: '1. 鸡蛋打散，加入温水和盐搅拌均匀\n2. 过筛1-2次，去除气泡\n3. 盖上保鲜膜或盘子，放入蒸锅\n4. 水开后蒸10-12分钟，关火焖2分钟\n5. 出锅后淋少许香油和酱油',
    nutrition: {
      calories: 150,
      protein: 10,
      carbs: 5,
      fat: 8,
      purine: '中',
      gi: '低'
    },
    prepTime: 15,
    servings: 2
  },
  {
    id: '6',
    name: '凉拌黄瓜',
    category: '凉菜',
    ingredients: [
      { name: '黄瓜', quantity: '2根' },
      { name: '蒜', quantity: '3瓣' },
      { name: '醋', quantity: '适量' },
      { name: '盐', quantity: '适量' },
      { name: '香油', quantity: '少许' }
    ],
    instructions: '1. 黄瓜洗净拍松切段\n2. 蒜切末，与黄瓜混合\n3. 加盐、醋、香油调味\n4. 拌匀即可',
    nutrition: {
      calories: 50,
      protein: 2,
      carbs: 8,
      fat: 1,
      purine: '低',
      gi: '低'
    },
    prepTime: 10,
    servings: 2
  },
  {
    id: '7',
    name: '土豆炖牛肉',
    category: '主菜',
    ingredients: [
      { name: '牛肉', quantity: '300g' },
      { name: '土豆', quantity: '2个' },
      { name: '胡萝卜', quantity: '1根' },
      { name: '洋葱', quantity: '半个' },
      { name: '酱油', quantity: '适量' },
      { name: '料酒', quantity: '适量' }
    ],
    instructions: '1. 牛肉切块焯水；土豆、胡萝卜切块；洋葱切块\n2. 热锅倒油，炒香洋葱，加入牛肉翻炒\n3. 加入酱油、料酒和适量清水，炖煮40分钟\n4. 加入土豆和胡萝卜，再炖20分钟至软烂',
    nutrition: {
      calories: 350,
      protein: 25,
      carbs: 25,
      fat: 15,
      purine: '中',
      gi: '中'
    },
    prepTime: 90,
    servings: 4
  },
  {
    id: '8',
    name: '蒜蓉粉丝蒸扇贝',
    category: '海鲜',
    ingredients: [
      { name: '扇贝', quantity: '6个' },
      { name: '粉丝', quantity: '1把' },
      { name: '蒜', quantity: '1头' },
      { name: '酱油', quantity: '适量' },
      { name: '料酒', quantity: '适量' }
    ],
    instructions: '1. 粉丝用温水泡软；扇贝洗净；蒜切末\n2. 扇贝对半切，保留壳，摆盘\n3. 粉丝剪段铺在扇贝上，撒蒜末\n4. 淋酱油和料酒，蒸锅水开后蒸8分钟\n5. 出锅后淋热油即可',
    nutrition: {
      calories: 180,
      protein: 15,
      carbs: 12,
      fat: 6,
      purine: '中',
      gi: '低'
    },
    prepTime: 25,
    servings: 3
  },
  {
    id: '9',
    name: '鸡肉蔬菜沙拉',
    category: '沙拉',
    ingredients: [
      { name: '鸡胸肉', quantity: '200g' },
      { name: '生菜', quantity: '适量' },
      { name: '黄瓜', quantity: '1根' },
      { name: '小番茄', quantity: '10个' },
      { name: '橄榄油', quantity: '适量' },
      { name: '黑胡椒', quantity: '适量' }
    ],
    instructions: '1. 鸡胸肉煮熟撕丝；生菜撕片；黄瓜切片；小番茄对半切\n2. 所有食材混合\n3. 加橄榄油、黑胡椒调味即可',
    nutrition: {
      calories: 220,
      protein: 28,
      carbs: 10,
      fat: 8,
      purine: '低',
      gi: '低'
    },
    prepTime: 20,
    servings: 2
  },
  {
    id: '10',
    name: '虾仁炒蛋',
    category: '家常菜',
    ingredients: [
      { name: '虾仁', quantity: '200g' },
      { name: '鸡蛋', quantity: '3个' },
      { name: '葱', quantity: '适量' },
      { name: '盐', quantity: '适量' }
    ],
    instructions: '1. 虾仁解冻，用盐和料酒腌制5分钟；鸡蛋打散；葱切末\n2. 热锅倒油，倒入蛋液炒至凝固盛出\n3. 锅中留油，爆香葱末，加入虾仁翻炒至变色\n4. 加入炒好的鸡蛋，调盐，翻炒均匀即可',
    nutrition: {
      calories: 250,
      protein: 20,
      carbs: 5,
      fat: 15,
      purine: '中',
      gi: '低'
    },
    prepTime: 20,
    servings: 2
  },
  {
    id: '11',
    name: '紫菜蛋花汤',
    category: '汤类',
    ingredients: [
      { name: '紫菜', quantity: '适量' },
      { name: '鸡蛋', quantity: '2个' },
      { name: '葱', quantity: '适量' },
      { name: '盐', quantity: '适量' },
      { name: '香油', quantity: '少许' }
    ],
    instructions: '1. 紫菜撕小块；鸡蛋打散；葱切末\n2. 锅中加水烧开，加入紫菜煮1分钟\n3. 淋入蛋液，用筷子轻轻搅拌形成蛋花\n4. 加盐和香油，撒葱末即可',
    nutrition: {
      calories: 60,
      protein: 6,
      carbs: 4,
      fat: 2,
      purine: '中',
      gi: '低'
    },
    prepTime: 10,
    servings: 2
  },
  {
    id: '12',
    name: '红烧茄子',
    category: '家常菜',
    ingredients: [
      { name: '茄子', quantity: '2个' },
      { name: '蒜', quantity: '4瓣' },
      { name: '酱油', quantity: '适量' },
      { name: '糖', quantity: '少许' },
      { name: '淀粉', quantity: '适量' }
    ],
    instructions: '1. 茄子切块，用盐水浸泡5分钟，沥干\n2. 茄子裹薄淀粉，热油煎至金黄\n3. 锅中留少许油，爆香蒜末，加入茄子\n4. 加酱油、糖和少许水，焖煮2分钟即可',
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 20,
      fat: 8,
      purine: '低',
      gi: '中'
    },
    prepTime: 25,
    servings: 3
  },
  {
    id: '13',
    name: '酸辣土豆丝',
    category: '家常菜',
    ingredients: [
      { name: '土豆', quantity: '2个' },
      { name: '干辣椒', quantity: '适量' },
      { name: '醋', quantity: '适量' },
      { name: '盐', quantity: '适量' }
    ],
    instructions: '1. 土豆切丝，用清水冲洗掉淀粉，沥干\n2. 干辣椒剪段；蒜切末\n3. 热锅倒油，爆香干辣椒和蒜末\n4. 加入土豆丝大火翻炒，淋醋，调盐，炒匀即可',
    nutrition: {
      calories: 150,
      protein: 3,
      carbs: 25,
      fat: 4,
      purine: '低',
      gi: '中'
    },
    prepTime: 20,
    servings: 3
  },
  {
    id: '14',
    name: '冬瓜排骨汤',
    category: '汤类',
    ingredients: [
      { name: '排骨', quantity: '300g' },
      { name: '冬瓜', quantity: '500g' },
      { name: '姜', quantity: '3片' },
      { name: '盐', quantity: '适量' }
    ],
    instructions: '1. 排骨焯水；冬瓜去皮切块；姜切片\n2. 排骨、姜片放入锅中，加足量清水\n3. 大火煮开后转小火炖40分钟\n4. 加入冬瓜块，再炖15分钟，调盐即可',
    nutrition: {
      calories: 180,
      protein: 15,
      carbs: 8,
      fat: 10,
      purine: '中',
      gi: '低'
    },
    prepTime: 60,
    servings: 4
  },
  {
    id: '15',
    name: '青菜豆腐汤',
    category: '汤类',
    ingredients: [
      { name: '嫩豆腐', quantity: '200g' },
      { name: '青菜', quantity: '200g' },
      { name: '姜', quantity: '2片' },
      { name: '盐', quantity: '适量' }
    ],
    instructions: '1. 豆腐切块；青菜洗净；姜切片\n2. 锅中加水，放入姜片煮开\n3. 加入豆腐煮2分钟\n4. 加入青菜煮1分钟，调盐即可',
    nutrition: {
      calories: 80,
      protein: 8,
      carbs: 6,
      fat: 3,
      purine: '低',
      gi: '低'
    },
    prepTime: 15,
    servings: 2
  }
];

// 根据菜谱名称查找菜谱
export const findRecipeByName = (name: string): Recipe | undefined => {
  return recipes.find((recipe) => recipe.name === name);
};

// 根据食材查找可用菜谱
export const findRecipesByIngredients = (ingredientNames: string[]): Recipe[] => {
  const normalizedIngredients = ingredientNames.map(name => name.trim().replace(/[\u4e00-\u9fa5]/g, ''));
  
  return recipes.filter(recipe => {
    const recipeIngredients = recipe.ingredients.map(ing => ing.name);
    // 检查菜谱所需的食材是否都在用户提供的食材列表中
    return recipeIngredients.every(ing => 
      ingredientNames.some(userIng => 
        userIng.includes(ing) || ing.includes(userIng)
      )
    );
  });
};

// 获取所有菜谱名称
export const getAllRecipeNames = (): string[] => {
  return recipes.map((recipe) => recipe.name);
};

// 按分类获取菜谱
export const getRecipesByCategory = (category: string): Recipe[] => {
  return recipes.filter((recipe) => recipe.category === category);
};

// 获取所有分类
export const getAllCategories = (): string[] => {
  return [...new Set(recipes.map((recipe) => recipe.category))];
};