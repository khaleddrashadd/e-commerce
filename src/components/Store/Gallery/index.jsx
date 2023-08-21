import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Gallery = ({ images }) => {
  return (
    <Tabs
      defaultValue={images[0]}
      className="flex flex-col-reverse gap-8 h-full">
      <TabsList className="flex justify-start gap-2 bg-transparent h-full">
        {images.map((image, i) => (
          <TabsTrigger
            key={image}
            value={image}
            className="p-0  data-[state=active]:border border-black rounded-lg">
            <span className="p-2 h-28 rounded-xl">
              <img
                src={image}
                alt={`galery image ${i}`}
                loading="lazy"
                className="w-full h-full object-center object-cover"
              />
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="w-full">
        {images.map((image, i) => (
          <TabsContent
            key={image}
            value={image}>
            <div className="w-full h-full sm:rounded-lg overflow-hidden">
              <LazyLoadImage
                src={image}
                alt={`galery image ${i}`}
                effect="blur"
                className="object-center object-cover w-full h-full"
              />
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
export default Gallery;
