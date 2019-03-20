// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
//GalleryImage Object function
function GalleryImage(imgLocation,description,date,imgPath){
    this.imgLocation = imgLocation;
    this.description = description;
    this.date = date;
    this.imgPath = imgPath;
}

//$GET Request
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}
var $_GET = getQueryParams(document.location.search);

// XMLHttpRequest
var mRequest = new XMLHttpRequest();
//Holds the retrieved JSON information
var mJson;
//URL for the JSON to load by default
var mImages = [];
//retrieves images from images.json
var mURL ="";
if ($_GET["json"] == undefined){
    mURL = $_GET["json"];
}else{
    mURL = "images.json";
}

mRequest.onreadystatechange = function() {

    if (mRequest.readyState == 4 && mRequest.status == 200) {
        try {
            mJson = JSON.parse(mRequest.responseText);
            console.log(mJson);

            for(var i=0; i < mJson.images.length;i++)
            {
                mImages.push(new GalleryImage(mJson.images[i].imgLocation,mJson.images[i].description,mJson.images[i].date,mJson.images[i].imgPath));
            }

        } catch(err) {
            console.log(err.message);
        }
    }
};
mRequest.open("$GET",mURL, true);
mRequest.send();

// Counter for the mImages array
var mCurrentIndex = 0;

function makeGalleryImageOnloadCallback(galleryImage) {
    return function(e) {
        galleryImage.img = e.target;
        mImages.push(galleryImage);
    }
}

//swapPhotos functions
function swapPhoto() {
    if(mCurrentIndex < 0){
        mCurrentIndex +=  mImages.length;
    }
    $("#photo").attr('src', mImages[mCurrentIndex].imgPath);
    $(".location").text("Location: "+mImages[mCurrentIndex].imgLocation);
    $(".description").text("Description: "+mImages[mCurrentIndex].description);
    $(".date").text("Date: "+mImages[mCurrentIndex].date);

    mCurrentIndex++;
    if(mCurrentIndex >=  mImages.length){
        mCurrentIndex = 0;
    }
    console.log('swap photo');
}

$(document).ready( function() {
    //this initially hides the photos' metadata information
    $('.details').eq(0).hide();

    $(".moreIndicator").click(function(){
        $( "img.rot90" ).toggleClass("rot270",3000);
        $(".details").slideToggle(1000);
    });

    $("#nextPhoto").click(function(){
        swapPhoto();

    });

    $("#prevPhoto").click(function(){
        mCurrentIndex -= 2;
        swapPhoto();
        console.log(mCurrentIndex);
    });
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);


