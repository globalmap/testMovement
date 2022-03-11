import {
  getBoundingBox,
  setConfiguration,
  addNodeModel,
  getAttrs,
  getTranslation,
  setTranslationXYZ,
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
    rotate = {...rotate, y: 90}
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

  if (position === "Right" || position === "Left") {
    if (
      name.toLowerCase().includes("loveseat")
    ) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.8
            : currentTranslation.x + 0.8,
        z: currentTranslation.z + 0.45
      };
    }

    if(name.toLowerCase().includes("sofa")) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.95
            : currentTranslation.x + 0.95,
        z: currentTranslation.z + 0.45
      };
    }

    if(name.toLowerCase().includes("chaise")) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.5
            : currentTranslation.x ,
        z: currentTranslation.z + 1.5
      };
    }

    if (
      name.toLowerCase().includes("unit")
    ) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.5
            : currentTranslation.x + 0.4,
        z: currentTranslation.z + 0.45
      };
    }

    if(name.toLowerCase().includes("chair")) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.5
            : currentTranslation.x + 0.3,
        z: currentTranslation.z + 0.45
      };
    }

    if(name.toLowerCase().includes("raf chair")) {
      currentTranslation = {
        ...currentTranslation,
        x: currentTranslation.x + 0.1,
        z: currentTranslation.z - 0.5
      };
    }

    if (name.toLowerCase().includes("wedge")) {
      currentTranslation = {
        ...currentTranslation,
        x:
          position === "Left"
            ? currentTranslation.x - 0.5
            : currentTranslation.x + 0.6,
        z: currentTranslation.z + 0.73
      };
    }
  }
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
