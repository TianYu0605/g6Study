import G6 from "@antv/g6";
import { useEffect, useRef, useState } from "react";

// 实例化 minimap 插件
const minimap = new G6.Minimap({
  size: [100, 100],
  className: "minimap",
  type: "delegate",
});

// 实例化 Image Minimap 插件
const imageMinimap = new G6.ImageMinimap({
  width: 200,
  graphImg: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ",
});

// 实例化 grid 插件(画布底部有网格)
const grid = new G6.Grid();

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

const UsePlugin = () => {
  const ref = useRef<any>(null);
  const [graph, setGraph] = useState<any>(null);

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: ref.current,
        width: 800,
        height: 200,
        plugins: [minimap, grid], // 将 minimap 实例配置到图上
        defaultNode: {
          type: "circle",
        },
        layout: {
          type: "fore",
          preventOverlap: true, // 防止节点重叠
        },
      });
      graph.data(data);
      graph.render();
    }
  }, []);
  return <div ref={ref} />;
};

export default UsePlugin;
