
export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  span: 'col' | 'row' | 'normal' | 'large';
}
