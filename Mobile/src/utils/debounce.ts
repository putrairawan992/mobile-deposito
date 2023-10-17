export const debounce = (func: Function, delay: number) => {
    let timerId: NodeJS.Timeout | null = null; 
    return (...args: any[]) => {
      if (timerId) {
        clearTimeout(timerId);
      }   
      timerId = setTimeout(() => {
        func(...args);
        timerId = null;
      }, delay);
    };
  };