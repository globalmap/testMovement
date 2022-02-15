import {
  addNodeModel, getBoundingBox, setConfiguration,
} from "./threekitFunc";
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
        const hits = e.hitNodes;

        if (!hits.length) return;

        const hierarchy = [...hits[0].hierarchy];

        hierarchy.reverse();

        for (let node of hierarchy) {
          if (node.name.includes("Plus")) {
            window.player.selectionSet.set(node.nodeId);
            const {position} = window.points.find((e: any) => e.id === node.nodeId);
            console.log(node.nodeId)
            const boundingBox = await getBoundingBox({id: node.nodeId})

            console.log({position})

            const attrs = window.player.enableApi("player").configurator.configuration[`Left Objects`];
              

            setConfiguration({
              data: [
                ...attrs,
                {
                  assetId: "142ddd07-f3ac-4afd-88d8-4690bcb298ae",
                },
              ],
              attr: `Left Objects`,
            });

            let translation = {x: 0, y: 0, z: 0}
            if(position === "Top") {
              translation = {x: boundingBox.max.x, y: 0, z: boundingBox.max.z-0.66}
              
            }
            if(position === "Right") {
              translation = {x: boundingBox.max.x+0.4, y: 0, z: boundingBox.max.z}
            }
            if(position === "Left") {
              translation = {x: boundingBox.min.x-0.4, y: 0, z: boundingBox.min.z}
            }

            if(position === "Bottom") {
              translation = {x: boundingBox.max.x, y: 0, z: boundingBox.max.z+0.56}
            }
            addNodeModel("142ddd07-f3ac-4afd-88d8-4690bcb298ae", translation)
          }
        }
      },
    },
  };
};
