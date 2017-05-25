
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
    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    $("body").append('<img class="bgimg" src="'+streetViewURL+'">');
	
    
	
	
	 //NY times
    var nyTimesUrl="http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=9634e5f5718e462e9df187b75ed7a067";

$.getJSON( nyTimesUrl, function( data ) {
	$nytHeaderElem.text=('New York Times Article About' + cityStr);
	 articles=data.response;
    for(var i=0;i<articles.length;i++){
        var articleData=articles[i];
        $nytElem.append('<li class="article">'+'<a href=" '+ articleData.web_url +' ">'+articleData.headline.main+'</a>'+'<p>'+articleData.snippet+'</p>' +'</li>');
    };
});


return false
};


$('#form-container').submit(loadData);


//9634e5f5718e462e9df187b75ed7a067 NYTimes key
