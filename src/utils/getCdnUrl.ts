const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL;

export function getCdnUrl(key: string): string {
  return `${CDN_BASE_URL}/${key.replace(/^\/+/, '')}`;
}
