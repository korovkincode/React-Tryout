import React, {useState} from "react";

const Сounter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Add 1</button>
            <span>{count}</span>
        </div>
    )
}

export default Counter;