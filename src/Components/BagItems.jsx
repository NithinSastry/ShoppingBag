import React from 'react'
import $ from 'jquery'
import TableComponent from './TableComponent.jsx'
import ItemModal from './ItemModal.jsx';
import SummaryComponent from './SummaryComponent.jsx';

class BagItems extends React.Component {

    constructor() {
        super()
        this.state = {
            cartItems: [],
            subtotal: 0,
            promo: 7,
            total: 0
        }

        this.quantityChange = this.quantityChange.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.editItem = this.editItem.bind(this)
        this.calculation = this.calculation.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: 'https://api.myjson.com/bins/343gk',
            method: 'get',
            dataType: 'json',
            async: true
        })
            .done((result) => {
                result.productsInCart.forEach((item) => {
                    item.total_price = item.p_price;
                });
                this.setState({
                    cartItems: result.productsInCart
                });
                this.calculation(this.state.cartItems);
            })
            .fail((error) => {
                console.log('Error in fetching cart data')
            })
    }

    quantityChange(p_id, number, price) {
        if (number >= 0) {
            let newItems = this.state.cartItems;
            newItems.map((item) => {
                if (item.p_id === p_id) {
                    item.total_price = number * item.p_price
                    item.p_quantity = number
                }
            });
            this.calculation(newItems);
        }
    }
    
    sizeChange(p_id, size){
        if(!!size){
            let newItems = this.state.cartItems;
            newItems.map((item) => {
                if (item.p_id === p_id) {
                    item.p_selected_size.code = size
                }
            });
            this.calculation(newItems);
        }
    }

    removeItem(p_id) {
        let newItems = this.state.cartItems
        let index = 0
        newItems.forEach((item) => {
            index++
            if (item.p_id === p_id) {
                newItems.splice(index - 1, 1)
            }
        })

        this.calculation(newItems);
    }

    calculation(newItems) {
        let subtotal = 0;
        let total = 0;

        newItems.map((item) => {
            subtotal += item.total_price;
        });

        if (subtotal > 0) {
            total = subtotal - this.state.promo;
        }

        this.setState({
            cartItems: newItems,
            subtotal: subtotal,
            promo: 7,
            total: total
        });
        this.forceUpdate();
    }

    editItem(p_id) {
        if (!!p_id) {
            this.state.cartItems.forEach((item) => {
                if (item.p_id === p_id) {
                    React.render(<ItemModal item={item} visible={true} qtyChange={this.quantityChange} sizeChange={this.sizeChange} />, document.getElementById("modal"));
                }
            })
        }
    }

    render() {
        if (this.state.cartItems.length !== 0) {
            return (
                <section>
                    <TableComponent
                        cartItems={this.state.cartItems}
                        quantityChange={this.quantityChange}
                        removeItem={this.removeItem}
                        editItem={this.editItem} />

                    <SummaryComponent subtotal={this.state.subtotal} total={this.state.total} />
                </section>
            )
        } else {
            return (
                <section>
                    <SummaryComponent subtotal={this.state.subtotal} total={this.state.total} />
                </section>
            )
        }
    }
}

export default BagItems
