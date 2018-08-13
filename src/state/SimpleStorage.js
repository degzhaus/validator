import React, { Component } from 'react';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
import getWeb3 from '../utils/getWeb3';
import contract from 'truffle-contract';

class SimpleStorage extends Component {

  constructor(props){
    super(props);

    this.state = {
      value: '',
      currentValue: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    getWeb3.then(results => {
      this.setState({
        web3: results.web3,
        simpleStorage: contract(SimpleStorageContract),
        currentValue: 0
      });

      this.state.simpleStorage.setProvider(this.state.web3.currentProvider);

      this.readWeb3();
    });
  }

  async readWeb3() {
    const accounts = await this.state.web3.eth.getAccounts();
    const instance = await this.state.simpleStorage.deployed();
    const currentValue = await instance.get.call(accounts[0]);

    this.setState({
      accounts: accounts,
      instance: instance,
      currentValue: currentValue.toString()
    });
  }

  async setValue(value) {
    try {
      const result = await this.state.instance.set(value, {from: this.state.accounts[0]});
      console.log("result: ", result);
    } catch(err) {
      console.log("err: ", err);
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setValue(this.state.value);
    event.preventDefault();
  }

  render() {
    return(
      <div>
        <p>The stored value is: {this.state.currentValue}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default SimpleStorage;