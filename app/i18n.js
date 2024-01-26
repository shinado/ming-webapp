import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  en: {
    translation: {
      "nav.title": "Ming Coin",
      "nav.home": "Home",
      "nav.burn": "Burn",
      "nav.deaderboard": "Deaderboard",
      "nav.mint": "Mint",
      "nav.blog": "Blog",
      "nav.address": "Address",
      "nav.balance": "Balance",
      "nav.history": "History",
      "nav.min": "Get $MING",
      "nav.language": "Language",

      "global.or": "or",
      "global.burn": "Burn $MING",
      "global.readwhitepaper": "Read whitepaper",
      "global.visit.deaderboard": "Visit Deaderboard",

      "home.banner.top": "Ming Coin",
      "home.banner.title": "Ming Coin",
      "home.banner.sub":
        "Burn $MING as an offering to ancestors, spirits, or deities. ",
      "home.banner.hint": "*Now on testnet",

      "home.intro.title": "The Crypto in Afterlife.",
      "home.intro.sub":
        "The first-ever crypto used in afterlife. Burn $MING as an offering to ancestors, spirits, deities, or even your favorite celebrity.",
      "home.intro.card1.title": "Spirit Money",
      "home.intro.card1.sub":
        "Burn $MING as an offering to ancestors, spirits, or deities, ensuring that the spirits of the deceased have ample funds and are well taken care of in the afterlife.",
      "home.intro.card2.title": "#BUNR not #HODL",
      "home.intro.card2.sub":
        "The amount of $MING is at a fixed supply of 444,444,444,444,444. The more $MING you burn, the less $MING there is in circulation.",
      "home.intro.card3.title": "Fair Launch",
      "home.intro.card3.sub":
        "All $MINGs are distributed through a fair launch process, ensuring complete transparency and fairness. No pre-mining or reserved allocations.",
      "home.intro.card4.title": "Environmental Friendly",
      "home.intro.card4.sub":
        "Burn $MING instead of real papers. Less carbon footprint, more trees.",

      "home.feat.title": "Beyond memecoins.",
      "home.feat.sub": "Read whitepaper →",
      "home.feat.card0.title": "Burn",
      "home.feat.card0.sub": "Burn $MING to deities for blessings. The more $MING you burn, the less $MING in circulation",
      "home.feat.card0.cta": "Burn $MING →",
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
      "home.feat.card4.sub":
        "Buy and sell lands for your ancestors to live in.",
      "home.feat.card4.feat": "Coming soon",
      "home.feat.card5.title": "Staking",
      "home.feat.card5.sub":
        "Stake $MING to govern. You decide the future of $MING.",
      "home.feat.card5.feat": "Coming soon",

      "home.burn.title": "Burn $MING",
      "home.burn.sub":
        "Burn $MING to your ancestors for blessing, or a past-away celebrity.",
      "home.burn.content.dk": "Don't know what to do? checkout ",

      "home.burn.content.visit": "Visit ",
      "home.burn.content.deaderboard": "Deaderboard",
      "home.burn.content.browse": "Browse ",
      "home.burn.content.history": "burning history",
      "home.burn.content.or": "or ",
      "home.burn.content.morecoins": "get more $MING",

      "home.burn.form.name": "Recipient",
      "home.burn.form.name.hint": "George Washington",
      "home.burn.form.birthday": "Date of Birth",
      "home.burn.form.deathday": "Date of Death",
      "home.burn.form.amount": "Amount to burn",
      "home.burn.form.na": "Not Applicable",
      "home.burn.form.learn": "What happens when burning $MING?",
      "home.burn.form.learn.desc":
        "A ghost address(0x44444444 + {md5 hash of the name/birthdate/deathdate}) will be generated and your $MING will be transfered(burnt) to this address. Since this address is not owned by any entity ALIVE, the amount of $MING you burn quits circulation forever. ",
      "home.burn.form.message": "Message",
      "home.burn.form.message.hint": "Wish you all the best down there! ",
      "home.burn.add.message": "Add a message",

      "home.roadmap.title": "Roadmap",
      "home.roadmap.p1.title": "Testnet phase.1",
      "home.roadmap.p1.sub": "Released on testnet.",
      "home.roadmap.p2.title": "Testnet phase.2",
      "home.roadmap.p2.sub": "Batch mint",
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
      "dialog.edit.profile.first":
        "You are the first one to edit the profile! Learn more about ",
      "dialog.edit.profile.morethan":
        "You'll need more than {diff} votes to change the profile! Learn more about ",
      "dialog.edit.profile.ontop":
        "This profile is already on top. Learn more about ",
      "dialog.edit.profile.body":
        "Anyone with $MING is able to vote for the profile. The one with most votes will be displayed on the profile page. You can vote for an existing banner or add a new one. Learn more about ",
      "dialog.how.votes.work": "how votes work.",

      "dialog.vote.button": "Vote",
      "dialog.vote.buttoning": "Voting",

      "dialog.add.button": "Add",
      "dialog.add.buttoning": "Adding",

      "dialog.add.votes": "Add votes",

      "freemint.title1": "Initiat $MING",
      "freemint.title2": "With free mint",
      "freemint.body":
        "All $MING tokens are distributed via fair launch. You can get 444,444.444444 $MING(of total 444,444,444,444) for each free mint. For more information, please ",
      "freemint.readwhitepaper": "Read whitepaper",
      "freemint.viewcontract": "View the contract",
      "freemint.mint": "Free Mint",
      "freemint.minting": "Minting...",
      "freemint.balance": "Total amount minted: ",
      "freemint.mybalance": "Your balance: ",
      "freemint.total": "Total to mint: ",
      "freemint.mintamount": "Amount per mint: ",
      "freemint.process": "Mint process: ",
      "freemint.successful.title": "Mint Successful",
      "freemint.successful.body": "Your've minted ",
      "freemint.successful.next.title": "What next?",
      "freemint.successful.next.body":
        "Burn $MING to an ancestore for blessings, or visit Deaderboard and burn to your favorite character. ",
      "freemint.try.batch": "Try batch mint",

      "freemint.batch.title": "Batch Mint",
      "freemint.batch.body":
        "We set the initiatial $MING price based on the gas fee for each free mint. After the distribution, all deposted ETH and MING will be sent to Uniswap to provide liquidity and never exit. For more information, please ",
      "freemint.batch.note":
        "*Please note adding funds to liquidity pool is not implemented on testnet. ",
      "freemint.you.receive": "You'll receive ",
      "freemint.batch.pay": "Deposite Amount",
      "freemint.batch.exceed": "Exceed max deposite amount",
      "freemint.batch.button": "Batch Mint",
      "freemint.batch.buttoning": "Minting...",

      "burning.loading.1": "Generating ghost address...",
      "burning.loading.2": "Burning to ghost address...",
      "burning.loading.3": "Waiting for Bank of Hell to comfirm...",
      "burning.loading.4": "Bank of Hell returns OK...",
      "burning.loading.5": "Waiting for transaction to complete...",

      "nav.address": "Address",
      "nav.balance": "Balance",
      "nav.history": "History",
      "nav.mint": "Mint",
      "nav.language": "Language",

      "deaderboard.title": "Deaderboard",
      "deaderboard.rank": "Rank",
      "deaderboard.name": "Ghost",
      "deaderboard.wealth": "Wealth",
      "deaderboard.create": "Burn to someone else",

      "team.title": "Meet the team",
      "team.body":
        "The best team in hell. Unmatched Excellence, Guaranteed Results.",
      "team.1.name": "Grim Reaper",
      "team.1.title": "Chief Growth Officer",
      "team.1.body":
        "Deeply rooted in Hellverse for over thousands of years, I have extensive experience in user growth in the field",
      "team.2.name": "Hela",
      "team.2.title": "Europe & North America Marketing Lead",
      "team.2.body":
        "Focusing on Norse Mythology, well-known for Mjolnir destoyer. ",
      "team.3.name": "Yanluo",
      "team.3.title": "Great China Marketing Lead",
      "team.3.body": "President of Bank of Hell. ",
      "team.4.name": "Anubis",
      "team.4.title": "Africa Marketing Lead",
      "team.4.body": "I'm a jackal, not wolf! ",
      "team.5.name": "Shiva",
      "team.5.title": "Hindu Marketing Lead",
      "team.5.body": "A dance lover",
      "team.6.name": "Ryuk",
      "team.6.title": "Animates Marketing Lead",
      "team.6.body": "Did you see my note?",
      "team.7.name": "Mengpo",
      "team.7.title": "Cross-chain Growth Lead",
      "team.7.body":
        "Extensive experienced in cross-chain business(namely Naihe Bridge). A chef. ",

      "footer.about": "About",
      "footer.follow.us": "Follow us on ",
      "footer.links": "Quick Links",
    },
  },
  zh: {
    translation: {
      "nav.title": "区块链冥币",
      "nav.home": "主页",
      "nav.burn": "烧冥币",
      "nav.deaderboard": "名鬼堂",
      "nav.mint": "铸造",
      "nav.blog": "博客",
      "nav.address": "地址",
      "nav.balance": "余额",
      "nav.history": "历史记录",
      "nav.min": "获取冥币",
      "nav.language": "语言",

      "global.or": "或者",
      "global.burn": "燃烧$MING",
      "global.readwhitepaper": "阅读白皮书",
      "global.visit.deaderboard": "访问名鬼堂",

      "home.banner.title": "区块链冥币",
      "home.banner.sub": "解决阴间通胀，共建和谐地府。赛博冥币，越烧越贵。",
      "home.banner.hint": "*已经部署至测试网",

      "home.intro.title": "区块链冥币",
      "home.intro.sub":
        "$Ming的发行量固定为444,444,444,444枚，致力于构建低通胀的和谐地府",
      "home.intro.card1.title": "通缩",
      "home.intro.card1.sub":
        "解决地府恶性通胀问题。构建有孝循环: 烧越多越有孝，市面冥币越少，价格越高。",
      "home.intro.card2.title": "#BUNR，不要#HODL",
      "home.intro.card2.sub": "专门为燃烧设计，烧掉越多，价格越高。别傻傻拿着，烧给祖先长辈、佛主菩萨、王侯将相，祈求平安财富。",
      "home.intro.card3.title": "公平发射",
      "home.intro.card3.sub":
        "免费或批量铸造。没有项目方，只有贡献者，没有任何预留。贡献者可以通过基金会领取grant",
      "home.intro.card4.title": "环境友好",
      "home.intro.card4.sub": "今年清明不烧纸，烧纸得看合约地址",

      "home.feat.title": "不止迷因币.",
      "home.feat.sub": "阅读白皮书 →",
      "home.feat.card0.title": "燃烧",
      "home.feat.card0.sub": "给祖先烧点冥币，烧越多越有孝；冥币流通量越少，越烧越有钱。",
      "home.feat.card0.cta": "烧冥币 →",
      "home.feat.card1.title": "名鬼堂",
      "home.feat.card1.sub": "疯狂星期四给你秦始皇秦哥烧50冥币保你牛市发大财。",
      "home.feat.card1.cta": "查看 →",
      "home.feat.card2.title": "投票",
      "home.feat.card2.sub": "使用$MING投票，决定公共鬼魂的灵堂页面信息.",
      "home.feat.card2.cta": "了解更多 →",
      "home.feat.card3.title": "De商店",
      "home.feat.card3.sub": "给祖先烧纸房子、iPhone、保时捷，再买个风水宝地.",
      "home.feat.card3.feat": "Coming soon",
      "home.feat.card4.title": "风水宝地",
      "home.feat.card4.sub": "给祖先买一个风水宝地.",
      "home.feat.card4.feat": "Coming soon",
      "home.feat.card5.title": "质押",
      "home.feat.card5.sub": "质押来治理社区。你决定$MING的未来.",
      "home.feat.card5.feat": "Coming soon",

      "home.burn.title": "燃烧$MING",
      "home.burn.sub": "烧给祖先、神明、已故的公众人物. ",
      "home.burn.content.dk": "不知道烧给谁？去看看",
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
      "home.burn.form.na": "不适用",
      "home.burn.form.learn": "燃烧$MING会发生什么？",
      "home.burn.form.learn.desc":"燃烧的冥币会转入到鬼魂地址（0x44444444 + 鬼魂姓名/出生死亡日期的md5 hash）。因为鬼魂地址不被任何活着的人持有，因此燃烧的冥币会退出永久流通，形成通缩。",
      "home.burn.form.message": "口信",
      "home.burn.form.message.hint": "我秦哥才是千古第一帝！",
      "home.burn.add.message": "捎个口信",

      "home.roadmap.title": "路线图",
      "home.roadmap.p1.title": "测试阶段1",
      "home.roadmap.p1.sub": "在测试网上部署，燃烧、名鬼堂、投票.",
      "home.roadmap.p2.title": "测试阶段2",
      "home.roadmap.p2.sub": "Batch mint. ",
      "home.roadmap.p3.title": "测试阶段3",
      "home.roadmap.p3.sub": "De商店，风水宝地，质押.",
      "home.roadmap.p4.title": "上线主网",
      "home.roadmap.p4.sub": "等待清明节，烧纸.",

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
      "dialog.edit.profile.first":
        "你是第一个编辑资料的用户，你不需要投票来更新资料信息，了解更多",
      "dialog.edit.profile.morethan":
        "你需要超过{diff}的投票来修改资料，了解更多",
      "dialog.edit.profile.ontop": "这个资料信息已经是第一位了，了解更多",
      "dialog.edit.profile.body":
        "任何持有$MING的用户都可以对资料进行投票，投票数量第一的信息会在页面中进行展示，了解更多",
      "dialog.how.votes.work": "投票如何运作.",

      "dialog.vote.button": "投票",
      "dialog.vote.buttoning": "投票中",

      "dialog.add.button": "添加",
      "dialog.add.buttoning": "添加中",

      "dialog.add.votes": "添加投票",

      "freemint.title1": "公平分配",
      "freemint.title2": "Free mint",
      "freemint.body":
        "所有的$MING都通过公平发射来分配，每次free mint你都可以获得444,444.444444个$MING(总数444,444,444,444). 关于更多公平发射的信息，请",
      "freemint.readwhitepaper": "阅读白皮书",
      "freemint.viewcontract": "查看合约代码",
      "freemint.mint": "Free Mint",
      "freemint.minting": "Mint中...",
      "freemint.balance": "Mint总数: ",
      "freemint.mybalance": "我持有的$MING: ",
      "freemint.total": "总量: ",
      "freemint.mintamount": "每次铸造数量: ",
      "freemint.process": "铸造进度: ",
      "freemint.successful.title": "铸造成功",
      "freemint.successful.body": "你成功铸造了 ",
      "freemint.try.batch": "试试批量铸造",

      "freemint.batch.title": "批量铸造",
      "freemint.batch.body":
        "我们根据每次免费铸造所消耗的gas fee制定了$MING的初始价格。铸造结束后，所有存入的ETH和MING将会作为交易对进入流动池中，永不退出。了解更多公平发射的信息，请",
      "freemint.batch.note": "*在测试网的合约中没有实现流动池功能。 ",
      "freemint.you.receive": "你将收到",
      "freemint.batch.pay": "存入数量",
      "freemint.batch.exceed": "超过了最大存入数量",
      "freemint.batch.button": "批量铸造",
      "freemint.batch.buttoning": "铸造中",
      "freemint.successful.next.title": "然后呢？",
      "freemint.successful.next.body":
        "给你的祖先烧点冥币，或者去名鬼堂看看，支持一下你最喜欢的鬼魂。",

      "burning.loading.1": "生成鬼魂地址中...",
      "burning.loading.2": "正在烧给鬼魂地址...",
      "burning.loading.3": "等待地府银行确认交易...",
      "burning.loading.4": "地府银行确认交易...",
      "burning.loading.5": "等待交易确认...",

      "nav.address": "钱包地址",
      "nav.balance": "我的余额",
      "nav.history": "燃烧历史",
      "nav.mint": "获取$MING",
      "nav.language": "语言",

      "deaderboard.title": "名鬼堂",
      "deaderboard.rank": "排名",
      "deaderboard.name": "鬼魂",
      "deaderboard.wealth": "财富",
      "deaderboard.create": "烧给创建别的鬼魂",

      "team.title": "我们的团队",
      "team.body": "地府最强团队，使命必达。",
      "team.1.name": "死神",
      "team.1.title": "首席增长官",
      "team.1.body": "深耕死亡赛道千年，有丰富的用户增长经验。",
      "team.2.name": "Hela",
      "team.2.title": "欧美市场负责人",
      "team.2.body": "专注北欧神话，单手捏爆雷神之锤。",
      "team.3.name": "阎罗王",
      "team.3.title": "大中华市场负责人",
      "team.3.body": "天地银行地府分行行长。",
      "team.4.name": "Anubis",
      "team.4.title": "非洲市场负责人Africa Marketing",
      "team.4.body": "我不是狼！",
      "team.5.name": "湿婆",
      "team.5.title": "印度市场负责人Hindu Marketing",
      "team.5.body": "舞蹈热爱者",
      "team.6.name": "Ryuk",
      "team.6.title": "漫画市场负责人",
      "team.6.body": "那个，你看到我的笔记本了吗？",
      "team.7.name": "孟婆",
      "team.7.title": "跨链增长官",
      "team.7.body": "在奈何桥上有丰富的协助用户跨链的经验，同时也是一名厨师。",

      "footer.about": "关于",
      "footer.follow.us": "关注我们：",
      "footer.links": "链接",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  // .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    lng: "zh", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
