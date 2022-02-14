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
                  assetId: "29ac94f0-e0b2-46ff-8fb3-178c772ac788",
                  configuration: "",
                  type: "model",
                },
              ],
              attr: `Left Objects`,
            });

            // window.configurator.setConfiguration({
            //   "Left Objects": [
            //     ...attrs,
            //     {
            //       asset: "29ac94f0-e0b2-46ff-8fb3-178c772ac788",
            //       configuration: "",
            //       type: "model",
            //     },
            //   ],
            // });

            let translation = {x: 0, y: 0, z: 0}
            let rotation = {x: 0, y: 0, z: 0}
            if(position === "Top") {
              translation = {x: boundingBox.max.x-0.15, y: 0, z: boundingBox.max.z-0.66}
              
            }
            if(position === "Right") {
              translation = {x: boundingBox.max.x+0.4, y: 0, z: boundingBox.max.z-0.15}
              // rotation = {x: 0, y: 80, z: 0}
            }
            if(position === "Left") {
              translation = {x: boundingBox.min.x-0.56, y: 0, z: boundingBox.min.z-0.15}
            }

            if(position === "Bottom") {
              translation = {x: boundingBox.max.x-0.15, y: 0, z: boundingBox.max.z+0.56}
            }
            addNodeModel("29ac94f0-e0b2-46ff-8fb3-178c772ac788", translation, rotation)

            // window.player.scene.deleteNode(node.nodeId)
            // window.points = window.points.filter(((e: any) => e.id !== node.nodeId))
            // window.player.selectionSet.add({ name: node.nodeId });
            // const attrs =
            //   window.player.enableApi("player").configurator.configuration[
            //     `${position} Objects`
            //     // `Left Objects`
            //   ];
            //   console.log("node", {node, position: `${position} Objects`, attrs});

            // const boundingBox = getBoundingBox({ id: node.nodeId });
            // const newAttr = await setConfiguration({
            //   data: [
            //     ...attrs,
            //     {
            //       assetId: "29ac94f0-e0b2-46ff-8fb3-178c772ac788",
            //       configuration: "",
            //       type: "model",
            //     },
            //   ],
            //   // attr: `Left Objects`,
            //   attr: `${position} Objects`,
            // });
            // // const positionModel = getBoundingBox({
            // //   name: `Model${newAttr["add_cube_OH"].length - 1}`,
            // // });

            // if (position === "Left" || position === "Right") {
            //   // setTranslationXYZ(
            //   //   { name: `Model${newAttr["add_cube_OH"].length}` },
            //   //   {
            //   //     x: boundingBox.min.x * 2.15,
            //   //       // boundingBox.min.x < 1
            //   //       //   ? boundingBox.min.x
            //   //       //   : boundingBox.min.x * 2.15,
            //   //     z: boundingBox.max.z,
            //   //   }
            //   // );
            //   // const translation = getBoundingBox({name: `Model${newAttr["add_cube_OH"].length}`})
            //   // points
            //   // setTranslationXYZ(
            //   //   { id: window.points[window.points.length - 1].id },
            //   //   { x: boundingBox.max.x*2, z: boundingBox.max.z }
            //   // );
            // }
          }
        }
      },
    },
  };
};
