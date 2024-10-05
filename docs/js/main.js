import Animation from '/animate-data-with-vizzu/js/animation.js'


jQuery( document ).ready(function() {
	
	const anim = new Animation();
  
	var stat = 'init';
  
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
		{   anim.stop();
			anim.start();
			stat = 'play';
		}
		
	});
  
  
});

