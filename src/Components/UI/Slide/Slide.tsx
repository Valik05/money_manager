import './slide.css';
import ContentLoader from '../ContentLoader/ContentLoader';
import { Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

type Props = {
    Path: React.ComponentType
}

const Slide = ({ Path }: Props) => {
    const { inView, ref } = useInView();
    const [lazyComp, setLazyComp] = useState<React.ReactNode | null>(null);
    useEffect(() => {
        if (inView && !lazyComp) {
            setLazyComp(<Path />)
            return
        }
        if (!inView && lazyComp) {
            setLazyComp(null)
        }
    }, [inView, Path, lazyComp])
    return (
        <li className="slide-item" ref={ref}>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={Number(lazyComp)} timeout={300} classNames='transition-smooth'>
                    <Suspense fallback={<ContentLoader />}>
                        {lazyComp || <ContentLoader />}
                    </Suspense>
                </CSSTransition>
            </SwitchTransition>
        </li>
    )
};

export default Slide;
