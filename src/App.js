import React,{useEffect,useState} from 'react';
import PokemonCard from './component/PokemonCard';
import {getPokemon,getPokemonRecord} from './component/pokemon';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const App = () => {
  const [data,setData]=useState([]);
  const [prevUrl,setPrevUrl] = useState('');
  const [nextUrl,setNextUrl] = useState('');
  const [loading,setLoading] =useState(true);
  const initialUrl ='https://pokeapi.co/api/v2/pokemon?offset=5&limit=5';

  useEffect(()=>{
    async function getData(){
      const res= await getPokemon(initialUrl);
      
      setPrevUrl(res.previous);
      setNextUrl(res.next);
      await loadingPokemon(res.results);
      setLoading(false);
      
    }
  
    getData();
  },[]);
  const prev =async () =>{
    if(!prevUrl) return;
    setLoading(true);
    let data = await getPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }
  const next =async () =>{
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }
  const loadingPokemon = async data =>{
    let pokemonData=await Promise.all(
      data.map(async pokemon =>{
      let pokeRecord =await getPokemonRecord(pokemon.url);
      return pokeRecord;
    }));
    setData(pokemonData);
  }
  

  return (
    <div>
    {
      loading?<h1>Loading...</h1>:(
        <>
          <center><h1 className="header">Pokedex</h1></center>
          <div>
            <button onClick={prev} className="btn prev btn-primary">Prev</button>
            <button onClick={next} className="btn next btn-primary">Next</button>
          </div>

      <div className="grid">
        {
          data.map((pokemon,i)=>{
            return <PokemonCard key={i} pokemon={pokemon}/>
          })
        }

      </div>
      </>
      )
    
     }</div>

  )
}
export default App;