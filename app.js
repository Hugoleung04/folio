/* Folio — local-first PDF study notebook */
(() => {
  if (typeof pdfjsLib !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js";
  }

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const APP_VERSION = "1.1.1";

  const I18N = {
    en: {
      brandSub: "Study library",
      upload: "Upload PDF",
      blank: "Blank notebook",
      addPage: "+ Page",
      addPageTitle: "Add a page after this one",
      addPageHint: "Choose PDF lined paper, or a Word page you can type on.",
      choicePdf: "PDF remark page",
      choicePdfHint: "Lined paper. Draw with the pen or paste photos.",
      choiceWord: "Word page",
      choiceWordHint: "Type directly, like Microsoft Word.",
      wordHead: "Word page — type here",
      wordPh: "Start typing…",
      pageMemos: "Page memos",
      noPageMemos: "No memos on pages yet. Use the comment or text tool, then click a memo to edit it.",
      image: "Photo",
      pasted: "Photo added to this page",
      pickImage: "Choose a photo",
      topicsAll: "All",
      topicsNone: "Uncategorized",
      topicNew: "+ Topic",
      topicSet: "Topic",
      topicPrompt: "Topic name (same name = same group)",
      topicHint: "One main topic per note. Similar notes sit together. You or Grok can fill this later.",
      dropHere: "Drop here to file under this topic",
      noneYet: "No notes in this topic yet.",
      github: "GitHub",
      sync: "Sync",
      ghTitle: "GitHub library",
      ghHint: "Grok uploads PDFs to this repo. Click Sync on this device to see them.",
      ghToken: "Token (private repo only)",
      ghNeed: "Set owner/repo first (GitHub button).",
      syncing: "Syncing from GitHub…",
      syncOk: "Sync finished",
      syncFail: "Sync failed. Check repo name and that library/ exists.",
      syncNew: " new file(s)",
      memoOn: "p.",
      save: "Save",
      download: "Download PDF",
      library: "Library",
      libraryHint: "Upload lecture slides or papers. Annotate them. Add extra pages for your own remarks.",
      search: "Search titles…",
      remarks: "Remarks",
      remarkPh: "Write a remark for this document…",
      addRemark: "Add remark",
      open: "Open",
      del: "Delete",
      deletePage: "Delete this page",
      cannotDeleteOrig: "Original PDF pages cannot be deleted. Only pages you added.",
      confirmDelPage: "Delete this added page?",
      confirmDelItem: "Delete this item?",
      itemDeleted: "Deleted",
      rename: "Rename",
      uploadCard: "Upload PDF",
      uploadHint: "Saved only on this device",
      sampleCard: "Open sample",
      sampleHint: "Try the included lecture page",
      templateCard: "Lined notebook",
      templateHint: "Start from a blank template",
      noMatch: "No matching documents.",
      noRemarks: "No remarks yet. Use the box below, or add a remark page in the PDF.",
      savedBrowser: "Saved in this browser",
      deleted: "Deleted",
      onlyPdf: "Only PDF files are supported",
      savedLib: "Saved to library",
      notFound: "Document not found",
      cannotOpen: "Could not open this PDF",
      adding: "Adding remark page…",
      addedAfter: "Remark page added after page ",
      building: "Building annotated PDF…",
      dlStart: "Download started",
      exportFail: "Export failed",
      nothingUndo: "Nothing to undo on this page",
      leave: "Leave without saving changes?",
      confirmDel: "Delete this file? This cannot be undone.",
      unsaved: "Your PDFs stay on this device",
      page: "Page",
      remarkPage: "Remark page",
      sticky: "Sticky comment…",
      typeOn: "Type on the page…",
      cancel: "Cancel",
      place: "Place",
      notebookPrefix: "Notebook ",
      pyNeed: "Need a local server. Double-click start.bat (Windows) or run start.sh.",
      pen: "Pen", highlighter: "Highlighter", text: "Text", comment: "Comment", eraser: "Eraser", undo: "Undo", image: "Photo"
    },
    zh: {
      brandSub: "學習書庫",
      upload: "上傳 PDF",
      blank: "空白筆記簿",
      addPage: "+ 新頁",
      addPageTitle: "在目前頁之後加入一頁",
      addPageHint: "可選 PDF 橫線頁，或可直接打字的 Word 頁。",
      choicePdf: "PDF 備註頁",
      choicePdfHint: "橫線紙，可用筆書寫或貼上圖片。",
      choiceWord: "Word 頁",
      choiceWordHint: "像 Word 一樣直接打字。",
      wordHead: "Word 頁 — 直接在這裡打字",
      wordPh: "開始輸入…",
      pageMemos: "頁面備註",
      noPageMemos: "尚未有貼在頁上的備註。用文字或便利貼工具新增，點一下即可修改。",
      image: "圖片",
      pasted: "已把圖片放到這一頁",
      pickImage: "選擇圖片",
      topicsAll: "全部",
      topicsNone: "未分類",
      topicNew: "+ 主題",
      topicSet: "主題",
      topicPrompt: "主題名稱（相同名稱會放在同一組）",
      topicHint: "每份筆記一個主主題，同類會排在一起。你可以自己分，或之後讓 Grok 填。",
      dropHere: "拖到這裡歸入此主題",
      noneYet: "此主題尚未有筆記。",
      github: "GitHub",
      sync: "同步",
      ghTitle: "GitHub 書庫",
      ghHint: "Grok 把 PDF 放到這個 repo。在這部電腦按「同步」就會出現。",
      ghToken: "Token（只有私人 repo 才需要）",
      ghNeed: "請先在 GitHub 按鈕填 owner/repo。",
      syncing: "正在從 GitHub 同步…",
      syncOk: "同步完成",
      syncFail: "同步失敗。請檢查 repo 名稱，以及是否有 library/ 資料夾。",
      syncNew: " 個新檔",
      memoOn: "第",
      save: "儲存",
      download: "下載 PDF",
      library: "書庫",
      libraryHint: "上傳講義或論文，直接在上面書寫、註解，並可插入新的備註頁。",
      search: "搜尋標題…",
      remarks: "備註",
      remarkPh: "為這份文件寫備註…",
      addRemark: "新增備註",
      open: "開啟",
      del: "刪除",
      deletePage: "刪除此頁",
      cannotDeleteOrig: "原本的 PDF 頁不能刪。只能刪你後來加入的頁。",
      confirmDelPage: "刪除這張你加入的頁？",
      confirmDelItem: "刪除此項目？",
      itemDeleted: "已刪除",
      rename: "重新命名",
      uploadCard: "上傳 PDF",
      uploadHint: "只保存在這部裝置",
      sampleCard: "開啟範例",
      sampleHint: "試用內建講義頁",
      templateCard: "橫線筆記簿",
      templateHint: "由空白範本開始",
      noMatch: "沒有符合的文件。",
      noRemarks: "尚未有備註。可用下方輸入框，或在 PDF 加入備註頁。",
      savedBrowser: "已儲存在此瀏覽器",
      deleted: "已刪除",
      onlyPdf: "只支援 PDF 檔",
      savedLib: "已加入書庫",
      notFound: "找不到文件",
      cannotOpen: "無法開啟此 PDF",
      adding: "正在加入備註頁…",
      addedAfter: "已在第 ",
      addedAfter2: " 頁之後插入備註頁",
      building: "正在產生註解 PDF…",
      dlStart: "開始下載",
      exportFail: "匯出失敗",
      nothingUndo: "這一頁沒有可復原的筆劃",
      leave: "尚未儲存，確定離開？",
      confirmDel: "刪除此檔？此操作無法復原。",
      unsaved: "PDF 只保存在這部裝置",
      page: "第",
      remarkPage: "備註頁",
      sticky: "便利貼備註…",
      typeOn: "在頁面上輸入文字…",
      cancel: "取消",
      place: "放置",
      notebookPrefix: "筆記簿 ",
      pyNeed: "需要本機伺服器。請雙擊 start.bat（Windows）或執行 start.sh。",
      pen: "筆", highlighter: "螢光筆", text: "文字", comment: "便利貼", eraser: "擦膠", undo: "復原", image: "圖片"
    }
  };

  const state = {
    lang: localStorage.getItem("folio-lang") || "zh",
    view: "library",
    docs: [],
    current: null,
    pdf: null,
    pageCount: 0,
    pageNum: 1,
    scale: 1.15,
    scaleMin: 0.4,
    scaleMax: 4.5,
    tool: "pen",
    color: "#1a1d24",
    drawing: null,
    dirty: false,
    renderToken: 0,
    topicFilter: "all",
  };

  const t = (key) => (I18N[state.lang] || I18N.zh)[key] || I18N.en[key] || key;

  const HIGHLIGHT_COLORS = {
    "#1a1d24": "rgba(26,29,36,0.22)",
    "#c0392b": "rgba(192,57,43,0.28)",
    "#1e6f5c": "rgba(30,111,92,0.28)",
    "#1d4e89": "rgba(29,78,137,0.28)",
    "#f1c40f": "rgba(241,196,15,0.38)",
  };

  /* ---------- IndexedDB ---------- */
  const FolioDB = (() => {
    const DB_NAME = "folio-notes";
    let dbp;
    function open() {
      if (dbp) return dbp;
      dbp = new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
          if (!req.result.objectStoreNames.contains("docs")) {
            req.result.createObjectStore("docs", { keyPath: "id" });
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
      return dbp;
    }
    async function list() {
      const db = await open();
      return new Promise((resolve, reject) => {
        const req = db.transaction("docs").objectStore("docs").getAll();
        req.onsuccess = () => {
          const rows = req.result || [];
          rows.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
          resolve(rows);
        };
        req.onerror = () => reject(req.error);
      });
    }
    async function get(id) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const req = db.transaction("docs").objectStore("docs").get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }
    async function put(doc) {
      doc.updatedAt = Date.now();
      const db = await open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("docs", "readwrite");
        tx.objectStore("docs").put(doc);
        tx.oncomplete = () => resolve(doc);
        tx.onerror = () => reject(tx.error);
      });
    }
    async function remove(id) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("docs", "readwrite");
        tx.objectStore("docs").delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }
    return { list, get, put, remove };
  })();

  function uid() {
    return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random();
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function fmtDate(ts) {
    try {
      return new Date(ts).toLocaleString(state.lang === "zh" ? "zh-HK" : undefined, {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch {
      return "";
    }
  }

  function applyI18n() {
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$("[data-i18n-title]").forEach((el) => { el.title = t(el.dataset.i18nTitle); });
    $("#brandSub").textContent = t("brandSub");
    const ver = $("#appVersion");
    if (ver) ver.textContent = "v" + APP_VERSION;
    if (state.view === "library") $("#docTitle").textContent = t("unsaved");
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  }

  function toBytes(data) {
    if (!data) return new Uint8Array();
    if (data instanceof Uint8Array) return data;
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
    return new Uint8Array(data);
  }

  function ensureSequence(doc, pdfPageCount) {
    if (Array.isArray(doc.sequence) && doc.sequence.length) return doc.sequence;
    const seq = [];
    const n = pdfPageCount || doc.pageCount || 1;
    for (let i = 1; i <= n; i++) {
      seq.push({ kind: "pdf", pdfIndex: i, legacyNote: (doc.notePages || []).includes(i) });
    }
    doc.sequence = seq;
    if (!doc.wordDocs) doc.wordDocs = {};
    return seq;
  }

  function seqCount() {
    return (state.current && state.current.sequence) ? state.current.sequence.length : state.pageCount;
  }

  function ensurePageData(doc, page) {
    if (!doc.annots) doc.annots = {};
    const key = String(page);
    if (!doc.annots[key]) doc.annots[key] = { strokes: [], texts: [], images: [] };
    if (!doc.annots[key].images) doc.annots[key].images = [];
    if (!doc.annots[key].texts) doc.annots[key].texts = [];
    if (!doc.annots[key].strokes) doc.annots[key].strokes = [];
    return doc.annots[key];
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  /* ---------- Library ---------- */
  async function refreshLibrary() {
    state.docs = await FolioDB.list();
    renderGrid($("#search").value || "");
  }

  function topicKey(name) {
    return String(name || "").trim();
  }

  function savedTopicNames() {
    try { return JSON.parse(localStorage.getItem("folio-topics") || "[]"); }
    catch { return []; }
  }

  function rememberTopic(name) {
    const n = topicKey(name);
    if (!n) return;
    const list = savedTopicNames();
    if (!list.includes(n)) {
      list.push(n);
      localStorage.setItem("folio-topics", JSON.stringify(list));
    }
  }

  function allTopics() {
    const set = new Set(savedTopicNames());
    state.docs.forEach((d) => { if (topicKey(d.topic)) set.add(topicKey(d.topic)); });
    return [...set].sort((a, b) => a.localeCompare(b, state.lang === "zh" ? "zh-Hant" : "en"));
  }

  async function setDocTopic(id, topic) {
    const fresh = await FolioDB.get(id);
    if (!fresh) return;
    fresh.topic = topicKey(topic);
    if (fresh.topic) rememberTopic(fresh.topic);
    await FolioDB.put(fresh);
    await refreshLibrary();
  }

  function renderTopicBar(docs) {
    const bar = $("#topicBar");
    if (!bar) return;
    const topics = allTopics();
    const uncategorized = docs.filter((d) => !topicKey(d.topic)).length;
    bar.innerHTML = "";
    const hint = document.createElement("p");
    hint.className = "topic-hint";
    hint.textContent = t("topicHint");
    bar.appendChild(hint);
    const row = document.createElement("div");
    row.className = "chips";
    const addChip = (id, label, count) => {
      const btn = document.createElement("button");
      btn.className = "chip" + (state.topicFilter === id ? " active" : "");
      btn.textContent = count == null ? label : `${label} (${count})`;
      btn.dataset.topic = id;
      btn.onclick = () => {
        state.topicFilter = id;
        renderGrid($("#search").value || "");
      };
      enableTopicDrop(btn, id === "all" ? null : id === "none" ? "" : id);
      row.appendChild(btn);
    };
    addChip("all", t("topicsAll"), docs.length);
    addChip("none", t("topicsNone"), uncategorized);
    topics.forEach((name) => {
      addChip(name, name, docs.filter((d) => topicKey(d.topic) === name).length);
    });
    const add = document.createElement("button");
    add.className = "chip add";
    add.textContent = t("topicNew");
    add.onclick = () => {
      const name = prompt(t("topicPrompt"));
      if (!name) return;
      rememberTopic(name);
      state.topicFilter = topicKey(name);
      renderGrid($("#search").value || "");
    };
    row.appendChild(add);
    bar.appendChild(row);
  }

  function enableTopicDrop(el, topicValue) {
    el.addEventListener("dragover", (e) => {
      if (![...e.dataTransfer.types].includes("application/x-folio-doc")) return;
      e.preventDefault();
      el.classList.add("drop-aim");
    });
    el.addEventListener("dragleave", () => el.classList.remove("drop-aim"));
    el.addEventListener("drop", async (e) => {
      e.preventDefault();
      el.classList.remove("drop-aim");
      const id = e.dataTransfer.getData("application/x-folio-doc");
      if (!id || topicValue === null) return;
      await setDocTopic(id, topicValue);
    });
  }

  function renderGrid(q) {
    const body = $("#libraryBody") || $("#grid");
    const query = (q || "").trim().toLowerCase();
    const docs = state.docs.filter((d) => !query || (d.name || "").toLowerCase().includes(query) || topicKey(d.topic).toLowerCase().includes(query));
    renderTopicBar(state.docs);
    body.innerHTML = "";

    const tools = document.createElement("div");
    tools.className = "grid tools-row";
    tools.id = "grid";

    const upload = document.createElement("div");
    upload.className = "upload-card";
    upload.innerHTML = `<div style="font-size:28px">＋</div><strong>${t("uploadCard")}</strong><span>${t("uploadHint")}</span>`;
    upload.onclick = () => $("#fileInput").click();
    tools.appendChild(upload);

    const sample = document.createElement("div");
    sample.className = "hint-card";
    sample.innerHTML = `<div style="font-size:28px">☰</div><strong>${t("sampleCard")}</strong><span>${t("sampleHint")}</span>`;
    sample.onclick = () => importFromUrl("samples/sample-lecture.pdf", "Sample lecture");
    tools.appendChild(sample);

    const tmpl = document.createElement("div");
    tmpl.className = "hint-card";
    tmpl.innerHTML = `<div style="font-size:28px">≡</div><strong>${t("templateCard")}</strong><span>${t("templateHint")}</span>`;
    tmpl.onclick = () => importFromUrl("templates/lined-notebook.pdf", t("templateCard"));
    tools.appendChild(tmpl);
    body.appendChild(tools);

    if (!docs.length && query) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = t("noMatch");
      body.appendChild(empty);
      return;
    }

    const filter = state.topicFilter;
    const visible = docs.filter((d) => {
      if (filter === "all") return true;
      if (filter === "none") return !topicKey(d.topic);
      return topicKey(d.topic) === filter;
    });

    const groups = [];
    if (filter === "all") {
      allTopics().forEach((name) => {
        groups.push({ title: name, topic: name, items: visible.filter((d) => topicKey(d.topic) === name) });
      });
      groups.push({ title: t("topicsNone"), topic: "", items: visible.filter((d) => !topicKey(d.topic)) });
    } else if (filter === "none") {
      groups.push({ title: t("topicsNone"), topic: "", items: visible });
    } else {
      groups.push({ title: filter, topic: filter, items: visible });
    }

    groups.forEach((g) => {
      if (filter === "all" && !g.items.length && g.topic === "") return;
      const sec = document.createElement("section");
      sec.className = "topic-section";
      enableTopicDrop(sec, g.topic);
      const h = document.createElement("h2");
      h.innerHTML = `${escapeHtml(g.title)} <small>${g.items.length}</small>`;
      sec.appendChild(h);
      const grid = document.createElement("div");
      grid.className = "grid";
      if (!g.items.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = t("noneYet") + " — " + t("dropHere");
        grid.appendChild(empty);
      } else {
        g.items.forEach((doc) => grid.appendChild(makeDocCard(doc)));
      }
      sec.appendChild(grid);
      body.appendChild(sec);
    });
  }

  function makeDocCard(doc) {
    const card = document.createElement("article");
    card.className = "card";
    card.draggable = true;
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("application/x-folio-doc", doc.id);
      e.dataTransfer.effectAllowed = "move";
    });
    const topicLabel = topicKey(doc.topic) || t("topicsNone");
    card.innerHTML = `
        <div class="thumb" data-id="${doc.id}">
          ${doc.thumb ? `<img alt="" src="${doc.thumb}" />` : `<div class="placeholder">¶</div>`}
        </div>
        <div class="card-body">
          <button class="topic-pill" type="button">${escapeHtml(topicLabel)}</button>
          <h3 title="${escapeHtml(doc.name)}">${escapeHtml(doc.name)}</h3>
          <div class="card-meta">
            <span>${doc.pageCount || "?"} pp</span>
            <span>${fmtDate(doc.updatedAt)}</span>
          </div>
          <div class="card-actions">
            <button class="btn primary open">${t("open")}</button>
            <button class="btn rename">${t("rename")}</button>
            <button class="btn danger del">${t("del")}</button>
          </div>
        </div>`;
    card.querySelector(".open").onclick = () => openDoc(doc.id);
    card.querySelector(".thumb").onclick = () => openDoc(doc.id);
    card.querySelector(".topic-pill").onclick = async (e) => {
      e.stopPropagation();
      const name = prompt(t("topicPrompt"), doc.topic || "");
      if (name === null) return;
      await setDocTopic(doc.id, name);
    };
    card.querySelector(".rename").onclick = async (e) => {
      e.stopPropagation();
      const name = prompt(t("rename"), doc.name);
      if (!name) return;
      const fresh = await FolioDB.get(doc.id);
      fresh.name = name.trim();
      await FolioDB.put(fresh);
      refreshLibrary();
    };
    card.querySelector(".del").onclick = async (e) => {
      e.stopPropagation();
      if (!confirm(t("confirmDel"))) return;
      await FolioDB.remove(doc.id);
      toast(t("deleted"));
      refreshLibrary();
    };
    return card;
  }

  async function bytesFromResponse(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(url);
    return new Uint8Array(await res.arrayBuffer());
  }

  async function importFromUrl(url, name) {
    try {
      const bytes = await bytesFromResponse(url);
      await savePdfBytes(bytes, name);
      toast(t("savedLib"));
      await refreshLibrary();
    } catch (err) {
      console.warn(err);
      toast(t("cannotOpen"));
    }
  }

  async function savePdfBytes(bytes, name, extra) {
    let pageCount = 1;
    let thumb = null;
    try {
      const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
      pageCount = pdf.numPages;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.35 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      thumb = canvas.toDataURL("image/jpeg", 0.72);
    } catch (err) {
      console.warn(err);
    }
    const doc = {
      id: uid(),
      name: name.replace(/\.pdf$/i, ""),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pageCount,
      thumb,
      pdf: bytes,
      annots: {},
      remarks: [],
      notePages: [],
      sequence: Array.from({ length: pageCount }, (_, i) => ({ kind: "pdf", pdfIndex: i + 1 })),
      wordDocs: {},
      topic: extra && extra.topic || "",
      githubPath: extra && extra.githubPath || "",
    };
    await FolioDB.put(doc);
    return doc;
  }

  async function importFiles(files) {
    for (const file of files) {
      if (file.type && file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        toast(t("onlyPdf"));
        continue;
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      await savePdfBytes(bytes, file.name);
    }
    toast(t("savedLib"));
    await refreshLibrary();
  }

  async function createBlankNotebook() {
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawText(state.lang === "zh" ? "筆記簿" : "Notebook", {
      x: 56, y: height - 72, size: 22, font, color: rgb(0.15, 0.12, 0.08),
    });
    for (let y = height - 110; y > 50; y -= 28) {
      page.drawLine({
        start: { x: 56, y }, end: { x: width - 56, y },
        thickness: 0.4, color: rgb(0.82, 0.78, 0.7),
      });
    }
    const bytes = await pdfDoc.save();
    const doc = await savePdfBytes(bytes, t("notebookPrefix") + new Date().toLocaleDateString());
    doc.notePages = [1];
    await FolioDB.put(doc);
    await openDoc(doc.id);
  }

  function pageSizePx() {
    const first = document.querySelector(".page-wrap");
    if (first) return { w: first.clientWidth, h: first.clientHeight };
    return { w: Math.round(595 * state.scale), h: Math.round(842 * state.scale) };
  }

  /* ---------- Reader ---------- */
  async function openDoc(id) {
    const doc = await FolioDB.get(id);
    if (!doc) return toast(t("notFound"));
    state.current = doc;
    state.pageNum = 1;
    state.dirty = false;
    try {
      const data = toBytes(doc.pdf).slice(0);
      state.pdf = await pdfjsLib.getDocument({ data }).promise;
      state.pageCount = state.pdf.numPages;
      ensureSequence(doc, state.pageCount);
    } catch (err) {
      console.error(err);
      return toast(t("cannotOpen"));
    }
    showReader();
    $("#docTitle").textContent = doc.name;
    renderRemarks();
    renderPageMemos();
    await renderPages();
    scrollToPage(1);
  }

  function showLibrary() {
    state.view = "library";
    state.pdf = null;
    state.current = null;
    $("#libraryView").classList.remove("hidden");
    $("#readerView").classList.add("hidden");
    $("#libraryActions").classList.remove("hidden");
    $("#readerActions").classList.add("hidden");
    applyI18n();
    refreshLibrary();
  }

  function showReader() {
    state.view = "reader";
    $("#libraryView").classList.add("hidden");
    $("#readerView").classList.remove("hidden");
    $("#libraryActions").classList.add("hidden");
    $("#readerActions").classList.remove("hidden");
  }

  function defaultViewport() {
    const w = Math.round(595.28 * state.scale);
    const h = Math.round(841.89 * state.scale);
    return { width: w, height: h };
  }

  async function buildPageWraps(token) {
    const wraps = [];
    const seq = ensureSequence(state.current, state.pdf ? state.pdf.numPages : 1);
    for (let i = 0; i < seq.length; i++) {
      if (token !== state.renderToken) return null;
      const display = i + 1;
      const item = seq[i];
      const wrap = document.createElement("div");
      wrap.className = "page-wrap";
      wrap.dataset.page = display;
      if (item.kind === "note" || item.legacyNote) wrap.classList.add("note-page");
      if (item.kind === "word") wrap.classList.add("word-page");

      let viewport = defaultViewport();
      if (item.kind === "pdf" && state.pdf && item.pdfIndex) {
        try {
          const page = await state.pdf.getPage(item.pdfIndex);
          viewport = page.getViewport({ scale: state.scale });
          wrap.style.width = viewport.width + "px";
          wrap.style.height = viewport.height + "px";
          const canvas = document.createElement("canvas");
          canvas.className = "page";
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          wrap.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext("2d", { alpha: false }), viewport }).promise;
        } catch (err) {
          console.warn(err);
        }
      } else if (item.kind === "word") {
        wrap.style.width = viewport.width + "px";
        wrap.style.height = viewport.height + "px";
        const sheet = document.createElement("div");
        sheet.className = "word-sheet";
        const head = document.createElement("div");
        head.className = "word-head";
        const headTitle = document.createElement("span");
        headTitle.textContent = t("wordHead");
        const headDel = document.createElement("button");
        headDel.className = "btn danger";
        headDel.textContent = t("del");
        headDel.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteAddedPage(display);
        });
        head.append(headTitle, headDel);
        const editor = document.createElement("div");
        editor.className = "word-editor";
        editor.contentEditable = "true";
        editor.dataset.placeholder = t("wordPh");
        if (!state.current.wordDocs) state.current.wordDocs = {};
        if (!state.current.wordDocs[item.id]) state.current.wordDocs[item.id] = { text: "" };
        editor.textContent = state.current.wordDocs[item.id].text || "";
        editor.addEventListener("input", () => {
          state.current.wordDocs[item.id].text = editor.innerText;
          state.dirty = true;
        });
        sheet.append(head, editor);
        wrap.appendChild(sheet);
      } else {
        wrap.style.width = viewport.width + "px";
        wrap.style.height = viewport.height + "px";
        const canvas = document.createElement("canvas");
        canvas.className = "page";
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#f5f0e6";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#6b5424";
        ctx.font = `${Math.max(14, 16 * state.scale)}px sans-serif`;
        ctx.fillText(t("remarkPage"), 28 * state.scale, 36 * state.scale);
        ctx.strokeStyle = "#d2c4a6";
        ctx.lineWidth = 1;
        for (let y = 58 * state.scale; y < canvas.height - 24; y += 22 * state.scale) {
          ctx.beginPath();
          ctx.moveTo(28 * state.scale, y);
          ctx.lineTo(canvas.width - 28 * state.scale, y);
          ctx.stroke();
        }
        wrap.appendChild(canvas);
      }

      if (item.kind !== "word") {
        const overlay = document.createElement("canvas");
        overlay.className = "overlay";
        overlay.width = viewport.width;
        overlay.height = viewport.height;
        wrap.appendChild(overlay);
        drawAnnots(overlay, display, viewport);
        bindOverlay(overlay, wrap, display, viewport);
        mountHtmlAnnots(wrap, display, viewport);
      }

      const label = document.createElement("div");
      label.className = "page-label";
      label.textContent = item.kind === "word"
        ? `Word ${display}`
        : item.kind === "note"
          ? `${t("remarkPage")} ${display}`
          : `${t("page")} ${display}`;
      if (item.kind === "note" || item.kind === "word") {
        const pageDel = document.createElement("button");
        pageDel.className = "btn danger";
        pageDel.style.cssText = "position:absolute;right:8px;top:8px;z-index:9;height:28px;font-size:12px";
        pageDel.textContent = t("del");
        pageDel.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteAddedPage(display);
        });
        wrap.appendChild(pageDel);
      }
      wrap.appendChild(label);
      wraps.push(wrap);
    }
    return wraps;
  }

  function applyPageWraps(wraps) {
    const pagesEl = $("#pages");
    pagesEl.replaceChildren(...wraps);
    const seq = state.current && state.current.sequence;
    $("#pageLabel").textContent = `${state.pageNum} / ${(seq && seq.length) || wraps.length}`;
    $("#zoomLabel").textContent = Math.round(state.scale * 100) + "%";
    observePages();
  }

  async function renderPages() {
    const token = ++state.renderToken;
    const wraps = await buildPageWraps(token);
    if (!wraps || token !== state.renderToken) return;
    applyPageWraps(wraps);
  }

  function observePages() {
    const stage = $("#stage");
    const wraps = $$(".page-wrap");
    if (state._io) state._io.disconnect();
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const page = Number(visible[0].target.dataset.page);
      if (page && page !== state.pageNum) {
        state.pageNum = page;
        $("#pageLabel").textContent = `${page} / ${seqCount()}`;
        updateDeletePageBtn();
      }
    }, { root: stage, threshold: 0.45 });
    wraps.forEach((w) => io.observe(w));
    state._io = io;
  }

  function scrollToPage(n) {
    const el = document.querySelector(`.page-wrap[data-page="${n}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    state.pageNum = n;
    $("#pageLabel").textContent = `${n} / ${seqCount()}`;
    updateDeletePageBtn();
  }

  function updateDeletePageBtn() {
    const btn = $("#btnDeletePage");
    if (!btn) return;
    btn.disabled = !currentPageIsAdded();
  }

  function makeItemDeleteBtn(onDelete) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "item-del";
    btn.textContent = "×";
    btn.title = t("del");
    btn.addEventListener("pointerdown", (e) => e.stopPropagation());
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDelete();
    });
    return btn;
  }

  function refreshPageAfterAnnotChange(page) {
    const wrap = wrapFromPage(page);
    if (!wrap) {
      renderPageMemos();
      return;
    }
    const overlay = wrap.querySelector("canvas.overlay");
    const viewport = overlay
      ? { width: overlay.width, height: overlay.height }
      : { width: wrap.clientWidth, height: wrap.clientHeight };
    if (overlay) drawAnnots(overlay, page, viewport);
    mountHtmlAnnots(wrap, page, viewport);
    renderPageMemos();
  }

  function deleteTextItem(page, item) {
    const data = ensurePageData(state.current, page);
    data.texts = data.texts.filter((x) => x !== item && x.id !== item.id);
    state.dirty = true;
    refreshPageAfterAnnotChange(page);
    toast(t("itemDeleted"));
  }

  function deleteImageItem(page, img) {
    const data = ensurePageData(state.current, page);
    data.images = data.images.filter((x) => x !== img && x.id !== img.id);
    state.dirty = true;
    refreshPageAfterAnnotChange(page);
    toast(t("itemDeleted"));
  }

  async function deleteAddedPage(displayPage) {
    const seq = ensureSequence(state.current, state.pdf ? state.pdf.numPages : 1);
    const idx = displayPage - 1;
    const item = seq[idx];
    if (!item || (item.kind !== "note" && item.kind !== "word")) {
      toast(t("cannotDeleteOrig"));
      return;
    }
    if (!confirm(t("confirmDelPage"))) return;
    if (item.kind === "word" && state.current.wordDocs) {
      delete state.current.wordDocs[item.id];
    }
    seq.splice(idx, 1);
    const shifted = {};
    for (const [k, v] of Object.entries(state.current.annots || {})) {
      const n = Number(k);
      if (n === displayPage) continue;
      shifted[String(n > displayPage ? n - 1 : n)] = v;
    }
    state.current.annots = shifted;
    state.current.sequence = seq;
    state.current.pageCount = seq.length;
    state.dirty = true;
    const next = Math.min(displayPage, Math.max(1, seq.length));
    await renderPages();
    renderPageMemos();
    renderRemarks();
    if (seq.length) scrollToPage(next);
    toast(t("itemDeleted"));
  }

  function currentPageIsAdded() {
    const seq = state.current && state.current.sequence;
    if (!seq) return false;
    const item = seq[state.pageNum - 1];
    return !!(item && (item.kind === "note" || item.kind === "word"));
  }

  function mountHtmlAnnots(wrap, page, viewport) {
    if (!wrap) return;
    wrap.querySelectorAll(".sticky-card, .text-box, .photo-box").forEach((n) => n.remove());
    const data = ensurePageData(state.current, page);
    const W = viewport.width || wrap.clientWidth;
    const H = viewport.height || wrap.clientHeight;
    data.texts.forEach((item) => {
      const el = document.createElement("div");
      el.className = item.kind === "comment" ? "sticky-card" : "text-box";
      el.style.left = (item.x * W) + "px";
      el.style.top = (item.y * H) + "px";
      if (item.kind === "comment") {
        const pin = document.createElement("div");
        pin.className = "sticky-pin";
        pin.textContent = "✎";
        const body = document.createElement("div");
        body.className = "sticky-body";
        body.textContent = item.text || "";
        body.appendChild(makeItemDeleteBtn(() => deleteTextItem(page, item)));
        el.append(pin, body);
      } else {
        el.textContent = item.text || "";
        el.appendChild(makeItemDeleteBtn(() => deleteTextItem(page, item)));
      }
      el.title = item.kind === "comment" ? t("sticky") : t("typeOn");
      el.addEventListener("pointerdown", (e) => e.stopPropagation());
      el.addEventListener("click", (e) => {
        if (e.target.closest(".item-del")) return;
        e.stopPropagation();
        startEditMemo(el, item, wrap, page);
      });
      wrap.appendChild(el);
    });
    data.images.forEach((img) => placePhotoEl(wrap, page, img, W, H));
  }

  function startEditMemo(el, item, wrap, page) {
    if (!el || el.classList.contains("editing")) return;
    el.classList.add("editing", "open");
    const ta = document.createElement("textarea");
    ta.value = item.text || "";
    if (item.kind === "comment") {
      const body = el.querySelector(".sticky-body") || el;
      body.textContent = "";
      body.appendChild(ta);
    } else {
      el.textContent = "";
      el.appendChild(ta);
    }
    ta.focus();
    const save = () => {
      item.text = ta.value.trim();
      state.dirty = true;
      mountHtmlAnnots(wrap, page, { width: wrap.clientWidth, height: wrap.clientHeight });
      renderPageMemos();
    };
    ta.addEventListener("blur", save);
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { ta.blur(); }
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ta.blur();
    });
  }

  function placePhotoEl(wrap, page, img, W, H) {
    const box = document.createElement("div");
    box.className = "photo-box";
    box.style.left = (img.x * W) + "px";
    box.style.top = (img.y * H) + "px";
    box.style.width = (img.w * W) + "px";
    box.style.height = (img.h * H) + "px";
    const image = document.createElement("img");
    image.src = img.src;
    const grip = document.createElement("div");
    grip.className = "grip";
    box.append(image, grip, makeItemDeleteBtn(() => deleteImageItem(page, img)));
    wrap.appendChild(box);

    box.addEventListener("pointerdown", (e) => {
      if (e.target === grip) return;
      e.stopPropagation();
      $$(".photo-box").forEach((b) => b.classList.remove("selected"));
      box.classList.add("selected");
      const startX = e.clientX, startY = e.clientY;
      const ox = img.x, oy = img.y;
      const move = (ev) => {
        img.x = Math.min(0.95, Math.max(0, ox + (ev.clientX - startX) / W));
        img.y = Math.min(0.95, Math.max(0, oy + (ev.clientY - startY) / H));
        box.style.left = (img.x * W) + "px";
        box.style.top = (img.y * H) + "px";
        state.dirty = true;
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
    grip.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      const startX = e.clientX, startY = e.clientY;
      const ow = img.w, oh = img.h;
      const move = (ev) => {
        img.w = Math.min(0.95, Math.max(0.08, ow + (ev.clientX - startX) / W));
        img.h = Math.min(0.95, Math.max(0.08, oh + (ev.clientY - startY) / H));
        box.style.width = (img.w * W) + "px";
        box.style.height = (img.h * H) + "px";
        state.dirty = true;
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
  }

  function renderPageMemos() {
    const box = $("#pageMemos");
    if (!box || !state.current) return;
    box.innerHTML = "";
    const items = [];
    const seq = state.current.sequence || [];
    seq.forEach((s, i) => {
      const page = i + 1;
      const data = (state.current.annots || {})[String(page)];
      (data && data.texts || []).forEach((m) => {
        items.push({ page, text: m.text, kind: m.kind, ref: m });
      });
      if (s.kind === "word") {
        const text = ((state.current.wordDocs || {})[s.id] || {}).text || "";
        if (text.trim()) items.push({ page, text, kind: "word" });
      }
    });
    if (!items.length) {
      box.innerHTML = `<div class="empty" style="padding:8px">${t("noPageMemos")}</div>`;
      return;
    }
    items.forEach((it) => {
      const el = document.createElement("div");
      el.className = "memo-item";
      el.innerHTML = `<div class="meta"><span>${t("memoOn")} ${it.page}${state.lang === "zh" ? " 頁" : ""} · ${it.kind === "comment" ? "✎" : it.kind === "word" ? "Word" : "Aa"}</span><button class="icon-btn" data-kill="1" title="${t("del")}">✕</button></div><p>${escapeHtml(it.text || "")}</p>`;
      el.querySelector("[data-kill]").onclick = (e) => {
        e.stopPropagation();
        if (it.kind === "word") deleteAddedPage(it.page);
        else if (it.ref) deleteTextItem(it.page, it.ref);
      };
      el.onclick = () => {
        scrollToPage(it.page);
        if (it.ref) {
          const wrap = wrapFromPage(it.page);
          if (wrap) startEditMemo(
            wrap.querySelector(it.ref.kind === "comment" ? ".sticky-card" : ".text-box") || wrap,
            it.ref, wrap, it.page
          );
        }
      };
      box.appendChild(el);
    });
  }

  function drawAnnots(canvas, page, viewport) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = ensurePageData(state.current, page);
    for (const stroke of data.strokes) {
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = stroke.tool === "highlighter"
        ? (HIGHLIGHT_COLORS[stroke.color] || "rgba(241,196,15,0.38)")
        : stroke.color;
      ctx.lineWidth = (stroke.width || 2) * (viewport.width / (stroke.baseWidth || viewport.width));
      const pts = stroke.points;
      if (!pts.length) continue;
      ctx.moveTo(pts[0].x * viewport.width, pts[0].y * viewport.height);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x * viewport.width, pts[i].y * viewport.height);
      }
      ctx.stroke();
    }
  }

  function isPencil(e) {
    if (!e) return false;
    if (e.pointerType === "pen") return true;
    if (e.touchType === "stylus") return true;
    return false;
  }

  function setPenLock(on) {
    const stage = $("#stage");
    if (!stage) return;
    stage.classList.toggle("pen-lock", !!on);
    document.body.classList.toggle("pen-lock", !!on);
  }

  function bindOverlay(overlay, wrap, page, viewport) {
    const toNorm = (e) => {
      const r = overlay.getBoundingClientRect();
      return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    };

    const paintLive = () => {
      drawAnnots(overlay, page, viewport);
      if (!state.drawing || state.drawing.page !== page) return;
      const tmp = overlay.getContext("2d");
      const stroke = state.drawing;
      tmp.beginPath();
      tmp.lineJoin = "round";
      tmp.lineCap = "round";
      tmp.strokeStyle = stroke.tool === "highlighter"
        ? (HIGHLIGHT_COLORS[stroke.color] || "rgba(241,196,15,0.38)")
        : stroke.color;
      tmp.lineWidth = stroke.width;
      const pts = stroke.points;
      if (!pts.length) return;
      tmp.moveTo(pts[0].x * overlay.width, pts[0].y * overlay.height);
      for (let i = 1; i < pts.length; i++) {
        tmp.lineTo(pts[i].x * overlay.width, pts[i].y * overlay.height);
      }
      tmp.stroke();
    };

    const placeAnnot = (p) => {
      if (state.tool === "text" || state.tool === "comment") {
        openTextPop(wrap, page, p, state.tool);
      } else if (state.tool === "image") {
        state.pendingImagePage = page;
        state.pendingImagePos = p;
        $("#imageInput").click();
      }
    };

    overlay.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.button !== -1) return;
      if (!e.isPrimary) return;
      if (state.tool === "pen" || state.tool === "highlighter" || state.tool === "eraser") {
        if (!isPencil(e)) return;
        e.preventDefault();
        e.stopPropagation();
        try { overlay.setPointerCapture(e.pointerId); } catch (_) {}
        setPenLock(true);
        const p = toNorm(e);
        if (state.tool === "eraser") {
          eraseAt(page, p, overlay, viewport);
          return;
        }
        state.drawing = {
          page, tool: state.tool, color: state.color,
          width: state.tool === "highlighter" ? 16 : 2.2,
          baseWidth: viewport.width, points: [p],
          pointerId: e.pointerId,
        };
        return;
      }
      if (state.tool !== "text" && state.tool !== "comment" && state.tool !== "image") return;
      const startX = e.clientX;
      const startY = e.clientY;
      const startP = toNorm(e);
      const pid = e.pointerId;
      const onUp = (ev) => {
        if (ev.pointerId !== pid) return;
        overlay.removeEventListener("pointerup", onUp);
        overlay.removeEventListener("pointercancel", onCancel);
        if (Math.hypot(ev.clientX - startX, ev.clientY - startY) > 14) return;
        placeAnnot(startP);
      };
      const onCancel = (ev) => {
        if (ev.pointerId !== pid) return;
        overlay.removeEventListener("pointerup", onUp);
        overlay.removeEventListener("pointercancel", onCancel);
      };
      overlay.addEventListener("pointerup", onUp);
      overlay.addEventListener("pointercancel", onCancel);
    }, { passive: false });

    overlay.addEventListener("pointermove", (e) => {
      if (!state.drawing || state.drawing.page !== page) return;
      if (!isPencil(e)) return;
      if (state.drawing.pointerId != null && e.pointerId !== state.drawing.pointerId) return;
      e.preventDefault();
      e.stopPropagation();
      state.drawing.points.push(toNorm(e));
      paintLive();
    }, { passive: false });

    const endDraw = (e) => {
      if (e && state.drawing && state.drawing.pointerId != null && e.pointerId !== state.drawing.pointerId) return;
      setPenLock(false);
      if (!state.drawing || state.drawing.page !== page) return;
      const stroke = state.drawing;
      state.drawing = null;
      if (stroke.points.length < 2) return;
      ensurePageData(state.current, page).strokes.push(stroke);
      state.dirty = true;
      drawAnnots(overlay, page, viewport);
    };
    overlay.addEventListener("pointerup", endDraw, { passive: false });
    overlay.addEventListener("pointercancel", endDraw, { passive: false });
    overlay.addEventListener("lostpointercapture", endDraw);
  }

  function initGestures() {
    const stage = $("#stage");
    const pages = $("#pages");
    if (!stage || !pages || stage.dataset.gestures === "1") return;
    stage.dataset.gestures = "1";

    const fingerTouches = (touchList) =>
      [...touchList].filter((t) => t.touchType !== "stylus");
    const dist = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const isTypingTarget = (el) => {
      if (!el || el === stage || el === pages) return false;
      const tag = (el.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return true;
      if (el.isContentEditable) return true;
      return !!el.closest && !!el.closest("textarea, input, [contenteditable='true'], .word-editor, .text-pop");
    };

    let pinch0 = 0;
    let scale0 = state.scale;
    let live = 1;
    let pan = null;
    let pinching = false;
    let originX = 0;
    let originY = 0;
    let viewX = 0;
    let viewY = 0;

    const contentPoint = (clientX, clientY) => {
      const sr = stage.getBoundingClientRect();
      const pr = pages.getBoundingClientRect();
      return {
        x: clientX - pr.left,
        y: clientY - pr.top,
        vx: clientX - sr.left,
        vy: clientY - sr.top,
        w: pages.offsetWidth || 1,
        h: pages.offsetHeight || 1,
      };
    };

    const beginPinch = (fingers) => {
      pinching = true;
      stage.classList.add("pinching");
      pinch0 = dist(fingers[0], fingers[1]) || 1;
      scale0 = state.scale;
      live = 1;
      pan = null;
      state.drawing = null;
      const midX = (fingers[0].clientX + fingers[1].clientX) / 2;
      const midY = (fingers[0].clientY + fingers[1].clientY) / 2;
      const pt = contentPoint(midX, midY);
      originX = pt.x;
      originY = pt.y;
      viewX = pt.vx;
      viewY = pt.vy;
      pages.style.transformOrigin = `${originX}px ${originY}px`;
    };

    const applyLiveZoom = (factor) => {
      live = factor;
      pages.style.transformOrigin = `${originX}px ${originY}px`;
      pages.style.transform = "scale(" + factor + ")";
      const label = $("#zoomLabel");
      if (label) label.textContent = Math.round(scale0 * factor * 100) + "%";
    };

    const keepPointInView = (oldW, oldH) => {
      const ratioX = (pages.offsetWidth || 1) / (oldW || 1);
      const ratioY = (pages.offsetHeight || 1) / (oldH || 1);
      const sr = stage.getBoundingClientRect();
      const pr = pages.getBoundingClientRect();
      stage.scrollLeft += (pr.left + originX * ratioX) - (sr.left + viewX);
      stage.scrollTop += (pr.top + originY * ratioY) - (sr.top + viewY);
    };

    const commitZoom = async () => {
      const oldW = pages.offsetWidth || 1;
      const oldH = pages.offsetHeight || 1;
      stage.classList.remove("pinching");
      if (!live || Math.abs(live - 1) <= 0.02) {
        live = 1;
        pinching = false;
        pages.style.transform = "";
        pages.style.transformOrigin = "";
        if ($("#zoomLabel")) $("#zoomLabel").textContent = Math.round(state.scale * 100) + "%";
        return;
      }
      const next = Math.min(state.scaleMax, Math.max(state.scaleMin, scale0 * live));
      live = 1;
      pinching = false;
      if (Math.abs(next - state.scale) <= 0.01) {
        pages.style.transform = "";
        pages.style.transformOrigin = "";
        if ($("#zoomLabel")) $("#zoomLabel").textContent = Math.round(state.scale * 100) + "%";
        return;
      }
      const token = ++state.renderToken;
      state.scale = next;
      const wraps = await buildPageWraps(token);
      if (!wraps || token !== state.renderToken) return;
      pages.style.transform = "";
      pages.style.transformOrigin = "";
      applyPageWraps(wraps);
      keepPointInView(oldW, oldH);
    };

    stage.addEventListener("pointerdown", (e) => {
      if (!isPencil(e)) return;
      e.preventDefault();
      setPenLock(true);
    }, { capture: true, passive: false });

    stage.addEventListener("pointermove", (e) => {
      if (!isPencil(e)) return;
      e.preventDefault();
    }, { capture: true, passive: false });

    const releasePen = (e) => {
      if (!isPencil(e)) return;
      if (!state.drawing) setPenLock(false);
    };
    stage.addEventListener("pointerup", releasePen, { capture: true });
    stage.addEventListener("pointercancel", releasePen, { capture: true });

    stage.addEventListener("touchstart", (e) => {
      if (isTypingTarget(e.target) && e.touches.length < 2) return;
      const fingers = fingerTouches(e.touches);
      if (fingers.length === 0 || state.drawing) {
        e.preventDefault();
        return;
      }
      if (fingers.length >= 2) {
        e.preventDefault();
        beginPinch(fingers);
      } else {
        pan = { x: fingers[0].clientX, y: fingers[0].clientY };
      }
    }, { capture: true, passive: false });

    stage.addEventListener("touchmove", (e) => {
      if (isTypingTarget(e.target) && e.touches.length < 2 && !state.drawing) return;
      const stylus = [...e.touches].some((t) => t.touchType === "stylus");
      if (stylus || state.drawing) {
        e.preventDefault();
        return;
      }
      const fingers = fingerTouches(e.touches);
      if (fingers.length >= 2) {
        e.preventDefault();
        if (!pinching) beginPinch(fingers);
        applyLiveZoom(dist(fingers[0], fingers[1]) / (pinch0 || 1));
      } else if (fingers.length === 1 && pan && !pinching) {
        e.preventDefault();
        stage.scrollLeft -= (fingers[0].clientX - pan.x);
        stage.scrollTop -= (fingers[0].clientY - pan.y);
        pan = { x: fingers[0].clientX, y: fingers[0].clientY };
      }
    }, { capture: true, passive: false });

    const endFingers = async (e) => {
      const fingers = fingerTouches(e.touches);
      if (pinching && fingers.length < 2) {
        pinching = false;
        await commitZoom();
      }
      if (fingers.length === 1) {
        pan = { x: fingers[0].clientX, y: fingers[0].clientY };
      }
      if (fingers.length === 0) pan = null;
    };
    stage.addEventListener("touchend", endFingers, { capture: true, passive: false });
    stage.addEventListener("touchcancel", endFingers, { capture: true, passive: false });

    stage.addEventListener("gesturestart", (e) => e.preventDefault(), { passive: false });
    stage.addEventListener("gesturechange", (e) => e.preventDefault(), { passive: false });
    stage.addEventListener("gestureend", (e) => e.preventDefault(), { passive: false });
  }

  function eraseAt(page, p, overlay, viewport) {
    const data = ensurePageData(state.current, page);
    const beforeS = data.strokes.length, beforeT = data.texts.length;
    data.strokes = data.strokes.filter((s) => !s.points.some((pt) => Math.hypot(pt.x - p.x, pt.y - p.y) < 0.02));
    const beforeI = data.images.length;
    data.texts = data.texts.filter((item) => Math.hypot(item.x - p.x, item.y - p.y) > 0.04);
    data.images = data.images.filter((img) => {
      const hit = p.x >= img.x && p.x <= img.x + img.w && p.y >= img.y && p.y <= img.y + img.h;
      return !hit;
    });
    if (data.strokes.length !== beforeS || data.texts.length !== beforeT || data.images.length !== beforeI) {
      state.dirty = true;
      drawAnnots(overlay, page, viewport);
      mountHtmlAnnots(wrapFromPage(page), page, viewport);
      renderPageMemos();
    }
  }

  function wrapFromPage(page) {
    return document.querySelector(`.page-wrap[data-page="${page}"]`);
  }

  function openTextPop(wrap, page, p, kind) {
    $$(".text-pop").forEach((n) => n.remove());
    const pop = document.createElement("div");
    pop.className = "text-pop";
    pop.style.left = p.x * wrap.clientWidth + "px";
    pop.style.top = p.y * wrap.clientHeight + "px";
    pop.innerHTML = `<textarea placeholder="${kind === "comment" ? t("sticky") : t("typeOn")}"></textarea>
      <div style="display:flex;gap:6px;justify-content:flex-end;margin-top:4px">
        <button class="btn" data-act="cancel">${t("cancel")}</button>
        <button class="btn primary" data-act="ok">${t("place")}</button>
      </div>`;
    pop.addEventListener("pointerdown", (e) => e.stopPropagation());
    pop.addEventListener("touchstart", (e) => e.stopPropagation(), { passive: true });
    wrap.appendChild(pop);
    const ta = pop.querySelector("textarea");
    setTimeout(() => ta.focus(), 30);
    const finish = (save) => {
      const text = ta.value.trim();
      pop.remove();
      if (!save || !text) return;
      ensurePageData(state.current, page).texts.push({
        id: uid(), kind, text, x: p.x, y: p.y, color: state.color, size: 16,
      });
      state.dirty = true;
      mountHtmlAnnots(wrap, page, { width: wrap.clientWidth, height: wrap.clientHeight });
      renderPageMemos();
    };
    pop.querySelector("[data-act=ok]").onclick = () => finish(true);
    pop.querySelector("[data-act=cancel]").onclick = () => finish(false);
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) finish(true);
      if (e.key === "Escape") finish(false);
    });
  }

  function renderRemarks() {
    const box = $("#remarks");
    box.innerHTML = "";
    const remarks = state.current.remarks || [];
    if (!remarks.length) {
      box.innerHTML = `<div class="empty" style="padding:12px">${t("noRemarks")}</div>`;
      return;
    }
    remarks.forEach((r, idx) => {
      const el = document.createElement("div");
      el.className = "remark";
      el.innerHTML = `
        <div class="meta"><span>${fmtDate(r.at)}</span><button class="icon-btn" data-del="${idx}" title="✕">✕</button></div>
        <textarea>${escapeHtml(r.text)}</textarea>`;
      el.querySelector("textarea").addEventListener("input", (e) => {
        r.text = e.target.value;
        state.dirty = true;
      });
      el.querySelector("[data-del]").onclick = () => {
        state.current.remarks.splice(idx, 1);
        state.dirty = true;
        renderRemarks();
      };
      box.appendChild(el);
    });
  }

  function addRemark() {
    const ta = $("#newRemark");
    const text = ta.value.trim();
    if (!text) return;
    state.current.remarks = state.current.remarks || [];
    state.current.remarks.unshift({ id: uid(), text, at: Date.now() });
    ta.value = "";
    state.dirty = true;
    renderRemarks();
    renderPageMemos();
  }

  function showPageModal(show) {
    $("#pageModal").classList.toggle("hidden", !show);
  }

  async function insertExtraPage(kind) {
    if (!state.current) return;
    showPageModal(false);
    const seq = ensureSequence(state.current, state.pdf ? state.pdf.numPages : 1);
    const after = Math.min(Math.max(state.pageNum, 1), seq.length);
    const id = uid();
    const entry = kind === "word"
      ? { kind: "word", id }
      : { kind: "note", id };
    if (kind === "word") {
      if (!state.current.wordDocs) state.current.wordDocs = {};
      state.current.wordDocs[id] = { text: "" };
    }
    seq.splice(after, 0, entry);
    const shifted = {};
    for (const [k, v] of Object.entries(state.current.annots || {})) {
      const n = Number(k);
      shifted[String(n > after ? n + 1 : n)] = v;
    }
    state.current.annots = shifted;
    state.current.pageCount = seq.length;
    state.dirty = true;
    try {
      await FolioDB.put(state.current);
      state.dirty = false;
    } catch (err) {
      console.warn(err);
    }
    await renderPages();
    renderPageMemos();
    scrollToPage(after + 1);
    toast(state.lang === "zh" ? (t("addedAfter") + after + t("addedAfter2")) : (t("addedAfter") + after));
  }

  async function addImageFromFile(file, page, pos) {
    if (!file || !file.type.startsWith("image/")) return;
    const src = await compressImage(file);
    const data = ensurePageData(state.current, page);
    const img = {
      id: uid(),
      src,
      x: pos ? pos.x : 0.15,
      y: pos ? pos.y : 0.15,
      w: 0.35,
      h: 0.22,
    };
    data.images.push(img);
    state.dirty = true;
    const wrap = wrapFromPage(page);
    if (wrap) mountHtmlAnnots(wrap, page, { width: wrap.clientWidth, height: wrap.clientHeight });
    toast(t("pasted"));
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const im = new Image();
      im.onload = () => {
        const max = 1400;
        let w = im.width, h = im.height;
        if (w > max || h > max) {
          const s = max / Math.max(w, h);
          w = Math.round(w * s); h = Math.round(h * s);
        }
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(im, 0, 0, w, h);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/jpeg", 0.82));
      };
      im.onerror = reject;
      im.src = url;
    });
  }

  async function saveCurrent() {
    if (!state.current) return;
    await FolioDB.put(state.current);
    state.dirty = false;
    toast(t("savedBrowser"));
  }

  async function exportPdf() {
    if (!state.current) return;
    toast(t("building"));
    try {
      const bytes = await bakeAnnotations(state.current);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (state.current.name || "notes") + ".pdf";
      a.click();
      URL.revokeObjectURL(a.href);
      toast(t("dlStart"));
    } catch (err) {
      console.error(err);
      toast(t("exportFail"));
    }
  }

  async function bakeAnnotations(doc) {
    const { PDFDocument, StandardFonts, rgb, LineCapStyle } = PDFLib;
    const src = await PDFDocument.load(toBytes(doc.pdf));
    const out = await PDFDocument.create();
    const font = await out.embedFont(StandardFonts.Helvetica);
    const hex = (h) => {
      const n = (h || "#1a1d24").replace("#", "");
      return rgb(parseInt(n.slice(0, 2), 16) / 255, parseInt(n.slice(2, 4), 16) / 255, parseInt(n.slice(4, 6), 16) / 255);
    };

    async function paintMarks(page, displayIndex) {
      const { width, height } = page.getSize();
      const data = (doc.annots || {})[String(displayIndex)];
      if (!data) return;
      for (const s of data.strokes || []) {
        const pts = s.points || [];
        if (pts.length < 2) continue;
        const color = s.tool === "highlighter" ? rgb(0.95, 0.78, 0.15) : hex(s.color);
        const opacity = s.tool === "highlighter" ? 0.35 : 1;
        const thickness = s.tool === "highlighter" ? 12 : Math.max(0.8, s.width || 2);
        for (let k = 1; k < pts.length; k++) {
          page.drawLine({
            start: { x: pts[k - 1].x * width, y: height - pts[k - 1].y * height },
            end: { x: pts[k].x * width, y: height - pts[k].y * height },
            thickness, color, opacity,
            lineCap: LineCapStyle ? LineCapStyle.Round : undefined,
          });
        }
      }
      for (const item of data.texts || []) {
        const x = item.x * width;
        const y = height - item.y * height - 12;
        if (item.kind === "comment") {
          page.drawRectangle({
            x, y: y - 36, width: Math.min(220, width * 0.42), height: 48,
            color: rgb(1, 0.91, 0.55), borderColor: rgb(0.75, 0.62, 0.25), borderWidth: 0.6,
          });
          page.drawText(String(item.text || "").slice(0, 180), {
            x: x + 6, y: y - 8, size: 9, font, color: rgb(0.2, 0.16, 0.1), maxWidth: Math.min(208, width * 0.4),
          });
        } else {
          page.drawText(String(item.text || ""), {
            x, y, size: item.size || 12, font, color: hex(item.color), maxWidth: width * 0.5,
          });
        }
      }
      for (const img of data.images || []) {
        try {
          const raw = img.src.split(",")[1];
          const bytes = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0));
          const embedded = img.src.startsWith("data:image/png")
            ? await out.embedPng(bytes)
            : await out.embedJpg(bytes);
          page.drawImage(embedded, {
            x: img.x * width,
            y: height - (img.y + img.h) * height,
            width: img.w * width,
            height: img.h * height,
          });
        } catch (err) {
          console.warn("image bake", err);
        }
      }
    }

    const seq = ensureSequence(doc, src.getPageCount());
    for (let i = 0; i < seq.length; i++) {
      const item = seq[i];
      let page;
      if (item.kind === "pdf" && item.pdfIndex) {
        const [copied] = await out.copyPages(src, [item.pdfIndex - 1]);
        page = out.addPage(copied);
      } else if (item.kind === "word") {
        page = out.addPage([595.28, 841.89]);
        page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: rgb(1, 1, 1) });
        page.drawText(state.lang === "zh" ? "Word 備註頁" : "Word page", {
          x: 48, y: 800, size: 11, font, color: rgb(0.45, 0.4, 0.3),
        });
        const body = ((doc.wordDocs || {})[item.id] || {}).text || "";
        page.drawText(body || " ", {
          x: 48, y: 770, size: 12, font, color: rgb(0.12, 0.12, 0.12),
          maxWidth: 500, lineHeight: 16,
        });
      } else {
        page = out.addPage([595.28, 841.89]);
        page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: rgb(0.96, 0.94, 0.90) });
        page.drawText(state.lang === "zh" ? "備註頁" : "Remark page", {
          x: 48, y: 800, size: 14, font, color: rgb(0.42, 0.30, 0.12),
        });
        for (let y = 770; y > 48; y -= 22) {
          page.drawLine({
            start: { x: 48, y }, end: { x: 547, y },
            thickness: 0.35, color: rgb(0.82, 0.78, 0.70),
          });
        }
      }
      await paintMarks(page, i + 1);
    }

    if ((doc.remarks || []).length) {
      const extra = out.addPage([595.28, 841.89]);
      extra.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: rgb(0.97, 0.95, 0.91) });
      extra.drawText(state.lang === "zh" ? "側欄備註" : "Sidebar remarks", {
        x: 48, y: 790, size: 18, font, color: rgb(0.25, 0.18, 0.08),
      });
      let y = 760;
      for (const r of doc.remarks) {
        extra.drawText(`${fmtDate(r.at)}\n${r.text}`, {
          x: 48, y, size: 11, font, color: rgb(0.18, 0.16, 0.12),
          maxWidth: 500, lineHeight: 14,
        });
        y -= Math.ceil(String(r.text || "").length / 90) * 16 + 36;
        if (y < 60) break;
      }
    }
    return await out.save();
  }

  function undoStroke() {
    if (!state.current) return;
    const page = state.pageNum;
    const data = ensurePageData(state.current, page);
    if (!data.strokes.length) return toast(t("nothingUndo"));
    data.strokes.pop();
    state.dirty = true;
    const wrap = wrapFromPage(page);
    if (!wrap) return;
    const overlay = wrap.querySelector("canvas.overlay");
    if (overlay) drawAnnots(overlay, page, { width: overlay.width, height: overlay.height });
  }

  /* ---------- Events ---------- */
  $("#fileInput").addEventListener("change", async (e) => {
    const files = [...e.target.files];
    e.target.value = "";
    if (files.length) await importFiles(files);
  });
  $("#btnImport").onclick = () => $("#fileInput").click();
  $("#btnNewNotes").onclick = createBlankNotebook;
  $("#search").addEventListener("input", (e) => renderGrid(e.target.value));
  $("#brandHome").onclick = () => {
    if (state.view === "reader" && state.dirty && !confirm(t("leave"))) return;
    showLibrary();
  };
  $("#btnAddPage").onclick = () => showPageModal(true);
  $("#btnDeletePage").onclick = () => deleteAddedPage(state.pageNum);
  $("#pageModalClose").onclick = () => showPageModal(false);
  $("#choicePdf").onclick = () => insertExtraPage("note");
  $("#choiceWord").onclick = () => insertExtraPage("word");
  $("#pageModal").addEventListener("click", (e) => {
    if (e.target.id === "pageModal") showPageModal(false);
  });
  $("#btnSave").onclick = saveCurrent;
  $("#btnExport").onclick = exportPdf;
  $("#btnAddRemark").onclick = addRemark;
  $("#newRemark").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addRemark();
  });
  $("#btnUndo").onclick = undoStroke;
  const zoomFromCenter = async (next) => {
    const stage = $("#stage");
    const pages = $("#pages");
    const sr = stage.getBoundingClientRect();
    const pr = pages.getBoundingClientRect();
    const oldW = pages.offsetWidth || 1;
    const oldH = pages.offsetHeight || 1;
    const originX = (sr.left + stage.clientWidth / 2) - pr.left;
    const originY = (sr.top + stage.clientHeight / 2) - pr.top;
    const viewX = stage.clientWidth / 2;
    const viewY = stage.clientHeight / 2;
    const factor = next / (state.scale || 1);
    pages.style.transformOrigin = `${originX}px ${originY}px`;
    pages.style.transform = "scale(" + factor + ")";
    const token = ++state.renderToken;
    state.scale = next;
    const wraps = await buildPageWraps(token);
    if (!wraps || token !== state.renderToken) return;
    pages.style.transform = "";
    pages.style.transformOrigin = "";
    applyPageWraps(wraps);
    const ratioX = (pages.offsetWidth || 1) / oldW;
    const ratioY = (pages.offsetHeight || 1) / oldH;
    const sr2 = stage.getBoundingClientRect();
    const pr2 = pages.getBoundingClientRect();
    stage.scrollLeft += (pr2.left + originX * ratioX) - (sr2.left + viewX);
    stage.scrollTop += (pr2.top + originY * ratioY) - (sr2.top + viewY);
  };
  $("#zoomIn").onclick = () => zoomFromCenter(Math.min(state.scaleMax, +(state.scale + 0.25).toFixed(2)));
  $("#zoomOut").onclick = () => zoomFromCenter(Math.max(state.scaleMin, +(state.scale - 0.25).toFixed(2)));
  $("#prevPage").onclick = () => scrollToPage(Math.max(1, state.pageNum - 1));
  $("#nextPage").onclick = () => scrollToPage(Math.min(seqCount(), state.pageNum + 1));
  $("#btnLang").onclick = () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    localStorage.setItem("folio-lang", state.lang);
    applyI18n();
    if (state.view === "library") renderGrid($("#search").value || "");
    if (state.view === "reader") {
      renderRemarks();
      renderPageMemos();
    }
  };

  $$("#tools [data-tool]").forEach((btn) => {
    btn.onclick = () => {
      state.tool = btn.dataset.tool;
      $$("#tools [data-tool]").forEach((b) => b.classList.toggle("active", b === btn));
      const stage = $("#stage");
      if (stage) stage.dataset.tool = state.tool;
      if (state.tool === "image") toast(t("pickImage") + " / Ctrl+V");
      if (state.tool === "text" || state.tool === "comment") toast(t(state.tool === "comment" ? "comment" : "text"));
    };
  });
  $$(".color-dot").forEach((btn) => {
    btn.onclick = () => {
      state.color = btn.dataset.color;
      $$(".color-dot").forEach((b) => b.classList.toggle("active", b === btn));
    };
  });

  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      saveCurrent();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && state.view === "reader") {
      e.preventDefault();
      undoStroke();
    }
  });
  window.addEventListener("beforeunload", (e) => {
    if (state.dirty) e.preventDefault();
  });
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", async (e) => {
    e.preventDefault();
    const pdfs = [...e.dataTransfer.files].filter((f) => f.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length) await importFiles(pdfs);
    const images = [...e.dataTransfer.files].filter((f) => f.type.startsWith("image/"));
    if (images.length && state.view === "reader") {
      await addImageFromFile(images[0], state.pageNum, { x: 0.18, y: 0.18 });
    }
  });
  $("#imageInput").addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file || state.view !== "reader") return;
    await addImageFromFile(file, state.pendingImagePage || state.pageNum, state.pendingImagePos || { x: 0.2, y: 0.2 });
    state.pendingImagePos = null;
  });
  document.addEventListener("paste", async (e) => {
    if (state.view !== "reader") return;
    const item = [...(e.clipboardData && e.clipboardData.items || [])].find((it) => it.type.startsWith("image/"));
    if (!item) return;
    e.preventDefault();
    const file = item.getAsFile();
    await addImageFromFile(file, state.pageNum, { x: 0.2, y: 0.2 });
  });

  function ghSettings() {
    try { return JSON.parse(localStorage.getItem("folio-gh") || "{}"); }
    catch { return {}; }
  }

  function openGhModal(show) {
    const s = ghSettings();
    $("#ghRepo").value = s.repo || "";
    $("#ghBranch").value = s.branch || "main";
    $("#ghToken").value = s.token || "";
    $("#ghModal").classList.toggle("hidden", !show);
  }

  async function ghFetch(url, token) {
    const headers = { Accept: "application/vnd.github+json" };
    if (token) headers.Authorization = "Bearer " + token;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  }

  async function syncFromGithub() {
    const s = ghSettings();
    const repo = String(s.repo || "").replace(/^https?:\/\/github.com\//, "").replace(/\.git$/, "").trim();
    if (!repo || !repo.includes("/")) return toast(t("ghNeed"));
    const branch = s.branch || "main";
    toast(t("syncing"));
    try {
      const metaUrl = `https://api.github.com/repos/${repo}/contents/library.json?ref=${encodeURIComponent(branch)}`;
      let catalog = {};
      try {
        const meta = await ghFetch(metaUrl, s.token);
        const json = JSON.parse(atob(meta.content.replace(/\n/g, "")));
        const notes = Array.isArray(json) ? json : (json.notes || []);
        notes.forEach((n) => {
          if (n && n.file) catalog[n.file] = n;
        });
      } catch (_) {}

      const list = await ghFetch(
        `https://api.github.com/repos/${repo}/contents/library?ref=${encodeURIComponent(branch)}`,
        s.token
      );
      const files = (Array.isArray(list) ? list : []).filter((f) => /\.pdf$/i.test(f.name));
      let added = 0;
      const existing = new Set((state.docs || []).map((d) => d.githubPath || d.name));
      for (const f of files) {
        const key = "library/" + f.name;
        if (existing.has(key) || existing.has(f.name.replace(/\.pdf$/i, ""))) continue;
        const raw = await fetch(f.download_url);
        if (!raw.ok) continue;
        const bytes = new Uint8Array(await raw.arrayBuffer());
        const info = catalog[f.name] || {};
        const doc = await savePdfBytes(bytes, info.name || f.name, {
          topic: info.topic || "",
          githubPath: key,
        });
        if (info.topic) rememberTopic(info.topic);
        existing.add(key);
        added += 1;
        void doc;
      }
      await refreshLibrary();
      toast(t("syncOk") + (added ? " · " + added + t("syncNew") : ""));
    } catch (err) {
      console.warn(err);
      toast(t("syncFail"));
    }
  }

  $("#btnGithub").onclick = () => openGhModal(true);
  $("#ghClose").onclick = () => openGhModal(false);
  $("#ghModal").addEventListener("click", (e) => {
    if (e.target.id === "ghModal") openGhModal(false);
  });
  $("#ghSave").onclick = () => {
    localStorage.setItem("folio-gh", JSON.stringify({
      repo: $("#ghRepo").value.trim(),
      branch: $("#ghBranch").value.trim() || "main",
      token: $("#ghToken").value.trim(),
    }));
    openGhModal(false);
    toast(t("savedBrowser"));
  };
  $("#btnSync").onclick = syncFromGithub;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  (function initSidebarResize() {
    const saved = Number(localStorage.getItem("folio-sidebar"));
    if (saved >= 160 && saved <= 700) {
      document.documentElement.style.setProperty("--sidebar", saved + "px");
    }
    const handle = $("#sidebarResizer");
    const bar = $("#sidebar");
    if (!handle || !bar) return;
    handle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      handle.classList.add("dragging");
      const startX = e.clientX;
      const startW = bar.getBoundingClientRect().width;
      const move = (ev) => {
        const w = Math.min(700, Math.max(160, startW - (ev.clientX - startX)));
        document.documentElement.style.setProperty("--sidebar", w + "px");
      };
      const up = (ev) => {
        handle.classList.remove("dragging");
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        const w = Math.round(bar.getBoundingClientRect().width);
        localStorage.setItem("folio-sidebar", String(w));
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
  })();

  initGestures();
  applyI18n();
  refreshLibrary();
})();
