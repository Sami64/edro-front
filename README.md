# Getting Started

### Pre-requisites

Node.js and a package manager (npm, yarn, pnpm, or bun) installed.
Choose one of the following commands based on your preferred package manager:

#### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

#### 2. Spin Up the Fake Server

Open a separate terminal window.

Run the following command:

```Bash
npx json-server db.json
```

This will typically start the server on port 3000 (<http://localhost:3000>).

#### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

#### 4. Configure Environment Variable

Create a file named .env.local at the root of your project.

Add the following line, replacing the placeholder with the actual URL of your fake server:

HOST=<http://localhost:3000>

Now your application should be able to interact with the fake server

All fake server data will be stored in db.json found in the root of the directory
