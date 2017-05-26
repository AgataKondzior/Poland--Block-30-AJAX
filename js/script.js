
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    $wikiElem.text("");
    $nytElem.text("");
	
	//streetview

    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ", " + cityStr;
    $greeting.text('So you want to live at ' + address + '?');
    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    $("body").append('<img class="bgimg" src="'+streetViewURL+'">');
	
    
	
	
	 //NY times
    var nyTimesUrl="http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=9634e5f5718e462e9df187b75ed7a067";

	$.getJSON(nyTimesUrl, function(data){
		console.log(data);
		$nytHeaderElem.text('New York Times article about ' + cityStr);
		articles = data.response.docs;
		for(var i = 0; i < articles.length; i++){
			var article = articles[i];
			$nytElem.append('<a class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a' + '<p>' + article.snippet + '</p>'
			+'</li>');
		}
	})
	
	//wiki
	
	var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallback&search="+cityStr;


	var wikiRequestTimeout = setTimeout(function(){
		$wikiElem.text("failed to get wikipedia resources");
	}, 8000);

	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function(response){
			var articleList = response[1];
			for(var i = 0; i<articleList.length; i++){
				articleStr = articleList[i];
				var urls = 'http://en.wikipedia.org/wiki/'+articleStr;
				$wikiElem.append('<li><a href="'+wikiUrl+'">'+'</a></li>');
			};
		}

	});
return false
};


$('#form-container').submit(loadData);


//9634e5f5718e462e9df187b75ed7a067 NYTimes key
