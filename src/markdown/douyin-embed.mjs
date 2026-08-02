const DOUYIN_PLAYER_ENDPOINT = 'https://open.douyin.com/api/douyin/v1/video/get_iframe_by_video';
const REQUEST_TIMEOUT_MS = 8_000;

// Keep published embeds deterministic on GitHub Pages. New share links are
// resolved during the build when possible, while known videos never require a
// third-party request to render.
const KNOWN_VIDEOS = new Map([
  [
    'https://v.douyin.com/9CFP6eBDIi0/',
    {
      id: '7669048789244217531',
      title: '亚洲明星联6-2杭州足管！基利安狂轰六球！夺得2034杯冠军',
      width: 1920,
      height: 1080,
    },
  ],
]);

const resolvedVideos = new Map();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function normalizeDouyinUrl(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' || (hostname !== 'douyin.com' && !hostname.endsWith('.douyin.com'))) {
      return null;
    }

    url.hash = '';
    return url.href;
  } catch {
    return null;
  }
}

function extractVideoId(url) {
  return new URL(url).pathname.match(/\/video\/(\d{10,24})/)?.[1] ?? null;
}

async function fetchWithTimeout(url, init = {}) {
  return fetch(url, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; N2G-Astro/1.0; +https://n2g.cn)',
      ...init.headers,
    },
  });
}

async function fetchVideoMetadata(videoId) {
  const endpoint = new URL(DOUYIN_PLAYER_ENDPOINT);
  endpoint.searchParams.set('video_id', videoId);

  const response = await fetchWithTimeout(endpoint);
  if (!response.ok) throw new Error(`metadata request returned ${response.status}`);

  const payload = await response.json();
  if (payload.err_no !== 0 || !payload.data) {
    throw new Error(payload.err_msg || 'video is not public');
  }

  return {
    id: videoId,
    title: payload.data.video_title || '抖音视频',
    width: Number(payload.data.video_width) || 9,
    height: Number(payload.data.video_height) || 16,
  };
}

async function resolveVideo(shareUrl) {
  const knownVideo = KNOWN_VIDEOS.get(shareUrl);
  if (knownVideo) return knownVideo;

  let videoId = extractVideoId(shareUrl);
  if (!videoId) {
    const response = await fetchWithTimeout(shareUrl, { redirect: 'follow' });
    const resolvedUrl = normalizeDouyinUrl(response.url);
    if (!resolvedUrl) throw new Error('share link did not resolve to Douyin');
    videoId = extractVideoId(resolvedUrl);
  }

  if (!videoId) throw new Error('video id was not found in the share link');
  return fetchVideoMetadata(videoId);
}

function getVideo(shareUrl) {
  if (!resolvedVideos.has(shareUrl)) {
    resolvedVideos.set(shareUrl, resolveVideo(shareUrl));
  }
  return resolvedVideos.get(shareUrl);
}

function renderEmbed(video) {
  const safeId = escapeHtml(video.id);
  const safeTitle = escapeHtml(video.title);
  const width = Math.max(1, Number(video.width) || 9);
  const height = Math.max(1, Number(video.height) || 16);
  const orientationClass = height > width ? ' douyin-embed--portrait' : '';

  return `<figure class="douyin-embed${orientationClass}" data-douyin-embed data-video-id="${safeId}" data-video-title="${safeTitle}" style="--douyin-video-ratio: ${width} / ${height}">
  <div class="douyin-embed__frame" data-douyin-frame>
    <button class="douyin-embed__load" type="button" data-douyin-load aria-label="播放抖音视频：${safeTitle}">
      <span class="douyin-embed__source">DOUYIN VIDEO</span>
      <span class="douyin-embed__title">${safeTitle}</span>
      <span class="douyin-embed__action"><span class="douyin-embed__play" aria-hidden="true"></span>点击播放</span>
    </button>
  </div>
</figure>`;
}

function renderFallback(shareUrl) {
  const safeUrl = escapeHtml(shareUrl);
  return `<p class="douyin-embed-fallback"><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">在抖音中观看这段视频 <span aria-hidden="true">↗</span></a></p>`;
}

export function createDouyinEmbedPlugin() {
  return {
    name: 'n2g-douyin-embed',
    async paragraph(node, context) {
      const [prefix, link] = node.children ?? [];
      const isDouyinMarker = node.children?.length === 2
        && prefix?.type === 'text'
        && prefix.value.trim() === '@'
        && link?.type === 'link'
        && context.textContent(link).trim().toLowerCase() === 'douyin';

      if (!isDouyinMarker) return;

      const shareUrl = normalizeDouyinUrl(link.url);
      if (!shareUrl) return;

      try {
        const video = await getVideo(shareUrl);
        context.replaceNode(node, { rawHtml: renderEmbed(video) });
      } catch (error) {
        context.report({
          node,
          severity: 'warning',
          message: `Douyin embed fell back to a link: ${error instanceof Error ? error.message : 'unknown error'}`,
        });
        context.replaceNode(node, { rawHtml: renderFallback(shareUrl) });
      }
    },
  };
}
