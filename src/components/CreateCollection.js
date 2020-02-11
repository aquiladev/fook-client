import React from "react";

class CreateCollection extends React.Component {
    state = { stackId: null, name: '', symbol: '' };

    handleKeyDown = (e, field) => {
        this.setState({ [field]: e.target.value });
    };

    create = async _ => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.FestookFactory;

        const { name, symbol } = this.state;

        const fee = await contract.methods["getFee"]().call()

        // let drizzle know we want to call the `create` method with `name` and `symbol`
        const stackId = contract.methods["create"].cacheSend(name, symbol, {
            from: drizzleState.accounts[0],
            value: fee
        });

        // save the `stackId` for later reference
        this.setState({ stackId, name: '', symbol: '' });
    };

    getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = this.props.drizzleState;

        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[this.state.stackId];

        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;

        // otherwise, return the transaction status
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" onKeyDown={(e) => this.handleKeyDown(e, 'name')} />
                </div>
                <div>
                    <label htmlFor="symbol">Symbol</label>
                    <input id="symbol" type="text" onKeyDown={(e) => this.handleKeyDown(e, 'symbol')} />
                </div>
                <button onClick={this.create}>Create</button>
                <div>{this.getTxStatus()}</div>
            </div>
        );
    }
}

export default CreateCollection;