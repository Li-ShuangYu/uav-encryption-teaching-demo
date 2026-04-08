<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <img src="../assets/image/mdzx.png" alt="密盾智学" class="logo">
        <h1>密盾智学-智能体管理</h1>
      </div>
      <div class="filters">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" v-model="searchText" placeholder="搜索智能体...">
        </div>
        <select v-model="roleFilter">
          <option value="all">使用角色</option>
          <option value="教师使用">教师使用</option>
          <option value="学生使用">学生使用</option>
        </select>
        <select v-model="timeFilter">
          <option value="all">使用时间</option>
          <option value="课前使用">课前使用</option>
          <option value="课中使用">课中使用</option>
          <option value="课后使用">课后使用</option>
        </select>
        <select v-model="courseTypeFilter">
          <option value="all">课程类型</option>
          <option value="理论类">理论类</option>
          <option value="实践类">实践类</option>
          <option value="综合类">综合类</option>
        </select>
        <select v-model="statusFilter">
          <option value="all">全部状态</option>
          <option value="1">已上架</option>
          <option value="0">待上架</option>
          <option value="-1">已下架</option>
        </select>
        <button class="btn-add">➕ 新增智能体</button>
      </div>
    </div>

    <div class="content">
      <div class="grid" v-if="filteredAgents.length > 0">
        <div 
          v-for="(agent, index) in paginatedAgents" 
          :key="index" 
          :class="['card', agent.role === '教师使用' ? 'bg-teacher' : 'bg-student']"
          @click="navigateToAgentDetail(agent)"
          style="cursor: pointer;"
        >
          <div 
            :class="['role-badge', agent.role === '教师使用' ? 'badge-teacher' : 'badge-student']"
          >
            {{ agent.role === '教师使用' ? '教师' : '学生' }}
          </div>
          
          <div class="card-header">
            <div class="icon">{{ agent.icon }}</div>
            <div class="title" :title="agent.name">{{ agent.name }}</div>
          </div>
          
          <div class="description" :title="agent.description">{{ agent.description }}</div>
          
          <div class="card-tags">
            <span class="info-tag">{{ agent.time }}</span>
            <span class="info-tag">{{ agent.courseType }}</span>
          </div>

          <div class="card-stats">
            <div class="stat-item">使用数：{{ agent.uses.toLocaleString() }}</div>
            <div class="stat-item">互动数：{{ agent.interactions.toLocaleString() }}</div>
          </div>

          <div class="card-footer">
            <span class="status-text">{{ getStatusText(agent.status) }}</span>
            <div class="card-actions">
              <a class="action-link" @click.stop>编排</a>
              <a class="action-link" @click.stop>编辑</a>
              <label class="switch" @click.stop>
                <input 
                  type="checkbox" 
                  :checked="agent.status === 1" 
                  @change="toggleStatus(agent)"
                >
                <span 
                  :class="['slider', agent.role === '教师使用' ? 'slider-teacher' : 'slider-student']"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        未找到匹配的智能体数据。
      </div>
    </div>

    <div class="pagination-container">
      <div class="stats-group">
        <span>智能体总数<b>{{ agents.length }}</b></span>
        <div class="stats-divider"></div>
        <span>已启用数量<b>{{ enabledAgentsCount }}</b></span>
        <div class="stats-divider"></div>
        <span>学生智能体<b>{{ studentAgentsCount }}</b></span>
        <span>教师智能体<b>{{ teacherAgentsCount }}</b></span>
        <div class="stats-divider"></div>
        <span>使用<b>{{ totalUses }}</b></span>
        <span>交互<b>{{ totalInteractions }}</b></span>
      </div>
      <div class="pagination">
        <div 
          class="pag-btn" 
          :class="{ disabled: currentPage === 1 }"
          @click="currentPage > 1 && currentPage--"
        >
          上一页
        </div>
        <div 
          v-for="page in pageNumbers" 
          :key="page"
          class="pag-btn"
          :class="{ active: currentPage === page, disabled: page === '...' }"
          @click="page !== '...' && (currentPage = page)"
        >
          {{ page }}
        </div>
        <div 
          class="pag-btn" 
          :class="{ disabled: currentPage === totalPages }"
          @click="currentPage < totalPages && currentPage++"
        >
          下一页
        </div>
        <div class="jump-box">
          跳至 <input 
            type="number" 
            class="jump-input" 
            v-model.number="jumpPage" 
            min="1" 
            :max="totalPages"
            @change="jumpToPage"
          > 页
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const ITEMS_PER_PAGE = 9;
const currentPage = ref(1);
const jumpPage = ref(1);
const searchText = ref('');
const roleFilter = ref('all');
const timeFilter = ref('all');
const courseTypeFilter = ref('all');
const statusFilter = ref('all');

