// Função para colorir o grafo
function colorGraph(numVertices, connections) {
  const colors = ['vermelho', 'azul', 'verde']; // Lista de cores disponíveis
  const coloredVertices = {}; // Armazena as cores atribuídas aos vértices

  // Itera sobre cada vértice
  for (let i = 0; i < numVertices; i++) {
    const vertex = String.fromCharCode(65 + i); // Converte o índice para o caractere correspondente (A, B, C, ...)
    const neighborColors = []; // Cores dos vizinhos

    // Obtém as cores dos vértices vizinhos
    for (let j = 0; j < connections.length; j++) {
      if (connections[j].vertex === vertex) {
        const neighbors = connections[j].neighbors;
        for (let k = 0; k < neighbors.length; k++) {
          const neighbor = neighbors[k];
          if (coloredVertices[neighbor]) {
            neighborColors.push(coloredVertices[neighbor]);
          }
        }
        break;
      }
    }

    // Atribui a cor ao vértice que não está sendo usada pelos vizinhos
    for (let color of colors) {
      if (!neighborColors.includes(color)) {
        coloredVertices[vertex] = color;
        break;
      }
    }
  }
  return coloredVertices;
}

// Definição do número de vértices e conexões
const numVertices = 7;
const connections = [
  { vertex: 'A', neighbors: ['B'] },
  { vertex: 'B', neighbors: ['C', 'E'] },
  { vertex: 'C', neighbors: ['D', 'E'] },
  { vertex: 'D', neighbors: ['C'] },
  { vertex: 'E', neighbors: ['B', 'C', 'F', 'G'] },
  { vertex: 'F', neighbors: ['E', 'G'] },
  { vertex: 'G', neighbors: ['E', 'F'] }
];

// Chamada da função e obtenção das cores atribuídas aos vértices
const coloredVertices = colorGraph(numVertices, connections);

// Atualizar as cores dos vértices com base nos resultados
for (let vertex in coloredVertices) {
  const color = coloredVertices[vertex];
  const vertexElement = document.getElementById(`vertex-${vertex}`);
  vertexElement.classList.add(`color-${color}`);
}
  // Definir posições fixas para os nós
  const vertexPositions = {
    'A': { x: 100, y: 100 },
    'B': { x: 200, y: 100 },
    'C': { x: 400, y: 100 },
    'D': { x: 500, y: 100 },
    'E': { x: 300, y: 200 },
    'F': { x: 200, y: 300 },
    'G': { x: 400, y: 300 }
  };

  // Posicionar os nós nos locais definidos
const vertexElements = document.querySelectorAll('.vertex');

vertexElements.forEach((vertexElement) => {
  const vertexId = vertexElement.id.replace('vertex-', '');
  const position = vertexPositions[vertexId];

  vertexElement.style.left = position.x + 'px';
  vertexElement.style.top = position.y + 'px';
});

// Função para desenhar as arestas de conexão
function drawConnections(connections) {
  const svg = document.getElementById('connections-svg');

  for (let connection of connections) {
    const { vertex, neighbors } = connection;
    const startVertex = document.getElementById(`vertex-${vertex}`);
    const startX = startVertex.offsetLeft + startVertex.offsetWidth / 2;
    const startY = startVertex.offsetTop + startVertex.offsetHeight / 2;

    for (let neighbor of neighbors) {
      const endVertex = document.getElementById(`vertex-${neighbor}`);
      const endX = endVertex.offsetLeft + endVertex.offsetWidth / 2;
      const endY = endVertex.offsetTop + endVertex.offsetHeight / 2;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', startX);
      line.setAttribute('y1', startY);
      line.setAttribute('x2', endX);
      line.setAttribute('y2', endY);
      line.setAttribute('stroke', 'black');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
    }
  }
}
// Desenhar as arestas de conexão
drawConnections(connections);