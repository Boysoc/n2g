import type { APIRoute } from "astro";
import { SITE } from "@config";

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: Baiduspider
Disallow: /

User-agent: 360Spider
Disallow: /

User-agent: Sogou web spider/4.0
Disallow: /

User-agent: Sogou inst spider/4.0
Disallow: /

User-agent: PetalBot
Disallow: /

User-agent: YisouSpider
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: SemrushBot-SA
Disallow: /

User-agent: SemrushBot-BA
Disallow: /

User-agent: SemrushBot-SI
Disallow: /

User-agent: SemrushBot-SWA
Disallow: /

User-agent: SemrushBot-CT
Disallow: /

User-agent: SemrushBot-BM
Disallow: /

User-agent: SemrushBot-SEOAB
Disallow: /

user-agent: AhrefsBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: Uptimebot
Disallow: /

User-agent: MegaIndex.ru
Disallow: /

User-agent: ZoominfoBot
Disallow: /

User-agent: Mail.Ru
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: ExtLinksBot
Disallow: /

User-agent: aiHitBot
Disallow: /

User-agent: Researchscan
Disallow: /

User-agent: DnyzBot
Disallow: /

User-agent: spbot
Disallow: /

User-agent: YandexBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: SemrushBot-SA
Disallow: /

User-agent: SemrushBot-BA
Disallow: /

User-agent: SemrushBot-SI
Disallow: /

User-agent: SemrushBot-SWA
Disallow: /

User-agent: SemrushBot-CT
Disallow: /

User-agent: SemrushBot-BM
Disallow: /

User-agent: SemrushBot-SEOAB
Disallow: /

User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
