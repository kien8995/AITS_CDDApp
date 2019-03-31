import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'antd';

const StyledItem = styled(List.Item)`
  cursor: pointer;
  transition: color 0.3s ease;
  -webkit-transition: color 0.3s ease;
  &:hover {
    background-color: #40a9ff;
    color: #fff;
  }
`;

const ListItem = ({ item }) => (
  <List.Item>
    <List.Item.Meta
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      title={<a href="#">{item.name}</a>}
      description={item.file}
    />
    <div>{item.fileDate}</div>
  </List.Item>
);

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
