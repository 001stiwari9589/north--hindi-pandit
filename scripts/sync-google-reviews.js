import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

function getChromePath() {
  if (process.platform === 'win32') {
    const defaultWin = path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe');
    if (fs.existsSync(defaultWin)) return defaultWin;
    const progFiles = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    if (fs.existsSync(progFiles)) return progFiles;
    const progFilesX86 = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    if (fs.existsSync(progFilesX86)) return progFilesX86;
  }
  const candidates = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return 'google-chrome';
}

function guessPujaInfo(text = '') {
  const lower = text.toLowerCase();
  if (lower.includes('ganesh') || lower.includes('गणेश')) {
    return { puja: 'Ganesh Chaturthi Mahapujan & Hawan', tradition: 'North Indian Vedic Vidhi' };
  }
  if (lower.includes('satyanarayan') || lower.includes('सत्यनारायण')) {
    return { puja: 'Satyanarayan Katha & Hawan', tradition: 'Kashi Vedic Vidhi' };
  }
  if (lower.includes('housewarming') || lower.includes('griha') || lower.includes('गृहप्रवेश') || lower.includes('vastu') || lower.includes('वास्तु')) {
    return { puja: 'Grihapravesh & Vastu Shanti Puja', tradition: 'Vedic Grihapravesh Vidhi' };
  }
  if (lower.includes('krishna') || lower.includes('janmashtami') || lower.includes('कृष्ण') || lower.includes('जन्माष्टमी')) {
    return { puja: 'Shri Krishna Janmashtami Puja', tradition: 'Mathura-Vrindavan Parampara' };
  }
  if (lower.includes('hawan') || lower.includes('anushthan') || lower.includes('हवन')) {
    return { puja: 'Vedic Hawan & Anushthan', tradition: 'Kashi Gurukul Parampara' };
  }
  return { puja: 'Vedic Puja & Hawan Services', tradition: 'North Indian Parampara' };
}

const colors = ['#1E3A8A', '#065F46', '#800020', '#B33939', '#991B1B', '#4E0A17'];

function mergeReviews(existing, scraped) {
  const merged = [...existing];

  for (const item of scraped) {
    const normName = (item.name || '').toLowerCase().trim();
    const normText = (item.text || '').toLowerCase().trim().substring(0, 40);

    const idx = merged.findIndex((m) => {
      const mName = (m.name || '').toLowerCase().trim();
      const mText = (m.text || '').toLowerCase().trim().substring(0, 40);
      return (normName && mName === normName) || (normText && mText === normText);
    });

    if (idx !== -1) {
      if (item.photos && item.photos.length > (merged[idx].photos?.length || 0)) {
        merged[idx].photos = item.photos;
      }
      if (item.date && (!merged[idx].date || merged[idx].date.includes('Recent'))) {
        merged[idx].date = item.date;
      }
    } else {
      console.log(`[Google Reviews Sync] 🌟 New review found from devotee: ${item.name}`);
      merged.unshift(item);
    }
  }

  return merged;
}

