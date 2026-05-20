import Home from '../src/screens/Home';
import { getGalleryPhotos } from '../src/lib/galleryImages';

export default function Page() {
  const photos = getGalleryPhotos();
  return <Home photos={photos} />;
}
