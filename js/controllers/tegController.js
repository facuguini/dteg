
app.controller('TegController', ['$scope', function($scope) {
	$scope.cantDe = 1;
	$scope.cantAt = 1;
	$scope.defensor = [];
	$scope.atacante = [];
	$scope.imgs = ["images/dado1.png", "images/dado2.png", "images/dado3.png"];
	$scope.rdices = [];
	$scope.sacaAta;
	$scope.sacaDef;
	$scope.btnDisabled = false;
	$scope.comboImg = 'images/combo.jpg'
	$scope.cBreaker = false;
	$scope.setting = true;
	$scope.principal = false;
	var tempVibrate = window.localStorage.getItem("vibrate");
	switch(tempVibrate) {
		case "null":
		case "true":
				$scope.vibrate = true;
			break;
		case "false":
				$scope.vibrate = false;
			break;
	}	
	var tempSounds = window.localStorage.getItem("sounds");
	switch(tempSounds) {
		case "null":
		case "true":
				$scope.sounds = true;
			break;
		case "false":
				$scope.sounds = false;
			break;
	}
	var tempAnimations = window.localStorage.getItem("animations");
	switch(tempAnimations) {
		case "null":
		case "true":
				$scope.animations = true;
			break;
		case "false":
				$scope.animations = false;
			break;
	}
	var tempOnUser = window.localStorage.getItem("onUser");
	switch(tempOnUser) {
		case "null":
		case "true":
				$scope.onUser = true;
			break;
		case "false":
				$scope.onUser = false;
			break;
	}
	$scope.users = [];
	$scope.uName = "";

	$("#comboIm").toggle();

	for(i=1;i<7;i++) {
		$scope.rdices[i] = "images/dado" + i + ".png";
	}

	$scope.roll = function() {
		if ($scope.vibrate) {	
			navigator.notification.vibrate(500);
		}
		var sacaDef = [], sacaAta = [], numRand;
		restart();
		for(i=0;i<$scope.cantAt;i++) {
			numRand=random(1,7);
			$scope.atacante[i] = $scope.rdices[numRand];
			sacaAta[i] = numRand;
		}
		for(i=0;i<$scope.cantDe;i++) {
			numRand=random(1,7);
			$scope.defensor[i] = $scope.rdices[numRand]
			sacaDef[i] = numRand;
		}
		sacaAta = sacaAta.sort().reverse();
		sacaDef = sacaDef.sort().reverse();

		for(i=0;i<Math.min($scope.cantAt,$scope.cantDe);i++) {
			sacaAta[i] > sacaDef[i] ? $scope.sacaDef++ : $scope.sacaAta++;
		}
    	comboFunc();
	}

	$scope.openSetting = function() {
		$scope.setting = !$scope.setting;
		$scope.principal = !$scope.principal;
  	}

  	$scope.toggleThis = function(que) {
  		if ((que == "vibrate") && (!$scope[que])) {
  			navigator.notification.vibrate(500);
  		}
  		$scope[que] = !$scope[que];
  		window.localStorage.setItem(que, $scope[que]);
  	}

	var restart = function() {
		$scope.defensor = [];
		$scope.atacante = [];
		$scope.sacaAta = 0;
		$scope.sacaDef = 0;
	}

	var random = function(low, high) {
   		return Math.floor(Math.random() * (high - low) + low)
	}

	$scope.giroFunc = function(img, dado) {
		img = img.replace(/\D/g,'');
		return (img == $scope[dado] ? 'giro' : '');
	}

	$scope.unaFunc = function(dado, imgValor) {
		imgValor = imgValor.replace(/\D/g,'');
		$scope[dado] = imgValor;
	}

	var sounds = ["perdiste", "perdiste2"];

  	var comboFunc = function() {
	    if(($scope.cantAt == 3) && ($scope.cantDe == 1) && ($scope.sacaAta == 1)) {
	        var med0 = $scope.sounds ? new Media("/android_asset/www/sounds/combobreaker.mp3").play() : "";
	        if($scope.animations){
		        $("#comboIm").toggle("bounce");
		        setTimeout(function(){ $("#comboIm").toggle("scale"); }, 2000);
		    }
	    } else if(($scope.cantAt == 1) && ($scope.cantDe == 3) && ($scope.sacaDef == 1)) {
	        var med0 = $scope.sounds ? new Media("/android_asset/www/sounds/combobreaker.mp3").play() : "";
	        if($scope.animations){
		        $("#comboIm").toggle("bounce");
		    	setTimeout(function(){ $("#comboIm").toggle("scale"); }, 2000);
			}	    
	    } else if(($scope.cantAt == 3) && ($scope.cantDe == 3) && ($scope.sacaAta == 3)) {
	       	var med1 = $scope.sounds ? new Media("/android_asset/www/sounds/"+sounds[random(0,2)]+".mp3").play() : "";
	       	$scope.btnDisabled = $scope.sounds ? true : false;
			setTimeout(function(){$scope.$apply(function(){$scope.btnDisabled = false})}, 4500);
	    }
  	}

  	$scope.addUser = function() {
  		if (!isNullOrWhiteSpace($scope.uName)) {
	  		$scope.users[$scope.users.length]=$scope.uName;
	  		$scope.uName="";
  		} else {
  			$(".iuser").effect("pulsate").focus();

  		}
  	}

  	function isNullOrWhiteSpace(str){
    	return str === null || str.match(/^ *$/) !== null;
	}

  	$scope.removeUser = function(index) {
  		$scope.users.splice(index, 1);
  	}

	document.addEventListener("backbutton", onBackKeyDown, false);
	function onBackKeyDown() {
	    alert("Where are you going?");
	}



}]);


