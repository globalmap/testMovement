import { asset } from "./threekitTypes";

export const getObjectById = (id: string) => {
	return window.player.scene.get({from: window.player.instanceId, id})
}

export function findCorner() {
	const models = window.models;
	let state = false;
	const corners: any[] = []

	models.forEach((id) => {
			const model = window.player.scene.get({ id, plug: "Null", property: "asset" });

			if (model) {
					const asset = window.player.scene.get({ id: model.assetId })
					console.log('asset', asset);

					console.log({ asset })

					const type = asset.configurator.metadata.find(((e: any) => e.name === "Type" && e.defaultValue === "Corner"));
					if (type && !state) {
							state = true
					}

					if(type) {
						corners.push(type)
					}
			}
	})

	return corners;
}
// const activeElement = getObjectById(window.player.selectionSet.ids[0])

const sides = [
	{sideA: "Top", sideB: "Bottom"},
	{sideA: "Bottom", sideB: "Top"},
	{sideA: "Left", sideB: "Right"},
	{sideA: "Right", sideB: "Left"},
]

export const filterModelBySide = (models: any[], activePoint: string) => {
	const findPoint = window.points.find((point: any) => point.id === activePoint);
	const corner = findCorner()

	function filterMethod(sideA: string, sideB: string) {
		const filteredModels: any[] = [];
		if(findPoint.position === sideA) {
			models.forEach((model: any) => {
				const parseMetadata = JSON.parse(model.metadata.Positions)
				let findBottom: any;
				if(corner && corner.length <= 1) {
					switch (findPoint.position) {
						case "Bottom":
							sideB = "Left"
							break;
					}
				}
				findBottom = parseMetadata.find((pos: any) => pos === sideB)
				console.log({sideA, sideB, activePoint, models})
				if(findBottom) {
					filteredModels.push(model)
				}
			})
		}

		return filteredModels;
	}

	if(findPoint) {
		const filteredModels: any[] = []
		
		sides.forEach(({sideA, sideB}) => {
			filteredModels.push(...filterMethod(sideA, sideB))
		})

		return filteredModels;
	}
}

export const getAttrs = (name: string) => {
	return window.configurator.getConfiguration()[name]
}

export const getAttrValues = (name: string) => {
	const attrs = window.configurator.getDisplayAttributes();
	const findAttrs = attrs.find((attr: any) => attr.name === name);

	if(findAttrs) {
		return findAttrs.values
	}
}

export function getTranslation(object: {name?: string, id?: string}) {
  return window.player.scene.get({
    from: window.player.instanceId,
    ...object,
    plug: "Transform",
    property: "translation",
  });
}

export function setTranslationXYZ(object: {name?: string, id?: string}, { x, y, z }: {x?: number, y?: number, z?: number}) {
  const currentTranslation = getTranslation(object);
	if(currentTranslation) {
		const XTranslation = x ? x : currentTranslation.x;
		const YTranslation = y ? y : currentTranslation.y;
		const ZTranslation = z ? z : currentTranslation.z;
		window.player.scene.set(
			{
				from: window.player.instanceId,
				...object,
				plug: "Transform",
				property: "translation",
			},
			{ x: XTranslation, y: YTranslation, z: ZTranslation }
		);
	}
}

export const getMetadata = (id: string) => {
	const {plugs: {Null}} = window.player.scene.get({from: window.player.instanceId, id})//.find(((e: any)=> e.name === "Position"))
	console.log(Null)

	if(Null) {
		const {configurator: {metadata}} = Null[0]
		return JSON.parse(metadata)
	}
}

interface setConfigurationT {
	data: asset | number | string | boolean | asset[],
	attr: string
}

export const setConfiguration = ({data, attr}: setConfigurationT) => {
	window.configurator.setConfiguration({[attr]: data});
}

export const getBoundingBox = (data: {id?: string, name?: string}) => {
	const object = window.player.scene.get({from: window.player.instanceId, ...data, evalNode: true})

	if(object) {
		return object.getBoundingBox()
	}

	return {
    "min": {
        "x": 0,
        "y": 0,
        "z": 0
    },
    "max": {
        "x": 0,
        "y": 0,
        "z": 0
    }
	}
}

export const filterAssetsByAssetId = (assetId: string, id: string) => {
	const asset: asset | undefined = window.player.scene.get({id, plug: "Null", property: "asset"});
		
	if(asset && asset.assetId === assetId) {
		return false;
	} else {
		return true
	}
}

type xyzType = {
	x: number,
	y: number,
	z: number
}

type boundingBoxType = {
	max: xyzType,
	min: xyzType
}

	const getRootId = async () => {
		const api = window.player;
		let rootSceneId;

		const instanceNode = api.scene.get({ id: api.instanceId });

		if (instanceNode.type === 'Item') {
			api.enableApi('player');
			rootSceneId = await api.player.getAssetInstance({
				id: api.instanceId,
				plug: 'Proxy',
				property: 'asset',
			});
		} else rootSceneId = api.instanceId; // it is a direct scene asset
		return api.scene.findNode({ from: rootSceneId, type: 'Objects' });
	};

export async function addNodeModel(assetId: string, boundingBox: any, rotate: xyzType) {
	const newID = await getRootId()
	console.log("test boundingBox", {boundingBox, newID})

	const id = window.player.scene.addNode({
		id: `Model${Math.random()*100}`,
		type: "Model",
		name: `${"Model"}_${assetId}_`+Math.random(),
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
					"translation": boundingBox,
					"rotation": rotate
				}
			]
		},
	}, newID)

	window.models = [...window.models, id];

	return id;
}


export function generateTranslation(position: string, name: string, currentTranslation: xyzType, type: string, corner: any[]) {
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

  if(type === "Corner") {
    if (
      name.toLowerCase().includes("loveseat") ||
			name.toLowerCase().includes("sofa")
    ) {
      currentTranslation = {
        ...currentTranslation,
        x: currentTranslation.x - 0.45,
        z: currentTranslation.z + 0.3
      };
    }

    if(name.toLowerCase().includes("chaise")) {

    }

    if (
      name.toLowerCase().includes("wedge")
    ) {
			currentTranslation = {
        ...currentTranslation,
        x: currentTranslation.x - 0.7,
        z: currentTranslation.z + 0.12
      };
    }

    if(name.toLowerCase().includes("unit")) {
			currentTranslation = {
        ...currentTranslation,
        x: currentTranslation.x - 0.45,
        z: currentTranslation.z - 0.05
      };
    }

    if(name.toLowerCase().includes("raf chair")) {
			currentTranslation = {
        ...currentTranslation,
        x: currentTranslation.x + 0.05,
        z: currentTranslation.z - 0.1
      };
    }
  }

	return currentTranslation;
}