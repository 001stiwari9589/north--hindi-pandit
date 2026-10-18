import fs from 'fs';

const html = fs.readFileSync('client/index.html', 'utf8');
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

if (!match) {
  console.log("No schema found");
  process.exit(1);
}

try {
  const parsed = JSON.parse(match[1]);
  console.log("SCHEMA IS 100% VALID JSON! Graph items:", parsed['@graph']?.length);
} catch (err) {
  console.error("SCHEMA PARSE ERROR:", err.message);
}
