import { Component } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    // console.log(e);
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onOverleyClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const { url } = this.props;
    return (
      <Overlay onClick={this.onOverleyClick}>
        <ModalDiv>
          <img src={url} alt="" />
        </ModalDiv>
      </Overlay>
    );
  }
}
Modal.protoType = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
