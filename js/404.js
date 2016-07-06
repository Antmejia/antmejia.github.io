$(document).ready(function() {
	
    $('#scene').parallax({
        calibrateX: true,      
        calibrateY: true,
        invertX: false,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 10,
        scalarY: 35,
        frictionX: 0.2,
        frictionY: 0.8,
        originX: 0.0,
        originY: 1.0
    });
});