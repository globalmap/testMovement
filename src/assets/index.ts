import React from 'react';
import { iconsSides } from './icons';

const SvgIcons = (name: 'LAF' | 'RAF') => {
	const iconSvg = iconsSides[name]

	return iconSvg;
}

export default SvgIcons;