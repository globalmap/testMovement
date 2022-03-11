import React, { useEffect } from 'react'
import s from './List.module.scss';
import { Divider, Typography, List } from 'antd';
import { filterModelBySide, getAttrValues } from '../../utils/threekit/threekitFunc';
import { getActivePoint } from '../../redux/selectors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { addItem } from '../../utils/threekit/threekitUtils';
import DeleteModel from '../DeleteModel/DeleteModel';
import { deleteActivePoint } from '../../redux/actions/player.actions';

const { Title, Paragraph } = Typography;

const ListModels = () => {
	const dispatch = useAppDispatch();
	const models = getAttrValues("Models")
	const activePoint = useAppSelector(getActivePoint);

	if(window.points) {
		const filteredModels = filterModelBySide(models, activePoint)
		const point = window.points.find((point: any) => point.id === activePoint);
		console.log({filteredModels})
		return (
			<div className={s.container}>
				<div className={s.title}>
					<Title level={2}>Models</Title>
				</div>
				<Divider />
				<div className={s.items}>
					{filteredModels ? (
							<List
								size="default"
								bordered
								dataSource={filteredModels}
								locale={{emptyText: "models for this area not found"}}
								renderItem={(item: any) => <List.Item onClick={() => {
									addItem(activePoint, item.assetId, item.name, point?.type)
									dispatch(deleteActivePoint())
								}}>{item.name.toUpperCase()}</List.Item>}
							/>
					) : (<Paragraph type='secondary'>If list of models is empty, please click on "+" in left model</Paragraph>)}
				</div>
				
			</div>
		)
	}


	return <></>
}

export default ListModels;
