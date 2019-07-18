import React from 'react';
import Moment from 'react-moment';

const UserHistory = (props) => {
    const renderHistory = ()=>(
        props.history ?
            props.history.map((item,i)=>(
                <tr key={i}>                    
                    <td>
                        <Moment format='DD-MMM-YYYY'>
                        {item.brand.name}                            
                        </Moment>
                    </td>
                    <td>{item.brand} {item.name}</td>
                    <td>$ {item.price}</td>
                    <td>{item.quantity}</td>
                </tr>
            ))
        :null
    )
    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Date of purchase</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>

                    </tr>
                </thead>
                <tbody>
                    {renderHistory()}
                </tbody>
            </table>
        </div>
    );
};

export default UserHistory;