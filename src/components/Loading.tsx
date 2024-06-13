import React, { useState, useEffect } from 'react';

interface LoadProps {
    inputText: string;
}


const Loading: React.FC<LoadProps> = ({ inputText }) => {
    const [targetText, setTargetText] = useState(inputText);
    const [loadingText, setLoadingText] = useState('Loading');

    useEffect(() => {
        setTargetText(inputText);
    },[inputText]);

    useEffect(() => {
        setLoadingText(inputText);

        const interval = setInterval(() => {
            setLoadingText((prev) => (prev === targetText+'.....' ? targetText : prev + '.'));
        }, 500);

        return () => clearInterval(interval);
    }, [targetText]);

    return (
        <div style={{ fontSize: '24px', textAlign: 'center', margin: 'auto'}}>
        {loadingText}
        </div>
    );
};

export default Loading;