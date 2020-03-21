import React from "react";
import { useParams, Link } from "react-router-dom";

function SingleUser(props) {
    let { userID } = useParams();
    return (
        <p>
            <>
                <div>HASŁO: {props.sData[userID].pass}</div>
                <div>LOGIN: {props.sData[userID].login}</div>
                <br />
            </>
            <Link to="/">powrót</Link>
        </p>
    );
}

export default SingleUser;