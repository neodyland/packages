// To parse this data:
//
//   import { Convert, EnkaAPIData } from "./file";
//
//   const enkaAPIData = Convert.toEnkaAPIData(json);

export interface EnkaAPIData {
  playerInfo?: PlayerInfo;
  avatarInfoList?: AvatarInfoList[];
  ttl?: number;
  uid?: string;
}

export interface AvatarInfoList {
  avatarId?: number;
  propMap?: { [key: string]: PropMap };
  fightPropMap?: { [key: string]: number };
  skillDepotId?: number;
  inherentProudSkillList?: number[];
  skillLevelMap?: { [key: string]: number };
  equipList?: EquipList[];
  fetterInfo?: FetterInfo;
  talentIdList?: number[];
}

export interface EquipList {
  itemId?: number;
  reliquary?: Reliquary;
  flat?: Flat;
  weapon?: Weapon;
}

export interface Flat {
  nameTextMapHash?: string;
  setNameTextMapHash?: string;
  rankLevel?: number;
  reliquaryMainstat?: ReliquaryMainstat;
  reliquarySubstats?: Stat[];
  itemType?: ItemType;
  icon?: string;
  equipType?: EquipType;
  weaponStats?: Stat[];
}

export enum EquipType {
  EquipBracer = "EQUIP_BRACER",
  EquipDress = "EQUIP_DRESS",
  EquipNecklace = "EQUIP_NECKLACE",
  EquipRing = "EQUIP_RING",
  EquipShoes = "EQUIP_SHOES",
}

export enum ItemType {
  ItemReliquary = "ITEM_RELIQUARY",
  ItemWeapon = "ITEM_WEAPON",
}

export interface ReliquaryMainstat {
  mainPropId?: PropID;
  statValue?: number;
}

export enum PropID {
  FightPropAttack = "FIGHT_PROP_ATTACK",
  FightPropAttackPercent = "FIGHT_PROP_ATTACK_PERCENT",
  FightPropBaseAttack = "FIGHT_PROP_BASE_ATTACK",
  FightPropChargeEfficiency = "FIGHT_PROP_CHARGE_EFFICIENCY",
  FightPropCritical = "FIGHT_PROP_CRITICAL",
  FightPropCriticalHurt = "FIGHT_PROP_CRITICAL_HURT",
  FightPropDefense = "FIGHT_PROP_DEFENSE",
  FightPropDefensePercent = "FIGHT_PROP_DEFENSE_PERCENT",
  FightPropElementMastery = "FIGHT_PROP_ELEMENT_MASTERY",
  FightPropHP = "FIGHT_PROP_HP",
  FightPropHPPercent = "FIGHT_PROP_HP_PERCENT",
  FightPropIceAddHurt = "FIGHT_PROP_ICE_ADD_HURT",
  FightPropRockAddHurt = "FIGHT_PROP_ROCK_ADD_HURT",
  FightPropWindAddHurt = "FIGHT_PROP_WIND_ADD_HURT",
}

export interface Stat {
  appendPropId?: PropID;
  statValue?: number;
}

export interface Reliquary {
  level?: number;
  mainPropId?: number;
  appendPropIdList?: number[];
}

export interface Weapon {
  level?: number;
  promoteLevel?: number;
  affixMap?: { [key: string]: number };
}

export interface FetterInfo {
  expLevel?: number;
}

export interface PropMap {
  type?: number;
  ival?: string;
  val?: string;
}

export interface PlayerInfo {
  nickname?: string;
  level?: number;
  worldLevel?: number;
  nameCardId?: number;
  finishAchievementNum?: number;
  towerFloorIndex?: number;
  towerLevelIndex?: number;
  showAvatarInfoList?: ShowAvatarInfoList[];
  profilePicture?: ProfilePicture;
}

export interface ProfilePicture {
  avatarId?: number;
}

export interface ShowAvatarInfoList {
  avatarId?: number;
  level?: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toEnkaAPIData(json: string): EnkaAPIData {
    return JSON.parse(json);
  }

  public static enkaAPIDataToJson(value: EnkaAPIData): string {
    return JSON.stringify(value);
  }
}
