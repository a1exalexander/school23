/* eslint-disable no-console */
/**
 * One-off migration: entries whose whole text was pasted into the title while the body
 * was left empty get that text moved into the body and a short title made of its first words.
 * Photos, video, likes and dates are kept as they are.
 *
 * Needs a Firebase service account key (Firebase console → Project settings → Service accounts):
 *
 *   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json node scripts/migrate-long-titles.js
 *     — dry run, only lists what would change
 *
 *   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json node scripts/migrate-long-titles.js --apply
 *     — saves the changes; the old titles are backed up to scripts/backup-long-titles-<time>.json
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('@babel/register')({
  presets: [['next/babel', { 'preset-env': { modules: 'commonjs' } }]]
});

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const { isTitleMisplaced, normalizePost } = require('../utils/postTitle');
const generateTokens = require('../utils/generateTokens').default;

const COLLECTIONS = ['news', 'activity', 'publicInfo'];
const apply = process.argv.includes('--apply');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'school23-5af03'
});
const db = admin.firestore();

const preview = (value, length = 70) => {
  const text = String(value || '').replace(/\s+/g, ' ');
  return text.length > length ? `${text.slice(0, length)}…` : text;
};

const run = async () => {
  const changes = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const collection of COLLECTIONS) {
    // eslint-disable-next-line no-await-in-loop
    const snapshot = await db.collection(collection).get();
    const docs = snapshot.docs.filter((doc) => isTitleMisplaced(doc.data()));
    console.log(`\n${collection}: ${docs.length} of ${snapshot.size} need fixing`);

    docs.forEach((doc) => {
      const post = doc.data();
      const fixed = normalizePost(post);
      const update = { title: fixed.title, text: fixed.text, delta: fixed.delta };
      if (collection === 'news') update.titleTokens = generateTokens(fixed.title);
      console.log(`  ${doc.id}: «${preview(post.title)}» → «${fixed.title}»`);
      changes.push({ ref: doc.ref, update, old: { collection, id: doc.id, ...post } });
    });
  }

  if (!apply) {
    console.log(
      `\nDry run: ${changes.length} entries would be fixed. Run again with --apply to save.`
    );
    return;
  }
  if (!changes.length) {
    console.log('\nNothing to fix.');
    return;
  }

  // the old values are saved before anything is changed
  const file = path.join(__dirname, `backup-long-titles-${Date.now()}.json`);
  fs.writeFileSync(
    file,
    JSON.stringify(
      changes.map(({ old }) => old),
      null,
      2
    )
  );
  console.log(`\nBackup of the old entries: ${file}`);

  // eslint-disable-next-line no-restricted-syntax
  for (const { ref, update } of changes) {
    // eslint-disable-next-line no-await-in-loop
    await ref.update(update);
  }
  console.log(`Done: ${changes.length} entries fixed.`);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
