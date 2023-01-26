
const ShimmerCard = () => {
    return (
        <div className="shimmer-card">
            <div></div>
            <div></div>
            <div></div>
            <div className="card-footer">
                <div></div>
                <div>•</div>
                <div></div>
                <div>•</div>
                <div></div>
            </div>
        </div>
    )
}

const Shimmer = () => {
    return (
        <div className="body">
            {
                Array(25).fill('').map((ele, ind) => {
                    return <ShimmerCard key={ind} />
                })
            }
        </div>
    )
}

export default Shimmer;