/* eslint-disable no-unused-vars */
// ProductInfo.test.js
import React from 'react';
import { waitFor } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import ProductInfo from '../ProductInfo/ProductInfo';
import StyleSelect from './StyleSelect'
import { camoData, reviewMeta, styleData } from '../testData.js';

describe('StyleSelect', () => {

  describe('Default SelectedStyle', () => {
    it('Should display default style', ()=> {
      render(<StyleSelect styles={styleData.results} ></StyleSelect>)
      expect(screen.getByText('Selected style -- Forest Green & Black')).toBeInTheDocument()
    })
  })
  //using actual axios calls, need async test
  describe('Reviews', () => {
    it('Should display Read all 5 reviews', async ()=> {
      render(<ProductInfo product={camoData} productID = {'37311'}></ProductInfo>)
      await screen.findByText('Read all 5 reviews');
    })
  })
  //getting error at first until it fully renders then it passes the tests?  Is it because of the multiple previous calls that eventually pass the correct data?


})