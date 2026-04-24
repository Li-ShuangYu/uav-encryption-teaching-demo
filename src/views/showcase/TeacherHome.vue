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
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1-.37-4.7 2.5 2.5 0 0 1 3.16-3.8 2.5 2.5 0 0 1 2.63-6.36zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 2.5 2.5 0 0 0 .37-4.7 2.5 2.5 0 0 0-3.16-3.8 2.5 2.5 0 0 0-2.63-6.36z"></path></svg>
            </div>
            <div class="card-info">
              <h3>教学智能体管理</h3>
              <p>AI思维导图/教学计划/PPT制作/智能出题/智能批改/学情评估助手</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">查看全部</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon">
               <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <div class="card-info">
              <h3>我的课程管理</h3>
              <p>创建课程、编辑课程、教学内容全流程管控与资源分配</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">去创建/管理</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div class="card-info">
              <h3>题库与试卷管理</h3>
              <p>动态题库维护、AI智能组卷、考试标准试卷一键生成</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">去管理</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="card-info">
              <h3>教学活动管理</h3>
              <p>预习/复习任务下发、作业收发管控、考试日程统一安排</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">去管理</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <div class="card-info">
              <h3>智能批改中心</h3>
              <p>作业/代码考试 AI 批量批改、多维度雷达图反馈管理</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">去批改</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <div class="card-info">
              <h3>班级与学员管理</h3>
              <p>班级学情全景画像、薄弱环节精准诊断、全局数据大屏统计</p>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">去查看</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 组件逻辑入口，遵循 Vue 3 setup 规范
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

/* Header 极致平铺优化 */
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

/* 平铺：基础数据 */
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

/* 平铺：个人中心与操作 */
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

/* Banner 报告级重构 */
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

.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f5ff;
  border-radius: 12px;
  color: #1a73e8;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(26,115,232,0.05);
}

.special-icon {
  background: linear-gradient(135deg, #1a73e8, #4fa3ff);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(26,115,232,0.2);
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: 20px;
  display: flex;
}

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

.btn-primary:hover {
  background: linear-gradient(90deg, #1557b0, #2563eb);
  box-shadow: 0 4px 10px rgba(26, 115, 232, 0.3);
}
</style>