import React, { useEffect, useState } from "react";
import { getAttrs } from "../../utils/threekit/threekitFunc";

export const List = () => {
	
	useEffect(() => {
		if(window.player) {
			const ids = window.player.selectionSet.ids[0];
	
			console.log({ids})
		}
	}, [])
	
	return (
		<div>
			<ul>
			dasdaaaaaaaaaaa
			</ul>
		</div>
	);
}