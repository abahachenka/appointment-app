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

                        <button onClick={this.props.onClose}>
                            X
                        </button>
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