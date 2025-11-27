import { g as generateOgImageForSite } from './index_o2umM4bS.mjs';

const GET = async () => new Response(await generateOgImageForSite(), {
  headers: { "Content-Type": "image/png" }
});

export { GET };