const agents = ref([
  {
    name: '学情分析伙伴',
    type: '工作流',
    icon: '🧠',
    description: '采集前置知识薄弱点，推送个性化预习内容，生成学习路径。',
    role: '学生使用',
    time: '课前使用',
    courseType: '综合类',
    uses: 354,
    interactions: 519,
    status: 1,
    dialogues: {
      greeting: "你好！我是学情分析伙伴。系统检测到你即将开始学习《密码系统设计》，需要我为你生成专属预习路径吗？",
      script: [
        { user: "帮我看看我之前的薄弱点在哪里？", ai: "根据你的历史学习数据，你在“离散数学基础”和“模运算”部分的掌握率低于60%。建议先复习这部分。" },
        { user: "那我应该怎么复习？", ai: "我为你制定了针对性预习包：包含3道模运算基础题和一段10分钟的微课视频。完成这些可以提升新课理解度。" },
        { user: "好的，如果遇到不会的题怎么办？", ai: "你可以随时在这里向我提问，我会为你做步骤拆解。准备好开始第一题了吗？" },
        { user: "准备好了，出题吧。", ai: "第一题：计算 5 的 11 次方对 14 取模的值。提示：可以尝试使用快速幂算法来降低计算复杂度。" }
      ]
    }
  },
  {
    name: '理论导学伙伴',
    type: '工作流',
    icon: '📖',
    description: '讲解密码原理，演示加密机制，关联知识图谱，实时答疑。',
    role: '学生使用',
    time: '课中使用',
    courseType: '理论类',
    uses: 442,
    interactions: 669,
    status: 1,
    dialogues: {
      greeting: "我是《密码系统设计》专属理论助教，可引导你梳理课程知识点、解答理论疑问，需要帮忙吗？",
      script: [
        { 
          user: "帮我梳理对称与非对称密码的区别", 
          ai: "首先请你回忆一下，对称密码的核心特点是什么呢？另外，非对称密码又有怎样不同的特点？然后，你能说说对称密码和非对称密码在密钥管理方面分别是如何操作的吗？从这两个角度去思考，相信你能逐步梳理出它们的区别。" 
        },
        { 
          user: "对称密码\n特点：加密解密是同一把钥匙，速度快，适合大量数据。\n密钥管理：钥匙得提前偷偷传给对方，人多了钥匙数量会暴增，很麻烦。\n\n非对称密码\n特点：有公钥+私钥一对钥匙，公钥随便发，私钥自己留着，能验身份、防抵赖，但速度慢。\n密钥管理：只需要管好自己的私钥就行，分发简单，人多也不乱。", 
          ai: "非常棒，你总结得很准确！基于你刚刚说的这些内容，我们进一步来思考，从加密算法的角度看，对称密码算法和非对称密码算法在设计原理上有很大差异，你能说说可能体现在哪些方面吗？再结合应用场景来说，由于它们各自的特点和密钥管理方式不同，在实际应用场景的选择上又有哪些不同呢？从这两个新角度再思考，就能更全面梳理出它们的区别啦。" 
        },
        { 
          user: "一、设计原理上的差别\n对称密码：靠位运算、替换、移位这些简单操作，核心是把数据打乱混淆，结构简单直接。\n非对称密码：基于大数分解、离散对数这类数学难题，靠复杂数学关系保证公私钥配对，算法逻辑更复杂。\n\n二、应用场景上的选择\n对称密码：用来加密大体积数据，比如文件、视频、实时聊天内容，追求速度和效率。\n非对称密码：不适合大量数据，多用于身份验证、数字签名、安全传递对称密钥，比如HTTPS握手、网银身份确认。", 
          ai: "太厉害了，你的分析非常全面且准确！总结来说，对称与非对称密码在特点、密钥管理、设计原理及应用场景上都存在明显区别。对称密码加密解密使用同一密钥，密钥管理复杂，算法基于简单操作，适合大量数据加密；非对称密码使用公私钥对，密钥管理相对简单，算法基于复杂数学难题，适用于身份验证、签名等场景。\n\n给你留个思考题：在一个安全通信系统中，若既要保证数据传输效率，又要确保身份验证和不可抵赖性，该如何结合使用对称密码与非对称密码呢？" 
        },
        { 
          user: "先用非对称密码做两件事：\n1. 安全交换本次通信的对称密钥\n2. 配合私钥完成身份认证 + 数字签名，实现不可抵赖\n再用协商好的对称密钥加密传输大量业务数据，保证传输效率", 
          ai: "完全正确！你对这两种密码的结合应用理解得十分透彻。这种结合方式在很多实际的安全通信场景中都广泛使用，充分发挥了对称密码和非对称密码各自的优势。" 
        }
      ]
    }
  },
  {
    name: '智能编码伙伴',
    type: '工作流',
    icon: '💻',
    description: '代码提示，规范检查，安全漏洞预警，加速开发流程。',
    role: '学生使用',
    time: '课中使用',
    courseType: '实践类',
    uses: 566,
    interactions: 701,
    status: 1,
    dialogues: {
      greeting: "你好，我是你的智能编码伙伴。在写密码学相关代码时遇到了什么问题吗？",
      script: [
        { user: "我在用Python写RSA加密，但是生成的公钥每次加密同一个明文，密文都一样，这是对的吗？", ai: "标准的RSA加密同一个明文确实会生成相同的密文。但在实际应用中，为了防止选择明文攻击，通常会引入填充方案（如OAEP）。你使用了填充吗？" },
        { user: "没有，我就是直接用的公式 C = M^e mod n。", ai: "这被称为“教科书式RSA”，在工程上是不安全的。建议你引入 PKCS1_OAEP 模块进行随机填充。需要我给你一段示例代码吗？" },
        { user: "好的，请给我一段使用OAEP填充的Python代码。", ai: "这里是示例代码逻辑：\n导入 PKCS1_OAEP 模块 -> 加载公钥 -> 初始化 cipher 对象 -> 执行 encrypt(msg)。\n注意每次加密时 OAEP 都会生成随机的盐值，因此密文每次都不同。" },
        { user: "太棒了，修改后确实每次都不一样了。", ai: "很好！在工程实践中，安全算法不仅要看数学原理，更要看规范的实现。养成使用标准库和规范填充的好习惯非常重要。" }
      ]
    }
  },
  {
    name: '架构评审伙伴',
    type: '工作流',
    icon: '🔍',
    description: '自动评审密码系统架构、合规性、安全性与合理性。',
    role: '学生使用',
    time: '课后使用',
    courseType: '实践类',
    uses: 160,
    interactions: 295,
    status: 1,
    dialogues: {
      greeting: "你好，请描述你的密码系统架构设计思路，我来为你做合规与安全性评审。",
      script: [
        { user: "我的系统前端生成 AES 密钥，加密数据后传给后端落库，这样设计可以吗？", ai: "这里存在明显的安全隐患。前端环境是不可信的，AES是对称加密，如果在前端直接生成，密钥极易被提取和泄露。" },
        { user: "那我应该怎么改进这种架构？", ai: "建议使用“信封加密”或非对称协商：前端生成随机对称密钥加密数据，然后用后端的RSA或SM2公钥加密这个对称密钥。两者一起发给后端。" },
        { user: "听起来不错，那后端处理完要怎么把结果返回给前端？", ai: "后端处理完后，同样可以用之前前端传过来的那把对称密钥加密结果并返回，因为此时双方都已经安全地掌握了这把协商好的对称密钥。" },
        { user: "明白了，这就去修改我的系统架构图。", ai: "好的，修改完后随时发给我复审。记得评审标准里还包括了对国家商用密码标准（如SM2/SM3/SM4）的合规性要求哦。" }
      ]
    }
  },
  {
    name: '攻防协同伙伴',
    type: '工作流',
    icon: '🛡️',
    description: '模拟攻防场景，进行压力测试与安全审计，给出改进建议。',
    role: '学生使用',
    time: '课后使用',
    courseType: '实践类',
    uses: 238,
    interactions: 343,
    status: 1,
    dialogues: {
      greeting: "准备好进行攻防演练了吗？请指定你需要测试的目标系统或漏洞类型。",
      script: [
        { user: "我们今天测试一下针对登录接口的 SQL 注入攻击吧。", ai: "好的，模拟靶机已就绪。请尝试构造一段 Payload，使后台登录验证语句 `SELECT * FROM users WHERE user='[你的输入]' AND pass='...'` 变成恒真。" },
        { user: "我试试输入 admin' OR '1'='1", ai: "成功！拼接后的语句变成了 `WHERE user='admin' OR '1'='1' AND pass='...'`。成功利用短路求值绕过了密码验证环节。" },
        { user: "这么简单就攻破了，那防守方的代码应该怎么写才能防住？", ai: "最佳的底层防御实践是使用“预编译语句（PreparedStatement）”，它能在数据库层面将代码逻辑与数据输入强行分离，防止数据被当作指令解析。" },
        { user: "除了预编译，还有其他架构上的辅助防御手段吗？", ai: "当然，在架构层面可以配合WAF（Web应用防火墙）进行恶意流量清洗，并在后端逻辑层对输入参数进行严格的白名单校验和正则转义过滤。" }
      ]
    }
  },
  {
    name: '教学设计共创者',
    type: '工作流',
    icon: '📝',
    description: '自动生成教案、课件、习题、分组方案及任务单。',
    role: '教师使用',
    time: '课前使用',
    courseType: '综合类',
    uses: 395,
    interactions: 462,
    status: 1,
    dialogues: {
      greeting: "您好，老师！我是您的教案助手。请问您今天要准备哪门课程的教案？",
      script: [
        { user: "帮我生成一份《区块链技术基础》中关于“共识机制”的45分钟课时大纲。", ai: "建议分为以下四个模块：\n1. 拜占庭将军问题引入 (10分钟)\n2. PoW工作量证明原理 (15分钟)\n3. PoS权益证明原理 (10分钟)\n4. 课堂互动与小结 (10分钟)\n合适吗？" },
        { user: "结构不错，但能给“拜占庭将军”加个贴近学生生活的通俗例子吗？", ai: "可以用“宿舍合资点外卖”引入：4个人要在各自床帘里通过网络不好的微信统一点什么，甚至有人故意传假消息捣乱。这完美映射了分布式系统中的一致性难题。" },
        { user: "这个例子很好！把PoW和PoS的部分也通俗化一下，方便讲解。", ai: "没问题。PoW可比作“解高数题抢答得奖金”，算力越强解题越快；PoS可比作“按公司股份投票”，谁质押的代币多谁就有更大话语权。" },
        { user: "内容很详实了，先保存这个大纲吧。", ai: "已为您保存教案草稿至您的备课库。后续可随时导出为PPT格式，或随时唤醒我为您生成配套的随堂测试题和学生分组任务单。" }
      ]
    }
  },
  {
    name: '思政融合引导者',
    type: '工作流',
    icon: '🚩',
    description: '从“三维四库”精准匹配思政素材，自动嵌入教学环节。',
    role: '教师使用',
    time: '课前使用',
    courseType: '综合类',
    uses: 106,
    interactions: 172,
    status: 1,
    dialogues: {
      greeting: "老师好，我是思政融合引导者。请输入您本节课的核心知识点，我将为您匹配合适的思政元素。",
      script: [
        { user: "我这节课讲的是中国商用密码标准（如SM2, SM3, SM4）。", ai: "针对国密标准，建议思政切入点为：“科技自立自强与总体国家安全观”。可以引入中国密码发展史，强调摆脱国外技术依赖、实现核心技术自主可控的战略必要性。" },
        { user: "有什么具体的人物案例或者故事可以放在PPT里吗？", ai: "强烈推荐引入王小云院士的故事：她接连破解MD5和SHA-1两大国际权威哈希算法，并亲自主持设计了我国自主的SM3算法。这能极大激发学生的科研报国热情。" },
        { user: "这个案例非常有力量。在那课后作业中怎么体现思政目标呢？", ai: "可以布置一道开放性论述题：“结合当前复杂的国际网络空间安全形势，谈谈我国大力推广商用密码算法（如金融系统国密改造）的深远战略意义。”" },
        { user: "很好的主意，既巩固了知识又升华了主题，就用这个方案了。", ai: "很高兴能帮到您。将专业课程与思政教育如盐溶于水般自然结合，润物无声，能达到最佳的铸魂育人效果。" }
      ]
    }
  },
  {
    name: '评价督导共行者',
    type: '工作流',
    icon: '📊',
    description: '采集过程数据，自动评分，建立成长档案，预警AI过度依赖。',
    role: '教师使用',
    time: '课后使用',
    courseType: '综合类',
    uses: 270,
    interactions: 284,
    status: 1,
    dialogues: {
      greeting: "您好，我是评价督导助手。需要我为您分析最近一次实验课的学生过程表现数据吗？",
      script: [
        { user: "是的，帮我看看《网络抓包分析》这次实验的整体提交情况和分数分布。", ai: "分析完成。本次实验应交40人，实交39人，提交率 97.5%，平均分 82 分。但系统发现一个异常趋势：有 15% 的学生在撰写实验结论时，AI检测率超过了 80%。" },
        { user: "这么多？那是不是说明他们过度依赖大模型代写了？", ai: "是的，系统已触发“AI过度依赖二级预警”。这部分学生的报告多为宏观套话，缺乏对Wireshark真实抓包报文（如TCP三次握手标志位）的具体截图与细节分析。" },
        { user: "那我接下来应该怎么处理，有什么建议？", ai: "建议干预方案：1. 将这部分学生名单标记并一对一约谈。2. 在下节课公开强调学术诚信规范。3. 调整后续实验评分标准，增加“原始数据操作图表”的得分权重。" },
        { user: "好的，帮我把过度依赖AI的学生名单导出来，并拟一份提醒告警邮件。", ai: "已为您生成高频依赖名单文件。一份措辞严谨但具有教育意义的提醒邮件已存入您的邮箱草稿箱，请您审阅并选择是否发送。" }
      ]
    }
  }
]);

