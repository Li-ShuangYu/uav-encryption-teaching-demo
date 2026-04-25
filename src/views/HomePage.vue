<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="header-left">
        <div class="logo">
          <div class="logo-img-placeholder">
            <img src="@/assets/image/mdzx.png" alt="Logo" onerror="this.style.display='none'" />
            <span class="img-fallback-text">LOGO</span>
          </div>
          <span class="brand-title">密盾智学</span>
        </div>
      </div>

      <div class="header-right">
        <div class="search-bar">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="#8c9eb5" stroke-width="2" fill="none">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="搜索课程、学员、智能体..." />
        </div>

        <div class="nav-flat-group">
          <div class="nav-group-title">基础数据:</div>
          <div class="nav-item">标签管理</div>
          <div class="nav-item">学员管理</div>
          <div class="nav-item">题库管理</div>
        </div>

        <div class="divider"></div>

        <div class="user-actions-flat">
          <div class="user-profile">
            <div class="avatar-wrapper">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>" class="avatar" alt="avatar" />
            </div>
            <span class="user-name">个人中心</span>
          </div>
          <div class="action-item">账户设置</div>
          <div class="action-item logout">退出登录</div>
        </div>
      </div>
    </header>

    <section class="banner-premium">
      <div class="banner-bg-graphics"></div>
      <div class="banner-content">
        <div class="text-area">
          <h1 class="main-title">AI赋能教学<span class="dot">·</span>师生共创共享</h1>
          <p class="sub-title">专业、生动、直观，一站式报告级 AI 教学管理体验</p>
          <div class="data-badges">
            <span class="badge">智能算力引擎接入</span>
            <span class="badge">全链路学情追踪</span>
          </div>
        </div>
        
        <div class="graphic-area">
          <svg class="ai-illustration" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#4fa3ff;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:0" />
              </radialGradient>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#8ab4f8;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:0.2" />
              </linearGradient>
            </defs>
            <path d="M200 120 L100 60 M200 120 L80 160 M200 120 L300 50 M200 120 L320 170 M200 120 L200 30 M200 120 L200 210" stroke="url(#line-grad)" stroke-width="2" fill="none" />
            <path d="M100 60 L80 160 M300 50 L320 170 M100 60 L200 30 M300 50 L200 30" stroke="url(#line-grad)" stroke-width="1" stroke-dasharray="4 4" fill="none" opacity="0.5"/>
            <circle cx="200" cy="120" r="80" fill="url(#core-glow)" />
            <circle cx="200" cy="120" r="30" fill="#ffffff" opacity="0.9" />
            <circle cx="200" cy="120" r="45" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.4" stroke-dasharray="2 4"/>
            <circle cx="100" cy="60" r="8" fill="#ffffff" />
            <circle cx="80" cy="160" r="6" fill="#ffffff" opacity="0.8"/>
            <circle cx="300" cy="50" r="10" fill="#ffffff" />
            <circle cx="320" cy="170" r="7" fill="#ffffff" opacity="0.9"/>
            <circle cx="200" cy="30" r="5" fill="#ffffff" opacity="0.6"/>
            <circle cx="200" cy="210" r="6" fill="#ffffff" opacity="0.7"/>
            <path d="M160 120 A40 40 0 1 1 240 120 A40 40 0 1 1 160 120" stroke="#1a73e8" stroke-width="2" fill="none" stroke-dasharray="10 20">
              <animateTransform attributeName="transform" type="rotate" from="0 200 120" to="360 200 120" dur="20s" repeatCount="indefinite" />
            </path>
          </svg>
          <div class="particles">
            <div class="particle p1"></div>
            <div class="particle p2"></div>
            <div class="particle p3"></div>
          </div>
        </div>
      </div>
    </section>

    <main class="main-content">
      <div class="card-grid">
        
        <div class="card card-special">
          <div class="tag-special">教师专用</div>
          <div class="card-body">
            <div class="card-icon special-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="card-info">
              <h3>教授控制台</h3>
              <p>进入教师控制台，管理教学需求汇总、实训任务分发与学情数据总览。</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" @click="navigateToTeacher">进入教师端</button>
          </div>
        </div>

        <div class="card student-card" :class="{ 'card-active': selectedGroupIndex !== null }">
          <div class="card-body">
            <div class="card-icon student-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="card-info">
              <h3>学生工作台</h3>
              <p style="margin-bottom: 8px;">参与无人机密码系统实训。请先选择您的专属分组：</p>
              <div class="group-selectors">
                <button 
                  v-for="(group, index) in groups" 
                  :key="index"
                  @click="selectedGroupIndex = index"
                  class="group-dot"
                  :class="{ 'active': selectedGroupIndex === index }"
                  :style="{
                    backgroundColor: index === 0 ? '#3b82f6' : index === 1 ? '#ef4444' : index === 2 ? '#f59e0b' : '#a855f7',
                    boxShadow: selectedGroupIndex === index ? '0 0 12px rgba(' + (index === 0 ? '59, 130, 246' : index === 1 ? '239, 68, 68' : index === 2 ? '245, 158, 11' : '168, 85, 247') + ', 0.5)' : 'none'
                  }"
                  :title="group.title"
                ></button>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button 
              class="btn btn-primary" 
              @click="selectStudentGroup" 
              :disabled="selectedGroupIndex === null"
              :class="{ 'btn-disabled': selectedGroupIndex === null }"
            >进入实训</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon admin-icon">
               <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div class="card-info">
              <h3>管理控制台</h3>
              <p>进入管理控制台，进行全局系统设置、基础数据与账号权限运维。</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-admin" @click="navigateToAdmin">进入管理</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon ai-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div class="card-info">
              <h3>编程实训助手</h3>
              <p>AI智能辅助编程，提供代码调试、算法解析与项目智能纠错服务。</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-ai" @click="navigateToRobotDebug">启动助手</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon achievement-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M12 15l-2 5-1.5-3-4 2 2.5-4-3-1 4-1.5L12 6l1.5 2.5 4 1.5-3 1 2.5 4-4-2-1.5 3-2-5z"></path>
                <circle cx="12" cy="8" r="3"></circle>
              </svg>
            </div>
            <div class="card-info">
              <h3>成果展示</h3>
              <p>展示无人机密码系统工程教学成果，呈现课程建设理念与实践成效。</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" @click="navigateToAchievement">查看成果</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon profile-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="card-info">
              <h3>学情多维画像</h3>
              <p>基于全量数据的班级学习状态多维诊断，全景呈现学生能力分布与薄弱环节。</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" @click="navigateToClassProfile">查看画像</button>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedGroupIndex = ref(null)

