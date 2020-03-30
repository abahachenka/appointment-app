import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal-blackout">
                <div className="modal">
                    <header>
                        <h3 className="modal-title">{this.props.title}</h3>

                        {this.props.onClose ? (
                            <button onClick={this.props.onClose}>X</button>
                        ): null}
                        
                    </header>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func
}

export default Modal;