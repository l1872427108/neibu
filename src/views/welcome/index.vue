
<template>
	<div class="welcome">
		<div class="welcomeLeft">
      <div class="welcomeTopOne">功能正在开发～</div>
			<div class="welcomeTopTwo">功能正在开发～</div>
			<div class="welcomeTopThree">功能正在开发～</div>
		</div>
		<div class="welcomeRight">
			<div class="welcomeRightOne">功能正在开发～</div>
        <div class="welcomeRightTwo">
          <div class="welcomeRightTwoLeft">功能正在开发～</div>
          <div class="welcomeRightTwoRight">功能正在开发～</div>
			  </div>
		  </div>
	  </div>
</template>

<script>
export default {
	name: 'welcome',

	data () {
		return {
			h: '',
			m: '',
			s: ''
		};
	},

	created () {
		this.getTime();
		setInterval(() => {
			this.getTime();
		}, 1000);
	},

	methods: {
		getTime () {
			this.h = new Date().getHours();
			this.m = new Date().getMinutes();
			this.s = new Date().getSeconds();
			if (this.h < 10) {
				this.h = '0' + this.h;
			}
			if (this.m < 10) {
				this.m = '0' + this.m;
			}
			if (this.s < 10) {
				this.s = '0' + this.s;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.welcome {
	width: 96%;
	margin: 50px 0px 5px 5px;
	display: flex;
	justify-content: space-between;
	.welcomeLeft {
		width: 30%;
		.welcomeTopOne {
			width: 100%;
			height: 200px;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
		}
		.welcomeTopTwo {
			width: 100%;
			height: 150px;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
			margin-top: 20px;
		}
		.welcomeTopThree {
			width: 100%;
			height: 150px;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
			margin-top: 20px;
		}
	}
	.welcomeRight{
	   width: 60%;
	     .welcomeRightOne {
			width: 100%;
			height: 200px;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
		}
		.welcomeRightTwo{
			width: 100%;
			display: flex;
	        justify-content: space-between;
             .welcomeRightTwoLeft{
				 width: 45%;
				 height: 320px;
				 margin-top:20px ;
				 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
			 }
			 .welcomeRightTwoRight{
                width: 45%;
				height: 320px;
				margin-top:20px ;
				box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
			 }
		}
	}
}

#time div {
	width: 100px;
	height: 100px;
	float: left;
}

#clock {
	min-height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
}

#clock #time div {
	position: relative;
	margin: 0 15px;
}

#clock #time div span {
	position: relative;
	display: block;
	width: 100px;
	height: 100px;
	background: #2196f3;
	color: #fff;
	font-weight: 300;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 4em;
	z-index: 10;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
}

#clock #time div span:nth-child(2) {
	height: 30px;
	font-size: 0.8em;
	letter-spacing: 0.2em;
	font-weight: 500;
	z-index: 9;
	box-shadow: none;
	background: #127fd6;
	text-transform: uppercase;
}

#clock #time div:last-child span {
	background: #ff006a;
}

#clock #time div:last-child span:nth-child(2) {
	background: #ec0062;
}


.welcome {
    animation: rubberBand 1000ms both
}
.welcome {
    animation: rubberBand 1000ms both
}
@keyframes rubberBand {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(0.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, 0.95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}
</style>
