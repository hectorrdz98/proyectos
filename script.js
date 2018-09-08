var arrayVectores = {};

$("#btn_ocultar_bl").on({
    click: function () {
        if(parseInt($("#cont_bl").css("transform").split(',')[4]) != 0){
            $("#cont_bl").css("transform", "translate(0px)");
            $("#btn_ocultar_bl svg").attr("class", "pleft");
        } else if (parseInt($("#cont_bl").css("transform").split(',')[4]) == 0) {
            $("#cont_bl").css("transform", "translate(-300px)");
            $("#btn_ocultar_bl svg").attr("class", "pright");
        }
    }
});

$("#agregarVector").on({
    click: function () {
        if (
            ($("#valX1input").val() != "")&&(($("#valY1input").val() != ""))&&
            ($("#valX2input").val() != "")&&(($("#valY2input").val() != ""))&&
            ($("#valNombreinput").val() != "")) {
            var elementoAgregar = `
                  <div class="element_bl">
                      <p class="nombreV_elem">` + $("#valNombreinput").val() + `:</p>
                      <div class="cont_elem">
                          <div class="subcont_elem">
                              <div class="color_elem" style="background-color: ` + $("#selec_color").css("background-color") + `"></div>
                              <p>Las componentes son: </p>
                              <p class="comp_elem">(` + (parseInt($("#valX2input").val()) - parseInt($("#valX1input").val())) + `, ` + (parseInt($("#valY2input").val()) - parseInt($("#valY1input").val())) + `)</p>
                          </div>
                          <div class="cont_svg_elem">
                              <svg class="flecha_elem" width="10" height="5">
                                  <line x1="0" y1="0" x2="5" y2="5" style="stroke-width: 1"/>
                                  <line x1="10" y1="0" x2="5" y2="5" style="stroke-width: 1"/>
                              </svg>
                          </div>
                      </div>
                      <div class="cont_detalles_elem" id="prueba">
                          <div class="subcont_detalles_elem">
                              <p>Punto inicial: </p>
                              <p class="comp_elem">(` + $("#valX1input").val() + `, ` + $("#valY1input").val() + `)</p>
                          </div>
                          <div class="subcont_detalles_elem">
                              <p>Punto final: </p>
                              <p class="comp_elem">(` + $("#valX2input").val() + `, ` + $("#valY2input").val() + `)</p>
                          </div>
                          <div class="subcont_detalles_elem">
                              <p>Magnitud: </p>
                              <p class="comp_elem">` + Math.sqrt(Math.pow((parseInt($("#valY2input").val()) - parseInt($("#valY1input").val())), 2) + Math.pow((parseInt($("#valX2input").val()) - parseInt($("#valX1input").val())), 2)) + `</p>
                          </div>
                          <div class="subcont_detalles_elem">
                              <p>Dirección: </p>
                              <p class="comp_elem">` + Math.atan((parseInt($("#valY2input").val()) - parseInt($("#valY1input").val())) / (parseInt($("#valX2input").val()) - parseInt($("#valX1input").val()))) * 180 / Math.PI + `°</p>
                          </div>
                      </div>
                  </div>
            `;
            $("#contenido_bl").append(elementoAgregar);
            
            colorV = $("#selec_color").css("background-color").split(", ");
            colorV[0] = colorV[0].substring(4, colorV[0].length);
            colorV[2] = colorV[2].substring(0, colorV[2].length - 1);
            
            asociarVector(
                colorV,
                parseInt($("#valX1input").val()),
                parseInt($("#valY1input").val()),
                parseInt($("#valX2input").val()),
                parseInt($("#valY2input").val())
            );
            
            arrayVectores[$("#valNombreinput").val()] = {
                color: colorV,
                colorUF: $("#selec_color").css("background-color"),
                x1: parseInt($("#valX1input").val()),
                x2: parseInt($("#valX2input").val()),
                y1: parseInt($("#valY1input").val()),
                y2: parseInt($("#valY2input").val())
            }
            //print(arrayVectores);
        }
    }
});

$(document).on('click', '.cont_svg_elem', function(){
    if ($(this).parent().next().css("height") == "0px") {
        $(this).parent().next().css("height", "60px");
        $(this).parent().next().css("opacity", "1");
        $(this).css("transform", "rotate(-180deg)");
    } else if ($(this).parent().next().css("height") != "0px") {
        $(this).parent().next().css("height", "0px");
        $(this).parent().next().css("opacity", "0");
        $(this).css("transform", "rotate(0deg)");
    }
    
}); 

var posEjeX = 700;
var posEjeY = 400;
var maxTamCanvas = 2000;
var escalaCanvas = 20;
var inicioXGrid = 0;
var inicioYGrid = 0;

var vectoresDibujados = [];

