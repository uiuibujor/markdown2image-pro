
import React, { useState, useRef } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { PreviewArea } from './components/PreviewArea';
import { ExportConfig } from './types';
import { INITIAL_MARKDOWN, DEFAULT_CONFIG } from './constants';
import { exportAsImage, exportAsPDF } from './services/exportService';
import { 
  Download, 
  FileImage, 
  FileText, 
  Split, 
  Menu,
  Eye,
  PenTool,
  Loader2,
  Type as TypeIcon,
  Highlighter,
  Check
} from 'lucide-react';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN);
  const [config, setConfig] = useState<ExportConfig>(DEFAULT_CONFIG);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [splitPages, setSplitPages] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
  // Custom text color state
  const [selectedTextColor, setSelectedTextColor] = useState('#EF4444');
  const [selectedBgColor, setSelectedBgColor] = useState('#FEF08A');

  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleExport = async (type: 'png' | 'pdf') => {
    setIsExporting(true);
    try {
      if (type === 'png') {
        await exportAsImage(pageRefs.current, 'png');
      } else {
        await exportAsPDF(pageRefs.current);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试。如果错误持续，请检查网络连接或尝试简化文档内容。');
    } finally {
      setIsExporting(false);
    }
  };

  const applyStyle = (type: 'text' | 'bg' | 'both') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = markdown.substring(start, end);

    if (!selection) {
      alert('请先在编辑器中选中一段文字');
      return;
    }

    let styleStr = '';
    if (type === 'text') styleStr = `color: ${selectedTextColor};`;
    else if (type === 'bg') styleStr = `background-color: ${selectedBgColor}; padding: 0 4px; border-radius: 4px;`;
    else styleStr = `color: ${selectedTextColor}; background-color: ${selectedBgColor}; padding: 0 4px; border-radius: 4px;`;

    const styledText = `<span style="${styleStr}">${selection}</span>`;
    const newMarkdown = markdown.substring(0, start) + styledText + markdown.substring(end);
    
    setMarkdown(newMarkdown);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + styledText.length);
    }, 0);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans antialiased">
      {/* Sidebar - Settings */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 bg-white border-r border-slate-200 flex flex-col overflow-hidden relative z-40 shadow-sm`}
      >
        <SettingsPanel config={config} onChange={setConfig} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header/Toolbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shadow-sm z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
              title="切换侧边栏"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <FileText size={18} />
              </div>
              <h1 className="font-bold text-slate-800 tracking-tight">视觉大师</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-lg flex mr-4">
              <button 
                onClick={() => setActiveTab('edit')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'edit' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PenTool size={14} /> 编辑
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'preview' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye size={14} /> 预览
              </button>
            </div>

            <button 
              onClick={() => setSplitPages(!splitPages)}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                splitPages ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Split size={16} /> {splitPages ? '分页模式开启' : '普通模式'}
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="flex gap-2">
              <button 
                disabled={isExporting}
                onClick={() => handleExport('png')}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileImage size={16} />}
                导出图片
              </button>
              <button 
                disabled={isExporting}
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                导出 PDF
              </button>
            </div>
          </div>
        </header>

        {/* Workspace Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Tab */}
          <div className={`${activeTab === 'edit' ? 'flex' : 'hidden md:flex'} flex-1 border-r border-slate-200 bg-slate-50 flex-col`}>
            <div className="bg-white m-6 flex-1 rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ring-1 ring-slate-200/50">
              {/* Editor Sub-Header / Formatting Toolbar */}
              <div className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 px-5 py-3 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
                    <TypeIcon size={14} className="text-slate-400" />
                    <input 
                      type="color" 
                      value={selectedTextColor}
                      onChange={(e) => setSelectedTextColor(e.target.value)}
                      className="w-5 h-5 border-none cursor-pointer rounded overflow-hidden"
                      title="选中文本颜色"
                    />
                    <div className="w-px h-3 bg-slate-200 mx-1"></div>
                    <Highlighter size={14} className="text-slate-400" />
                    <input 
                      type="color" 
                      value={selectedBgColor}
                      onChange={(e) => setSelectedBgColor(e.target.value)}
                      className="w-5 h-5 border-none cursor-pointer rounded overflow-hidden"
                      title="选中高亮颜色"
                    />
                    <button 
                      onClick={() => applyStyle('both')}
                      className="ml-2 bg-blue-600 text-white p-1 rounded hover:bg-blue-700 transition-colors"
                      title="应用到选中文字"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium italic hidden lg:block">提示：选中文字后点击勾号即可应用颜色</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 font-mono">{markdown.split(/\s+/).filter(x => x).length} 词</span>
                  <span className="text-xs text-slate-400 font-mono">{markdown.length} 字符</span>
                </div>
              </div>

              <textarea
                ref={textareaRef}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="在此输入您的 Markdown 内容..."
                className="w-full flex-1 p-8 text-slate-800 mono text-lg leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-blue-100 placeholder:text-slate-300 placeholder:italic bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"
                spellCheck={false}
                autoFocus
              />
              <div className="bg-slate-50/50 px-5 py-2 text-[10px] text-slate-400 border-t border-slate-100 flex justify-between">
                <span>支持 HTML 样式：&lt;span style="..."&gt;文字&lt;/span&gt;</span>
                <span>UTF-8 Encoding</span>
              </div>
            </div>
          </div>

          {/* Preview Tab */}
          <div className={`${activeTab === 'preview' ? 'flex' : 'hidden md:flex'} flex-1 bg-slate-200/70 overflow-y-auto scroll-smooth overflow-x-hidden`}>
             <PreviewArea 
               markdown={markdown} 
               config={config} 
               splitPages={splitPages}
               pageRefs={pageRefs}
             />
          </div>
        </div>

        {/* Split Pages floating help */}
        {splitPages && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-2xl text-sm font-semibold z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-500 ring-4 ring-blue-600/20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            分页模式已启用：文档将根据分割线或二级以上标题自动切割。
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
