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
//Make GalleryImage Object function
function GalleryImage(location, description, date, image) {
	this.location = location;
	this.description = description;
	this.date = date;
	this.image = image;
}

//$GET Request

//swapPhotos functions
function swapPhoto() {
	if(prevClicked){
		if(mCurrentIndex > 0) {
			mCurrentIndex--;
		} else {
			mCurrentIndex = mImages.length-1;
		};
	}else {
		if(mCurrentIndex < mImages.length-1) {
			mCurrentIndex++;
		} else {
			mCurrentIndex = 0;
		};
	};

	setPhoto();
};

// Counter for the mImages array
var mCurrentIndex = 0;
function swapPhoto() {
    if(prevClicked){
        if(mCurrentIndex > 0) {
            mCurrentIndex--;
        } else {
            mCurrentIndex = mImages.length-1;
        };
    }else {
        if(mCurrentIndex < mImages.length-1) {
            mCurrentIndex++;
        } else {
            mCurrentIndex = 0;
        };
    };

    setPhoto();
};

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
	// Do something interesting if file is opened successfully
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
mRequest.open("GET",mURL, true);
mRequest.send();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mURL ="";
if ($_GET["json"]){
	mURL = $_GET["json"];
}else{
	mURL = "images.json";
}



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
    return function(e) {
        galleryImage.img = e.target;
        mImages.push(galleryImage);
    }
}
$(document).ready( function() {
    $('.details').eq(0).hide();
    deets();
    goBack();
    goFor();
});

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);


