const fs = require("fs-extra");
const getPathsObject = require("./getPathsObject");
const formatDate = require("./formatDate");
const rimraf = require("rimraf");

// ROBOTS.txt
const robotsTxt = `User-agent: *
Sitemap: https://school23.now.sh/sitemap_local.xml
Disallow:`;

fs.writeFileSync("public/robots.txt", robotsTxt);
console.log("robots.txt saved!");

// SITEMAP.XML
const pathsObj = getPathsObject();
const today = formatDate(new Date());
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Object.keys(pathsObj).map(
    path => `<url>
    <loc>https://school23.now.sh${path}</loc>
    <lastmod>${
      pathsObj[path].lastModified
        ? formatDate(new Date(pathsObj[path].lastModified))
        : today
    }</lastmod>
  </url>`
  )}
</urlset>`;

fs.writeFileSync("public/sitemap_local.xml", sitemapXml);
console.log("sitemap_local.xml saved!");

// GOOGLE's VERIFY HTML
const googleVerify = `google-site-verification: googlefd73f9d9ab45a589.html`;
try {
  fs.mkdirSync("public/sitemap.xml");
} catch(e) {
  rimraf("public/sitemap.xml", () => fs.mkdirSync("public/sitemap.xml"));
}
fs.writeFileSync("public/sitemap.xml/googlefd73f9d9ab45a589.html", googleVerify);
console.log("googlefd73f9d9ab45a589.html saved!");

