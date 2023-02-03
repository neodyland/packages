export type WeaponExcelConfigData = {
    weaponType:                 WeaponType;
    rankLevel:                  number;
    weaponBaseExp:              number;
    skillAffix:                 number[];
    weaponProp:                 WeaponProp[];
    awakenTexture:              string;
    awakenLightMapTexture:      string;
    awakenIcon:                 string;
    weaponPromoteId:            number;
    storyId?:                   number;
    awakenCosts:                number[];
    gachaCardNameHash:          number;
    destroyRule?:               DestroyRule;
    destroyReturnMaterial:      number[];
    destroyReturnMaterialCount: number[];
    id:                         number;
    nameTextMapHash:            number;
    descTextMapHash:            number;
    icon:                       string;
    itemType:                   ItemType;
    weight:                     number;
    rank:                       number;
    gadgetId:                   number;
    initialLockState?:          number;
    awakenMaterial?:            number;
    enhanceRule?:               number;
    unRotate?:                  boolean;
}[]

export enum DestroyRule {
    DestroyReturnMaterial = "DESTROY_RETURN_MATERIAL",
}

export enum ItemType {
    ItemWeapon = "ITEM_WEAPON",
}

export interface WeaponProp {
    propType?:  PropType;
    initValue?: number;
    type:       Type;
}

export enum PropType {
    FightPropAttackPercent = "FIGHT_PROP_ATTACK_PERCENT",
    FightPropBaseAttack = "FIGHT_PROP_BASE_ATTACK",
    FightPropChargeEfficiency = "FIGHT_PROP_CHARGE_EFFICIENCY",
    FightPropCritical = "FIGHT_PROP_CRITICAL",
    FightPropCriticalHurt = "FIGHT_PROP_CRITICAL_HURT",
    FightPropDefensePercent = "FIGHT_PROP_DEFENSE_PERCENT",
    FightPropElementMastery = "FIGHT_PROP_ELEMENT_MASTERY",
    FightPropHPPercent = "FIGHT_PROP_HP_PERCENT",
    FightPropPhysicalAddHurt = "FIGHT_PROP_PHYSICAL_ADD_HURT",
}

export enum Type {
    GrowCurveAttack101 = "GROW_CURVE_ATTACK_101",
    GrowCurveAttack102 = "GROW_CURVE_ATTACK_102",
    GrowCurveAttack104 = "GROW_CURVE_ATTACK_104",
    GrowCurveAttack201 = "GROW_CURVE_ATTACK_201",
    GrowCurveAttack202 = "GROW_CURVE_ATTACK_202",
    GrowCurveAttack203 = "GROW_CURVE_ATTACK_203",
    GrowCurveAttack204 = "GROW_CURVE_ATTACK_204",
    GrowCurveAttack301 = "GROW_CURVE_ATTACK_301",
    GrowCurveAttack302 = "GROW_CURVE_ATTACK_302",
    GrowCurveAttack303 = "GROW_CURVE_ATTACK_303",
    GrowCurveAttack304 = "GROW_CURVE_ATTACK_304",
    GrowCurveCritical101 = "GROW_CURVE_CRITICAL_101",
    GrowCurveCritical201 = "GROW_CURVE_CRITICAL_201",
    GrowCurveCritical301 = "GROW_CURVE_CRITICAL_301",
}

export enum WeaponType {
    WeaponBow = "WEAPON_BOW",
    WeaponCatalyst = "WEAPON_CATALYST",
    WeaponClaymore = "WEAPON_CLAYMORE",
    WeaponPole = "WEAPON_POLE",
    WeaponSwordOneHand = "WEAPON_SWORD_ONE_HAND",
}
