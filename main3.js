
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
    
    
    var links_all = [];
    var count = 0;
    for(var i=0; i<urls.length; i++) {
        loadHtml(urls[i], function(url, htmlText){
            
            //$('#container').append(htmlText);
            // console.log(htmlText);
            
            var links = {
                url: url,
                hrefs: []
            };
            //console.log("URL=", url);
            
            $('a', htmlText).each(function(index){
                var path = $(this).attr('href');
                var title = $(this).text();
                
                if(path.indexOf('.htm') !== -1) {
                    var dir = url.substring(0, url.lastIndexOf('/') + 1);
                    var fullPath = dir + path;
                    //console.log(url, path);
                    links.hrefs.push(fullPath);
                }
                
                if(index === $('a', htmlText).length - 1) {
                    links_all.push(links);
                    count++;
                    if(count >= urls.length) {
                        onLoadAll(links_all);
                    }
                }
            });
        });    
    }
}); 

