import React, { Component } from "react";

class Test extends Component {
    render() {
        const brand = ['Samsung', 'Apple', 'LG', 'SK']
        const brandList = brand.map(name => <p>{name}</p>);
        return( 
            <div>
                {brandList}
            </div>
        );
    }
}

export default Test;





