// QGIS Web Map - Main JavaScript

// Remove popup's row if "visible-with-data"
function removeEmptyRowsFromPopupContent(content, feature) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector('td.visible-with-data');
        var key = td ? td.id : '';
        if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
            rows[i].parentNode.removeChild(rows[i]);
        }
    }
    return tempDiv.innerHTML;
}

// Modify popup if contains media
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var imgTd = tempDiv.querySelector('td img');
    if (imgTd) {
        var src = imgTd.getAttribute('src');
        if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.update();
            }, 10);
        } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.src = src;
            imgTd.parentNode.replaceChild(audio, imgTd);
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
            var video = document.createElement('video');
            video.controls = true;
            video.src = src;
            video.style.width = "400px";
            video.style.height = "300px";
            video.style.maxHeight = "60vh";
            video.style.maxWidth = "60vw";
            imgTd.parentNode.replaceChild(video, imgTd);
            popup._contentNode.classList.add('media');
            video.addEventListener('loadedmetadata', function() {
                popup.update();
            });
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else {
            popup._contentNode.classList.remove('media');
        }
    } else {
        popup._contentNode.classList.remove('media');
    }
}

// Initialize map
var map = L.map('map', {
    zoomControl: false, maxZoom: 28, minZoom: 1
}).fitBounds([[-0.37569165617498024, 105.30691042474194], [-0.36367927082495133, 105.32726273425817]]);

var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

var zoomControl = L.control.zoom({
    position: 'topleft'
}).addTo(map);

var bounds_group = new L.featureGroup([]);

function setBounds() {
}

// Base layer - OpenStreetMap
map.createPane('pane_OpenStreetMap_0');
map.getPane('pane_OpenStreetMap_0').style.zIndex = 400;
var layer_OpenStreetMap_0 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    pane: 'pane_OpenStreetMap_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
layer_OpenStreetMap_0;
map.addLayer(layer_OpenStreetMap_0);

