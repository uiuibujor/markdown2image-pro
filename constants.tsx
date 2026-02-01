
import React from 'react';

export const THEMES = {
  'modern-light': {
    name: '现代简约',
    bg: 'bg-white',
    text: 'text-slate-800',
    container: 'bg-white shadow-xl border border-slate-100',
    accent: 'text-blue-600',
    header: 'border-b border-slate-100',
    code: 'bg-slate-100 text-pink-600',
  },
  'dark-minimal': {
    name: '深邃暗色',
    bg: 'bg-zinc-950',
    text: 'text-zinc-200',
    container: 'bg-zinc-900 shadow-2xl border border-zinc-800',
    accent: 'text-emerald-400',
    header: 'border-b border-zinc-800',
    code: 'bg-zinc-800 text-emerald-300',
  },
  'serif-classic': {
    name: '经典衬线',
    bg: 'bg-[#fdfbf7]',
    text: 'text-stone-800',
    container: 'bg-[#fdfbf7] shadow-lg border border-stone-200',
    accent: 'text-red-800',
    header: 'border-b border-stone-200',
    code: 'bg-stone-200 text-stone-900',
    font: 'font-serif',
  },
  'gradient-blue': {
    name: '极地冰川',
    bg: 'bg-gradient-to-br from-blue-500 to-indigo-700 p-8',
    text: 'text-slate-800',
    container: 'bg-white/95 backdrop-blur shadow-2xl rounded-2xl',
    accent: 'text-indigo-600',
    header: 'border-b border-blue-100',
    code: 'bg-blue-50 text-blue-700',
  },
  'gradient-purple': {
    name: '暮光紫色',
    bg: 'bg-gradient-to-tr from-fuchsia-600 to-purple-600 p-8',
    text: 'text-slate-800',
    container: 'bg-white/95 backdrop-blur shadow-2xl rounded-2xl',
    accent: 'text-purple-600',
    header: 'border-b border-purple-100',
    code: 'bg-purple-50 text-purple-700',
  },
  'gradient-pink-blue': {
    name: '棉花糖',
    bg: 'bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 p-8',
    text: 'text-slate-800',
    container: 'bg-white/90 backdrop-blur shadow-2xl rounded-2xl border border-white/50',
    accent: 'text-pink-500',
    header: 'border-b border-pink-100',
    code: 'bg-pink-50 text-pink-600',
  }
};

export const DEFAULT_CONFIG: any = {
  theme: 'modern-light',
  fontSize: 16,
  lineHeight: 1.8,
  padding: 48,
  fontFamily: 'sans',
  width: 750,
  showWatermark: true,
  watermarkText: '由 Markdown 视觉大师 导出',
  imageBorderRadius: 12,
  imageShadow: 10,
  imageAlignment: 'center',
  imageWidthPercent: 100,
  splitMode: 'h1-h2',
};

export const INITIAL_MARKDOWN = `# 欢迎使用 Markdown 视觉大师 🚀

这是一个专为创作者设计的 **Markdown 转图片** 工具！

## 核心功能
1. **精美主题**：内置现代、暗色、经典及渐变风格。
2. **局部样式**：现在支持调整 <span style="color: #ef4444; background-color: #fee2e2; padding: 0 4px; border-radius: 4px;">特定文字的颜色</span> 与 <span style="background-color: #fef08a; padding: 0 4px; border-radius: 4px;">背景高亮</span>。
3. **数据表格**：支持标准的 Markdown 表格渲染。
4. **图片调整**：支持圆角、阴影、宽度和对齐方式的实时调节。

---

## 智能分页演示
这是一个新的分页（如果你开启了分页模式并选择了分割线或标题切割）。

### 使用方法
在编辑器中选中文字，使用上方的 **颜色选择器** 挑选颜色后点击勾号即可。

### 示例展示
- <span style="color: #3b82f6; font-weight: bold;">蓝色加粗文本</span>
- <span style="background-color: #dcfce7; color: #166534; padding: 0 6px; border-radius: 99px;">绿色胶囊标签</span>

> “设计不仅仅是外观和感觉，设计是它的工作方式。” —— 史蒂夫·乔布斯

在左侧编辑器中开始输入，即刻查看右侧预览！
`;
