
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ExportConfig, PageChunk } from '../types';
import { THEMES } from '../constants';

interface PreviewAreaProps {
  markdown: string;
  config: ExportConfig;
  splitPages: boolean;
  pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ 
  markdown, 
  config, 
  splitPages,
  pageRefs 
}) => {
  const theme = THEMES[config.theme];

  // 动态分页逻辑
  const pages = useMemo(() => {
    if (!splitPages) return [{ content: markdown, id: 'main' }];
    
    let regex: RegExp;
    switch (config.splitMode) {
      case 'hr':
        regex = /\n---\n/;
        break;
      case 'h1-h2':
        regex = /\n(?=# )|\n(?=## )/;
        break;
      case 'all-headers':
        regex = /\n(?=#+ )/;
        break;
      case 'auto':
      default:
        regex = /\n---\n|\n(?=# )|\n(?=## )/;
        break;
    }

    const chunks = markdown.split(regex);
    return chunks.filter(c => c.trim()).map((c, i) => ({
      content: c.trim(),
      id: `page-${i}`
    }));
  }, [markdown, splitPages, config.splitMode]);

  const fontClass = config.fontFamily === 'serif' ? 'font-serif' : config.fontFamily === 'mono' ? 'mono' : 'font-sans';

  // 图片容器对齐样式
  const getImageAlignmentClass = () => {
    switch(config.imageAlignment) {
      case 'left': return 'justify-start';
      case 'right': return 'justify-end';
      default: return 'justify-center';
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 p-8 min-h-full">
      {pages.map((page, index) => (
        <div 
          key={page.id}
          ref={(el) => {
            pageRefs.current[index] = el;
          }}
          style={{ width: `${config.width}px` }}
          className={`${theme.bg} transition-all duration-300`}
        >
          <div 
            className={`${theme.container} overflow-hidden`}
            style={{ padding: `${config.padding}px` }}
          >
            <article 
              className={`prose prose-slate max-w-none ${fontClass} ${theme.text}`}
              style={{ 
                fontSize: `${config.fontSize}px`,
                lineHeight: config.lineHeight
              }}
            >
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({node, ...props}) => <h1 className={`text-3xl font-bold mb-6 ${theme.accent}`} {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-4 mt-8 pb-2 border-b border-slate-200" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-3 mt-6" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-inherit opacity-95" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-inherit" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-slate-500" {...props} />
                  ),
                  code: ({node, ...props}) => {
                    return (
                      <code className={`px-1.5 py-0.5 rounded text-[0.9em] font-bold mono ${theme.code}`} {...props} />
                    );
                  },
                  pre: ({node, ...props}) => (
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl my-6 overflow-x-auto shadow-inner mono text-sm" {...props} />
                  ),
                  img: ({node, ...props}) => (
                    <div className={`flex w-full my-6 ${getImageAlignmentClass()}`}>
                      <img 
                        className="max-w-full h-auto block" 
                        style={{ 
                          borderRadius: `${config.imageBorderRadius}px`,
                          boxShadow: config.imageShadow > 0 ? `0 ${config.imageShadow/2}px ${config.imageShadow}px rgba(0,0,0,0.15)` : 'none',
                          width: `${config.imageWidthPercent}%`
                        }} 
                        {...props} 
                      />
                    </div>
                  ),
                  hr: ({node, ...props}) => <hr className="my-8 border-slate-200" {...props} />,
                  // Table rendering support
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-slate-300 text-sm" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-slate-100/50" {...props} />,
                  th: ({node, ...props}) => <th className="border border-slate-300 px-4 py-2 font-bold text-left" {...props} />,
                  td: ({node, ...props}) => <td className="border border-slate-300 px-4 py-2" {...props} />,
                }}
              >
                {page.content}
              </ReactMarkdown>
              
              {config.showWatermark && (
                <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center opacity-40 text-xs">
                  <span>{config.watermarkText}</span>
                  <span className="font-medium">Vision Pro</span>
                </div>
              )}
            </article>
          </div>
        </div>
      ))}
    </div>
  );
};
