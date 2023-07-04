export default function createImageObjects(data) {
  const imageObjects = [];
  data.results.forEach((style) => {
    style.photos.forEach((photo) => {
      const imageObject = {
        name: style.name,
        original_price: style.original_price,
        sale_price: style.sale_price,
        default: style["default?"],
        thumbnail_url: photo.thumbnail_url,
        url: photo.url
      };
      imageObjects.push(imageObject);
    });
  });

  return imageObjects;
}

