This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Taskify
Taskify is a sleek and modern Todo List Web App built using the latest Next.js 15 App Router architecture, combined with robust state management via Redux and persistent storage powered by Redux Persist. Styled with shadcn/ui, the app delivers a clean, responsive, and accessible user experience.

## tech stack
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Tailwind CSS + Custom Themes
- **Fonts**: Geist & Geist Mono (Google Fonts)
- **Dark Mode**: Fully supported with system preference detection

## Features
- Add, complete, and manage to-do tasks
- Dark mode toggle support
- Persistent state with Redux Persist
- Fast and modern UI using Tailwind CSS
- Modular component structure
- Custom theme colors using `oklch` color space

## Install Dependencies
```bash
npm install
```
## Run
```bash
npm run dev
```
Visit http://localhost:3000 in your browser.

## High-Level Architecture
**State Management**: 
- The todos are stored as redux slice in redux, we define reducers to manipulate the todos array.
- To persist the todos array so that it is not deleted on refresh , we use redux persist to store  them.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
