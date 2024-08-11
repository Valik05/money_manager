import './slider.css';
import Slide from '../UI/Slide/Slide';
import { useParams } from 'react-router-dom';

type Props = {
    items: React.ComponentType[],
    nav_items: string[]
}

const Slider = ({ items, nav_items }: Props) => {
    const { nav } = useParams();
    return (
        <div className='slider-container'>
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
        </div>
    )
};

export default Slider;
