import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');

if (!fs.existsSync(distPath)) {
  console.error('dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html does not exist.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');

const routes = [
  {
    path: 'comprehension-generator',
    title: 'Free AI Comprehension Generator | Comprevo',
    description: 'Comprevo is a free AI Comprehension Generator. Create reading passages, worksheets, vocabulary lists, and questions with instant answer keys for Grade 6–10 students and teachers.',
    canonical: 'https://comprevo-comprehension-generator.vercel.app/comprehension-generator'
  },
  {
    path: 'reading-comprehension-generator',
    title: 'Free Reading Comprehension Generator | Comprevo',
    description: 'Create reading comprehension passages with questions instantly for any grade using Comprevo.',
    canonical: 'https://comprevo-comprehension-generator.vercel.app/reading-comprehension-generator'
  },
  {
    path: 'data-interpretation',
    title: 'Free Data Interpretation & Chart Analysis Generator | Comprevo',
    description: 'Create analytical reading passages with interactive bar charts, data tables, flow charts, and quantitative reasoning questions for students.',
    canonical: 'https://comprevo-comprehension-generator.vercel.app/data-interpretation'
  },
  {
    path: 'generator',
    title: 'Reading Comprehension Worksheet Generator | Comprevo',
    description: 'Select your curriculum board, grade level, topic, and difficulty to generate custom reading comprehension passages with questions.',
    canonical: 'https://comprevo-comprehension-generator.vercel.app/generator'
  }
];

routes.forEach((route) => {
  let customHtml = baseHtml;

  // Replace Title
  customHtml = customHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );
  customHtml = customHtml.replace(
    /<meta name="title" content=".*?" \/>/i,
    `<meta name="title" content="${route.title}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="twitter:title" content=".*?" \/>/i,
    `<meta property="twitter:title" content="${route.title}" />`
  );

  // Replace Description
  customHtml = customHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="twitter:description" content=".*?" \/>/i,
    `<meta property="twitter:description" content="${route.description}" />`
  );

  // Replace Canonical
  customHtml = customHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  customHtml = customHtml.replace(
    /<meta property="twitter:url" content=".*?" \/>/i,
    `<meta property="twitter:url" content="${route.canonical}" />`
  );

  // 1. Write dist/[path].html
  const fileHtmlPath = path.join(distPath, `${route.path}.html`);
  fs.writeFileSync(fileHtmlPath, customHtml, 'utf-8');

  // 2. Write dist/[path]/index.html
  const dirPath = path.join(distPath, route.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'index.html'), customHtml, 'utf-8');

  console.log(`[Static Routes] Successfully generated static entry files for /${route.path}`);
});

console.log('[Static Routes] All route files generated successfully.');
