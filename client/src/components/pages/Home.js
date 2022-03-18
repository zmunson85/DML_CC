import React from 'react'
import SuperHeros from '../superHeros/SuperHeros'
import SuperHeroForm from '../superHeros/SuperHeroForm'
import SuperHeroFilter from '../superHeros/SuperHeroFilter'
const Home = () => {
    return (
        <div className='grid-2'>
            <div>
                <SuperHeroForm />
            </div>
            <div>
                <SuperHeroFilter />
                <SuperHeros />
            </div>
        </div>
    )
}

export default Home