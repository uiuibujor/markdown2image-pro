import React from 'react';
import { ExportConfig } from '../types';
export interface MarkdownVisionProProps {
    markdown?: string;
    onMarkdownChange?: (markdown: string) => void;
    config?: ExportConfig;
    onConfigChange?: (config: ExportConfig) => void;
    initialMarkdown?: string;
    initialConfig?: ExportConfig;
    className?: string;
    onExportError?: (error: unknown) => void;
}
export declare const MarkdownVisionPro: React.FC<MarkdownVisionProProps>;
