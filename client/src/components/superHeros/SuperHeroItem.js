import React from 'react';
import PropTypes from 'prop-types';
import {
    useSuperHeros,
    deleteSuperHero,
    setCurrent,
    clearCurrent
} from '../../context/superHero/SuperHeroState';

const SuperHeroItem = ({ superHero }) => {
    // we just need the superHero dispatch without state.
    const superHeroDispatch = useSuperHeros()[1];

    const { _id, name, age } = superHero;

    const onDelete = () => {
        deleteSuperHero(superHeroDispatch, _id);
        clearCurrent(superHeroDispatch);
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
            </h3>
            <ul className='list'>
                {age && (

                    <li>
                        <i className='fa fa-info-circle' /> Age: {age}
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
                <button className='btn btn-primary btn-sm' onClick={(superHero) => console.log('DetailView')}>
                    DetailView
                </button>
            </p>
        </div>
    );
};

SuperHeroItem.propTypes = {
    superHero: PropTypes.object.isRequired
};

export default SuperHeroItem;