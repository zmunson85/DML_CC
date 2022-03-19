import React, { useState, useEffect } from 'react';
import {
    addSuperHero,
    useSuperHeros,
    updateSuperHero,
    clearCurrent
} from '../../context/superHero/SuperHeroState';

const initialSuperHero = {
    name: '',
    age: '',
};

const SuperHeroForm = () => {
    const [superHeroState, superHeroDispatch] = useSuperHeros();

    const { current } = superHeroState;

    const [superHero, setSuperHero] = useState(initialSuperHero);

    useEffect(() => {
        if (current !== null) {
            setSuperHero(current);
        } else {
            setSuperHero(initialSuperHero);
        }
    }, [current]);

    const { name, age } = superHero;

    const onChange = (e) =>
        setSuperHero({ ...superHero, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addSuperHero(superHeroDispatch, superHero).then(() =>
                setSuperHero(initialSuperHero)
            );
        } else {
            updateSuperHero(superHeroDispatch, superHero);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent(superHeroDispatch);
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'><i className="fas fa-id-card"></i>
                {current ? ' Edit SuperHero' : ' Add SuperHero'}
            </h2>
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                className='ageInput'
                type='number'
                placeholder='Age'
                name='age'
                value={age}
                onChange={onChange}
                min="0"
            />
            <div>
                <input
                    type='submit'
                    value={current ? 'Update SuperHero' : 'Add SuperHero'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                        Clear
                    </button>
                </div>
            )}
        </form>
    );
};

export default SuperHeroForm;