// 四个组的数据配置，完全继承 InitialPage
const groups = [
  {
    title: '低功耗优化方向',
    algorithm: 'PRESENT 轻量级密码算法',
    persona: '极致的“精算师”与“极简主义者”',
    traits: ['极其自律', '务实导向', '算力断舍离'],
    style: '目标导向极强，懂得Trade-off（取舍）。别人追求花哨，你追求“刚刚好”和“性价比”。遇到问题第一反应永远是：“能不能再砍掉些冗余？”',
    borderClass: 'border-blue-900/40',
    activeBorderClass: 'border-blue-500',
    bgHighlightClass: 'bg-gradient-to-br from-blue-600 to-transparent',
    badgeBgClass: 'bg-blue-600',
    textClass: 'text-blue-400',
    tagClass: 'bg-blue-500 text-blue-300 border-blue-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]'
  },
  {
    title: '侧信道防护方向',
    algorithm: 'AES + 掩码与恒定时间防线',
    persona: '敏锐的“心理弈者”与“细节控”',
    traits: ['心思缜密', '极度敏锐', '防御型思维'],
    style: '习惯性保持防御姿态，做事滴水不漏。不仅关注正面逻辑，更关注“物理暗处”泄露的把柄。情绪稳定，深藏不露。',
    borderClass: 'border-red-900/40',
    activeBorderClass: 'border-red-500',
    bgHighlightClass: 'bg-gradient-to-br from-red-600 to-transparent',
    badgeBgClass: 'bg-red-600',
    textClass: 'text-red-400',
    tagClass: 'bg-red-500 text-red-300 border-red-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]'
  },
  {
    title: '抗重放攻击方向',
    algorithm: 'AES + 动态随机数校验协议',
    persona: '严谨的“秩序守卫者”与“史官”',
    traits: ['精神洁癖', '原则性强', '活在当下'],
    style: '对“炒冷饭”和“旧账”深恶痛绝，极其看重时效性。做事一码归一码，有着严格的校验机制和底线，绝不轻易让人钻空子。',
    borderClass: 'border-amber-900/40',
    activeBorderClass: 'border-amber-500',
    bgHighlightClass: 'bg-gradient-to-br from-amber-600 to-transparent',
    badgeBgClass: 'bg-amber-500',
    textClass: 'text-amber-400',
    tagClass: 'bg-amber-500 text-amber-300 border-amber-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]'
  },
  {
    title: '后量子算法适配方向',
    algorithm: 'Kyber 密钥封装防降维打击',
    persona: '前卫的“未来先锋”与“破壁人”',
    traits: ['危机意识', '高瞻远瞩', '拥抱变化'],
    style: '绝对的长期主义者，对颠覆性新技术充满好奇。具有宏观战略眼光，敢于做第一个吃螃蟹的人，哪怕被认为“杞人忧天”。',
    borderClass: 'border-purple-900/40',
    activeBorderClass: 'border-purple-500',
    bgHighlightClass: 'bg-gradient-to-br from-purple-600 to-transparent',
    badgeBgClass: 'bg-purple-600',
    textClass: 'text-purple-400',
    tagClass: 'bg-purple-500 text-purple-300 border-purple-800/50',
    shadowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]'
  }
];

