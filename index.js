var TRAFICO = TRAFICO || {};

TRAFICO.variables =
{
    url:
    {
        incidentes: "http://informo.munimadrid.es/informo/tmadrid/ptinfo.kml",
        camaras: "http://informo.munimadrid.es/informo/tmadrid/cctv.kml",
        nivelesServicio: "http://informo.munimadrid.es/informo/tmadrid/tramos.kml",
        intensidadesVEH_HR: "http://informo.munimadrid.es/informo/tmadrid/intensidades.kml",
        controlSemaforoRojo: "http://informo.munimadrid.es/informo/tmadrid/KML_ESTATICOS/gsancion.kml",
        avisadoresAcustivos: "http://informo.munimadrid.es/informo/tmadrid/KML_ESTATICOS/gavac.kml"
    },
    layers: [],
    map: null
};
TRAFICO.metodos =
{
    initMap: function()
    {
        var randomnumber = Math.floor(Math.random()*229);
        var centroMadrid = new google.maps.LatLng(40.4297009604458,-3.69346618652344);
        TRAFICO.variables.map = new google.maps.Map(document.getElementById('map'), 
        {
            zoom: 15,
            center: centroMadrid,				
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        $("#map").css("height", $(window).height() - 80);    
    },
    toggleLayers: function(i)
    {
        if(TRAFICO.variables.layers[i].getMap()==null) 
        {
            TRAFICO.variables.layers[i].setMap(TRAFICO.variables.map);
        }
        else 
        {
            TRAFICO.variables.layers[i].setMap(null);
        }
    },
    loadKML: function()
    {
        TRAFICO.variables.layers[0] = new google.maps.KmlLayer(TRAFICO.variables.url.incidentes, {preserveViewport: true});
        TRAFICO.variables.layers[1] = new google.maps.KmlLayer(TRAFICO.variables.url.camaras, {preserveViewport: true});
        TRAFICO.variables.layers[2] = new google.maps.KmlLayer(TRAFICO.variables.url.nivelesServicio, {preserveViewport: true});
        TRAFICO.variables.layers[3] = new google.maps.KmlLayer(TRAFICO.variables.url.intensidadesVEH_HR, {preserveViewport: true});
        TRAFICO.variables.layers[4] = new google.maps.KmlLayer(TRAFICO.variables.url.controlSemaforoRojo, {preserveViewport: true});
        TRAFICO.variables.layers[5] = new google.maps.KmlLayer(TRAFICO.variables.url.avisadoresAcustivos, {preserveViewport: true});
    }
}
$(window).on("resize", function() { $("#map").css("height", $(window).height() - 80); })
$(document).ready(function()
{
    TRAFICO.metodos.initMap();
    TRAFICO.metodos.loadKML();

    // Menu lateral
    $(".button-collapse").sideNav();

    // Modal
    $('#modalUserSettings').modal(
    {
        endingTop: '40%',
        ready: function(modal, trigger) 
        {
            $('.button-collapse').sideNav('hide');
        },
        complete: function() { }
    });

    $("a.tipoKML").on("click", function()
    {
        var layer = $(this).attr("id").split("_")[1];
        if ($(this).children("span.fa").hasClass("fa-angle-down"))
        {
            $(this).children("span.fa.right-align").removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).parent("div").removeClass("blue lighten-2");
        }
        else if ($(this).children("span.fa").hasClass("fa-angle-up"))
        {
            $(this).children("span.fa.right-align").removeClass("fa-angle-up").addClass("fa-angle-down");
            $(this).parent("div").addClass("blue lighten-2");
        }
        else
        {
            if ($(this).parent("li").hasClass("blue lighten-2"))
            {
                $(this).parent("li").removeClass("blue lighten-2")
            }
            else
            {
                $(this).parent("li").addClass("blue lighten-2")
            }
        }
        TRAFICO.metodos.toggleLayers(layer);
    })
    
    $('.collapsible').collapsible();
})
