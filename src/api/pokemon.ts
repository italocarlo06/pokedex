import axios from "axios";
import { PokemonInfo, getPokemonTypeInfo, getStats } from "./types";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
});

export async function getBasicPokemonByNameId(idOrName: string): Promise<PokemonInfo> {
  try {
    const { data } = await api.get(idOrName);
    console.log(data.abilities)
    const pokemonInfo = {
      id: data.id,
      name: data.forms[0].name,
      renderName:
        data.forms[0].name.charAt(0).toUpperCase() +
        data.forms[0].name.slice(1),
      url: "https://pokeapi.co/api/v2/pokemon/" + data.forms[0].name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      typeColor: getPokemonTypeInfo(data.types[0].type.name).cor,
      wheight: data.weight / 10,
      height: data.height / 10,
      mainType: getPokemonTypeInfo(data.types[0].type.name),
      secondaryType:
        data.types[1] != null
          ? getPokemonTypeInfo(data.types[1].type.name)
          : undefined,
      abilities: data.abilities.map((item: any) => item.ability.name),
      stats: getStats(data.stats)
    };
    return pokemonInfo;
  } catch (error) {
    return {} as PokemonInfo;
  }

};