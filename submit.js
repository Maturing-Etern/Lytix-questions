/* ============================================================
   Lytix Staff Audition · Submission Module
   通过 EmailJS 发送到 QQ 邮箱
   ============================================================ */

"use strict";

// ── 已配置的 EmailJS 信息 ────────────────────────────
const CONFIG = {
  emailjsPublicKey: "GMrYGcurdsdElSzrI",
  emailjsServiceID: "service_n64a0l6",
  emailjsTemplateID: "template_clq0xih",
  toEmail: "55105890@qq.com",
  maxFileSize: 200 * 1024 * 1024,
  debug: true,
};


// ── Utilities ─────────────────────────────────────────

function showToast(msg, type) {
  const icons = { success: "[OK]", error: "[ERR]", warning: "[WARN]", info: "[INFO]" };
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type] || "[*]"}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = "slideIn 0.2s reverse forwards";
    setTimeout(() => el.remove(), 250);
  }, 4000);
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateForm(formData, questions) {
  for (const section of questions.sections) {
    for (const q of section.questions) {
      if (!q.required) continue;
      const val = formData[q.id];
      if (val === undefined || val === null || val === "" ||
          (Array.isArray(val) && val.length === 0))
        return q.text;
    }
  }
  return null;
}


// ── Data Collection ───────────────────────────────────

