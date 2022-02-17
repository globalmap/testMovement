import {
  addNodeModel, getBoundingBox, setConfiguration,
} from "./threekitFunc";
import { addItem, deleteItem } from "./threekitUtils";
export const movementTool = () => {
  let startPoint = 0;
  return {
    active: true,
    enabled: true,
    key: "movement",
    handlers: {
      drag: (ev: any) => {
        console.log("drag", ev);
        return {
          handle: (ev: any) => {
            console.log("handle", ev);
            const newClientX = ev.isTouch
              ? ev.clientX
              : ev.originalEvent.clientX;
          },
        };
      },
    },
  };
};


export const clickTools = () => {
  return {
    active: true,
    enabled: true,
    key: "clickTools",
    handlers: {
      mousedown: async (e: any) => {
        console.log({e})
        const hits = e.hitNodes;

        if (!hits.length) return;

        const hierarchy = [...hits[0].hierarchy];

        hierarchy.reverse();

        for (let node of hierarchy) {
          if (node.name.includes("Plus")) {
            addItem(node)
            break;
          }

          if(node.name.includes("Model")) {
            deleteItem(node)
          }
        }
      },
    },
  };
};
