import React from 'react';

const User = (props) => {
    const { name, first_name, last_name } = props
    return (
        <div>
            <h2>{name}</h2>
            <h2>{first_name} {last_name}</h2>
        </div>
    )
}

export default User;