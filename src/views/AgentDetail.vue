<template>
  <div class="agent-detail-container">
    <header class="top-header">
      <div class="back-btn" @click="$router.back()">← 返回列表</div>
      <div class="agent-info">
        <!-- <img src="../assets/image/mdzx.png" alt="密盾智学" class="logo"> -->
        <h2>密盾智学 - </h2>
        <h2>{{ currentAgent.name || '智能体详情' }}</h2>
      </div>
    </header>

    <main class="main-content">
      <section class="left-panel">
        <div class="input-card">
          <h3>发送指令/提问</h3>
          <textarea 
            v-model="userInput" 
            placeholder="请输入问题..."
            class="chat-textarea"
            @keyup.enter.prevent="handleSendMessage"
            :disabled="isWaiting"
          ></textarea>
          <div class="button-group">
            <button class="clear-btn" @click="userInput = ''" :disabled="isWaiting">清空</button>
            <button 
              class="send-btn" 
              @click="handleSendMessage" 
              :disabled="isWaiting || !userInput.trim()"
            >
              {{ isWaiting ? '思考中...' : '提交' }}
            </button>
          </div>
        </div>
        
        <div class="agent-meta">
          <h4>智能体配置</h4>
          <p><strong>核心描述：</strong>{{ currentAgent.description || '加载中...' }}</p>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="label">使用角色：</span>
              <span class="value" :class="currentAgent.role === '教师使用' ? 'text-teacher' : 'text-student'">
                {{ currentAgent.role || '--' }}
              </span>
            </div>
            <div class="meta-item">
              <span class="label">介入环节：</span>
              <span class="value">{{ currentAgent.time || '--' }}</span>
            </div>
            <div class="meta-item">
              <span class="label">课程类型：</span>
              <span class="value">{{ currentAgent.courseType || '--' }}</span>
            </div>
            <div class="meta-item">
              <span class="label">交互进度：</span>
              <span class="value">{{ isFinished ? '阶段探讨完成' : `进行中 (已交互 ${currentStep} 次)` }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="right-panel">
        <div class="chat-records" ref="chatContainer">
          <div v-for="(chat, index) in chatList" :key="index" :class="['message', chat.role]">
            <div class="avatar">{{ chat.role === 'user' ? '用户' : 'AI' }}</div>
            <div class="content-box">
              <div v-if="chat.isLoading" class="content loading-text">
                {{ chat.content }}
              </div>
              <div v-else class="content">
                {{ chat.content }}
              </div>
              <div class="time" v-if="!chat.isLoading">{{ chat.timestamp }}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const currentAgent = ref({}); 
const chatScript = ref([]); 
const userInput = ref('');
const chatList = ref([]);
const isWaiting = ref(false); 
const chatContainer = ref(null); 
const currentStep = ref(0);
const isFinished = ref(false);

const getNowTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

const scrollToBottom = async () => {
  await nextTick(); 
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const initAgentData = () => {
  const storedAgent = localStorage.getItem('currentAgent');
  
  if (storedAgent) {
    try {
      currentAgent.value = JSON.parse(storedAgent);
    } catch (e) {
      console.error("解析 Agent 数据失败");
      fallbackData(); 
    }
  } else {
    fallbackData(); 
  }

  const dialogData = currentAgent.value.dialogues || {
    greeting: "你好，我是智能助手，请问有什么可以帮忙的？",
    script: []
  };

  chatScript.value = dialogData.script;

  chatList.value.push({
    role: 'assistant',
    content: dialogData.greeting,
    timestamp: getNowTime()
  });
  
  if (chatScript.value.length > 0) {
    userInput.value = chatScript.value[0].user;
  }
};

const fallbackData = () => {
  currentAgent.value = {
    name: "默认体验助手",
    role: "通用",
    description: "数据丢失，此为默认体验模式。",
    icon: "🤖",
    dialogues: {
      greeting: "抱歉，未获取到具体的智能体数据。此为默认模式。",
      script: [
        { user: "测试一下", ai: "由于是从外部直接刷新进入，未携带剧本数据。请返回列表页重新点击进入。" }
      ]
    }
  };
};

const handleSendMessage = () => {
  const text = userInput.value.trim();
  if (!text || isWaiting.value) return;
  
  chatList.value.push({ role: 'user', content: text, timestamp: getNowTime() });
  
  // 发送后立刻清空输入框，且保持可用状态
  userInput.value = '';
  isWaiting.value = true;
  scrollToBottom();

  const placeholderIndex = chatList.value.length;
  chatList.value.push({ role: 'assistant', content: '正在思考中...', isLoading: true });
  scrollToBottom();

  setTimeout(() => {
    // 正常走预设剧本
    if (currentStep.value < chatScript.value.length) {
      chatList.value[placeholderIndex] = {
        role: 'assistant',
        content: chatScript.value[currentStep.value].ai,
        timestamp: getNowTime(),
        isLoading: false
      };
      
      currentStep.value++;
      
      // 如果还有下一句，自动填入输入框
      if (currentStep.value < chatScript.value.length) {
        userInput.value = chatScript.value[currentStep.value].user;
      } else {
        isFinished.value = true;
      }
    } else {
      // 预设剧本走完后，如果用户继续乱输入，给予一个自然的兜底回复
      chatList.value[placeholderIndex] = {
        role: 'assistant',
        content: '您对知识的掌握非常扎实！作为体验演示，我们预设的深度探讨内容已结束。您可以继续梳理笔记，或返回列表体验其他教学智能体。',
        timestamp: getNowTime(),
        isLoading: false
      };
    }

    isWaiting.value = false;
    scrollToBottom();
  }, 1200); 
};

onMounted(() => {
  initAgentData();
});
</script>

<style scoped>
.agent-detail-container { display: flex; flex-direction: column; height: 100vh; background-color: #f4f7f9; }
.top-header { height: 64px; background: linear-gradient(90deg, #001529 0%, #003a8c 100%); display: flex; align-items: center; padding: 0 24px; color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.back-btn { cursor: pointer; opacity: 0.8; margin-right: 20px; font-weight: bold; }
.back-btn:hover { opacity: 1; }
.agent-info { display: flex; align-items: center; }
.agent-icon { font-size: 24px; margin-right: 10px; background: white; border-radius: 6px; padding: 2px 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);}
.agent-info h2 { margin: 0; font-size: 18px; letter-spacing: 1px; }

.main-content { display: flex; flex: 1; padding: 24px; gap: 24px; overflow: hidden; }

/* ======== 核心修改区域 ======== */
.left-panel { 
  flex: 0 0 460px; /* 原来是 380px，增加了80px，面板大幅变宽 */
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
}

.input-card { 
  background: #fff; 
  padding: 24px; 
  border-radius: 16px; 
  display: flex; 
  flex-direction: column; 
  height: 300px; /* 原来是 380px，降低了高度，防止把下面的配置项挤出滚动条 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
}
/* ============================== */

.input-card h3 { margin: 0 0 16px 0; color: #1f1f1f; font-size: 16px; border-left: 4px solid #1890ff; padding-left: 10px; }
.chat-textarea { flex: 1; margin-bottom: 16px; padding: 12px; border: 1px solid #d9d9d9; border-radius: 8px; resize: none; font-family: inherit; font-size: 14px; line-height: 1.6; color: #000000; outline: none; transition: all 0.3s; }
.chat-textarea::placeholder { color: #8c8c8c; }
.chat-textarea:focus { border-color: #40a9ff; box-shadow: 0 0 0 2px rgba(24,144,255,0.2); }
.chat-textarea:disabled { background-color: #f5f5f5; color: #595959; cursor: not-allowed; }
.button-group { display: flex; justify-content: flex-end; gap: 12px; }
.send-btn { background: #1890ff; color: white; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-weight: 500; }
.send-btn:hover:not(:disabled) { background: #40a9ff; }
.send-btn:disabled { background: #d9d9d9; cursor: not-allowed; }
.clear-btn { background: #fff; border: 1px solid #d9d9d9; padding: 10px 24px; border-radius: 6px; cursor: pointer; color: #595959; }

.agent-meta { background: #ffffff; padding: 20px; border-radius: 16px; border-top: 4px solid #1890ff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); flex: 1; overflow-y: auto; }
.agent-meta h4 { margin: 0 0 12px 0; color: #1890ff; }
.agent-meta p { font-size: 13px; color: #595959; line-height: 1.5; margin-bottom: 15px; }
.meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.meta-item { background: #f5f7fa; padding: 10px; border-radius: 6px; display: flex; flex-direction: column; }
.meta-item .label { font-size: 11px; color: #909399; margin-bottom: 4px; }
.meta-item .value { font-size: 13px; font-weight: bold; color: #303133; }
.text-teacher { color: #174ea6 !important; }
.text-student { color: #0d652d !important; }
.logo { height: 4vh; width: auto; object-fit: contain; }

/* 右侧对话面板现在会自动变窄，因为左侧变宽了 */
.right-panel { flex: 1; background: #fff; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.chat-records { flex: 1; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 24px; background: #fafafa; }
.message { display: flex; gap: 14px; }
.message.user { flex-direction: row-reverse; }
.avatar { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; flex-shrink: 0; }
.user .avatar { background: #1890ff; color: white; }
.assistant .avatar { background: #52c41a; color: white; }
.content-box { max-width: 80%; display: flex; flex-direction: column; }
.user .content-box { align-items: flex-end; }
.content { padding: 14px 18px; border-radius: 12px; line-height: 1.6; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); white-space: pre-wrap; }
.user .content { background: #1890ff; color: white; border-bottom-right-radius: 2px; }
.assistant .content { background: #fff; color: #262626; border: 1px solid #f0f0f0; border-bottom-left-radius: 2px; }
.time { font-size: 11px; color: #bfbfbf; margin-top: 6px; }
.loading-text { color: #1890ff !important; background: #e6f7ff !important; border: 1px dashed #1890ff !important; animation: pulse-animation 1.5s infinite; }
@keyframes pulse-animation { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
</style>