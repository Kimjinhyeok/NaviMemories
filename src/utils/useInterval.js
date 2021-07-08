import React from "react";

export default function useInterval(callback, delay) {

  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      ref.current();
    }
    if(delay != null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}