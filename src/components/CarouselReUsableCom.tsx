import CircularGallery from './CarouselComponent';

export default function MarketingCarousel() {
  return (
    <div style={{ width: '100%', height: '700px', position: 'relative' }}>
      <CircularGallery
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </div>
  );
}
