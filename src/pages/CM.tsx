import * as React from "react";
import theme from "../theme";
import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react'

function CM () {
    const [data, setData] = useState({text: "", initials: ""});

    // This hook lets us get params from HTTP req
    let {initials} = useParams();

    useEffect(() => {
        fetch(`/CMs/${initials}`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    return (
        <>
        {`Hello, this is the CM page for ${initials}`}
        <br></br>
        {`${data.text}`}
        <br></br>
`        {data.initials}
        </>
    );
}

export default CM;