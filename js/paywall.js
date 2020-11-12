

var config = {
    package_id: "106108",
    service_url: "https://services.inplayer.com"
}

window.addEventListener('load', (event) => {
    var paywall = new InplayerPaywall('cc0cb013-9b32-4e3d-a718-8f9b69d49908', [{
        id: getParameterByName('id')
      }]);
    var paywall = new InplayerPaywall('cc0cb013-9b32-4e3d-a718-8f9b69d49908', []);
    $(".inplayer-paywall-login").click(function () {
        paywall.showPaywall({
            asset: {}
        });
    });
    $(".inplayer-paywall-logout").hide();
    paywall.on("authenticated", function () {
      $(".inplayer-paywall-login").hide();
      $(".inplayer-paywall-logout").show();
    });
    paywall.on('inject', function () {
        $(".inplayer-paywall").addClass('responsive-iframe');
    });
});

var paywall = new InplayerPaywall('cc0cb013-9b32-4e3d-a718-8f9b69d49908', [{
    id: getParameterByName('id')
  }]);

// CREATE PACKAGE ASSET
function createItemElement(assetId, assetPhoto, assetTitle) {

    var output = `<a href="./item.html?id=${assetId}" class="overlay-link"><div class="package-item"><div class="content" style="background-image:url(${assetPhoto})"></div><div class="item-label">${assetTitle}</div></div></a>`;


    // var output =
    //     `<div class="package-item"><div class="content" style="background-image:url(${assetPhoto})"><span class="overlay"></span></div><div class="item-label"><h4 class="name">${assetTitle}</h4></div><a href="./item.html?id=${assetId}" class="overlay-link"></a></div>`;
    return output;
}


$(function () {

    // document.onload = () => {
    //     paywall.showPaywall({asset: 104824})
    // }



    $('.inplayer-paywall-logout').parent().hide();

    paywall.on('authenticated', function () {
        $('.inplayer-paywall-login').parent().hide();
        $('.inplayer-paywall-logout').parent().show();
    });

    paywall.on('logout', function () {
        location.reload();
    });

    // GET PACKAGE ITEMS INFO AND CREATE ITEM
    $.get(
        `${config.service_url}/items/packages/${config.package_id}/items?limit=500`,
        response => {

            var output = "";

            for (var i = 0; i < response.collection.length; i++) {
                var asset = response.collection[i];

                var assetId = asset.id;
                var assetPhoto = asset.metahash.paywall_cover_photo;
                var assetTitle = asset.title;
                output += createItemElement(assetId, assetPhoto, assetTitle);

                document.getElementById(
                    `package-items-${config.package_id}`
                ).innerHTML = output;
            } // for

        }); // get items


})