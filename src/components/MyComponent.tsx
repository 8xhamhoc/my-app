import React from 'react';

type Props = {};

const MyComponent: React.FC<Props> = () => {
    const user = "Alex";
    const discount = 20;

    return (
    <div>
        <h1>Welcome, {user}!</h1>
        <p>Your total with discount is: ${100 - discount}</p>
        <p>Username in CAPS: {user.toUpperCase()}</p>
    </div>
    );
};

export default MyComponent;
