export const getAttrs = () => {
	if(window.configurator) {
		return window.configurator.getAttributes();
	}

	return []
}

export const getObjectByName = (name: string) => {
	return window.player.scene.get({from: window.player.instanceId, name})
}

function getTranslation(objectName: string) {
  return window.player.scene.get({
    from: window.player.instanceId,
    name: objectName,
    plug: "Transform",
    property: "translation",
  });
}

export function setTranslationXYZ(object: string, { x, y, z }: {x?: number, y?: number, z?: number}) {
  const currentTranslation = getTranslation(object);
	if(currentTranslation) {
		const XTranslation = x ? x : currentTranslation.x;
		const YTranslation = y ? y : currentTranslation.y;
		const ZTranslation = z ? z : currentTranslation.z;
		window.player.scene.set(
			{
				from: window.player.instanceId,
				name: object,
				plug: "Transform",
				property: "translation",
			},
			{ x: XTranslation, y: YTranslation, z: ZTranslation }
		);
	}
}

// export const get = (id: string) => {
// 	const {plugs: {Null}} = window.player.scene.get({from: window.player.instanceId, id})//.find(((e: any)=> e.name === "Position"))

// 	if(Null) {
// 		const {configurator: {metadata}} = Null[0]
// 		return JSON.parse(metadata)
// 	}
// }

interface setConfigurationT {
	data: {
		assetId: string
	} | number | string | boolean | any[],
	attr: string
}

export const setConfiguration = ({data, attr}: setConfigurationT) => {
	return window.configurator.setConfiguration({[attr]: data})
}

export const getBoundingBox = (id: string) => {
	const object = window.player.scene.get({from: window.player.instanceId, id, evalNode: true})

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