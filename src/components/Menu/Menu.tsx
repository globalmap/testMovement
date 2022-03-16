import React from "react";
import { Divider, List, Typography } from "antd";
import s from './Menu.module.scss';
import { useSelector } from "react-redux";
import { getLoadPlayer } from "../../redux/selectors/player.selector";

const { Title } = Typography;

const list = [
  {title: "lorem"},
  {title: "lorem"},
  {title: "lorem"},
  {title: "lorem"},
  {title: "lorem"},
  {title: "lorem"},
];

const MenuComponent = () => {
  const loadPlayer = useSelector(getLoadPlayer)

  if(loadPlayer) {
    return (
      <div className={s.container}>
        <Title>Models</Title>
        <Divider />
        <List
          size="large"
          dataSource={list}
          bordered
          renderItem={(item) => <List.Item className={s.listItem}>{item.title}</List.Item>}
        />
      </div>
    );
  }
  
  return <></>
}

export default MenuComponent;