// Layer: NOxItera_1
function pop_NOxItera_1(feature, layer) {
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['RWID'] !== null ? autolinker.link(String(feature.properties['RWID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['RWE_INDEX'] !== null ? autolinker.link(String(feature.properties['RWE_INDEX']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['MINLEVEL'] !== null ? autolinker.link(String(feature.properties['MINLEVEL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['MAXLEVEL'] !== null ? autolinker.link(String(feature.properties['MAXLEVEL']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['FILLCOLOR'] !== null ? autolinker.link(String(feature.properties['FILLCOLOR']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['konsentra'] !== null ? autolinker.link(String(feature.properties['konsentra']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, {maxHeight: 400});
}

function style_NOxItera_1_0(feature) {
    if (feature.properties['konsentra'] >= 0.550000 && feature.properties['konsentra'] <= 1.170000) {
        return {
            pane: 'pane_NOxItera_1',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(68,1,84,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['konsentra'] >= 1.170000 && feature.properties['konsentra'] <= 4.200000) {
        return {
            pane: 'pane_NOxItera_1',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(59,82,139,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['konsentra'] >= 4.200000 && feature.properties['konsentra'] <= 8.300000) {
        return {
            pane: 'pane_NOxItera_1',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(33,144,141,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['konsentra'] >= 8.300000 && feature.properties['konsentra'] <= 27.000000) {
        return {
            pane: 'pane_NOxItera_1',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(93,201,99,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['konsentra'] >= 27.000000 && feature.properties['konsentra'] <= 57.574000) {
        return {
            pane: 'pane_NOxItera_1',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(253,231,37,1.0)',
            interactive: true,
        }
    }
}

map.createPane('pane_NOxItera_1');
map.getPane('pane_NOxItera_1').style.zIndex = 401;
map.getPane('pane_NOxItera_1').style['mix-blend-mode'] = 'normal';
var layer_NOxItera_1 = new L.geoJson(json_NOxItera_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_NOxItera_1',
    layerName: 'layer_NOxItera_1',
    pane: 'pane_NOxItera_1',
    onEachFeature: pop_NOxItera_1,
    style: style_NOxItera_1_0,
});
bounds_group.addLayer(layer_NOxItera_1);
map.addLayer(layer_NOxItera_1);

// Layer: Invntarisasi_2 (Image overlay)
map.createPane('pane_Invntarisasi_2');
map.getPane('pane_Invntarisasi_2').style.zIndex = 402;
var img_Invntarisasi_2 = 'data/Invntarisasi_2.png';
var img_bounds_Invntarisasi_2 = [[-5.40491, 105.28081], [-5.34491, 105.35581]];
var layer_Invntarisasi_2 = new L.imageOverlay(img_Invntarisasi_2,
    img_bounds_Invntarisasi_2,
    {pane: 'pane_Invntarisasi_2'});
bounds_group.addLayer(layer_Invntarisasi_2);
map.addLayer(layer_Invntarisasi_2);

// Layer: hysp_3
function pop_hysp_3(feature, layer) {
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['OID_'] !== null ? autolinker.link(String(feature.properties['OID_']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['FolderPath'] !== null ? autolinker.link(String(feature.properties['FolderPath']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['SymbolID'] !== null ? autolinker.link(String(feature.properties['SymbolID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['AltMode'] !== null ? autolinker.link(String(feature.properties['AltMode']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Base'] !== null ? autolinker.link(String(feature.properties['Base']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Clamped'] !== null ? autolinker.link(String(feature.properties['Clamped']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Extruded'] !== null ? autolinker.link(String(feature.properties['Extruded']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['TimeSpan'] !== null ? autolinker.link(String(feature.properties['TimeSpan']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['TimeStamp'] !== null ? autolinker.link(String(feature.properties['TimeStamp']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['BeginTime'] !== null ? autolinker.link(String(feature.properties['BeginTime']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['EndTime'] !== null ? autolinker.link(String(feature.properties['EndTime']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Snippet'] !== null ? autolinker.link(String(feature.properties['Snippet']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['PopupInfo'] !== null ? autolinker.link(String(feature.properties['PopupInfo']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Shape_Leng'] !== null ? autolinker.link(String(feature.properties['Shape_Leng']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['persentase'] !== null ? autolinker.link(String(feature.properties['persentase']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, {maxHeight: 400});
}

function style_hysp_3_0(feature) {
    if (feature.properties['Shape_Leng'] >= 4.422879 && feature.properties['Shape_Leng'] <= 6.074973) {
        return {
            pane: 'pane_hysp_3',
            opacity: 1,
            color: 'rgba(242,44,0,1.0)',
            dashArray: '',
            lineCap: 'square',
            lineJoin: 'bevel',
            weight: 1.0,
            fillOpacity: 0,
            interactive: true,
        }
    }
    if (feature.properties['Shape_Leng'] >= 6.074973 && feature.properties['Shape_Leng'] <= 8.307753) {
        return {
            pane: 'pane_hysp_3',
            opacity: 1,
            color: 'rgba(34,105,34,1.0)',
            dashArray: '',
            lineCap: 'square',
            lineJoin: 'bevel',
            weight: 1.0,
            fillOpacity: 0,
            interactive: true,
        }
    }
    if (feature.properties['Shape_Leng'] >= 8.307753 && feature.properties['Shape_Leng'] <= 11.121217) {
        return {
            pane: 'pane_hysp_3',
            opacity: 1,
            color: 'rgba(253,231,37,1.0)',
            dashArray: '',
            lineCap: 'square',
            lineJoin: 'bevel',
            weight: 1.0,
            fillOpacity: 0,
            interactive: true,
        }
    }
}

map.createPane('pane_hysp_3');
map.getPane('pane_hysp_3').style.zIndex = 403;
map.getPane('pane_hysp_3').style['mix-blend-mode'] = 'normal';
var layer_hysp_3 = new L.geoJson(json_hysp_3, {
    attribution: '',
    interactive: true,
    dataVar: 'json_hysp_3',
    layerName: 'layer_hysp_3',
    pane: 'pane_hysp_3',
    onEachFeature: pop_hysp_3,
    style: style_hysp_3_0,
});
bounds_group.addLayer(layer_hysp_3);
map.addLayer(layer_hysp_3);

// Layer: Export_Output_4
function pop_Export_Output_4(feature, layer) {
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['OID_'] !== null ? autolinker.link(String(feature.properties['OID_']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['FolderPath'] !== null ? autolinker.link(String(feature.properties['FolderPath']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['SymbolID'] !== null ? autolinker.link(String(feature.properties['SymbolID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['AltMode'] !== null ? autolinker.link(String(feature.properties['AltMode']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Base'] !== null ? autolinker.link(String(feature.properties['Base']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Clamped'] !== null ? autolinker.link(String(feature.properties['Clamped']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Extruded'] !== null ? autolinker.link(String(feature.properties['Extruded']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Snippet'] !== null ? autolinker.link(String(feature.properties['Snippet']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['PopupInfo'] !== null ? autolinker.link(String(feature.properties['PopupInfo']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Shape_Leng'] !== null ? autolinker.link(String(feature.properties['Shape_Leng']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Shape_Area'] !== null ? autolinker.link(String(feature.properties['Shape_Area']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, {maxHeight: 400});
}

function style_Export_Output_4_0(feature) {
    if (feature.properties['Shape_Leng'] >= 0.000000 && feature.properties['Shape_Leng'] <= 0.000302) {
        return {
            pane: 'pane_Export_Output_4',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(68,1,84,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['Shape_Leng'] >= 0.000302 && feature.properties['Shape_Leng'] <= 0.000603) {
        return {
            pane: 'pane_Export_Output_4',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(59,82,139,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['Shape_Leng'] >= 0.000603 && feature.properties['Shape_Leng'] <= 0.001250) {
        return {
            pane: 'pane_Export_Output_4',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(33,144,141,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['Shape_Leng'] >= 0.001250 && feature.properties['Shape_Leng'] <= 0.002690) {
        return {
            pane: 'pane_Export_Output_4',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(93,201,99,1.0)',
            interactive: true,
        }
    }
    if (feature.properties['Shape_Leng'] >= 0.002690 && feature.properties['Shape_Leng'] <= 0.019111) {
        return {
            pane: 'pane_Export_Output_4',
            opacity: 1,
            color: 'rgba(35,35,35,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(253,231,37,1.0)',
            interactive: true,
        }
    }
}

map.createPane('pane_Export_Output_4');
map.getPane('pane_Export_Output_4').style.zIndex = 404;
map.getPane('pane_Export_Output_4').style['mix-blend-mode'] = 'normal';
var layer_Export_Output_4 = new L.geoJson(json_Export_Output_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Export_Output_4',
    layerName: 'layer_Export_Output_4',
    pane: 'pane_Export_Output_4',
    onEachFeature: pop_Export_Output_4,
    style: style_Export_Output_4_0,
});
bounds_group.addLayer(layer_Export_Output_4);
map.addLayer(layer_Export_Output_4);

setBounds();

// Expose layer references for sidebar controls
try {
    if (typeof layerReferences !== 'undefined') {
        layerReferences['layer_NOxItera_1'] = layer_NOxItera_1;
        layerReferences['layer_Invntarisasi_2'] = layer_Invntarisasi_2;
        layerReferences['layer_hysp_3'] = layer_hysp_3;
        layerReferences['layer_Export_Output_4'] = layer_Export_Output_4;
    }
} catch (err) {
    console.warn('Gagal mengatur layerReferences untuk kontrol sidebar:', err);
}

    // Sidebar toggle for desktop/mobile
    function toggleSidebar() {
        var sb = document.getElementById('sidebar');
        if (!sb) return;

        // On small screens, toggle 'open' to slide in/out
        if (window.innerWidth <= 768) {
            sb.classList.toggle('open');
            return;
        }

        // On desktop, toggle collapsed state
        sb.classList.toggle('collapsed');
    }

    // Ensure sidebar defaults to visible (remove collapsed) on load
    window.addEventListener('load', function() {
        var sb = document.getElementById('sidebar');
        if (sb) sb.classList.remove('collapsed');
    });

    // After toggling sidebar, ensure map redraws so tiles don't overflow
    function postSidebarUpdate() {
        try {
            if (map && typeof map.invalidateSize === 'function') {
                setTimeout(function() { map.invalidateSize(); }, 260);
            }
        } catch (e) {
            console.warn('Kesalahan saat postSidebarUpdate', e);
        }
    }

    // Attach post-update when sidebar toggles (delegated)
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.id === 'sidebar-toggle' || e.target.closest && e.target.closest('.sidebar-toggle'))) {
            postSidebarUpdate();
        }
    });

// Ensure the Leaflet map updates its size after the layout change (centered/smaller map)
function ensureMapRender() {
    try {
        if (map && typeof map.invalidateSize === 'function') {
            // small delay to let CSS layout settle
            setTimeout(function() { map.invalidateSize(); }, 250);
        }
    } catch (e) {
        console.warn('Kesalahan saat memastikan render peta', e);
    }
}

window.addEventListener('load', ensureMapRender);
window.addEventListener('resize', ensureMapRender);

L.ImageOverlay.include({
    getBounds: function () {
        return this._bounds;
    }
});
