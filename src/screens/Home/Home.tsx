import { useState, useEffect } from 'react'
import { View, Text, Image, Button, ScrollView, FlatList } from 'react-native'
import HomeStyle from '../../styles/Home.style'
import TextField from '../../components/TextField'
import TextFieldStyle from '../../styles/TextField.style'
import Card from '../../components/Card'
import Props from '../Props/Props'
import TextButton from '../../components/TextButton'
import Loading from '../../components/Loading'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getPokemonTypeInfo } from '../../api/types'

interface Props {
  navigation: any; // Add type for navigation prop
}

const Home = ({ navigation }: Props) => {

  const { Navigator, Screen } = createNativeStackNavigator()
  interface Pokemon {
    code: string,
    name: string,
    url: string,
    type: Array<string>,
    color: string
  }

  interface Type {
    name: string
  }
  interface Types {
    slot: number,
    type: Type
  }

  const [listPokemon, setListPokemon] = useState<Array<Pokemon>>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchPokemonSprites = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const data = await response.json();

        const pokemonList = data.results;
        const newPokemon: Array<Pokemon> = []
        let id_pokemon: number = 0
        for (const pokemon of pokemonList) {
          id_pokemon++
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          const type: Array<string> = pokemonData.types.map((value: Types) => {
            const newArray: Array<string> = []

            newArray.push(value.type.name)
            return newArray
          })

          const name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
          const pokemonCard: Pokemon = {
            code: `#${id_pokemon}`,
            name: name,
            url: pokemonData.sprites.other['official-artwork'].front_default,
            color: getPokemonTypeInfo(pokemonData.types[0].type.name).cor,
            type: type
          }

          newPokemon.push(pokemonCard)
        }

        setListPokemon(newPokemon)
        setLoading(false)

      } catch (error) {
        console.error('Erro ao obter sprites dos Pokémon:', error);
      }
    };
    fetchPokemonSprites()
  }, [])

  const renderCardRows = (pokemons: Array<Pokemon>) => {

    return (<FlatList
      numColumns={3}
      data={pokemons}
      keyExtractor={(pokemon) => pokemon.code}
      renderItem={({ item, index }) => {
        return (
          <Card onPress={() => { navigation.navigate('Detalhes', { name: item.name }) }} key={index} code={item.code} name={item.name} url={item.url} color={item.color} />
        );
      }}
    />);
  };

  if (loading) {
    return <Loading />
  }
  return (
    <View style={HomeStyle.container}>
      <View style={{ alignContent: "center", flexDirection: "row", marginTop: 50, marginLeft: 10 }}>
        <Image style={{ marginTop: 5, tintColor: "white" }} source={require("../../../assets/Pokeball.png")} />
        <Text style={{ marginLeft: 10, fontSize: 40, fontWeight: "bold", color: "white" }}>PokéDex</Text>
      </View>


      <View style={HomeStyle.header}>
        <TextField style={TextFieldStyle.TextField} placeHolder='Buscar..' />
        <TextButton style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 60, marginRight: 10 }} label='#' onClick={() => { }} />
      </View>

      <View style={HomeStyle.subContainer}>
        {renderCardRows(listPokemon)}
      </View>
    </View>
  )
}

export default Home