import React from 'react';
import { ExportConfig } from '../types';
interface PreviewAreaProps {
    markdown: string;
    config: ExportConfig;
    splitPages: boolean;
    pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
export declare const PreviewArea: React.FC<PreviewAreaProps>;
export {};
