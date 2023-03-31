import { Overlay, ModalDiv } from './Modal.styled';

export const Modal = ({url}) => {
    return (
      <Overlay>
        <ModalDiv>
          <img src={url} alt="" />
        </ModalDiv>
      </Overlay>
    );
}