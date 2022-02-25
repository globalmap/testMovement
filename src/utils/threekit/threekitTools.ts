import { addActivePoint, addActiveModel } from "../../redux/actions/player.actions";

export const clickTools = (dispatch: any) => {
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
            window.player.selectionSet.set(node.nodeId);
            dispatch(addActivePoint(node.nodeId))
            break;
          }

          if(node.name.includes("Model")) {
            window.player.selectionSet.set(node.nodeId);
            dispatch(addActiveModel(node.nodeId))
          }
        }
      },
    },
  };
};
