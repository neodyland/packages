export type ReliquaryExcelConfigData = {
    equipType:                  EquipType;
    showPic:                    string;
    rankLevel:                  number;
    mainPropDepotId:            number;
    appendPropDepotId:          number;
    addPropLevels:              number[];
    baseConvExp:                number;
    maxLevel:                   number;
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
    appendPropNum?:             number;
    setId?:                     number;
    storyId?:                   number;
    destroyRule?:               DestroyRule;
    dropable?:                  boolean;
}[]

export enum DestroyRule {
    DestroyReturnMaterial = "DESTROY_RETURN_MATERIAL",
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
}
