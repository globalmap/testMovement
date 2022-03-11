import {
  getBoundingBox,
  setConfiguration,
  addNodeModel,
  getAttrs,
  getTranslation,
  setTranslationXYZ,
  generateTranslation,
} from "./threekitFunc";
import { asset } from "./threekitTypes";

function moveElements(currentTranslation: any) {
  // window.models.forEach((model) => {
  //   // const currentTranslation = getBoundingBox({id: model})
  //   const findModel = window.models.find((mdl) => mdl !== model && currentTranslation.min.x >= getBoundingBox({id: mdl}).min.x)

  //   if(findModel) {
  //     console.log("ok")
  //     setTranslationXYZ({id: findModel}, {x: getBoundingBox({id: findModel}).max.x})
  //   }
  // })

  const findModel = window.models.find((mdl) => currentTranslation.x > getBoundingBox({id: mdl}).min.x && currentTranslation.x < getBoundingBox({id: mdl}).max.x)

  if(findModel) {
    console.log("ok")
    setTranslationXYZ({id: findModel}, {x: getBoundingBox({id: findModel}).max.x})
  }
}

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

  const attrs = getAttrs("Models");

  setConfiguration({
    data: [
      ...attrs,
      {
        assetId,
      },
    ],
    attr: `Models`,
  });



  let currentTranslation = { x: 0, y: 0, z: 0 };
  let rotate = {x: 0, y: 0, z: 0}

  if(type === "Corner") {
    rotate = {...rotate, y: -90}
  }

  if (position === "Top") {
    currentTranslation = {
      x: boundingBox.min.x,
      y: 0,
      z: boundingBox.max.z - 0.5,
    };
  }

  if (position === "Right") {
    currentTranslation = { x: boundingBox.max.x, y: 0, z: boundingBox.max.z };
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

  currentTranslation = generateTranslation(position, name, currentTranslation, type)
  // moveElements(currentTranslation)
  addNodeModel(assetId, currentTranslation, rotate);
// setTimeout(() => {
//   if(window.models.length > 1) {
    

//   }
// }, 500)

};

export const deleteItem = async (nodeId: string) => {
  if (window.models && window.models.length > 1) {
    console.log(nodeId);
    window.player.scene.deleteNode(nodeId);
    const attr: asset[] = getAttrs("Models");

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
        setConfiguration({ data: filterAttr, attr: "Models" });
      }
    });
    window.models = window.models.filter((id) => id !== nodeId);
  }
};
