import { getBoundingBox, setConfiguration, addNodeModel, getAttrs, filterAssetsByAssetId } from "./threekitFunc";
import { asset } from "./threekitTypes";

export const addItem = async (node: any) => {
  window.player.selectionSet.set(node.nodeId);
  const findPoint = window.points.find((e: any) => e.id === node.nodeId);
	let position = findPoint ? findPoint.position : ""
  const boundingBox = await getBoundingBox({id: node.nodeId})

  const attrs = getAttrs("Left Objects");
 
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
    translation = {x: boundingBox.min.x, y: 0, z: boundingBox.max.z-0.5}
    
  }
  if(position === "Right") {
    translation = {x: boundingBox.max.x+0.5, y: 0, z: boundingBox.max.z}
  }
  if(position === "Left") {
    translation = {x: boundingBox.min.x-0.5, y: 0, z: boundingBox.min.z}
  }

  if(position === "Bottom") {
    translation = {x: boundingBox.max.x, y: 0, z: boundingBox.max.z+0.5}
  }
  addNodeModel("142ddd07-f3ac-4afd-88d8-4690bcb298ae", translation)
}

export const deleteItem = async (node: any) => {
	if(window.models && window.models.length > 1) {
		window.player.selectionSet.set(node.nodeId);
		window.player.scene.deleteNode(node.nodeId)
		const attr: asset[] = getAttrs("Left Objects");

		window.points = window.points.filter((e: any) => {
			if(e.model === node.nodeId) {
				window.player.scene.deleteNode(e.id)
				return false
			} else {
				return true
			}
		})

		window.models.forEach((model, index) => {
			if(model === node.nodeId) {
        console.log(`model ${model}`)
				const filterAttr = attr.filter((_, indx) => indx !== index)
				setConfiguration({ data: filterAttr, attr: "Left Objects" });
			}
			
		})
    window.models = window.models.filter((id) => id !== node.nodeId)

	}
}