import { xyzType } from "./types";

export const getMetadata = (assetId: string) => {
  const {
    configurator: { metadata },
  } = window.player.scene.get({ id: assetId });

  return metadata;
}

export const getNameModel = (id: string) => {
  const {name} = window.player.scene.get({id})
  return name
}

export const generationTranslation = (position: string, name: string, currentTranslation: xyzType) => {
  if(position === "Right" || position === "Left") {
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
}

export const setConfiguration = async (attr: string, data: any) => {
  return await window.configurator.setConfiguration({ [attr]: data })
}

export const addNodeModel = (assetId: string, translation: xyzType, rotate: xyzType) => {
  const id = window.player.scene.addNode({
    id: `Model${Math.random() * 100}`,
    type: "Model",
    name: `${"Model"}_${assetId}_` + Math.random(),
    plugs: {
      Null: [
        {
          type: "Model",
          asset: {
            assetId,
          },
        },
      ],
      Transform: [
        {
          "type": "Transform",
          "active": true,
          "translation": translation,
          "rotation": rotate
        }
      ]
    },
  }, window.player.instanceId)

  // const metadata = getMetadata(assetId);
  // const name = getNameModel(assetId);
  // const positions = metadata.find((e: any) => e.name === "Positions");   
  // return {metadata, name, positions};
  return id
}

export const addNodePoints = async (cube: {name: string, id: string}, translation: xyzType) => {
  const id = window.player.scene.addNode(
    {
        id: `${cube.name}` + Math.random(),
        type: "Sprite",
        name: `${"Plus"}_${cube.name}_` + Math.random(),
        plugs: {
            Sprite: [
                {
                    type: "Sprite",
                    asset: {
                        assetId: "4d55aaea-7f3d-41d0-bed0-9757c72aa1da",
                    },
                    scale: {
                        x: 0.3,
                        y: 0.3,
                    },
                    baseMap: {
                        assetId: "44527b00-f420-4851-9a81-07d696ea5d74",
                        configuration: "",
                        type: "texture",
                    },
                },
            ],
            Transform: [
                {
                    type: "Transform",
                    active: true,
                    translation//: createTranslationPoints(boundingBox, position, cube),
                },
            ],
        },
    },
    window.player.instanceId
  );

}