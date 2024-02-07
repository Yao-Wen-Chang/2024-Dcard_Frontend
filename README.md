This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Requirement Checklist
**基本要求**
- [v] 使用 React.js 或基於此的框架，例如 Next.js
- [ ] 請使用 Git 版本控制，並將程式碼上傳至 GitHub 上，作業完成後繳交連結即可
- [ ] 請在 README 內詳細說明如何啟動專案與作業架構的設計

**功能**
- GitHub Login
  - [v] 請串接 GitHub OAuth，讓使用者有權限操作 GitHub API
  - [v] 詳見  GitHub OAuth documentation 
  - [v] 注意：在登入時需要求正確的 scope 
- Post Management
  - [] 請將 GitHub Issue 作為 Post，以 GitHub Issue 實作， 並將 close Issue 視為刪除 Post
  - 你可能會需要  GitHub Issue documentation  或  GitHub GraphQL API Explorer 
- User Interface
  - [] 列表頁
    - [v] 第一次只能載入 10 筆
    - [v] 每當列表滾到底部時要需要自動發送 API 請求，並載入額外 10 筆，直到沒有更多文章
  - [v] 文章頁
    - [v] 顯示文章內容，並正確 render 出 markdown 的內容
    - [v] 使用者可以在此「編輯」、「刪除」
  - [v] 新增 / 編輯文章時，可以使用 Modal 或跳轉至新的頁面操作
    - [v] 至少需要使用 title 和 body 兩個欄位
    - [v] 表單驗證：title 為必填，body 至少需要 30 字

**加分條件**

- [v] 使用 TypeScript
- [v] 使用 Next.js + App Router
- [] 調校 Web Vitals 評分
- [] 有處理錯誤及例外狀況 (Error Handling)
- [] 有部署至線上環境

**評分項目**
- [] 正確性：必須符合基本要求、功能能正常運作
- [] 效能：例如避免重複發送 API 請求、避免 component re-render
- [] 程式碼架構與品質：例如可讀性、一致性、重用性