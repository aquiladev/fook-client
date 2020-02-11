import React from "react";

class ReadFee extends React.Component {
    state = { dataKey: null };

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.FestookFactory;

        // let drizzle know we want to watch the `getFee` method
        const dataKey = contract.methods["getFee"].cacheCall();

        // save the `dataKey` to local component state for later reference
        this.setState({ dataKey });
    }

    render() {
        // get the contract state from drizzleState
        const { FestookFactory } = this.props.drizzleState.contracts;

        // using the saved `dataKey`, get the variable we're interested in
        const fee = FestookFactory.getFee[this.state.dataKey];

        // if it exists, then we display its value
        return <p>Fee: {fee && fee.value} wei</p>;
    }
}

export default ReadFee;