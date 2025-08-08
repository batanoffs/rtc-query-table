import { Row } from 'antd';
import { styled } from 'styled-components';

const Container = styled('div')`

`;

const ContentContainer = styled(Row)`
  height: 100%;
`;

const FormContainer = styled(Row)`
  flex: 1;
  min-height: 100%;
`;

const S = {
  Container,
  ContentContainer,
  FormContainer,
};

export default S;
