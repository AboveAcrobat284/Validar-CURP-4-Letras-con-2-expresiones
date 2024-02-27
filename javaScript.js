import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function validarYMostrarjavaScript() {
    var cadena = document.getElementById('cadenaInput2').value.toUpperCase();

    if (cadena.length >= 4 && /^(G|g)[UNCunc]{3}$/.test(cadena)) {
        document.getElementById('resultado2').innerText = cadena + ' -> Cadena Valida.';
        generarAutomatajavaScript(cadena);
    } else {
        document.getElementById('resultado2').innerText = cadena + ' -> Cadena no valida.';
        d3.select(".er svg").remove();
    }
}

export function generarAutomatajavaScript(cadena) {
    d3.select(".er svg").remove();
    // Datos del automata
    var estados = [];
    var transiciones = [];
    var paddingLeft = 400; // Padding a la izquierda

    for (var i = 0; i <= cadena.length; i++) {
        estados.push("q" + i);
        if (i < cadena.length) {
            transiciones.push({
                source: "q" + i,
                target: "q" + (i + 1),
                label: cadena[i]
            });
        }
    }

    // Crear el contenedor SVG
    var svg = d3.select(".er").append("svg")
        .attr("width", 800 + paddingLeft) // Aumentar el ancho para acomodar el padding
        .attr("height", 150); 

    // Crear nodos (estados)
    var nodes = svg.selectAll("circle")
        .data(estados)
        .enter().append("circle")
        .attr("cx", function(d, i) { return i * 80 + 40 + paddingLeft; }) // Ajustar el espaciado incluyendo el padding
        .attr("cy", 80)
        .attr("r", 20)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "#FFF68D");

    // Crear etiquetas para los nodos
    svg.selectAll("text")
        .data(estados)
        .enter().append("text")
        .attr("x", function(d, i) { return i * 80 + 40 + paddingLeft; })
        .attr("y", 85)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(function(d) { return d; });

    // Crear enlaces (transiciones)
    var links = svg.selectAll(".link")
        .data(transiciones)
        .enter().append("line")
        .attr("x1", function(d) { return (estados.indexOf(d.source) * 80 + 40) + 20 + paddingLeft; }) 
        .attr("y1", 80)
        .attr("x2", function(d) { return (estados.indexOf(d.target) * 80 + 40) - 20 + paddingLeft; }) 
        .attr("y2", 80)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");

    // Etiquetas para las transiciones
    svg.selectAll("text.linkLabel")
        .data(transiciones)
        .enter().append("text")
        .attr("class", "linkLabel")
        .attr("x", function(d) { return (estados.indexOf(d.source) * 80 + estados.indexOf(d.target) * 80) / 2 + 40 + paddingLeft; })
        .attr("y", 75) // Ajustar la posición vertical
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(function(d) { return d.label; });

    // A continuación, agrega las modificaciones para el estado inicial (triángulo), estado final (doble círculo) y la definición de la flecha,
    // asegurándote de ajustar las coordenadas x agregando el paddingLeft donde sea necesario.

    console.log('Visualización del automata para la segunda ER actualizada con padding left.');
}
