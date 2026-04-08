<template>
  <div class="w-full h-full p-4 lg:p-6 bg-[#0F172A] grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 content-center relative overflow-hidden">
    
    <div class="absolute inset-0 z-0 pointer-events-none" style="background-image: radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.5) 0%, transparent 70%);"></div>

    <div 
      v-for="(group, gIndex) in groups" 
      :key="gIndex"
      class="flex flex-col rounded-[16px] border bg-slate-900/60 backdrop-blur-2xl shadow-xl overflow-hidden z-10"
      :class="themes[gIndex].border"
    >
      <div 
        class="px-5 py-3 border-b flex justify-between items-center"
        :class="[themes[gIndex].headerBg, themes[gIndex].border]"
      >
        <h2 class="text-xl font-black flex items-center gap-2 tracking-wide" :class="themes[gIndex].text">
          <span class="text-2xl drop-shadow-sm">{{ themes[gIndex].icon }}</span> 组 {{ gIndex + 1 }}
        </h2>
        <span 
          class="text-sm font-bold px-3 py-1 rounded-full border shadow-inner tracking-wider"
          :class="[themes[gIndex].badgeBg, themes[gIndex].text, themes[gIndex].border]"
        >
          {{ group.length }} 人
        </span>
      </div>

      <div class="p-4 flex flex-row gap-3 flex-1">
        <div 
          v-for="student in group" 
          :key="student.name"
          @click="goToStudent(student)"
          class="flex-1 cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center gap-2 border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group/card"
          :class="[themes[gIndex].cardBg, themes[gIndex].border, themes[gIndex].hoverBg]"
        >
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black shadow-sm transition-transform duration-300 group-hover/card:scale-110"
            :class="[themes[gIndex].avatarBg, themes[gIndex].text]"
          >
            {{ student.name.charAt(0) }}
          </div>
          
          <span class="text-white text-base font-bold tracking-wider whitespace-nowrap">
            {{ student.name }}
          </span>
          
          <div 
            class="text-xl font-mono font-black tracking-tight"
            :class="themes[gIndex].text"
          >
            {{ student.score }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 跳转逻辑
const goToStudent = (student) => {
  console.log('点击了学生:', student.name);
  // 将学生ID存储到localStorage
  localStorage.setItem('currentStudentId', student.id.toString());
  router.push({ path: '/student-archive/competency/101' });
};

// 原始学生名单
const allStudents = [
  { id: 101, name: '林浩轩', score: 95 }, { id: 102, name: '李若曦', score: 94 },
  { id: 103, name: '刘承宇', score: 92 }, { id: 104, name: '黄雨桐', score: 90 },
  { id: 105, name: '陈宇泽', score: 98 }, { id: 106, name: '许诗涵', score: 95 },
  { id: 107, name: '赵景辰', score: 94 }, { id: 108, name: '张语桐', score: 92 },
  { id: 109, name: '王嘉树', score: 97 }, { id: 110, name: '苏欣妍', score: 96 },
  { id: 111, name: '周子恒', score: 94 }, { id: 112, name: '邓佳宁', score: 92 }
];

const groups = ref([[], [], [], []]);

// 4 种颜色主题配置
const themes = [
  { // 组 1: 蓝
    icon: '🔷', text: 'text-[#60A5FA]', border: 'border-[#3B82F6]/30', 
    headerBg: 'bg-[#3B82F6]/10', cardBg: 'bg-[#3B82F6]/5', hoverBg: 'hover:bg-[#3B82F6]/20 hover:border-[#3B82F6]/60',
    avatarBg: 'bg-[#3B82F6]/20', badgeBg: 'bg-[#3B82F6]/10'
  },
  { // 组 2: 红
    icon: '🔴', text: 'text-[#F87171]', border: 'border-[#EF4444]/30', 
    headerBg: 'bg-[#EF4444]/10', cardBg: 'bg-[#EF4444]/5', hoverBg: 'hover:bg-[#EF4444]/20 hover:border-[#EF4444]/60',
    avatarBg: 'bg-[#EF4444]/20', badgeBg: 'bg-[#EF4444]/10'
  },
  { // 组 3: 黄
    icon: '🟡', text: 'text-[#FBBF24]', border: 'border-[#F59E0B]/30', 
    headerBg: 'bg-[#F59E0B]/10', cardBg: 'bg-[#F59E0B]/5', hoverBg: 'hover:bg-[#F59E0B]/20 hover:border-[#F59E0B]/60',
    avatarBg: 'bg-[#F59E0B]/20', badgeBg: 'bg-[#F59E0B]/10'
  },
  { // 组 4: 紫
    icon: '🟪', text: 'text-[#A78BFA]', border: 'border-[#8B5CF6]/30', 
    headerBg: 'bg-[#8B5CF6]/10', cardBg: 'bg-[#8B5CF6]/5', hoverBg: 'hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/60',
    avatarBg: 'bg-[#8B5CF6]/20', badgeBg: 'bg-[#8B5CF6]/10'
  }
];

// 初始化固定分组
onMounted(() => {
  // 删除localStorage中的currentStudentId
  localStorage.removeItem('currentStudentId');
  
  // 固定分组：每3个学生一组
  const newGroups = [
    [allStudents[0], allStudents[1], allStudents[2]],    // 组1: 林浩轩, 李若曦, 刘承宇
    [allStudents[3], allStudents[4], allStudents[5]],    // 组2: 黄雨桐, 陈宇泽, 许诗涵
    [allStudents[6], allStudents[7], allStudents[8]],    // 组3: 赵景辰, 张语桐, 王嘉树
    [allStudents[9], allStudents[10], allStudents[11]]   // 组4: 苏欣妍, 周子恒, 邓佳宁
  ];
  
  groups.value = newGroups;
});
</script>