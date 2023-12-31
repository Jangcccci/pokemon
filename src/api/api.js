import axios from "axios";

const ALL_POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon?limit=##{page}&offset=0";
const DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/##{id}";
const KOREAN_DATA_URL = "https://pokeapi.co/api/v2/pokemon-species/##{id}/";
const TYPE_URL = "https://pokeapi.co/api/v2/type/##{id}";
const LIMIT = 15; // 한 페이지에 보여줄 갯수

// 포켓몬 목록을 가져오는 메서드
export const getPokemonList = async (page) => {
  let pokemonList = [];
  const count = LIMIT * page;
  const url = ALL_POKEMONS_URL.replace("##{page}", count);
  pokemonList = (await axios.get(url)).data.results;

  const result = await pokemonList.map(async (data) => {
    const url = data.url;
    const id = await getPokemonId(url);

    const name = await getPokemonKoreanName(id);
    const { image, types } = await getPokemonImageAndTypes(url);

    const pokemon = {
      id,
      name,
      image,
      types,
    };

    return pokemon;
  });

  return Promise.all(result);
};

// 포켓몬 id를 가져오는 메서드
const getPokemonId = async (url) => {
  return (await axios.get(url)).data.id;
};

// 포켓몬 한국 이름을 가져오는 메서드
const getPokemonKoreanName = async (id) => {
  const url = KOREAN_DATA_URL.replace("##{id}", id);
  const response = (await axios.get(url)).data;
  return formatKorean(response);
};

// 포켓몬 카드 디스플레이에 필요한 데이터를 가져오는 메서드
export const getPokemonImageAndTypes = async (url) => {
  const response = await axios.get(url);
  return {
    image: response.data.sprites.other["official-artwork"].front_default,
    types: await formatTypes(response.data.types),
  };
};

// 포켓몬 타입 형식을 바꿔주는 메서드
const formatTypes = (types) => {
  return Promise.all(
    types.map(async (type) => {
      return {
        en: type.type.name,
        ko: await getPokemonTypeKo(type.type.url),
      };
    })
  );
};

// 포켓몬 한글 타입 가져오는 메서드
export const getPokemonTypeKo = async (url) => {
  const response = (await axios.get(url)).data;
  return formatKorean(response);
};

// 응답 데이터에서 한글명을 찾는 메서드
const formatKorean = (response) => {
  return response.names.filter((name) => name.language.name === "ko")[0].name;
};

/**
 * ==================================================
 * 포켓몬 상세 정보 메서드 모음
 * ==================================================
 */

// 포켓몬 상세정보를 가져오는 메서드
export const getPokemonDetailData = async (id) => {
  const url = DETAIL_URL.replace("##{id}", id);
  const result = await axios.get(url);
  if (result.data) {
    const { id, weight, height, stats, abilities, sprites } = result.data;
    const name = await getPokemonKoreanName(id);
    const { image, types } = await getPokemonImageAndTypes(url);
    const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
    // const damageRelations = (await axios.get(TYPE_URL.replace("##{id}", id))).data.damage_relations;

    const damageRelations = await Promise.all(
      types.map(async () => {
        return (await axios.get(TYPE_URL.replace("##{id}", id))).data.damage_relations;
      })
    );

    return {
      id,
      name,
      image,
      types,
      weight: weight / 10,
      height: height / 10,
      stats: formatStats(stats),
      abilities: formatAbilities(abilities),
      next: nextAndPreviousPokemon.next,
      previous: nextAndPreviousPokemon.previous,
      damageRelations,
      sprites: formatPokemonSprites(sprites),
      description: await getPokemonDescription(id),
    };
  }
};

// 이전, 다음 포켓몬 데이터
const getNextAndPreviousPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${id - 1}`;
  const result = await axios.get(url);

  const nextResponse = result?.data.next && (await axios.get(result?.data.next));
  const previousResponse = result?.data.previous && (await axios.get(result?.data.previous));

  return {
    next: nextResponse?.data?.results[0]?.name,
    previous: previousResponse?.data?.results[0]?.name,
  };
};

// 포켓몬 설명 가져오는 메서드
const getPokemonDescription = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  const response = await axios.get(url);
  const description = filterAndFormatDescription(response.data.flavor_text_entries);

  return description[Math.floor(Math.random() * description.length)];
};

// 포켓몬 한글 설명으로 변경 및 개행 문자 처리하는 메서드
const filterAndFormatDescription = (flavorText) => {
  const koreanDescription = flavorText
    ?.filter((text) => text.language.name === "ko")
    .map((text) => text.flavor_text.replace(/\r|\n|\f/g, " "));

  return koreanDescription;
};

// 포켓몬 이미지 포맷하는 메서드
const formatPokemonSprites = (sprites) => {
  const newSprites = { ...sprites };

  Object.keys(sprites).forEach((key) => {
    if (typeof newSprites[key] !== "string") {
      delete newSprites[key];
    }
  });

  return Object.values(newSprites);
};

// 포켓몬 Move 데이터 포맷 메서드
const formatAbilities = (abilities) => {
  return abilities
    .filter((ability, index) => index <= 1)
    .map((obj) => obj.ability.name.replaceAll("-", " "));
};

// 포켓몬 능력치 포맷 메서드
const formatStats = ([statHP, statATK, statDEP, statSTAK, statSDEP, statSPD]) => [
  { name: "Hit Points", baseStat: statHP.base_stat },
  { name: "Attack", baseStat: statATK.base_stat },
  { name: "Defense", baseStat: statDEP.base_stat },
  { name: "Special Attack", baseStat: statSTAK.base_stat },
  { name: "Special Defense", baseStat: statSDEP.base_stat },
  { name: "Speed", baseStat: statSPD.base_stat },
];
