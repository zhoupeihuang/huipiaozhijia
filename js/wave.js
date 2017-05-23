/* @update: 2017-3-9 18:34:34 */
	setInterval(function() {
		var t = $(".wave-roll-area .wave1").css("left");
		isNaN(t) && t.length > 0 && (t = ~~t.substr(0, t.length - 2)),
		t = t > -3e3 ? t - 1 : 0,
		$(".wave-roll-area .wave1").css("left", t)
	}, 30),
	setInterval(function() {
		var t = $(".wave-roll-area .wave2").css("left");
		isNaN(t) && t.length > 0 && (t = ~~t.substr(0, t.length - 2)),
		t = t > -3e3 ? t - 1 : 0,
		$(".wave-roll-area .wave2").css("left", t)
	}, 50),
	setInterval(function() {
		var t = $(".wave-roll-area .wave3").css("left");
		isNaN(t) && t.length > 0 && (t = ~~t.substr(0, t.length - 2)),
		t = t > -3e3 ? t - 1 : 0, 
		$(".wave-roll-area .wave3").css("left", t)
	}, 10)
