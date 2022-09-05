type observerFunction = (...args: any[]) => any; //eslint-disable-line

export default function subject() {
  // state observers
  const observers: observerFunction[] = [];

  // subscribe observer
  function subscribeObserver(...observer: observerFunction[]) {
    observers.push(...observer);
  }

  // notifyall observers
  function notifyAll(...args: any[]): Array<any> {  //eslint-disable-line
    const state: Array<any> = []; //eslint-disable-line
    observers.forEach(observer => {
      const rtn = observer(...args);
      state.push(rtn);
    });
    return state;
  }

  return { notifyAll, subscribeObserver };
}

export { subject };
