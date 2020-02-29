import React, { Component } from 'react';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            login: "",
            pass: "",
        };

        this.add = this.add.bind(this);
        this.show = this.show.bind(this);
        this.del = this.del.bind(this);
    }



    add(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    show(e) {
        e.preventDefault();

        if (!this.state.login.length || !this.state.pass.length) {
            return;
        }

        else {
            const newUser = {
                login: this.state.login,
                pass: this.state.pass,
            };

            this.setState(state => ({
                data: state.data.concat(newUser),
            }))
        }
    }

    del(index) {
        let { data } = this.state
        data.splice(index, 1);
        this.setState(({
            data
        }));

    }
    render() {



        return (
            <div>
                <form onSubmit={this.show}>
                    <label>Login</label><br></br><input type='text' name='login' onChange={e => this.add(e)}></input><br></br>
                    <label>Password</label><br></br><input type='text' name='pass' onChange={e => this.add(e)}></input><br></br>
                    <input type="submit" value="Add"></input>
                </form>
                <table>

                    {this.state.data.map((val, index) => (
                        <>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>LOGIN</th>
                                    <th>PASSWORD</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td key={index}>{index}</td>
                                    <td>{val.login}</td>
                                    <td>{val.pass}</td>
                                </tr>
                            </tbody>
                            <input type="submit" value='X' onClick={() => this.del(index)}></input>
                        </>
                    ))}
                </table>
            </div>
        )
    }
}


export default List;