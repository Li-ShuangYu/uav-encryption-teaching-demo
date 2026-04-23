<template>
  <div class="monitor-container">
    <header class="monitor-header">
      <h2>📡 实时监控大屏：进行中实训项目</h2>
      <div class="global-actions">
        <button class="btn-warn">广播提醒</button>
        <button class="btn-normal">强制结束</button>
      </div>
    </header>

    <div class="swimlanes">
      <div class="lane" v-for="stage in stages" :key="stage.id">
        <div class="lane-header">
          {{ stage.name }} <span class="badge">{{ getStudentsInStage(stage.id).length }}人</span>
        </div>
        <div class="lane-body">
          <div 
            v-for="stu in getStudentsInStage(stage.id)" :key="stu.id" 
            class="stu-card"
            :class="{ 'alert': stu.alertType }"
          >
            <div class="stu-name">{{ stu.name }}</div>
            <div class="stu-status" v-if="stu.alertType">
              ⚠️ {{ stu.alertType === 'idle' ? '超 10 分钟无操作' : 'AI评估连续未通过' }}
            </div>
            <div class="stu-status normal" v-else>🟢 正常推进中</div>
            <div class="card-actions">
              <button @click="intervene(stu)">接管干预</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟流程阶段（泳道表头）
const stages = ref([
  { id: 's1', name: '环节1：方案拟制' },
  { id: 's2', name: '环节2：AI智能评估' },
  { id: 's3', name: '环节3：抗重放代码实操' }
]);

// 模拟实时学生埋点与流转数据
const students = ref([
  { id: '1', name: '胡凯亮', currentStage: 's3', alertType: null },
  { id: '2', name: '靳雨静', currentStage: 's2', alertType: 'fail_loop' }, // AI评估死循环预警
  { id: '3', name: '刘炀', currentStage: 's1', alertType: 'idle' },     // 长时间无操作预警
  { id: '4', name: '宋清源', currentStage: 's2', alertType: null }
]);

const getStudentsInStage = (stageId) => students.value.filter(s => s.currentStage === stageId);

const intervene = (stu) => {
  alert(`正在请求建立与 ${stu.name} 的 1v1 屏幕接管通道...`);
};
</script>

<style scoped>
.monitor-container { display: flex; flex-direction: column; height: 100vh; background: #1e293b; color: #f8fafc; font-family: sans-serif; padding: 20px; }
.monitor-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-warn { background: #f59e0b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; margin-right: 10px; cursor: pointer; }
.btn-normal { background: #64748b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.swimlanes { flex: 1; display: flex; gap: 16px; overflow-x: auto; }
.lane { flex: 1; min-width: 300px; background: #334155; border-radius: 8px; display: flex; flex-direction: column; }
.lane-header { padding: 16px; font-weight: bold; border-bottom: 2px solid #475569; display: flex; justify-content: space-between; }
.badge { background: #3b82f6; padding: 2px 8px; border-radius: 12px; font-size: 12px; }
.lane-body { padding: 12px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.stu-card { background: #475569; padding: 12px; border-radius: 6px; border-left: 4px solid #10b981; }
.stu-card.alert { border-left-color: #ef4444; animation: pulse 2s infinite; }
.stu-name { font-weight: bold; font-size: 16px; margin-bottom: 6px; }
.stu-status { font-size: 12px; color: #fca5a5; margin-bottom: 10px; }
.stu-status.normal { color: #6ee7b7; }
.card-actions button { width: 100%; padding: 6px; background: rgba(255,255,255,0.1); color: #fff; border: none; border-radius: 4px; cursor: pointer; transition: 0.2s; }
.card-actions button:hover { background: #3b82f6; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
</style>