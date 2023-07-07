import { useState, useEffect } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import HomeStyle from '../../styles/Home.style'
import TextField from '../../components/TextField'
import TextFieldStyle from '../../styles/TextField.style'
import Card from '../../components/Card'
import TextButton from '../../components/TextButton'
import Loading from '../../components/Loading'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokemonInfo, getPokemonTypeInfo } from '../../api/types'
import { getBasicPokemonByNameId } from '../../api/pokemon'

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

  const [listPokemon, setListPokemon] = useState<Array<PokemonInfo>>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchPokemonSprites = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const data = await response.json();

        const pokemonList = data.results;
        const newPokemon: Array<PokemonInfo> = []
        let id_pokemon: number = 0
        for (const pokemon of pokemonList) {
          id_pokemon++;
          const pokemonInfo = await getBasicPokemonByNameId(pokemon.name);
          newPokemon.push(pokemonInfo);
        }
        setListPokemon(newPokemon)
        setLoading(false)

      } catch (error) {
        console.error('Erro ao obter sprites dos Pokémon:', error);
      }
    };
    fetchPokemonSprites()
  }, [])

  const renderCardRows = (pokemons: Array<PokemonInfo>) => {

    return (<FlatList
      numColumns={3}
      data={pokemons}
      keyExtractor={(pokemon) => pokemon.id}
      renderItem={({ item, index }) => {
        return (
          <Card 
            onPress={() => { navigation.navigate('Detalhes', { name: item.name }) }} 
            key={index} 
            code={item.id} 
            name={item.name} 
            url={item.sprite} 
            color={item.mainType.cor} 
          />
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