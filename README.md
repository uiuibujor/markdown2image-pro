<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Markdown 视觉大师（markdown2image-pro）

专业级 Markdown 转图片与 PDF 工具，支持主题风格、智能分页、图片参数调整与高清导出。

## 功能
- Markdown 实时预览渲染（支持 GFM 表格、HTML 片段）
- 多主题样式（含渐变风格）
- 分页导出（按分割线/标题/智能混合切割）
- 导出 PNG / PDF

## 本地运行

**环境要求**：Node.js

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发服务器：
   ```bash
   npm run dev
   ```
3. 打开终端提示的地址（Vite 会输出 Local URL）

## 构建
```bash
npm run build
```
1. Install dependencies:
## 作为 React 组件库使用（给别的 React 项目引入）

本项目已抽离出可复用组件与导出能力，并提供库构建产物（`dist-lib/`）。

### 1) 构建库产物
```bash
npm run build:lib
```

### 2) 在其它 React 项目中本地引用
在对方项目中执行（示例为相对路径安装）：
```bash
npm i file:../markdown2image-pro
```

### 3) 使用示例
```tsx
import { MarkdownVisionPro } from 'markdown-视觉大师';

export default function Page() {
  return (
    <div style={{ height: '100vh' }}>
      <MarkdownVisionPro />
    </div>
  );
}
```

### 4) 对外导出内容
库入口为 [lib/index.ts](./lib/index.ts)，当前导出：
- `MarkdownVisionPro`（整套编辑/预览/设置/导出 UI）
- `PreviewArea`、`SettingsPanel`
- `exportAsImage`、`exportAsPDF`
- `THEMES`、`DEFAULT_CONFIG`、`INITIAL_MARKDOWN`
- `ExportConfig`、`ExportFormat` 等类型

### 5) 集成注意事项
- 样式依赖 Tailwind CSS 类名：对方项目需要接入 Tailwind（或自行提供等价样式），否则 UI 会失去样式。
- 导出能力依赖浏览器 DOM：在 Next.js 等 SSR 场景中，请确保导出调用只在客户端执行。

## 发布到 npm 的建议（可选）
- 将 `package.json` 的 `private` 改为 `false`
- 包名建议改为 ASCII（便于 npm 生态使用），并补充 `version`、`license`、`repository` 等字段
