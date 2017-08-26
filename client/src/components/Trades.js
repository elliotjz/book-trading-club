import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import BookGallery from './BookGallery'


class Trades extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			incomingOpen: false,
			outgoingOpen: false
		}

		this.toggleIncoming = this.toggleIncoming.bind(this)
		this.toggleOutgoing = this.toggleOutgoing.bind(this)
		this.acceptTrade = this.acceptTrade.bind(this)
		this.cancelTrade = this.cancelTrade.bind(this)
	}

	toggleIncoming() {
		this.setState({
			incomingOpen: !this.state.incomingOpen,
			outgoingOpen: false
		})
	}

	toggleOutgoing() {
		this.setState({
			incomingOpen: false,
			outgoingOpen: !this.state.outgoingOpen
		})
	}

	acceptTrade(event) {
		event.preventDefault()
		this.props.acceptTrade(event.target.id)
	}

	cancelTrade(event) {
		event.preventDefault()
		this.props.cancelTrade(event.target.id, this.state.incomingOpen)
	}

	render() {
		let acceptedIncomingTrades = []
		let waitingIncomingTrades = []
		let acceptedOutgoingTrades = []
		let waitingOutgoingTrades = []

		this.props.user.incomingTrades.forEach((trade) => {
			if (trade.accepted) {
				acceptedIncomingTrades.push(trade.book)
			} else {
				waitingIncomingTrades.push(trade.book)
			}
		})

		this.props.user.outgoingTrades.forEach((trade) => {
			if (trade.accepted) {
				acceptedOutgoingTrades.push(trade.book)
			} else {
				waitingOutgoingTrades.push(trade.book)
			}
		})

		return (
			<div id='trades'>
				<h3>Trades</h3>
				<RaisedButton
					label={'Incoming Trades: (' + this.props.user.incomingTrades.length + ')'}
					primary={true}
					className='trades-btn'
					onClick={this.toggleIncoming}
				/>
				<RaisedButton
					label={'Outgoing Trades: (' + this.props.user.outgoingTrades.length + ')'}
					primary={true}
					className='trades-btn'
					onClick={this.toggleOutgoing}
				/>

				{this.state.incomingOpen ?
					(
						<div>
							<p><b>Accepted incoming trades</b></p>
							{acceptedIncomingTrades.length > 0 ?
								<BookGallery
					    		books={acceptedIncomingTrades}
					    		onAction={this.cancelTrade}
					    		actionName='Cancel Trade'
					    		secondaryBtn={true}
					    	/> :
					    	<p>None to show</p>
					    }
				    	<p><b>Incoming trades waiting for approval</b></p>
							{waitingIncomingTrades.length > 0 ?
					    	<BookGallery
					    		books={waitingIncomingTrades}
					    		onAction={this.acceptTrade}
					    		actionName='Accept Trade'
					    	/> :
					    	<p>None to show</p>
					    }
				    </div>
			    ) :
			    null
				}
				
		    {this.state.outgoingOpen ?
					(
						<div>
							<p><b>Accepted outgoing trades</b></p>
							{acceptedOutgoingTrades.length > 0 ?
								<BookGallery
					    		books={acceptedOutgoingTrades}
					    		onAction={this.cancelTrade}
					    		actionName='Cancel Trade'
					    		secondaryBtn={true}
					    	/> :
					    	<p>None to show</p>
					    }
				    	<p><b>Outgoing trades waiting for approval</b></p>
							{waitingOutgoingTrades.length > 0 ?
					    	<BookGallery
					    		books={waitingOutgoingTrades}
					    		onAction={this.cancelTrade}
					    		actionName='Cancel Trade'
					    		secondaryBtn={true}
					    	/> :
					    	<p>None to show</p>
					    }
				    </div>
			    ) :
			    null
				}
			</div>
		)
	}
}

Trades.PropTypes = {
	user: PropTypes.object.isRequired,
	acceptTrade: PropTypes.func.isRequired,
	cancelTrade: PropTypes.func.isRequired
}

export default Trades