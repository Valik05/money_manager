import './title.css';
import classNames from 'classnames';

type Props = {
    title: string,
    type: string[]
}


const Title = ({ title, type }: Props) => {
    return (
        <h2 className={classNames('title', type)}>
            <span>{title}</span>
        </h2>
    )
};

export default Title;
