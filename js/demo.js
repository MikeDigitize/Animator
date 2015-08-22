(function(){
    
    var animator = new Animator();

	if(!animator.isSupported()){
		alert("No support for you!");
		return;
	}

	function startAnimation() {

        isPlaying = true;

		var sequence = animator.animation({
			element : logo,
			addClass : {
				before : ["animated", "bounceInLeft"]
			}
		});

		sequence
			.then(function() {
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(13px,130px,0) rotate(12deg) scale(1)")
					}
				});
			})
			.then(function () {
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(43px,-15px,0) rotate(17deg)")
					}
				});
			})
			.then(function () {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf],	["0.4s", "cubic-bezier(0.175, 0.885, 0.320, 1)"]));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(43px,-15px,0) rotate(90deg)")
					}
				});
			})
			.then(function () {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf], ["0.3s", "ease-out"]	));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(90px,-15px,0) rotate(90deg)")
					}
				});
			})
			.then(function () {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf], ["0.4s", "cubic-bezier(0.175, 0.885, 0.320, 1)"]));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(95px,-15px,0) rotate(168deg)")
					}
				});
			})
			.then(function (tank) {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf], ["0.3s", "ease-out"]	));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(120px,132px,0) rotate(168deg)")
					}
				});
			})
			.then(function () {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf], ["0.3s", "cubic-bezier(0.175, 0.885, 0.320, 1)"]	));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(120px,132px,0) rotate(270deg)")
					}
				});
			})
			.then(function () {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf], ["0.3s", "ease-out"]	));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(13px,130px,0) rotate(270deg)")
					}
				});
			})
			.then(function () {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf], ["0.3s", "cubic-bezier(0.175, 0.885, 0.320, 1)"]	));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(13px,130px,0) rotate(12deg) scale(1)")
					}
				});
			})
			.then(function () {
				animator.setStyles(tank, animator.createCSSRule([duration, ttf], ["0.3s", "ease-out"]));
				return animator.transition({
					element : tank,
					properties : transform,
					setStyles : {
						before : animator.createCSSRule(transform, "translate3d(13px,130px,0) rotate(12deg) scale(0)")
					}
				});
			})
			.then(function() {
				return animator.animation({
					element : title,
					setStyles : {
						before : {
							opacity : 1
						}
					},
					addClass : {
						before : ["animated", "zoomInRight"]
					},
					removeClass : {
						after : "zoomInRight"
					}
				});
			})
			.then(function () {
				return animator.transition({
					element : title,
					setStyles : {
						before : animator.createCSSRule(transform, "scale(0.1)")
					}
				});
			})
			.then(function () {
				animator.setStyles(title, animator.createCSSRule([duration, ttf, "text-transform"], ["0.2s", "cubic-bezier(0.175, 0.885, 0.320, 1)", "uppercase"]));
				return animator.transition({
					element : title,
					setStyles : {
						before : animator.createCSSRule(transform, "scale(5)")
					}
				});
			})
			.then(function () {
				return animator.transition({
					element : title,
					setStyles : {
						before : animator.createCSSRule(transform, "scale(1)")
					}
				});
			})
			.then(function () {
				animator.setStyles(text, { opacity : 1 });
				return animator.combo([
					animator.animation({
						element : text,
						addClass : {
							before : ["animated", "slideInUp"]
						},
						removeClass : {
							after : ["animated", "slideInUp"]
						}
					}),
					animator.transition({
						element : text,
						properties : "opacity",
						setStyles : {
							before : {
								opacity : 1
							}
						}
					})
				]);
			})
			.then(function() {
                isPlaying = false;
				console.log("done");
			});
	}

	var holder = document.querySelector(".top-header");
	var logo = holder.querySelector(".logo");
	var tank = logo.querySelector(".tank");
	var title = holder.querySelector("h1");
	var text = document.querySelector(".coming-soon");

	var transform = animator.getPrefix("transform");
	var duration = animator.getPrefix("transition-duration");
	var ttf = animator.getPrefix("transition-timing-function");

    var isPlaying = false;

    document.body.addEventListener("click", function() {
        isPlaying ? animator.pause() : animator.play();
        isPlaying = !isPlaying;
    });

	animator.setStyles(title, animator.createCSSRule([transform, "opacity"], ["scale(1)", 0]));
	animator.createTransition({
		element : title,
		properties : transform,
		duration : "0.5s",
		easing : "ease-in-out"
	});
	animator.createTransition({
		element : text,
		properties : "opacity",
		duration : "1s",
		easing : "ease-in"
	});

	startAnimation();

})();