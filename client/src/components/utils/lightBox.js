import React, { Component } from 'react';
//import Lightbox from 'react-images';

import Carousel, { Modal, ModalGateway } from 'react-images';

class ImageLightBox extends Component {

    state = {
        modalIsOpen: this.props.open,
        currentImage: this.props.pos,
        images: []
    }
    static getDerivedStateFromProps(props, state) {
        if (props.images) {
          const images = [];
          props.images.forEach(element => {
            images.push({ src: `${element}` });
          });
          return (state = {
            images
          });
        }
        return false;
      }
    
    toggleModal = () => {
        this.props.onclose();
    }
    render() {
        const { modalIsOpen } = this.state;
        console.log('from lightbox->', modalIsOpen);

        return (
            <ModalGateway>
                {modalIsOpen ? (
                    <Modal onClose={this.toggleModal}>
                        <Carousel views={this.state.images} currentIndex={this.state.currentImage} />
                    </Modal>
                ) : null}
            </ModalGateway>
        );
    }
}

export default ImageLightBox;