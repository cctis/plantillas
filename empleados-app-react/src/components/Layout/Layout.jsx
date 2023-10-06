import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
const { Header, Content, Footer } = Layout;

const LayoutContainer = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'LightGrey'
        }}
      >
        <div className="demo-logo" />
        <h3>Gestión de Empleados en Cognox</h3>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Empleados</Breadcrumb.Item>
          <Breadcrumb.Item>Lista</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 450,
            background: colorBgContainer,
          }}
        >
          { children }
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Reto Gestión de Empleados ©2023 Realizado por Cristina
      </Footer>
    </Layout>
  );
};
export default LayoutContainer;