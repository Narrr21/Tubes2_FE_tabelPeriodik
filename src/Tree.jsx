import Tree from 'react-d3-tree';
import { useState, useEffect } from 'react';
import Loading from './loading.jsx';

const renderNode = ({ nodeDatum, toggleNode }) => {
    const type = nodeDatum.attributes;
    const yOffset = type === 'recipe' ? 60 : 0;

    if (type === 'element') {
        return (
            <g onClick={toggleNode} transform={`translate(0, ${yOffset})`}>
                <rect width={100} height={40} x={-50} y={-20} fill="lightblue" stroke="steelblue" rx={10} />
                <text fill="black" x={0} y={5} textAnchor="middle" style={{ fontWeight: 'lighter' }}>
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

export default function MyTree({ category, search, name, left, right }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var url;
        setLoading(true);
        if (search == "Bidirectional") {
            url = `http://localhost:8080/${category}/${search}/${name}?left=${left}&right=${right}`;
        } else {
            url = `http://localhost:8080/${category}/${search}/${name}`;
        }

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
    }, [category, search]); // Refetch when either changes

    if (loading) return <Loading />;
    if (!data) return <div>Error loading data.</div>;

    return (
        <div style={{ width: '100vw'}}>
            <Tree
                data={data}
                orientation="vertical"
                translate={{ x: 800, y: 100 }}
                nodeSize={{ x: 140, y: 60 }}
                renderCustomNodeElement={renderNode}
                collapsible={false}
                zoom={0.5}
                pathFunc="elbow"
                separation={{ siblings: 1, nonSiblings: 1.2 }}
            />
        </div>
    );
}
