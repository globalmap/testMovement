import {
  getBoundingBox,
  setConfiguration,
  addNodeModel,
  getAttrs,
  getTranslation,
  setTranslationXYZ,
} from "./threekitFunc";
import { asset } from "./threekitTypes";

export const addItem = async (
  nodeId: string,
  assetId: string,
  name: string,
  type: string
) => {
  const findPoint = window.points.find((e: any) => e.id === nodeId);
  let position = findPoint ? findPoint.position : "";
  const boundingBox = await getBoundingBox({ id: nodeId });

  console.log({type})

  const attrs = getAttrs("Left Objects");

  setConfiguration({
    data: [
      ...attrs,
      {
        assetId,
      },
    ],
    attr: `Left Objects`,
  });

  let currentTranslation = { x: 0, y: 0, z: 0 };
  if (position === "Top") {
    currentTranslation = {
      x: boundingBox.min.x,
      y: 0,
      z: boundingBox.max.z - 0.5,
    };
  }
  if (position === "Right") {
    currentTranslation = { x: boundingBox.min.x, y: 0, z: boundingBox.max.z };
  }
  if (position === "Left") {
    currentTranslation = { x: boundingBox.min.x, y: 0, z: boundingBox.min.z };
  }

  if (position === "Bottom") {
    currentTranslation = {
      x: boundingBox.max.x,
      y: 0,
      z: boundingBox.max.z + 0.5,
    };
  }

  if (position === "Right" || position === "Left") {
    if (
      name.toLowerCase().includes("loveseat")
    ) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 2
            : currentTranslation.x + 2,
      };
    }

    if(name.toLowerCase().includes("chaise")) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.5
            : currentTranslation.x + 0.5,
        z: currentTranslation.z + 1.5
      };
    }

    if (
      name.toLowerCase().includes("unit") ||
      name.toLowerCase().includes("chair")
    ) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.5
            : currentTranslation.x + 0.5,
      };
    }
  }

  addNodeModel(assetId, currentTranslation);
};

export const deleteItem = async (nodeId: string) => {
  if (window.models && window.models.length > 1) {
    console.log(nodeId);
    window.player.scene.deleteNode(nodeId);
    const attr: asset[] = getAttrs("Left Objects");

    window.points = window.points.filter((e: any) => {
      if (e.model === nodeId) {
        window.player.scene.deleteNode(e.id);
        return false;
      } else {
        return true;
      }
    });

    window.models.forEach((model, index) => {
      if (model === nodeId) {
        const filterAttr = attr.filter((_, indx) => indx !== index);
        setConfiguration({ data: filterAttr, attr: "Left Objects" });
      }
    });
    window.models = window.models.filter((id) => id !== nodeId);
  }
};
