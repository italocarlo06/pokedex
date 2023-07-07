

export interface PokemonType {
  nome: string;
  cor: string
}

export interface PokemonStats {
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number,
}

export interface PokemonInfo {
  id: string;
  name: string;
  renderName: string;
  url: string;
  sprite: string;
  typeColor: string;
  height: number;
  wheight: number;
  mainType: PokemonType;
  secondaryType?: PokemonType;
  abilities?: string[];
  stats: PokemonStats;
}


export function getPokemonTypeInfo(type: string): PokemonType {
  const types = {
    bug: {
      nome: "Inseto",
      cor: "#A7B723",
    },
    dark: {
      nome: "Sombrio",
      cor: "#75574C",
    },
    dragon: {
      nome: "Dragão",
      cor: "#7037FF",
    },
    electric: {
      nome: "Elétrico",
      cor: "#F9CF30",
    },
    fairy: {
      nome: "Fada",
      cor: "#E69EAC",
    },
    fighting: {
      nome: "Lutador",
      cor: "#C12239",
    },
    fire: {
      nome: "Fogo",
      cor: "#F57D31",
    },
    flying: {
      nome: "Voador",
      cor: "#A891EC",
    },
    ghost: {
      nome: "Fantasma",
      cor: "#70559B",
    },
    grass: {
      nome: "Grama",
      cor: "#74CB48",
    },
    ground: {
      nome: "Terrestre",
      cor: "#DEC16B",
    },
    ice: {
      nome: "Gelo",
      cor: "#9AD6DF",
    },
    normal: {
      nome: "Normal",
      cor: "#AAA67F",
    },
    poison: {
      nome: "Venenoso",
      cor: "#A43E9E",
    },
    psychic: {
      nome: "Psíquico",
      cor: "#FB5584",
    },
    rock: {
      nome: "Pedra",
      cor: "#B69E31",
    },
    steel: {
      nome: "Aço",
      cor: "#B7B9D0",
    },
    water: {
      nome: "Água",
      cor: "#6493EB",
    },
  };

  type ObjectKey = keyof typeof types;

  return types[type as ObjectKey];
};

interface StatList {
  base_stat: number
}



export const getStats = (statsList: StatList[]) => {
  const stats = {
    hp: statsList[0].base_stat,
    attack: statsList[1].base_stat,
    defense: statsList[2].base_stat,
    specialAttack: statsList[3].base_stat,
    specialDefense: statsList[4].base_stat,
    speed: statsList[5].base_stat,
  };

  return stats;
};