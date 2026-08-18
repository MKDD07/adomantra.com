/* ============================================================
   Pexels API integration with Progressive & Network-Aware Loading
   Images: Progressive (tiny blur -> max 800px crisp)
   Videos: Max 1920px (Full HD), starts responsive
   ============================================================ */
const PEXLES_A = "bPSCecg8osP489H4AQexmZwG3OXpL1DUN";
const PEXELS_B = "jhrX1hafiSE8IapAM9EgZOu";
const PEXELS_API_KEY = PEXLES_A + PEXELS_B;

const PEXELS_ENDPOINT_PHOTOS = "https://api.pexels.com/v1/search";
const PEXELS_ENDPOINT_VIDEOS = "https://api.pexels.com/videos/search";

// Local fallback images (used if the API key is missing or a request fails)
const FALLBACK_IMAGES = {
  default: "assets/fallback-image.jpg",
};
const FALLBACK_VIDEO_POSTER = "assets/fallback-poster.jpg";

const pexelsCache = new Map();

/**
 * Fetch photo objects with both low-res (preview) and target (max 800px / medium / custom) quality.
 */
async function fetchPexelsImages(query, perPage = 3, quality = "medium") {
  const cacheKey = `img:${query}:${perPage}:${quality}`;
  if (pexelsCache.has(cacheKey)) return pexelsCache.get(cacheKey);

  if (!PEXELS_API_KEY || PEXELS_API_KEY === "YOUR_PEXELS_API_KEY") {
    return [{ url: FALLBACK_IMAGES.default, lowUrl: FALLBACK_IMAGES.default, alt: query, photographer: "" }];
  }

  try {
    const res = await fetch(
      `${PEXELS_ENDPOINT_PHOTOS}?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    if (!res.ok) throw new Error(`Pexels photo request failed: ${res.status}`);
    const data = await res.json();
    const results = (data.photos || []).map((p) => {
      // Default to medium/800px max (Pexels medium is ~800px width with dpr)
      let selectedUrl = p.src.medium || p.src.large || p.src.small;
      
      if (quality === "medium" || quality === "card") {
        selectedUrl = p.src.medium || p.src.large;
      } else if (quality === "small") {
        selectedUrl = p.src.small || p.src.tiny;
      } else if (quality === "large") {
        selectedUrl = p.src.large;
      } else if (quality === "large2x") {
        selectedUrl = p.src.large2x || p.src.large;
      } else if (quality === "original") {
        selectedUrl = p.src.original || p.src.large2x;
      } else if (p.src[quality]) {
        selectedUrl = p.src[quality];
      }

      return {
        url: selectedUrl,
        lowUrl: p.src.tiny || p.src.small || selectedUrl,
        alt: p.alt || query,
        photographer: p.photographer,
      };
    });
    const final = results.length
      ? results
      : [{ url: FALLBACK_IMAGES.default, lowUrl: FALLBACK_IMAGES.default, alt: query, photographer: "" }];
    pexelsCache.set(cacheKey, final);
    return final;
  } catch (err) {
    console.warn("fetchPexelsImages fallback:", err.message);
    return [{ url: FALLBACK_IMAGES.default, lowUrl: FALLBACK_IMAGES.default, alt: query, photographer: "" }];
  }
}

/**
 * Fetch a single best-fit video capped at 1920 max (Full HD) to prevent lag.
 * Progressively provides standard/preview first then upgrades to 1080p if desired.
 */
async function fetchPexelsVideos(query, quality = "hd") {
  const cacheKey = `vid:${query}:${quality}`;
  if (pexelsCache.has(cacheKey)) return pexelsCache.get(cacheKey);

  if (!PEXELS_API_KEY || PEXELS_API_KEY === "YOUR_PEXELS_API_KEY") {
    return null;
  }

  try {
    const res = await fetch(
      `${PEXELS_ENDPOINT_VIDEOS}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    if (!res.ok) throw new Error(`Pexels video request failed: ${res.status}`);
    const data = await res.json();
    const video = (data.videos || [])[0];
    if (!video || !video.video_files || !video.video_files.length) return null;

    // Filter and sort video files so maximum resolution is 1920 (Full HD)
    // Avoid 4K/UHD files that cause heavy decoding lag
    const validFiles = video.video_files
      .filter((f) => (f.width || 0) <= 1920 && f.file_type === "video/mp4")
      .sort((a, b) => (b.width || 0) - (a.width || 0));

    const filesToUse = validFiles.length ? validFiles : video.video_files;

    let targetFile = null;
    let initialFile = null;

    // Highest allowable is 1080p (width <= 1920)
    targetFile = filesToUse.find((f) => (f.width || 0) <= 1920 && (f.width || 0) >= 1280) || filesToUse[0];
    // Fast initial preview file (720p or SD)
    initialFile = filesToUse.find((f) => (f.width || 0) <= 960) || filesToUse[filesToUse.length - 1];

    const result = {
      videoUrl: targetFile.link,
      previewVideoUrl: initialFile ? initialFile.link : targetFile.link,
      posterUrl: video.image,
    };

    pexelsCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn("fetchPexelsVideos fallback:", err.message);
    return null;
  }
}

/**
 * Assign image with progressive low-to-high loading:
 * 1. Loads tiny/low-res preview immediately for instant visual feedback without blocking.
 * 2. Preloads the max ~800px card image in background.
 * 3. Seamlessly upgrades to crisp image once downloaded.
 */
function applyImageToElement(imgEl, query, quality = "medium") {
  imgEl.loading = "lazy";
  imgEl.decoding = "async";
  imgEl.onerror = () => {
    imgEl.src = FALLBACK_IMAGES.default;
  };

  const q = imgEl.getAttribute("data-pexels-quality") || quality;

  fetchPexelsImages(query, 1, q).then((results) => {
    if (!results || !results[0]) return;
    const { url, lowUrl, alt } = results[0];

    imgEl.alt = alt;

    // Step 1: Set instant lightweight low-res preview
    if (lowUrl && lowUrl !== url && !imgEl.src) {
      imgEl.src = lowUrl;
      imgEl.style.filter = "blur(6px)";
      imgEl.style.transition = "filter 0.4s ease-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    }

    // Step 2: Preload full target quality image (max 800px)
    const highResImg = new Image();
    highResImg.src = url;
    highResImg.onload = () => {
      imgEl.src = url;
      imgEl.style.filter = "none";
    };
    highResImg.onerror = () => {
      imgEl.style.filter = "none";
    };
  });
}

window.PexelsAPI = { fetchPexelsImages, fetchPexelsVideos, applyImageToElement, FALLBACK_VIDEO_POSTER };
