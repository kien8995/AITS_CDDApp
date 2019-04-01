import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, ConfigProvider, Icon } from 'antd';
import { remote } from 'electron';
import ListItem from './ListItem';

const ListHeader = styled.div`
  font-weight: bold;
  font-size: 14pt;
`;

const StyledList = styled(({ maxHeight, ...restProps }) => <List {...restProps} />)`
  & .ant-list-item:nth-child(even) {
    background: #eee;
  }
  overflow-y: auto;
  max-height: ${props => props.maxHeight}px;
`;

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <Icon type="sync" spin style={{ fontSize: 20, marginBottom: 10 }} />
    <p>File Not Found</p>
  </div>
);

const ListFile = ({ loading, dataSource }) => {
  const [windowHeight, setWindowHeight] = useState(
    remote.getCurrentWindow().getSize()[1],
  );

  useEffect(() => {
    remote.getCurrentWindow().on('resize', () => {
      setWindowHeight(remote.getCurrentWindow().getSize()[1]);
    });
    return () => {
      remote.getCurrentWindow().removeAllListeners();
    };
  }, []);

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <StyledList
        size="large"
        itemLayout="horizontal"
        header={<ListHeader>List of CDD files</ListHeader>}
        bordered
        loading={loading}
        dataSource={dataSource}
        renderItem={item => <ListItem item={item} />}
        maxHeight={windowHeight * 0.8}
      />
    </ConfigProvider>
  );
};

ListFile.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
};

export default ListFile;
