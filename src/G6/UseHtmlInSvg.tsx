import G6 from "@antv/g6";
import { useEffect, useRef, useState } from "react";

const UseHtmlInSvg = () => {
  const ref = useRef<any>(null);
  const [graph, setGraph] = useState<any>(null);

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: ref.current,
        width: 800,
        height: 800,
      });
    }
  }, []);
  return <div ref={ref} />;
};

export default UseHtmlInSvg;
