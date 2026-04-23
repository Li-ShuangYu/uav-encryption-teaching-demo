<template>
  <div class="cabin-container">
    <aside class="navigator">
      <div class="nav-title">🎯 实训任务进度</div>
      <div class="steps">
        <div 
          v-for="(step, idx) in steps" :key="step.id" 
          class="step-item"
          :class="{ 'is-active': currentStep === idx, 'is-done': currentStep > idx, 'is-locked': currentStep < idx }"
        >
          <div class="step-icon">{{ currentStep > idx ? '✓' : (idx + 1) }}</div>
          <div class="step-name">{{ step.name }}</div>
        </div>
      </div>
    </aside>

    <main class="workspace">
      <header class="ws-header">当前任务：抗重放攻击 (Anti-Replay) 逻辑编写</header>
      <div class="ide-mock">
        <div class="code-editor">
          <pre><code>
// [通信加密模块] 拦截验证逻辑
function verifyPacket(packet) {
    const decryptData = AES_Decrypt(packet.payload);
    // TODO: 在此处补充抗重放校验防线
    if (!decryptData) {
        return false;
    }
    return true;
}
          </code></pre>
        </div>
        <div class="terminal">
          > 编译失败: 拦截器未检测到时间戳 (Timestamp) 校验逻辑，存在重放攻击风险！
        </div>
      </div>
      <div class="ws-footer">
        <button class="btn-submit">提交并触发 AI 评估</button>
      </div>
    </main>

    <aside class="socratic-tutor">
      <div class="tutor-header">💡 苏格拉底导师 (Socratic Tutor)</div>
      <div class="chat-window">
        <div class="msg bot">你好！我是你的专属 AI 导师。</div>
        <div class="msg bot alert-msg">
          🔍 系统检测到你的终端报错：“未检测到时间戳校验”。
          <br/><b>思考一下：</b>如果黑客截获了昨天发送的有效加密包，今天原封不动地重新发送，你的代码能识别出这是一个“过期”的包吗？我们需要引入什么机制来对比时间差？
        </div>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="输入你的思路..." />
        <button>发送</button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentStep = ref(2); // 当前进行到第三步
const steps = ref([
  { id: 't1', name: '加密原理知识回顾' },
  { id: 't2', name: '通信架构设计图上传' },
  { id: 't3', name: '抗重放防御代码编写' },
  { id: 't4', name: '小组同侪互评' }
]);
</script>

<style scoped>
.cabin-container { display: flex; height: 100vh; background: #0f172a; color: #e2e8f0; font-family: sans-serif; }
.navigator { width: 240px; background: #1e293b; border-right: 1px solid #334155; padding: 20px; }
.nav-title { font-weight: bold; font-size: 16px; margin-bottom: 24px; color: #f8fafc; }
.steps { display: flex; flex-direction: column; gap: 16px; }
.step-item { display: flex; align-items: center; gap: 12px; opacity: 0.5; }
.step-item.is-done { opacity: 1; color: #10b981; }
.step-item.is-active { opacity: 1; color: #3b82f6; font-weight: bold; }
.step-icon { width: 24px; height: 24px; border-radius: 50%; background: #334155; display: flex; align-items: center; justify-content: center; font-size: 12px; }
.is-active .step-icon { background: #3b82f6; color: #fff; }
.is-done .step-icon { background: #10b981; color: #fff; }

.workspace { flex: 1; display: flex; flex-direction: column; padding: 20px; }
.ws-header { font-size: 18px; font-weight: bold; margin-bottom: 16px; }
.ide-mock { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.code-editor { flex: 3; background: #020617; border-radius: 8px; padding: 16px; font-family: monospace; color: #38bdf8; overflow: auto; border: 1px solid #334155; }
.terminal { flex: 1; background: #1e1b4b; border-radius: 8px; padding: 16px; color: #fca5a5; font-family: monospace; border: 1px solid #4c1d95; }
.ws-footer { margin-top: 16px; text-align: right; }
.btn-submit { background: #10b981; color: #fff; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-weight: bold; }

.socratic-tutor { width: 320px; background: #1e293b; border-left: 1px solid #334155; display: flex; flex-direction: column; }
.tutor-header { padding: 16px; background: #334155; font-weight: bold; border-bottom: 1px solid #475569; }
.chat-window { flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; }
.msg { padding: 10px 14px; border-radius: 8px; font-size: 14px; line-height: 1.5; max-width: 90%; }
.msg.bot { background: #3b82f6; align-self: flex-start; color: #fff; }
.msg.bot.alert-msg { background: #4c1d95; border: 1px solid #8b5cf6; }
.chat-input { padding: 16px; border-top: 1px solid #334155; display: flex; gap: 8px; }
.chat-input input { flex: 1; padding: 8px; background: #0f172a; border: 1px solid #475569; color: #fff; border-radius: 4px; outline: none; }
.chat-input button { background: #3b82f6; color: #fff; border: none; padding: 0 12px; border-radius: 4px; cursor: pointer; }
</style>