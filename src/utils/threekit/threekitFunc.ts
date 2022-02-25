import { asset } from "./threekitTypes";

export const getObjectById = (id: string) => {
	return window.player.scene.get({from: window.player.instanceId, id})
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

	function filterMethod(sideA: string, sideB: string) {
		const filteredModels: any[] = [];
		if(findPoint.position === sideA) {
			models.forEach((model: any) => {
				const parseMetadata = JSON.parse(model.metadata.Positions)
				let findBottom: any;
				if(findPoint.type === "Corner") {
					// if(model.)
					console.log({model})
				} else {
					findBottom = parseMetadata.find((pos: any) => pos === sideB)
				}
				
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

export function addNodeModel(assetId: string, boundingBox: any) {
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
				}
			]
		},
	}, window.player.instanceId)

	window.models = [...window.models, id];

	return id;
}
