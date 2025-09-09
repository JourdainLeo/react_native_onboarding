// Mock React Native components for Jest
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  // Mock the components that are causing issues
  RN.View = 'View';
  RN.Text = 'Text';
  
  return RN;
});
