import React, {useState, useEffect} from 'react';
// style is a thumbnail
//appears in rows of 4
//selection indicated with a checkmark on top of the thumbnail if selected
//style title is on top of thumbnail list
//default style is the first in the list
//http://web.simmons.edu/~grovesd/comm244/demo/thumbnail-grid/instructions.html
const StyleSelect = ({styles, changeStyle, changePrice}) => {
//first we will select the style, which will pass the style up, which can be passed to ProductInfo
//map over
const [selectedStyle, setSelectedStyle] = useState(null);
//initializes once theres styles
useEffect(() => {
  if (styles.length > 0) {
    setSelectedStyle(styles[0]);
  }
}, [styles]);

const handleStyleClick = (style) => {
  setSelectedStyle(style);
  changeStyle(style);
};

if (!styles || styles.length === 0) {
  return <div>Loading styles...</div>;
}

const selectedStyleName = selectedStyle ? selectedStyle.name : '';

return (
  <div className = "">
    <div className="mb-1" style={{fontSize: 'calc(12px + .5vw)'}}>STYLE > {selectedStyleName}</div>
    <div className="grid grid-cols-4">
      {styles.map((style, index) => (
        <div
          key={index}
          onClick={() => handleStyleClick(style)}
          className="p-2"
        >
          <div
              className={`styles border-2 rounded-full flex items-center justify-center ${selectedStyle && selectedStyle.style_id === style.style_id ? 'border-black' : 'border-transparent'}`}
              >
            <img
              className="w-full h-full object-cover rounded-full"
              src={style.photos[0].thumbnail_url}
              alt={style.name}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default StyleSelect;