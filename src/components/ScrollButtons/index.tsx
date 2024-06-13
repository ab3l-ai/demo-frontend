export default function ScrollButtons(props: {
    imageContainerRef: any
}) {
    const scrollLeft = () => {
        if (props.imageContainerRef.current) {
            props.imageContainerRef.current.scrollLeft -= 100;
        }
    };

    const scrollRight = () => {
        if (props.imageContainerRef.current) {
            props.imageContainerRef.current.scrollLeft += 100;
        }
    };

    return (
        <div className="flex items-center justify-center">
            <button
                onClick={scrollLeft}
                className="bg-white text-xs text-black px-2.5 py-1.5 rounded-lg hover:bg-blue-600"
            >
                &lt;
            </button>
            <button
                onClick={scrollRight}
                className="bg-white text-xs text-black ml-4 px-2.5 py-1.5 rounded-lg hover:bg-blue-600"
            >
                &gt;
            </button>

        </div>)
}