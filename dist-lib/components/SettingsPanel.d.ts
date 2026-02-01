import React from 'react';
import { ExportConfig } from '../types';
interface SettingsPanelProps {
    config: ExportConfig;
    onChange: (config: ExportConfig) => void;
}
export declare const SettingsPanel: React.FC<SettingsPanelProps>;
export {};
