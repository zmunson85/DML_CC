import React from 'react';

import PropTypes from 'prop-types';

import {
    useSuperHeros,
    deleteSuperHero,
    setCurrent,
    clearCurrent
} from '../../context/superHero/SuperHeroState';

const SuperHeroItem = ({ superHero }) => {

    const superHeroDispatch = useSuperHeros()[1];

    const { _id, name, age } = superHero;

    const onDelete = () => {
        alert('Are you sure you want to delete this entry? ');
        deleteSuperHero(superHeroDispatch, _id);
        clearCurrent(superHeroDispatch);
    };

    const clickHandler = (props) => {
        alert(`This super hero goes by " ${superHero.humanName}", with "${superHero.homeTown}" listed as home town.`)

    }
    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
            </h3>
            <ul className='list'>
                {age && (

                    <li>
                        Age: {age}
                    </li>
                )}
            </ul>
            <p>
                <button
                    className='btn btn-dark btn-sm'
                    onClick={() => setCurrent(superHeroDispatch, superHero)}
                >
                    Edit
                </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
                </button>
                <button className='btn btn-primary btn-sm' onClick={clickHandler}>
                    <i id='infoIcon' className='fa fa-info-circle' />
                </button>
            </p>
        </div>
    );
};

SuperHeroItem.propTypes = {
    superHero: PropTypes.object.isRequired
};

export default SuperHeroItem;