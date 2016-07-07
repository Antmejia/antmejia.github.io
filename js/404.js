$(document).ready(function() {
    $('#scene').parallax({
        calibrateX: true,      
        calibrateY: true,
        invertX: false,
        invertY: true,
        limitX: 80,
        limitY: 30,
        scalarX: 10,
        scalarY: 35,
        frictionX: 0.2,
        frictionY: 0.6,
        originX: 0.0,
        originY: 1.0
    });
});