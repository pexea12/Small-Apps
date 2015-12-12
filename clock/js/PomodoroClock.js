var PomodoroClock = React.createClass({
	getInitialState: function() {
		return {
			break: 5,
			session: 25,
			timer: 25,
			mode: 1, // 0 for break and 1 for session
			on: false
		}
	},

	decreaseBreak: function() {
		if (this.state.break === 1 || this.state.on) return;
		this.setState({ break: this.state.break - 1 });
		if (this.state.mode === 0) 
			this.setState({ timer: this.state.break - 1 });
	},

	increaseBreak: function() {
		if (this.state.break === 999 || this.state.on) return;
		this.setState({ break: this.state.break + 1 });
		if (this.state.mode === 0) 
			this.setState({ timer: this.state.break + 1 });
	},

	decreaseSession: function() {
		if (this.state.session === 1 || this.state.on) return;
		this.setState({ session: this.state.session - 1 });
		if (this.state.mode === 1) 
			this.setState({ timer: this.state.session - 1 });
	},

	increaseSession: function() {
		if (this.state.session === 999 || this.state.on) return;
		this.setState({ session: this.state.session + 1 });
		if (this.state.mode === 1) 
			this.setState({ timer: this.state.session + 1 });
	},

	displayTime: function(time) {
		var minutes = Math.floor(time / 60);
		var seconds = time % 60;
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	},

	getTimeFromString: function(time) {
		var split = time.toString().indexOf(':');
		if (split === -1 || time === '0:00')
			return (this.state.mode === 0 ? this.state.break : this.state.session) * 60;

		var minutes = parseInt(time.substr(0, split));
		var seconds = parseInt(time.substr(split + 1));
		return minutes * 60 + seconds;
	},

	switchMode: function() {
		this.state.mode = 1 - this.state.mode;
	},

	ring: function() {
		var audio = new Audio('http://onlineclock.net/audio/options/cuckoo-clock.mp3');
		audio.play();
	},

	startMode: function() {
		var time = this.getTimeFromString(this.state.timer);
				
		this.interval = setInterval(function() {
			if (time === 0) {
				clearInterval(this.interval);
				this.ring()
				this.switchMode();
				this.setState({ 
					timer: this.state.mode === 0 ? this.state.break : this.state.session
				});
				this.startMode();
			} else this.setState({ timer: this.displayTime(--time) });
		}.bind(this), 1000);
	},

	toggle: function() {
		this.state.on = !this.state.on;

		if (this.state.on) {
			this.startMode();
		} else clearInterval(this.interval);
	},

	render: function() {
		return (
			<div className="PomodoroClock">
				<h1 className='text-center'>My Pomodoro Clock</h1>
				<div className="setting">
					<div>
						<h3 className='text-center'>Break Length</h3>
						<div id='select'>
							<button className='btn btn-success' onClick={ this.decreaseBreak }>—</button>
							<span>{ this.state.break }</span>
							<button className='btn btn-success' onClick={ this.increaseBreak }>+</button>
						</div>
					</div>
					<div>
						<h3 className='text-center'>Session Length</h3>
						<div id='select'>
							<button className='btn btn-success' onClick={ this.decreaseSession }>—</button>
							<span>{ this.state.session }</span>
							<button className='btn btn-success' onClick={ this.increaseSession }>+</button>
						</div>
					</div>
				</div> 
				<div id='display' onClick={ this.toggle }>
					<h3 className='text-center'>Countdown</h3>
					<h5 className='text-center'>{ this.state.mode === 0 ? 'Break' : 'Session' }</h5>
					<h6 className='text-center'>{ this.state.timer }</h6>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<PomodoroClock />, document.getElementById('app'));