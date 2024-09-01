import './slider.css';
import Slide from '../UI/Slide/Slide';
import { useParams } from 'react-router-dom';
import { useNavigation } from '../../Context/useNavigation';

type Props = {
    items: React.ComponentType[],
    nav_items: string[]
}

const Slider = ({ items, nav_items }: Props) => {
    const { nav } = useParams();
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useNavigation();
    return (
        <article className="slider-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(nav_items)}
        >
            <ul className="slider"
                style={{
                    transform: `translate3d(0, calc(
                        ${nav_items.findIndex(item => item === nav) * -100}% 
                        ${nav_items.findIndex(item => item === nav) >= 1 ? `- ${5 * nav_items.findIndex(item => item === nav)}px` : ''}) , 0)`,
                }}
            >
                {items.map((item: React.ComponentType, index: number) => {
                    return <Slide Path={item} key={index} />
                })}
            </ul>
        </article>
    )
};

export default Slider;
