import { useState, useEffect } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { PokemonInfo } from '../../api/types'
import { getBasicPokemonByNameId } from '../../api/pokemon'
import HomeStyle from '../../styles/Home.style'
import TextField from '../../components/TextField'
import TextFieldStyle from '../../styles/TextField.style'
import Card from '../../components/Card'
import TextButton from '../../components/TextButton'
import Loading from '../../components/Loading'
import { Title } from '../../components/Title';

interface Props {
  navigation: any; // Add type for navigation prop
}

const Home = ({ navigation }: Props) => {


  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const [listPokemon, setListPokemon] = useState<Array<PokemonInfo>>([]);
  const [listFilteredPokemon, setListFilteredPokemon] = useState<Array<PokemonInfo>>([]);


  function handleApplyFilter() {
    if (filter.trim() === "") {
      setListFilteredPokemon(listPokemon);
    } else {
      const filteredList = listPokemon.filter(pokemon => (pokemon.id === filter) || pokemon.name.startsWith(filter.toLowerCase()));
      setListFilteredPokemon(filteredList);
    }
  }
  useEffect(() => {
    const fetchPokemonSprites = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const data = await response.json();

        const pokemonList = data.results;
        const newPokemon: Array<PokemonInfo> = []
        for (const pokemon of pokemonList) {
          const pokemonInfo = await getBasicPokemonByNameId(pokemon.name);
          newPokemon.push(pokemonInfo);
        }

        console.log(newPokemon);
        setListPokemon(newPokemon)
        setListFilteredPokemon(newPokemon)
        setLoading(false)

      } catch (error) {
        console.error('Erro ao obter sprites dos Pokémon:', error);
      }
    };
    fetchPokemonSprites()
  }, []);


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
            name={item.renderName}
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
        <TextField
          style={TextFieldStyle.TextField}
          placeHolder='Buscar..'
          onChangeText={newText => setFilter(newText)}
          defaultValue={filter}
        />
        <TextButton
          style={
            {
              backgroundColor: "white",
              width: 40,
              height: 40,
              borderRadius: 60,
              marginRight: 10
            }
          }
          label='#'
          onClick={() => handleApplyFilter()}
        />
      </View>

      <View style={HomeStyle.subContainer}>
        {listFilteredPokemon.length > 0 && renderCardRows(listFilteredPokemon)}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
          {(listFilteredPokemon.length === 0) &&
            <>
              <Image style={{ marginTop: 5, width: 300, height: 200 }} source={require("../../../assets/404.png")} />
              <Title titleColor='#1D1D1D' titleText='Oops! Nenhum pokemon encontrado.' />
            </>
          }

        </View>
      </View>
    </View>
  )
}

export default Home