import Animation from '/animate-data-with-vizzu/js/animation.js'


jQuery( document ).ready(function() {
	
	const anim = new Animation();
  
	var stat = 'init';
  
    jQuery( "#slider" ).slider({
		value: -2,
		min:   -4,
		max:   -0.1,
		step:  0.1,
		change: function( event, ui ) {
			anim.setSpeed( ui.value  * -1 );
		}
	});

	
	jQuery( "#start" ).on( "click", function() {
		
		jQuery( "#bgImageContainer" ).hide();
	
		if( stat == 'init')
		{
			anim.start();
			stat = 'play';
		}
		else if( stat == 'paused' )
		{
			anim.play();
			stat = 'play';
		}
	
	});
		
		
	jQuery( "#pause" ).on( "click", function() {
	  
		if( stat == 'play')
		{	
			anim.pause();
			stat = 'paused'
		}
	
	});
  
  
	jQuery( "#restart" ).on( "click", function() {
		
		if( stat !== 'init' )
		{   
			jQuery( "#slider" ).slider( "value", 2 );
			anim.stop();
			anim.start();
			stat = 'play';
		}
		
	});
  
  
});

