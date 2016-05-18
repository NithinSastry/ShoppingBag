import React from 'react';

class ItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
        this.closeModal = this.closeModal.bind(this);
        this.getSizes = this.getSizes.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
        this.returnModal = this.returnModal.bind(this);
    }

    closeModal() {
        React.unmountComponentAtNode(document.getElementById('modal'));
    }

    getSizes(sizelist) {
        let sizes = [];
        sizelist.forEach((size) => {
            if (this.props.item.p_selected_size.code == size.code) {
                sizes.push(<option value={size.code} selected>{size.code.toUpperCase() }</option>);
            }
            else{
                sizes.push(<option value={size.code}>{size.code.toUpperCase() }</option>);
            }
        });
        return sizes;
    }

    quantityChange(p_id, number, price) {
        this.props.qtyChange(event.target.dataset.id, event.target.value, event.target.dataset.price);
    }

    sizeChange(p_id, size) {
        this.props.sizeChange(event.target.dataset.id, event.target.value);
    }
    
    returnModal() {
        return (
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" onClick={this.closeModal} className="close" data-dismiss="modal" aria-hidden="true">X </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="modal-item-detail">
                                        <p className="toupper">{this.props.item.p_name}</p>
                                        <div className="center">
                                            <span className="currency center">{this.props.item.c_currency}</span>
                                            <span className="item-price">{this.props.item.p_price}</span>
                                        </div>
                                        <div className="size-color">
                                            <span className="toupper center modal-size">Size</span>
                                            <select className="form-control modal-size-select" data-id={this.props.item.p_id} onChange={this.sizeChange}>
                                                {this.getSizes(this.props.item.p_available_options.sizes)}
                                            </select>
                                            <span className="toupper center modal-qty">qty</span>
                                            <input type="number" className="center form-control modal-qty-value" value={this.props.item.p_quantity} data-id={this.props.item.p_id} data-price={this.props.item.p_price} onChange={this.quantityChange}/>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary save-items toupper" onClick={this.closeModal}>edit</button>
                                    <button type="button" className="btn btn-link see-detail" onClick={this.closeModal}>See product details</button>
                                </div>
                                <div className="col-md-6">
                                    <img className="item-image" src={`./assets/T${this.props.item.p_id}.jpg`} alt={`${this.props.item.p_name}`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.visible) {
            return (
                <div style={{ display: 'block' }}>
                    {this.returnModal() }
                </div>
            );
        }
        else {
            return (
                <div style={{ display: 'none' }}>
                    {this.returnModal() }
                </div>
            );
        }
    }
}
export default ItemModal;