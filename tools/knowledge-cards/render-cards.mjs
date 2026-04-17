import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cards = [
  {
    slug: "bonsai-1bit",
    badge: null,
    title:
      "PrismML\u2019s Bonsai 1-bit model runs in your browser and produces working code",
    points: [
      "Fits in ~1GB \u2014 trained at 1-bit natively, not quantized after the fact",
      "Runs via WebGPU in Chrome. No server, no API key, no deployment needed",
      "Our members were impressed by the code output quality and are watching the 1-bit approach closely as it scales",
    ],
  },
  {
    slug: "gemma-4",
    badge: null,
    title:
      "Google\u2019s Gemma 4 rivals the best open-source models and has better licensing than Llama",
    points: [
      "31B dense model ranks top-3 open-source, ships under Apache 2.0 with fewer restrictions",
      "Key innovation: hierarchical embedding layers maintain quality at smaller sizes without heavy quantization",
      "A 128B version is planned",
    ],
  },
  {
    slug: "hermes-agent",
    badge: null,
    title:
      "Hermes is the recommended successor to OpenClaw, with better setup and security",
    points: [
      "One member spent 3 days in config hell with inconsistent behavior across channels",
      "Security concerns: OpenClaw requests broad system access, and some password/cookie storage is exposed",
      "Hermes Agent (#2 on OpenRouter, by Nous Research) is more reliable and less risky to set up",
    ],
  },
  {
    slug: "omniclaude",
    badge: "Member Highlight",
    title:
      "Member builds OmniClaude to orchestrate Claude Code agents from phone and laptop",
    points: [
      "Built to break free from the desktop \u2014 a mobile-first workspace for orchestrating AI coding agents",
      "Five clicks to dispatch five parallel agents on separate git worktrees",
      "Agents run on a remote server \u2014 no VPN issues in China, work continues even when you disconnect",
    ],
  },
];

async function renderCards() {
  const templatePath = resolve(__dirname, "card-template.html");
  const templateHtml = readFileSync(templatePath, "utf-8");

  const outputDir = resolve(__dirname, "output");
  mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    deviceScaleFactor: 3,
    viewport: { width: 360, height: 450 },
  });

  for (const card of cards) {
    const page = await context.newPage();
    await page.setContent(templateHtml, { waitUntil: "networkidle" });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Inject card content
    await page.evaluate((data) => {
      // Title
      document.getElementById("title").textContent = data.title;

      // Member highlight label
      if (data.badge) {
        const label = document.getElementById("member-label");
        label.textContent = data.badge;
        label.style.display = "block";
      }

      // Points
      const pointsList = document.getElementById("points");
      pointsList.innerHTML = data.points
        .map(
          (p) => `
        <li class="point">
          <div class="point-marker"></div>
          <p class="point-text">${p}</p>
        </li>
      `
        )
        .join("");
    }, card);

    // Let layout settle
    await page.waitForTimeout(500);

    // Get actual card height for dynamic sizing
    const cardHeight = await page.evaluate(() => {
      return document.getElementById("card").scrollHeight;
    });

    // Resize viewport to fit content
    await page.setViewportSize({ width: 360, height: cardHeight });

    const outputPath = resolve(outputDir, `${card.slug}.png`);
    await page.screenshot({
      path: outputPath,
      type: "png",
      clip: { x: 0, y: 0, width: 360, height: cardHeight },
    });

    console.log(
      `Rendered ${card.slug}.png (${360 * 3}x${cardHeight * 3} pixels)`
    );
    await page.close();
  }

  await browser.close();
  console.log(`\nAll cards saved to ${outputDir}/`);
}

renderCards().catch(console.error);
