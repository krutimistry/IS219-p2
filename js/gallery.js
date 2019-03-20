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
var $_GET = getQueryParams(document.location.search + '');

//Holds the retrieved JSON information
var mJson;
//URL for the JSON to load by default

var mImages = [];

var mURL ="";
if ($_GET["json"]){
    mURL = $_GET["json"];
}else{
    mURL = "images.json";
}

// XMLHttpRequest
var mRequest = new XMLHttpRequest();

mRequest.onreadystatechange = function() {
    if (mRequest.readyState == 4 && mRequest.status == 200) {
        try {
            mJson = JSON.parse(mRequest.responseText);
            for(var i = 0; i<mJson.images.length; i++) {
                var imgloc = mJson.images[i].imgPath;
                var loca = mJson.images[i].imgLocation;
                var desc = mJson.images[i].description;
                var d = mJson.images[i].date;
                mImages.push(new GalleryImage(imgloc, loca, desc, d));
            }
            console.log(mJson);
        } catch(err) {
            console.log(err.message);
        }
    }
};
mRequest.open("$GET",mURL, true);
mRequest.send();

// Counter for the mImages array
var mCurrentIndex = 0;

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

//Set Photo to be display
function setPhoto(){
    $('.photoHolder #photo').attr("src", mImages[mCurrentIndex].image);
    $('.location').text('Location: ' + mImages[mCurrentIndex].location);
    $('.description').text('Description: ' + mImages[mCurrentIndex].description);
    $('.date').text('Date: ' + mImages[mCurrentIndex].date);
}

//cycles backwards
var prevClicked = false;
function goBackward(){
    $('#prevPhoto').click(function(){
        prevClicked=true;
        if(mCurrentIndex === 0){
            mCurrentIndex = mImages.length-1;
            setPhoto();
            mLastFrameTime=0;

        }else{
            mCurrentIndex--;
            setPhoto();
            mLastFrameTime=0;
        }
    });
};
//cycles pictures forward and allows clicks through the slideshow
function goForward(){
    $('#nextPhoto').click(function(){
        prevClicked=false;
        if(mCurrentIndex === mImages.length-1){
            mCurrentIndex = 0;
            setPhoto();
            mLastFrameTime=0;

        }else{
            mCurrentIndex++;
            setPhoto();
            mLastFrameTime=0;
        }
    });
};

//show and hide details of pictures
function imageDetails(){
    $('.moreIndicator').click(function(){
        console.log(mCurrentIndex);
        if( $('.moreIndicator').hasClass('rot90')){
            $('.details').slideDown();
            $('.moreIndicator').removeClass('rot90');
            $('.moreIndicator').addClass('rot270');
        }else{
            $('.details').slideUp();
            $('.moreIndicator').removeClass('rot270');
            $('.moreIndicator').addClass('rot90');
        }
    });
};


function makeGalleryImageOnloadCallback(galleryImage) {
    return function(e) {
        galleryImage.img = e.target;
        mImages.push(galleryImage);
    }
}
$(document).ready( function() {
    $('.details').eq(0).hide();
    // This initially hides the photos' metadata information
    imageDetails();
    goBackward();
    goForward();
});


window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);


