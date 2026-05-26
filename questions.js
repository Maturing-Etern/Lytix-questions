// Lytix 审核测评题目数据
// 各岗位占位题目，待替换为 Title 文件夹中的正式题目

const POSITIONS = [
  { id: "artist",    label: "画师",       symbol: "α", color: "#ffffff" },
  { id: "writer",    label: "剧情策划",   symbol: "λ", color: "#ffffff" },
  { id: "composer",  label: "曲师",       symbol: "ω", color: "#ffffff" },
  { id: "charter",   label: "谱师",       symbol: "Δ", color: "#ffffff" },
  { id: "pv",        label: "PV制作员",   symbol: "γ", color: "#ffffff" },
];

// ─────────────────── 评分量表说明 ───────────────────
// 主观题 / 作品展示题 均使用 5分 量化评审
// 1=未完成  2=基础完成  3=达到要求  4=良好  5=优秀

const QUESTIONS = {

  // ─── 画师 ─────────────────────────────────────────
  artist: {
    intro: "本测评用于考察报名画师的基础美术能力、角色设计能力以及与 Lytix 风格的契合度。请认真完成以下题目。",
    sections: [
      {
        title: "基础能力自评",
        questions: [
          {
            id: "a_exp",
            type: "radio",
            required: true,
            text: "您的插画创作经验年限？",
            options: ["不足 1 年", "1–2 年", "3–5 年", "5 年以上"],
          },
          {
            id: "a_style",
            type: "checkbox",
            required: true,
            text: "您擅长的画风（可多选）",
            options: ["日系二次元", "写实风格", "赛博朋克", "国风水墨", "像素/点阵", "其他"],
          },
          {
            id: "a_software",
            type: "checkbox",
            required: true,
            text: "常用绘图软件（可多选）",
            options: ["Clip Studio Paint", "Adobe Photoshop", "Procreate", "SAI / SAI2", "Krita", "其他"],
          },
        ],
      },
      {
        title: "命题创作",
        questions: [
          {
            id: "a_theme",
            type: "textarea",
            required: true,
            placeholder: "请在 300 字以内描述您对主题的理解及构图思路",
            text: "【命题】以「星海裂变」为主题，设计一名 Lytix 原创角色。请简述角色设定（性格、背景、视觉特征）以及构图思路。",
          },
          {
            id: "a_work",
            type: "upload",
            required: true,
            accept: "image/*",
            text: "请上传命题插画作品（支持 PNG / JPG / WEBP，单文件不超过 10 MB）",
            hint: "作品须为本次命题原创，禁止 AI 生成",
          },
          {
            id: "a_portfolio",
            type: "upload",
            required: false,
            accept: "image/*",
            multiple: true,
            text: "【选做】上传往期代表作品（最多 3 张）",
            hint: "有助于审核员全面了解您的创作水平",
          },
        ],
      },
      {
        title: "开放问题",
        questions: [
          {
            id: "a_process",
            type: "textarea",
            required: true,
            placeholder: "请描述您的创作流程与习惯",
            text: "请描述您从接到约稿到完稿的典型工作流程，以及您通常如何处理修改意见？",
          },
          {
            id: "a_collab",
            type: "radio",
            required: true,
            text: "您是否有与音游项目合作的经历？",
            options: ["有，且为主力美术", "有，但只是协助", "没有，但了解音游美术风格", "没有相关经历"],
          },
        ],
      },
    ],
  },

  // ─── 剧情策划 ─────────────────────────────────────
  writer: {
    intro: "本测评考察报名者的世界观构建、角色塑造与剧情叙事能力，以及对 Lytix 游戏叙事风格的理解。",
    sections: [
      {
        title: "基础能力自评",
        questions: [
          {
            id: "w_exp",
            type: "radio",
            required: true,
            text: "您的文案/剧本创作经验年限？",
            options: ["不足 1 年", "1–2 年", "3–5 年", "5 年以上"],
          },
          {
            id: "w_type",
            type: "checkbox",
            required: true,
            text: "您有哪些类型的创作经历（可多选）",
            options: ["游戏剧情/世界观", "小说/轻小说", "剧本/剧场", "歌词创作", "商业文案", "其他"],
          },
        ],
      },
      {
        title: "命题写作",
        questions: [
          {
            id: "w_world",
            type: "textarea",
            required: true,
            placeholder: "限 500 字以内",
            text: "【命题】请为 Lytix 设计一段简短的世界观背景设定，要求融入「音律」与「裂变」两个核心概念，体现独特的科幻或奇幻风格。",
          },
          {
            id: "w_story",
            type: "textarea",
            required: true,
            placeholder: "限 800 字以内",
            text: "【命题】基于上述世界观，创作一段场景对话（不少于 3 个角色），展现角色个性与冲突。",
          },
          {
            id: "w_song",
            type: "textarea",
            required: true,
            placeholder: "限 200 字以内",
            text: "【命题】为曲目「零界点」撰写一段曲目故事介绍（即 in-game 歌曲故事文本），要求有代入感、简洁有力。",
          },
        ],
      },
      {
        title: "开放问题",
        questions: [
          {
            id: "w_ref",
            type: "textarea",
            required: false,
            placeholder: "如有，请附上可访问的链接或作品名称",
            text: "请列举您最满意的 1–2 件往期创作，并简述它们的亮点。",
          },
          {
            id: "w_game",
            type: "radio",
            required: true,
            text: "您是否接触过其他音游的剧情内容？",
            options: ["深度了解多款音游剧情", "了解 1–2 款", "了解较少，但愿意深入研究", "几乎没有接触"],
          },
        ],
      },
    ],
  },

  // ─── 曲师 ─────────────────────────────────────────
  composer: {
    intro: "本测评考察报名者的音乐创作能力、风格多样性及与 Lytix 音游风格的适配程度。",
    sections: [
      {
        title: "基础能力自评",
        questions: [
          {
            id: "c_exp",
            type: "radio",
            required: true,
            text: "您从事音乐创作的年限？",
            options: ["不足 1 年", "1–3 年", "3–5 年", "5 年以上"],
          },
          {
            id: "c_genre",
            type: "checkbox",
            required: true,
            text: "您擅长的音乐风格（可多选）",
            options: ["Electronic / EDM", "Hardcore / Speedcore", "Future Bass", "Orchestral / 交响", "Jazz / Lo-fi", "J-Core / 同人音乐", "其他"],
          },
          {
            id: "c_daw",
            type: "checkbox",
            required: true,
            text: "常用 DAW（可多选）",
            options: ["FL Studio", "Ableton Live", "Logic Pro", "Cubase / Nuendo", "Studio One", "其他"],
          },
          {
            id: "c_bpm",
            type: "radio",
            required: true,
            text: "您通常创作的 BPM 范围？",
            options: ["80–120 BPM（中速）", "120–160 BPM（快速）", "160–200+ BPM（高速）", "无固定范围，随曲调整"],
          },
        ],
      },
      {
        title: "作品提交",
        questions: [
          {
            id: "c_demo",
            type: "upload",
            required: true,
            accept: "audio/*",
            text: "请上传一首您的原创音乐 Demo（MP3 / WAV / FLAC，时长 1–5 分钟，不超过 50 MB）",
            hint: "作品须为本人原创，不得使用他人素材（采样除外并需注明）",
          },
          {
            id: "c_demo_desc",
            type: "textarea",
            required: true,
            placeholder: "请描述该曲目的创作背景、风格定位及你认为的亮点",
            text: "对上传的 Demo 进行简要说明",
          },
          {
            id: "c_portfolio_link",
            type: "input",
            required: false,
            placeholder: "如 网易云/SoundCloud/BiliBili 主页链接",
            text: "【选做】您的音乐主页/作品集链接",
          },
        ],
      },
      {
        title: "开放问题",
        questions: [
          {
            id: "c_adapt",
            type: "textarea",
            required: true,
            placeholder: "请具体说明您会如何调整",
            text: "若策划要求您将现有曲目调整为特定 BPM 或加入指定风格元素，您会如何应对？",
          },
          {
            id: "c_collab",
            type: "radio",
            required: true,
            text: "您是否有与音游/同人团队合作创作的经历？",
            options: ["有正式发布的合作曲目", "有合作但未发布", "没有，但有意愿", "没有相关经历"],
          },
        ],
      },
    ],
  },

  // ─── 谱师 ─────────────────────────────────────────
  charter: {
    intro: "本测评考察报名者对音乐节奏的理解、谱面设计能力及对 Lytix 判定机制的掌握程度。",
    sections: [
      {
        title: "基础能力自评",
        questions: [
          {
            id: "ch_exp",
            type: "radio",
            required: true,
            text: "您制谱的经验年限？",
            options: ["不足 1 年", "1–2 年", "2–4 年", "4 年以上"],
          },
          {
            id: "ch_game",
            type: "checkbox",
            required: true,
            text: "您有为哪些游戏制谱的经历（可多选）",
            options: ["Cytus / Cytus II", "Arcaea", "Phigros", "Malody / osu!", "Lanota", "MILTHM", "其他"],
          },
          {
            id: "ch_tool",
            type: "checkbox",
            required: true,
            text: "使用过的制谱工具（可多选）",
            options: ["Cytoid / Cylheim", "Arcaea Chart Editor", "RPE (Re：Phigros Editor)", "PhiEdit", "自研工具", "其他"],
          },
          {
            id: "ch_diff",
            type: "radio",
            required: true,
            text: "您最擅长制作的难度区间？",
            options: ["入门级（适合新手，清晰节奏为主）", "中等难度（有一定复杂度）", "高难度（密集/复杂 pattern）", "均衡，能覆盖全难度"],
          },
        ],
      },
      {
        title: "命题制谱",
        questions: [
          {
            id: "ch_chart",
            type: "upload",
            required: true,
            accept: ".json,.xml,.zip,.rar",
            text: "请上传命题曲目的谱面文件（支持 .json / .xml / .zip，不超过 20 MB）",
            hint: "命题音频将另行提供；请基于所给音频制作 EASY + HARD 两个难度",
          },
          {
            id: "ch_design",
            type: "textarea",
            required: true,
            placeholder: "请从节拍对齐、难度曲线、pattern 设计等角度说明",
            text: "请说明您的谱面设计思路，如何体现音乐结构和游玩体验？",
          },
          {
            id: "ch_video",
            type: "upload",
            required: false,
            accept: "video/*,image/*",
            text: "【选做】上传谱面游玩视频截图或录屏（有助于审核员快速预览）",
            hint: "最大 100 MB，支持 MP4 / GIF / PNG",
          },
        ],
      },
      {
        title: "开放问题",
        questions: [
          {
            id: "ch_balance",
            type: "textarea",
            required: true,
            placeholder: "请说明您的设计原则",
            text: "您如何在游玩挑战性与普通玩家可接受度之间取得平衡？",
          },
          {
            id: "ch_milestone",
            type: "textarea",
            required: false,
            placeholder: "如有，请注明出处/项目名称",
            text: "【选做】请列举您最满意的 1–2 张谱面，并说明其亮点。",
          },
        ],
      },
    ],
  },

  // ─── PV 制作员 ────────────────────────────────────
  pv: {
    intro: "本测评考察报名者的视频制作能力、镜头语言表达，以及对 Lytix 视觉风格的理解与还原能力。",
    sections: [
      {
        title: "基础能力自评",
        questions: [
          {
            id: "p_exp",
            type: "radio",
            required: true,
            text: "您的视频创作/剪辑经验年限？",
            options: ["不足 1 年", "1–2 年", "2–4 年", "4 年以上"],
          },
          {
            id: "p_type",
            type: "checkbox",
            required: true,
            text: "您有哪些类型的视频创作经历（可多选）",
            options: ["音游 PV / 宣传片", "MV 制作", "Motion Graphics", "3D 动画", "短视频剪辑", "其他"],
          },
          {
            id: "p_software",
            type: "checkbox",
            required: true,
            text: "常用软件（可多选）",
            options: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Blender", "Cinema 4D", "其他"],
          },
        ],
      },
      {
        title: "作品提交",
        questions: [
          {
            id: "p_work",
            type: "upload",
            required: true,
            accept: "video/*",
            text: "请上传一份您的代表性视频作品（MP4 / MOV，不超过 200 MB）",
            hint: "若文件过大，可提交网络链接（填写在下方文本框）",
          },
          {
            id: "p_link",
            type: "input",
            required: false,
            placeholder: "如 BiliBili / YouTube / Google Drive 链接",
            text: "视频作品外链（与上方上传二选一，或同时提供）",
          },
          {
            id: "p_work_desc",
            type: "textarea",
            required: true,
            placeholder: "请说明作品的创作思路、使用技术及亮点",
            text: "对上传/提交的作品进行简要说明",
          },
        ],
      },
      {
        title: "命题设计",
        questions: [
          {
            id: "p_concept",
            type: "textarea",
            required: true,
            placeholder: "限 400 字以内",
            text: "【命题】为曲目「Singularity」设计 PV 分镜思路，要求体现音游氛围、高燃节奏感。请描述开场、副歌及结尾的关键视觉设计。",
          },
          {
            id: "p_storyboard",
            type: "upload",
            required: false,
            accept: "image/*,.pdf",
            text: "【选做】上传分镜板草稿（图片或 PDF，不超过 20 MB）",
          },
        ],
      },
      {
        title: "开放问题",
        questions: [
          {
            id: "p_deadline",
            type: "radio",
            required: true,
            text: "在 2–3 周的制作周期内，您预计可交付的 PV 质量等级？",
            options: ["成品级（可直接发布）", "精修级（需少量调整）", "Demo 级（展示核心效果）", "视曲目复杂度而定"],
          },
          {
            id: "p_collab",
            type: "textarea",
            required: false,
            placeholder: "请简述合作经历及发布平台",
            text: "【选做】您是否有参与音游或音乐 PV 制作的合作经历？请简述。",
          },
        ],
      },
    ],
  },

};
