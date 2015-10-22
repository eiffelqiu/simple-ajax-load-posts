jQuery(document).ready(function($) {

	// The number of the next page to load (/page/x/).
	var pageNum = parseInt(salp.startPage) + 1;
	
	// The maximum number of pages the current query can return.
	var max = parseInt(salp.maxPages);
	
	// The link of the next page of posts.
	var nextLink = salp.nextLink;
	
	/**
	 * Replace the traditional navigation with our own,
	 * but only if there is at least one page of new posts to load.
	 */
	if(pageNum <= max) {
		// Insert the "More Posts" link.

		$('#mainDiv')
			.append('<div class="salp-placeholder-'+ pageNum +'"></div>')
			.append('<p id="salp-load-posts"><a href="#">加载更多</a></p>');
			
		// Remove the traditional navigation.
		$('.navigation').remove();
	}
	
	
	/**
	 * Load new posts when the link is clicked.
	 */
	$('#salp-load-posts a').click(function() {
		// Are there more posts to load?
		if(pageNum <= max) {
		
			// Show that we're working.
			$(this).text('加载中...');

			$('.salp-placeholder-'+ pageNum).load(nextLink + ' .post',
				function() {
					// Update page number and nextLink.
					pageNum++;
					nextLink = nextLink.replace(/\/?paged=[0-9]?/, 'paged=' +pageNum);

					// Add a new placeholder, for when user clicks again.
					$('#salp-load-posts')
						.before('<div class="salp-placeholder-'+ pageNum +'"></div>')
					
					// Update the button message.
					if(pageNum <= max) {
						$('#salp-load-posts a').text('加载更多');
					} else {
						$('#salp-load-posts a').text('没有更多可加载了');
					}
				}
			);
		} else {
			$('#salp-load-posts a').append('.');
		}	
		
		return false;
	});
});