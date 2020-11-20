var config = {
    packages: ["106108"],
    service_url: "https://services.inplayer.com",
    merchant_uuid: "cc0cb013-9b32-4e3d-a718-8f9b69d49908"
}

window.addEventListener('load', (event) => {

    var paywall = new InplayerPaywall(config.merchant_uuid, []);

    config.packages.forEach((package, i) => {

        $.get(config.service_url + "/items/packages/" + package, (response) => {

            var _this = response;

            $.get(config.service_url + "/items/packages/" + package + "/items?limit=500", (response) => {

                var output = "";

                for (var i = 0; i < response.collection.length; i++) {

                    let asset = response.collection[i];
                    var assetPhoto = asset.metahash.paywall_cover_photo;
                    var assetDesc = asset.metahash.preview_description;

                    output += createItemElement(asset.id, assetPhoto, asset.title, assetDesc);
                }

                if (response.collection.length) {
                    document.getElementById("packages").innerHTML += renderPackage(package, _this.title, output);
                }
            }); 
        });
    });

    // display item preview on item.html
    if (getParameterByName('id')) {
        setTimeout(() => {
            showItemElement(getParameterByName('id'));
        }, 100);
    }

    $(".inplayer-paywall-login").click(function () {
        paywall.showPaywall({
            asset: {}
        });
    });

    paywall.on('inject', function () {
        $(".inplayer-paywall").addClass('responsive-iframe');
        $('.asset').addClass('video-wrapper');
    });

    $(".inplayer-paywall-logout").hide();

    paywall.on("authenticated", function () {
        $(".inplayer-paywall-login").hide();
        $(".inplayer-paywall-logout").show();
    }); 

    paywall.on("logout", function () {
        location.reload();
    });

});

function getParameterByName(name, url) {

	if (!url) url = window.location.href;
  
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	  results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function createItemElement(assetId, assetPhoto, assetTitle, assetDesc) {

  var output = '<a href="./item.html?id='+ assetId +'" class="overlay-link"><div class="package-item"><div class="content" style="background-image:url('+ assetPhoto +')">';

  output += '</div><div class="item-label"><div class="name">';
  output += '<h3>' + assetTitle + '</h3>';
  output += '<div class="assetDesc">'+ assetDesc +'</div>';
  output += "</div>";
  output += "</div></div></a>";
  
  return output;

}

function showItemElement(assetId) {
        
    $('#preview-item').html('<div id="inplayer-' + assetId + '" class="inplayer-paywall"></div>');
    
    var paywall = new InplayerPaywall(config.merchant_uuid, [{
        id: assetId
      }]);
  
}

function renderPackage (packageID, packageTitle, insideHtml) {

    var html = 
    // '<h3>'+ packageTitle +'</h3>' +
    '<div id="'+ packageID +'" class="package-items">'+ insideHtml +'</div>';

    return html;
}

function getAsset () {
	
	var className = document.getElementsByClassName('get-asset');

	for (var i = 0 ; i < className.length; i++) {
		className[i].addEventListener('click', function (ev) {
			ev.preventDefault();
			var assetId = this.getAttribute('asset-id');

			paywall.showPaywall({
			  asset: {
			    assetId: parseInt(assetId)
			  }
			});
		});
	}
}