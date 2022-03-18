import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SuperHeroItem from './SuperHeroItem';
import Spinner from '../layout/Spinner';
import { useSuperHeros, getSuperHeros } from '../../context/superHero/SuperHeroState';

const SuperHeros = () => {
    const [superHeroState, superHeroDispatch] = useSuperHeros();

    const { superHeros, filtered } = superHeroState;

    useEffect(() => {
        getSuperHeros(superHeroDispatch);
    }, [superHeroDispatch]);

    if (superHeros !== null && superHeros.length === 0) {
        return <h4>Please add a superHero</h4>;
    }

    return (
        <Fragment>
            {superHeros !== null ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map((superHero) => (
                            <CSSTransition
                                key={superHero._id}
                                timeout={500}
                                classNames='item'
                            >
                                <SuperHeroItem superHero={superHero} />
                            </CSSTransition>
                        ))
                        : superHeros.map((superHero) => {
                            return (
                                <CSSTransition
                                    key={superHero._id}
                                    timeout={500}
                                    classNames='item'
                                >
                                    <SuperHeroItem superHero={superHero} />
                                </CSSTransition>
                            );
                        })}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

export default SuperHeros;
