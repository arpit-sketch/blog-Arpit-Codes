// ===== BLOG DATA =====
// To add a new post: add an object to the TOP of this array.
// It will automatically appear on the listing page and landing page.

const BLOG_POSTS = [
  {
  id: "mongodb-aggregation-pipeline",
  title: "MongoDB Aggregation Pipeline: The Most Powerful Thing You're Probably Underusing",
  excerpt: "Find and findOne will only take you so far. When you need to group, transform, and analyze your data — the aggregation pipeline is where MongoDB gets serious.",
  date: "2026-04-27",
  time: "10:00 AM",
  tag: "Web Development",
  tagColor: "var(--warm-yellow)",
  readTime: "6 min read",
  content: `
    <p>For a long time, my relationship with MongoDB was simple: store data, find data, done. I knew <code>find()</code>, I knew <code>findOne()</code>, and when I needed something more complex I'd just fetch a pile of documents and crunch the numbers in JavaScript. It worked. It was also, I'd later learn, doing the hard work in entirely the wrong place.</p>
    <p>The aggregation pipeline is MongoDB's answer to the question: what if you could transform, filter, group, and analyze your data <em>inside the database</em> — before it ever reaches your application? Once you understand it, you stop pulling data into your app to process it. You send instructions to MongoDB and let it hand you exactly what you need.</p>

    <h2>What Is the Aggregation Pipeline?</h2>
    <p>Think of it as an assembly line for your data. You pass a collection of documents into the pipeline, and those documents flow through a series of <strong>stages</strong> — each stage transforming, filtering, or reshaping the data before passing it to the next. What comes out the other end is exactly what you asked for, nothing more.</p>
    <p>In code, it looks like this:</p>
    <pre><code>db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);</code></pre>
    <p>Three stages. Filter to completed orders, group by customer and sum their spend, sort by highest spender. That's a query that would take dozens of lines of JavaScript to replicate — done in three lines, executed entirely inside MongoDB, on only the data you care about.</p>

    <h2>The Stages You'll Use Most</h2>
    <p>The pipeline has over 30 stages, but a core handful covers the vast majority of real-world use cases:</p>
    <ul>
      <li><strong>$match:</strong> The filter stage. Works exactly like a <code>find()</code> query — pass it conditions and only matching documents move forward. Always put this as early as possible to reduce the data flowing through subsequent stages.</li>
      <li><strong>$group:</strong> The aggregation workhorse. Groups documents by a field and lets you compute values across each group — sums, averages, counts, min, max. This is where reporting and analytics live.</li>
      <li><strong>$project:</strong> Reshapes documents. Include only the fields you need, exclude what you don't, rename fields, or compute new ones. Think of it as a SELECT clause for MongoDB.</li>
      <li><strong>$sort:</strong> Orders documents by one or more fields. Ascending or descending. Comes after <code>$group</code> when you want to rank results.</li>
      <li><strong>$limit / $skip:</strong> Pagination primitives. Limit how many documents pass through, skip a set number. Used together for page-based data fetching.</li>
      <li><strong>$lookup:</strong> MongoDB's version of a JOIN. Pulls in documents from another collection and attaches them to the current document. Essential for relational-style queries across collections.</li>
      <li><strong>$unwind:</strong> Deconstructs an array field — turning one document with an array of five items into five separate documents. A necessary precursor to grouping or filtering on array contents.</li>
      <li><strong>$addFields:</strong> Adds new computed fields to documents without removing existing ones. Cleaner than <code>$project</code> when you just want to enrich a document rather than reshape it entirely.</li>
    </ul>

    <h2>Real Use Cases Worth Knowing</h2>
    <p>The pipeline stops feeling abstract the moment you map it to problems you've actually had:</p>
    <ul>
      <li><strong>Dashboard analytics:</strong> Total revenue by month, top-selling products, average order value — all of this is a <code>$match</code> + <code>$group</code> + <code>$sort</code> pipeline. No JavaScript loops, no loading thousands of documents into memory.</li>
      <li><strong>Populating relational data:</strong> A <code>$lookup</code> stage lets you join a users collection onto an orders collection by <code>userId</code> — giving you enriched documents with full user details attached, in a single query.</li>
      <li><strong>Search with scoring:</strong> Combine <code>$match</code> with <code>$addFields</code> to compute relevance scores and <code>$sort</code> to rank results — a lightweight search pipeline without a dedicated search service.</li>
      <li><strong>Flattening nested data:</strong> When documents have arrays of sub-objects — line items, tags, comments — <code>$unwind</code> lets you treat each element as its own document for filtering or aggregating.</li>
    </ul>

    <h2>Performance: Where Order Matters</h2>
    <p>The pipeline executes stages sequentially, which means the order you write them in has a direct impact on performance. A few rules that will save you from slow queries:</p>
    <ul>
      <li><strong>$match early, always:</strong> Every document that doesn't match your filter is wasted work for every subsequent stage. Filter first, process less.</li>
      <li><strong>$project early when possible:</strong> Dropping fields you don't need reduces the size of documents flowing through the pipeline — less memory, faster stages downstream.</li>
      <li><strong>Indexes still apply:</strong> A <code>$match</code> at the start of a pipeline can use an index just like a regular <code>find()</code> query. If your first stage matches on an unindexed field across a large collection, you'll feel it.</li>
      <li><strong>$limit before $sort when you can:</strong> If you only need the top 10 results, limiting before sorting can dramatically cut the work MongoDB has to do.</li>
    </ul>

    <h2>Final Thoughts</h2>
    <p>The aggregation pipeline is one of those tools that, once you start using it properly, makes you wonder how you ever got by without it. It moves the heavy lifting from your application layer into the database — where the data already lives, where indexes can help, and where you're not paying the cost of shipping thousands of documents across a network just to crunch them in a for loop.</p>
    <p>Start with <code>$match</code> and <code>$group</code>. Build your first analytics query. Then reach for <code>$lookup</code> when you need to join collections. The pipeline will grow with your confidence — and your queries will get faster every step of the way.</p>
  `
},
  {
  id: "model-context-protocol-mcp",
  title: "Model Context Protocol: The Standard That's Quietly Changing How AI Works",
  excerpt: "AI models are only as useful as the context they have access to. MCP is the protocol that finally makes giving them that context systematic, safe, and scalable.",
  date: "2026-04-25",
  time: "10:00 AM",
  tag: "Web Development",
  tagColor: "var(--warm-yellow)",
  readTime: "5 min read",
  content: `
    <p>For a while, integrating an AI model into a real application felt like duct-taping two different worlds together. You had your tools — your databases, your APIs, your file systems — and you had the model, sitting in isolation, knowing only what you explicitly stuffed into a prompt. Every integration was custom. Every connection was fragile. There was no standard way for a model to reach out and <em>use</em> the world around it.</p>
    <p>That's the problem Model Context Protocol — MCP — was built to solve. Introduced by Anthropic in late 2024, MCP is an open standard that defines how AI models communicate with external tools, data sources, and services. Not a library, not a framework — a protocol. Like HTTP for the web, or USB for hardware. A common language that makes connections predictable, reusable, and interoperable.</p>

    <h2>What Problem Does MCP Actually Solve?</h2>
    <p>Before MCP, every AI integration was essentially bespoke. If you wanted Claude or GPT to query your database, you wrote custom glue code. If you wanted it to read from Google Drive, you wrote more custom glue code. If you switched models, you rewrote everything. The integrations didn't transfer, didn't compose, and didn't scale.</p>
    <p>MCP introduces a clean separation between two sides of every AI integration:</p>
    <ul>
      <li><strong>MCP Hosts:</strong> The AI-powered applications — Claude Desktop, coding assistants, agent frameworks — that want to use external context and tools.</li>
      <li><strong>MCP Servers:</strong> Lightweight connectors that expose specific capabilities — a database, a file system, a web search API, a calendar — in a standard way any host can understand.</li>
    </ul>
    <p>Build an MCP server for your database once, and any MCP-compatible AI application can connect to it. Switch from one model to another and your server still works. The integration lives in the server, not scattered across every application that needs it.</p>

    <h2>How It Works in Practice</h2>
    <p>An MCP server exposes three kinds of things to a host:</p>
    <ul>
      <li><strong>Tools:</strong> Functions the model can call — search a database, send an email, create a file, fetch a URL. The model decides when to call them based on the conversation.</li>
      <li><strong>Resources:</strong> Data the model can read — documents, database records, configuration files. Think of these as context the model can pull in on demand.</li>
      <li><strong>Prompts:</strong> Pre-built prompt templates that encode best practices for interacting with a specific service — so the model knows how to ask the right questions.</li>
    </ul>
    <p>When a user asks an MCP-enabled assistant to "pull up last month's sales data and summarize it," the host doesn't need custom code to make that happen. It discovers the available tools from the connected MCP server, calls the right one, gets the data back, and feeds it to the model — all through the standard protocol.</p>

    <h2>Building With MCP as a Developer</h2>
    <p>The practical appeal for developers is significant. Anthropic provides official SDKs for both TypeScript and Python, and building a basic MCP server is genuinely approachable — you define your tools as functions with typed inputs, register them with the server, and expose the server over stdio or HTTP. Any MCP host can then discover and use those tools automatically.</p>
    <p>The ecosystem is already growing fast. There are community-built MCP servers for GitHub, Slack, Postgres, Notion, Google Drive, and dozens more. In many cases, the server you need already exists — you connect it, configure it, and your AI application immediately gains new capabilities without writing a line of integration code.</p>
    <p>For teams building AI-powered products, this is the real unlock: instead of hardwiring your model to specific tools, you build or adopt MCP servers and let the protocol handle the communication. Your AI layer stays clean. Your tools stay modular. Adding a new capability is a configuration change, not a rewrite.</p>

    <h2>Final Thoughts</h2>
    <p>MCP is one of those foundational pieces that doesn't make headlines the way a new model release does, but quietly changes everything underneath. The challenge of connecting AI to the real world — to your data, your tools, your services — has always been the messy part. MCP doesn't make it trivial, but it makes it <em>standard</em>. And in software, a good standard is worth more than a hundred clever workarounds.</p>
    <p>If you're building anything with AI right now, it's worth understanding how MCP works. The ecosystem is early, the tooling is improving fast, and the developers who get familiar with it now will be the ones who build the most capable AI integrations tomorrow.</p>
  `
},
  {
  id: "javascript-file-system",
  title: "The JavaScript File System: Everything You Need to Know About Node's fs Module",
  excerpt: "Your JavaScript can read files, write files, watch directories, and talk directly to your operating system. Here's how it all works — and why it matters.",
  date: "2026-04-23",
  time: "10:00 AM",
  tag: "Web Development",
  tagColor: "var(--warm-yellow)",
  readTime: "8 min read",
  content: `
    <p>There's a moment in every JavaScript developer's journey where the language stops feeling like something that only lives inside a browser. You install Node.js, you write your first script, and suddenly you realize — this thing can touch your actual computer. It can open folders, read files, write data to disk, and watch for changes in real time. That moment is usually your first encounter with the <code>fs</code> module.</p>
    <p>The <code>fs</code> module — short for File System — is one of Node.js's core built-in modules. No installation, no <code>npm install</code>, no package.json entry. It's just there, waiting. And once you understand it, a whole category of problems that used to feel complicated become surprisingly straightforward.</p>

    <h2>What Is the fs Module, Really?</h2>
    <p>At its core, <code>fs</code> is Node's bridge between your JavaScript code and the operating system's file system. Every operating system — Windows, macOS, Linux — exposes a set of low-level operations for interacting with files and directories. The <code>fs</code> module wraps those system calls in a JavaScript-friendly API so you don't have to think about what's happening under the hood.</p>
    <p>Using it is as simple as importing it at the top of your file:</p>
    <pre><code>const fs = require('fs');
// or in ESM
import fs from 'fs';</code></pre>
    <p>From that single import, you get access to dozens of methods — reading, writing, deleting, renaming, watching, and more. But before you start calling them, there's a foundational concept you need to understand: the difference between synchronous and asynchronous operations.</p>

    <h2>Sync vs Async: The Decision That Shapes Everything</h2>
    <p>The <code>fs</code> module offers most of its operations in two flavors, and choosing between them is one of the first real decisions you'll make as a Node developer.</p>
    <p><strong>Synchronous methods</strong> — identifiable by the <code>Sync</code> suffix, like <code>fs.readFileSync()</code> — block the entire Node.js thread until the operation completes. Your code stops, waits for the file to be read, and only then moves on. Simple to reason about, but dangerous in any context where performance matters. If you're reading a large file synchronously inside a web server, every other incoming request is frozen until that read finishes.</p>
    <p><strong>Asynchronous methods</strong> give control back to Node immediately, and notify you when the work is done — either through a callback or a Promise. This is the Node way. It's what makes Node fast under load. Your server can keep handling requests while a file operation runs in the background.</p>
    <ul>
      <li><strong>Use sync methods</strong> for scripts, CLI tools, or one-time startup operations — places where there's no concurrency to worry about.</li>
      <li><strong>Use async methods</strong> for anything inside a server, an API route, or any code that runs repeatedly under load.</li>
    </ul>

    <h2>fs vs fs/promises: The Modern Way to Write File Code</h2>
    <p>For a long time, the async version of <code>fs</code> meant callbacks — the classic Node pattern of passing a function that gets called when the operation completes. It works, but deeply nested callbacks are notoriously hard to read and maintain.</p>
    <p>Then came <code>fs/promises</code> — a Promise-based version of the entire <code>fs</code> API, officially part of Node.js since v10. Same methods, same behavior, but every operation returns a Promise you can <code>await</code>.</p>
    <pre><code>import fs from 'fs/promises';

async function readConfig() {
  const data = await fs.readFile('config.json', 'utf-8');
  return JSON.parse(data);
}</code></pre>
    <p>This is the version you should be reaching for in any modern project. It pairs naturally with <code>async/await</code>, integrates cleanly with <code>try/catch</code> for error handling, and makes your file-handling code read almost like plain English. The old callback-based <code>fs</code> isn't going anywhere, but <code>fs/promises</code> is simply the better experience.</p>

    <h2>The Operations You'll Actually Use</h2>
    <p>Out of the dozens of methods <code>fs</code> exposes, a handful cover the vast majority of real-world use cases:</p>
    <ul>
      <li><strong>readFile / writeFile:</strong> The bread and butter. Read an entire file into memory as a string or Buffer, or write a string to a file (creating it if it doesn't exist, overwriting if it does).</li>
      <li><strong>appendFile:</strong> Like writeFile, but adds content to the end of an existing file instead of replacing it. Perfect for log files.</li>
      <li><strong>unlink:</strong> Deletes a file. The name comes from Unix — don't let it confuse you.</li>
      <li><strong>rename:</strong> Moves or renames a file. Works across directories too.</li>
      <li><strong>mkdir / rmdir:</strong> Create and remove directories. Pass <code>{ recursive: true }</code> to <code>mkdir</code> to create nested folders in one call without errors if they already exist.</li>
      <li><strong>readdir:</strong> Returns an array of filenames inside a directory — your starting point for any operation that needs to process multiple files.</li>
      <li><strong>stat:</strong> Returns metadata about a file or directory — size, creation date, last modified time, and whether the path is a file or a folder.</li>
      <li><strong>watch:</strong> Fires a callback whenever a file or directory changes. The foundation of hot-reloading tools and file watchers everywhere.</li>
    </ul>

    <h2>Practical Use Cases Worth Knowing</h2>
    <p>Understanding the API is one thing. Knowing <em>when</em> to reach for it is another. Here are the scenarios where <code>fs</code> genuinely earns its place:</p>
    <ul>
      <li><strong>Reading config files:</strong> Loading a <code>.json</code> or <code>.env</code>-style file at server startup to configure your application without hardcoding values.</li>
      <li><strong>Writing logs:</strong> Appending timestamped entries to a log file for debugging or audit trails — especially in environments where a logging service isn't set up.</li>
      <li><strong>Processing uploaded files:</strong> After Multer or another upload middleware saves a file to disk, <code>fs</code> is how you read, validate, transform, or move it.</li>
      <li><strong>Generating files dynamically:</strong> Building a report, exporting data as CSV, or scaffolding new files programmatically as part of a CLI tool.</li>
      <li><strong>Seeding a database:</strong> Reading a JSON file full of seed data and inserting it into your database during development setup.</li>
    </ul>

    <h2>A Note on Error Handling</h2>
    <p>File system operations fail in ways that are entirely outside your control — a file doesn't exist, a directory lacks write permissions, a disk is full. This makes error handling not optional but essential. With <code>fs/promises</code> and <code>async/await</code>, a <code>try/catch</code> block is all you need to handle these gracefully and respond with a meaningful message instead of letting your server crash.</p>
    <p>One pattern worth knowing: use <code>fs.stat()</code> or <code>fs.access()</code> to check whether a file exists before trying to read it, rather than catching a "file not found" error after the fact. It makes intent clearer and error messages more precise.</p>

    <h2>Final Thoughts</h2>
    <p>The <code>fs</code> module is one of those parts of Node.js that quietly powers an enormous amount of what happens in a backend application. Config loading, file uploads, log writing, code generation — it's all <code>fs</code> under the surface. Once you understand the sync vs async distinction, make the switch to <code>fs/promises</code>, and get familiar with the handful of methods that cover most use cases, you'll find yourself reaching for it confidently instead of Googling the syntax every time.</p>
    <p>JavaScript started in the browser. But with <code>fs</code>, it learned to talk to the machine — and that changed everything.</p>
  `
},
  {
    id: "multer-vs-fileupload-npm",
    title: "Multer vs express-fileupload: Which One Should You Actually Use?",
    excerpt: "Two npm packages, one job — handling file uploads. But the choice between them is less about features and more about how you like to think.",
    date: "2026-04-21",
    time: "10:00 AM",
    tag: "Web Development",
    tagColor: "var(--warm-yellow)",
    readTime: "8 min read",
    content: `
      <p>It always starts the same way. You're building a form — maybe a profile picture upload, maybe a document submission feature — and you hit that moment where you realize: "Okay, I need to handle files on the server." You open your terminal, you type <code>npm install</code>, and then you pause. Which one?</p>
      <p>Two packages dominate this space for Express.js developers: <strong>Multer</strong> and <strong>express-fileupload</strong>. Both handle <code>multipart/form-data</code>. Both get the job done. But they come from very different philosophies — and understanding that difference is what will make you reach for the right tool every time.</p>

      <h2>First, What Even Is the Problem?</h2>
      <p>HTTP wasn't originally designed with files in mind. When a user submits a file through a form, the browser encodes it as <code>multipart/form-data</code> — a format that chunks the file and any accompanying fields into a single request body. Express, out of the box, has no idea what to do with this. It just sees a stream of binary data and shrugs.</p>
      <p>That's where middleware steps in. Both Multer and express-fileupload sit between the incoming request and your route handler, parse that binary stream, and hand you something usable — a file object you can actually work with.</p>

      <h2>express-fileupload: The One That Just Works</h2>
      <p>If Multer is a power drill, express-fileupload is a screwdriver. Simple, immediate, no setup required beyond plugging it in.</p>
      <ul>
        <li><strong>Zero configuration:</strong> Add it as global middleware and files are instantly available on <code>req.files</code> across every route.</li>
        <li><strong>Flat learning curve:</strong> No storage engines, no field name declarations — just install, use, done.</li>
        <li><strong>Good for quick projects:</strong> Prototypes, internal tools, or simple single-upload forms where you don't need fine-grained control.</li>
        <li><strong>Temp file handling built-in:</strong> Files land in a temp directory automatically, so you don't have to think about where they go initially.</li>
      </ul>
      <p>The tradeoff? When your requirements grow — multiple file fields, validation, storage strategy, streaming large files — express-fileupload starts to feel limiting. You find yourself writing logic that the middleware really should be handling for you.</p>

      <h2>Multer: The One That Scales With You</h2>
      <p>Multer came into my workflow the way most good tools do — out of necessity. I was building a feature where users could upload a profile photo <em>and</em> a portfolio document in the same form submission. express-fileupload handled it, technically, but the code to separate, validate, and store those two different files felt messy. I kept patching it. Eventually, someone in a thread mentioned Multer and I made the switch. I haven't looked back.</p>
      <p>Here's what makes Multer different in practice:</p>
      <ul>
        <li><strong>Explicit field declarations:</strong> You tell Multer exactly which fields carry files — <code>upload.fields([{ name: 'avatar' }, { name: 'resume' }])</code>. This isn't just syntax; it means your route is self-documenting about what it expects.</li>
        <li><strong>Storage engine control:</strong> Choose between <code>diskStorage</code> (save to disk with custom filenames and destinations) or <code>memoryStorage</code> (keep the file in memory as a Buffer, perfect for piping directly to cloud storage like S3).</li>
        <li><strong>Built-in file filtering:</strong> Pass a <code>fileFilter</code> function to reject files before they're even written. Wrong MIME type? Rejected at the middleware level, not buried in your route logic.</li>
        <li><strong>Size limits as configuration:</strong> Set <code>limits: { fileSize: 5 * 1024 * 1024 }</code> and Multer enforces it. Clean, centralized, no scattered if-statements.</li>
        <li><strong>Per-route middleware:</strong> Instead of global middleware, each route gets exactly the upload behavior it needs — nothing more, nothing less.</li>
      </ul>

      <h2>Why I Personally Reach for Multer</h2>
      <p>Honestly? It comes down to how it makes me <em>think</em> about file uploads. With express-fileupload, files feel like a side effect — they show up on <code>req.files</code> whether you asked for them or not. With Multer, files are a deliberate, declared contract between your form and your server.</p>
      <p>That distinction sounds philosophical until you're debugging a production issue at 11pm. When every route explicitly states what files it expects, where they're going, and what size they're allowed to be — the code tells the story. You don't have to trace through global middleware to understand why something is behaving the way it is.</p>
      <p>A few specific wins that have saved me real time:</p>
      <ul>
        <li><strong>memoryStorage for cloud uploads:</strong> When uploading directly to S3 or Cloudinary, I don't want files touching the disk at all. Multer's memory storage gives me a <code>req.file.buffer</code> I can pipe straight to the cloud SDK.</li>
        <li><strong>fileFilter for security:</strong> Validating file types at the middleware level — before the route handler even runs — means less surface area for bad input to sneak through.</li>
        <li><strong>Custom filenames:</strong> Using <code>diskStorage</code> with a custom filename function lets me generate unique, collision-safe filenames (think UUIDs + timestamps) without any extra logic in the route.</li>
        <li><strong>Readable error handling:</strong> Multer throws specific errors — <code>LIMIT_FILE_SIZE</code>, <code>LIMIT_UNEXPECTED_FILE</code> — that you can catch and respond to with meaningful messages instead of generic 500s.</li>
      </ul>

      <h2>So Which One Should You Use?</h2>
      <p>Use <strong>express-fileupload</strong> when you're moving fast, the project is small, and the upload logic is simple. It's genuinely great for what it is.</p>
      <p>Use <strong>Multer</strong> when the project will grow, when you need control over storage, when security and validation matter, or when you just want code that clearly communicates its own intent. In almost every production project, that's going to be Multer.</p>
      <p>The best tool isn't always the most powerful one — it's the one that matches the shape of your problem. But if you're building something you'll still be maintaining six months from now, Multer gives you a foundation that won't make you regret your choices.</p>
    `
 }
];

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getLatestPost() {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

function getPostById(id) {
  return BLOG_POSTS.find(p => p.id === id);
}
