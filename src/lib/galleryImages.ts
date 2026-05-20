import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

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
    .sort((a, b) => a.localeCompare(b));

  return files.map((file, index) => ({
    id: index + 1,
    url: `/images/${encodeURIComponent(file)}`,
    caption: `Captured Moment ${index + 1}`,
  }));
}
