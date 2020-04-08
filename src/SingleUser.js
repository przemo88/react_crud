import React from "react";
import { useParams, Link } from "react-router-dom";
import { DataInput } from "./DataInput";
import style from "./Style.scss";
function SingleUser(props) {
    let { userID } = useParams();

    if (props.sData[userID]) {
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
            console.log("login: " + login);
            console.log("pass: " + pass);

        };

        return (
            <div>
                <form onSubmit={handleSubmit} className="add">
                    <label>
                        Login:
                    </label>
                    <input type="text" {...bindLogin} />
                    <label>
                        Pass:
                    </label>
                    <input type="text" {...bindPass} />
                    <input type="submit" value="Updates" className="btn"></input>
                    <Link to="/"><input type="submit" value="Return" className="btn second_btn"></input></Link>
                </form>
            </div>
        );
    }

    else {
        return (
            <>
                <div>Error - No data found </div>
                <Link to="/">return</Link>
            </>
        )
    }
}


export default SingleUser;