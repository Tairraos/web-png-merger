class ImageMerger {
    constructor() {
        this.canvas = document.getElementById('imageCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.fileInput = document.getElementById('fileInput');
        this.filenameInput = document.getElementById('filenameInput');
        this.saveBtn = document.getElementById('saveBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.canvasContainer = document.querySelector('.canvas-container');
        
        // 状态管理 - 简化逻辑：第一张图为水印图，第二张图为无水印图
        this.watermarkImage = null;
        this.normalImage = null;
        this.currentImage = null;
        
        this.initEventListeners();
        this.resetCanvas();
    }
    
    initEventListeners() {
        // Canvas点击上传
        this.canvasContainer.addEventListener('click', () => {
            this.fileInput.click();
        });
        
        // 文件选择
        this.fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.loadImage(file);
            }
        });
        
        // 拖拽上传
        this.canvasContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.canvasContainer.classList.add('drag-over');
        });
        
        this.canvasContainer.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.canvasContainer.classList.remove('drag-over');
        });
        
        this.canvasContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            this.canvasContainer.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                this.loadImage(files[0]);
            }
        });
        
        // 保存按钮
        this.saveBtn.addEventListener('click', () => {
            this.saveImage();
        });
        
        // 清除按钮
        this.clearBtn.addEventListener('click', () => {
            this.clearAll();
        });
    }
    
    loadImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.processImage(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    processImage(img) {
        // 简化逻辑：第一张图为水印图，第二张图为无水印图
        if (!this.watermarkImage) {
            // 第一张图：水印图
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0);
            
            this.watermarkImage = img;
            this.currentImage = img;
            console.log('水印图已加载');
        } else {
            // 第二张图：无水印图
            this.normalImage = img;
            console.log('无水印图已加载');
            
            // 立即合成
            this.mergeImagesDirectly();
        }
    }
    
    mergeImagesDirectly() {
        if (!this.watermarkImage || !this.normalImage) {
            console.log('需要两张图片才能合成');
            return;
        }
        
        console.log('开始合成图片...');
        
        // 创建隐藏canvas来处理无水印图
        const hiddenCanvas = document.createElement('canvas');
        const hiddenCtx = hiddenCanvas.getContext('2d');
        hiddenCanvas.width = this.normalImage.width;
        hiddenCanvas.height = this.normalImage.height;
        
        // 在隐藏canvas上绘制无水印图
        hiddenCtx.drawImage(this.normalImage, 0, 0);
        
        // 从无水印图的右下角提取140x50像素区域
        const sourceX = Math.max(0, this.normalImage.width - 140);
        const sourceY = Math.max(0, this.normalImage.height - 50);
        const sourceWidth = Math.min(140, this.normalImage.width);
        const sourceHeight = Math.min(50, this.normalImage.height);
        
        // 提取右下角区域的图像数据
        const imageData = hiddenCtx.getImageData(sourceX, sourceY, sourceWidth, sourceHeight);
        
        // 计算在主canvas上的绘制位置（右下角）
        const destX = Math.max(0, this.canvas.width - sourceWidth);
        const destY = Math.max(0, this.canvas.height - sourceHeight);
        
        // 直接在主canvas的右下角绘制提取的区域，不重新绘制水印图
        this.ctx.putImageData(imageData, destX, destY);
        
        console.log('图片合成完成');
    }
    
    saveImage() {
        if (!this.currentImage) {
            return;
        }
        
        // 获取文件名
        let filename = this.filenameInput.value.trim();
        if (!filename) {
            filename = 'merged-image';
        }
        
        // 确保文件名有正确的扩展名
        if (!filename.toLowerCase().endsWith('.png')) {
            filename += '.png';
        }
        
        // 创建下载链接
        this.canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('图片已保存:', filename);
        }, 'image/png');
    }
    
    clearAll() {
        // 重置所有状态
        this.watermarkImage = null;
        this.normalImage = null;
        this.currentImage = null;
        
        // 重置UI
        this.filenameInput.value = '';
        
        // 重置canvas
        this.resetCanvas();
        
        console.log('已清空所有内容');
    }
    
    resetCanvas() {
        // 重置为默认尺寸
        this.canvas.width = 1536;
        this.canvas.height = 864;
        
        // 清空canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 设置默认背景色
        this.ctx.fillStyle = '#f9fafb';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 添加提示文字
        this.ctx.fillStyle = '#9ca3af';
        this.ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('点击或拖拽图片到此处，先拖中文名字的', this.canvas.width / 2, this.canvas.height / 2);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ImageMerger();
});