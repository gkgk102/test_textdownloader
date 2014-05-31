
$(function() {
    
    var onLoadAll = function(data) {
        console.log(data);
        for(var i=0; i<data.length; i++) {
            
            var hrefs = data[i].hrefs;
            
            for(var j=0; j<hrefs.length; j++) {
                var url = hrefs[j];
                console.log(url);
                
                loadHtml(url, function(url, htmlText){
                    
                    //http://www.rong-chang.com/
                    //http://www.eslfast.com/easyread/
                    $('.MsoNormal', htmlText).each(function(index){
                        var text = $(this).text();
                        // console.log(text);
                        $('#container').append(text);
                    });
                    
                    //http://www.eslfast.com/easydialogs/
                    $('font', htmlText).each(function(index){
                        var fontsize = $(this).attr("size");
                        if(fontsize == 6) {
                            var text = $(this).text();
                            // console.log(text);
                            $('#container').append(text);
                        }
                    });
                });
                
            }
        }
    };
    
    // function which load external html file
    var loadHtml = function(targetUrl, onLoad) {
        $.ajax({
            url: targetUrl,
            type: 'GET',
            success: function(data) {
                onLoad(targetUrl, data.responseText);
            }
        });
    };
    
    
    var url = 'http://www.newsinlevels.com/';
    loadHtml(url, function(url, htmlText){
    	var contentSelector = $('#content', htmlText);
    	var boxproductsSelector = $('.box'+'.products', contentSelector);
    	var productSelectors = $('.product'+'.withImage', boxproductsSelector);
    	
    	productSelectors.each(function(){
    		var titleSelector = $('.title', this);
    		var titleText	= titleSelector.text();
    		console.log(titleText);
    		
    		var levelSubmitSelectors = $('.levelSubmit', this);
    		levelSubmitSelectors.each(function(){
    			var levelSelector = $('a',this);
    			
    			var title = levelSelector.attr('title');
    			var _class = levelSelector.attr('class');
    			
    			var href = $(this).attr('href'); // TODO hrefがとれない。続く。
    			console.log(title, _class, href);
    		});
    		
	    });
    
    	//console.log(product.html());
    });    
}); 

