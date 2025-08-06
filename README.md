# 图片合成器 (Web PNG Merger)

一个纯前端的单页面Web应用工具，用于合并两张图片并生成新的合成图片。

## 📖 项目介绍

图片合成器主要解决用户需要将无水印图片的特定区域合成到水印图片上的需求，适用于图片处理和水印添加场景。该工具无需服务端支持，可直接在浏览器中完成操作。

## ✨ 功能特性

- 🖼️ **双图片上传**：支持点击上传和拖拽上传两种方式
- 🎯 **智能合成**：自动将无水印图右下角140×50像素区域合成到水印图右下角
- 📱 **响应式设计**：桌面优先，支持移动端自适应
- 💾 **本地保存**：支持自定义文件名并下载合成后的图片
- 🧹 **一键清除**：快速清空画布和重置所有状态
- 🎨 **实时预览**：Canvas实时显示合成效果

## 🚀 使用方法

1. **上传第一张图片**：点击画布或拖拽图片上传水印图
2. **上传第二张图片**：继续上传无水印图
3. **自动合成**：系统自动将无水印图的右下角区域合成到水印图
4. **输入文件名**：在文件名输入框中输入保存的文件名
5. **保存图片**：点击"保存"按钮下载合成后的图片
6. **清除重置**：点击"清除"按钮可清空画布重新开始

## 🛠️ 技术栈

- **前端框架**：原生 HTML5 + CSS3 + JavaScript
- **图像处理**：HTML5 Canvas API
- **文件处理**：File API
- **样式框架**：原生CSS（无依赖）
- **构建工具**：无需构建，直接运行

## 📁 项目结构

```
web-png-merger/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 核心逻辑
├── package.json        # 项目配置
└── README.md          # 项目说明
```

## 🎨 设计规范

- **主色调**：#2563eb（蓝色）
- **辅助色**：#64748b（灰色）
- **字体大小**：标题18px，正文14px
- **布局风格**：垂直居中，简洁明了
- **交互效果**：悬停变色，拖拽提示

## 🖥️ 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📝 开发说明

### 本地运行

```bash
# 克隆项目
git clone https://github.com/Tairraos/web-png-merger.git

# 进入项目目录
cd web-png-merger

# 直接打开 index.html 或使用本地服务器
python -m http.server 8000
# 或
npx serve .
```

### 核心功能实现

- **图片上传**：使用 File API 和 drag & drop 事件
- **图像合成**：通过 Canvas API 的 `drawImage()` 方法
- **文件下载**：使用 Canvas 的 `toBlob()` 和 URL.createObjectURL()

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

**Tairraos** - [GitHub](https://github.com/Tairraos)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！

---

如果这个项目对你有帮助，请给它一个 ⭐️！