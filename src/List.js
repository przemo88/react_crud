import React, { Component } from "react";
import {
    Switch,
    Route,
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import SingleUser from "./SingleUser";
import style from "./Style.scss";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ login: "login", pass: "pass" }, { login: "drugi", pass: "drugi" },],
            login: "",
            pass: "",
            find: ""
        };

        this.add = this.add.bind(this);
        this.show = this.show.bind(this);
        this.del = this.del.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    add(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    show(e) {
        e.preventDefault();

        if (!this.state.login.length || !this.state.pass.length) {
            return;
        } else {
            const newUser = {
                login: this.state.login,
                pass: this.state.pass
            };

            this.setState(state => ({
                data: state.data.concat(newUser)
            }));
        }
    }

    del(index) {
        let { data } = this.state;
        data.splice(index, 1);
        this.setState({
            data
        });
    }


    sortBy(key, method) {

        function change(a, b) {


            if (key === "login") {
                var A = a.login;
                var B = b.login;
            } else if (key === "pass") {
                A = a.pass;
                B = b.pass;
            }

            if (method === "asc") {
                if (A > B) {
                    return 1;
                } else if (A < B) {
                    return -1;
                } else {
                    return 0;
                }
            } else if (method === "desc") {
                if (A < B) {
                    return 1;
                } else if (A > B) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }

        function SortElements(data) {
            return data.sort(change);
        }

        this.setState(SortElements(this.state.data));
    }

    filterUsers(e) {
        this.setState({
            find: e.currentTarget.value
        });
    }

    render() {

        return (
            <div>


                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/">


                                <form onSubmit={this.show} className="add">
                                    <label>Login</label>
                                    <br />
                                    <input type="text" name="login" onChange={e => this.add(e)} />
                                    <br />
                                    <label>Password</label>
                                    <br />
                                    <input type="text" name="pass" onChange={e => this.add(e)} />
                                    <br />
                                    <input type="submit" value="Add" className="btn" />
                                </form>

                                <div className="search">Search<input onInput={this.filterUsers.bind(this)} /></div>

                                {(this.state.data.length && this.state.data.filter(x => x.login.includes(this.state.find)).length > 0) ?
                                    <>
                                        <div className="sort_option">
                                            <div onClick={() => this.sortBy("login", "asc")}>
                                                Login ascending
                                                </div>
                                            <div onClick={() => this.sortBy("login", "desc")}>
                                                Login descending
                                                </div>
                                            <div onClick={() => this.sortBy("pass", "asc")}>
                                                Pass ascending
                                                </div>
                                            <div onClick={() => this.sortBy("pass", "desc")}>
                                                Pass descending
                                                </div>
                                        </div>


                                        <table className="tableData">

                                            <tr>
                                                <th>Login</th>
                                                <th>Password</th>
                                                <th>Edit</th>
                                                <th>Delete</th>

                                            </tr>



                                            {this.state.data.filter(x => x.login.includes(this.state.find)).map((val, index) => (
                                                <>
                                                    <tr>
                                                        <td>{val.login}</td>
                                                        <td>{val.pass}</td>
                                                        <td><Link to={`/${index}`}>click</Link></td>
                                                        <td> <input type="submit" value="X" onClick={() => this.del(index)} /></td>
                                                    </tr>
                                                </>
                                            ))}
                                        </table>

                                    </> : <div className="search">not found any users</div>}

                            </Route>
                            <Route exact path="/:userID">
                                <SingleUser sData={this.state.data} />
                            </Route>
                        </Switch>
                    </div>
                </Router>


            </div >
        );
    }
}

export default List;