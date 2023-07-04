import React, {useState, useEffect} from 'react';
//photos are based on currently selected product style
//must update upon selecting a style
//must be able to browse between and zoom in on these photos
//first image will be main image, thumbnails overlaid on the left
//up to 7 thumbnail images will be displayed, if more then need arrow
//if clicking on main image, show expanded view, also make mouse a mag glass
//https://benborgers.com/posts/tailwind-arrow
//expanded view - will span the whole screen still with left/right arrows
//no thumbnails
const Gallery = ({photos}) => {
  const [photo, setPhoto] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
 //render based on whether a new style is picked, or if the photo changes
  useEffect(()=> {
    if( photos ) {
      setPhoto(photos[photoIndex].url)
    }
  },[photos, photoIndex])

  useEffect(() => {
    if (!zoomed) {
      const imageContainer = document.querySelector('.image-container');
      if (imageContainer) {
        imageContainer.style.backgroundPosition = 'center';
      }
    }
  }, [zoomed]);

  const handleImageClick = () => {
    if (zoomed) {
      setZoomed(false);
      setExpanded(false);
    } else if (expanded) {
      setZoomed(true);
    } else {
      setExpanded(true);
    }
  };
  const handleMouseMove = (event) => {
    if (expanded && zoomed) {
        requestAnimationFrame(() => {
            const { left, top, width, height } = event.target.getBoundingClientRect();
            const x = ((event.clientX - left) / width) * 100;
            const y = ((event.clientY - top) / height) * 100;
            event.target.style.backgroundPosition = `${x}% ${y}%`;
        });
    }
  };
  const handleNextClick = () => {
    if (photoIndex < photos.length -1) {
      setPhotoIndex(photoIndex + 1)
    }
  }

  const handleBackClick = () => {
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1)
    }
  }
  return (
    <div className="gallery-container">
      <div className="thumbnails">
        {photos && photos.map((photo, index) => (
          <img
            key={index}
            src={photo.thumbnail_url}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setPhotoIndex(index)}
            className="thumbnail"
          />
        ))}
      </div>
      <div className={`image-wrapper ${expanded ? 'gallery-expanded' : ''}`}>
        {photo &&
          <div
            className={`image-container ${zoomed ? 'zoomed-image' : ''}`}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            style={{ backgroundImage: `url(${photo})`, backgroundPosition: 'center' }}
          />
        }
        <div>
          {(photoIndex < photos.length-1) && (
            <button
              className="right-arrow"
              onClick={handleNextClick}
            ></button>
          )}
        </div>
        <div>
          {(photoIndex > 0) && (
            <button
              className="left-arrow"
              onClick={handleBackClick}
            ></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;