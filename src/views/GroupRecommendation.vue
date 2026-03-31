<template>
  <div class="h-screen flex flex-col items-center justify-center overflow-hidden relative bg-darkBg text-textMain font-sans">
    
    <div class="absolute inset-0 z-0 pointer-events-none" style="background-image: linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px); background-size: 40px 40px;"></div>
    
    <div class="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <div 
        v-for="i in 30" 
        :key="i"
        class="absolute w-[3px] h-[3px] bg-accentGreen rounded-full opacity-0"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animation: `floatUp ${Math.random() * 5 + 3}s linear infinite`,
          animationDelay: `${Math.random() * 2}s`
        }"
      ></div>
    </div>

    <div class="w-full h-full p-6 md:p-8 lg:p-10 flex flex-col gap-6 relative z-10 fade-in">
      
      <header class="flex justify-between items-center px-8 py-4 rounded-[16px] border border-borderColor z-10 bg-panelBg">
        <h1 class="text-[28px] font-extrabold text-white tracking-[2px] m-0">优势能力分层 —— 协作分组建议</h1>
        <div class="text-[16px] font-semibold text-textMuted">基于系统多维数据画像，为您推荐的三类角色储备池</div>
      </header>

      <main class="flex-1 flex gap-6 min-h-0 z-10">
        
        <div class="flex-1 flex flex-col rounded-[16px] border border-borderColor overflow-hidden category-panel group relative bg-cardInnerBg">
          <div class="px-6 py-5 border-b border-borderColor relative overflow-hidden">
            <div class="absolute bottom-0 left-0 h-[3px] w-full bg-[#2563EB]"></div>
            <div class="text-[24px] font-extrabold text-[#2563EB] flex items-center gap-[10px] mb-2">🧠 理论解析型</div>
            <div class="text-[14px] text-textMuted leading-relaxed font-medium">擅长文献查阅、需求分析、逻辑重构与系统方案的理论推演。</div>
            <div class="absolute top-6 right-6 text-[16px] font-bold text-textMuted bg-darkBg px-3 py-1 rounded-full">共 {{ theoryStudents.length }} 人</div>
          </div>
          <div class="flex-1 p-6 overflow-y-auto flex content-start flex-wrap gap-[14px] custom-scrollbar">
            <div 
              v-for="(student, index) in theoryStudents" 
              :key="index"
              class="flex items-center justify-between px-4 py-2 rounded-lg text-[16px] font-bold transition-colors w-[calc(50%-7px)]"
              style="background: rgba(37, 99, 235, 0.1); border: 1px solid rgba(37, 99, 235, 0.2); color: #2563EB;"
            >
              <span class="tracking-[1px]">{{ student.name }}</span>
              <span class="text-[13px] font-extrabold opacity-80" style="font-family: monospace;">{{ student.score }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col rounded-[16px] border border-borderColor overflow-hidden category-panel group relative bg-cardInnerBg">
          <div class="px-6 py-5 border-b border-borderColor relative overflow-hidden">
            <div class="absolute bottom-0 left-0 h-[3px] w-full bg-[#059669]"></div>
            <div class="text-[24px] font-extrabold text-[#059669] flex items-center gap-[10px] mb-2">🛠️ 实践攻坚型</div>
            <div class="text-[14px] text-textMuted leading-relaxed font-medium">擅长平台仿真操作、代码逻辑编写、流程图绘制及漏洞排查。</div>
            <div class="absolute top-6 right-6 text-[16px] font-bold text-textMuted bg-darkBg px-3 py-1 rounded-full">共 {{ practiceStudents.length }} 人</div>
          </div>
          <div class="flex-1 p-6 overflow-y-auto flex content-start flex-wrap gap-[14px] custom-scrollbar">
            <div 
              v-for="(student, index) in practiceStudents" 
              :key="index"
              class="flex items-center justify-between px-4 py-2 rounded-lg text-[16px] font-bold transition-colors w-[calc(50%-7px)]"
              style="background: rgba(5, 150, 105, 0.1); border: 1px solid rgba(5, 150, 105, 0.2); color: #059669;"
            >
              <span class="tracking-[1px]">{{ student.name }}</span>
              <span class="text-[13px] font-extrabold opacity-80" style="font-family: monospace;">{{ student.score }}</span>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col rounded-[16px] border border-borderColor overflow-hidden category-panel group relative bg-cardInnerBg">
          <div class="px-6 py-5 border-b border-borderColor relative overflow-hidden">
            <div class="absolute bottom-0 left-0 h-[3px] w-full bg-[#7C3AED]"></div>
            <div class="text-[24px] font-extrabold text-[#7C3AED] flex items-center gap-[10px] mb-2">🎯 组织统筹型</div>
            <div class="text-[14px] text-textMuted leading-relaxed font-medium">擅长组内分工协调、进度把控、成果提报及与 AI 工具的高效交互。</div>
            <div class="absolute top-6 right-6 text-[16px] font-bold text-textMuted bg-darkBg px-3 py-1 rounded-full">共 {{ orgStudents.length }} 人</div>
          </div>
          <div class="flex-1 p-6 overflow-y-auto flex content-start flex-wrap gap-[14px] custom-scrollbar">
            <div 
              v-for="(student, index) in orgStudents" 
              :key="index"
              class="flex items-center justify-between px-4 py-2 rounded-lg text-[16px] font-bold transition-colors w-[calc(50%-7px)]"
              style="background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.2); color: #7C3AED;"
            >
              <span class="tracking-[1px]">{{ student.name }}</span>
              <span class="text-[13px] font-extrabold opacity-80" style="font-family: monospace;">{{ student.score }}</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟数据：名字 + 核心项得分
const theoryStudents = ref([
  { name: '张晓明', score: '内化95' },
  { name: '李华', score: '内化94' },
  { name: '王建国', score: '逻辑92' },
  { name: '陈思远', score: '内化90' },
  { name: '赵梦琪', score: '解析89' },
  { name: '刘星宇', score: '逻辑88' },
  { name: '孙佳琪', score: '内化88' },
  { name: '周杰', score: '解析85' },
  { name: '吴浩然', score: '解析84' },
  { name: '郑爽', score: '内化82' }
]);

const practiceStudents = ref([
  { name: '陈梓轩', score: '实践98' },
  { name: '林俊宇', score: '实践95' },
  { name: '何宇航', score: '攻坚94' },
  { name: '高明', score: '操作92' },
  { name: '马云飞', score: '实践90' },
  { name: '罗文', score: '攻坚89' },
  { name: '宋建', score: '实践88' },
  { name: '许诺', score: '操作87' },
  { name: '邓超', score: '攻坚86' },
  { name: '萧炎', score: '实践85' },
  { name: '冯宝宝', score: '操作84' },
  { name: '叶凡', score: '攻坚82' }
]);

const orgStudents = ref([
  { name: '张三丰', score: '统筹97' },
  { name: '黄蓉', score: '协同96' },
  { name: '郭靖', score: '履约94' },
  { name: '杨过', score: '统筹92' },
  { name: '小龙女', score: '协同90' },
  { name: '楚留香', score: '规划89' },
  { name: '陆小凤', score: '协同88' },
  { name: '花满楼', score: '统筹85' },
  { name: '李寻欢', score: '规划84' },
  { name: '阿飞', score: '履约82' }
]);
</script>

<style scoped>
/* 悬浮粒子动画 */
@keyframes floatUp {
  0% { transform: translateY(0); opacity: 0; }
  50% { opacity: 0.3; }
  100% { transform: translateY(-120px); opacity: 0; }
}

/* 整体淡入动画 */
.fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 卡片悬浮特效 */
.category-panel {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.category-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px 0 rgba(15, 23, 42, 0.12), inset 0 1px 1px rgba(255, 255, 255, 1) !important;
}

/* 标签悬浮底色加深 */
.category-panel:nth-child(1) .custom-scrollbar > div:hover { background: rgba(37, 99, 235, 0.2) !important; }
.category-panel:nth-child(2) .custom-scrollbar > div:hover { background: rgba(5, 150, 105, 0.2) !important; }
.category-panel:nth-child(3) .custom-scrollbar > div:hover { background: rgba(124, 58, 237, 0.2) !important; }

/* 隐藏原生滚动条，美化自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
</style>