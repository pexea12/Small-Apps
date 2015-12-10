var Calculator = React.createClass({

	getInitialState: function() {
		return {
			result: 0,
			sign: '',
			number: 0,
			checkInput: true
		}
	},

	reset: function() {
		this.replaceState(this.getInitialState());
	},

	resetNumber: function() {
		this.setState({ number: 0 });
	},

	handleSign: function(val) {
		var sign = val.target.outerText;
		if (this.state.sign !== '') {
			this.handleEqual();
			this.state.result = this.state.number;
			this.setState({ sign: sign });
		} else {
			this.setState({ 
				sign: sign, 
				result: this.state.number,
				checkInput: false
			});
		}
	},

	checkLimitDigits: function() {
		var count = 0;
		for (var i = 0; i < this.state.number.length; ++i)
			if (!isNaN(this.state.number[i])) ++count;
		return count <= 9 && count >= 0;
	},

	handleInput: function(val) {
		if (!this.checkLimitDigits() && this.state.checkInput) return;

		var input = val.target.outerText;

		if (!this.state.checkInput) {
			this.state.number = 0;
			this.state.checkInput = true;
		}
		
		var number = this.state.number + input;

		if (this.state.number == '0') number = input;
		this.setState({ number: number });
	},

	handleDot: function() {
		if (!this.state.checkInput) {
			this.state.number = 0;
			this.state.checkInput = true;
		}

		for (var i = 0; i < this.state.number.length; ++i)
			if (this.state.number[i] === '.') return;

		this.setState({ number: this.state.number + '.' });
	},

	formatNumber: function(val) {
		return val.toString().substr(0, 11);
	},

	handleEqual: function() {
		var result = parseFloat(this.state.result);
		var number = parseFloat(this.state.number);

		switch(this.state.sign) {
			case 'x':
				result *= number; break;
			case '÷':
				result /= number; break;
			case '+': 
				result += number; break;
			case '—':
				result -= number; break;
			case '':
				result = number; break;
		}

		this.setState({ 
			number: this.formatNumber(result), 
			result: this.formatNumber(result),
			sign: '',
			checkInput: false
		});
	},

	handlePercent: function() {
		if (this.state.sign === '') return;

		var result = parseFloat(this.state.result);
		var number = parseFloat(this.state.number);

		number = result * number / 100;

		this.setState({ number: this.formatNumber(number) });
	},

	render: function() {
		return (
			<div className='Calculator'>
				<h1 className='text-center'>My Calculator</h1>
				<h3 className='text-center'>STANDARD COMPUTER</h3>
				<div id='result'>
					<span>{ this.state.number }</span>
				</div>
				<div id='table'>
					<table>
						<tbody>
							<tr>
								<td><button className='btn btn-danger' onClick={ this.reset }>AC</button></td>
								<td><button className='btn btn-danger' onClick={ this.resetNumber }>CE</button></td>
								<td><button className='btn btn-default' onClick={ this.handlePercent }>%</button></td>
								<td><button className='btn btn-default' onClick={ this.handleSign }>÷</button></td>
							</tr>
							<tr>
								<td><button className='btn btn-success' onClick={ this.handleInput }>7</button></td>
								<td><button className='btn btn-success' onClick={ this.handleInput }>8</button></td>
								<td><button className='btn btn-success' onClick={ this.handleInput }>9</button></td>
								<td><button className='btn btn-default' onClick={ this.handleSign }>x</button></td>
							</tr>
							<tr>
								<td><button className='btn btn-success' onClick={ this.handleInput }>4</button></td>
								<td><button className='btn btn-success' onClick={ this.handleInput }>5</button></td>
								<td><button className='btn btn-success' onClick={ this.handleInput }>6</button></td>
								<td><button className='btn btn-default' onClick={ this.handleSign }>—</button></td>
							</tr>
							<tr>
								<td><button className='btn btn-success' onClick={ this.handleInput }>1</button></td>
								<td><button className='btn btn-success' onClick={ this.handleInput }>2</button></td>
								<td><button className='btn btn-success' onClick={ this.handleInput }>3</button></td>
								<td rowSpan="2"><button className='btn btn-default' id='plusButton' onClick={ this.handleSign }>+</button></td>
							</tr>
							<tr>
								<td><button className='btn btn-default' onClick={ this.handleDot }>.</button></td>
								<td><button className='btn btn-success' onClick={ this.handleInput }>0</button></td>
								<td><button className='btn btn-default' onClick={ this.handleEqual }>=</button></td>
							</tr>
						</tbody>
					</table>
				</div> 	
			</div>
		);
	}
});

ReactDOM.render(<Calculator />, document.getElementById('app'));