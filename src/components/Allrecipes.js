import React, {useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';

function AllRecipes(props) {
            
    let [recipe, setRecipe] = useState('');
            
        useEffect(() => {
            getAllRecipes();
        }, []);
            
        function getAllRecipes() {
            fetch(`http://localhost:3000/recipe/${recipe.id}` /* <-- revise this URL */, {
                method: 'GET',
                headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
        .then((res) => res.json())
        .then((resipe) => {
            setRecipe(recipe.recipes[0]);
        });
    }

    return (
        <>
        </>
    )
}


export default AllRecipes;