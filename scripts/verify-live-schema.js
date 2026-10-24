async function verifyLive() {
  const res = await fetch('https://www.northhindipandit.in/');
  const html = await res.text();
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) {
    console.log("No schema found on live site");
    return;
  }
  try {
    const parsed = JSON.parse(match[1]);
    console.log("LIVE SITE SCHEMA IS 100% VALID! Graph items:", parsed['@graph']?.length);
  } catch (err) {
    console.error("LIVE SITE SCHEMA ERROR:", err.message);
  }
}

verifyLive();
