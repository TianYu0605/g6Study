import G6 from "@antv/g6";
import { useEffect, useRef, useState } from "react";

const data = {
  nodes: [
    {
      id: "node1",
      type: "rect", // 元素的图形
      size: [200, 400], // 元素的大小 number/number[]
      label: "Circle1", // 标签文字
      visible: true, // 控制初次渲染显示与隐藏，若为 false，代表隐藏。默认不隐藏
      labelCfg: {
        // 标签配置属性
        positions: "center", // 标签的属性，标签在元素中的位置
        style: {
          // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
          fontSize: 12, // 标签的样式属性，文字字体大小
          // ...            // 标签的其他样式属性
        },
      },
      x: 100, //x轴坐标
      y: 150, // y轴坐标
      style: {
        // 包裹样式属性的字段 style 与其他属性在数据结构上并行
        fill: "#000", // 样式属性，元素的填充色
        stroke: "#888", // 样式属性，元素的描边色
      },
    },
    {
      id: "node2",
      label: "Circle2",
      x: 600,
      y: 150,
    },
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
    },
  ],
};

const TreeG = () => {
  const ref = useRef<any>(null);
  const [graph, setGraph] = useState<any>(null);

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: ref.current,
        width: 800,
        height: 400,
        layout: {
          type: "fore",
          preventOverlap: true, // 防止节点重叠
          // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
          linkDistance: 100, // 指定边距离为100,两个元素之间的边距离长度太近的话，边上的文字可能会重叠
        },
        animate: true, // 是否启用图的动画。 默认false
        fitView: true, // 是否将图适配到画布大小，可以防止超出画布或留白太多 默认false
        fitViewPadding: [12, 131, 41, 51], // 画布上的四周留白宽度  上右下左
        //图上行为模式的集合， 默认值null
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node"], // 默认模式 允许拖拽画布、放缩画布、拖拽节点
          // edit: [], // 编辑模式什么也不让干
        },
        //节点默认的属性，包括节点的一般属性和样式属性（style）
        defaultNode: {
          type: "circle", // 圆形
          size: [200], // 直径
          // color: "red", // 边的颜色 优先级最高
          style: {
            fill: "green", // 填充的颜色
            stroke: "#00ccff", // 节点描边色
            lineWidth: 20, // 节点描边粗细
          },
          labelCfg: {
            style: {
              fill: "red", // 节点上字体的颜色
              fontSize: 68, // 字体的大小
            },
          },
        },
        // 边默认的属性，包括边的一般属性和样式属性（style）。
        defaultEdge: {
          style: {
            stroke: "#e2e2e2", // 边描边颜色
            opacity: 0.6, // 边透明度
          },
          // 边上的标签文本配置
          labelCfg: {
            autoRotate: true, // 边上的标签文本根据边的方向旋转
          },
        },
        // 节点在除默认状态外，其他状态下的样式属性（style）。例如鼠标放置（hover）、选中（select）等状态。
        nodeStateStyles: {
          hover: {
            fill: "blue", // hover节点时更改填充颜色
          },
          select: {
            fill: "pink",
          },
        },
        edgeStateStyles: {
          hover: {},
          select: {},
        },
      });
      setGraph(graph);
      graph.data(data);
      graph.render();
      // 监听鼠标进入节点
      graph.on("node:mouseenter", (e) => {
        const nodeItem: any = e.item;
        // 设置目标节点的 hover 状态 为 true
        graph.setItemState(nodeItem, "hover", true);
        graph.setItemState(nodeItem, "select", true);
      });
      // 监听鼠标离开节点
      graph.on("node:mouseleave", (e) => {
        const nodeItem: any = e.item;
        // 设置目标节点的 hover 状态 false
        graph.setItemState(nodeItem, "hover", false);
        graph.setItemState(nodeItem, "select", false);
      });

      // 点击节点
      graph.on("node:click", (e) => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach((cn) => {
          graph.setItemState(cn, "click", false);
        });
        const nodeItem: any = e.item; // 获取被点击的节点元素对象
        graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
      });

      // 点击边
      graph.on("edge:click", (e) => {
        // 先将所有当前是 click 状态的边置为非 click 状态
        const clickEdges = graph.findAllByState("edge", "click");
        clickEdges.forEach((ce) => {
          graph.setItemState(ce, "click", false);
        });
        const edgeItem: any = e.item; // 获取被点击的边元素对象
        graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
      });
    }
  }, []);
  return <div ref={ref} />;
};

export default TreeG;
