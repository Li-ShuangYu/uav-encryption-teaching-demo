<template>
  <div class="builder-container">
    <aside class="palette">
      <div class="panel-title">📦 流程组件库</div>
      <div class="component-list">
        <div class="comp-item" v-for="comp in componentLibrary" :key="comp.type" @click="addNode(comp)">
          <span class="icon">{{ comp.icon }}</span> {{ comp.label }}
        </div>
      </div>
    </aside>

    <main class="canvas">
      <div class="canvas-header">
        <h2>🛠 实训编排：无人机通信加密 AI 评估体系</h2>
        <button class="btn-primary">发布实训</button>
      </div>
      <div class="pipeline">
        <div 
          v-for="(node, index) in flowNodes" :key="node.id" 
          class="flow-node"
          :class="{ 'is-active': activeNode?.id === node.id }"
          @click="activeNode = node"
        >
          <div class="node-header">
            <span>{{ index + 1 }}. {{ node.label }}</span>
            <button class="btn-del" @click.stop="removeNode(index)">×</button>
          </div>
          <div class="node-desc">{{ node.desc }}</div>
        </div>
        <div class="add-placeholder" v-if="flowNodes.length === 0">👈 请从左侧点击添加流程节点</div>
      </div>
    </main>

    <aside class="config-panel">
      <div class="panel-title">⚙️ 节点属性配置</div>
      <div v-if="activeNode" class="config-form">
        <div class="form-item">
          <label>节点名称</label>
          <input type="text" v-model="activeNode.label" />
        </div>
        <div class="form-item" v-if="activeNode.type === 'ai_eval'">
          <label>AI 评估量表 (Rubric)</label>
          <select v-model="activeNode.config.rubricId">
            <option value="r1">通信加密安全标准 v2.0</option>
            <option value="r2">抗重放攻击有效性测度</option>
          </select>
        </div>
        <div class="form-item">
          <label>通关条件</label>
          <select v-model="activeNode.config.passCondition">
            <option value="submit">提交即通过</option>
            <option value="ai_score_60">AI 评分 ≥ 60分</option>
          </select>
        </div>
      </div>
      <div v-else class="empty-tip">请在画布中选中一个节点</div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟左侧组件库
const componentLibrary = ref([
  { type: 'doc', icon: '📄', label: '理论学习与文档阅读', desc: '支持 Markdown / PDF 渲染' },
  { type: 'upload', icon: '📤', label: '方案设计与上传', desc: '学生提交架构方案' },
  { type: 'ai_eval', icon: '🤖', label: 'AI 方案智能评估', desc: '基于预设大模型与量表打分' },
  { type: 'ide', icon: '💻', label: 'Web IDE 代码实操', desc: '挂载外部沙箱容器环境' }
]);

// 模拟已编排的流程节点数据
const flowNodes = ref([
  { id: 'n1', type: 'doc', label: '无人机通信加密原理', desc: '必修理论阅读', config: { passCondition: 'submit' } },
  { id: 'n2', type: 'upload', label: '防窃听方案拟制', desc: '要求提交时序图', config: { passCondition: 'submit' } },
  { id: 'n3', type: 'ai_eval', label: 'AI 方案评估拦截', desc: '校验加密逻辑是否闭环', config: { passCondition: 'ai_score_60', rubricId: 'r1' } }
]);

const activeNode = ref(null);

const addNode = (comp) => {
  flowNodes.value.push({
    id: 'node_' + Date.now(), type: comp.type, label: comp.label, desc: '新建节点',
    config: { passCondition: 'submit' }
  });
};
const removeNode = (idx) => { flowNodes.value.splice(idx, 1); activeNode.value = null; };
</script>

<style scoped>
.builder-container { display: flex; height: 100vh; background: #f1f5f9; color: #334155; font-family: sans-serif; }
.palette { width: 260px; background: #fff; border-right: 1px solid #e2e8f0; padding: 16px; }
.canvas { flex: 1; display: flex; flex-direction: column; padding: 20px; overflow-y: auto; }
.config-panel { width: 300px; background: #fff; border-left: 1px solid #e2e8f0; padding: 16px; }
.panel-title { font-size: 16px; font-weight: bold; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; }
.comp-item { padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 10px; cursor: pointer; transition: 0.2s; }
.comp-item:hover { background: #e0e7ff; border-color: #818cf8; }
.canvas-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.btn-primary { background: #3b82f6; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
.pipeline { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.flow-node { width: 400px; background: #fff; border: 2px solid #cbd5e1; border-radius: 8px; padding: 12px; cursor: pointer; position: relative; }
.flow-node::after { content: '↓'; position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); color: #94a3b8; }
.flow-node:last-child::after { display: none; }
.flow-node.is-active { border-color: #3b82f6; box-shadow: 0 4px 12px rgba(59,130,246,0.2); }
.node-header { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 6px; }
.btn-del { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 16px; }
.form-item { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
.form-item input, .form-item select { padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
</style>