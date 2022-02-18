import { useEffect } from 'react';

export function useOutsideAlerter(ref: any, callback: () => void) {
  useEffect(() => {
    if (ref === null) {
      return () => {};
    }
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && event.target && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
