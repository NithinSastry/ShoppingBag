import React from 'react';
import BagItems from './BagItems.jsx';

class ShoppingBag extends React.Component {
    render() {
        return (
            <section>
                <header className="row hidden-xs">
                        <h1 className="title">YOUR SHOPPING BAG</h1>
                </header>
                <BagItems />
            </section>
        );
    }
}

export default ShoppingBag;