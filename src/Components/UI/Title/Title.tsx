import './title.css';
import classNames from 'classnames';

type Props = {
    title: string,
    type: string[]
}


const Title = ({ title, type }: Props) => {
    return (
        <div className={classNames('title', type)}>
            <span>{title}</span>
        </div>
    )
};

export default Title;
