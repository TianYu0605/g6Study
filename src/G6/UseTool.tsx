import G6 from "@antv/g6";
import { useEffect, useRef, useState } from "react";

const data = {
  // 点集
  nodes: [
    {
      id: "node1", // 节点的唯一标识
      x: 100, // 节点横坐标
      y: 50, // 节点纵坐标
      label: "起始点", // 节点文本
    },
    {
      id: "node2",
      x: 300,
      y: 50,
      label: "目标点",
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: "node1", // 起始点 id
      target: "node2", // 目标点 id
      label: "我是连线", // 边的文本
    },
  ],
};

const UseTool = () => {
  const ref = useRef<any>(null);
  const [graph, setGraph] = useState<any>(null);

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: ref.current,
        width: 800,
        height: 200,
        defaultNode: {
          type: "circle",
        },
        modes: {
          default: [
            // ...
            {
              type: "tooltip", // 节点提示框
              // ...
            },
            {
              type: "edge-tooltip", // 边提示框
              formatText(model) {
                // 边提示框文本内容
                const text = "source: " + model.source + "<br/> target: " + model.target + "<br/> weight: " + model.weight;
                return text;
              },
            },
          ],
        },
      });
      graph.data(data);
      graph.render();
    }
  }, []);
  return <div ref={ref} />;
};

export default UseTool;
