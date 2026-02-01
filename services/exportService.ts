
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

// 导出通用配置，提高稳定性
const captureOptions = {
  quality: 1,
  pixelRatio: 2.5,
  cacheBust: true,
};

export const exportAsImage = async (elements: (HTMLDivElement | null)[], format: 'png' | 'jpeg') => {
  const images: string[] = [];
  
  for (const el of elements) {
    if (!el) continue;
    
    try {
      const dataUrl = format === 'png' 
        ? await htmlToImage.toPng(el, captureOptions)
        : await htmlToImage.toJpeg(el, captureOptions);
      images.push(dataUrl);
    } catch (err) {
      console.error('图片生成失败:', err);
      // 降级处理：如果带样式的内联失败，尝试基础导出
      const fallback = format === 'png' 
        ? await htmlToImage.toPng(el, { pixelRatio: 1.5 })
        : await htmlToImage.toJpeg(el, { pixelRatio: 1.5 });
      images.push(fallback);
    }
  }

  images.forEach((url, i) => {
    const link = document.createElement('a');
    link.download = `视觉大师-导出-${i + 1}.${format}`;
    link.href = url;
    link.click();
  });
};

export const exportAsPDF = async (elements: (HTMLDivElement | null)[]) => {
  const validElements = elements.filter((el): el is HTMLDivElement => el !== null);
  if (validElements.length === 0) return;

  let pdf: jsPDF | null = null;

  for (let i = 0; i < validElements.length; i++) {
    const el = validElements[i];
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    
    try {
      const canvas = await htmlToImage.toCanvas(el, { ...captureOptions, pixelRatio: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      if (!pdf) {
        pdf = new jsPDF({
          orientation: width > height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [width, height],
          hotfixes: ['px_scaling']
        });
      } else {
        pdf.addPage([width, height], width > height ? 'landscape' : 'portrait');
      }

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    } catch (err) {
      console.error('PDF 页面生成失败:', err);
    }
  }

  if (pdf) {
    pdf.save('视觉大师-Markdown导出.pdf');
  }
};
