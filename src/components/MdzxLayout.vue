<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { Box, CaretBottom } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// ================= 数据定义 =================
const navItems = [
  { name: "学生能力画像", path: '/student-archive/competency/101', active: true },
  { name: "学生数字档案", path: '/student-archive/digital/101', dropdown: false },
  { name: "学生全息档案", path: '/student-archive/holographic/101', dropdown: false },
  { name: "学生对比画像", path: '/profile-dashboard', dropdown: false },
]

// 导航点击
const handleNavClick = (item: any) => {
  if (item.path) {
    router.push(item.path)
  }
}

// 跳转到教师学生分组页面
const goToTeacherStudentGroup = () => {
  router.push('/teacher/student-group')
}
</script>

<template>
  <div class="mdzx-layout">
    <header class="top-header">
      <div class="header-left">
        <!-- <el-icon class="sys-logo" :size="22" color="#409EFF"><Box /></el-icon> -->
        <span class="sys-title" @click="goToTeacherStudentGroup">密盾智学 / 学员画像</span>
      </div>
      <div class="header-right">
        <div class="nav-links">
          <div 
            v-for="(item, index) in navItems" 
            :key="index" 
            class="nav-item" 
            :class="{ active: route.path === item.path }"
            @click="handleNavClick(item)"
          >
            {{ item.name }}
            <el-icon v-if="item.dropdown" class="ml-1"><CaretBottom /></el-icon>
          </div>
        </div>
      </div>
    </header>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.ml-1 { margin-left: 4px; font-size: 12px; }

.mdzx-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 顶部导航条 */
.top-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .sys-title {
      font-size: 16px;
      font-weight: 600;
      color: #409EFF;
      letter-spacing: 1px;
      cursor: pointer;
      transition: color 0.3s ease;
      
      &:hover {
        color: #66b1ff;
      }
    }
  }

  .header-right {
    .nav-links {
      display: flex;
      gap: 10px;
      
      .nav-item {
        padding: 8px 16px;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 4px;
        transition: all 0.3s ease;
        
        &.active {
          background-color: #e6f1fc;
          color: #409EFF;
          font-weight: 500;
        }

        &:hover:not(.active) {
          color: #409EFF;
          background-color: #f5f7fa;
        }
      }
    }
  }
}

/* 内容区域 */
.content {
  flex: 1;
  overflow: auto;
  // padding: 20px;
  background-color: #f5f7fa;
}
</style>