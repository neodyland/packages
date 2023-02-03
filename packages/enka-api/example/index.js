const { EnkaAPILocale } = require("../dist/enkaApi.js");
const { EnkaAPI } = require("../dist/index.js");

async function main() {
  const enkaApi = await EnkaAPI.init("700378769");
  const locale = EnkaAPILocale("ja");
  console.log(locale("4144069251"));
  console.log(
    "getImageUrl:",
    enkaApi.getImageUrl("UI_AvatarIcon_RosariaCostumeWic")
  );
  console.log(
    "costume:",
    enkaApi.getCostume({ iconName: "UI_AvatarIcon_RosariaCostumeWic" })
  );
}

main();
