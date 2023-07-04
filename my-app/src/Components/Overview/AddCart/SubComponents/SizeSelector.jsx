import {useState} from 'react'
//https://www.robinwieruch.de/react-dropdown/
const SizeSelector = ({size, changeSize, skus, changeSku}) => {
  const [skuIndex, setSkuIndex] = useState('');

  //set the sku by taking the index as the value from the options
  const handleSizeChange = (event) => {
    const index = event.target.value;
    setSkuIndex(index);
    const selectedSku = skus[index];
    changeSize(selectedSku.size);
    changeSku(selectedSku);
  };
//map through the skus to make the options for each size
//default needs to say Select Size
  return (
  <div className="border border-gray-300 ">
    <select className="w-full p-2"value = {skuIndex} onChange={handleSizeChange}>
        <option value="" disabled>
          Select Size
        </option>
        {skus.map((sku, index) => (
          <option key={index} value={index}>
            {sku.size}
          </option>
        ))}
      </select>
  </div>
  )
};

export default SizeSelector;