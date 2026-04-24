<template>
  <div class="app-container">
    <header class="header">
      <h1>依托军事装备学一级学科</h1>
      <h1>培养创新型密码工程人才</h1>
    </header>

    <section class="carousel-section">
      <h2 class="section-title">教学成果展示</h2>
      <div class="carousel-container">
        <button class="carousel-btn btn-prev" @click="moveCarousel('prev')">&#10094;</button>

        <div class="carousel-track" id="carouselTrack">
          <div v-for="(url, index) in imgUrls" :key="index" class="carousel-item" 
               :class="getItemClass(index)" 
               @click="handleItemClick(index)">
            <img v-if="url" :src="url" :alt="'展示图' + (index + 1)" @error="handleImgError($event)">
            <div v-else class="img-placeholder">展示图{{ index + 1 }}</div>
          </div>
        </div>

        <button class="carousel-btn btn-next" @click="moveCarousel('next')">&#10095;</button>
      </div>
    </section>

    <main class="main-content">
      <aside class="sidebar">
        <div class="sidebar-title">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L1 9L4 10.636V17.273L12 21.636L20 17.273V10.636L23 9L12 3ZM12 5.5L18.6 9L12 12.5L5.4 9L12 5.5ZM6 12.273L12 15.5L18 12.273V16.09L12 19.364L6 16.09V12.273Z"/>
          </svg>
          结题文档目录
        </div>
        <ul class="file-list" id="fileList">
          <li v-for="(item, index) in pdfData" :key="index" class="file-item" :class="{ active: activeFileIndex === index }" @click="handleFileSwitch(index)">
            <svg class="file-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V8L14 2ZM13 9V3.5L18.5 9H13Z"/>
            </svg>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </aside>

      <section class="preview-area">
        <div class="breadcrumb" id="breadcrumb">
          <svg style="width:16px;height:16px;margin-right:6px;fill:currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          当前位置： 首页 <span style="margin:0 5px;">/</span> 结题文档 <span style="margin:0 5px;">/</span> <strong id="currentFileName">{{ currentFileName }}</strong>
        </div>
        <iframe class="pdf-iframe" id="pdfViewer" :src="currentPdfUrl ? currentPdfUrl + '#view=FitH' : ''" title="PDF Viewer" @error="handlePdfError"></iframe>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import img1 from './assets/imgs/图片1.png'
import img2 from './assets/imgs/图片2.png'
import img3 from './assets/imgs/图片3.png'
import img4 from './assets/imgs/图片4.png'
import img5 from './assets/imgs/图片5.png'
import img6 from './assets/imgs/图片6.png'
import img7 from './assets/imgs/图片7.png'
import img8 from './assets/imgs/图片8.png'
import pdf1 from './assets/pdfs/0成果简介.pdf'
import pdf2 from './assets/pdfs/1解决的主要问题.pdf'
import pdf3 from './assets/pdfs/2成果主要做法.pdf'
import pdf4 from './assets/pdfs/3成果创新点.pdf'
import pdf5 from './assets/pdfs/4成果效益及推广应用.pdf'
import pdf6 from './assets/pdfs/5佐证材料.pdf'

const imgUrls = ref([
  new URL(img1, import.meta.url).href,
  new URL(img2, import.meta.url).href,
  new URL(img3, import.meta.url).href,
  new URL(img4, import.meta.url).href,
  new URL(img5, import.meta.url).href,
  new URL(img6, import.meta.url).href,
  new URL(img7, import.meta.url).href,
  new URL(img8, import.meta.url).href
])

const pdfData = [
  { name: '成果简介', url: new URL(pdf1, import.meta.url).href },
  { name: '解决的主要问题', url: new URL(pdf2, import.meta.url).href },
  { name: '成果主要做法', url: new URL(pdf3, import.meta.url).href },
  { name: '成果创新点', url: new URL(pdf4, import.meta.url).href },
  { name: '成果效益及推广应用', url: new URL(pdf5, import.meta.url).href },
  { name: '佐证材料', url: new URL(pdf6, import.meta.url).href }
]

const activeFileIndex = ref(0)
const currentPdfUrl = ref('')
const currentFileName = ref('')
const currentIndex = ref(0)
let autoPlayTimer = null

