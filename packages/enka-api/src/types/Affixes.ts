export type Affixes = {
    id:         string;
    propType:   PropType;
    efficiency: number;
    position:   number;
}[]

export enum PropType {
    FightPropAttack = "FIGHT_PROP_ATTACK",
    FightPropAttackPercent = "FIGHT_PROP_ATTACK_PERCENT",
    FightPropChargeEfficiency = "FIGHT_PROP_CHARGE_EFFICIENCY",
    FightPropCritical = "FIGHT_PROP_CRITICAL",
    FightPropCriticalHurt = "FIGHT_PROP_CRITICAL_HURT",
    FightPropDefense = "FIGHT_PROP_DEFENSE",
    FightPropDefensePercent = "FIGHT_PROP_DEFENSE_PERCENT",
    FightPropElementMastery = "FIGHT_PROP_ELEMENT_MASTERY",
    FightPropHP = "FIGHT_PROP_HP",
    FightPropHPPercent = "FIGHT_PROP_HP_PERCENT",
}
