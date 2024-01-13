import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  en: {
    translation: {
      "home.banner.top": "Ming Coin",
      "home.banner.title": "Ming Coin",
      "home.banner.sub": "Burn $MING as an offering to ancestors, spirits, or deities. ",
      "home.banner.hint": "*Now on testnet",

      "home.intro.title": "The Crypto in Afterlife.",
      "home.intro.sub": "The first-ever crypto used in afterlife. Burn $MING as an offering to ancestors, spirits, deities, or even your favorite celebrity.",
      "home.intro.card1.title": "Spirit Money",
      "home.intro.card1.sub": "Burn $MING as an offering to ancestors, spirits, or deities, ensuring that the spirits of the deceased have ample funds and are well taken care of in the afterlife.",
      "home.intro.card2.title": "#BUNR not #HODL",
      "home.intro.card2.sub": "The amount of $MING is at a fixed supply of 444,444,444,444,444. The more $MING you burn, the less $MING there is in circulation.",
      "home.intro.card3.title": "Fair Launch",
      "home.intro.card3.sub": "All $MINGs are distributed through a fair launch process, ensuring complete transparency and fairness. No pre-mining or reserved allocations.",
      "home.intro.card4.title": "Environmental Friendly",
      "home.intro.card4.sub": "Burn $MING instead of real papers. Less carbon footprint, more trees.",

      "home.feat.title": "Beyond memecoins.",
      "home.feat.sub": "Read whitepaper →",
      "home.feat.card1.title": "Deaderboard",
      "home.feat.card1.sub": "Check out the billionaires in the afterlife.",
      "home.feat.card1.cta": "See who's on top →",
      "home.feat.card2.title": "Votings",
      "home.feat.card2.sub": "Use $MING to vote for public profiles.",
      "home.feat.card2.cta": "Learn more →",
      "home.feat.card3.title": "De Shop",
      "home.feat.card3.sub": "Burn NFTs to spirits.",
      "home.feat.card3.feat": "Coming soon",
      "home.feat.card4.title": "Lands",
      "home.feat.card4.sub": "Buy and sell lands for your ancestors to live in.",
      "home.feat.card4.feat": "Coming soon",
      "home.feat.card5.title": "Staking",
      "home.feat.card5.sub": "Stake $MING to govern. You decide the future of $MING.",
      "home.feat.card5.feat": "Coming soon",

      "home.burn.title": "Burn $MING",
      "home.burn.sub": "Burn $MING to your ancestors for blessing, or a past-away celebrity.",
      "home.burn.content": "Visit <a href=''>Deaderboard</>, browse my burning history, or get more $MING.",
      "home.burn.content.visit": "Visit ",
      "home.burn.content.deaderboard": "<a href=''>Deaderboard</>, browse ",
      "home.burn.content.history": "<a>my burning history</a>, or .",
      "home.burn.content.morecoins": "<a>get more $MING</a>.",

      "home.burn.form.name": "Recipient",
      "home.burn.form.name.hint": "George Washington",
      "home.burn.form.birthday": "Date of Birth",
      "home.burn.form.deathday": "Date of Death",
      "home.burn.form.amount": "Amount to burn",

      "home.roadmap.title": "Roadmap",
      "home.roadmap.p1.title": "Testnet phase.1",
      "home.roadmap.p1.sub": "Released on testnet.",
      "home.roadmap.p2.title": "Testnet phase.2",
      "home.roadmap.p2.sub": "Funding. ",
      "home.roadmap.p3.title": "Testnet phase.3",
      "home.roadmap.p3.sub": "De Shop, Lands, and Staking.",
      "home.roadmap.p4.title": "Mainnet",
      "home.roadmap.p4.sub": "Party!",

      "home.button.connect": "Connect wallet",
      "home.button.connecting": "Connecting",
      "home.button.burn": "Burn $MING",
      "home.button.burning": "Burning..",
      "home.button.getming": "Get $MING Now",

      "profile.page.wealth": "Wealth",
      "profile.page.bio": "Bio",
      "profile.page.transactions": "Transactions",

      "dialog.burn.title": "Burn $MING",
      "dialog.burn.amount2burn": "Amount to burn",
      "dialog.vote.banner": "Vote Banner",
      "dialog.vote.avatar": "Vote Avatar",
      "dialog.vote.bio": "Vote Bio",
      "dialog.add.banner": "Add Banner",
      "dialog.add.avatar": "Add Avatar",
      "dialog.add.bio": "Add Bio",
      "dialog.edit.banner": "Edit Banner",
      "dialog.edit.avatar": "Edit Avatar",
      "dialog.edit.bio": "Edit Bio",
      "dialog.edit.profile.first": "You are the first one to edit the profile! Learn more about ",
      "dialog.edit.profile.morethan": "You'll need more than {diff} votes to change the profile! Learn more about ",
      "dialog.edit.profile.ontop": "This profile is already on top. Learn more about ",
      "dialog.edit.profile.body": "Anyone with $MING is able to vote for the profile. The one with most votes will be displayed on the profile page. You can vote for an existing banner or add a new one. Learn more about ",
      "dialog.how.votes.work": "how votes work.",

      "dialog.vote.button": "Vote",
      "dialog.vote.buttoning": "Voting",

      "dialog.add.button": "Add",
      "dialog.add.buttoning": "Adding",

      "dialog.add.votes": "Add votes",

      "funding.title1": "Initiat $MING",
      "funding.title2": "With a fair launch",
      "funding.body": "We set the initiatial $MING price at 1 ETH = 2,222,222,222,222 $MING, aiming to raise 100 ETH. After it reaches the funding goal, all fundswill be sent to Uniswap, along with the other half of $MING to provide liquidity. For more information, please ",
      "funding.readwhitepaper": "Read the whitepaper",
      "funding.raised": "We've raised: ",
    }
  },
  zh: {
    translation: {
      "home.banner.title": "Ming Coin",
      "home.banner.sub": "区块链冥币，构建低通胀和谐地府",
      "home.banner.hint": "*已经部署至测试网",

      "home.intro.title": "区块链冥币",
      "home.intro.sub": "$Ming作为以太坊生态中的重要公共物品, 致力于构建低通胀的和谐地府",
      "home.intro.card1.title": "冥币",
      "home.intro.card1.sub": "解决地府恶性通胀问题，让亡者在地府生活更加富足",
      "home.intro.card2.title": "#BUNR, 不要#HODL",
      "home.intro.card2.sub": "$MING的发行量固定为444,444,444,444,444. 烧得越多，通缩越大，价格越高",
      "home.intro.card3.title": "公平发射",
      "home.intro.card3.sub": "没有项目方, 只有贡献者, 没有任何预留。贡献者可以通过基金会领取grant",
      "home.intro.card4.title": "环境友好",
      "home.intro.card4.sub": "今年清明不烧纸, 烧纸得看合约地址",


      "home.feat.title": "不止迷因币.",
      "home.feat.sub": "阅读白皮书 →",
      "home.feat.card1.title": "名鬼堂",
      "home.feat.card1.sub": "地府里的亿万富翁都是谁？",
      "home.feat.card1.cta": "查看 →",
      "home.feat.card2.title": "投票",
      "home.feat.card2.sub": "使用$MING投票, 决定公共鬼魂的灵堂页面信息.",
      "home.feat.card2.cta": "查看更多 →",
      "home.feat.card3.title": "De商店",
      "home.feat.card3.sub": "烧点NFT给祖先, 献花.",
      "home.feat.card3.feat": "Coming soon",
      "home.feat.card4.title": "风水宝地",
      "home.feat.card4.sub": "给祖先买一个风水宝地.",
      "home.feat.card4.feat": "Coming soon",
      "home.feat.card5.title": "质押",
      "home.feat.card5.sub": "质押来治理社区。你决定$MING的未来.",
      "home.feat.card5.feat": "Coming soon",

      "home.burn.title": "燃烧$MING",
      "home.burn.sub": "烧给祖先、神明、已故的公众人物. ",
      "home.burn.content.visit": "访问",
      "home.burn.content.deaderboard": "名鬼堂",
      "home.burn.content.browse": "浏览",
      "home.burn.content.history": "燃烧记录",
      "home.burn.content.or": "或者",
      "home.burn.content.morecoins": "获取更多$MING",

      "home.burn.form.name": "烧给",
      "home.burn.form.name.hint": "秦始皇",
      "home.burn.form.birthday": "出生日期",
      "home.burn.form.deathday": "死亡日期",
      "home.burn.form.amount": "燃烧数量",

      "home.roadmap.title": "路线图",
      "home.roadmap.p1.title": "测试阶段1",
      "home.roadmap.p1.sub": "在测试网上部署, 燃烧、名鬼堂、投票.",
      "home.roadmap.p2.title": "测试阶段2",
      "home.roadmap.p2.sub": "筹款功能. ",
      "home.roadmap.p3.title": "测试阶段3",
      "home.roadmap.p3.sub": "De商店, 风水宝地, 质押.",
      "home.roadmap.p4.title": "上线主网",
      "home.roadmap.p4.sub": "等待清明节, 烧纸.",

      "home.button.connect": "连接钱包",
      "home.button.connecting": "连接中",
      "home.button.burn": "烧$MING币",
      "home.button.burning": "燃烧中..",
      "home.button.getming": "获取$MING",

      "profile.page.wealth": "财富",
      "profile.page.bio": "生平",
      "profile.page.transactions": "燃烧记录",

      "dialog.burn.title": "燃烧$MING",
      "dialog.burn.amount2burn": "燃烧数量",
      "dialog.vote.banner": "为banner投票",
      "dialog.vote.avatar": "为头像投票",
      "dialog.vote.bio": "为生平介绍投票",
      "dialog.add.banner": "添加banner",
      "dialog.add.avatar": "添加头像",
      "dialog.add.bio": "添加生平介绍",
      "dialog.edit.banner": "编辑banner",
      "dialog.edit.avatar": "编辑头像",
      "dialog.edit.bio": "编辑生平介绍",
      "dialog.edit.profile.first": "你是第一个编辑资料的用户, 你不需要投票来更新资料信息, 了解更多",
      "dialog.edit.profile.morethan": "你需要超过{diff}的投票来修改资料, 了解更多",
      "dialog.edit.profile.ontop": "这个资料信息已经是第一位了, 了解更多",
      "dialog.edit.profile.body": "任何持有$MING的用户都可以对资料进行投票, 投票数量第一的信息会在页面中进行展示, 了解更多",
      "dialog.how.votes.work": "投票如何运作.",

      "dialog.vote.button": "投票",
      "dialog.vote.buttoning": "投票中",

      "dialog.add.button": "添加",
      "dialog.add.buttoning": "添加中",

      "dialog.add.votes": "添加投票",

      "funding.title1": "公平分配$MING",
      "funding.title2": "全部进入流动池",
      "funding.body": "$MING的初始价格设置为1 ETH = 2,222,222,222,222 $MING, 预期筹集100ETH. 待筹款完成之后, 筹集到的所有ETH将会和剩余的$MING一起进入到流动池中. 关于更多公平发射的信息，请",
      "funding.readwhitepaper": "阅读白皮书Read the whitepaper",
      "funding.raised": "已筹集到: ",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng: "zh", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;