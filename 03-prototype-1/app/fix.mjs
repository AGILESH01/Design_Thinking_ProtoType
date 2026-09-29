import fs from 'fs';
let content = fs.readFileSync('src/screens/HomeScreen.tsx', 'utf8');
content = content.replace(
  /<svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2\.5" d="M9 5l7 7-7 7"><\/path><\/svg>\n        <\/div>/,
  '<svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>\n        </button>'
);
fs.writeFileSync('src/screens/HomeScreen.tsx', content);
