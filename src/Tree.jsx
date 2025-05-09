import Tree from 'react-d3-tree';
import { useState, useEffect } from 'react';
import Loading from './loading.jsx';

const renderNode = ({ nodeDatum, toggleNode }) => {
    const type = nodeDatum.attributes;
    const yOffset = type === 'recipe' ? 60 : 0;

    if (type === 'element') {
        return (
            <g onClick={toggleNode} transform={`translate(0, ${yOffset})`}>
                <rect width={250} height={80} x={-125} y={-40} fill="lightblue" stroke="steelblue" rx={10} />
                <text fill="black" x={0} y={12} textAnchor="middle" fontWeight={'lighter'}>
                    {nodeDatum.name}
                </text>
            </g>
        );
    } else if (type === 'recipe') {
        return (
            <g onClick={toggleNode} transform={`translate(0, ${yOffset})`}>
                <circle r={5} stroke="black" />
                <text fill="black" x={0} y={5} textAnchor="middle">
                    {nodeDatum.name}
                </text>
            </g>
        );
    }

    // fallback (optional)
    return (
        <g onClick={toggleNode}>
            <text fill="black" x={0} y={5}>
                {nodeDatum.name}
            </text>
        </g>
    );
};

export default function MyTree({ search, name, recipeAmount, left, right, live }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var url;
        setLoading(true);
        url = `http://localhost:8080/${search}/${name}?recipeAmount=${recipeAmount}`;
        if (search === "Bidirectional") {
            url += `&left=${left}&right=${right}`;
        } 
        if (!live) {
            fetch(url)
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setLoading(false);
            });
        } else {
            url = `http://localhost:8080/live-${search}/${name}?recipeAmount=${recipeAmount}`;
            if (search === "Bidirectional") {
                url += `&left=${left}&right=${right}`;
            } 
            const sse = new EventSource(url);
            sse.onmessage = (e) => {
                const payload = JSON.parse(e.data);
                const exportData = payload.depth;
                setData(exportData);
                setLoading(false);
              };

            sse.onerror = (e) => {
                console.error('SSE error:', e);
                sse.close(); // Close the connection on error
            }

            return () => {
                sse.close(); // Clean up the SSE connection on component unmount
            };
        }
    }, [recipeAmount, search]); // Refetch when either changes

    if (loading) return <Loading />;
    if (!data) return <div>Error loading data.</div>;

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Tree
                data={data}
                orientation="vertical"
                translate={{ x: 800, y: 100 }}
                nodeSize={{ x: 140, y: 60 }}
                renderCustomNodeElement={renderNode}
                collapsible={false}
                zoom={0.5}
                pathFunc="elbow"
                separation={{ siblings: 2, nonSiblings: 2.4 }}
            />
        </div>
    );
}
