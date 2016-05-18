import React from 'react';

class TableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { edit: false };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    handleOnChange(event) {
        this.props.quantityChange(event.target.dataset.id, event.target.value, event.target.dataset.price);
    }

    handleRemove(event) {
        this.props.removeItem(event.target.dataset.id);
    }

    editItem(event) {
        this.props.editItem(event.target.dataset.id);
    }

    withDiscount(item) {
        return (
            <span>
                <p>
                    <span className="currency">{item.c_currency}</span>
                    <del  className="discount">{item.p_originalprice % 1 !== 0 ? item.p_originalprice : item.p_originalprice + ".00"}</del>
                </p>
                <span className="item-price">
                    <span className="currency">{item.c_currency}</span>
                    {item.total_price % 1 !== 0 ? item.total_price : item.total_price + ".00"}
                </span>
            </span>
        )
    }

    noDiscount(item) {
        return (
            <span className="item-price">
                <span className="currency">{item.c_currency}</span>
                {item.total_price % 1 !== 0 ? item.total_price : item.total_price + ".00"}
            </span>
        )
    }

    createDetailRow(item) {
        return (
            <tr className="tablerow">
                <td className="col-sm-9 col-xs-12">
                    <div className="row">
                        <div className="col-sm-5 col-xs-6">
                            <img src={`./assets/T${item.p_id}.jpg`} alt={`${item.p_name}`}/>
                        </div>
                        <div className="col-sm-7 col-xs-6">
                            <b><p className="toupper item-name">{item.p_name}</p></b>
                            <p className="item-info ">Style #: <span className="toupper">{item.p_style}</span></p>
                            <p className="item-info">Color: {item.p_selected_color.name}</p>
                            <div className="visible-xs">
                                <span className="toupper item-info">Size: </span><span className="toupper item-info">{item.p_selected_size.code}</span>
                            </div>
                            <div className="visible-xs">
                                <span className="toupper item-info">qty: </span><input className="center form-control smlqty" type="number" onChange={this.handleOnChange} data-price={item.p_price} data-id={item.p_id} value={item.p_quantity}/>
                            </div>
                            <div className="visible-xs">
                                {(item.p_price === item.p_originalprice) ? this.noDiscount(item) : this.withDiscount(item)}
                            </div>
                            <div className="actions hidden-xs">
                                <a href="javascript: void(0);" data-id={item.p_id} onClick={this.editItem} className="toupper action-button">edit</a>
                                <div className="divider"></div>
                                <a href="javascript: void(0);" data-id={item.p_id} onClick={this.handleRemove} className="toupper action-button remove-btn">x remove</a>
                                <div className="divider"></div>
                                <a href="javascript: void(0);" className="toupper action-button remove-btn">save for later</a>
                            </div>

                        </div>
                        <div className="small-actions visible-xs col-xs-12 container">
                            <a href="javascript: void(0);" data-id={item.p_id} onClick={this.editItem} className="toupper action-button">edit</a>
                            <div className="divider"></div>
                            <a href="javascript: void(0);" data-id={item.p_id} onClick={this.handleRemove} className="toupper action-button remove-btn">x remove</a>
                            <div className="divider"></div>
                            <a href="javascript: void(0);" className="toupper action-button remove-btn">save for later</a>
                        </div>
                    </div>
                </td>
                <td className="col-sm-1 hidden-xs center toupper">
                    {item.p_selected_size.code}
                </td>
                <td className="col-sm-1 hidden-xs center">
                    <input className="center form-control" type="number" onChange={this.handleOnChange} data-price={item.p_price} data-id={item.p_id} value={item.p_quantity}/>
                </td>
                <td className="col-sm-1 hidden-xs right">
                    {(item.p_price === item.p_originalprice) ? this.noDiscount(item) : this.withDiscount(item)}
                </td>
            </tr>
        );
    }


    render() {
        let rows = [];

        this.props.cartItems.forEach((item) => {
            rows.push(this.createDetailRow(item));
        });


        return (
            <table className="table">
                <thead className="tableheader">
                    <tr>
                        <th className="visible-xs">
                            <div  className="visible-xs item-head col-xs-8">YOUR SHOPPING BAG</div>
                            <div  className="visible-xs item-head col-xs-4">{this.props.cartItems.length} Items</div>
                        </th>
                        <th  className="col-sm-9 hidden-xs">{this.props.cartItems.length} Items</th>
                        <th  className="col-sm-1 center hidden-xs">Size</th>
                        <th  className="col-sm-1 center hidden-xs">Qty</th>
                        <th  className="col-sm-1 right hidden-xs">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                {this.state.edit && this.props.editItem(event.target.dataset.id) }
            </table>
        );
    }

}

TableComponent.propTypes = {
    cartItems: React.PropTypes.array.isRequired
};

export default TableComponent;