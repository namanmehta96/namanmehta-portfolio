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

// AZ needs a HEADED browser (headless renders a different particle cycle).
// The hero animation never fully rests — it cycles through formations — so
// this captures at ~120s (the committed frame's phase) but the result is
// phase-dependent: ALWAYS eyeball the frame and re-run until it looks right.
{
  const headed = await puppeteer.launch({
    executablePath: CHROME,
    headless: false,
    args: ["--window-size=1480,1060", "--window-position=40,40"],
    defaultViewport: { width: 1440, height: 960 },
  });
  const page = await headed.newPage();
  await page.bringToFront();
  await page.goto("https://namanmehta96.github.io/astrazeneca-early-action/", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 3000));
  await page.mouse.click(720, 480); // splash
  await new Promise((r) => setTimeout(r, 2500));
  await clickByText(page, "skip");
  await new Promise((r) => setTimeout(r, 120000)); // phase of the committed frame
  await page.screenshot({
    path: `${OUT}astrazeneca-early-action.jpg`,
    type: "jpeg",
    quality: 82,
  });
  console.log("captured astrazeneca-early-action (headed)");
  await headed.close();
}

await shoot("orange-esg-platform", async (page) => {
  await clickByText(page, "skip tutorial");
});

await shoot("menty-b");
await shoot("ai-ethics");

await browser.close();
