import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@0.10/dist/vizzu.min.js';
import data  from '/animate-data-with-vizzu/js/DataLoader.js'


class Animation {
	
	
	anim;
	chart;
	
	delay = 1;
	duration = 2; // default: 2
	
	setSpeed( s ) {
		this.duration = s;
	}

	pause() {
		
	  this.chart.animation.pause();
		
	}

	play() {
		
	  this.chart.animation.play();
		
	}
	
	stop() {
		
	  this.chart.animation.stop();
		
	}
	
	
	
	start() {

		const year_from = 2000;
		const year_to   = 2023;
	    let actYear = '';

        const bgImage = document.getElementById('bgImage')

		var displayWidth = window.innerWidth;

        function drawBg(dc) {
			
			var dx = 0;
			if( displayWidth < 1080 )
			{
				dx = parseInt( (1080 - displayWidth) / 2);
			}
		  
	      dc.drawImage(bgImage, -dx, 0)
        }

        const chart = new Vizzu('myVizzu', { data })
		
		let anim = chart.initializing.then((chart) => {
			
			chart.on('background-draw', (event) => {
				drawBg(event.renderingContext)
				event.preventDefault()
			})
			
			return chart
		})
		
		
        let drawYear = function(event) {
		  
		  let yearLabelPositionX = 875;
		  let yearLabelPositionY = 500;
		  let fontStyle = '200 80px Roboto';
		  if( displayWidth < 1080 )
		  {  
			yearLabelPositionX = 10;
			yearLabelPositionY = 75;
			fontStyle = '300 30px Roboto';
		  }
		  
		  event.renderingContext.fillStyle = '#737373FF';
		  event.renderingContext.font =  fontStyle;
	      event.renderingContext.fillText(actYear, yearLabelPositionX, yearLabelPositionY);
	    };
			
	
		anim = anim.then((chart) => {
			chart.on('logo-draw', drawYear)
			return chart
		})
		

        this.anim = anim;
		this.chart = chart;
		
		
		for (let year = year_from; year <= year_to; year++) {
			anim = anim.then((chart) => {
				this.actYear = year
				actYear = year
				return chart.animate(
					{
						data: {
							filter: (record) => parseInt(record.Year) === year
						},
						config: {
							channels: {
								y: { set: ['Format'] },
								x: { set: ['New tourism establishments'] },
								label: { set: ['New tourism establishments'] },
								color: { attach: ['Format'] }
							},
							title: 'Number of new tourism establishments in Portugal',
							sort: 'byValue'
						},
						style: {
							fontSize: 15,
							title: {
								fontWeight: 400,
								fontSize: 15,
								color: '#000000'
							},
							plot: {
								paddingLeft: 150,
								paddingTop: 50,
								yAxis: {
									color: '#000000', //'#ffffff00',
									label: {
										paddingRight: 20,
										color: '#000000'
									}
								},
								xAxis: {
									color: '#000000', //'#ffffff00',
									title: { color: '#000000' },
									label: { color: '#ffffff00', numberFormat: 'grouped' } // #ffffff00
								},
								marker: {
									colorPalette:
										'#b74c20FF #c47f58FF #1c9761FF #ea4549FF #875792FF #3562b6FF #ee7c34FF #efae3aFF',
									label: {
										maxFractionDigits: 0
									}
								}
							}
						}
					},
					{
						duration: this.duration,
						delay: 0,
						x: { easing: 'linear', delay: 0 },
						y: { delay: 0 },
						show: { delay: 0 },
						hide: { delay: 0 },
						title: { duration: 0, delay: 0 }
					}
				)
			})
		}

		anim = anim.then((chart) => {
			chart.on('plot-axis-label-draw', (event) => {
				const year = parseFloat(event.target.value)
				if (!isNaN(year) && year % 5 !== 0) event.preventDefault()
			})
			return chart.animate(
				{
					config: {
						channels: {
							x: { attach: ['Year'] },
							label: { set: null }
						}
					}
				},
				{
					delay:    this.delay * 2.5, //2.5,
					duration: this.duration / 7 // 0.3
				}
			)
		})

		anim = anim.then((chart) => {
			chart.off('logo-draw', drawYear)
			return chart
		})

		anim = anim.then((chart) =>
			chart.animate(
				{
					data: {
						filter: (record) => record.Year === String(year_to) || record.Year === String(year_from)
					},
					config: {
						title: 'Total of new tourism establishments in Portugal from 2000 to 2023'
					}
				},
				{
					delay: 0,
					duration: this.duration
				}
			)
		)

		anim = anim.then((chart) =>
			chart.animate(
				{
					config: {
						sort: 'none'
					}
				},
				{
					delay: 0,
					duration: this.duration
				}
			)
		)

		for (let year = year_to; year >= year_from; year--) {
			anim = anim.then((chart) =>
				chart.animate(
					{
						data: {
							filter: (record) => parseInt(record.Year) >= year || record.Year === String(year_from)
						},
						config: {
							split: true
						},
						style: {
							'plot.xAxis.interlacing.color': '#ffffff'
						}
					},
					{
						delay: 0,
						duration: this.duration / 400   // 0.005
					}
				)
			)
		}

		anim = anim.then((chart) =>
			chart.animate(
				{
					data: {
						filter: (record) => record.Year != year_from
					},
					config: {
						split: false
					}
				},
				{
					delay: 0,
					duration: this.duration // 1.5
				}
			)
		)

		anim = anim.then((chart) =>
			chart.animate(
				{
					config: {
						channels: {
							x: { detach: ['Year'] }
						}
					}
				},
				{
					delay: 0,
					duration: 0
				}
			)
		)

		anim = anim.then((chart) =>
			chart.animate(
				{
					config: {
						channels: {
							label: { set: ['New tourism establishments'] }
						}
					}
				},
				{
					delay: 0,
					duration: this.duration / 20 //0.1
				}
			)
		)

		anim = anim.then((chart) =>
			chart.animate(
				{
					config: {
						channels: {
							x: { attach: ['Year'] },
							label: { detach: ['New tourism establishments'] }
						}
					}
				},
				{
					delay:    this.duration * 4, //4,
					duration: this.duration / 2  // 1
				}
			)
		)

		anim = anim.then((chart) =>
			chart.animate(
				{
					config: {
						channels: {
							x: { set: ['Year'] },
							y: { set: ['New tourism establishments', 'Format'], range: { min: 'auto', max: 'auto' } },
							color: { set: ['Format'] }
						},
						title: 'Number of new tourism establishments in Portugal from 2000 to 2023',
						split: true
					},
					style: {
						plot: {
							paddingLeft: 13,
							paddingTop: 50,
							xAxis: {
								label: {
									angle: 2.0,
									// fontSize: 14,
									color: '#8e8e8e'
								}
							},
							yAxis: {
								interlacing: { color: '#ffffff00' },
								title: { color: '#ffffff00' },
								label: { color: '#ffffff00' }
							}
						}
					}
				},
				{
					delay: 0,
					duration: this.duration // 2
				}
			)
		)

		anim = anim.then((chart) =>
			chart.animate(
				{
					config: {
						geometry: 'area'
					}
				},
				{
					delay: 0,
					duration: this.duration / 2 // 1
				}
			)
		)

		anim = anim.then((chart) =>
			chart.animate(
				{
					config: {
						channels: {
							x: { set: ['Year'] },
							y: {
								range: {
									max: '100%'
								}
							}
						},
						align: 'center',
						split: false
					},
					style: {
						plot: {
							marker: { borderWidth: 1 }
						}
					}
				},
				{
					delay: this.duration * 4,  // 4
					duration: this.duration    // 2
				}
			)
		)
		
	}
}

export default Animation