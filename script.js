var coordinates = [];
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map-canvas"), {
        center: { lat: 22.5726, lng: 88.3639 },
        zoom: 8,


    });

    var all_overlays = [];
    var selectedshape;
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER,

                google.maps.drawing.OverlayType.POLYGON,

            ],
        },

        markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            editable: true,

        },

        polygonOptions: {
            fillColor: "#ffff00",
            fillOpacity: 0.2,
            strokeWeight: 3,
            clickable: true,
            editable: true,
        }
    });


    drawingManager.setMap(map);
    function clearSelection() {
        if (selectedshape) {
            selectedshape.setEditable(false)
            selectedshape = null

        }
    }

    function setSelection() {
        clearSelection();
        stopDrawing()
        selectedshape = shape;
        shape.setEditable(true)
    }


    function getPolygonCoords(newShape) {
        coordinates.splice(0, coordinates.length);
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; ++i) {
            coordinates.push(newShape.getPath().getAt(i).toUrlValue(5))
        }
        document.getElementById('info').innerHTML = coordinates;
        return coordinates;
    }
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
        event.getPath().getLength();
        google.maps.event.addListener(event, "dragend", getPolygonCoords(event));
        google.maps.event.addListener(event.getPath(), "insert_at", function () {
            coordinates.splice(0, coordinates.length);
            var len = event.getPath().getLength();
            for (var i = 0; i < len; ++i) {
                document.getElementById("info").innerHTML = coordinates;
                coordinates.push(event.getPath().getAt(i).toUrlValue(5))
            }
        })
        document.getElementById('info').innerHTML = coordinates;
        console.log(coordinates)
    })
    google.maps.event.addListener(event.getPath(), 'set_at', function () {
        coordinates.splice(0, coordinates.length)
        var len = event.getPath().getLength();
        for (var i = 0; i < len; ++i) {
            document.getElementById("info").innerHTML = coordinates;
            coordinates.push(event.getPath().getAt(i).toUrlValue(5))
        }
        document.getElementById('info').innerHTML = coordinates;

    })

    google.maps.event.addListener(drawingManager, 'overlayComplete', function (event) {
        all_overlays.push(event);
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
            drawingManager.setDrawingMode(null);
            var newShape = event.overlay;
            newShape.type = event.type;
            google.maps.event.addListener(newShape, 'click', function () {
                setSelection(newShape);
            })
            setSelection(newShape);
        }
    })
}


