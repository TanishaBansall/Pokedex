async function getPokemon(url){
    return new Promise((resolve,reject)=>{
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            return resolve(data);
        })
    })
}
async function getPokemonRecord(url){
    return new Promise((resolve,reject)=>{
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            return resolve(data);
        })
    })
}
export  {getPokemon,getPokemonRecord};