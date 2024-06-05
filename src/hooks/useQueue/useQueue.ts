import * as React from "react";

/**
 * Hook return type
 */
type UseQueueReturnType<Q> = {
  queue: Q[];
  /**
   * first element of the queue
   */
  first: Q;
  /**
   * last element of the queue
   */
  last: Q;
  /**
   * length of the queue
   */
  size: number;
  /**
   * adds element to the end of queue
   * @returns {void}
   */
  add: (item: Q) => void;
  /**
   * removes first element from queue
   * @returns {Q} removed element
   */
  remove: () => Q;
  /**
   * removes all element fromt queue
   * @return {void}
   */
  clear: () => void;
};

/**
 * Custom hook that manages a queue
 * @template Q The type of values in the queue
 * @param {Q[]} initialValue Initial value for the hook
 * @returns {UseQueueReturnType<Q>} Returns an object containing properties to read and manipulate values of queue
 */
export const useQueue = <Q>(initialValue: Q[] = []): UseQueueReturnType<Q> => {
  const [queue, setQueue] = React.useState<Q[]>(initialValue);

  const add = React.useCallback((item: Q) => {
    setQueue((q) => [...q, item]);
  }, []);

  const remove = React.useCallback(() => {
    let removedItem;
    setQueue((q) => {
      removedItem = q[0];
      return q.slice(1);
    });
    return removedItem;
  }, []);

  const clear = React.useCallback(() => {
    setQueue([]);
  }, []);

  return {
    queue,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    add,
    remove,
    clear,
  };
};
