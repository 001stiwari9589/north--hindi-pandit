import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'server/.env',
  'server/whatsappService.js',
  'server/index.js',
  'client/index.html',
  'client/src/translations.js',
  'client/src/components/Navbar.jsx',
  'client/src/components/TopBar.jsx',
  'client/src/components/Hero.jsx',
  'client/src/components/BookingSection.jsx',
  'client/src/components/ContactSection.jsx',
  'client/src/components/Footer.jsx',
  'client/src/components/FinalCTA.jsx',
  'client/src/components/FloatingWidgets.jsx',
  'client/src/components/PujaModal.jsx',
  'client/src/components/AboutSection.jsx',
  'client/src/components/FAQAccordion.jsx',
  'client/public/poster.html'
];

const replacements = [
  { from: /917772035222/g, to: '919183089880' },
  { from: /\+91 77720 35222/g, to: '+91 91830 89880' },
  { from: /\+917772035222/g, to: '+919183089880' },
  { from: /77720 35222/g, to: '91830 89880' },
  { from: /7772035222/g, to: '9183089880' }
];

let totalChanges = 0;

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping (not found): ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let original = content;

  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${relPath}`);
    totalChanges++;
  } else {
    console.log(`ℹ️ No changes in: ${relPath}`);
  }
}

console.log(`\nFinished! Total files updated: ${totalChanges}`);
