import React from 'react';

class SummaryComponent extends React.Component {
    render() {
        return (
            <section className="row">
                <aside className="support col-md-4 hidden-xs">
                    <h4>Need help or have questions?</h4>
                    <p>Call Customer Service at <a href="">1-800-555-5555</a></p>
                    <p>Chat with one of our stylists</p>
                    <p>See return & exchange policy</p>
                </aside>
                <section className="paysection col-sm-8 col-xs-12">
                    <section className="promocode row">
                        <div className="col-md-8">
                            ENTER PROMOTION CODE OR GIFT CARD
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <input className="form-control" type="number"/>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <input className="btn btn-default toupper" type="button" value="Apply"/>
                        </div>
                    </section>
                    <section className="priceSection row">
                        <div className="price">
                            <span className="cost-component toupper">subtotal</span>
                            <span className="component-price">
                                <span className="currency">$</span>
                                <span className="item-price">
                                    {this.props.subtotal % 1 !== 0 ? this.props.subtotal : this.props.subtotal + ".00"}
                                </span>
                            </span>
                        </div>
                        <div className="price">
                            <span className="cost-component toupper">promotion code <b>jf10</b> applied</span>
                            <span className="component-price">
                                <span className="item-price">
                                    -<span className="currency">$</span>7.00
                                </span>
                            </span>
                        </div>
                        <div className="price">
                            <span className="cost-component toupper">estimated shipping</span><span className="currency">*</span>
                            <span className="component-price">
                                <span className="item-price toupper">
                                    free
                                </span>
                            </span>
                            <p className="item-info">You qualify for free shipping</p>
                        </div>
                        <div className="total">
                            <span className="cost-component-total toupper">estimated total</span>
                            <span className="component-price">
                                <span className="currency">$</span>
                                <span className="item-price">
                                    {this.props.total % 1 !== 0 ? this.props.total : this.props.total + ".00"}
                                </span>
                            </span>
                            <p className="item-info">Tax will be applied during checkout</p>
                        </div>
                    </section>
                    <section className="checkout row">
                        <div className="col-xs-offset-3 col-md-offset-6 col-sm-3">
                            <button className="btn btn-link toupper">Continue Shopping</button>
                        </div>
                        <div className="col-xs-offset-2 col-xs-8 col-md-offset-0 col-sm-3">
                            <button className="btn btn-primary toupper" style={{width:'100%'}}>Checkout</button>
                        </div>
                    </section>
                    <section className="col-md-offset-4 right">
                        <img src="./assets/lock.jpg" alt="" style={{ display: 'inline-block' }}/>
                        <span className="secure">Secure checkout.Shopping is always safe & secure</span>
                    </section>
                </section>
            </section>
        );
    }
}

export default SummaryComponent;