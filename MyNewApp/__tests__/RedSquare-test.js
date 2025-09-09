import React from 'react';
import renderer, { act } from 'react-test-renderer';
import RedSquare from '../components/RedSquare';

test('renders correctly', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<RedSquare />);
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
