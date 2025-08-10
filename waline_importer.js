// Waline 评论导入脚本
// 使用方法：node waline_importer.js qq_space_export.json

const fs = require('fs');
const cloudbase = require('@cloudbase/node-sdk');

// 初始化云开发SDK
const app = cloudbase.init({
  env: 'your-env-id', // 替换为你的环境ID
  secretId: 'your-secret-id', // 替换为你的腾讯云SecretId
  secretKey: 'your-secret-key' // 替换为你的腾讯云SecretKey
});

const db = app.database();
const collection = db.collection('waline-comments'); // 替换为你的评论集合名称

async function importComments() {
  // 读取导出的JSON文件
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('请提供导出的JSON文件路径');
    process.exit(1);
  }
  
  const fileData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileData);
  
  console.log(`开始导入评论，共 ${data.comments.length} 条`);
  
  // 处理评论数据，转换为Waline格式
  const walineComments = data.comments.map(comment => {
    // 如果有QQ号，生成QQ邮箱
    if (comment.qqNumber) {
      comment.mail = `${comment.qqNumber}@qq.com`;
    }
    
    // 转换时间格式
    try {
      comment.insertedAt = new Date(comment.insertedAt);
    } catch (e) {
      comment.insertedAt = new Date();
    }
    
    // 删除非Waline字段
    delete comment.qqNumber;
    
    return comment;
  });
  
  // 批量插入评论
  try {
    const result = await collection.add(walineComments);
    console.log(`成功导入 ${result.ids.length} 条评论`);
  } catch (error) {
    console.error('导入失败:', error);
  }
}

importComments();