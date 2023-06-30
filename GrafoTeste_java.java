// Este é um exemplo simples de implementação de grafo representado por lista
// de adjacências

import java.util.List;
import java.util.ArrayList;

public class Grafo {
    public class Vertice {
        String nome;
        List<Aresta> adj;

        Vertice(String nome) {
            this.nome = nome;
            this.adj = new ArrayList<Aresta>();
        }

        void addAdj(Aresta e) {
            adj.add(e);
        }
    }

    public class Aresta {
        Vertice origem;
        Vertice destino;

        Aresta(Vertice origem, Vertice destino) {
            this.origem = origem;
            this.destino = destino;
        }
    }

    List<Vertice> vertices;
    List<Aresta> arestas;

    /*
     * public Grafo() {
     * vertices = new ArrayList<Vertice>();
     * arestas = new ArrayList<Aresta>();
     * }
     */

    public Grafo(ArrayList<Aresta> arestas, int n) {
        arestas = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            arestas.add(new ArrayList<>());
        }

        // adiciona arestas ao grafo não direcionado
        for (Aresta a : arestas) {
            int origem = a.source;
            int destino = a.dest;

            arestas.get(origem).add(destino);
            arestas.get(destino).add(origem);
        }
    }

    Vertice addVertice(String nome) {
        Vertice v = new Vertice(nome);
        vertices.add(v);
        return v;
    }

    Aresta addAresta(Vertice origem, Vertice destino) {
        Aresta e = new Aresta(origem, destino);
        origem.addAdj(e);
        arestas.add(e);
        return e;
    }

    public String toString() {
        String r = "";
        for (Vertice u : vertices) {
            r += u.nome + " -> ";
            for (Aresta e : u.adj) {
                Vertice v = e.destino;
                r += v.nome + ", ";
            }
            r += "\n";
        }
        return r;
    }

    /*
     * public static void main(String[] args) {
     * Grafo g = new Grafo();
     * Vertice s = g.addVertice("s");
     * Vertice t = g.addVertice("t");
     * Vertice y = g.addVertice("y");
     * Aresta st = g.addAresta(s, t);
     * Aresta sy = g.addAresta(s, y);
     * Aresta ty = g.addAresta(t, y);
     * Aresta yt = g.addAresta(y, t);
     * System.out.println(g);
     * }
     */

}

class Main {
    // Adiciona mais cores para gráficos com muito mais vértices
    private static String[] color = {
            "", "BLUE", "GREEN", "RED"
    };

    // Função para atribuir cores aos vértices de um gráfico
    public static void colorGraph(Grafo grafo, int n) {
        // acompanha a cor atribuída a cada vértice
        Map<Integer, Integer> result = new HashMap<>();

        // atribui uma cor ao vértice um por um
        for (int u = 0; u < n; u++) {
            // definido para armazenar a cor dos vértices adjacentes de `u`
            Set<Integer> assigned = new TreeSet<>();

            // verifica as cores dos vértices adjacentes de `u` e armazena-os em um conjunto
            for (int i : grafo.arestas.get(u).origem()) {
                if (result.containsKey(i)) {
                    assigned.add(result.get(i));
                }
            }

            // verifica a primeira cor livre
            int color = 1;
            for (Integer c : assigned) {
                if (color != c) {
                    break;
                }
                color++;
            }

            // atribui ao vértice `u` a primeira cor disponível
            result.put(u, color);
        }

        for (int v = 0; v < n; v++) {
            System.out.println("The color assigned to vertex " + v + " is "
                    + color[result.get(v)]);
        }
    }

    public static void main(String[] args) {
        Grafo g = new Grafo();
        Vertice s = g.addVertice("s");
        Vertice t = g.addVertice("t");
        Vertice y = g.addVertice("y");
        Aresta st = g.addAresta(s, t);
        Aresta sy = g.addAresta(s, y);
        Aresta ty = g.addAresta(t, y);
        Aresta yt = g.addAresta(y, t);
        System.out.println(g);

        // número total de nós no gráfico (rotulado de 0 a 5)
        int n = 3;

        // gráfico de cores usando o algoritmo gananciosa
        colorGraph(g, n);
    }
}