async function main() {
  const chromePath = getChromePath();
  const url = 'https://www.google.com/maps/place/?q=place_id:ChIJ_YjEyN6ZyzsRxmJAhMY5F3U';

  console.log(`[Google Reviews Sync] Starting headless Chrome: ${chromePath}`);

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1280,1000',
    url
  ]);

  try {
    await new Promise((r) => setTimeout(r, 4500));
    const res = await fetch('http://127.0.0.1:9222/json');
    const targets = await res.json();
    const pageTarget = targets.find((t) => t.type === 'page');

    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      throw new Error('Could not find active Chrome debugging page target');
    }

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = {};

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks[msg.id]) {
        callbacks[msg.id](msg.result);
        delete callbacks[msg.id];
      }
    };

    const send = (method, params = {}) =>
      new Promise((resolve) => {
        const msgId = id++;
        callbacks[msgId] = resolve;
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });

    await new Promise((r) => (ws.onopen = r));
    await new Promise((r) => setTimeout(r, 3000));

    // Click on Reviews tab
    await send('Runtime.evaluate', {
      expression: `(() => {
        const tabs = Array.from(document.querySelectorAll('button[role="tab"], button'));
        const reviewTab = tabs.find(t => t.textContent.trim() === 'Reviews' || t.getAttribute('aria-label')?.includes('Reviews'));
        if (reviewTab) reviewTab.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 3000));

    // Scroll through reviews pane to load all reviews
    for (let s = 0; s < 12; s++) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const cards = document.querySelectorAll('div.jftiEf');
          if (cards.length > 0) {
            cards[cards.length - 1].scrollIntoView({ behavior: 'instant', block: 'end' });
          }
          const pane = document.querySelector('div.m6QErb.DxyBCb.kA9KIf.dS8AEf') || document.querySelector('div[role="main"]');
          if (pane) pane.scrollBy(0, 800);
        })()`
      });
      await new Promise((r) => setTimeout(r, 800));
    }

    // Click all "More" buttons to expand text
    await send('Runtime.evaluate', {
      expression: `(() => {
        document.querySelectorAll('button.w8nwRe, button[aria-label*="See more"]').forEach(b => b.click());
      })()`
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Extract all review cards
    const data = await send('Runtime.evaluate', {
      expression: `(() => {
        const reviews = [];
        const cards = Array.from(document.querySelectorAll('div.jftiEf'));
        cards.forEach((c, idx) => {
          const author = c.querySelector('.d4r55')?.innerText?.trim() || 'Devotee';
          const starsElem = c.querySelector('[aria-label*="star"], [aria-label*="Star"]');
          const rating = starsElem?.getAttribute('aria-label') || '5 stars';
          const date = c.querySelector('.rsqaWe')?.innerText?.trim() || 'Recent Google Review';
          const text = c.querySelector('.wiI7pd')?.innerText?.trim() || '';
          const stats = c.querySelector('.RfnDt')?.innerText?.trim() || '';
          const imgs = Array.from(c.querySelectorAll('button[style*="background-image"], img')).map(img => {
            const bg = img.style?.backgroundImage;
            if (bg && bg.includes('url(')) {
              return bg.slice(bg.indexOf('url(') + 4, bg.indexOf(')')).replace(/["']/g, '');
            }
            return img.src || '';
          }).filter(src => src && !src.includes('w36-h36') && !src.includes('/a/ACg8') && !src.includes('/a-/ALV-'));

          if (text) {
            reviews.push({
              author,
              rating,
              date,
              text,
              stats,
              photos: imgs
            });
          }
        });
        return reviews;
      })()`,
      returnByValue: true
    });

    const scrapedList = data?.result?.value || [];
    console.log(`[Google Reviews Sync] Extracted ${scrapedList.length} reviews from Google Business Profile.`);

    const formattedScraped = scrapedList.map((r, idx) => {
      const info = guessPujaInfo(r.text);
      const slug = r.author.toLowerCase().replace(/[^a-z0-9]/g, '');
      const isGuide = (r.stats || '').toLowerCase().includes('local guide');

      return {
        id: `google-real-${slug || idx + 1}`,
        name: r.author,
        loc: 'Hyderabad',
        puja: info.puja,
        tradition: info.tradition,
        rating: 5,
        text: r.text,
        color: colors[idx % colors.length],
        source: 'Google Review',
        verified: true,
        date: r.date,
        badge: isGuide ? 'Local Guide' : 'Verified Devotee',
        photos: r.photos || []
      };
    });

    const clientFile = path.resolve('client/src/data/googleReviews.json');
    const serverFile = path.resolve('server/data/reviews.json');

    let existingReviews = [];
    try {
      if (fs.existsSync(clientFile)) {
        existingReviews = JSON.parse(fs.readFileSync(clientFile, 'utf-8'));
      }
    } catch {}

    const finalReviews = mergeReviews(existingReviews, formattedScraped);

    fs.writeFileSync(clientFile, JSON.stringify(finalReviews, null, 2), 'utf-8');
    fs.writeFileSync(serverFile, JSON.stringify(finalReviews, null, 2), 'utf-8');

    console.log(`[Google Reviews Sync] Successfully synced ${finalReviews.length} total reviews.`);
    console.log(`  - Updated: ${clientFile}`);
    console.log(`  - Updated: ${serverFile}`);

    ws.close();
  } catch (err) {
    console.error('[Google Reviews Sync Error]', err.message);
  } finally {
    try {
      chromeProc.kill();
    } catch {}
  }
}

main().catch(console.error);
