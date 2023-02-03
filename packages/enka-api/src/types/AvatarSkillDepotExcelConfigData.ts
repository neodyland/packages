export type AvatarSkillDepotExcelConfigData = {
    id:                      number;
    energySkill?:            number;
    skills:                  number[];
    subSkills:               number[];
    extraAbilities:          string[];
    talents:                 number[];
    talentStarName:          string;
    inherentProudSkillOpens: InherentProudSkillOpen[];
    skillDepotAbilityGroup:  string;
    leaderTalent?:           number;
    attackModeSkill?:        number;
}[]

export interface InherentProudSkillOpen {
    proudSkillGroupId?:      number;
    needAvatarPromoteLevel?: number;
}
