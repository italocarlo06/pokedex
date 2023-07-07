import { Image, ScrollView, View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import Loading from "../../components/Loading";

import styles from "./styles";
import { PokemonInfo } from "../../api/types";
import { getBasicPokemonByNameId } from "../../api/pokemon";
import { Chip } from "../../components/Chip";
import { Title } from "../../components/Title";
import { MainStat } from "../../components/MainStat";
import { Divider } from "../../components/Divider";
import { BaseStat } from "../../components/BaseStat";

interface DetailsProps {
  navigation: any;
  route: any;
}

const Details = ({ route, navigation }: DetailsProps) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>();
  const [pokemonName, setPokemonName] = useState(route.params.name);

  useEffect(() => {
    const fetchPokemonData = async (nameOrId: string) => {
      const pokemonData = await getBasicPokemonByNameId(nameOrId.toLowerCase());
      setPokemonInfo(pokemonData);
    }
    fetchPokemonData(pokemonName);

  }, [pokemonName]);


  if (!pokemonInfo?.mainType) return <Loading />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: pokemonInfo.mainType.cor }}>
      <View style={styles.headerInfo}>

        <View style={styles.headerTitleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={"arrowleft"} size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{pokemonName}</Text>
        </View>
        <Text style={styles.pokemonId}>#{pokemonInfo.id}</Text>

      </View>

      <Image style={styles.imageBackGround} source={require("../../../assets/Pokeball-White.png")} />

      <View style={styles.navigationContainer}>
        <Image
          source={{ uri: pokemonInfo.sprite }}
          style={styles.pokemonImage}
        />
      </View>
      <View style={styles.pokemonInfoContainer}>
        <View style={styles.typeContainer}>
          <Chip
            name={pokemonInfo.mainType.nome}
            color={pokemonInfo.mainType.cor}
          />
          {
            pokemonInfo.secondaryType &&
            <Chip
              name={pokemonInfo.secondaryType.nome}
              color={pokemonInfo.secondaryType.cor}
            />
          }
        </View>

        <View style={styles.aboutContainer}>
          <Title
            titleColor={pokemonInfo.mainType.cor}
            titleText={"Sobre"}
          />

          <View style={styles.mainStatsContainer}>
            <MainStat
              name="Peso"
              source={require("../../../assets/balanca.png")}
              values={[pokemonInfo.wheight.toString() + ' kg']}
              imgHeigth={20}
              imgWidth={20}
            />
            <Divider />
            <MainStat
              name="Altura"
              source={require("../../../assets/regua.png")}
              values={[pokemonInfo.height.toString() + ' m']}
              imgHeigth={30}
              imgWidth={15}
            />
          </View>

          <View style={styles.abilitiesContainer}>
            <Title
              titleColor={pokemonInfo.mainType.cor}
              titleText={"Habilidades"}
            />
            <Text style={{ fontSize: 18, color: "#1D1D1D" }}>{pokemonInfo.abilities ? pokemonInfo.abilities[0] : undefined}</Text>
            <Text style={{ fontSize: 18, color: "#1D1D1D" }}>{pokemonInfo.abilities ? (pokemonInfo.abilities.length > 1 ? pokemonInfo.abilities[1] : undefined) : undefined}</Text>
          </View>

          <View style={styles.baseStatsContainer}>
            <Title
              titleColor={pokemonInfo.mainType.cor}
              titleText={"Atributos Base"}
            />
            <View style={{ margin: 10 }}>
              <BaseStat
                color={pokemonInfo.mainType.cor}
                value={pokemonInfo.stats.hp}
                title="HP"
              />
              <BaseStat
                color={pokemonInfo.mainType.cor}
                value={pokemonInfo.stats.attack}
                title="ATK"
              />
              <BaseStat
                color={pokemonInfo.mainType.cor}
                value={pokemonInfo.stats.defense}
                title="DEF"
              />
              <BaseStat
                color={pokemonInfo.mainType.cor}
                value={pokemonInfo.stats.specialAttack}
                title="ATKS"
              />
              <BaseStat
                color={pokemonInfo.mainType.cor}
                value={pokemonInfo.stats.specialDefense}
                title="DEFS"
              />
              <BaseStat
                color={pokemonInfo.mainType.cor}
                value={pokemonInfo.stats.speed}
                title="VEL"
              />
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default Details;