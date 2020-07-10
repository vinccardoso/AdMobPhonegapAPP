//------- Admob ----------
var admobid = {
  //--- Test Ads ---
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewardvideo: 'ca-app-pub-3940256099942544/5224354917'
  //--- Live Ads ---
};

function initAds() {
  console.log("funcionou");

  if (!AdMob) {
    alert('admob plugin not ready');
    document.getElementById('status').innerHTML = 'Admob plugin not ready';
    return;
  }

  initAd();
  document.getElementById('status').innerHTML = 'Ads initialized';

  
}

function initAd() {
  var defaultOptions = {
    bannerId: admobid.banner,
    interstitialId: admobid.interstitial,
    adSize: 'SMART_BANNER',
    // width: integer, // valid when set adSize 'CUSTOM'
    // height: integer, // valid when set adSize 'CUSTOM'
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
    bgColor: 'black', // color name, or '#RRGGBB'
    // x: integer,		// valid when set position to 0 / POS_XY
    // y: integer,		// valid when set position to 0 / POS_XY
    isTesting: true, // set to true, to receiving test ad for testing purpose
    autoShow: false // auto show interstitial ad when loaded, set to false if prepare/show
  };
  AdMob.setOptions(defaultOptions);

  registerAdEvents();
  AdMob.prepareInterstitial({ adId: admobid.interstitial, autoShow: false });
  AdMob.createBanner({
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    autoShow: false
  });
  AdMob.prepareRewardVideoAd({
    adId: admobid.rewardvideo,
    autoShow: false
  });
}

// optional, in case respond to events or handle error
function registerAdEvents() {
  // new events, with variable to differentiate: adNetwork, adType, adEvent
  // comment out for production
  // document.addEventListener('onAdFailLoad', function(data) {
  //   var errorMsg =
  //     'error: ' +
  //     data.error +
  //     ', reason: ' +
  //     data.reason +
  //     ', adNetwork:' +
  //     data.adNetwork +
  //     ', adType:' +
  //     data.adType +
  //     ', adEvent:' +
  //     data.adEvent;

  //   document.getElementById('status').innerHTML = errorMsg;
  // });
  document.addEventListener('onAdLoaded', function(data) {});
  document.addEventListener('onAdPresent', function(data) {});
  document.addEventListener('onAdLeaveApp', function(data) {});
  document.addEventListener('onAdDismiss', function(data) {
    prepareAd(data.adType);
    if (data.adType === 'rewardvideo') {
      //-- give your reward here --
      //alert('Here is your reward');
    }
  });
}

function prepareAd(type) {
  if (type === 'interstitial') {
    AdMob.prepareInterstitial({
      adId: admobid.interstitial,
      autoShow: false
    });
  }
  if (type === 'rewardvideo') {
    AdMob.prepareRewardVideoAd({
      adId: admobid.rewardvideo,
      autoShow: false
    });
  }
  if (type === 'all') {
    initApp();

    AdMob.prepareInterstitial({
      adId: admobid.interstitial,
      autoShow: false
    });
    AdMob.prepareRewardVideoAd({
      adId: admobid.rewardvideo,
      autoShow: false
    });
  }
}

//--- called from onClick() inline in html pages ---
function showBannerAd() {
  document.getElementById('status').innerHTML = 'Banner Ad called';
  AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
}

function showInterstitialAd() {
  document.getElementById('status').innerHTML = 'Interstitial Ad called';
  AdMob.showInterstitial();
}

function showRewardedVideoAd() {
  document.getElementById('status').innerHTML = 'Rewarded Video Ad called';
  AdMob.showRewardVideoAd();
}