// 核心逻辑：动态计算当前卡片在轮播中的位置类名
function getItemClass(index) {
  const total = imgUrls.value.length
  if (total === 0) return 'hidden'
  
  const curr = currentIndex.value
  if (index === curr) return 'active'

  const next1 = (curr + 1) % total
  const prev1 = (curr - 1 + total) % total
  if (index === next1) return 'next-1'
  if (index === prev1) return 'prev-1'

  // 当图片总数大于等于5张时，才显示前后第二张
  if (total >= 5) {
    const next2 = (curr + 2) % total
    const prev2 = (curr - 2 + total) % total
    if (index === next2) return 'next-2'
    if (index === prev2) return 'prev-2'
  }

  // 其他所有未命中的卡片必须被隐藏，防止重叠
  return 'hidden'
}

function moveCarousel(direction) {
  const total = imgUrls.value.length
  if (total === 0) return

  if (direction === 'next') {
    currentIndex.value = (currentIndex.value + 1) % total
  } else {
    currentIndex.value = (currentIndex.value - 1 + total) % total
  }
  resetAutoPlay()
}

function handleItemClick(index) {
  const cls = getItemClass(index)
  // 如果点击的是非居中激活的图片，则直接跳转至该图片
  if (cls !== 'active' && cls !== 'hidden') {
    currentIndex.value = index
    resetAutoPlay()
  }
}

function startAutoPlay() {
  autoPlayTimer = setInterval(() => { moveCarousel('next') }, 3500)
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer)
  startAutoPlay()
}

function handleFileSwitch(index) {
  activeFileIndex.value = index
  currentFileName.value = pdfData[index].name
  currentPdfUrl.value = pdfData[index].url
}

function handleImgError(event) {
  event.preventDefault()
  event.stopPropagation()
  const target = event.target
  if (target) {
    target.style.display = 'none'
    const placeholder = target.nextElementSibling
    if (placeholder && placeholder.classList.contains('img-placeholder')) {
      placeholder.style.display = 'flex'
    }
  }
}

function handlePdfError(e) {
  e.preventDefault()
}

let carouselContainer = null

onMounted(() => {
  currentFileName.value = pdfData[0].name
  currentPdfUrl.value = pdfData[0].url
  startAutoPlay()

  carouselContainer = document.querySelector('.carousel-container')
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer))
    carouselContainer.addEventListener('mouseleave', startAutoPlay)
  }
})

onUnmounted(() => {
  clearInterval(autoPlayTimer)
  if (carouselContainer) {
    carouselContainer.removeEventListener('mouseenter', () => clearInterval(autoPlayTimer))
    carouselContainer.removeEventListener('mouseleave', startAutoPlay)
  }
})
</script>

<style scoped>
:deep(*) { margin: 0; padding: 0; box-sizing: border-box; }

:deep(body) {
  background-color: var(--bg-color);
  font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue", sans-serif;
  color: var(--text-main);
}