function collectFormData(positionId, questions) {
  const data = {
    _meta: {
      platform:    "Lytix Staff Audition",
      positionId,
      position:    POSITIONS.find(p => p.id === positionId)?.label ?? positionId,
      submittedAt: new Date().toISOString(),
      timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    applicant: {
      name:    document.getElementById("info-name")?.value?.trim() ?? "",
      contact: document.getElementById("info-contact")?.value?.trim() ?? "",
      remark:  document.getElementById("info-remark")?.value?.trim() ?? "",
    },
    // 用于邮件正文的纯文本答案汇总
    _answers: [],
  };

  for (const section of questions.sections) {
    const sec = { title: section.title, items: [] };
    for (const q of section.questions) {
      let answer = "";
      switch (q.type) {
        case "radio": {
          const sel = document.querySelector(`[name="${q.id}"]:checked`);
          answer = sel ? sel.value : "（未选择）";
          break;
        }
        case "checkbox": {
          const sel = document.querySelectorAll(`[name="${q.id}"]:checked`);
          answer = sel.length ? Array.from(sel).map(el => el.value).join("、") : "（未选择）";
          break;
        }
        case "textarea":
        case "input": {
          const el = document.getElementById(q.id);
          answer = el ? el.value.trim() : "";
          break;
        }
        case "upload": {
          const files = FILE_MAP[q.id] || [];
          answer = files.length
            ? files.map(f => `${f.name} (${formatFileSize(f.size)})`).join("；")
            : "（未上传）";
          break;
        }
      }
      sec.items.push(answer || "（未作答）");
    }
    data._answers.push(sec);
  }

  return data;
}


// ── 构建邮件正文（用 `|` 分隔，一行一题） ──────────

function buildEmailBody(data) {
  const meta = data._meta;
  const app = data.applicant;
  const symbolMap = { artist: "α", writer: "λ", composer: "ω", charter: "Δ", pv: "γ" };
  const sym = symbolMap[meta.positionId] || "";
  const timeStr = new Date(meta.submittedAt).toLocaleString("zh-CN");

  let lines = [];
  lines.push(`${sym} ${meta.position}`);
  lines.push(`申请人：${app.name}`);
  lines.push(`联系方式：${app.contact}`);
  if (app.remark) lines.push(`备注：${app.remark}`);
  lines.push(`时间：${timeStr}`);
  lines.push("");

  data._answers.forEach(section => {
    lines.push(`【${section.title}】`);
    section.items.forEach((ans, i) => {
      // 取题目文字（从原 questions 取）
      lines.push(`  ${ans}`);
    });
    lines.push("");
  });

  return lines.join("\n");
}


// ── 构建邮件 HTML（用于 {{{html_body}}}） ──────────

function buildEmailHtml(data) {
  const meta = data._meta;
  const app = data.applicant;
  const symbolMap = { artist: "α", writer: "λ", composer: "ω", charter: "Δ", pv: "γ" };
  const sym = symbolMap[meta.positionId] || "";
  const timeStr = new Date(meta.submittedAt).toLocaleString("zh-CN");

  let h = `<div style="font-family:'Microsoft YaHei','PingFang SC',sans-serif;font-size:14px;color:#333;">`;
  h += `<div style="background:#000;color:#fff;padding:16px;font-size:18px;text-align:center;">${sym} ${escHtml(meta.position)} · ${timeStr}</div>`;
  h += `<div style="padding:16px;">`;
  h += `<b>申请人：</b>${escHtml(app.name)}<br>`;
  h += `<b>联系方式：</b>${escHtml(app.contact)}<br>`;
  if (app.remark) h += `<b>备注：</b>${escHtml(app.remark)}<br>`;
  h += `<br>`;

  data._answers.forEach(section => {
    h += `<div style="margin:10px 0 4px;padding:6px 0;border-bottom:2px solid #000;font-weight:bold;">${escHtml(section.title)}</div>`;
    section.items.forEach(ans => {
      h += `<div style="margin:6px 0;padding:6px 10px;background:#f5f5f5;border-radius:3px;">${escHtml(ans)}</div>`;
    });
  });

  h += `</div></div>`;
  return h;
}

function escHtml(s) {
  if (s == null) return "";
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}


// ── Main Handler ──────────────────────────────────────

async function handleSubmit(positionId) {
  const btn = document.getElementById("submit-btn");
  const questions = QUESTIONS[positionId];
  if (!questions) { showToast("测评数据加载失败", "error"); return; }

  const formData = collectFormData(positionId, questions);

  const missing = validateForm(formData, questions);
  if (missing) { showToast(`请完成必填项：${missing.slice(0,30)}…`, "warning"); return; }
  if (!formData.applicant.name) { showToast("请填写姓名","warning"); document.getElementById("info-name")?.focus(); return; }
  if (!formData.applicant.contact) { showToast("请填写联系方式","warning"); document.getElementById("info-contact")?.focus(); return; }

  btn.classList.add("loading");
  btn.disabled = true;

  if (CONFIG.debug) {
    console.group("Lytix → EmailJS");
    console.log(JSON.stringify(formData, null, 2));
    console.groupEnd();
  }

  try {
    const htmlBody = buildEmailHtml(formData);
    const meta = formData._meta;
    const app = formData.applicant;
    const now = new Date().toLocaleString("zh-CN");

    emailjs.init(CONFIG.emailjsPublicKey);

    await emailjs.send(CONFIG.emailjsServiceID, CONFIG.emailjsTemplateID, {
      to_email: CONFIG.toEmail,
      subject: `[${meta.position}] Lytix 审核测评 · ${app.name}`,
      applicant_name: app.name,
      applicant_contact: app.contact,
      applicant_remark: app.remark || "无",
      position: meta.position,
      submitted_at: now,
      html_body: htmlBody,
    });

    showToast("已发送至 QQ 邮箱 ✅", "success");

    setTimeout(() => {
      document.getElementById("quiz-form").style.display = "none";
      document.getElementById("progress-bar").style.display = "none";
      document.getElementById("success-page").style.display = "block";
    }, 600);

  } catch (err) {
    console.error("[EmailJS Error]", err);
    showToast(`发送失败：${err.message || "网络异常"}`, "error");
  } finally {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}


// ── Progress ──────────────────────────────────────────

function calcProgress(positionId) {
  const questions = QUESTIONS[positionId];
  if (!questions) return 0;
  let total = 0, filled = 0;
  for (const section of questions.sections) {
    for (const q of section.questions) {
      if (!q.required) continue;
      total++;
      switch (q.type) {
        case "radio": if (document.querySelector(`[name="${q.id}"]:checked`)) filled++; break;
        case "checkbox": if (document.querySelectorAll(`[name="${q.id}"]:checked`).length) filled++; break;
        case "textarea": case "input": if (document.getElementById(q.id)?.value?.trim()) filled++; break;
        case "upload": if ((FILE_MAP[q.id] || []).length) filled++; break;
      }
    }
  }
  if (document.getElementById("info-name")?.value?.trim()) filled++, total++;
  if (document.getElementById("info-contact")?.value?.trim()) filled++, total++;
  return total === 0 ? 0 : Math.round((filled / total) * 100);
}
