import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Card from './Card.jsx';

describe('Card component', () => {
  test('renders correctly', () => {
    const onClickMock = jest.fn();
    render(
      <Card
        onClick={onClickMock}
        selected={false}
        title="Test Title"
        price="19.99"
        category="Test Category"
        review={3.5}
        img="test.jpg"
        itemId="123"
        ogProduct={{ name: 'OG Product', features: [] }}
        features={[]}
      />
    );

    // Verify that the component renders the title, price, and category correctly
    expect(screen.getAllByText('Test Title')).toBeInTheDocument();
    expect(screen.getAllByText('$19.99')).toBeInTheDocument();
    expect(screen.getAllByText('Test Category')).toBeInTheDocument();

  });

});
