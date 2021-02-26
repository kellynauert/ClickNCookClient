import React, {useEffect, useState} from 'react';

function AllRecipes(props) {
            
    let [recipe, setRecipe] = useState('');
            
        useEffect(() => {
            getAllRecipes();
        }, []);
            
        function getAllRecipes() {
            fetch(`http://localhost:3000/recipe/`, {
                method: 'GET',
                headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            setRecipe(res.recipes);
        });
    }

    return (
        <>
        {/* Some stuff */}
        </>
    )
}


export default AllRecipes;