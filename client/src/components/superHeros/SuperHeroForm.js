import React, { useState, useEffect } from 'react';
import {
    addSuperHero,
    useSuperHeros,
    updateSuperHero,
    clearCurrent
} from '../../context/superHero/SuperHeroState';

const initialSuperHero = {
    name: '',
    humanName: '',
    homeTown: '',
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

    const { name, humanName, homeTown, age } = superHero;

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
                required
            />
            <input
                type='text'
                placeholder='Human Name'
                name='humanName'
                value={humanName}
                onChange={onChange}
                required
            />
            <input
                type='text'
                placeholder='Home Town'
                name='homeTown'
                value={homeTown}
                onChange={onChange}
                required
            />
            <input
                className='ageInput'
                type='number'
                placeholder='Age'
                name='age'
                value={age}
                onChange={onChange}
                min="0"
                required
            />
            <div>
                <input
                    type='submit'
                    value={current ? 'Update SuperHero' : 'Add SuperHero'}
                    className='btn btn-primary btn-block'
                    required
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
