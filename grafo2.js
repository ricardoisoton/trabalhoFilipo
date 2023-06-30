// Definição do número de vértices
const numVertices = 7;
const connections = [
  { vertex: 'A', neighbors: ['B'] },
  { vertex: 'B', neighbors: ['A', 'C', 'E'] },
  { vertex: 'C', neighbors: ['B', 'D', 'E'] },
  { vertex: 'D', neighbors: ['C'] },
  { vertex: 'E', neighbors: ['B', 'C', 'F', 'G'] },
  { vertex: 'F', neighbors: ['E', 'G'] },
  { vertex: 'G', neighbors: ['E', 'F'] }
];

// Definição das posições dos vértices
const vertexPositions = [
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 400, y: 100 },
  { x: 500, y: 100 },
  { x: 300, y: 200 },
  { x: 200, y: 300 },
  { x: 400, y: 300 }
];

// Função para criar e posicionar os vértices na tela
function createVertices() {
  const graphContainer = document.getElementById('graph-container');

  for (let i = 0; i < numVertices; i++) {
    const vertex = document.createElement('div');
    vertex.className = 'vertex';
    vertex.textContent = String.fromCharCode(65 + i); // Converte o índice para o caractere correspondente (A, B, C, ...)
    
    // Obtém as coordenadas do vértice na lista de posições
    const position = vertexPositions[i];

    vertex.style.left = position.x + 'px';
    vertex.style.top = position.y + 'px';

    graphContainer.appendChild(vertex);
  }
}

// Chamada da função para criar os vértices
createVertices();
