import React from "react";
import s from "./DeleteModel.module.scss";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getActiveModel } from "../../redux/selectors";
import { deleteItem } from "../../utils/threekit/threekitUtils";
import { deleteActiveModel } from "../../redux/actions/player.actions";

const DeleteModel = () => {
	const dispatch = useAppDispatch();
  const activeModel = useAppSelector(getActiveModel);

  if (activeModel) {
    return (
      <div className={s.container}>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            deleteItem(activeModel);
						dispatch(deleteActiveModel())
          }}
        >
          Delete Model
        </Button>
      </div>
    );
  }

  return <></>;
};

export default DeleteModel;
