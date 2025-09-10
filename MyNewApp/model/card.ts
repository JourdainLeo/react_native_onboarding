export type CardProps = {
  id: number;
  name: string;
  desc: string;
  card_images: {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
  }[];
};
