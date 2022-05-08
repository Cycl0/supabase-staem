import React, { useState, useEffect } from "react";
import throttle from "lodash.throttle";

const useInfiniteScroll = (callback, heightOffset) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    const currentView = window.innerHeight + window.scrollY;
    const endOfPage = document.documentElement.offsetHeight;
    const isBottomReached = currentView + heightOffset >= endOfPage;
    if (isBottomReached && !isFetching) {
      setIsFetching(true);
    }
  };

  const debounceWaitTime = 1000;
  const debounceOptions = { leading: true, trailing: true };
  const throttledHandleScroll = throttle(
    handleScroll,
    debounceWaitTime,
    debounceOptions
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll, { capture: true });
    window.addEventListener("resize", throttledHandleScroll, { capture: true });
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll, {
        capture: true,
      });
      window.removeEventListener("resize", throttledHandleScroll, {
        capture: true,
      });
    };
  }, []);

  useEffect(() => {
    if (isFetching) {
      callback();
      setIsFetching(false);
    }
  }, [isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
