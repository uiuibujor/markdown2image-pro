
import React from 'react';
import { ExportConfig } from '../types';
import { THEMES } from '../constants';
import { 
  Palette, 
  Type, 
  Settings, 
  FileText,
  Layout,
  Image as ImageIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Scissors
} from 'lucide-react';

interface SettingsPanelProps {
  config: ExportConfig;
  onChange: (config: ExportConfig) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ config, onChange }) => {
  const updateConfig = (key: keyof ExportConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const splitModes = [
    { id: 'h1-h2', label: 'H1/H2 标题切割', desc: '在顶级标题处自动分页' },
    { id: 'hr', label: '仅分割线切割', desc: '仅在 --- 处手动分页' },
    { id: 'all-headers', label: '所有标题切割', desc: '在任何级别标题处分页' },
    { id: 'auto', label: '智能混合切割', desc: '标题与分割线均触发分页' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">
      <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
        <Settings size={20} className="text-blue-600" />
        <h2>配置选项</h2>
      </div>

      {/* Theme Selection */}
      <section className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Palette size={16} /> 主题风格
        </label>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(THEMES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => updateConfig('theme', key)}
              className={`text-left px-4 py-3 rounded-lg border transition-all ${
                config.theme === key 
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-100' 
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="font-semibold">{value.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Split Mode Config */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Scissors size={16} /> 分页切割方式
        </div>
        <div className="space-y-2">
          {splitModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => updateConfig('splitMode', mode.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                config.splitMode === mode.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className={`text-sm font-semibold ${config.splitMode === mode.id ? 'text-blue-700' : 'text-slate-700'}`}>
                {mode.label}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{mode.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Layout Config */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Layout size={16} /> 布局与尺寸
        </div>
        
        <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>画布宽度: {config.width}px</span>
            </div>
            <input 
              type="range" 
              min="400" 
              max="1200" 
              step="50"
              value={config.width} 
              onChange={(e) => updateConfig('width', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>内边距: {config.padding}px</span>
            </div>
            <input 
              type="range" 
              min="16" 
              max="100" 
              step="4"
              value={config.padding} 
              onChange={(e) => updateConfig('padding', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </section>

      {/* Image Adjustments */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <ImageIcon size={16} /> 图片调整
        </div>
        
        <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>圆角大小: {config.imageBorderRadius}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40" 
              step="1"
              value={config.imageBorderRadius} 
              onChange={(e) => updateConfig('imageBorderRadius', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>阴影强度: {config.imageShadow}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              step="1"
              value={config.imageShadow} 
              onChange={(e) => updateConfig('imageShadow', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>图片显示宽度: {config.imageWidthPercent}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5"
              value={config.imageWidthPercent} 
              onChange={(e) => updateConfig('imageWidthPercent', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => updateConfig('imageAlignment', 'left')}
              className={`flex-1 py-1.5 flex items-center justify-center rounded border transition-colors ${
                config.imageAlignment === 'left' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <AlignLeft size={14} />
            </button>
            <button
              onClick={() => updateConfig('imageAlignment', 'center')}
              className={`flex-1 py-1.5 flex items-center justify-center rounded border transition-colors ${
                config.imageAlignment === 'center' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <AlignCenter size={14} />
            </button>
            <button
              onClick={() => updateConfig('imageAlignment', 'right')}
              className={`flex-1 py-1.5 flex items-center justify-center rounded border transition-colors ${
                config.imageAlignment === 'right' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <AlignRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Typography Config */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Type size={16} /> 字体排版
        </div>
        
        <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>字体大小: {config.fontSize}px</span>
            </div>
            <input 
              type="range" 
              min="12" 
              max="32" 
              step="1"
              value={config.fontSize} 
              onChange={(e) => updateConfig('fontSize', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>行高: {config.lineHeight}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="2.5" 
              step="0.1"
              value={config.lineHeight} 
              onChange={(e) => updateConfig('lineHeight', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div className="flex gap-2">
            {(['sans', 'serif', 'mono'] as const).map((font) => (
              <button
                key={font}
                onClick={() => updateConfig('fontFamily', font)}
                className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors ${
                  config.fontFamily === font ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {font === 'sans' ? '无衬线' : font === 'serif' ? '衬线体' : '等宽体'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Watermark */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
           <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <FileText size={16} /> 水印设置
          </label>
          <input 
            type="checkbox" 
            checked={config.showWatermark}
            onChange={(e) => updateConfig('showWatermark', e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        {config.showWatermark && (
          <input 
            type="text" 
            value={config.watermarkText}
            onChange={(e) => updateConfig('watermarkText', e.target.value)}
            placeholder="自定义水印文字..."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        )}
      </section>
    </div>
  );
};
