import './support.css'
import Title from '../UI/Title/Title';
import Button from '../UI/Button/Button';

const Support = () => {
    return (
        <section className='support-container'>
            <Title title='Support' type={['padding-left']} />
            <Button text='Discord' styles={['green']} onClick={() => window.open(import.meta.env.VITE_APP_BASE_DISCORD_URL, '_blank')} />
            <Button text='Github' styles={['green']} onClick={() => window.open(import.meta.env.VITE_APP_BASE_GITHUB_URL, '_blank')} />
        </section>
    )
};

export default Support;
