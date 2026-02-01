export interface ExportConfig {
    theme: 'modern-light' | 'dark-minimal' | 'serif-classic' | 'gradient-blue' | 'gradient-purple' | 'gradient-pink-blue';
    fontSize: number;
    lineHeight: number;
    padding: number;
    fontFamily: 'sans' | 'serif' | 'mono';
    width: number;
    showWatermark: boolean;
    watermarkText: string;
    imageBorderRadius: number;
    imageShadow: number;
    imageAlignment: 'left' | 'center' | 'right';
    imageWidthPercent: number;
    splitMode: 'auto' | 'hr' | 'h1-h2' | 'all-headers';
}
export type ExportFormat = 'png' | 'jpeg' | 'pdf' | 'long-png';
export interface PageChunk {
    content: string;
    id: string;
}
