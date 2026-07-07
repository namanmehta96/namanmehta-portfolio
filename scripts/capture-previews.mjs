// Regenerates the hover-preview screenshots in public/previews/.
// Usage: node scripts/capture-previews.mjs
// Then downscale: for f in public/previews/*.jpg; do sips -z 480 720 "$f"; done
import puppeteer from "puppeteer-core";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = new URL("../public/previews/", import.meta.url).pathname;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });

async function shoot(slug, interact) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 1 });
  await page.goto(`https://namanmehta96.github.io/${slug}/`, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 3000));
  if (interact) await interact(page);
  await new Promise((r) => setTimeout(r, 4000));
  await page.screenshot({ path: `${OUT}${slug}.jpg`, type: "jpeg", quality: 82 });
  console.log("captured", slug);
  await page.close();
}

const clickByText = (page, matcher) =>
  page.evaluate((m) => {
    const els = [...document.querySelectorAll("button, a, [role='button']")];
    const el = els.find((e) => {
      const t = e.textContent?.trim().toLowerCase() ?? "";
      return t.startsWith(m) && t.length < 16;
    });
    el?.click();
    return !!el;
  }, matcher);

await shoot("astrazeneca-early-action", async (page) => {
  // splash -> skip the intro video -> hero
  await page.mouse.click(720, 480);
  await new Promise((r) => setTimeout(r, 2500));
  await clickByText(page, "skip");
  // the hero's particle logo animates continuously — give it time to form a
  // closed ring; if the frame looks smeared, re-run and eyeball the result
  await new Promise((r) => setTimeout(r, 5000));
});

await shoot("orange-esg-platform", async (page) => {
  await clickByText(page, "skip tutorial");
});

await shoot("menty-b");
await shoot("ai-ethics");

await browser.close();
