# Lytix Staff Audition Platform

纯静态前端站点，应聘者提交后数据通过 EmailJS 自动发到你的 QQ 邮箱。

## 配置状态 ✅（已就绪）

| 项目 | 值 |
|------|-----|
| Public Key | `GMrYGcurdsdElSzrI` |
| Service ID | `service_n64a0l6` |
| Template ID | `template_clq0xih` |
| 收件邮箱 | `55105890@qq.com` |
| 邮件主题 | `{{subject}}` |
| 邮件正文 | `{{{html_body}}}`（三段花括号输出原始 HTML） |

> 如果重新部署或迁移到其他账号，只需在 `submit.js` 中修改这三个配置值。

## 部署方式

纯静态站点，任意托管平台均可：

- **Netlify**：拖拽项目文件夹到 https://app.netlify.com/drop
- **GitHub Pages**：推送到 GitHub → Settings → Pages → 选 main 分支
- **任意静态服务器**：上传所有文件即可

## 文件结构

```
index.html       测评主页（三步流程）
style.css        全局样式（纯黑 + 数学函数 SVG 背景）
questions.js     题目数据（5 个岗位）
submit.js        提交逻辑（EmailJS → QQ 邮箱）
viewer.html      .lytix 文件查看器（备用）
```

## 数据流

1. 用户选择岗位 → 填写个人信息 + 答题
2. 提交 → `collectFormData()` → `buildEmailHtml()`（生成排版好的 HTML）
3. `emailjs.send()` → 你的 QQ 邮箱

## 注意事项

- EmailJS 免费版每月 200 封，超出可升级或注册新账号
