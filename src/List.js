import React, { Component } from "react";
import {
    Switch,
    Route,
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import SingleUser from "./SingleUser";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            login: "",
            pass: "",
            chose: "",
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




    render() {



        return (
            <div>

                <table>
                    <Router>
                        <div>
                            <Switch>
                                <Route exact path="/">

                                    <form onSubmit={this.show}>
                                        <label>Login</label>
                                        <br />
                                        <input type="text" name="login" onChange={e => this.add(e)} />
                                        <br />
                                        <label>Password</label>
                                        <br />
                                        <input type="text" name="pass" onChange={e => this.add(e)} />
                                        <br />
                                        <input type="submit" value="Add" />
                                    </form>{" "}

                                    {(this.state.data.length) ?
                                        <div>
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
                                        </div> : null}



                                    {this.state.data.map((val, index) => (
                                        <>



                                            <td>{val.login}</td>

                                            <td>{val.pass}</td>

                                            <br />

                                            <div>
                                                <div>
                                                    <Link to={`/${index}`}>{index}</Link>
                                                </div>
                                            </div>

                                            <input type="submit" value="X" onClick={() => this.del(index)} />
                                        </>
                                    ))}



                                </Route>
                                <Route exact path="/:userID">
                                    <SingleUser sData={this.state.data} />
                                </Route>
                            </Switch>
                        </div>
                    </Router>

                </table>
            </div >
        );
    }
}

export default List;