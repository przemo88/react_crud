import React from "react";
import { useParams, Link } from "react-router-dom";
import { DataInput } from "./DataInput";

function SingleUser(props) {
    let { userID } = useParams();

    const {
        value: login,
        bind: bindLogin
    } = DataInput(props.sData[userID].login);

    const {
        value: pass,
        bind: bindPass
    } = DataInput(props.sData[userID].pass);

    const handleSubmit = e => {
        e.preventDefault();
        props.sData[userID].login = login;
        props.sData[userID].pass = pass;

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Login:
                </label>
                <input type="text" {...bindLogin} />
                <label>
                    Pass:
                </label>
                <input type="text" {...bindPass} />
                <input type="submit" value="Updates"></input>
            </form>
            <Link to="/">powrót</Link>
        </div>
    );
}

export default SingleUser;