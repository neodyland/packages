export type Characters = {
    id:               string;
    Element?:         Element;
    Consts?:          string[];
    SkillOrder?:      number[];
    Skills?:          { [key: string]: string };
    ProudMap?:        { [key: string]: number };
    NameTextMapHash?: number;
    SideIconName?:    string;
    QualityType?:     QualityType;
    Costumes?:        { [key: string]: Costume };
}[]

export interface Costume {
    sideIconName: string;
    icon:         string;
    art:          string;
    avatarId:     number;
}

export enum Element {
    Electric = "Electric",
    Fire = "Fire",
    Grass = "Grass",
    Ice = "Ice",
    None = "None",
    Rock = "Rock",
    Water = "Water",
    Wind = "Wind",
}

export enum QualityType {
    QualityOrange = "QUALITY_ORANGE",
    QualityOrangeSP = "QUALITY_ORANGE_SP",
    QualityPurple = "QUALITY_PURPLE",
}
