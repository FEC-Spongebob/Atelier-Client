import React, {useState} from 'react';

const Search = ({productList, setProductID}) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (id) => {
    setProductID(id);
    setSearchTerm('');
  }


const filteredProducts = productList.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div className ="search-container p-2">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleInput}
      className = "search-input"
    />
    <ul className="bg-white shadow-md mt-2 rounded border border-gray-300">
      {searchTerm && filteredProducts.map(product => (
        <li key={product.id} onClick={() => handleSelect(product.id)}>
          {product.name}
        </li>
      ))}
    </ul>
  </div>
);
}


export default Search