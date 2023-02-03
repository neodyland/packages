import axios from "axios";

import { urls } from "./constants";
import GameData from "./gamedata";
import EnkaAPIStore from "./store";
import { AvatarSkillDepotExcelConfigData } from "./types/AvatarSkillDepotExcelConfigData";
import { Costumes } from "./types/Costumes";
import { Convert, EnkaAPIData } from "./types/EnkaAPIData";
import { Loc } from "./types/Loc";
import { ReliquaryAffixExcelConfigData } from "./types/ReliquaryAffixExcelConfigData";
import { ReliquaryExcelConfigData } from "./types/ReliquaryExcelConfigData";
import { ReliquaryMainPropExcelConfigData } from "./types/ReliquaryMainPropExcelConfigData";
import { WeaponExcelConfigData } from "./types/WeaponExcelConfigData";

class EnkaAPI {
  private _data: EnkaAPIData;

  private constructor(_data: EnkaAPIData) {
    this._data = _data;
  }

  get playerInfo() {
    return this._data.playerInfo;
  }

  get avatarInfoList() {
    return this._data.avatarInfoList;
  }

  get ttl() {
    return this._data.ttl;
  }

  get uid() {
    return this._data.uid;
  }

  public static init = (uid: string) => {
    return new Promise<EnkaAPI>((resolve, reject) => {
      axios
        .get(urls.data(uid))
        .then((response) => {
          resolve(
            new EnkaAPI(Convert.toEnkaAPIData(JSON.stringify(response.data)))
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  public getImageBuffer = (iconName: string) => {
    return new Promise<Buffer>((resolve, reject) => {
      axios
        .get(urls.image(iconName), { responseType: "arraybuffer" })
        .then((response) => {
          resolve(Buffer.from(response.data, "binary"));
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  public getImageUrl = (iconName: string) => {
    return urls.image(iconName);
  };

  getCostume(): Costumes;
  getCostume(costumeId: string): Costumes[number];
  getCostume(searchOption: SearchOption<Costumes>): Costumes[number];
  public getCostume(option?: string | SearchOption<Costumes>) {
    if (!option) {
      return EnkaAPIStore.costumes;
    } else if (typeof option === "string") {
      return EnkaAPIStore.costumes.find((costume) => costume.id === option);
    } else {
      let _ = EnkaAPIStore.costumes;
      let key: keyof SearchOption<Costumes>;
      for (key in option) {
        _ = _.filter((costume) => costume[key] === option[key]);
      }
      return _;
    }
  }

  getSkill(): AvatarSkillDepotExcelConfigData;
  getSkill(skillDepotId: number): AvatarSkillDepotExcelConfigData[number];
  getSkill(
    searchOption: SearchOption<AvatarSkillDepotExcelConfigData>
  ): AvatarSkillDepotExcelConfigData[number];
  public getSkill(
    option?: number | SearchOption<AvatarSkillDepotExcelConfigData>
  ) {
    if (!option) {
      return GameData.AvatarSkillDepotExcelConfigData;
    } else if (typeof option === "number") {
      return GameData.AvatarSkillDepotExcelConfigData.find(
        (skill) => skill.id === option
      );
    } else {
      let _ = GameData.AvatarSkillDepotExcelConfigData;
      let key: keyof SearchOption<AvatarSkillDepotExcelConfigData>;
      for (key in option) {
        _ = _.filter((skill) => skill[key] === option[key]);
      }
      return _;
    }
  }

  getWeapon(): WeaponExcelConfigData;
  getWeapon(id: number): WeaponExcelConfigData[number];
  getWeapon(
    searchOption: SearchOption<WeaponExcelConfigData>
  ): WeaponExcelConfigData[number];
  public getWeapon(option?: number | SearchOption<WeaponExcelConfigData>) {
    if (!option) {
      return GameData.WeaponExcelConfigData;
    } else if (typeof option === "number") {
      return GameData.WeaponExcelConfigData.find(
        (weapon) => weapon.id === option
      );
    } else {
      let _ = GameData.WeaponExcelConfigData;
      let key: keyof SearchOption<WeaponExcelConfigData>;
      for (key in option) {
        _ = _.filter((weapon) => weapon[key] === option[key]);
      }
      return _;
    }
  }

  getReliquary(): ReliquaryExcelConfigData;
  getReliquary(id: number): ReliquaryExcelConfigData[number];
  getReliquary(
    searchOption: SearchOption<ReliquaryExcelConfigData>
  ): ReliquaryExcelConfigData[number];
  public getReliquary(
    option?: number | SearchOption<ReliquaryExcelConfigData>
  ) {
    if (!option) {
      return GameData.ReliquaryExcelConfigData;
    } else if (typeof option === "number") {
      return GameData.ReliquaryExcelConfigData.find(
        (reliquary) => reliquary.id === option
      );
    } else {
      let _ = GameData.ReliquaryExcelConfigData;
      let key: keyof SearchOption<ReliquaryExcelConfigData>;
      for (key in option) {
        _ = _.filter((reliquary) => reliquary[key] === option[key]);
      }
      return _;
    }
  }

  getReliquaryMainProps(): ReliquaryMainPropExcelConfigData;
  getReliquaryMainProps(id: number): ReliquaryMainPropExcelConfigData[number];
  getReliquaryMainProps(
    searchOption: SearchOption<ReliquaryMainPropExcelConfigData>
  ): ReliquaryMainPropExcelConfigData[number];
  public getReliquaryMainProps(
    option?: number | SearchOption<ReliquaryMainPropExcelConfigData>
  ) {
    if (!option) {
      return GameData.ReliquaryMainPropExcelConfigData;
    } else if (typeof option === "number") {
      return GameData.ReliquaryMainPropExcelConfigData.find(
        (p) => p.id === option
      );
    } else {
      let _ = GameData.ReliquaryMainPropExcelConfigData;
      let key: keyof SearchOption<ReliquaryMainPropExcelConfigData>;
      for (key in option) {
        _ = _.filter((p) => p[key] === option[key]);
      }
      return _;
    }
  }

  getReliquaryAppendProps(): ReliquaryAffixExcelConfigData;
  getReliquaryAppendProps(id: number): ReliquaryAffixExcelConfigData[number];
  getReliquaryAppendProps(
    searchOption: SearchOption<ReliquaryAffixExcelConfigData>
  ): ReliquaryAffixExcelConfigData[number];
  public getReliquaryAppendProps(
    option?: number | SearchOption<ReliquaryAffixExcelConfigData>
  ) {
    if (!option) {
      return GameData.ReliquaryAffixExcelConfigData;
    } else if (typeof option === "number") {
      return GameData.ReliquaryAffixExcelConfigData.find(
        (p) => p.id === option
      );
    } else {
      let _ = GameData.ReliquaryAffixExcelConfigData;
      let key: keyof SearchOption<ReliquaryAffixExcelConfigData>;
      for (key in option) {
        _ = _.filter((p) => p[key] === option[key]);
      }
      return _;
    }
  }
}

const EnkaAPILocale = (lang: keyof Loc) => {
  return (textMapHash: string) => EnkaAPIStore.loc[lang][textMapHash];
};

type SearchOption<T extends Array<any>> = {
  [K in keyof T[number]]?: T[number][K];
};

export { EnkaAPI, EnkaAPILocale };
