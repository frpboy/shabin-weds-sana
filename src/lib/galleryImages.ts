import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const RESPONSIVE_SUFFIX = /-\d{3,4}\.(jpg|jpeg|png|webp)$/i;

export type GalleryPhoto = {
  id: number;
  url: string;
  caption: string;
};

export function getGalleryPhotos(): GalleryPhoto[] {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    return [];
  }

  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .filter((file) => !RESPONSIVE_SUFFIX.test(file))
    .sort((a, b) => a.localeCompare(b));

  return files.map((file, index) => ({
    id: index + 1,
    url: `/images/${encodeURIComponent(file)}`,
    caption: `Captured Moment ${index + 1}`,
  }));
}