// 选择学生组别并跳转
const selectStudentGroup = () => {
  if (selectedGroupIndex.value === null) return;
  
  // 获取选中的组信息
  const selectedGroup = groups[selectedGroupIndex.value];
  
  // 存储组别信息到localStorage
  const groupInfo = {
    groupId: selectedGroupIndex.value + 1,
    groupName: selectedGroup.title,
    algorithm: selectedGroup.algorithm,
    persona: selectedGroup.persona,
    traits: selectedGroup.traits,
    style: selectedGroup.style,
    colorTheme: {
      borderClass: selectedGroup.borderClass,
      activeBorderClass: selectedGroup.activeBorderClass,
      bgHighlightClass: selectedGroup.bgHighlightClass,
      badgeBgClass: selectedGroup.badgeBgClass,
      textClass: selectedGroup.textClass,
      tagClass: selectedGroup.tagClass,
      shadowClass: selectedGroup.shadowClass
    },
    selectTime: new Date().toISOString()
  };
  
  localStorage.setItem('selectedGroupInfo', JSON.stringify(groupInfo));
  console.log('组别信息已保存到localStorage:', groupInfo);
  
  router.push('/student/task-receive');
};

const navigateToTeacher = () => {
  router.push('/teacher/demand-summary');
};

const navigateToAdmin = () => {
  router.push('/admin');
};

const navigateToRobotDebug = () => {
  // 设置demo_state为1，并跳转
  localStorage.setItem('demo_state', '1')
  router.push('/student-debug/robot-debug')
};

const navigateToAchievement = () => {
  router.push('/detail');
};

const navigateToClassProfile = () => {
  router.push('/student-archive/class-competency/class1');
};
</script>

<style scoped>
:root {
  --primary-blue: #1a73e8;
  --primary-hover: #1557b0;
  --bg-color: #f8fafc;
  --text-main: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f7fb;
  overflow: hidden;
}

/* Header 样式保持不变 */
.header {
  height: 64px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 100;
  flex-shrink: 0;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img-placeholder {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1a73e8, #4fa3ff);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.logo-img-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-fallback-text {
  font-size: 8px;
  color: white;
  position: absolute;
  font-weight: bold;
}

.brand-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}

.header-right {
  gap: 24px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border-radius: 20px;
  padding: 6px 16px;
  width: 220px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  border-color: #bad3f8;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(26,115,232,0.1);
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  margin-left: 10px;
  font-size: 13px;
  width: 100%;
  color: #334155;
}

.nav-flat-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8fafc;
  padding: 4px 6px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.nav-group-title {
  font-size: 13px;
  color: #94a3b8;
  margin-right: 4px;
  margin-left: 8px;
  font-weight: 500;
}

.nav-item {
  font-size: 13px;
  color: #475569;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.nav-item:hover {
  background-color: #e2e8f0;
  color: #0f172a;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #e2e8f0;
}

.user-actions-flat {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  padding: 2px;
  border: 1px solid #cbd5e1;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.action-item {
  font-size: 13px;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
  font-weight: 500;
}

.action-item:hover {
  color: #1a73e8;
}

.action-item.logout:hover {
  color: #ef4444;
}

