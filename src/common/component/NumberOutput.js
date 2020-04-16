import React from "react";
import CountUp from "react-countup";

const NumberOutput = props => {
    const { duration = 2, start = 0, end = 0 } = props

    return <>
        <CountUp
            start={start}
            end={end}
            duration={duration}
            separator=","
        />
    </>
}

export default NumberOutput;