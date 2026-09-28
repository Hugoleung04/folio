# Folio

Local-first PDF study notes. Upload a lecture PDF, write on it, insert extra remark pages, and open it again any time.

資料只存在你這部電腦的瀏覽器裡，不會上傳到伺服器。

## Open the app / 開啟方式

You need Python 3 once. Then double-click the launcher.

需要已安裝 Python 3，之後雙擊啟動即可。

| System | File |
| --- | --- |
| Windows | `start.bat` |
| macOS / Linux | `start.sh` or `python3 start.py` |

The browser opens at `http://127.0.0.1:8765/`. Keep the terminal window open while you use Folio.

瀏覽器會開啟本機網址。使用期間請不要關閉那個黑色視窗。

> Do not open `index.html` directly from Explorer (`file://`). PDF.js needs a local server.

## Features / 功能

1. **Upload and keep PDFs** — library cards, reopen any time  
   上傳並保存在書庫，隨時再開
2. **Write on the page** — pen, highlighter, text, sticky comment, eraser  
   在 PDF 上書寫、螢光、文字、便利貼
3. **Insert a page** — lined **PDF** page or a **Word** page you can type on  
   「+ 新頁」可選 PDF 橫線頁，或可直接打字的 Word 頁
4. **Edit memos** — click a sticky or text box; the right-hand list shows the wording  
   點頁上的便利貼／文字即可改內容；右側「頁面備註」會列出全文
5. **Paste photos** — Ctrl+V, drag an image onto the page, or use the photo tool  
   可用貼上、拖入或圖片工具把相片放到 PDF
6. **Save / Download** — save in the browser, or export a normal annotated PDF  
   儲存在瀏覽器，或下載已寫上筆記的 PDF

Language toggle: **中 / EN** in the top bar.

## GitHub sync (devices + Grok)

Same GitHub account and repo on every device. **Save** uploads notes. **Sync** downloads them.

1. Create a repo, e.g. `YOUR_USER/folio-library`.
2. Add a folder `library/` and a file `library.json`.
3. In Folio click **GitHub**, enter `YOUR_USER/folio-library`.
4. Paste a token with Contents read/write (needed to upload notes).
5. On device A: edit, click **Save**. On device B: click **Sync**.

`library.json` example:

```json
{
  "notes": [
    { "file": "week1.pdf", "name": "Week 1 lecture", "topic": "Calculus" }
  ]
}
```

Public repo: no token. Private repo: paste a fine-grained PAT that can read that repo. The token stays in this browser only.

Grok 不能直接寫進你電腦的瀏覽器。用同一個 GitHub 當信箱：把 PDF 放進 `library/`，在 Folio 按「同步」。

## Folder layout / 資料夾

```
folio/
  app.js            application
  index.html        main window
  styles.css
  start.bat         Windows launcher
  start.py          local web server + open browser
  start.sh
  manifest.json     install as an app (PWA)
  sw.js             offline cache
  vendor/           pdf.js + pdf-lib (no internet needed after first copy)
  samples/          example lecture PDF
  templates/        blank lined notebook
  icons/
  offline/
```

This is the layout you can push to GitHub as-is.

## Upload to GitHub / 上傳到 GitHub

In this folder:

```bash
git init
git add .
git commit -m "Initial commit: Folio study notes"
```

Create an empty repository on GitHub, then:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USER/folio.git
git push -u origin main
```

Optional: in the repo **Settings → Pages**, set Source to `main` and `/ (root)`.  
Pages works for the UI files, but saved PDFs still live in each visitor’s own browser, not on GitHub.

## Shortcuts

- `Ctrl` / `Cmd` + `S` save
- `Ctrl` / `Cmd` + `Z` undo last stroke on the current page
- Drag a PDF onto the window to import

## Notes

- Clearing browser site data deletes the library. Download PDFs you care about.
- Libraries in `vendor/` are [PDF.js](https://mozilla.github.io/pdf.js/) (Apache-2.0) and [pdf-lib](https://pdf-lib.js.org/) (MIT).
- License: MIT (see `LICENSE`).