:deep(.app-container) {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

:deep(.header) {
  background: linear-gradient(135deg, var(--primary-color), #1455a3);
  color: #ffffff;
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 5%;
  text-align: left;
  box-shadow: var(--shadow-sm);
}

:deep(.header h1) {
  font-size: clamp(20px, 2.5vh, 32px);
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 4px;
}

:deep(.header p) {
  font-size: clamp(14px, 1.8vh, 16px);
  opacity: 0.85;
  font-weight: 300;
  letter-spacing: 1px;
}

:deep(.carousel-section) {
  background-color: #ffffff;
  height: 27vh;
  padding: 1.5vh 20px;
  margin-top: 1.5vh;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

:deep(.section-title) {
  text-align: center;
  font-size: clamp(16px, 2.2vh, 24px);
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1.5vh;
  flex-shrink: 0;
  position: relative;
}

:deep(.section-title::after) {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: var(--secondary-color);
  margin: 0.8vh auto 0;
  border-radius: 2px;
}

:deep(.carousel-container) {
  position: relative;
  width: 100%;
  max-width: 1000px;
  flex: 1;
  margin: 0 auto;
  overflow: hidden;
}

:deep(.carousel-track) {
  position: relative;
  width: 100%;
  height: 100%;
}

:deep(.carousel-item) {
  position: absolute;
  top: 0;
  height: 100%;
  width: 55%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  box-shadow: none;
  background: transparent;
  border: none;
}

:deep(.carousel-item img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: transparent;
}

:deep(.img-placeholder) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #94a3b8;
  font-size: 18px;
}

/* 轮播图分级样式控制：左右各展示2张，共5张可见 */
:deep(.carousel-item.active) {
  transform: translateX(-50%) scale(1);
  left: 50%;
  z-index: 3;
  opacity: 1;
  cursor: default;
}

:deep(.carousel-item.prev-1) {
  transform: translateX(-50%) scale(0.85);
  left: 30%;
  z-index: 2;
  opacity: 0.8;
  cursor: pointer;
}

:deep(.carousel-item.next-1) {
  transform: translateX(-50%) scale(0.85);
  left: 70%;
  z-index: 2;
  opacity: 0.8;
  cursor: pointer;
}

:deep(.carousel-item.prev-2) {
  transform: translateX(-50%) scale(0.7);
  left: 15%;
  z-index: 1;
  opacity: 0.5;
  cursor: pointer;
}

:deep(.carousel-item.next-2) {
  transform: translateX(-50%) scale(0.7);
  left: 85%;
  z-index: 1;
  opacity: 0.5;
  cursor: pointer;
}

:deep(.carousel-item.hidden) {
  transform: translateX(-50%) scale(0.5);
  left: 50%;
  z-index: 0;
  opacity: 0;
  pointer-events: none;
}

:deep(.carousel-btn) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: clamp(30px, 4vh, 50px);
  height: clamp(30px, 4vh, 50px);
  background-color: rgba(0,0,0,0.3);
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: clamp(16px, 2.5vh, 24px);
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.carousel-btn:hover) { background-color: var(--primary-color); }
:deep(.btn-prev) { left: 10px; }
:deep(.btn-next) { right: 10px; }

:deep(.main-content) {
  display: flex;
  flex-direction: row;
  margin: 20px 0 40px 0;
  gap: 20px;
  height: 750px;
}

:deep(.sidebar) {
  width: 280px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.sidebar-title) {
  background-color: #f8f9fa;
  color: var(--primary-color);
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid var(--border-color);
  display: flex;
  align-items: center;
}

:deep(.sidebar-title svg) {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  fill: var(--primary-color);
}

:deep(.file-list) {
  list-style: none;
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

:deep(.file-item) {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  cursor: pointer;
  color: var(--text-main);
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
}

:deep(.file-item:hover) {
  background-color: #f4f7fa;
  color: var(--secondary-color);
}

:deep(.file-item.active) {
  background-color: #eef5ff;
  color: var(--primary-color);
  font-weight: bold;
}

:deep(.file-item.active::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: var(--primary-color);
}

:deep(.file-icon) {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  fill: currentColor;
  opacity: 0.8;
}

:deep(.preview-area) {
  flex: 1;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.breadcrumb) {
  padding: 12px 24px;
  background-color: #f8f9fa;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 14px;
  display: flex;
  align-items: center;
}

:deep(.breadcrumb strong) {
  color: var(--primary-color);
  margin-left: 5px;
}

:deep(.pdf-iframe) {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #f8f9fa;
}

:deep(::-webkit-scrollbar) { width: 8px; height: 8px; }
:deep(::-webkit-scrollbar-thumb) { background: #cbd5e1; border-radius: 4px; }
:deep(::-webkit-scrollbar-track) { background: transparent; }
:deep(::-webkit-scrollbar-thumb:hover) { background: #94a3b8; }
</style>

<style>
:root {
  --primary-color: #0b4282;
  --secondary-color: #1765c4;
  --bg-color: #f0f2f5;
  --text-main: #333333;
  --text-muted: #666666;
  --border-color: #e5e7eb;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.05);
  --shadow-md: 0 8px 20px rgba(0,0,0,0.08);
  --shadow-carousel: 0 10px 25px rgba(0,0,0,0.2);
}

body {
  background-color: var(--bg-color);
}
</style>