import styled from "styled-components";
import { Form } from "react-bootstrap";

const Wrapper = styled.div`
  width: 300px;
  padding-bottom: 20px;
  text-align: center;
  background-color: #5b81e8;
  color: #ffffff;
`;

const Header = styled.div`
  padding: 20px 20px;
`;
const Content = styled.div``;

const Logo = styled.span`
  font-size: 1.5rem;
`;
const Ul = styled.ul`
  padding-left: 30px;
`;
const Li = styled.li`
  list-style-type: none;
`;
const Input = styled.input`
  width: 140px;
  margin-right: 5px;
`;
const But = styled.button`
  border: 0;
  background: #4949e5;
  color: white;
  border-radius: 5px;
`;

export default function Popup() {
  return (
    <>
      <Wrapper>
        <Header>
          <Logo id="mainLogo">아프리카tv 채팅 모아보기</Logo>
        </Header>
        <Content>
          <Ul>
            <Li>
              <Form.Check type="switch" id="bj-switch" label="BJ" />
            </Li>
            <Li>
              <Form.Check type="switch" id="manager-switch" label="매니저" />
            </Li>
            <Li>
              <Form.Check type="switch" id="topfan-switch" label="열혈팬" />
            </Li>
            <Li>
              <Form.Check type="switch" id="subscribe-switch" label="구독자" />
            </Li>
            <Li>
              <Form.Check type="switch" id="fan-switch" label="팬" />
            </Li>
          </Ul>
          <div>삭제하려면 닉네임을 클릭하세요</div>
          <Input id="nickname-input" type="text" placeholder="닉네임을 입력하세요" />
          <But id="add-btn">추가하기</But>
          <div id="nickname-list"></div>
        </Content>
      </Wrapper>
    </>
  );
}
