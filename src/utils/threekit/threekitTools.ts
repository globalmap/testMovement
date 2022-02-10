import { getAttrs, getBoundingBox, getObjectByName, setConfiguration, setTranslationXYZ } from "./threekitFunc";
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
            console.log(node);
            // window.player.selectionSet.add({ name: node.nodeId });
            const attr =
              window.player.enableApi("player").configurator.configuration[
                "add_cube_OH"
              ];
            

            const position = getBoundingBox(node.nodeId);
            const newAttr = await setConfiguration({
              data: [
                ...attr,
                {
                  assetId: "29ac94f0-e0b2-46ff-8fb3-178c772ac788",
                  configuration: "",
                  type: "model",
                },
              ],
              attr: "add_cube_OH",
            });
            // const newObject = getObjectByName(`Model${newAttr["add_cube_OH"].length}`)

            // setTranslationXYZ(`Model${newAttr["add_cube_OH"].length}`, {x: position.max.x, z: position.max.z})
            
            // set
          }
        }
      },
    },
  };
};
