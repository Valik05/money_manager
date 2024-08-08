import './contentLoader.css';

const ContentLoader = () => {
    return (
        <div className='content-loader-container'>
            <div className="title-loader"><div className="background-opacity"></div></div>
            <div className="money"><div className="background-opacity"></div></div>
            <div className="title-loader"><div className="background-opacity"></div></div>
            <ul className="recent-transactions">
                <li className="add-operation"><div className="background-opacity"></div></li>
                <li className="add-operation"><div className="background-opacity"></div></li>
                <li className="add-operation"><div className="background-opacity"></div></li>
                <li className="add-operation"><div className="background-opacity"></div></li>
            </ul>
        </div>
    )
};

export default ContentLoader;