const filteredAgents = computed(() => {
  return agents.value.filter(agent => {
    const matchSearch = agent.name.toLowerCase().includes(searchText.value.toLowerCase()) || 
                        agent.description.toLowerCase().includes(searchText.value.toLowerCase());
    const matchRole = roleFilter.value === 'all' || agent.role === roleFilter.value;
    const matchTime = timeFilter.value === 'all' || agent.time === timeFilter.value;
    const matchCourseType = courseTypeFilter.value === 'all' || agent.courseType === courseTypeFilter.value;
    const matchStatus = statusFilter.value === 'all' || agent.status === parseInt(statusFilter.value);

    return matchSearch && matchRole && matchTime && matchCourseType && matchStatus;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredAgents.value.length / ITEMS_PER_PAGE);
});

const paginatedAgents = computed(() => {
  const startIdx = (currentPage.value - 1) * ITEMS_PER_PAGE;
  return filteredAgents.value.slice(startIdx, startIdx + ITEMS_PER_PAGE);
});

const enabledAgentsCount = computed(() => {
  return agents.value.filter(agent => agent.status === 1).length;
});

const studentAgentsCount = computed(() => {
  return agents.value.filter(agent => agent.role === '学生使用').length;
});

const teacherAgentsCount = computed(() => {
  return agents.value.filter(agent => agent.role === '教师使用').length;
});

const totalUses = computed(() => {
  return agents.value.reduce((sum, agent) => sum + agent.uses, 0).toLocaleString();
});

const totalInteractions = computed(() => {
  return agents.value.reduce((sum, agent) => sum + agent.interactions, 0).toLocaleString();
});

const pageNumbers = computed(() => {
  const pages = [];
  const total = totalPages.value;
  
  if (total <= 1) return pages;
  
  if (currentPage.value <= 6) {
    pages.push(1);
    if (total > 1) pages.push(total);
  } else if (currentPage.value >= total - 5) {
    pages.push(1);
    pages.push('...');
    for (let i = total - 7; i <= total; i++) {
      if (i > 0) pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push('...');
    for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(total);
  }
  
  return pages;
});

const toggleStatus = (agent) => {
  agent.status = agent.status === 1 ? 0 : 1;
};

const getStatusText = (status) => {
  if (status === 1) return '已上架';
  if (status === 0) return '待上架';
  return '已下架';
};

const jumpToPage = () => {
  if (jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
    currentPage.value = jumpPage.value;
  } else {
    jumpPage.value = currentPage.value;
  }
};

const navigateToAgentDetail = (agent) => {
  localStorage.setItem('currentAgent', JSON.stringify(agent));
  router.push('/agent-detail');
};

watch([searchText, roleFilter, timeFilter, courseTypeFilter, statusFilter], () => {
  currentPage.value = 1;
  jumpPage.value = 1;
});

watch(currentPage, (newPage) => {
  jumpPage.value = newPage;
});

</script>

<style scoped>
.container { width: 100vw; height: 100vh; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); display: flex; flex-direction: column; overflow: hidden; }
.header { padding: 0 2.5vw; border-bottom: 1px solid #e8e8e8; display: flex; justify-content: space-between; align-items: center; height: 8vh; box-sizing: border-box; flex-shrink: 0; }
.header-left { display: flex; align-items: center; gap: 1vw; }
.logo { height: 4vh; width: auto; object-fit: contain; }
.header h1 { font-size: 2.6vh; color: #1f2329; margin: 0; font-weight: 600; }
.filters { display: flex; gap: 1.2vw; align-items: center; }
.search-box { position: relative; display: flex; align-items: center; }
.search-icon { position: absolute; left: 1vw; color: #8f959e; font-size: 2vh; }
.search-box input { padding: 1vh 1vw 1vh 3.2vw; border: 1px solid #dcdfe6; border-radius: 6px; font-size: 1.6vh; width: 14vw; outline: none; transition: border-color 0.2s; }
.search-box input:focus { border-color: #3370ff; }
select { padding: 1vh 2.5vw 1vh 1.2vw; border: 1px solid #dcdfe6; border-radius: 6px; font-size: 1.6vh; color: #1f2329; background-color: white; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238f959e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 1vw center; background-size: 1.4vh auto; }
.btn-add { background-color: #3370ff; color: #ffffff; border: none; border-radius: 6px; padding: 1vh 1.5vw; font-size: 1.6vh; cursor: pointer; transition: background-color 0.2s; display: flex; align-items: center; gap: 0.5vw; }
.btn-add:hover { background-color: #2b5cce; }
.content { flex: 1; padding: 2vh 2.5vw; overflow: hidden; display: flex; flex-direction: column; }
.empty-state { grid-column: 1/-1; text-align: center; padding: 5vh; font-size: 2vh; color: #8f959e; display: flex; align-items: center; justify-content: center; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 2.5vh 2vw; flex: 1; min-height: 0; }
.card { border-radius: 10px; padding: 1.8vh 1.5vw; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.04); border: 1px solid transparent; transition: all 0.2s; position: relative; overflow: hidden; box-sizing: border-box; }
.card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); transform: translateY(-4px); }
.card > * { flex-shrink: 0; }
.bg-teacher { background-color: #f4f8fe; border-color: #e6f0ff; }
.bg-student { background-color: #f3fcf4; border-color: #e6ffe6; }
.role-badge { position: absolute; top: 0; right: 0; padding: 0.5vh 1.2vw; font-size: 1.4vh; font-weight: 500; border-bottom-left-radius: 10px; }
.badge-teacher { background-color: #d2e3fc; color: #174ea6; }
.badge-student { background-color: #ceead6; color: #0d652d; }
.card-header { display: flex; align-items: center; gap: 1vw; }
.icon { font-size: 3vh; width: 5vh; height: 5vh; display: flex; justify-content: center; align-items: center; border-radius: 10px; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
.title { font-size: 2.2vh; font-weight: 600; color: #1f2329; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.description { font-size: 1.6vh; color: #333333; line-height: 1.6; min-height: 5.2vh; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; white-space: normal; }
.card-tags { display: flex; gap: 0.8vw; }
.info-tag { font-size: 1.4vh; padding: 0.4vh 0.8vw; border-radius: 4px; background-color: rgba(255,255,255,0.7); color: #555555; border: 1px solid #dee0e3; }
.card-stats { display: flex; gap: 1.5vw; font-size: 1.5vh; color: #666666; }
.stat-item { white-space: nowrap; }
.card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5vh; border-top: 1px solid rgba(0,0,0,0.06); }
.status-text { font-size: 1.6vh; color: #1f2329; font-weight: 500; }
.card-actions { display: flex; align-items: center; gap: 1.2vw; }
.action-link { font-size: 1.6vh; color: #3370ff; cursor: pointer; text-decoration: none; transition: opacity 0.2s; font-weight: 500; }
.action-link:hover { opacity: 0.7; }
.switch { position: relative; display: inline-block; width: 3.8vw; height: 2.2vh; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 2.2vh; }
.slider:before { position: absolute; content: ""; height: 1.6vh; width: 1.6vh; left: 0.3vh; bottom: 0.3vh; background-color: white; transition: .4s; border-radius: 50%; }
input:checked + .slider-teacher { background-color: #8ab4f8; }
input:checked + .slider-student { background-color: #81c995; }
input:checked + .slider:before { transform: translateX(calc(3.8vw - 2.2vh)); }
.pagination-container { display: flex; justify-content: space-between; align-items: center; padding: 0 2.5vw; height: 8vh; box-sizing: border-box; border-top: 1px solid #e8e8e8; flex-shrink: 0; background-color: #fff; white-space: nowrap; }
.stats-group { display: flex; gap: 1.2vw; font-size: 1.6vh; color: #333333; align-items: center; white-space: nowrap; }
.stats-group span { display: flex; align-items: center; gap: 0.4vw; }
.stats-group b { color: #1f2329; font-size: 1.8vh; }
.stats-divider { width: 1px; height: 2vh; background-color: #dcdfe6; margin: 0 0.2vw; }
.pagination { display: flex; align-items: center; gap: 0.5vw; white-space: nowrap; }
.pag-btn { padding: 0.6vh 1vw; border: 1px solid #dcdfe6; border-radius: 6px; background: white; color: #1f2329; font-size: 1.6vh; cursor: pointer; transition: all 0.2s; min-width: 1.8vw; text-align: center; }
.pag-btn:hover:not(.disabled) { border-color: #3370ff; color: #3370ff; }
.pag-btn.active { background: #3370ff; color: white; border-color: #3370ff; }
.pag-btn.disabled { color: #c0c4cc; cursor: not-allowed; background: #f5f7fa; }
.jump-box { display: flex; align-items: center; gap: 0.5vw; font-size: 1.6vh; color: #333; margin-left: 1vw; }
.jump-input { width: 3.2vw; padding: 0.5vh; border: 1px solid #dcdfe6; border-radius: 6px; text-align: center; outline: none; font-size: 1.6vh; }
</style>