/* Banner 报告级重构保持不变 */
.banner-premium {
  height: 240px;
  background: linear-gradient(135deg, #eff5ff 0%, #ffffff 50%, #e2eeff 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid #d1e2fc;
  flex-shrink: 0;
}

.banner-bg-graphics {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    radial-gradient(circle at 10% 40%, rgba(26, 115, 232, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 90% 20%, rgba(26, 115, 232, 0.04) 0%, transparent 40%),
    linear-gradient(rgba(26, 115, 232, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 115, 232, 0.03) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
  z-index: 0;
}

.banner-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-area {
  flex: 1;
}

.main-title {
  font-size: 40px;
  color: #0f172a;
  font-weight: 900;
  letter-spacing: 2px;
  margin: 0 0 12px 0;
  text-shadow: 0 4px 12px rgba(255,255,255,0.8);
}

.main-title .dot {
  color: #1a73e8;
  margin: 0 8px;
}

.sub-title {
  font-size: 16px;
  color: #475569;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0 0 24px 0;
}

.data-badges {
  display: flex;
  gap: 12px;
}

.badge {
  background: rgba(26, 115, 232, 0.08);
  color: #1a73e8;
  border: 1px solid rgba(26, 115, 232, 0.2);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.graphic-area {
  width: 400px;
  height: 240px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-illustration {
  width: 100%;
  height: 100%;
}

.particles {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background-color: #4fa3ff;
  border-radius: 50%;
  animation: float 4s infinite ease-in-out;
}

.p1 { top: 30%; left: 10%; width: 6px; height: 6px; animation-delay: 0s; }
.p2 { top: 60%; right: 20%; width: 4px; height: 4px; animation-delay: 1s; background-color: #1a73e8; }
.p3 { bottom: 20%; left: 30%; width: 8px; height: 8px; animation-delay: 2s; opacity: 0.5; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 主体卡片区优化 */
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 32px 40px;
  overflow-y: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1300px;
  width: 100%;
  align-content: start;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #eef2f6;
  padding: 24px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 170px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(26, 115, 232, 0.08);
  border-color: #d1e2fc;
}

.card-active {
  border-color: #1a73e8 !important;
  box-shadow: 0 4px 20px rgba(26, 115, 232, 0.1) !important;
}

.card-special {
  background: linear-gradient(145deg, #f4f8fe 0%, #ffffff 100%);
  border: 1px solid #cce0ff;
}

.tag-special {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(90deg, #e0ebff, #cce0ff);
  color: #1a73e8;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  display: flex;
  gap: 16px;
}

/* 不同卡片专属图标配色 */
.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}

.special-icon {
  background: linear-gradient(135deg, #1a73e8, #4fa3ff);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(26,115,232,0.2);
}

.student-icon {
  background-color: #e0f2fe;
  color: #0284c7;
  box-shadow: inset 0 0 0 1px rgba(2,132,199,0.1);
}

.admin-icon {
  background-color: #fff1f2;
  color: #e11d48;
  box-shadow: inset 0 0 0 1px rgba(225,29,72,0.1);
}

.ai-icon {
  background-color: #f3e8ff;
  color: #9333ea;
  box-shadow: inset 0 0 0 1px rgba(147,51,234,0.1);
}

.achievement-icon {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(245,158,11,0.2);
}

.profile-icon {
  background-color: #dcfce7;
  color: #16a34a;
  box-shadow: inset 0 0 0 1px rgba(22,163,74,0.1);
}

.card-info {
  flex: 1;
}

.card-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #1e293b;
  font-weight: 700;
}

.card-info p {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

/* 移植过来的分组选择器样式 */
.group-selectors {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.group-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
  padding: 0;
}

.group-dot:hover {
  opacity: 1;
}

.group-dot.active {
  opacity: 1;
  transform: scale(1.2);
  border-color: #ffffff;
}

.card-footer {
  margin-top: 20px;
  display: flex;
}

/* 按钮样式体系 */
.btn {
  border: none;
  padding: 8px 20px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(90deg, #1a73e8, #3b82f6);
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(26, 115, 232, 0.2);
}

.btn-primary:hover:not(.btn-disabled) {
  background: linear-gradient(90deg, #1557b0, #2563eb);
  box-shadow: 0 4px 10px rgba(26, 115, 232, 0.3);
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #cbd5e1;
  box-shadow: none;
  color: #64748b;
}

/* 特色按钮差异化 */
.btn-admin {
  background: linear-gradient(90deg, #e11d48, #f43f5e);
  box-shadow: 0 2px 6px rgba(225, 29, 72, 0.2);
}

.btn-admin:hover {
  background: linear-gradient(90deg, #be123c, #e11d48);
  box-shadow: 0 4px 10px rgba(225, 29, 72, 0.3);
}

.btn-ai {
  background: linear-gradient(90deg, #9333ea, #a855f7);
  box-shadow: 0 2px 6px rgba(147, 51, 234, 0.2);
}

.btn-ai:hover {
  background: linear-gradient(90deg, #7e22ce, #9333ea);
  box-shadow: 0 4px 10px rgba(147, 51, 234, 0.3);
}
</style>