function asociarVector(color, x1, y1, x2, y2) {
    stroke(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
    line(posEjeX + x1*escalaCanvas, posEjeY - y1*escalaCanvas, posEjeX + x2*escalaCanvas, posEjeY - y2*escalaCanvas);
}

function setup() {
 // setup() do once
    //frameRate(60);
    createCanvas(maxTamCanvas, maxTamCanvas);
    noLoop();
}

function draw() {
 // draw() loops forever, until stopped
    clear();
    if (inicioYGrid>=0) {
        var nLineasExtra = parseInt(inicioYGrid/escalaCanvas);
        for (var i = inicioYGrid - (nLineasExtra * escalaCanvas); i<=maxTamCanvas; i=i+escalaCanvas) {
            stroke(220, 220, 220);
            if (inicioXGrid>=0) {
                line(0-inicioXGrid, i, maxTamCanvas, i);
            } else {
                //stroke(220, 220, 0);
                line(inicioXGrid, i, maxTamCanvas, i);
            }
        }
    } else {
        for (var i = inicioYGrid; i<=maxTamCanvas; i=i+escalaCanvas) {
            stroke(220, 220, 220);
            if (inicioXGrid>=0) {
                line(0-inicioXGrid, i, maxTamCanvas, i);
            } else {
                line(inicioXGrid, i, maxTamCanvas, i);
            }
        }
    }
    
    if (inicioXGrid>=0) {
        var nLineasExtra = parseInt(inicioXGrid/escalaCanvas);
        for (var i = inicioXGrid - (nLineasExtra * escalaCanvas); i<=maxTamCanvas; i=i+escalaCanvas) {
            stroke(220, 220, 220);
            if (inicioYGrid>=0) {
                //stroke(220, 0, 220);
                line(i, 0-inicioYGrid, i, maxTamCanvas);
            } else {
                line(i, inicioYGrid, i, maxTamCanvas);
            }
        }
    } else {
        for (var i = inicioXGrid; i<=maxTamCanvas; i=i+escalaCanvas) {
            stroke(220, 220, 220);
            if (inicioYGrid>=0) {
                //stroke(220, 220, 0);
                line(i, 0-inicioYGrid, i, maxTamCanvas);
            } else {
                line(i, inicioYGrid, i, maxTamCanvas);
            }
        }
    }
    
    stroke(0);
    line(0, posEjeY, maxTamCanvas, posEjeY);
    line(posEjeX, 0, posEjeX, maxTamCanvas);  
    
    for (var key in arrayVectores) {
        stroke(arrayVectores[key]["color"][0], arrayVectores[key]["color"][1], arrayVectores[key]["color"][2]);
        line(posEjeX + arrayVectores[key]["x1"]*escalaCanvas, posEjeY - arrayVectores[key]["y1"]*escalaCanvas, posEjeX + arrayVectores[key]["x2"]*escalaCanvas, posEjeY - arrayVectores[key]["y2"]*escalaCanvas);
    };
    
}

function dibujarVectores() {
    vectoresDibujados.forEach(function(currentValue, index) {
       line(posEjeX, posEjeY, posEjeX + 200, posEjeY - 200);
    });
}

function cambioColor(t) {
    $("#selec_color").css("background-color", t.value);
}

$("#agregar_operacion_bl").on({
    click: function () {
        var inputOperacion = `
              <div id="agregar_operacion_input_bl">
                  <div id="cont_input_agregar_op">
                      <input type="text" placeholder="Ingrese la operación aquí..."/>
                      <div id="ready_agregar_op"></div>
                  </div>
              </div>
        `;
        $(this).before(inputOperacion);
    }
});

function agregarBitaVector(nombreV, x1V, x2V, y1V, y2V, colorV) {
    formaColor = colorV;
    var elementoAgregar = `
                  <div class="element_bl">
                      <p class="nombreV_elem">` + nombreV + `:</p>
                      <div class="cont_elem">
                          <div class="subcont_elem">
                              <div class="color_elem" style="background-color: ` + colorV + `"></div>
                              <p>Las componentes son: </p>
                              <p class="comp_elem">(` + (x2V - x1V) + `, ` + (y2V - y1V) + `)</p>
                          </div>
                          <div class="cont_svg_elem">
                              <svg class="flecha_elem" width="10" height="5">
                                  <line x1="0" y1="0" x2="5" y2="5" style="stroke-width: 1"/>
                                  <line x1="10" y1="0" x2="5" y2="5" style="stroke-width: 1"/>
                              </svg>
                          </div>
                      </div>
                      <div class="cont_detalles_elem" id="prueba">
                          <div class="subcont_detalles_elem">
                              <p>Punto inicial: </p>
                              <p class="comp_elem">(` + x1V + `, ` + y1V + `)</p>
                          </div>
                          <div class="subcont_detalles_elem">
                              <p>Punto final: </p>
                              <p class="comp_elem">(` + x2V + `, ` + y2V + `)</p>
                          </div>
                          <div class="subcont_detalles_elem">
                              <p>Magnitud: </p>
                              <p class="comp_elem">` + Math.sqrt((Math.pow(y2V - y1V), 2) + Math.pow((x2V - x1V), 2)) + `</p>
                          </div>
                          <div class="subcont_detalles_elem">
                              <p>Dirección: </p>
                              <p class="comp_elem">` + Math.atan((y2V - y1V) / (x2V - x1V)) * 180 / Math.PI + `°</p>
                          </div>
                      </div>
                  </div>
            `;
    $("#contenido_bl").append(elementoAgregar);
    
    colorV = colorV.split(", ");
    colorV[0] = colorV[0].substring(4, colorV[0].length);
    colorV[2] = colorV[2].substring(0, colorV[2].length - 1);
            
    asociarVector(
        colorV,
        x1V,
        y1V,
        x2V,
        y2V
    );
            
    arrayVectores[nombreV] = {
        color: colorV,
        colorUF: formaColor,
        x1: x1V,
        x2: x2V,
        y1: y1V,
        y2: y2V
    }
}

$(document).on('click', '#ready_agregar_op', function(){
    if($(this).prev().val() == "") {
        $(this).parent().parent().remove();
    } else {
        nombresASumar = $(this).prev().val().split(" + ");
        var valCompTotalY = 0;
        var valCompTotalX = 0;
        colorR = [0, 0, 0];
        nombresASumar.forEach(function(currentValue, index) {
            if (currentValue.charAt(0) == '-') {
                currentValue = currentValue.substring(1, currentValue.length);
                
                valCompTotalX += (-1) * (arrayVectores[currentValue]["x2"] - arrayVectores[currentValue]["x1"]);
                
                valCompTotalY += (-1) * (arrayVectores[currentValue]["y2"] - arrayVectores[currentValue]["y1"]);
                
                colorR[0] += parseInt(arrayVectores[currentValue]["color"][0]);
                colorR[1] += parseInt(arrayVectores[currentValue]["color"][1]);
                colorR[2] += parseInt(arrayVectores[currentValue]["color"][2]);
                
            } else {
                
                valCompTotalX += arrayVectores[currentValue]["x2"] - arrayVectores[currentValue]["x1"];
                
                valCompTotalY += arrayVectores[currentValue]["y2"] - arrayVectores[currentValue]["y1"];
                
                colorR[0] += parseInt(arrayVectores[currentValue]["color"][0]);
                colorR[1] += parseInt(arrayVectores[currentValue]["color"][1]);
                colorR[2] += parseInt(arrayVectores[currentValue]["color"][2]);
            }
        });
        colorVectorSuma = "rgb(" + colorR[0]/nombresASumar.length + ", " + colorR[1]/nombresASumar.length + ", " + colorR[2]/nombresASumar.length + ")";
        agregarBitaVector($(this).prev().val(), 0, valCompTotalX, 0, valCompTotalY, colorVectorSuma);
        $(this).parent().parent().remove();
    }
});

function mouseMoved() {
    if (($('#barra_lateral').is(':hover')) || ($('#barra_inferior').is(':hover'))) {
        
    } else {
        varXMouse = "x: " + parseInt((mouseX - posEjeX) / escalaCanvas);
        varYMouse = "y: " + - (parseInt((mouseY - posEjeY) / escalaCanvas));
        $("#coords p:first-child").text(varXMouse);
        $("#coords p:last-child").text(varYMouse);
    }
}

function mouseDragged(ctx) {
    if (($('#barra_lateral').is(':hover')) || ($('#barra_inferior').is(':hover'))) {
        
    } else {
        posEjeX += ctx.movementX;
        posEjeY += ctx.movementY;
        inicioXGrid += ctx.movementX;
        inicioYGrid += ctx.movementY;
        redraw();
    }
}

/*function mouseWheel(event) {
  if (event.delta > 0) {
      if ((escalaCanvas <= 5) && (escalaCanvas > 0)) {
          escalaCanvas -= 1;
      } else if (escalaCanvas == 10) {
          escalaCanvas = 5;
      } else if (escalaCanvas > 10) {
          escalaCanvas -= 5;
      }
  } else {
      if ((escalaCanvas <= 5) && (escalaCanvas > 0)) {
          escalaCanvas += 1;
      } else if (escalaCanvas == 10) {
          escalaCanvas = 5;
      } else if (escalaCanvas > 10) {
          escalaCanvas += 5;
      }
  }
    redraw();
}*/


