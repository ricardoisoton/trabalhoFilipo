#include <iostream>
#include <vector>
#include <unordered_map>
#include <set>
using namespace std;

// Data structure to store a graph edge
struct Edge {
	int src, dest;
};

class Graph
{
public:
	// a vector of vectors to represent an adjacency list
	vector<vector<int>> adjList;

	// Constructor
	Graph(vector<Edge> const &edges, int n)
	{
		// resize the vector to hold `n` elements of type `vector<int>`
		adjList.resize(n);

		// add edges to the undirected graph
		for (Edge edge: edges)
		{
			int src = edge.src;
			int dest = edge.dest;

			adjList[src].push_back(dest);
			adjList[dest].push_back(src);
		}
	}
};

// Add more colors for graphs with many more vertices
string color[] =
{
	"", "BLUE", "GREEN", "RED"
};

// Function to assign colors to vertices of a graph
void colorGraph(Graph const &graph, int n)
{
	// keep track of the color assigned to each vertex
	unordered_map<int, int> result;

	// assign a color to vertex one by one
	for (int u = 0; u < n; u++)
	{
		// set to store the color of adjacent vertices of `u`
		set<int> assigned;

		// check colors of adjacent vertices of `u` and store them in a set
		for (int i: graph.adjList[u])
		{
			if (result[i]) {
				assigned.insert(result[i]);
			}
		}

		// check for the first free color
		int color = 1;
		for (auto &c: assigned )
		{
			if (color != c) {
				break;
			}
			color++;
		}

		// assign vertex `u` the first available color
		result[u] = color;
	}

	for (int v = 0; v < n; v++)
	{
		cout << "The color assigned to vertex " << v << " is "
			 << color[result[v]] << endl;
	}
}

// Greedy coloring of a graph
int main()
{
	// vector of graph edges as per the above diagram
	vector<Edge> edges = {
		{0, 1}, {1, 2}, {1, 4}, {2, 4}, {2, 3}, {4, 5}, {4, 6}, {5, 6}
	};

	// total number of nodes in the graph (labelled from 0 to 5)
	int n = 7;

	// build a graph from the given edges
	Graph graph(edges, n);

	// color graph using the greedy algorithm
	colorGraph(graph, n);

	return 0;
}