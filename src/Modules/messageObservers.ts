const RECEIVE_CSS_SELECTOR = (message: unknown) => {
  console.log(message);
  if (message === 'testando') alert('testando');
};

export default [RECEIVE_CSS_SELECTOR];
