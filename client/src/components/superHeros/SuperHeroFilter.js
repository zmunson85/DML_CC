import React from 'react';
import {
    useSuperHeros,
    filterSuperHeros,
    clearFilter
} from '../../context/superHero/SuperHeroState';

const SuperHeroFilter = () => {
    // need the superHero dispatch without state.
    const superHeroDispatch = useSuperHeros()[1];

    const onChange = (e) => {
        if (e.target.value !== '') {
            filterSuperHeros(superHeroDispatch, e.target.value);
        } else {
            clearFilter(superHeroDispatch);
        }
    };

    return (

        <form onSubmit={(e) => e.preventDefault()}>
            <h3 className='text-primary'><i id='searchIcon' className="fas fa-search"></i> Search A SuperHero </h3>
            <input type='text' placeholder='type here...' onChange={onChange} />
        </form>
    );
};

export default SuperHeroFilter;