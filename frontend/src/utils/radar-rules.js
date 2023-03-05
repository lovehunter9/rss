export const defaultRules = {
  '163.com': {
    _name: '网易',
    '.': [
      {
        title: '网易号（通用）',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-hao',
        source: ['/dy/media/:id', '/news/sub/:id'],
        target: (params) => `/163/dy2/${params.id.replace('.html', '')}`,
      },
    ],
    '3g': [
      {
        title: '网易号（通用）',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-hao',
        source: ['/dy/media/:id', '/news/sub/:id'],
        target: (params) => `/163/dy2/${params.id.replace('.html', '')}`,
      },
      {
        title: '独家栏目',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-du-jia-lan-mu',
        source: ['/touch/exclusive/sub/:id'],
        target: '/163/exclusive/:id?',
      },
    ],
    'c.m': [
      {
        title: '网易号（通用）',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-hao',
        source: ['/dy/media/:id', '/news/sub/:id'],
        target: (params) => `/163/dy2/${params.id.replace('.html', '')}`,
      },
    ],
    ds: [
      {
        title: '大神',
        docs: 'https://docs.rsshub.app/game.html#wang-yi-da-shen',
        source: '/user/:id',
        target: '/163/ds/:id',
      },
    ],
    m: [
      {
        title: '今日关注',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-xin-wen-jin-ri-guan-zhu',
        source: ['/'],
        target: '/163/today',
      },
    ],
    music: [
      {
        title: '云音乐 - 用户歌单',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/',
        target: (params, url) => {
          const id = new URL(url).hash.match(/home\?id=(.*)/)[1];
          return id ? `/163/music/user/playlist/${id}` : '';
        },
      },
      {
        title: '云音乐 - 歌单歌曲',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/',
        target: (params, url) => {
          const id = new URL(url).hash.match(/playlist\?id=(.*)/)[1];
          return id ? `/163/music/playlist/${id}` : '';
        },
      },
      {
        title: '云音乐 - 歌手专辑',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/',
        target: (params, url) => {
          const id = new URL(url).hash.match(/album\?id=(.*)/)[1];
          return id ? `/163/music/artist/${id}` : '';
        },
      },
      {
        title: '云音乐 - 歌手歌曲',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/',
        target: (_params, url) => {
          const id = new URL(url).hash.match(/artist\?id=(.*)/)[1];
          return id ? `/163/music/artist/songs/${id}` : '';
        },
      },
      {
        title: '云音乐 - 电台节目',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/',
        target: (params, url) => {
          const id = new URL(url).hash.match(/djradio\?id=(.*)/)[1];
          return id ? `/163/music/djradio/${id}` : '';
        },
      },
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue-yong-hu-dong-tai',
        source: ['/'],
        target: (_, url) => {
          const id = new URL(url).hash.match(/event\?id=(.*)/)[1];
          return id ? `/163/music/user/events/${id}` : '';
        },
      },
    ],
    news: [
      {
        title: '排行榜',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-xin-wen-pai-hang-bang',
      },
    ],
    renjian: [
      {
        title: '人间',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-xin-wen-ren-jian',
        source: ['/:category', '/'],
        target: '/163/renjian/:category?',
      },
    ],
    'vip.open': [
      {
        title: '公开课 精品课程',
        docs: 'https://docs.rsshub.app/study.html#wang-yi-gong-kai-ke',
        source: ['/'],
        target: '/163/open/vip',
      },
    ],
    'wp.m': [
      {
        title: '今日关注',
        docs: 'https://docs.rsshub.app/new-media.html#wang-yi-xin-wen',
        source: ['/163/html/newsapp/todayFocus/index.html', '/'],
        target: '/163/today',
      },
    ],
    'y.music': [
      {
        title: '云音乐 - 用户歌单',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/m/user',
        target: (params, url) =>
          `/163/music/user/playlist/${new URL(url).searchParams.get('id')}`,
      },
      {
        title: '云音乐 - 歌单歌曲',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/m/playlist',
        target: (params, url) =>
          `/163/music/playlist/${new URL(url).searchParams.get('id')}`,
      },
      {
        title: '云音乐 - 歌手专辑',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: '/m/album',
        target: (params, url) =>
          `/163/music/artist/${new URL(url).searchParams.get('id')}`,
      },
      {
        title: '云音乐 - 电台节目',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue',
        source: ['/m/radio', '/m/djradio'],
        target: (params, url) =>
          `/163/music/djradio/${new URL(url).searchParams.get('id')}`,
      },
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/multimedia.html#wang-yi-yun-yin-yue-yong-hu-dong-tai',
      },
    ],
  },
  '591.com.tw': {
    _name: '591 租屋網',
    rent: [
      {
        title: '所有物件',
        docs: 'https://docs.rsshub.app/other.html#_591-zu-wu-wang',
        source: ['/'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/591/tw/rent/${searchParams.toString()}`;
        },
      },
    ],
  },
  '2047.name': {
    _name: '2047',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/bbs.html#2047-fen-lei',
        source: ['/'],
        target: '/2047/:category?/:sort?',
      },
    ],
  },
  '12306.cn': {
    _name: '12306',
    kyfw: [
      {
        title: '售票信息',
        docs: 'https://docs.rsshub.app/travel.html#_12306-shou-shu-piao-piao-xin-shen-xi',
        source: ['/', '/otn/leftTicket/init'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          const from = searchParams.get('fs').split(',')[0];
          const to = searchParams.get('ts').split(',')[0];
          const date = searchParams.get('date');

          return `/12306/${date}/${from}/${to}`;
        },
      },
    ],
    www: [
      {
        title: '最新动态',
        docs: 'https://docs.rsshub.app/travel.html#_12306-zui-cuo-xin-dong-tai',
        source: ['/', '/mormhweb/1/:id/index_fl.html'],
        target: '/12306/zxdt/:id',
      },
    ],
  },
  '18comic.org': {
    _name: '禁漫天堂',
    '.': [
      {
        title: '成人 A 漫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-cheng-ren-a-man',
        source: ['/'],
        target: '/18comic/:category?/:time?/:order?/:keyword?',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-sou-suo',
        source: ['/'],
        target: '/18comic/search/:option?/:category?:keyword?/:time?/:order?',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-zhuan-ji',
        source: ['/'],
        target: '/18comic/album/:id',
      },
      {
        title: '文庫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-wen-ku',
        source: ['/'],
        target: '/18comic/blogs/:category?',
      },
    ],
  },
  '18comic.vip': {
    _name: '禁漫天堂',
    '.': [
      {
        title: '成人 A 漫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-cheng-ren-a-man',
        source: ['/'],
        target: '/18comic/:category?/:time?/:order?/:keyword?',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-sou-suo',
        source: ['/'],
        target: '/18comic/search/:option?/:category?:keyword?/:time?/:order?',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-zhuan-ji',
        source: ['/'],
        target: '/18comic/album/:id',
      },
      {
        title: '文庫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-wen-ku',
        source: ['/'],
        target: '/18comic/blogs/:category?',
      },
    ],
  },
  'jmcomic.me': {
    _name: '禁漫天堂',
    '.': [
      {
        title: '成人 A 漫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-cheng-ren-a-man',
        source: ['/'],
        target: '/18comic/:category?/:time?/:order?/:keyword?',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-sou-suo',
        source: ['/'],
        target: '/18comic/search/:option?/:category?:keyword?/:time?/:order?',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-zhuan-ji',
        source: ['/'],
        target: '/18comic/album/:id',
      },
      {
        title: '文庫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-wen-ku',
        source: ['/'],
        target: '/18comic/blogs/:category?',
      },
    ],
  },
  'jmcomic1.me': {
    _name: '禁漫天堂',
    '.': [
      {
        title: '成人 A 漫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-cheng-ren-a-man',
        source: ['/'],
        target: '/18comic/:category?/:time?/:order?/:keyword?',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-sou-suo',
        source: ['/'],
        target: '/18comic/search/:option?/:category?:keyword?/:time?/:order?',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-zhuan-ji',
        source: ['/'],
        target: '/18comic/album/:id',
      },
      {
        title: '文庫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-wen-ku',
        source: ['/'],
        target: '/18comic/blogs/:category?',
      },
    ],
  },
  'jmcomic.rocks': {
    _name: '禁漫天堂',
    '.': [
      {
        title: '成人 A 漫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-cheng-ren-a-man',
        source: ['/'],
        target: '/18comic/:category?/:time?/:order?/:keyword?',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-sou-suo',
        source: ['/'],
        target: '/18comic/search/:option?/:category?:keyword?/:time?/:order?',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-zhuan-ji',
        source: ['/'],
        target: '/18comic/album/:id',
      },
      {
        title: '文庫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-wen-ku',
        source: ['/'],
        target: '/18comic/blogs/:category?',
      },
    ],
  },
  'jmcomic1.rocks': {
    _name: '禁漫天堂',
    '.': [
      {
        title: '成人 A 漫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-cheng-ren-a-man',
        source: ['/'],
        target: '/18comic/:category?/:time?/:order?/:keyword?',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-sou-suo',
        source: ['/'],
        target: '/18comic/search/:option?/:category?:keyword?/:time?/:order?',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-zhuan-ji',
        source: ['/'],
        target: '/18comic/album/:id',
      },
      {
        title: '文庫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-wen-ku',
        source: ['/'],
        target: '/18comic/blogs/:category?',
      },
    ],
  },
  'jmcomic.group': {
    _name: '禁漫天堂',
    '.': [
      {
        title: '成人 A 漫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-cheng-ren-a-man',
        source: ['/'],
        target: '/18comic/:category?/:time?/:order?/:keyword?',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-sou-suo',
        source: ['/'],
        target: '/18comic/search/:option?/:category?:keyword?/:time?/:order?',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-zhuan-ji',
        source: ['/'],
        target: '/18comic/album/:id',
      },
      {
        title: '文庫',
        docs: 'https://docs.rsshub.app/anime.html#jin-man-tian-tang-wen-ku',
        source: ['/'],
        target: '/18comic/blogs/:category?',
      },
    ],
  },
  '19lou.com': {
    _name: '19 楼',
    '.': [
      {
        title: '头条',
        docs: 'https://docs.rsshub.app/bbs.html#19-lou-tou-tiao',
        source: ['/'],
        target: (params, url) =>
          `/19lou/${new URL(url).toString().match(/\/\/(.*?)\.19lou/)[1]}`,
      },
    ],
    www: [
      {
        title: '头条',
        docs: 'https://docs.rsshub.app/bbs.html#19-lou-tou-tiao',
        source: ['/'],
        target: '/19lou/www',
      },
    ],
    jiaxing: [
      {
        title: '头条',
        docs: 'https://docs.rsshub.app/bbs.html#19-lou-tou-tiao',
        source: ['/'],
        target: '/19lou/jiaxing',
      },
    ],
  },
  '2cycd.com': {
    _name: '二次元虫洞',
    '.': [
      {
        title: '板块',
        docs: 'https://docs.rsshub.app/bbs.html#er-ci-yuan-chong-dong',
        source: '/:path',
        target: (params, url) => {
          let pid, sort;
          const static_matched = params.path.match(/forum-(\d+)-\d+.html/);
          if (static_matched) {
            pid = static_matched[1];
          } else if (params.path === 'forum.php') {
            pid = new URL(url).searchParams.get('fid');
            sort = new URL(url).searchParams.get('orderby');
          } else {
            return false;
          }
          return `/2cycd/${pid}/${sort ? sort : 'dateline'}`;
        },
      },
    ],
  },
  '35photo.pro': {
    _name: '35PHOTO',
    '.': [
      {
        title: 'New photos',
        docs: 'https://docs.rsshub.app/picture.html#35photo-new-photos',
        source: ['/new', '/'],
        target: '/35photo/new',
      },
      {
        title: 'Featured photos',
        docs: 'https://docs.rsshub.app/picture.html#35photo-featured-photos',
        source: ['/new/actual', '/'],
        target: '/35photo/actual',
      },
      {
        title: 'New interesting',
        docs: 'https://docs.rsshub.app/picture.html#35photo-new-interesting',
        source: ['/new/interesting', '/'],
        target: '/35photo/interesting',
      },
      {
        title: 'Photos on the world map',
        docs: 'https://docs.rsshub.app/picture.html#35photo-photos-on-the-world-map',
        source: ['/new/map', '/'],
        target: '/35photo/map',
      },
      {
        title: 'Genre',
        docs: 'https://docs.rsshub.app/picture.html#35photo-genre',
        source: ['/'],
        target: (params, url) =>
          `/35photo/genre/${url.match(/genre_(\d+)/)[1]}`,
      },
      {
        title: 'Author',
        docs: 'https://docs.rsshub.app/picture.html#35photo-author',
        source: ['/:id', '/'],
        target: '/35photo/author/:id',
      },
    ],
  },
  '36kr.com': {
    _name: '36氪',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#_36kr-zi-xun',
        source: ['/information/:category', '/'],
        target: '/36kr/information/:category',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#_36kr-kuai-xun',
        source: ['/newsflashes', '/'],
        target: '/36kr/newsflashes',
      },
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/new-media.html#_36kr-yong-hu-wen-zhang',
        source: ['/user/:id', '/'],
        target: '/36kr/user/:id',
      },
      {
        title: '主题文章',
        docs: 'https://docs.rsshub.app/new-media.html#_36kr-zhu-ti-wen-zhang',
        source: ['/motif/:id', '/'],
        target: '/36kr/motif/:id',
      },
      {
        title: '专题文章',
        docs: 'https://docs.rsshub.app/new-media.html#_36kr-zhuan-ti-wen-zhang',
        source: ['/topics/:id', '/'],
        target: '/36kr/topics/:id',
      },
      {
        title: '搜索文章',
        docs: 'https://docs.rsshub.app/new-media.html#_36kr-sou-suo-wen-zhang',
        source: ['/search/articles/:keyword', '/'],
        target: '/36kr/search/articles/:keyword',
      },
      {
        title: '搜索快讯',
        docs: 'https://docs.rsshub.app/new-media.html#_36kr-sou-suo-kuai-xun',
        source: ['/search/newsflashes/:keyword', '/'],
        target: '/36kr/search/newsflashes/:keyword',
      },
    ],
  },
  '423down.com': {
    _name: '423down',
    www: [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/',
        target: '/423down/index/all',
      },
      {
        title: '安卓软件',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'apk') {
            return '/423down/android/apk';
          }
        },
      },
      {
        title: '原创软件',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'zd423') {
            return '/423down/computer/originalsoft';
          }
        },
      },
      {
        title: '媒体播放',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'multimedia') {
            return '/423down/computer/multimedia';
          }
        },
      },
      {
        title: '网页浏览',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'browser') {
            return '/423down/computer/browser';
          }
        },
      },
      {
        title: '图形图像',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'image') {
            return '/423down/computer/image';
          }
        },
      },
      {
        title: '聊天软件',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'im') {
            return '/423down/computer/im';
          }
        },
      },
      {
        title: '办公软件',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'work') {
            return '/423down/computer/work';
          }
        },
      },
      {
        title: '上传下载',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'down') {
            return '/423down/computer/down';
          }
        },
      },
      {
        title: '系统辅助',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'systemsoft') {
            return '/423down/computer/systemsoft';
          }
        },
      },
      {
        title: '系统必备',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'systemplus') {
            return '/423down/computer/systemplus';
          }
        },
      },
      {
        title: '安全软件',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'security') {
            return '/423down/computer/security';
          }
        },
      },
      {
        title: '补丁相关',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'patch') {
            return '/423down/computer/patch';
          }
        },
      },
      {
        title: '硬件相关',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'hardwork') {
            return '/423down/computer/hardware';
          }
        },
      },
      {
        title: 'windows 11',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'win11') {
            return '/423down/os/win11';
          }
        },
      },
      {
        title: 'windows 10',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'win10') {
            return '/423down/os/win10';
          }
        },
      },
      {
        title: 'windows 7',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'win7') {
            return '/423down/os/win7';
          }
        },
      },
      {
        title: 'windows xp',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'winxp') {
            return '/423down/os/winxp';
          }
        },
      },
      {
        title: 'windows pe',
        docs: 'https://docs.rsshub.app/bbs.html#_423down',
        source: '/:type',
        target: (params) => {
          if (params.type === 'winpe') {
            return '/423down/os/winpe';
          }
        },
      },
    ],
  },
  '500px.com.cn': {
    _name: '500px 摄影社区',
    '.': [
      {
        title: '部落影集',
        docs: 'https://docs.rsshub.app/picture.html#_500px-she-ying-she-qu',
        source: ['/page/tribe/detail'],
        target: (_, url) =>
          `/500px/tribe/set/${url.searchParams.get('tribeId')}`,
      },
      {
        title: '摄影师作品',
        docs: 'https://docs.rsshub.app/picture.html#_500px-she-ying-she-qu',
        source: [
          '/:id',
          '/community/user-details/:id',
          '/community/user-details/:id/*',
        ],
        target: '/500px/user/works/:id',
      },
    ],
  },
  '50forum.org.cn': {
    _name: '经济 50 人论坛',
    '.': [
      {
        title: '专家文章',
        docs: 'https://docs.rsshub.app/study.html#jing-ji-50-ren-lun-tan',
        source: ['/home/article/index/category/zhuanjia.html', '/'],
        target: '/50forum',
      },
    ],
  },
  '52hrtt.com': {
    _name: '52hrtt 华人头条',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#_52hrtt-hua-ren-tou-tiao',
        source: '/',
        target: (_params, url) =>
          `/52hrtt/${new URL(url).searchParams.get('infoTypeId')}`,
      },
      {
        title: '专题',
        docs: 'https://docs.rsshub.app/new-media.html#_52hrtt-hua-ren-tou-tiao',
        source: '/global/n/w/symposium/:id',
        target: '/52hrtt/symposium/:id',
      },
    ],
  },
  'hao6v.cc': {
    _name: '6v电影',
    '.': [
      {
        title: '最新电影',
        docs: 'https://docs.rsshub.app/multimedia.html#_6v-dian-ying',
        source: ['/', '/gvod/zx.html'],
        target: '/6v123/latestMovies',
      },
      {
        title: '最新电视剧',
        docs: 'https://docs.rsshub.app/multimedia.html#_6v-dian-ying',
        source: ['/', '/gvod/dsj.html'],
        target: '/6v123/latestTVSeries',
      },
    ],
  },
  'hao6v.tv': {
    _name: '6v电影',
    '.': [
      {
        title: '最新电影',
        docs: 'https://docs.rsshub.app/multimedia.html#_6v-dian-ying',
        source: ['/', '/gvod/zx.html'],
        target: '/6v123/latestMovies',
      },
      {
        title: '最新电视剧',
        docs: 'https://docs.rsshub.app/multimedia.html#_6v-dian-ying',
        source: ['/', '/gvod/dsj.html'],
        target: '/6v123/latestTVSeries',
      },
    ],
  },
  'hao6v.com': {
    _name: '6v电影',
    '.': [
      {
        title: '最新电影',
        docs: 'https://docs.rsshub.app/multimedia.html#_6v-dian-ying',
        source: ['/', '/gvod/zx.html'],
        target: '/6v123/latestMovies',
      },
      {
        title: '最新电视剧',
        docs: 'https://docs.rsshub.app/multimedia.html#_6v-dian-ying',
        source: ['/', '/gvod/dsj.html'],
        target: '/6v123/latestTVSeries',
      },
    ],
  },
  '78dm.net': {
    _name: '78动漫',
    '.': [
      {
        title: '新品速递',
        docs: 'https://docs.rsshub.app/anime.html#_78-dong-man-xin-pin-su-di',
        source: ['/news', '/'],
        target: (params, url) =>
          `/78dm${new URL(url)
            .toString()
            .match(/78dm\.net(.*)$/)[1]
            .replace(/\.html$/, '')}`,
      },
      {
        title: '精彩评测',
        docs: 'https://docs.rsshub.app/anime.html#_78-dong-man-jing-cai-ping-ce',
        source: ['/eval_list', '/'],
        target: (params, url) =>
          `/78dm${new URL(url)
            .toString()
            .match(/78dm\.net(.*)$/)[1]
            .replace(/\.html$/, '')}`,
      },
      {
        title: '新品速递',
        docs: 'https://docs.rsshub.app/anime.html#_78-dong-man-hao-tie-tui-jian',
        source: ['/ht_list', '/'],
        target: (params, url) =>
          `/78dm${new URL(url)
            .toString()
            .match(/78dm\.net(.*)$/)[1]
            .replace(/\.html$/, '')}`,
      },
    ],
  },
  '7mmtv.tv': {
    _name: '7mmtv.tv',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/multimedia.html#7mmtv-fen-lei',
        source: ['/'],
        target: (params, url) =>
          `/7mmtv/${
            new URL(url)
              .toString()
              .match(/\/(en|ja|ko|zh)\/([\w\d-]+\/){0,2}/)[1]
          }`,
      },
      {
        title: '制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#7mmtv-zhi-zuo-shang',
        source: ['/'],
        target: (params, url) =>
          `/7mmtv/${
            new URL(url)
              .toString()
              .match(/\/(en|ja|ko|zh)\/([\w\d-]+\/){0,2}/)[1]
          }`,
      },
    ],
  },
  '8kcosplay.com': {
    _name: '8KCosplay',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/picture.html#_8kcosplay',
        source: ['/'],
        target: '/8kcos',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/picture.html#_8kcosplay',
        source: ['/category/:cat*'],
        target: (params, url) => `/8kcos/cat/${new URL(url).pathname}`,
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/picture.html#_8kcosplay',
        source: ['/tag/:tag'],
        target: '/8kcos/tag/:tag',
      },
    ],
  },
  '8world.com': {
    _name: '8视界',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#_8-shi-jie-fen-lei',
        source: ['/:category', '/'],
        target: '/8world/:category?',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#_8-shi-jie-biao-qian',
        source: ['/topic/:id', '/'],
        target: '/8world/topic/:id',
      },
    ],
  },
  '91porn.com': {
    _name: '91porn',
    '.': [
      {
        title: '今日排行',
        docs: 'https://docs.rsshub.app/multimedia.html#_91porn',
        source: ['/index.php'],
        target: '/91porn',
      },
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/multimedia.html#_91porn',
        source: ['/uvideos.php'],
        target: (_params, url) =>
          `/91porn/author/${new URL(url).searchParams.get('UID')}`,
      },
    ],
  },
  '95mm.org': {
    _name: 'MM范',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/picture.html#mm-fan-fen-lei',
        source: '/',
        target: '/95mm/tab/:tab?',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/picture.html#mm-fan-biao-qian',
        source: '/',
        target: '/95mm/tag/:tag',
      },
      {
        title: '集合',
        docs: 'https://docs.rsshub.app/picture.html#mm-fan-ji-he',
        source: '/',
        target: '/95mm/category/:category',
      },
    ],
  },
  '9to5toys.com': {
    _name: '9to5',
    '.': [
      {
        title: 'Toys 分站',
        docs: 'https://docs.rsshub.app/new-media.html#_9to5',
        source: ['/', '/guides/:tag'],
        target: '/9to5/toys/:tag?',
      },
    ],
  },
  '9to5mac.com': {
    _name: '9to5',
    '.': [
      {
        title: 'Mac 分站',
        docs: 'https://docs.rsshub.app/new-media.html#_9to5',
        source: ['/', '/guides/:tag'],
        target: '/9to5/mac/:tag?',
      },
    ],
  },
  '9to5google.com': {
    _name: '9to5',
    '.': [
      {
        title: 'Google 分站',
        docs: 'https://docs.rsshub.app/new-media.html#_9to5',
        source: ['/', '/guides/:tag'],
        target: '/9to5/google/:tag?',
      },
    ],
  },
  'aamacau.com': {
    _name: '論盡媒體 AllAboutMacau Media',
    '.': [
      {
        title: '话题',
        docs: 'https://docs.rsshub.app/new-media.html#lun-jin-mei-ti-allaboutmacau-media-hua-ti',
        source: ['/'],
        target: '/:category?/:id?',
      },
    ],
  },
  'abmedia.io': {
    _name: 'abmedia.io',
    www: [
      {
        title: '首页最新新闻',
        docs: 'https://docs.rsshub.app/new-media.html#lian-xin-wen-abmedia-shou-ye-zui-xin-xin-wen',
        source: ['/'],
        target: '/abmedia/index',
      },
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/new-media.html#lian-xin-wen-abmedia-lei-bie',
        source: ['/category/:catehory'],
        target: '/abmedia/:category',
      },
    ],
  },
  'abskoop.com': {
    _name: 'A姐分享',
    '.': [
      {
        title: '存档列表',
        docs: 'https://docs.rsshub.app/multimedia.html#abskoop',
        source: ['/archives'],
        target: '/abskoop',
      },
    ],
  },
  'acfun.cn': {
    _name: 'AcFun',
    www: [
      {
        tilte: '番剧',
        docs: 'https://docs.rsshub.app/anime.html#acfun-fan-ju',
        source: '/bangumi/:id',
        target: (params) => `/acfun/bangumi/${params.id.replace('aa', '')}`,
      },
      {
        title: '用户投稿',
        docs: 'https://docs.rsshub.app/anime.html#acfun-yong-hu-tou-gao',
        source: '/u/:id',
        target: '/acfun/user/video/:id',
      },
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/anime.html#acfun',
        source: '/v/:categoryId/index.htm',
        target: (params) =>
          `/acfun/article/${params.categoryId.replace('list', '')}`,
      },
    ],
  },
  'acg17.com': {
    _name: 'ACG17',
    '.': [
      {
        title: '全部文章',
        docs: 'https://docs.rsshub.app/anime.html#acg17',
        source: ['/post'],
        target: '/acg17/post/all',
      },
    ],
  },
  'acs.org': {
    _name: 'American Chemistry Society',
    pubs: [
      {
        title: 'Journal',
        docs: 'https://docs.rsshub.app/journal.html#american-chemistry-society',
        source: ['/journal/:id', '/'],
        target: '/acs/journal/:id',
      },
    ],
  },
  'aeaweb.org': {
    _name: 'American Economic Association',
    '.': [
      {
        title: 'Journal',
        docs: 'https://docs.rsshub.app/journal.html#american-economic-association-journal',
        source: ['/journals/:id', '/'],
        target: '/aeaweb/:id',
      },
    ],
  },
  'agemys.cc': {
    _name: 'AGE动漫',
    '.': [
      {
        title: '最近更新',
        docs: 'https://docs.rsshub.app/anime.html#age-dong-man',
        source: ['/update', '/'],
        target: '/agefans/update',
      },
      {
        title: '番剧详情',
        docs: 'https://docs.rsshub.app/anime.html#age-dong-man',
        source: ['/detail/:id'],
        target: '/agefans/detail/:id',
      },
    ],
  },
  'aotter.net': {
    _name: '電獺少女',
    agirls: [
      {
        title: '分類',
        docs: 'https://docs.rsshub.app/new-media.html##dian-ta-shao-nu',
        source: ['/posts/:category'],
        target: '/agirls/:category',
      },
      {
        title: '精選主題列表',
        docs: 'https://docs.rsshub.app/new-media.html##dian-ta-shao-nu',
        source: ['/', '/topic'],
        target: '/agirls/topic_list',
      },
      {
        title: '精选主题',
        docs: 'https://docs.rsshub.app/new-media.html##dian-ta-shao-nu',
        source: ['/topic/:topic'],
        target: '/agirls/topic/:topic',
      },
    ],
  },
  'github.io': {
    _name: 'GitHub',
    agorahub: [
      {
        title: '共和報',
        docs: 'https://docs.rsshub.app/new-media.html#ag0ra',
        source: ['/pen0'],
        target: '/agora0/pen0',
      },
    ],
  },
  'gitlab.io': {
    _name: 'GitLab',
    agora0: [
      {
        title: '零博客',
        docs: 'https://docs.rsshub.app/new-media.html#ag0ra',
        source: ['/blog/:category', '/'],
        target: '/agora0/:category',
      },
    ],
  },
  'ahjzu.edu.cn': {
    _name: '安徽建筑大学',
    news: [
      {
        title: '通知公告',
        docs: 'https://docs.rsshub.app/university.html#an-hui-jian-zhu-da-xue',
        source: '/20/list.htm',
        target: '/ahjzu/news',
      },
    ],
  },
  'aicaijing.com': {
    _name: 'AI 财经社',
    www: [
      {
        title: '最新文章',
        docs: 'https://docs.rsshub.app/finance.html#ai-cai-jing-she-zui-xin-wen-zhang',
        source: ['/'],
        target: '/aicaijing/latest',
      },
      {
        title: '封面文章',
        docs: 'https://docs.rsshub.app/finance.html#ai-cai-jing-she-feng-mian-wen-zhang',
        source: ['/'],
        target: '/aicaijing/cover',
      },
      {
        title: '推荐资讯',
        docs: 'https://docs.rsshub.app/finance.html#ai-cai-jing-she-tui-jian-zi-xun',
        source: ['/'],
        target: '/aicaijing/recommend',
      },
      {
        title: '热点 & 深度',
        docs: 'https://docs.rsshub.app/finance.html#ai-cai-jing-she-re-dian-shen-du',
        source: ['/information/:id', '/'],
        target: '/aicaijing/information/:id?',
      },
    ],
  },
  'aiea.org': {
    _name: 'Asian Innovation and Entrepreneurship Association',
    www: [
      {
        title: 'Seminar Series',
        docs: 'https://docs.rsshub.app/study.html#AIEA-Seminar-Series',
        source: ['/0504', '/'],
        target: '/aiea/seminars/upcoming',
      },
    ],
  },
  aijishu: {
    _name: '极术社区',
    www: [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/programming.html#ji-shu-she-qu',
        source: ['/channel/:name'],
        target: '/aijishu/channel/:name',
      },
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/programming.html#ji-shu-she-qu',
        source: ['/u/:name'],
        target: '/aijishu/u/:name',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/programming.html#ji-shu-she-qu',
        source: ['/blog/:name'],
        target: '/aijishu/blog/:name',
      },
    ],
  },
  'airchina.com.cn': {
    _name: '中国国际航空公司',
    www: [
      {
        title: '服务公告',
        docs: 'https://docs.rsshub.app/travel.html#zhong-guo-guo-ji-hang-kong-gong-si',
        source: '/',
        target: '/airchina/announcement',
      },
    ],
  },
  'ajmide.com': {
    _name: '阿基米德FM',
    m: [
      {
        title: '播客',
        docs: 'https://docs.rsshub.app/multimedia.html#a-ji-mi-de-fm-bo-ke',
        source: ['/m/brand'],
        target: (_, url) => {
          const id = new URL(url).searchParams.get('id');
          return `/ajmide/${id}`;
        },
      },
    ],
  },
  'aliyun.com': {
    _name: '阿里云',
    developer: [
      {
        title: '开发者社区 - 主题',
        docs: 'https://docs.rsshub.app/programming.html#a-li-yun',
        source: ['/group/:type'],
        target: '/aliyun/developer/group/:type',
      },
    ],
    help: [
      {
        title: '公告',
        docs: 'https://docs.rsshub.app/programming.html#a-li-yun',
        source: ['/noticelist/:type', '/'],
        target: (params) =>
          `/aliyun/notice${
            params.type ? '/' + params.type.replace('.html', '') : ''
          }`,
      },
    ],
  },
  'taobao.org': {
    _name: '阿里云',
    mysql: [
      {
        title: '数据库内核月报',
        docs: 'https://docs.rsshub.app/programming.html#a-li-yun',
        source: ['/monthly', '/'],
        target: '/aliyun/database_month',
      },
    ],
  },
  'aliyundrive.com': {
    _name: '阿里云盘',
    www: [
      {
        title: '文件列表',
        docs: 'https://docs.rsshub.app/programming.html#a-li-yun-pan',
        source: ['/s/:share_id', '/s/:share_id/folder/:parent_file_id'],
        target: '/aliyundrive/files/:share_id/:parent_file_id?',
      },
    ],
  },
  'aljazeera.com': {
    _name: 'Aljazeera 半岛电视台',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-xin-wen',
        source: ['/:category', '/'],
        target: '/aljazeera/english/:category',
      },
      {
        title: 'Tag',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-biao-qian',
        source: ['/tag/:id', '/'],
        target: '/aljazeera/english/tag/:id',
      },
      {
        title: 'Official RSS',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-guan-fang-rss',
        source: ['/xml/rss/all.xml', '/'],
        target: '/aljazeera/english/rss',
      },
    ],
  },
  'aljazeera.net': {
    _name: 'Aljazeera 半岛电视台',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-xin-wen',
        source: ['/:category', '/'],
        target: '/aljazeera/arbric/:category',
      },
      {
        title: 'Tag',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-biao-qian',
        source: ['/tag/:id', '/'],
        target: '/aljazeera/arbric/tag/:id',
      },
      {
        title: 'Official RSS',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-guan-fang-rss',
        source: ['/rss', '/'],
        target: '/aljazeera/arbric/rss',
      },
    ],
    chinese: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-xin-wen',
        source: ['/:category', '/'],
        target: '/aljazeera/chinese/:category',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/traditional-media.html#aljazeera-ban-dao-dian-shi-tai-biao-qian',
        source: ['/tag/:id', '/'],
        target: '/aljazeera/chinese/tag/:id',
      },
    ],
  },
  'allrecode.com': {
    _name: '重构',
    '.': [
      {
        title: '推荐',
        docs: 'https://docs.rsshub.app/news-media.html#chong-gou-tui-jian',
        source: ['/recommends', '/'],
        target: '/allrecode/recommends',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/news-media.html#chong-gou-kuai-xun',
        source: ['/news', '/'],
        target: '/allrecode/news',
      },
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/news-media.html#chong-gou-zi-xun',
        source: ['/:category', '/'],
        target: '/allrecode/:category',
      },
    ],
  },
  'ally.net.cn': {
    _name: '艾莱资讯',
    rail: [
      {
        title: '世界轨道交通资讯网',
        docs: 'https://docs.rsshub.app/new-media.html#ai-lai-zi-xun',
        source: ['/', '/html/:category?/:topic?'],
        target: '/ally/rail/:category?/:topic?',
      },
    ],
  },
  'android.com': {
    _name: 'Android Developers',
    developer: [
      {
        title: 'SDK Platform Tools release notes',
        docs: 'https://docs.rsshub.app/program-update.html#android-sdk-platform-tools-release-notes',
        source: ['/studio/releases/platform-tools', '/'],
        target: '/android/platform-tools-releases',
      },
    ],
  },
  'annualreviews.org': {
    _name: 'Annual Reviews',
    '.': [
      {
        title: 'Journal',
        docs: 'https://docs.rsshub.app/journal.html#annual-reviews-journal',
        source: ['/journal/:id', '/'],
        target: '/annualreviews/:id',
      },
    ],
  },
  'anquanke.com': {
    _name: '安全客',
    '.': [
      {
        title: '分类订阅',
        docs: 'https://docs.rsshub.app/programming.html#an-quan-ke',
        source: ['/:category', '/'],
        target: (params) =>
          `/anquanke/${
            params.category === 'week-list' ? 'week' : params.category
          }`,
      },
    ],
  },
  'apkpure.com': {
    _name: 'APKPure',
    '.': [
      {
        title: '所有版本',
        docs: 'https://docs.rsshub.app/program-update.html#apkpure',
        source: [
          '/:region/:stuff/:pkg/versions',
          '/:stuff/:pkg/versions',
          '/:stuff/:pkg',
        ],
        target: (params) =>
          `/apkpure/versions/${params.pkg}${
            params.region ? `/${params.region}` : ''
          }`,
      },
    ],
  },
  'apnews.com': {
    _name: 'AP News',
    '.': [
      {
        title: '话题',
        docs: 'https://docs.rsshub.app/traditional-media.html#ap-news',
        source: '/hub/:topic',
        target: '/apnews/topics/:topic',
      },
    ],
  },
  'appcenter.ms': {
    _name: 'App Center',
    install: [
      {
        title: 'App Center Release',
        docs: 'https://docs.rsshub.app/program-update.html#app-center',
        source: [
          '/users/:user/apps/:app/distribution_groups/:distribution_group',
          '/orgs/:user/apps/:app/distribution_groups/:distribution_group',
        ],
        target: '/app-center/release/:user/:app/:distribution_group',
      },
    ],
  },
  'apple.com': {
    _name: 'Apple',
    apps: [
      {
        title: '应用更新',
        docs: 'https://docs.rsshub.app/program-update.html#app-store-mac-app-store',
        source: ['/:contry/app/:id'],
        target: '/appstore/update/:country/:id',
      },
      {
        title: '价格更新',
        docs: 'https://docs.rsshub.app/program-update.html#app-store-mac-app-store',
        source: ['/'],
        target: '/appstore/price/:country/:type/:id',
      },
    ],
  },
  'appledaily.com': {
    _name: '苹果新闻网',
    tw: [
      {
        title: '首頁',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/:channel'],
        target: (params) => {
          if (params.channel === 'home') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '焦点',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'recommend') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'new') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '热门',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'hot') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '生活',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'life') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '娱乐',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'entertainment') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '社会',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'local') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '财经地产',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'property') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '国际',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'international') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '政治',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'politics') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '3C车城',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'gadget') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '吃喝玩乐',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'supplement') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '体育',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'sports') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '苹评理',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'forum') {
            return '/appledaily/:channel';
          }
        },
      },
      {
        title: '微视频',
        docs: 'https://docs.rsshub.app/traditional-media.html#ping-guo-xin-wen-wang',
        source: ['/realtime/:channel'],
        target: (params) => {
          if (params.channel === 'micromovie') {
            return '/appledaily/:channel';
          }
        },
      },
    ],
  },
  'appleinsider.com': {
    _name: 'AppleInsider',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#appleinsider-fen-lei',
        source: ['/:category', '/'],
        target: '/appleinsider/:category',
      },
    ],
  },
  'app.so': {
    _name: '鲜面连线',
    '.': [
      {
        title: '限免应用',
        docs: 'https://docs.rsshub.app/program-update.html#app-store-mac-app-store',
        source: ['/xianmian'],
        target: '/appstore/xianmian',
      },
    ],
  },
  'gofans.cn': {
    _name: 'GoFans',
    '.': [
      {
        title: '最新限免',
        docs: 'https://docs.rsshub.app/program-update.html#app-store-mac-app-store',
        source: ['/'],
        target: '/appstore/gofans',
      },
    ],
  },
  'arknights.jp': {
    _name: '明日方舟',
    ak: [
      {
        title: 'アークナイツ（日服新闻）',
        docs: 'https://docs.rsshub.app/game.html#ming-ri-fang-zhou',
        source: ['/news?lang=ja&limit=9&page=1', '/'],
        target: '/arknights/japan',
      },
    ],
  },
  'hypergryph.com': {
    _name: '明日方舟',
    ak: [
      {
        title: '游戏公告与新闻',
        docs: 'https://docs.rsshub.app/game.html#ming-ri-fang-zhou',
        source: ['/news.html', '/'],
        target: '/arknights/news',
      },
    ],
    'ak-conf': [
      {
        title: '游戏内公告',
        docs: 'https://docs.rsshub.app/game.html#ming-ri-fang-zhou',
        source: ['/*'],
        target: '/arknights/news',
      },
    ],
    'monster-siren': [
      {
        title: '塞壬唱片',
        docs: 'https://docs.rsshub.app/game.html#ming-ri-fang-zhou',
        source: ['/info', '/'],
        target: '/siren/news',
      },
    ],
  },
  'blog.leanstack.com': {
    _name: "Ash Maurya's blog",
    '.': [
      {
        title: "Ash Maurya's blog",
        docs: 'https://docs.rsshub.app/en/blog.html#ash-maurya',
        source: ['/'],
        target: '/ash-maurya',
      },
    ],
  },
  'asiantolick.com': {
    _name: 'Asian to lick',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/picture.html#asian-to-lick-shou-ye',
        source: ['/'],
        target: '/asiantolick',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/picture.html#asian-to-lick-fen-lei',
        source: ['/'],
        target: (params, url) =>
          `/asiantolick/category/${new URL(url).toString().split('-').pop()}`,
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/picture.html#asian-to-lick-biao-qian',
        source: ['/'],
        target: (params, url) =>
          `/asiantolick/tag/${new URL(url).toString().split('-').pop()}`,
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/picture.html#asian-to-lick-sou-suo',
        source: ['/search/:keyword', '/'],
        target: '/asiantolick/search/:keyword?',
      },
    ],
  },
  'asus.com.cn': {
    _name: 'Asus 华硕',
    '.': [
      {
        title: '固件',
        docs: 'https://docs.rsshub.app/program-update.html#hua-shuo',
        source: ['/'],
        target: '/asus/bios/:model',
      },
    ],
  },
  'asus.com': {
    _name: 'ASUS',
    '.': [
      {
        title: 'GPU Tweak',
        docs: 'https://docs.rsshub.app/program-update.html#hua-shuo',
        source: ['/campaign/GPU-Tweak-III/*', '/'],
        target: '/asus/gpu-tweak',
      },
    ],
  },
  'atcoder.jp': {
    _name: 'AtCoder',
    '.': [
      {
        title: 'Posts',
        docs: 'https://docs.rsshub.app/programming.html#atcoder-posts',
        source: ['/posts', '/'],
        target: (params, url) =>
          `/atcoder/post/${new URL(url).searchParams.get('lang') ?? 'en'}/${
            new URL(url).searchParams.get('keyword') ?? ''
          }`,
      },
      {
        title: 'Contests',
        docs: 'https://docs.rsshub.app/programming.html#atcoder-contests',
        source: ['/contests/archive', '/contests', ''],
        target: (params, url) =>
          `/atcoder/content/${new URL(url).searchParams.get('lang') ?? 'en'}/${
            new URL(url).searchParams.get('ratedType') ?? '0'
          }/${new URL(url).searchParams.get('category') ?? '0'}/${
            new URL(url).searchParams.get('keyword') ?? ''
          }`,
      },
    ],
  },
  'audiobar.cn': {
    _name: '音频应用',
    '.': [
      {
        title: '最新主题',
        docs: 'https://docs.rsshub.app/bbs.html#yin-pin-ying-yong',
        source: ['/all.php'],
        target: '/audiobar/latest',
      },
    ],
  },
  'baai.ac.cn': {
    _name: '北京智源人工智能研究院',
    hub: [
      {
        title: '智源社区',
        docs: 'https://docs.rsshub.app/programming.html#bei-jing-zhi-yuan-ren-gong-zhi-neng-yan-jiu-yuan',
        source: ['/'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          const tagId = searchParams.get('tag_id');
          const sort = searchParams.get('sort');
          const range = searchParams.get('time_range');
          return `/baai/hub${tagId ? `/${tagId}` : ''}${
            sort ? `/${sort}` : ''
          }${range ? `/${range}` : ''}`;
        },
      },
      {
        title: '活动 - 智源社区',
        docs: 'https://docs.rsshub.app/programming.html#bei-jing-zhi-yuan-ren-gong-zhi-neng-yan-jiu-yuan',
        source: ['/events', '/'],
        target: '/baai/hub/events',
      },
      {
        title: '评论 - 智源社区',
        docs: 'https://docs.rsshub.app/programming.html#bei-jing-zhi-yuan-ren-gong-zhi-neng-yan-jiu-yuan',
        source: ['/comments', '/'],
        target: '/baai/hub/comments',
      },
    ],
  },
  'baidu.com': {
    _name: '百度',
    gushitong: [
      {
        title: '首页指数',
        docs: 'https://docs.rsshub.app/finance.html#bai-du-gu-shi-tong',
        source: ['/'],
        target: '/baidu/gushitong/index',
      },
    ],
    tieba: [
      {
        title: '帖子列表',
        docs: 'https://docs.rsshub.app/bbs.html#bai-du-tie-ba',
        source: 'f',
        target: (params, url) => {
          const type = new URL(url).searchParams.get('tab');
          if (!type || type === 'main') {
            return `/baidu/tieba/forum/${new URL(url).searchParams.get('kw')}`;
          }
        },
      },
      {
        title: '精品帖子',
        docs: 'https://docs.rsshub.app/bbs.html#bai-du-tie-ba',
        source: 'f',
        target: (params, url) => {
          const type = new URL(url).searchParams.get('tab');
          if (type === 'good') {
            return `/baidu/tieba/forum/good/${new URL(url).searchParams.get(
              'kw'
            )}`;
          }
        },
      },
      {
        title: '帖子动态',
        docs: 'https://docs.rsshub.app/bbs.html#bai-du-tie-ba',
        source: '/p/:id',
        target: '/baidu/tieba/post/:id',
      },
      {
        title: '只看楼主',
        docs: 'https://docs.rsshub.app/bbs.html#bai-du-tie-ba',
        source: '/p/:id',
        target: '/baidu/tieba/post/lz/:id',
      },
      {
        title: '用户帖子',
        docs: 'https://docs.rsshub.app/bbs.html#tie-ba',
        source: '/home/main',
        target: (params, url) => {
          const uid = new URL(url).searchParams.get('un');
          if (uid) {
            return `/baidu/tieba/user/${uid}`;
          }
        },
      },
    ],
    top: [
      {
        title: '热搜榜单',
        docs: 'https://docs.rsshub.app/other.html#bai-du-re-sou',
        source: ['/board'],
        target: (_, url) =>
          `/baidu/top/${new URL(url).searchParams.get('tab')}`,
      },
    ],
  },
  'baijingapp.com': {
    _name: '白鲸出海',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/new-media.html#bai-jing-chu-hai',
        source: ['/article', '/'],
        target: '/baijing',
      },
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#bai-jing-chu-hai',
        source: ['/article', '/'],
        target: (params, url) => {
          const matches = String(new URL(url)).match(/\/article\/type-(\d+)/);
          return `/baijing${matches ? `/${matches[1]}` : ''}`;
        },
      },
    ],
  },
  'bandcamp.com': {
    _name: 'Bandcamp',
    '.': [
      {
        title: 'Tag',
        docs: 'https://docs.rsshub.app/multimedia.html#bandcamp',
        source: ['/tag/:tag'],
        target: '/bandcamp/tag/:tag',
      },
      {
        title: 'Upcoming Live Streams',
        docs: 'https://docs.rsshub.app/multimedia.html#bandcamp-upcoming-live-streams',
        source: ['/live_schedule'],
        target: '/bandcamp/live',
      },
      {
        title: 'Weekly',
        docs: 'https://docs.rsshub.app/multimedia.html#bandcamp',
        source: ['/'],
        target: '/bandcamp/weekly',
      },
    ],
  },
  'bangumi.moe': {
    _name: '萌番組',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/anime.html#meng-fan-zu-zui-xin',
        source: ['/'],
        target: '/bangumi/moe',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/anime.html#meng-fan-zu-biao-qian',
        source: ['/search/index'],
        target: '/bangumi/moe/:tags?',
      },
    ],
  },
  'bangumi.online': {
    _name: 'アニメ新番組',
    '.': [
      {
        title: '當季新番',
        docs: 'https://docs.rsshub.app/anime.html#アニメ-xin-fan-zu-dang-ji-xin-fan',
        source: ['/'],
        target: '/bangumi/online',
      },
    ],
  },
  'bangumi.tv': {
    _name: 'Bangumi 番组计划',
    '.': [
      {
        title: '小组话题',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/group/:id',
        target: '/bangumi/tv/group/:id',
      },
      {
        title: '小组话题的新回复',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/group/topic/:id',
        target: '/bangumi/tv/topic/:id',
      },
      {
        title: '现实人物的新作品',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/person/:id',
        target: '/bangumi/tv/person/:id',
      },
      {
        title: '用户日志',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/user/:id',
        target: '/bangumi/tv/user/blog/:id',
      },
      {
        title: '条目的讨论',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id/topics',
      },
      {
        title: '条目的评论',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id/blogs',
      },
      {
        title: '条目的章节',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id',
      },
      {
        title: '条目的吐槽箱',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id/comments',
      },
      {
        title: '放送列表',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/calendar',
        target: '/bangumi/tv/calendar/today',
      },
    ],
  },
  'bgm.tv': {
    _name: 'Bangumi 番组计划',
    '.': [
      {
        title: '小组话题',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/group/:id',
        target: '/bangumi/tv/group/:id',
      },
      {
        title: '小组话题的新回复',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/group/topic/:id',
        target: '/bangumi/tv/topic/:id',
      },
      {
        title: '现实人物的新作品',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/person/:id',
        target: '/bangumi/tv/person/:id',
      },
      {
        title: '用户日志',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/user/:id',
        target: '/bangumi/tv/user/blog/:id',
      },
      {
        title: '条目的讨论',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id/topics',
      },
      {
        title: '条目的评论',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id/blogs',
      },
      {
        title: '条目的章节',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id',
      },
      {
        title: '条目的吐槽箱',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/subject/:id',
        target: '/bangumi/tv/subject/:id/comments',
      },
      {
        title: '放送列表',
        docs: 'https://docs.rsshub.app/anime.html#bangumi',
        source: '/calendar',
        target: '/bangumi/tv/calendar/today',
      },
    ],
  },
  'baozimh.com': {
    _name: '包子漫画',
    www: [
      {
        title: '订阅漫画',
        docs: 'https://docs.rsshub.app/multimedia.html#bandcamp-upcoming-live-streams',
        source: '/comic/:name',
        target: '/baozimh/comic/:name',
      },
    ],
  },
  'barronschina.com.cn': {
    _name: '巴伦周刊中文版',
    '.': [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/finance.html#ba-lun-zhou-kan-zhong-wen-ban-lan-mu',
        source: ['/'],
        target: '/barronschina/:category?',
      },
    ],
  },
  'bbcnewslabs.co.uk': {
    _name: 'BBC News Labs',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/programming.html#bbc-news-labs',
        source: '/',
        target: '/bbcnewslabs/news',
      },
    ],
  },
  '52bdys.com': {
    _name: '哔嘀影视',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/multimedia.html#bi-di-ying-shi',
        source: ['/s/:caty'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/bdys/${params.caty}/${searchParams.get('type') || 'all'}/${
            searchParams.get('area') || 'all'
          }/${searchParams.get('year') || 'all'}/${
            searchParams.get('order') || '0'
          }`;
        },
      },
    ],
  },
  'bde4.icu': {
    _name: '哔嘀影视',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/multimedia.html#bi-di-ying-shi',
        source: ['/s/:caty'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/bdys/${params.caty}/${searchParams.get('type') || 'all'}/${
            searchParams.get('area') || 'all'
          }/${searchParams.get('year') || 'all'}/${
            searchParams.get('order') || '0'
          }`;
        },
      },
    ],
  },
  'bdys01.com': {
    _name: '哔嘀影视',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/multimedia.html#bi-di-ying-shi',
        source: ['/s/:caty'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/bdys/${params.caty}/${searchParams.get('type') || 'all'}/${
            searchParams.get('area') || 'all'
          }/${searchParams.get('year') || 'all'}/${
            searchParams.get('order') || '0'
          }`;
        },
      },
    ],
  },
  'behance.net': {
    _name: 'Behance',
    www: [
      {
        title: 'User',
        docs: 'https://docs.rsshub.app/design.html#behance-yong-hu-zuo-pin',
        source: ['/:user', '/:user/:types', '/gallery/:galleryid/:galleryname'],
        target: (params, url, document) => {
          let uid;
          let type = '';
          if (params.types && params.types.match('appreciated')) {
            type = '/appreciated';
          }
          if (url.match(/gallery\/\d+/)) {
            uid =
              document &&
              document
                .querySelector('.e2e-project-avatar')
                .childNodes[0].attributes[1].value.match(
                  /behance.net\/(.*)/
                )[1];
          } else {
            uid =
              document &&
              document
                .querySelector('html')
                .innerHTML.match(/([^/]+)\/insights/)[1];
          }

          return `/behance/${uid}${type}`;
        },
      },
    ],
  },
  'bendibao.com': {
    _name: '本地宝',
    '.': [
      {
        title: '焦点资讯',
        docs: 'https://docs.rsshub.app/new-media.html#ben-di-bao-jiao-dian-zi-xun',
        source: '/',
        target: '/bendibao/news/:city',
      },
    ],
  },
  'bigquant.com': {
    _name: 'BigQuant',
    '.': [
      {
        title: '专题报告',
        docs: 'https://docs.rsshub.app/finance.html#bigquant-zhuan-ti-bao-gao',
        source: '/',
        target: '/bigquant/collections',
      },
    ],
  },
  'bilibili.com': {
    _name: 'bilibili',
    www: [
      {
        title: '分区视频',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: ['/v/*tpath', '/documentary', '/movie', '/tv'],
      },
      {
        title: '视频评论',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/video/:aid',
        target: (params) =>
          `/bilibili/video/reply/${params.aid.replace('av', '')}`,
      },
      {
        title: '视频弹幕',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/video/:aid',
        target: (params, url) => {
          const pid = new URL(url).searchParams.get('p');
          return `/bilibili/video/danmaku/${params.aid.replace('av', '')}/${
            pid ? pid : 1
          }`;
        },
      },
      {
        title: '番剧',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/bangumi/media/:bid',
        target: (params) =>
          `/bilibili/bangumi/media/${params.bid.replace('md', '')}`,
      },
      {
        title: '当前在线',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/video/online.html',
        target: '/bilibili/online',
      },
      {
        title: 'bilibili热搜',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/',
        target: '/bilibili/hot-search',
      },
    ],
    space: [
      {
        title: 'UP 主动态',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/dynamic/:uid',
      },
      {
        title: 'UP 主投稿',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/video/:uid',
      },
      {
        title: 'UP 主所有视频',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/video-all/:uid',
      },
      {
        title: 'UP 主频道的合集',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid/channel/collectiondetail',
        target: (params, url) => {
          const sid = new URL(url).searchParams.get('sid');
          return `/bilibili/user/collection/${params.uid}/${sid}`;
        },
      },
      {
        title: 'UP 主频道的视频列表',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid/channel/seriesdetail',
        target: (params, url) => {
          const sid = new URL(url).searchParams.get('sid');
          return `/bilibili/user/channel/${params.uid}/${sid}`;
        },
      },
      {
        title: 'UP 主专栏',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/article/:uid',
      },
      {
        title: 'UP 主默认收藏夹',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/fav/:uid',
      },
      {
        title: 'UP 主投币视频',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/coin/:uid',
      },
      {
        title: 'UP 主粉丝',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/followers/:uid',
      },
      {
        title: 'UP 主关注用户',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/followings/:uid',
      },
      {
        title: '用户追番列表',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili',
        source: '/:uid',
        target: '/bilibili/user/bangumi/:uid',
      },
    ],
    manga: [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/social-media.html#bilibili-man-hua-geng-xin',
        source: '/detail/:comicid',
        target: '/bilibili/manga/update/:comicid',
      },
    ],
    live: [
      {
        title: '直播开播',
        docs: 'https://docs.rsshub.app/live.html#bi-li-bi-li-zhi-bo-zhi-bo-kai-bo',
        source: ['/:roomID'],
        target: '/bilibili/live/room/:roomID',
      },
    ],
  },
  'biodiscover.com': {
    _name: '生物探索',
    www: [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/new-media.html#sheng-wu-tan-suo',
        source: '/:channel',
        target: '/biodiscover/:channel',
      },
    ],
  },
  'bioone.org': {
    _name: 'BioOne',
    '.': [
      {
        title: 'Featured articles',
        docs: 'https://docs.rsshub.app/journal.html#bioone-featured-articles',
        source: '/',
        target: '/bioone/featured',
      },
      {
        title: 'Journals',
        docs: 'https://docs.rsshub.app/journal.html#bioone-journals',
        source: ['/journals/:journal', '/'],
        target: '/bioone/journals/:journal',
      },
    ],
  },
  'xbiquwx.la': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'biqu5200.net': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'xbiquge.so': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'biqugeu.net': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'b520.cc': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'biquge.biz': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'xbiquge.la': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'qbiqu.com': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'bswtan.com': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'biquge.co': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'zhhbqg.com': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'biqugse.com': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'ibiquge.net': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'shuquge.com': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'mayiwxw.com': {
    _name: '笔趣阁',
    '.': [
      {
        title: '',
        docs: 'https://docs.rsshub.app/reading.html#bi-qu-ge-xiao-shuo',
        source: ['/'],
        target: (params, url) => `/biquge/${new URL(url).toString()}`,
      },
    ],
  },
  'bit.edu.cn': {
    _name: '北京理工大学',
    rszhaopin: [
      {
        title: '人才招聘',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-li-gong-da-xue-ren-cai-zhao-pin',
        source: ['/'],
        target: '/bit/:category?',
      },
    ],
  },
  'bitbucket.com': {
    _name: 'Bitbucket',
    '.': [
      {
        title: 'Commits',
        docs: 'https://docs.rsshub.app/programming.html#bitbucket',
        source: ['/commits/:workspace/:repo_slug'],
        target: '/bitbucket/commits/:workspace/:repo_slug',
      },
      {
        title: 'Tags',
        docs: 'https://docs.rsshub.app/programming.html#bitbucket',
        source: ['/tags/:workspace/:repo_slug'],
        target: '/bitbcuket/tags/:workspace/:repo_slug',
      },
    ],
  },
  'bitmovin.com': {
    _name: 'Bitmovin',
    '.': [
      {
        title: 'Blog',
        docs: 'https://docs.rsshub.app/programming.html#bitmovin',
        source: ['/blog', '/'],
        target: '/bitmovin/blog',
      },
    ],
  },
  'bjfu.edu.cn': {
    _name: '北京林业大学',
    graduate: [
      {
        title: '研究生院培养动态',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-lin-ye-da-xue',
        source: '/',
        target: '/bjfu/grs',
      },
    ],
    it: [
      {
        title: '信息学院通知',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-lin-ye-da-xue',
        source: '/:type/index.html',
        target: '/bjfu/it/:type',
      },
    ],
    jwc: [
      {
        title: '教务处通知公告',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-lin-ye-da-xue',
        source: '/:type/index.html',
        target: '/bjfu/jwc/:type',
      },
    ],
    kyc: [
      {
        title: '科技处通知公告',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-lin-ye-da-xue',
        source: '/',
        target: '/bjfu/kjc',
      },
    ],
    news: [
      {
        title: '绿色新闻网',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-lin-ye-da-xue',
        source: '/:type/index.html',
        target: '/bjfu/news/:type',
      },
    ],
  },
  'bjp.org.cn': {
    _name: '北京天文馆',
    '.': [
      {
        title: '每日一图',
        docs: 'https://docs.rsshub.app/picture.html#bei-jing-tian-wen-guan',
        source: ['/APOD/today.shtml', '/APOD/list.shtml', '/'],
        target: '/bjp/apod',
      },
    ],
  },
  'bjsk.org.cn': {
    _name: '北京社科网',
    '.': [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-she-ke-wang',
        source: ['/*'],
        target: (_, url) => `/bjsk/${url.split('/')[3].replace('.html', '')}`,
      },
    ],
  },
  'bjwxdxh.org.cn': {
    _name: '北京无线电协会',
    www: [
      {
        title: '最新资讯',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-wu-xian-dian-xie-hui',
        source: '/news/class/',
        target: (params, url) =>
          url.includes('?')
            ? `/bjwxdxh/${url.split('?')[1].split('.')[0]}`
            : '/bjwxdxh',
      },
    ],
  },
  'bjx.com.cn': {
    _name: '北极星电力网',
    guangfu: [
      {
        title: '光伏 - 分类',
        docs: 'https://docs.rsshub.app/traditional-media.html#bei-ji-xing-dian-li-wang',
        source: ['/:type', '/'],
        target: '/bjx/gf/:type?',
      },
    ],
    huanbao: [
      {
        title: '环保要闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#bei-ji-xing-dian-li-wang',
        source: ['/yw', '/'],
        target: '/bjx/huanbao',
      },
    ],
  },
  'theblockbeats.info': {
    _name: '律动',
    rszhaopin: [
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#lu-dong-xin-wen-kuai-xun',
        source: ['/'],
        target: '/blockbeats/newsflash',
      },
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/new-media.html#lu-dong-xin-wen-kuai-xun',
        source: ['/'],
        target: '/blockbeats/article',
      },
    ],
  },
  'bloomberg.com': {
    _name: 'Bloomberg',
    www: [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/finance.html#bloomberg-news',
        source: ['/:site', '/'],
        target: '/bloomberg/:site?',
      },
      {
        title: 'Authors',
        docs: 'https://docs.rsshub.app/finance.html#bloomberg',
        source: ['/*/authors/:id/:slug', '/authors/:id/:slug'],
        target: '/bloomberg/authors/:id/:slug',
      },
    ],
  },
  'bluestacks.com': {
    _name: 'BlueStacks',
    '.': [
      {
        title: 'BlueStacks 5 版本日誌',
        docs: 'https://docs.rsshub.app/program-update.html#bluestacks',
        source: [
          '/hc/en-us/articles/360056960211-Release-Notes-BlueStacks-5',
          '/',
        ],
        target: '/bluestacks/release/5',
      },
    ],
  },
  'bnu.edu.cn': {
    _name: '北京师范大学',
    bs: [
      {
        title: '经济与工商管理学院',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-shi-fan-da-xue',
        source: ['/:category/index.html'],
        target: '/bnu/bs/:category',
      },
    ],
    dwxgb: [
      {
        title: '党委学生工作部',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-shi-fan-da-xue',
        source: ['/:category/:type/index.html'],
        target: '/bnu/dwxgb/:category/:type',
      },
    ],
    fdy: [
      {
        title: '党委学生工作部辅导员发展中心',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-shi-fan-da-xue',
        source: ['/'],
        target: (_, url) =>
          `/bnu/fdy${new URL(url).pathname.replace(/\/index\.htm(l)?$/, '')}`,
      },
    ],
    'www.lib': [
      {
        title: '图书馆通知',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-shi-fan-da-xue',
        source: ['/:category/index.htm'],
        target: '/bnu/lib/:category',
      },
    ],
  },
  'bookfere.com': {
    _name: '书伴',
    '.': [
      { title: '分类', docs: 'https://docs.rsshub.app/reading.html#shu-ban' },
    ],
  },
  'brave.com': {
    _name: 'Brave',
    '.': [
      {
        title: 'Release Notes',
        docs: 'https://docs.rsshub.app/program-update.html#brave-release-notes',
        source: ['/latest', '/'],
        target: '/brave/latest',
      },
    ],
  },
  'brooklynmuseum.org': {
    _name: 'Brooklyn Museum',
    www: [
      {
        title: 'Exhibitions',
        docs: 'https://docs.rsshub.app/en/travel.html#brooklyn-museum',
      },
    ],
  },
  'bse.cn': {
    _name: '北京证券交易所',
    '.': [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/finance.html#bei-jing-zheng-quan-jiao-yi-suo-lan-mu',
        source: ['/'],
        target: '/bse/:category?/:keyword?',
      },
    ],
  },
  'btbtt20.com': {
    _name: 'BT之家',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/multimedia.html#bt-zhi-jia',
        source: ['/'],
        target: '/btzj/:category?',
      },
    ],
  },
  'bupt.edu.cn': {
    _name: '北京邮电大学',
    '.': [
      {
        title: '人才招聘',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-you-dian-da-xue-ren-cai-zhao-pin',
        source: ['/'],
        target: '/bupt/rczp',
      },
    ],
  },
  'byteclicks.com': {
    _name: '字节点击',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#zi-jie-dian-ji',
        source: ['/'],
        target: '/byteclicks',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#zi-jie-dian-ji',
        source: ['/tag/:tag'],
        target: '/byteclicks/tag/:tag',
      },
    ],
  },
  'bytes.dev': {
    _name: 'ui.dev',
    '.': [
      {
        title: 'React Newsletter',
        docs: 'https://docs.rsshub.app/en/programming.html#ui-dev-bytes',
        source: ['/issues', '/'],
        target: '/reactnewsletter',
      },
    ],
  },
  'c114.com.cn': {
    _name: 'C114通信网',
    '.': [
      {
        title: '滚动新闻',
        docs: 'https://docs.rsshub.app/new-media.html#c114-tong-xin-wang-gun-dong-xin-wen',
        source: ['/news/roll.asp', '/'],
        target: '/c114/roll',
      },
    ],
  },
  'caai.cn': {
    _name: '中国人工智能学会',
    '.': [
      {
        title: '学会动态',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-ren-gong-zhi-neng-xue-hui',
        source: ['/index.php'],
        target: (_, url) => `/caai/${url.match(/\/(\d+)\.html/)[1]}`,
      },
    ],
  },
  'caareviews.org': {
    _name: 'caa.reviews',
    '.': [
      {
        title: 'Book Reviews',
        docs: 'https://docs.rsshub.app/journal.html#caa-reviews',
        source: ['/reviews/book'],
        target: '/caareviews/book',
      },
      {
        title: 'Exhibition Reviews',
        docs: 'https://docs.rsshub.app/journal.html#caa-reviews',
        source: ['/reviews/exhibition'],
        target: '/caareviews/exhibition',
      },
      {
        title: 'Essays',
        docs: 'https://docs.rsshub.app/journal.html#caa-reviews',
        source: ['/reviews/essay'],
        target: '/caareviews/essay',
      },
    ],
  },
  'cahkms.org': {
    _name: '全国港澳研究会',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#quan-guo-gang-ao-yan-jiu-hui-fen-lei',
        source: '/',
        target: '/cahkms/:category?',
      },
    ],
  },
  'caijing.com.cn': {
    _name: '财经网',
    roll: [
      {
        title: '滚动新闻',
        docs: 'https://docs.rsshub.app/finance.html#cai-jing-wang',
        source: ['/index1.html', '/'],
        target: '/caijing/roll',
      },
    ],
  },
  'caixin.com': {
    _name: '财新网',
    '.': [
      {
        title: '新闻分类',
        docs: 'https://docs.rsshub.app/traditional-media.html#cai-xin-wang',
      },
      {
        title: '首页新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#cai-xin-wang',
        source: ['/'],
        target: '/caixin/article',
      },
      {
        title: '最新文章',
        docs: 'https://docs.rsshub.app/traditional-media.html#cai-xin-wang',
        source: ['/'],
        target: '/caixin/latest',
      },
      {
        title: '用户博客',
        docs: 'https://docs.rsshub.app/blog.html#cai-xin-bo-ke',
      },
    ],
    database: [
      {
        title: '财新数据通',
        docs: 'https://docs.rsshub.app/traditional-media.html#cai-xin-wang',
        source: ['/news', '/'],
        target: '/caixin/database',
      },
    ],
    k: [
      {
        title: '财新一线',
        docs: 'https://docs.rsshub.app/traditional-media.html#cai-xin-wang',
        source: ['/web', '/'],
        target: '/caixin/database',
      },
    ],
  },
  'cankaoxiaoxi.com': {
    _name: '参考消息',
    china: [
      {
        title: '中国新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#can-kao-xiao-xi',
        source: ['/'],
        target: '/cankaoxiaoxi/news/china_news',
      },
    ],
    culture: [
      {
        title: '文化新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#can-kao-xiao-xi',
        source: ['/'],
        target: '/cankaoxiaoxi/news/culture_news',
      },
    ],
    finance: [
      {
        title: '财经新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#can-kao-xiao-xi',
        source: ['/'],
        target: '/cankaoxiaoxi/news/finance_news',
      },
    ],
    mil: [
      {
        title: '军事新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#can-kao-xiao-xi',
        source: ['/'],
        target: '/cankaoxiaoxi/news/military_news',
      },
    ],
    science: [
      {
        title: '科技新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#can-kao-xiao-xi',
        source: ['/'],
        target: '/cankaoxiaoxi/news/technology_news',
      },
    ],
    tw: [
      {
        title: '台海新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#can-kao-xiao-xi',
        source: ['/'],
        target: '/cankaoxiaoxi/news/taiwan_news',
      },
    ],
    world: [
      {
        title: '国际新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#can-kao-xiao-xi',
        source: ['/'],
        target: '/cankaoxiaoxi/news/world_news',
      },
    ],
  },
  'cartoonmad.com': {
    _name: '動漫狂',
    '.': [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-kuang',
        source: ['/comic/:id'],
        target: '/cartoonmad/comic/:id',
      },
    ],
  },
  'cas.cn': {
    _name: '中国科学院',
    www: [
      {
        title: '成果转化',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-yuan',
        source: ['/cg/:caty?'],
        target: '/cas/cg/:caty?',
      },
    ],
    'www.sim': [
      {
        title: '上海微系统与信息技术研究所 - 科技进展',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-yuan',
        source: ['/xwzx2016/kyjz/', '/'],
        target: '/cas/sim/kyjz',
      },
    ],
    'www.iee': [
      {
        title: '电工研究所 科研动态',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-yuan',
        source: ['/xwzx/kydt', '/'],
        target: '/cas/iee/kydt',
      },
    ],
  },
  'mesalab.cn': {
    _name: '中国科学院',
    www: [
      {
        title: '信息工程研究所 第二研究室 处理架构组 知识库',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-yuan',
        source: ['/f/article/articleList', '/'],
        target: '/cas/mesalab/kb',
      },
    ],
  },
  'cast.org.cn': {
    _name: '中国科学技术协会',
    '.': [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-ke-xue-ji-shu-xie-hui',
        source: ['/col/:column/index.html'],
        target: (params) => `/cast/${params.column.replace('col', '')}`,
      },
    ],
  },
  'cbirc.gov.cn': {
    _name: '中国银行保险监督管理委员会',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-yin-xing-bao-xian-jian-du-guan-li-wei-yuan-hui',
        source: ['/:category', '/'],
        target: '/cbirc/:category?',
      },
    ],
  },
  'cbnweek.com': {
    _name: '第一财经杂志',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/finance.html#di-yi-cai-jing-za-zhi-shou-ye',
        source: ['/'],
        target: '/cbnweek',
      },
    ],
  },
  'ccac.org.mo': {
    _name: '澳门廉政公署',
    '.': [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/government.html#ao-men-lian-zheng-gong-shu',
        source: ['/:lang/news.html'],
        target: '/ccac/news/all/:lang',
      },
    ],
  },
  'ccf.org.cn': {
    _name: '中国计算机学会',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-ji-suan-ji-xue-hui',
        source: ['/:category', '/'],
        target: '/ccf/news/:category',
      },
    ],
    ccfcv: [
      {
        title: '计算机视觉专委会 - 学术动态 - 学术前沿',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-ji-suan-ji-xue-hui',
        source: ['/ccfcv/xsdt/xsqy/'],
        target: '/ccf/ccfcv/xsdt/xsqy',
      },
      {
        title: '计算机视觉专委会 - 学术动态 - 热点征文',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-ji-suan-ji-xue-hui',
        source: ['/ccfcv/xsdt/rdzw/'],
        target: '/ccf/ccfcv/xsdt/rdzw',
      },
      {
        title: '计算机视觉专委会 - 学术动态 - 学术会议',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-ji-suan-ji-xue-hui',
        source: ['/ccfcv/xsdt/xshy/'],
        target: '/ccf/ccfcv/xsdt/xshy',
      },
    ],
    tfbd: [
      {
        title: '大数据专家委员会',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-ji-suan-ji-xue-hui',
        source: ['/tfbd/:caty/:id', '/'],
        target: '/ccf/tfbd/:caty/:id',
      },
    ],
  },
  'ccreports.com.cn': {
    _name: '消费者报道',
    www: [
      {
        title: '要闻',
        docs: 'https://docs.rsshub.app/shopping.html#xiao-fei-zhe-bao-dao-yao-wen',
        source: ['/'],
        target: '/ccreports/article',
      },
    ],
  },
  'cctv.com': {
    _name: 'CCTV',
    navi: [
      {
        title: '栏目订阅',
        docs: 'https://docs.rsshub.app/multimedia.html#cntv-lan-mu',
        source: ['/'],
        target: '/cntv/:column',
      },
    ],
  },
  'cde.org.cn': {
    _name: '国家药品监督管理局药品审评中心',
    www: [
      {
        title: '政务新闻',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/news/listpage/545cf855a50574699b46b26bcb165f32'],
        target: '/cde/news/zwxw',
      },
      {
        title: '要闻导读',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/news/listpage/1e0a362d64015ebcbf32d6949acbba11'],
        target: '/cde/news/ywdd',
      },
      {
        title: '图片新闻',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/news/listpage/4b49e3142441860ac6a48c888a54712a'],
        target: '/cde/news/tpxw',
      },
      {
        title: '工作动态',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/news/listpage/3cc45b396497b598341ce3af000490e5'],
        target: '/cde/news/gzdt',
      },
      {
        title: '法律法规',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/policy/listpage/9f9c74c73e0f8f56a8bfbc646055026d'],
        target: '/cde/policy/flfg',
      },
      {
        title: '中心规章',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/policy/listpage/369ac7cfeb67c6000c33f85e6f374044'],
        target: '/cde/policy/zxgz',
      },
      {
        title: '优先审评公示 - 信息公开',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/xxgk/listpage/2f78f372d351c6851af7431c7710a731'],
        target: '/cde/xxgf/priorityApproval',
      },
      {
        title: '突破性治疗公示 - 信息公开',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/xxgk/listpage/da6efd086c099b7fc949121166f0130c'],
        target: '/cde/xxgf/breakthroughCure',
      },
      {
        title: '临床试验默示许可 - 信息公开',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/xxgk/listpage/4b5255eb0a84820cef4ca3e8b6bbe20c'],
        target: '/cde/xxgf/cliniCal',
      },
      {
        title: '发布通告 - 指导原则专栏',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/xxgk/listpage/2853510d929253719601db17b8a9fd81'],
        target: '/cde/zdyz/domesticGuide',
      },
      {
        title: '征求意见 - 指导原则专栏',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-shen-ping-wang-zhan-shou-ye',
        source: ['/main/xxgk/listpage/3c49fad55caad7a034c263cfc2b6eb9c'],
        target: '/cde/zdyz/opinionList',
      },
    ],
  },
  'cdi.com.cn': {
    _name: '国家高端智库 / 综合开发研究院',
    '.': [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/new-media.html#guo-jia-gao-duan-zhi-ku-zong-he-kai-fa-yan-jiu-yuan',
        source: ['/Article/List', '/'],
        target: (params, url) =>
          `/cdi/${new URL(url).searchParams.get('ColumnId')}`,
      },
    ],
  },
  'cdzjryb.com': {
    _name: '成都住建蓉 e 办',
    zw: [
      {
        title: '商品住房购房登记',
        docs: 'https://docs.rsshub.app/other.html#cheng-dou-zhu-jian-rong-e-ban',
        source: ['/lottery/accept/projectList', '/'],
        target: '/cdzjryb/zw/projectList',
      },
    ],
  },
  'cebbank.com': {
    _name: '中国光大银行',
    '.': [
      {
        title: '外汇牌价 - 牌价总览',
        docs: 'https://docs.rsshub.app/new-media.html#eprice',
        source: ['/eportal/ui?pageId=477257'],
        target: '/quotation/all',
      },
      {
        title: '外汇牌价 - 历史记录',
        docs: 'https://docs.rsshub.app/new-media.html#eprice',
        source: ['/site/ygzx/whpj/rmbwhpjlspj/index.html?currcode=:id'],
        target: ({ id }) => `/quotation/${id}`,
      },
    ],
  },
  'chaincatcher.com': {
    _name: '链捕手 ChainCatcher',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#lian-bu-shou-chaincatcher',
        source: ['/'],
        target: '/chaincatcher',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#lian-bu-shou-chaincatcher',
        source: ['/news', '/'],
        target: '/chaincatcher/news',
      },
    ],
  },
  'changba.com': {
    _name: '唱吧',
    '.': [
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/social-media.html#chang-ba',
        source: ['/s/:userid'],
        target: '/changba/:userid',
      },
    ],
  },
  'chaoxing.com': {
    _name: '超星',
    '.': [
      {
        title: '期刊',
        docs: 'https://docs.rsshub.app/reading.html#chao-xing-qi-kan',
        source: ['/'],
        target: (params, url) =>
          `/chaoxing/qk/${new URL(url).searchParams.get('mags')}`,
      },
    ],
  },
  'chaping.cn': {
    _name: '差评',
    '.': [
      {
        title: '图片墙',
        docs: 'https://docs.rsshub.app/new-media.html#cha-ping',
        source: ['/'],
        target: '/chaping/banner',
      },
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#cha-ping',
        source: ['/news'],
        target: (params, url) => {
          const cateList = ['15', '3', '7', '5', '6', '1', '8', '9'];
          const cate = new URL(url).searchParams.get('cate');
          if (cateList.includes(cate)) {
            return `/chaping/news/${cate}`;
          }
        },
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#cha-ping',
        source: ['/newsflash'],
        target: '/chaping/newsflash',
      },
    ],
  },
  'china.com': {
    _name: '中华网',
    military: [
      {
        title: '军事新闻',
        docs: 'https://docs.rsshub.app/new-media.html#zhong-hua-wang',
        source: '/news',
        target: '/china/news/military',
      },
    ],
    news: [
      {
        title: '时事新闻',
        docs: 'https://docs.rsshub.app/new-media.html#zhong-hua-wang',
        source: '/:category',
        target: '/china/news/:category?',
      },
    ],
  },
  'chinacef.cn': {
    _name: '首席经济学家论坛',
    '.': [
      {
        title: '最新文章列表',
        docs: 'https://docs.rsshub.app/finance.html#shou-xi-jing-ji-xue-jia-lun-tan',
        source: ['/'],
        target: '/chinacef',
      },
      {
        title: '专家文章',
        docs: 'https://docs.rsshub.app/finance.html#shou-xi-jing-ji-xue-jia-lun-tan-zhuan-jia',
        source: ['/index.php/experts/zjmain/experts_id/:experts_id'],
        target: '/chinacef/:experts_id',
      },
      {
        title: '金融热点',
        docs: 'https://docs.rsshub.app/finance.html#shou-xi-jing-ji-xue-jia-lun-tan-jin-rong-re-dian',
        source: ['/index.php/index/index'],
        target: '/chinacef/portal/hot',
      },
    ],
  },
  'chinadegrees.com.cn': {
    _name: '中华人民共和国学位证书查询',
    '.': [
      {
        title: '各学位授予单位学位证书上网进度',
        docs: 'https://docs.rsshub.app/study.html#zhong-hua-ren-min-gong-he-guo-xue-wei-zheng-shu-cha-xun',
        source: ['/help/*province'],
        target: (params) =>
          `/chinadegrees/${params.province
            .replace('unitSwqk', '')
            .replace('.html', '')}`,
      },
    ],
  },
  'chinafactcheck.com': {
    _name: '有据',
    '.': [
      {
        title: '最新文章列表',
        docs: 'https://docs.rsshub.app/other.html#you-ju-zui-xin-wen-zhang-lie-biao',
        source: ['/'],
        target: '/chinafactcheck',
      },
    ],
  },
  'chinanews.com.cn': {
    _name: '中国新闻网',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/traditional-media.html#zhong-xin-wang',
        source: ['/'],
        target: '/chinanews',
      },
    ],
  },
  'chinathinktanks.org.cn': {
    _name: '中国智库网',
    www: [
      {
        title: '观点与实践',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-zhi-ku-wang',
        source: '',
        target: (params, url) =>
          `/chinathinktanks/${new URL(url).searchParams.get('id')}`,
      },
    ],
  },
  'chinaventure.com.cn': {
    _name: '投中网',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#tou-zhong-wang',
        source: ['/'],
        target: '/chinaventure',
      },
    ],
  },
  'chsi.com.cn': {
    _name: '中国研究生招生信息网',
    yz: [
      {
        title: '考研动态',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-yan-jiu-sheng-zhao-sheng-xin-xi-wang',
        source: ['/kyzx/kydt'],
        target: '/chsi/kydt',
      },
    ],
  },
  'ciidbnu.org': {
    _name: '中国收入分配研究院',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#',
        source: ['/new1.asp', '/'],
        target: (_params, url) =>
          `/ciidbnu/${new URL(url).searchParams.get('pagetype')}`,
      },
    ],
  },
  'github.com': {
    _name: 'GitHub',
    '.': [
      {
        title: '仓库 Branches',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: ['/:user/:repo/branches', '/:user/:repo'],
        target: '/github/branches/:user/:repo',
      },
      {
        title: 'Issues / Pull Requests 评论',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: ['/:user/:repo/:type/:number'],
        target: '/github/comments/:user/:repo/:number',
      },
      {
        title: '仓库 Contributors',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: ['/:user/:repo/graphs/contributors', '/:user/:repo'],
        target: '/github/contributors/:user/:repo',
      },
      {
        title: '文件 Commits',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: '/:user/:repo/blob/:branch/*filepath',
        target: '/github/file/:user/:repo/:branch/:filepath',
      },
      {
        title: '仓库 Issue',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: [
          '/:user/:repo/issues',
          '/:user/:repo/issues/:id',
          '/:user/:repo',
        ],
        target: '/github/issue/:user/:repo',
      },
      {
        title: '仓库 Pull Requests',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: [
          '/:user/:repo/pulls',
          '/:user/:repo/pulls/:id',
          '/:user/:repo',
        ],
        target: '/github/pull/:user/:repo',
      },
      {
        title: '用户仓库',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: '/:user',
        target: '/github/repos/:user',
      },
      {
        title: '仓库 Stars',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: ['/:user/:repo/stargazers', '/:user/:repo'],
        target: '/github/stars/:user/:repo',
      },
      {
        title: '用户 Starred Repositories',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: '/:user',
        target: '/github/starred_repos/:user',
      },
      {
        title: 'Topics',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: '/topics',
        target: '/github/topics/:name/:qs?',
      },
      {
        title: 'Trending',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: '/trending',
        target: '/github/trending/:since',
      },
      {
        title: '用户 Followers',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: '/:user',
        target: '/github/user/followers/:user',
      },
      {
        title: 'Wiki 历史',
        docs: 'https://docs.rsshub.app/programming.html#github',
        source: [
          '/:user/:repo/wiki/:page/_history',
          '/:user/:repo/wiki/:page',
          '/:user/:repo/wiki/_history',
          '/:user/:repo/wiki',
        ],
        target: '/github/wiki/:user/:repo/:page',
      },
    ],
  },
  'clickme.net': {
    _name: 'ClickMe',
    '.': [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/other.html#clickme',
        source: ['/:grouping/:name'],
        target: (params) =>
          `/clickme/default/${params.grouping === 't' ? 'tag' : 'category'}/${
            params.name
          }`,
      },
    ],
    r18: [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/other.html#clickme',
        source: ['/:grouping/:name'],
        target: (params) =>
          `/clickme/r18/${params.grouping === 't' ? 'tag' : 'category'}/${
            params.name
          }`,
      },
    ],
  },
  'cmde.org.cn': {
    _name: '国家药品监督管理局医疗器械技术审评中心',
    www: [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-jian-du-guan-li-ju-yi-liao-qi-xie-ji-shu-shen-ping-zhong-xin',
        source: ['/*cate'],
        target: (params) => `/cmde/${params.cate.replace('/index.html', '')}`,
      },
    ],
  },
  'cn-healthcare.com': {
    _name: '健康界',
    '.': [
      {
        title: '首页-资讯',
        docs: 'https://docs.rsshub.app/new-media.html#jian-kang-jie',
        source: ['/'],
        target: '/cn-healthcare/index',
      },
    ],
  },
  'cnbc.com': {
    _name: 'CNBC',
    search: [
      {
        title: '全文 RSS',
        docs: 'https://docs.rsshub.app/traditional-media.html#cnbc',
        source: ['/rs/search/combinedcms/view.xml'],
        target: (_, url) => `/cnbc/rss/${new URL(url).searchParams.get('id')}`,
      },
    ],
    www: [
      {
        title: '全文 RSS',
        docs: 'https://docs.rsshub.app/traditional-media.html#cnbc',
        source: ['/id/:id/device/rss/rss.html'],
        target: '/cnbc/rss/:id',
      },
    ],
  },
  'cnbeta.com.tw': {
    _name: 'cnBeta.COM',
    '.': [
      {
        title: '头条资讯',
        docs: 'https://docs.rsshub.app/new-media.html#cnbeta-com-tou-tiao-zi-xun',
        source: ['/'],
        target: '/cnbeta',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#cnbeta-com-fen-lei',
        source: ['/category/:id', '/'],
        target: '/cnbeta/category/:id',
      },
      {
        title: '主题',
        docs: 'https://docs.rsshub.app/new-media.html#cnbeta-com-zhu-ti',
        source: ['/topics/:id', '/'],
        target: '/cnbeta/topics/:id',
      },
    ],
  },
  'cnblogs.com': {
    _name: '博客园',
    www: [
      {
        title: '10天推荐排行榜',
        docs: 'https://docs.rsshub.app/blog.html#博客园',
        source: ['/aggsite/topdiggs'],
        target: '/cnblogs/aggsite/topdiggs',
      },
      {
        title: '48小时阅读排行',
        docs: 'https://docs.rsshub.app/blog.html#博客园',
        source: ['/aggsite/topviews'],
        target: '/cnblogs/aggsite/topviews',
      },
      {
        title: '编辑推荐',
        docs: 'https://docs.rsshub.app/blog.html#博客园',
        source: ['/aggsite/headline'],
        target: '/cnblogs/aggsite/headline',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/blog.html#博客园',
        source: ['/cate/:type'],
        target: '/cnblogs/cate/:type',
      },
      {
        title: '精华区',
        docs: 'https://docs.rsshub.app/blog.html#博客园',
        source: ['/pick'],
        target: '/cnblogs/pick',
      },
    ],
  },
  'cncf.io': {
    _name: 'CNCF',
    '.': [
      {
        title: 'Blog',
        docs: 'https://docs.rsshub.app/programming.html#cncf',
        source: ['/blog'],
        target: '/cncf/blog',
      },
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/programming.html#cncf',
        source: ['/news'],
        target: '/cncf/news',
      },
      {
        title: 'Announcements',
        docs: 'https://docs.rsshub.app/programming.html#cncf',
        source: ['/announcements'],
        target: '/cncf/announcements',
      },
      {
        title: 'Reports',
        docs: 'https://docs.rsshub.app/programming.html#cncf',
        source: ['/reports'],
        target: '/cncf/reports',
      },
    ],
  },
  'cngal.org': {
    _name: 'CnGal',
    www: [
      {
        title: '每周速报',
        docs: 'https://docs.rsshub.app/anime.html#cngal-mei-zhou-su-bao',
        source: ['/', '/weeklynews'],
        target: '/cngal/weekly',
      },
      {
        title: '制作者/游戏新闻',
        docs: 'https://docs.rsshub.app/anime.html#cngal-zhi-zuo-zhe-you-xi-xin-wen',
        source: ['/entries/index/:id'],
        target: '/cngal/entry/:id',
      },
    ],
  },
  'cnjxol.com': {
    _name: '南湖清风',
    '.': [
      {
        title: '嘉兴日报',
        docs: 'https://docs.rsshub.app/traditional-media.html#nan-hu-qing-feng-jia-xing-ri-bao',
        source: ['/'],
        target: '/cnjxol/jxrb/:id',
      },
      {
        title: '南湖晚报',
        docs: 'https://docs.rsshub.app/traditional-media.html#nan-hu-qing-feng-nan-hu-wan-bao',
        source: ['/'],
        target: '/cnjxol/nhwb/:id',
      },
    ],
  },
  'cnki.net': {
    _name: '中国知网',
    navi: [
      {
        title: '期刊',
        docs: 'https://docs.rsshub.app/journal.html#zhong-guo-zhi-wang-qi-kan',
        source: ['/knavi/journals/:name/detail'],
        target: '/cnki/journals/:name',
      },
      {
        title: '网络首发',
        docs: 'https://docs.rsshub.app/journal.html#zhong-guo-zhi-wang-wang-luo-shou-fa',
        source: ['/knavi/journals/:name/detail'],
        target: '/cnki/journals/debut/:name',
      },
    ],
    kns: [
      {
        title: '作者期刊文献',
        docs: 'https://docs.rsshub.app/journal.html#zhong-guo-zhi-wang-zuo-zhe-qi-kan-wen-xian',
        source: ['/kcms/detail/knetsearch.aspx', '/'],
        target: (_, url) =>
          `/cnki/author/${new URL(url).searchParams.get('code')}`,
      },
    ],
  },
  'cntheory.com': {
    _name: '理论网',
    paper: [
      {
        title: '学习时报',
        docs: 'https://docs.rsshub.app/traditional-media.html#li-lun-wang-xue-xi-shi-bao',
        source: ['/'],
        target: (params, url) =>
          `/cntheory/paper/${new URL(url).toString().match(/-(\w+)\.htm/)[1]}`,
      },
    ],
  },
  'codeforces.com': {
    _name: 'Codeforces',
    '.': [
      {
        title: 'Recent Actions',
        docs: 'https://docs.rsshub.app/programming.html#codeforces-recent-actions',
        source: ['/recent-actions'],
        target: '/codeforces/recent-actions',
      },
    ],
    www: [
      {
        title: '最新比赛',
        docs: 'https://docs.rsshub.app/programming.html#codeforces-zui-xin-bi-sai',
        source: ['/contests'],
        target: '/codeforces/contests',
      },
    ],
  },
  'coindesk.com': {
    _name: 'CoinDesk',
    '.': [
      {
        title: 'Coindesk Consensus Magazine',
        docs: 'https://docs.rsshub.app/new-media.html#coindesk-consensus-magazine',
        source: ['/'],
        target: '/coindesk/consensus-magazine',
      },
    ],
  },
  'comicskingdom.com': {
    _name: 'Comics Kingdom',
    '.': [
      {
        title: 'Archive',
        docs: 'https://docs.rsshub.app/anime.html#comics-kingdom',
        source: ['/:name/*', '/:name'],
        target: '/comicskingdom/:name',
      },
    ],
  },
  'consumer.org.hk': {
    _name: '消费者委员会',
    '.': [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/new-media.html#xiao-fei-zhe-wei-yuan-hui-wen-zhang',
        source: ['/'],
        target: '/consumer/:category?/:language?/:keyword?',
      },
    ],
  },
  'cool18.com': {
    _name: '酷 18',
    '.': [
      {
        title: '分站',
        docs: 'https://docs.rsshub.app/picture.html#cool-18',
        source: '/',
        target: '/cool18/:id?/:type?/:keyword?',
      },
    ],
  },
  'coolapk.com': {
    _name: '酷安',
    '.': [
      {
        title: '图文',
        docs: 'https://docs.rsshub.app/social-media.html#ku-an',
      },
      {
        title: '头条',
        docs: 'https://docs.rsshub.app/social-media.html#ku-an',
      },
      {
        title: '看看号',
        docs: 'https://docs.rsshub.app/social-media.html#ku-an',
      },
      {
        title: '话题',
        docs: 'https://docs.rsshub.app/social-media.html#ku-an',
      },
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/social-media.html#ku-an',
      },
      {
        title: '热榜',
        docs: 'https://docs.rsshub.app/social-media.html#ku-an',
      },
    ],
  },
  'coomer.party': {
    _name: 'Coomer',
    '.': [
      {
        title: 'Artist',
        docs: 'https://docs.rsshub.app/multimedia.html#coomer-artist',
        source: ['/onlyfans/user/:id', '/'],
        target: '/coomer/artist/:id',
      },
      {
        title: 'Recent Posts',
        docs: 'https://docs.rsshub.app/multimedia.html#coomer-recent-posts',
        source: ['/posts', '/'],
        target: '/coomer/posts',
      },
    ],
  },
  'copymanga.com': {
    _name: '拷贝漫画',
    '.': [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kao-bei-man-hua',
        source: '/comic/:id',
        target: '/copymanga/comic/:id/5',
      },
    ],
  },
  'copymanga.info': {
    _name: '拷贝漫画',
    '.': [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kao-bei-man-hua',
        source: '/comic/:id',
        target: '/copymanga/comic/:id/5',
      },
    ],
  },
  'copymanga.net': {
    _name: '拷贝漫画',
    '.': [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kao-bei-man-hua',
        source: '/comic/:id',
        target: '/copymanga/comic/:id/5',
      },
    ],
  },
  'copymanga.org': {
    _name: '拷贝漫画',
    '.': [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kao-bei-man-hua',
        source: '/comic/:id',
        target: '/copymanga/comic/:id/5',
      },
    ],
  },
  'copymanga.site': {
    _name: '拷贝漫画',
    '.': [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kao-bei-man-hua',
        source: '/comic/:id',
        target: '/copymanga/comic/:id/5',
      },
    ],
  },
  'ey.gov.tw': {
    _name: '行政院消费者保护会',
    cpc: [
      {
        title: '新闻稿',
        docs: 'https://docs.rsshub.app/government.html#tai-wan-xing-zheng-yuan-xiao-fei-zhe-bao-hu-hui',
        source: '/Page/:type',
        target: (params) => {
          if (params.type === 'A3412E2A5A7B398F') {
            return '/cycey/xwg';
          }
        },
      },
      {
        title: '消费资讯',
        docs: 'https://docs.rsshub.app/government.html#tai-wan-xing-zheng-yuan-xiao-fei-zhe-bao-hu-hui',
        source: '/Page/:type',
        target: (params) => {
          if (params.type === 'E414CC218269CCE8') {
            return '/cycey/xfzx';
          }
        },
      },
    ],
  },
  'cpuid.com': {
    _name: 'CPUID',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/program-update.html#cpuid',
        source: ['/news.html', '/'],
        target: '/cpuid/news',
      },
    ],
  },
  'cqwu.net': {
    _name: '重庆文理学院',
    www: [
      {
        title: '通知',
        docs: 'https://docs.rsshub.app/university.html#chong-qing-wen-li-xue-yuan',
        source: '/:type',
        target: (params) => {
          if (params.type === 'channel_7721.html') {
            return '/cqwu/news/notify';
          }
        },
      },
      {
        title: '学术活动',
        docs: 'https://docs.rsshub.app/university.html#chong-qing-wen-li-xue-yuan',
        source: '/:type',
        target: (params) => {
          if (params.type === 'channel_7722.html') {
            return '/cqwu/news/academiceve';
          }
        },
      },
    ],
  },
  'crac.org.cn': {
    _name: '中国无线电协会业余无线电分会',
    www: [
      {
        title: '最新资讯',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-wu-xian-dian-xie-hui-ye-yu-wu-xian-dian-fen-hui',
        source: '/News/List',
        target: (params, url) =>
          `/crac/${new URL(url).searchParams.get('type') || ''}`,
      },
    ],
  },
  'creative-comic.tw': {
    _name: 'CCC 創作集',
    '.': [
      {
        title: '漫畫',
        docs: 'https://docs.rsshub.app/anime.html#ccc-chuang-zuo-ji',
        source: ['/book/:id/*'],
        target: '/creative-comic/:id',
      },
    ],
  },
  'crossbell.io': {
    _name: 'Crossbell',
    '.': [
      {
        title: 'Notes',
        docs: 'https://docs.rsshub.app/social-media.html#crossbell',
        source: '/*',
        target: '/crossbell/notes',
      },
    ],
  },
  'xlog.app': {
    _name: 'xLog',
    '.': [
      {
        title: 'Notes',
        docs: 'https://docs.rsshub.app/social-media.html#crossbell',
        source: '/*',
        target: '/crossbell/notes/source/xlog',
      },
    ],
  },
  'csc.edu.cn': {
    _name: '国家留学网',
    www: [
      {
        title: '遴选通知',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-liu-xue-wang',
        source: '/*',
        target: '/csc/notice/lxtz',
      },
      {
        title: '综合项目专栏',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-liu-xue-wang',
        source: '/*',
        target: '/csc/notice/xmzl',
      },
      {
        title: '常见问题解答',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-liu-xue-wang',
        source: '/*',
        target: '/csc/notice/wtjd',
      },
      {
        title: '录取公告',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-liu-xue-wang',
        source: '/*',
        target: '/csc/notice/lqgg',
      },
    ],
  },
  'cscse.edu.cn': {
    _name: '中国留学网',
    '.': [
      {
        title: '通知公告',
        docs: 'https://docs.rsshub.app/study.html#zhong-guo-liu-xue-wang-tong-zhi-gong-gao',
        source: ['/cscse/index/tzgg', '/'],
        target: '/cscse/tzgg',
      },
    ],
  },
  'csdn.net': {
    _name: 'CSDN',
    blog: [
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/blog.html#csdn',
        source: ['/:user'],
        target: '/csdn/blog/:user',
      },
    ],
  },
  'csu.edu.cn': {
    _name: '中南大学',
    career: [
      {
        title: '就业信息网招聘信息',
        docs: 'https://docs.rsshub.app/university.html#zhong-nan-da-xue',
        source: ['/campus/index/category/1', '/campus', '/'],
        target: '/csu/career',
      },
    ],
    cse: [
      {
        title: '计算机学院',
        docs: 'https://docs.rsshub.app/university.html#zhong-nan-da-xue',
        source: ['/index/:type'],
        target: (params) => `/csu/cse/${params.type.substring(0, 4)}`,
      },
    ],
    oa: [
      {
        title: '校长信箱',
        docs: 'https://docs.rsshub.app/university.html#zhong-nan-da-xue',
        source: ['/mailbox/NoAuth/MailList_Pub'],
        target: (_, url) => `/csu/mail/${new URL(url).searchParams.get('tp')}`,
      },
    ],
  },
  'cts.com.tw': {
    _name: '華視',
    news: [
      {
        title: '新聞',
        docs: 'https://docs.rsshub.app/traditional-media.html#hua-shi-xin-wen',
        source: '/:category/index.html',
        target: '/cts/:category',
      },
    ],
  },
  'cuc.edu.cn': {
    _name: '中国传媒大学',
    yz: [
      {
        title: '研究生招生网',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-chuan-mei-da-xue',
        source: '/*',
        target: '/',
      },
    ],
  },
  'curius.app': {
    _name: 'Curius',
    '.': [
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/social-media.html#curius',
        source: '/:name',
        target: '/curius/links/:name',
      },
    ],
  },
  'cw.com.tw': {
    _name: '天下雜誌',
    '.': [
      {
        title: '最新上線',
        docs: 'https://docs.rsshub.app/traditional-media.html#tian-xia-za-zhi',
        source: ['/today', '/'],
        target: '/cw/today',
      },
      {
        title: '主頻道',
        docs: 'https://docs.rsshub.app/traditional-media.html#tian-xia-za-zhi',
        source: ['/masterChannel.action'],
        target: (_, url) =>
          `/cw/master/${new URL(url).searchParams.get('idMasterChannel')}`,
      },
      {
        title: '子頻道',
        docs: 'https://docs.rsshub.app/traditional-media.html#tian-xia-za-zhi',
        source: ['/subchannel.action'],
        target: (_, url) =>
          `/cw/sub/${new URL(url).searchParams.get('idSubChannel')}`,
      },
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/traditional-media.html#tian-xia-za-zhi',
        source: ['/author/:channel'],
        target: '/cw/author/:channel',
      },
    ],
  },
  'dahecube.com': {
    _name: '大河财立方',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#da-he-cai-li-fang',
        source: ['/channel.html?recid=:id', '/index.html?recid=:id'],
        target: ({ id }) => {
          let type = 'recommend';
          Object.entries(utils.TYPE).forEach(([key, value]) => {
            if (value.id === id) {
              type = key;
            }
          });
          return `/dahecube/${type}`;
        },
      },
    ],
  },
  'dapenti.com': {
    _name: '喷嚏',
    '.': [
      {
        title: '图卦',
        docs: 'https://docs.rsshub.app/picture.html#pen-ti',
        source: ['/blog/blog.asp'],
        target: (params, url) => {
          if (new URL(url).searchParams.get('subjectid') === '70') {
            return '/dapenti/tugua';
          }
        },
      },
      {
        title: '主题',
        docs: 'https://docs.rsshub.app/picture.html#pen-ti',
        source: ['/blog/blog.asp'],
        target: (params, url) => {
          if (new URL(url).searchParams.get('subjectid')) {
            return (
              '/dapenti/subject/' + new URL(url).searchParams.get('subjectid')
            );
          }
        },
      },
    ],
  },
  'darwinawards.com': {
    _name: 'Darwin Awards',
    '.': [
      {
        title: 'Award Winners',
        docs: 'https://docs.rsshub.app/other.html#darwin-awards-award-winners',
        source: ['/darwin', '/'],
        target: '/darwinawards',
      },
    ],
  },
  'dayanzai.me': {
    _name: '大眼仔旭',
    '.': [
      {
        title: '大眼仔旭',
        docs: 'https://docs.rsshub.app/bbs.html#dayanzai',
        source: ['/:category', '/:category/*'],
        target: '/dayanzai/:category',
      },
    ],
  },
  'buxiuse.com': {
    _name: '不羞涩',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/picture.html#bu-xiu-se',
        source: '/',
        target: (_params, url) =>
          `/dbmv${
            new URL(url).searchParams.has('cid')
              ? `/${new URL(url).searchParams.get('cid')}`
              : ''
          }`,
      },
    ],
  },
  'dcard.tw': {
    _name: 'Dcard',
    www: [
      {
        title: '首頁帖子-最新',
        docs: 'https://docs.rsshub.app/bbs.html#dcard',
        source: '/f',
        target: '/dcard/posts/latest',
      },
      {
        title: '首頁帖子-熱門',
        docs: 'https://docs.rsshub.app/bbs.html#dcard',
        source: '/f',
        target: '/dcard/posts/popular',
      },
      {
        title: '板塊帖子-最新',
        docs: 'https://docs.rsshub.app/bbs.html#dcard',
        source: '/f/:section',
        target: '/dcard/:section/latest',
      },
      {
        title: '板塊帖子-熱門',
        docs: 'https://docs.rsshub.app/bbs.html#dcard',
        source: '/f/:section',
        target: '/dcard/:section/popular',
      },
    ],
  },
  'dcfever.com': {
    _name: 'DCFever',
    '.': [
      {
        title: '新聞中心',
        docs: 'https://docs.rsshub.app/new-media.html#dcfever',
        source: ['/news/index.php', '/'],
        target: (_, url) => {
          const searchParams = new URL(url).searchParams;
          return `/dcfever/news${
            searchParams.has('type')
              ? `/${new URL(url).searchParams.get('type')}`
              : ''
          }`;
        },
      },
      {
        title: '測試報告',
        docs: 'https://docs.rsshub.app/new-media.html#dcfever',
        source: ['/:type/reviews.php'],
        target: '/dcfever/reviews/:type',
      },
      {
        title: '二手市集',
        docs: 'https://docs.rsshub.app/new-media.html#dcfever',
        source: ['/trading/listing.php'],
        target: (_, url) =>
          `/dcfever/trading/${new URL(url).searchParams.get('id')}`,
      },
      {
        title: '二手市集 - 物品搜尋',
        docs: 'https://docs.rsshub.app/new-media.html#dcfever',
        source: ['/trading/search.php'],
        target: (_, url) => {
          const searchParams = new URL(url).searchParams;
          return `/dcfever/trading/search/${searchParams.get('keyword')}${
            searchParams.has('main_cat')
              ? `/${searchParams.get('main_cat')}`
              : ''
          }`;
        },
      },
    ],
  },
  'www.ddosi.org': {
    _name: '🔰雨苁ℒ🔰',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/blog.html#yu-cong-bo-ke-shou-ye',
        source: ['/'],
        target: '/ddosi/',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/blog.html#yu-cong-bo-ke-fen-lei',
        source: ['/category/:category/'],
        target: '/ddosi/category/:category',
      },
    ],
  },
  'dedao.cn': {
    _name: '得到',
    '.': [
      {
        title: '知识城邦',
        docs: 'https://docs.rsshub.app/new-media.html#de-dao-zhi-shi-cheng-bang',
        source: ['/knowledge/topic/:topic', '/knowledge', '/'],
        target: '/dedao/knowledge/:topic?/:type?',
      },
    ],
  },
  'igetget.com': {
    _name: '得到',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#de-dao-shou-ye',
        source: ['/'],
        target: '/dedao/list/:category?',
      },
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#de-dao-xin-wen',
        source: ['/news', '/'],
        target: '/dedao/news',
      },
      {
        title: '人物故事',
        docs: 'https://docs.rsshub.app/new-media.html#de-dao-ren-wu-gu-shi',
        source: ['/news', '/'],
        target: '/dedao/figure',
      },
      {
        title: '视频',
        docs: 'https://docs.rsshub.app/new-media.html#de-dao-shi-pin',
        source: ['/video', '/'],
        target: '/dedao/video',
      },
    ],
    m: [
      {
        title: '用户主页',
        docs: 'https://docs.rsshub.app/new-media.html#de-dao-yong-hu-zhu-ye',
        source: ['/native/mine/account', '/'],
        target: (params, url) =>
          `/dedao/user/${new URL(url).searchParams.get('enId')}`,
      },
    ],
  },
  'deepmind.com': {
    _name: 'DeepMind',
    '.': [
      {
        title: 'Blog',
        docs: 'https://docs.rsshub.app/new-media.html#deepmind',
        source: ['/blog', '/'],
        target: '/blog',
      },
    ],
  },
  'dgjyw.com': {
    _name: '东莞教研网',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/other.html#dong-guan-jia-yan-wang-fen-lei',
        source: ['/'],
        target: (params, url) =>
          `/dgjyw/${
            new URL(url).toString().match(/dgjyw\.com\/(.*)\.htm$/)[1]
          }`,
      },
    ],
  },
  'dhu.edu.cn': {
    _name: '东华大学',
    jw: [
      {
        title: '教务处通知',
        docs: 'https://docs.rsshub.app/university.html#dong-hua-da-xue',
      },
    ],
    xxgk: [
      {
        title: '最新信息公开',
        docs: 'https://docs.rsshub.app/university.html#dong-hua-da-xue',
      },
    ],
  },
  'diandong.com': {
    _name: '电动邦',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/news'],
        target: '/diandong/news/:cate',
      },
      {
        title: '电动号',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/news/ddh'],
        target: '/diandong/ddh/:cate',
      },
    ],
  },
  'diershoubing.com': {
    _name: '二柄 APP',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/game.html#er-bing-app',
        source: ['/'],
        target: '/diershoubing/news',
      },
    ],
  },
  'discord.com': {
    _name: 'Discord',
    '.': [
      {
        title: 'Channel Messages',
        docs: 'https://docs.rsshub.app/en/social-media.html#discord',
        source: [
          '/channels/:guildId/:channelID/:messageID',
          '/channels/:guildId/:channelID',
        ],
        target: '/discord/channel/:channelID',
      },
    ],
  },
  'disinfo.eu': {
    _name: 'EU Disinfo Lab',
    '.': [
      {
        title: 'Publications',
        docs: 'https://docs.rsshub.app/new-media.html#eu-disinfo-lab',
        source: ['/'],
        target: '/disinfo/publications',
      },
    ],
  },
  'diskanalyzer.com': {
    _name: "What's New",
    '.': [
      {
        title: 'Change Log',
        docs: 'https://docs.rsshub.app/program-update.html#wiztree-whats-new',
        source: ['/whats-new', '/'],
        target: '/diskanalyzer/whats-new',
      },
    ],
  },
  'distill.pub': {
    _name: 'Distill',
    '.': [
      {
        title: 'Latest',
        docs: 'https://docs.rsshub.app/programming.html#distill',
        source: ['/'],
        target: '/distill',
      },
    ],
  },
  'dlsite.com': {
    _name: 'DLsite',
    '.': [
      {
        title: '当前日期发售的新产品',
        docs: 'https://docs.rsshub.app/anime.html#dlsite',
      },
      {
        title: '产品打折信息',
        docs: 'https://docs.rsshub.app/anime.html#dlsite',
      },
    ],
  },
  'dmzj.com': {
    _name: '动漫之家',
    news: [
      {
        title: '宅新闻',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/',
        target: '/dmzj/news',
      },
      {
        title: '漫画情报',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/manhuaqingbao',
        target: '/dmzj/news/manhuaqingbao',
      },
      {
        title: '轻小说情报',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/qingxiaoshuoqingbao',
        target: '/dmzj/news/qingxiaoshuoqingbao',
      },
      {
        title: '动漫周边',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/manhuazhoubian',
        target: '/dmzj/news/manhuazhoubian',
      },
      {
        title: '声优情报',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/shengyouqingbao',
        target: '/dmzj/news/shengyouqingbao',
      },
      {
        title: '音乐资讯',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/yinyuezixun',
        target: '/dmzj/news/yinyuezixun',
      },
      {
        title: '游戏资讯',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/youxizixun',
        target: '/dmzj/news/youxizixun',
      },
      {
        title: '美图欣赏',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/meituxinshang',
        target: '/dmzj/news/meituxinshang',
      },
      {
        title: '漫展情报',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/manzhanqingbao',
        target: '/dmzj/news/manzhanqingbao',
      },
      {
        title: '大杂烩',
        docs: 'https://docs.rsshub.app/anime.html#dong-man-zhi-jia',
        source: '/dazahui',
        target: '/dmzj/news/dazahui',
      },
    ],
  },
  'docker.com': {
    _name: 'Docker Hub',
    hub: [
      {
        title: '镜像有新 Build',
        docs: 'https://docs.rsshub.app/program-update.html#docker-hub',
        source: ['/r/:owner/:image', '/r/:owner/:image/tags', '/_/:image'],
        target: (params) =>
          `/dockerhub/build/${params.owner ? params.owner : 'library'}/${
            params.image
          }`,
      },
      {
        title: '镜像有新 Tag',
        docs: 'https://docs.rsshub.app/program-update.html#docker-hub',
        source: ['/r/:owner/:image', '/r/:owner/:image/tags', '/_/:image'],
        target: (params) =>
          `/dockerhub/tag/${params.owner ? params.owner : 'library'}/${
            params.image
          }`,
      },
    ],
  },
  docschina: {
    _name: '印记中文',
    '.': [
      {
        title: '周刊 - JavaScript',
        docs: 'https://docs.rsshub.app/programming.html#yin-ji-zhong-wen-zhou-kan',
        source: ['/weekly/js/*', '/weekly/js', '/'],
        target: '/docschina/jsweekly',
      },
    ],
  },
  'domp4.cc': {
    _name: 'domp4电影',
    '.': [
      {
        title: '最近更新',
        docs: 'https://docs.rsshub.app/multimedia.html#domp4-ying-shi',
        source: ['/', '/custom/update.html'],
        target: '/domp4/latest/:type?',
      },
      {
        title: '剧集订阅',
        docs: 'https://docs.rsshub.app/multimedia.html#domp4-ying-shi',
        source: '/html/:id',
        target: '/domp4/detail/:id',
      },
      {
        title: '剧集订阅',
        docs: 'https://docs.rsshub.app/multimedia.html#domp4-ying-shi',
        source: '/detail/:id',
        target: '/domp4/detail/:id',
      },
    ],
  },
  'dongqiudi.com': {
    _name: '懂球帝',
    m: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/home/:id'],
        target: '/dongqiudi/top_news/:id',
      },
    ],
    www: [
      {
        title: '专题',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/special/:id'],
        target: '/dongqiudi/special/:id',
      },
      {
        title: '早报',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/special/48'],
        target: '/dongqiudi/daily',
      },
      {
        title: '足球赛果',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/team/*team'],
        target: (params) =>
          `/dongqiudi/result/${params.team.replace('.html', '')}`,
      },
      {
        title: '球队新闻',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/team/*team'],
        target: (params) =>
          `/dongqiudi/team_news/${params.team.replace('.html', '')}`,
      },
      {
        title: '球员新闻',
        docs: 'https://docs.rsshub.app/new-media.html#dong-qiu-di',
        source: ['/player/*id'],
        target: (params) =>
          `/dongqiudi/player_news/${params.id.replace('.html', '')}`,
      },
    ],
  },
  'douban.com': {
    _name: '豆瓣',
    www: [
      {
        title: '用户的广播',
        docs: 'https://docs.rsshub.app/social-media.html#dou-ban',
        source: '/people/:user/',
        target: (params, url, document) => {
          const uid =
            document &&
            document
              .querySelector('html')
              .innerHTML.match(/"id":"([0-9]+)"/)[1];
          return uid ? `/douban/people/${uid}/status` : '';
        },
      },
      {
        title: '小组-最新',
        docs: 'https://docs.rsshub.app/social-media.html#dou-ban',
        source: '/group/:groupid',
        target: '/douban/group/:groupid',
      },
      {
        title: '小组-最热',
        docs: 'https://docs.rsshub.app/social-media.html#dou-ban',
        source: '/group/:groupid',
        target: '/douban/group/:groupid/essence',
      },
      {
        title: '小组-精华',
        docs: 'https://docs.rsshub.app/social-media.html#dou-ban',
        source: '/group/:groupid',
        target: '/douban/group/:groupid/elite',
      },
    ],
    jobs: [
      {
        title: '社会招聘',
        docs: 'https://docs.rsshub.app/social-media.html#dou-ban',
        source: '/jobs/social',
        target: '/jobs/social',
      },
      {
        title: '校园招聘',
        docs: 'https://docs.rsshub.app/social-media.html#dou-ban',
        source: '/jobs/campus',
        target: '/jobs/campus',
      },
      {
        title: '实习生招聘',
        docs: 'https://docs.rsshub.app/social-media.html#dou-ban',
        source: '/jobs/intern',
        target: '/jobs/intern',
      },
    ],
  },
  'douyin.com': {
    _name: '抖音',
    '.': [
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/social-media.html#dou-yin',
        source: '/hashtag/:cid',
        target: '/douyin/hashtag/:cid',
      },
      {
        title: '博主',
        docs: 'https://docs.rsshub.app/social-media.html#dou-yin',
        source: '/user/:uid',
        target: '/douyin/user/:uid',
      },
    ],
    live: [
      {
        title: '直播间开播',
        docs: 'https://docs.rsshub.app/live.html#dou-yin-zhi-bo',
        source: '/:rid',
        target: '/douyin/live/:rid',
      },
    ],
  },
  'douyu.com': {
    _name: '斗鱼',
    www: [
      {
        title: '直播间开播',
        docs: 'https://docs.rsshub.app/live.html#dou-yu-zhi-bo-zhi-bo-jian-kai-bo',
        source: ['/:id', '/'],
        target: '/douyu/room/:id',
      },
    ],
    yuba: [
      {
        title: '鱼吧帖子',
        docs: 'https://docs.rsshub.app/bbs.html#dou-yu-yu-ba-tie-zi',
        source: ['/group/:id', '/group/newself/:id', '/group/newall/:id', '/'],
        target: '/douyu/group/:id',
      },
      {
        title: '鱼吧跟帖',
        docs: 'https://docs.rsshub.app/bbs.html#dou-yu-yu-ba-gen-tie',
        source: ['/p/:id', '/'],
        target: '/douyu/post/:id',
      },
    ],
  },
  'dtcj.com': {
    _name: 'DT 财经',
    '.': [
      {
        title: '数据侠专栏',
        docs: 'https://docs.rsshub.app/finance.html#dt-cai-jing',
        source: ['/datahero/topic'],
        target: (_params, url) =>
          `/dtcj/datahero/${new URL(url).searchParams.get('topic_id')}`,
      },
      {
        title: '数据洞察',
        docs: 'https://docs.rsshub.app/finance.html#dt-cai-jing',
        source: ['/dtcj/datainsight'],
        target: '/dtcj/datainsight',
      },
      {
        title: '数据洞察',
        docs: 'https://docs.rsshub.app/finance.html#dt-cai-jing',
        source: ['/insighttopic/:id'],
        target: '/dtcj/datainsight/:id',
      },
    ],
  },
  'dushu.io': {
    _name: '樊登读书会',
    card: [
      {
        title: '福州运营中心',
        docs: 'https://docs.rsshub.app/new-media.html#fan-deng-du-shu-fan-deng-fu-zhou-yun-ying-zhong-xin',
        source: ['*'],
        target: '/dushu/fuzhou',
      },
    ],
  },
  'dushu365.com': {
    _name: '樊登读书会',
    www: [
      {
        title: '福州运营中心',
        docs: 'https://docs.rsshub.app/new-media.html#fan-deng-du-shu-fan-deng-fu-zhou-yun-ying-zhong-xin',
        source: ['*'],
        target: '/dushu/fuzhou',
      },
    ],
  },
  'dlut.edu.cn': {
    _name: '大连理工大学',
    news: [
      {
        title: '新闻网',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-xin-wen-wang',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    perdep: [
      {
        title: '人事处',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-ren-shi-chu',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    teach: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-jiao-wu-chu',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    gs: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-yan-jiu-sheng-yuan',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    ssdut: [
      {
        title: '软件学院',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-ruan-jian-xue-yuan',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    eda: [
      {
        title: '开发区校区',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-kai-fa-qu-xiao-qu',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    panjin: [
      {
        title: '盘锦校区',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-pan-jin-xiao-qu',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    xsgzb: [
      {
        title: '盘锦校区学生事务办公室',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-pan-jin-xiao-qu-xue-sheng-shi-wu-ban-gong-shi',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    pjteach: [
      {
        title: '盘锦校区教务教学事务办公室',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-pan-jin-xiao-qu-jiao-wu-jiao-xue-shi-wu-ban-gong-shi',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    pjxqzwb: [
      {
        title: '盘锦校区总务部',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-pan-jin-xiao-qu-zong-wu-bu',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    tjpj: [
      {
        title: '体育与健康学院盘锦分院',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-ti-yu-jian-kang-xue-yuan-pan-jin-fen-yuan',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    dutdice: [
      {
        title: '国际合作与交流处（港澳台办）',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-guo-ji-he-zuo-yu-jiao-liu-chu-gang-ao-tai-ban',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
    tycgzx: [
      {
        title: '体育场馆中心',
        docs: 'https://docs.rsshub.app/university.html#da-lian-li-gong-da-xue-ti-yu-chang-guan-zhong-xin',
        source: ['/'],
        target: (params, url) =>
          `/dut/${url.match(/:\/\/[\w\d]+\./)[1]}/${
            url.match(/\.cn\/(.*)\.htm/)[1]
          }`,
      },
    ],
  },
  'dx2025.com': {
    _name: '东西智库',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/multimedia.html#e-hentai-fen-lei',
        source: [
          '/archives/category/:type/:category?',
          '/archives/category/:type',
        ],
        target: (params) =>
          `/dx2025/${params.type}/${params.category ? params.category : ''}`,
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/multimedia.html#e-hentai-biao-qian',
        source: ['/archives/tag/:tag'],
        target: '/dx2025/tag/:tag',
      },
    ],
  },
  'e-hentai.org': {
    _name: 'E-Hentai',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/multimedia.html#e-hentai-fen-lei',
        source: ['/:category', '/'],
        target: '/e-hentai/category/:category',
      },
      {
        title: '收藏',
        docs: 'https://docs.rsshub.app/picture.html#e-hentai',
        source: ['/favorites.php', '/'],
        target: (_params, url) =>
          `/ehentai/favorites/${new URL(url).searchParams.get('favcat')}`,
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/multimedia.html#e-hentai-biao-qian',
        source: ['/tag/:tag', '/'],
        target: '/e-hentai/tag/:tag',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/picture.html#e-hentai',
        source: ['/tag/:tag', '/'],
        target: '/ehentai/tag/:tag',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#e-hentai-sou-suo',
        source: ['/:keyword', '/'],
        target: '/e-hentai/search/:keyword',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/picture.html#e-hentai',
        source: ['/'],
        target: (_params, url) =>
          `/ehentai/search/${new URL(url).searchParams.get('f_search')}`,
      },
    ],
  },
  'eagle.cool': {
    _name: 'Eagle',
    cn: [
      {
        title: '更新日志',
        docs: 'https://docs.rsshub.app/program-update.html#eagle',
        source: '/changelog',
        target: '/eagle/changelog/cn',
      },
      {
        title: '全部',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog'],
        target: '/eagle/blog',
      },
      {
        title: '设计资源',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/design-resources'],
        target: '/eagle/blog/design-resources',
      },
      {
        title: '设计技巧',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/learn-design'],
        target: '/eagle/blog/learn-design',
      },
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/inside-eagle'],
        target: '/eagle/blog/inside-eagle',
      },
    ],
    tw: [
      {
        title: '更新日誌',
        docs: 'https://docs.rsshub.app/program-update.html#eagle',
        source: '/changelog',
        target: '/eagle/changelog/tw',
      },
      {
        title: '全部',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog'],
        target: '/eagle/blog/tw',
      },
      {
        title: '設計資源',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/design-resources'],
        target: '/eagle/blog/design-resources/tw',
      },
      {
        title: '設計技巧',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/learn-design'],
        target: '/eagle/blog/learn-design/tw',
      },
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/inside-eagle'],
        target: '/eagle/blog/inside-eagle/tw',
      },
    ],
    en: [
      {
        title: 'Release Notes',
        docs: 'https://docs.rsshub.app/program-update.html#eagle',
        source: '/changelog',
        target: '/eagle/changelog/en',
      },
      {
        title: 'All',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog'],
        target: '/eagle/blog/en',
      },
      {
        title: 'Design Resources',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/design-resources'],
        target: '/eagle/blog/design-resources/en',
      },
      {
        title: 'Learn Design',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/learn-design'],
        target: '/eagle/blog/learn-design/en',
      },
      {
        title: 'Inside Eagle',
        docs: 'https://docs.rsshub.app/design.html#eagle',
        source: ['/blog/inside-eagle'],
        target: '/eagle/blog/inside-eagle/en',
      },
    ],
  },
  'ac.cn': {
    _name: '地震速报',
    'www.ceic': [
      {
        title: '中国地震台',
        docs: 'https://docs-rsshub.pages.dev/forecast.html#di-zhen-su-bao',
        source: ['/speedsearch', '/'],
        target: '/earthquake/ceic',
      },
    ],
  },
  'cea.gov.cn': {
    _name: '地震速报',
    www: [
      {
        title: '中国地震局',
        docs: 'https://docs-rsshub.pages.dev/forecast.html#di-zhen-su-bao',
        source: ['/cea/xwzx/zqsd/index.html', '/'],
        target: '/earthquake',
      },
    ],
  },
  'eastday.com': {
    _name: '东方网',
    mini: [
      {
        title: '24 小时热闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-fang-wang',
        source: '/',
        target: '/eastday/24',
      },
    ],
    sh: [
      {
        title: '上海新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-fang-wang',
        source: '/',
        target: '/eastday/sh',
      },
    ],
    www: [
      {
        title: '热点搜索',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-fang-wang-re-dian-sou-suo',
        source: '/',
        target: '/eastday/find',
      },
      {
        title: '原创',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-fang-wang-yuan-chuang',
        source: '/',
        target: '/eastday/portrait',
      },
    ],
  },
  'eastmoney.com': {
    _name: '东方财富',
    fundbarmob: [
      {
        title: '天天基金用户动态',
        docs: 'https://docs.rsshub.app/finance.html#dong-fang-cai-fu',
        source: ['/'],
        target: (_param, url) =>
          `/eastmoney/ttjj/user/${new URL(url).searchParams.get('userid')}`,
      },
    ],
  },
  'ecnu.edu.cn': {
    _name: '华东师范大学',
    acm: [
      {
        title: '所有比赛列表',
        docs: 'https://docs.rsshub.app/university.html#hua-dong-shi-fan-da-xue',
        source: ['/contest/', '/'],
        target: '/ecnu/acm/contest/',
      },
      {
        title: '仅公开比赛列表',
        docs: 'https://docs.rsshub.app/university.html#hua-dong-shi-fan-da-xue',
        source: ['/contest/', '/'],
        target: '/ecnu/acm/contest/public',
      },
    ],
  },
  'kaoyan.com': {
    _name: '华东师范大学',
    yz: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#hua-dong-shi-fan-da-xue',
        source: ['/ecnu/tiaoji', '/'],
        target: '/ecnu/yjs',
      },
    ],
  },
  'economist.com': {
    _name: 'The Economist',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/traditional-media.html#the-economist',
        source: ['/:endpoint'],
        target: '/economist/:endpoint',
      },
      {
        title: 'Espresso',
        docs: 'https://docs.rsshub.app/traditional-media.html#the-economist',
        source: ['/the-world-in-brief', '/espresso'],
        target: '/economist/espresso',
      },
    ],
    gre: [
      {
        title: 'GRE Vocabulary',
        docs: 'https://docs.rsshub.app/traditional-media.html#the-economist',
        source: [
          '/',
          '/gre-advice/gre-vocabulary/which-words-study/most-common-gre-vocabulary-list-organized-difficulty',
        ],
        target: '/economist/gre-vocabulary',
      },
    ],
  },
  'businessreview.global': {
    _name: 'The Economist',
    '.': [
      {
        title: '商论',
        docs: 'https://docs.rsshub.app/traditional-media.html#the-economist',
        source: ['/'],
        target: '/economist/global-business-review',
      },
    ],
  },
  'jxjy.ecust.edu.cn': {
    _name: '华东理工继续教育学院',
    '.': [
      {
        title: '新闻公告',
        docs: 'https://docs.rsshub.app/university.html#hua-dong-li-gong-ji-xu-jiao-yu-xue-yuan',
        source: '/yeDaZhuanLan.aspx?pk=153',
        target: '/ecust-jxjy/news',
      },
    ],
  },
  'elasticsearch.cn': {
    _name: 'Elastic 中文社区',
    '.': [
      {
        title: '发现',
        docs: 'https://docs.rsshub.app/bbs.html#elastic-zhong-wen-she-qu-fa-xian',
        source: ['/:params', '/'],
        target: '/elasticsearch-cn/:params',
      },
    ],
  },
  'eleduck.com': {
    _name: '电鸭社区',
    '.': [
      {
        title: '工作机会',
        docs: 'https://docs.rsshub.app/bbs.html#dian-ya-she-qu-fen-lei-wen-zhang',
        source: ['/categories/5', '/'],
        target: '/eleduck/jobs',
      },
      {
        title: '分类文章',
        docs: 'https://docs.rsshub.app/bbs.html#dian-ya-she-qu-fen-lei-wen-zhang',
        source: '/categories/:cid',
        target: (params) => `/eleduck/posts/${params.cid}`,
      },
      {
        title: '全部文章',
        docs: 'https://docs.rsshub.app/bbs.html#dian-ya-she-qu-fen-lei-wen-zhang',
        source: ['/', '*'],
        target: () => '/eleduck/posts',
      },
    ],
  },
  'sciencedirect.com': {
    _name: 'ScienceDirect',
    '.': [
      {
        title: 'Journal',
        docs: 'https://docs.rsshub.app/journal.html#sciencedirect-journal',
        source: ['/journal/:id', '/'],
        target: '/sciencedirect/journal/:id',
      },
    ],
  },
  'china-embassy.org': {
    _name: '中国驻外使领馆',
    ca: [
      {
        title: '重要通知 - 加拿大大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/zytz', '/'],
        target: '/embassy/ca',
      },
    ],
    jp: [
      {
        title: '通知通告 - 日本大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsfws/LSB', '/'],
        target: '/embassy/jp',
      },
    ],
    kr: [
      {
        title: '重要通知 - 韩国大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/lsqz/ls_tz', '/'],
        target: '/embassy/kr',
      },
    ],
    my: [
      {
        title: '重要通知 - 马来西亚大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/zytz', '/'],
        target: '/embassy/my',
      },
    ],
    sg: [
      {
        title: '重要通知 - 新加坡大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsfw/zytzs', '/'],
        target: '/embassy/sg',
      },
    ],
  },
  'china-embassy.gov.cn': {
    _name: '中国驻外使领馆',
    us: [
      {
        title: '重要通知 - 美国大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/zytz', '/'],
        target: '/embassy/us',
      },
    ],
  },
  'chinese-embassy.org.uk': {
    _name: '中国驻外使领馆',
    www: [
      {
        title: '领事协助 - 英国大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsfw/lsxz', '/'],
        target: '/embassy/us',
      },
    ],
  },
  'chineseembassy.org': {
    _name: '中国驻外使领馆',
    de: [
      {
        title: '近期通知 - 德国大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsfw/jqtz', '/'],
        target: '/embassy/de',
      },
    ],
    fr: [
      {
        title: '重要通知 - 法国大使馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/zgzfg/zgsg/lsb', '/'],
        target: '/embassy/fr',
      },
    ],
  },
  'china-consulate.org': {
    _name: '中国驻外使领馆',
    marseille: [
      {
        title: '领事服务最新公告 - 马赛总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsfwgg', '/'],
        target: '/embassy/fr/marseille',
      },
    ],
    strasbourg: [
      {
        title: '重要通知 - 斯特拉斯堡总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsfw', '/'],
        target: '/embassy/fr/strasbourg',
      },
    ],
    lyon: [
      {
        title: '通知、通告 - 里昂总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/tztg', '/'],
        target: '/embassy/fr/lyon',
      },
    ],
    nagasaki: [
      {
        title: '通知公告 - 长崎总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/tzgg', '/'],
        target: '/embassy/jp/nagasaki',
      },
    ],
    osaka: [
      {
        title: '通知公告 - 大阪总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/tzgg', '/'],
        target: '/embassy/jp/osaka',
      },
    ],
    fukuoka: [
      {
        title: '通知公告 - 福冈总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/tzgg', '/'],
        target: '/embassy/jp/fukuoka',
      },
    ],
    sapporo: [
      {
        title: '通知公告 - 札幌总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/tzgg', '/'],
        target: '/embassy/jp/sapporo',
      },
    ],
    niigata: [
      {
        title: '通知通告 - 新潟总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsbh/tztg', '/'],
        target: '/embassy/jp/niigata',
      },
    ],
    busan: [
      {
        title: '通知公告 - 釜山总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lsfw/tzgg101', '/'],
        target: '/embassy/kr/busan',
      },
    ],
    gwangju: [
      {
        title: '公告通知 - 光州总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/lbxx/ggtz', '/'],
        target: '/embassy/kr/gwangju',
      },
    ],
    edinburgh: [
      {
        title: '重要通知 - 爱丁堡总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/zytz', '/'],
        target: '/embassy/uk/edinburgh',
      },
    ],
    newyork: [
      {
        title: '重要通知 - 纽约总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/fwzc/zxtz', '/'],
        target: '/embassy/us/newyork',
      },
    ],
  },
  'chinaconsulatechicago.org': {
    _name: '中国驻外使领馆',
    www: [
      {
        title: '领馆重要通知 - 芝加哥总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/zytz', '/'],
        target: '/embassy/us/chicago',
      },
    ],
  },
  'chinaconsulatesf.org': {
    _name: '中国驻外使领馆',
    www: [
      {
        title: '重要通知 - 旧金山总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/zytz', '/'],
        target: '/embassy/us/sanfrancisco',
      },
    ],
  },
  'chineseconsulate.org': {
    _name: '中国驻外使领馆',
    montreal: [
      {
        title: '重要通知 - 蒙特利尔总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/zytz', '/'],
        target: '/embassy/ca/montreal',
      },
    ],
    munich: [
      {
        title: '近期通知 - 慕尼黑总领馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/jqtz', '/'],
        target: '/embassy/de/munich',
      },
    ],
    nagoya: [
      {
        title: '通知公告 - 名古屋总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: '',
        target: '/embassy/jp/nagoya',
      },
    ],
    jeju: [
      {
        title: '公告栏 - 济州总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/ggl', '/'],
        target: '/embassy/kr/jeju',
      },
    ],
    belfast: [
      {
        title: '通知通告 - 贝尔法斯特总领馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/tztg', '/'],
        target: '/embassy/uk/belfast',
      },
    ],
    manchester: [
      {
        title: '通知公告 - 曼彻斯特总领事馆',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zhu-wai-shi-ling-guan',
        source: ['/chn/tzgg', '/'],
        target: '/embassy/uk/manchester',
      },
    ],
  },
  'ems.com.cn': {
    _name: '中国邮政速递物流',
    www: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/other.html#zhong-guo-you-zheng-su-di-wu-liu',
        source: '/aboutus/xin_wen_yu_shi_jian.html',
        target: '/ems/news',
      },
      {
        title: '苹果邮件',
        docs: 'https://docs.rsshub.app/other.html#zhong-guo-you-zheng-su-di-wu-liu',
        source: ['/apple/query/:id'],
        target: '/apple/ems/:id',
      },
    ],
  },
  'eprice.com.tw': {
    _name: 'ePrice',
    '.': [
      {
        title: 'ePrice 比價王',
        docs: 'https://docs.rsshub.app/new-media.html#eprice',
        source: ['/'],
        target: '/eprice/tw',
      },
    ],
  },
  'eprice.com.hk': {
    _name: 'ePrice',
    '.': [
      {
        title: 'ePrice 香港',
        docs: 'https://docs.rsshub.app/new-media.html#eprice',
        source: ['/'],
        target: '/eprice/hk',
      },
    ],
  },
  'eventernote.com': {
    _name: 'Eventernote',
    www: [
      {
        title: '声优活动及演唱会',
        docs: 'https://docs.rsshub.app/anime.html#eventernote',
        source: '/actors/:name/:id/events',
        target: '/eventernote/actors/:name/:id',
      },
    ],
  },
  'ezone.hk': {
    _name: 'ezone.hk',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#ezone-hk-fen-lei',
        source: ['/:category', '/'],
        target: '/ezone/:category?',
      },
    ],
  },
  'famitsu.com': {
    _name: 'ファミ通',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/game.html#ファミ-tong',
        source: ['/search'],
        target: (_, url) =>
          `/famitsu/category/${new URL(url).searchParams.get('category')}`,
      },
    ],
  },
  'fantia.jp': {
    _name: 'Fantia',
    '.': [
      {
        title: '用户投稿',
        docs: 'https://docs.rsshub.app/picture.html#fantia',
        source: ['/fanclubs/:id'],
        target: '/fantia/user/:id',
      },
    ],
  },
  'fastbull.cn': {
    _name: '法布财经',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/finance.html#fa-bu-cai-jing-xin-wen',
        source: ['/news', '/'],
        target: '/fastbull/news',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/finance.html#fa-bu-cai-jing-kuai-xun',
        source: ['/express-news', '/'],
        target: '/fastbull/express-news',
      },
    ],
  },
  'fda.gov': {
    _name: 'U.S. Food and Drug Administration',
    '.': [
      {
        title: 'CDRHNew',
        docs: 'https://docs.rsshub.app/government.html#mei-guo-shi-pin-yao-pin-jian-du-guan-li-ju-cdrhnew',
        source: [
          '/medical-devices/news-events-medical-devices/cdrhnew-news-and-updates',
          '/',
        ],
        target: '/fda/cdrh/:titleOnly',
      },
    ],
  },
  'feng.com': {
    _name: '威锋',
    '.': [
      {
        title: '社区',
        docs: 'https://docs.rsshub.app/bbs.html#wei-feng',
        source: ['/forum/photo/:id', '/forum/:id'],
        target: '/feng/forum/:id',
      },
    ],
  },
  'fffdm.com': {
    _name: '风之动漫',
    manhua: [
      {
        title: '在线漫画',
        docs: 'https://docs.rsshub.app/anime.html#feng-zhi-dong-man',
        source: ['/manhua/:id', '/:id'],
        target: '/fffdm/manhua/:id',
      },
    ],
    www: [
      {
        title: '在线漫画',
        docs: 'https://docs.rsshub.app/anime.html#feng-zhi-dong-man',
        source: ['/manhua/:id', '/:id'],
        target: '/fffdm/manhua/:id',
      },
    ],
  },
  'filmdeepfocus.com': {
    _name: '深焦',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#shen-jiao-fen-lei',
        source: ['/:category', '/'],
        target: '/filmdeepfocus/:category?',
      },
    ],
  },
  'finviz.com': {
    _name: 'finviz',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/finance.html#finviz-news',
        source: ['/news.ashx', '/'],
        target: '/finviz/:category?',
      },
      {
        title: 'US Stock News',
        docs: 'https://docs.rsshub.app/finance.html#finviz-mei-gu-gu-piao-xin-wen',
        source: ['/quote.ashx', '/'],
        target: '/finviz/news/:category?',
      },
    ],
  },
  'firefox.com': {
    _name: 'Mozilla',
    monitor: [
      {
        title: 'Firefox Monitor',
        docs: 'https://docs.rsshub.app/other.html#mozilla',
        source: ['/', '/breaches'],
        target: '/firefox/breaches',
      },
    ],
  },
  'fisher.spb.ru': {
    _name: 'fisher spb',
    '.': [
      {
        title: 'news',
        docs: 'https://docs.rsshub.app/en/other.html#fisher-spb',
        source: ['/news'],
        target: '/fisher-spb/news',
      },
    ],
  },
  'fjksbm.com': {
    _name: '福建考试报名网',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/study.html#fu-jian-kao-shi-bao-ming-wang',
        source: ['/portal/:category?', '/portal'],
        target: '/fjksbm/:category?',
      },
    ],
  },
  'flyert.com': {
    _name: '飞客茶馆',
    '.': [
      {
        title: '优惠信息',
        docs: 'https://docs.rsshub.app/travel.html#fei-ke-cha-guan-you-hui-xin-xi',
        source: '/',
        target: '/flyert/preferential',
      },
      {
        title: '信用卡',
        docs: 'https://docs.rsshub.app/travel.html#fei-ke-cha-guan-xin-yong-ka',
        source: '/',
        target: '/flyert/creditcard/:bank',
      },
    ],
  },
  'focustaiwan.tw': {
    _name: 'Focus Taiwan',
    '.': [
      {
        title: 'Category',
        docs: 'https://docs.rsshub.app/new-media.html#focus-taiwan-category',
        source: ['/:category', '/'],
        target: '/focustaiwan/category?',
      },
    ],
  },
  'foresightnews.pro': {
    _name: 'Foresight News',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#foresight-news-shou-ye',
        source: ['/article', '/'],
        target: '/foresightnews',
      },
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/new-media.html#foresight-news-wen-zhang',
        source: ['/article', '/'],
        target: '/foresightnews/article',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#foresight-news-kuai-xun',
        source: ['/news', '/'],
        target: '/foresightnews/news',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/new-media.html#foresight-news-zhuan-lan',
        source: ['/column/detail/:id', '/'],
        target: '/foresightnews/column/:id',
      },
    ],
  },
  'foreverblog.cn': {
    _name: '十年之约',
    www: [
      {
        title: '专题展示',
        docs: 'https://docs.rsshub.app/blog.html#shi-nian-zhi-yue',
        source: ['/feeds.html'],
        target: '/foreverblog/feeds',
      },
    ],
  },
  'fortunechina.com': {
    _name: '财富中文网',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#cai-fu-zhong-wen-wang-fen-lei',
        source: ['/:category', '/'],
        target: '/fortunechina/:category?',
      },
    ],
  },
  'fosshub.com': {
    _name: 'FossHub',
    '.': [
      {
        title: 'Software Update',
        docs: 'https://docs.rsshub.app/program-update.html#fosshub-software-update',
        source: ['/'],
        target: (params, url) =>
          `/fosshub/${new URL(url).match(/\/(.*?)\.html$/)[1]}`,
      },
    ],
  },
  'freewechat.com': {
    _name: '自由微信',
    '.': [
      {
        title: '公众号',
        docs: 'https://docs.rsshub.app/new-media.html#zi-you-wei-xin',
        source: ['/profile/:id'],
        target: '/freewechat/profile/:id',
      },
    ],
  },
  'ftchinese.com': {
    _name: 'Financial Times',
    '.': [
      {
        title: 'FT 中文网',
        docs: 'https://docs.rsshub.app/traditional-media.html#financial-times',
      },
      {
        title: 'myFT 个人 RSS',
        docs: 'https://docs.rsshub.app/traditional-media.html#financial-times',
      },
    ],
  },
  'ft.com': {
    _name: 'Financial Times',
    '.': [
      {
        title: 'myFT personal RSS',
        docs: 'https://docs.rsshub.app/en/traditional-media.html#financial-times',
      },
    ],
  },
  'furstar.jp': {
    _name: 'Furstar',
    '.': [
      {
        title: '安全文摘首頁',
        docs: 'https://docs.rsshub.app/shopping.html#an-quan-wen-zhai',
        source: ['/', '/'],
        target: '/secnews/index',
      },
    ],
  },
  'fx-markets.com': {
    _name: 'FX-Markets',
    '.': [
      {
        title: 'Trading',
        docs: 'https://docs.rsshub.app/finance.html#fx-markets',
        source: '/trading',
        target: '/fx-markets/trading',
      },
      {
        title: 'Infrastructure',
        docs: 'https://docs.rsshub.app/finance.html#fx-markets',
        source: '/infrastructure',
        target: '/fx-markets/infrastructure',
      },
      {
        title: 'Tech and Data',
        docs: 'https://docs.rsshub.app/finance.html#fx-markets',
        source: '/tech-and-data',
        target: '/fx-markets/tech-and-data',
      },
      {
        title: 'Regulation',
        docs: 'https://docs.rsshub.app/finance.html#fx-markets',
        source: '/regulation',
        target: '/fx-markets/regulation',
      },
    ],
  },
  'gameapps.hk': {
    _name: 'GameApps.hk 香港手机游戏网',
    '.': [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/game.html#gameapps-hk-xiang-gang-shou-ji-you-xi-wang',
        source: ['/'],
        target: '/gameapps',
      },
    ],
  },
  'gamer.com.tw': {
    _name: '巴哈姆特電玩資訊站',
    acg: [
      {
        title: 'GNN 新聞',
        docs: 'https://docs.rsshub.app/bbs.html#ba-ha-mu-te-dian-wan-zi-xun-zhan',
        source: ['/news.php'],
        target: (params, url) =>
          `/gamer/gnn/${new URL(url).searchParams.get('p')}`,
      },
    ],
    forum: [
      {
        title: '熱門推薦',
        docs: 'https://docs.rsshub.app/bbs.html#ba-ha-mu-te-dian-wan-zi-xun-zhan',
        source: ['/A.php', '/B.php'],
        target: (params, url) =>
          `/gamer/hot/${new URL(url).searchParams.get('bsn')}`,
      },
    ],
    gnn: [
      {
        title: 'GNN 新聞',
        docs: 'https://docs.rsshub.app/bbs.html#ba-ha-mu-te-dian-wan-zi-xun-zhan',
        source: ['/index.php'],
        target: (params, url) =>
          `/gamer/gnn/${new URL(url).searchParams.get('k')}`,
      },
    ],
  },
  'gamersecret.com': {
    _name: 'Gamer Secret',
    '.': [
      {
        title: '最新資訊',
        docs: 'https://docs.rsshub.app/game.html#gamer-secret-zui-xin-zi-xun',
        source: ['/:type', '/:type/:category', '/'],
        target: '/gamersecret',
      },
      {
        title: '分類',
        docs: 'https://docs.rsshub.app/game.html#gamer-secret-fen-lei',
        source: ['/:type', '/:type/:category', '/'],
        target: '/gamersecret/:type?/:category?',
      },
      {
        title: 'Latest News',
        docs: 'https://docs.rsshub.app/game.html#gamer-secret-latest-news',
        source: ['/:type', '/:type/:category', '/'],
        target: '/gamersecret',
      },
      {
        title: 'Category',
        docs: 'https://docs.rsshub.app/game.html#gamer-secret-category',
        source: ['/:type', '/:type/:category', '/'],
        target: '/gamersecret/:type?/:category?',
      },
    ],
  },
  'gamme.com.tw': {
    _name: '卡卡洛普',
    news: [
      {
        title: '宅宅新聞 - 分類',
        docs: 'https://docs.rsshub.app/new-media.html#ka-ka-luo-pu',
        source: ['/category/:category', '/'],
        target: (params) =>
          `/gamme/news${params.category ? `/${params.category}` : ''}`,
      },
      {
        title: '宅宅新聞 - 標籤',
        docs: 'https://docs.rsshub.app/new-media.html#ka-ka-luo-pu',
        source: ['/tag/:tag'],
        target: '/gamme/news/tag/:tag',
      },
    ],
    sexynews: [
      {
        title: '西斯新聞 - 分類',
        docs: 'https://docs.rsshub.app/new-media.html#ka-ka-luo-pu',
        source: ['/category/:category', '/'],
        target: (params) =>
          `/gamme/sexynews${params.category ? `/${params.category}` : ''}`,
      },
      {
        title: '西斯新聞 - 標籤',
        docs: 'https://docs.rsshub.app/new-media.html#ka-ka-luo-pu',
        source: ['/tag/:tag'],
        target: '/gamme/sexynews/tag/:tag',
      },
    ],
  },
  'gaze.run': {
    _name: '注视影视',
    '.': [
      {
        title: '更新通知',
        docs: 'https://docs.rsshub.app//multimedia.html#gaze-run',
        source: ['/play/:mid'],
        target: (params) => `/gaze/update/${params.mid}`,
      },
    ],
  },
  'gcores.com': {
    _name: '机核网',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#ji-he-wang-fen-lei',
        source: ['/:category'],
        target: '/gcores/category/:category',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#ji-he-wang-biao-qian',
        source: ['/categories/:tag', '/'],
        target: '/gcores/tag/:tag',
      },
    ],
  },
  'gdut.edu.cn': {
    _name: '广东工业大学',
    oas: [
      {
        title: '通知公文网',
        docs: 'https://docs.rsshub.app/university.html#guang-dong-gong-ye-da-xue-tong-zhi-gong-wen-wang',
        source: '/seeyon',
        target: '/gdut/oa_news/',
      },
    ],
  },
  'gelonghui.com': {
    _name: '格隆汇',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/finance.html#ge-long-hui',
        source: ['/tag/:tag', '/'],
        target: (params) =>
          `/gelonghui/home${params.tag ? `/${params.tag}` : ''}`,
      },
      {
        title: '最热文章',
        docs: 'https://docs.rsshub.app/finance.html#ge-long-hui',
        source: ['/'],
        target: '/gelonghui/hot-article',
      },
      {
        title: '搜索关键字',
        docs: 'https://docs.rsshub.app/finance.html#ge-long-hui',
        source: ['/search'],
        target: (_, url) =>
          `/gelonghui/keyword/${new URL(url).searchParams.get('keyword')}`,
      },
      {
        title: '实时快讯',
        docs: 'https://docs.rsshub.app/finance.html#ge-long-hui',
        source: ['/live', '/'],
        target: '/gelonghui/live',
      },
      {
        title: '主题文章',
        docs: 'https://docs.rsshub.app/finance.html#ge-long-hui',
        source: ['/subject/:id'],
        target: '/gelonghui/subject/:id',
      },
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/finance.html#ge-long-hui',
        source: ['/user/:id'],
        target: '/gelonghui/user/:id',
      },
    ],
  },
  'getdr.com': {
    _name: '趨勢科技防詐達人',
    '.': [
      {
        title: '最新詐騙情報',
        docs: 'https://docs.rsshub.app/new-media.html#qu-shi-ke-ji-fang-zha-da-ren-zui-xin-zha-pian-qing-bao',
        source: ['/'],
        target: '/getdr',
      },
    ],
  },
  'getitfree.cn': {
    _name: '正版中国',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/shopping.html#zheng-ban-zhong-guo-fen-lei',
        source: ['/category/:category', '/'],
        target: '/getitfree/:category?',
      },
    ],
  },
  'gettr.com': {
    _name: 'GETTR',
    '.': [
      {
        title: '个人时间线',
        docs: 'https://docs.rsshub.app/social-media.html#gettr',
        source: ['/user/:id'],
        target: '/gettr/user/:id',
      },
    ],
  },
  'sunborngame.com': {
    _name: '少女前线',
    '.': [
      {
        title: '情报局',
        docs: 'https://docs.rsshub.app/game.html#shao-nv-qian-xian-qing-bao-ju',
        source: ['/:category', '/'],
        target: '/gf-cn/news/:category?',
      },
    ],
  },
  'gihyo.jp': {
    _name: 'gihyo.jp',
    '.': [
      {
        title: '記事一覧',
        docs: 'https://docs.rsshub.app/programming.html#gihyo-jp',
        source: '/list/group/:id',
        target: '/gihyo/list/group/:id',
      },
    ],
  },
  'gitee.com': {
    _name: 'Gitee',
    '.': [
      {
        title: '仓库 Releases',
        link: 'https://docs.rsshub.app',
        source: ['/:owner/:repo/releases'],
        target: '/gitee/releases/:owner/:repo',
      },
      {
        title: '仓库提交',
        link: 'https://docs.rsshub.app',
        source: ['/:owner/:repo/commits'],
        target: '/gitee/commits/:owner/:repo',
      },
      {
        title: '用户公开动态',
        link: 'https://docs.rsshub.app',
        source: ['/:username'],
        target: '/gitee/events/:username',
      },
      {
        title: '仓库动态',
        link: 'https://docs.rsshub.app',
        source: ['/:owner/:repo'],
        target: '/gitee/events/:owner/:repo',
      },
    ],
  },
  'gitpod.io': {
    _name: 'Gitpod',
    '.': [
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/programming.html#gitpod',
        source: ['/blog', '/'],
        target: '/gitpod/blog',
      },
      {
        title: '更新日志',
        docs: 'https://docs.rsshub.app/programming.html#gitpod',
        source: ['/changelog', '/'],
        target: '/gitpod/changelog',
      },
    ],
  },
  'gocn.vip': {
    _name: 'GoCN',
    '.': [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/programming.html#GoCN',
        source: ['/'],
        target: '/gocn',
      },
      {
        title: '招聘',
        docs: 'https://docs.rsshub.app/programming.html#GoCN',
        source: ['/'],
        target: '/gocn/jobs',
      },
    ],
  },
  'good.news': {
    _name: 'Good.news',
    '.': [
      {
        title: '今日要闻',
        docs: 'https://docs.rsshub.app/new-media.html#good-news-jin-ri-yao-wen',
        source: ['/'],
        target: '/good',
      },
    ],
  },
  'google.com': {
    _name: '谷歌',
    chrome: [
      {
        title: '插件更新',
        source: '/webstore/detail/:name/:id',
        docs: 'https://docs.rsshub.app/program-update.html#chrome-wang-shang-ying-yong-dian',
        target: '/chrome/webstore/extensions/:id',
      },
    ],
    photos: [
      {
        title: '相册',
        docs: 'https://docs.rsshub.app/picture.html#google-xiang-ce',
        source: '/share/*',
        target: (params, url, document) => {
          const id =
            document &&
            document
              .querySelector('html')
              .innerHTML.match(/photos.app.goo.gl\/(.*?)"/)[1];
          return id ? `/google/album/${id}` : '';
        },
      },
    ],
    sites: [
      {
        title: 'Sites',
        docs: 'https://docs.rsshub.app/blog.html#google-sites',
        source: ['/site/:id/*', '/site/:id'],
        target: '/google/sites/:id',
      },
    ],
  },
  'ah.gov.cn': {
    _name: '安徽省科技厅',
    kjt: [
      {
        title: '科技资讯',
        docs: 'https://docs.rsshub.app/government.html#an-hui-sheng-ke-ji-ting-ke-ji-zi-xun',
        source: ['/*'],
        target: (params, url) =>
          `/gov/anhui/kjt${
            new URL(url).href.match(/kjt\.ah\.gov\.cn(.*)\/index.html/)[1] ?? ''
          }`,
      },
      {
        title: '科技资源',
        docs: 'https://docs.rsshub.app/government.html#an-hui-sheng-ke-ji-ting-ke-ji-zi-yuan',
        source: ['/*'],
        target: (params, url) =>
          `/gov/anhui/kjt${
            new URL(url).href.match(/kjt\.ah\.gov\.cn(.*)\/index.html/)[1] ?? ''
          }`,
      },
    ],
  },
  'beijing.gov.cn': {
    _name: '北京市人民政府',
    jw: [
      {
        title: '北京市教育委员会通知公告',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-jiao-yu-wei-yuan-tong-zhi-gong-gao',
        source: ['/tzgg'],
        target: '/gov/beijing/jw/tzgg',
      },
    ],
    kw: [
      {
        title: '北京市科委央地协同',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1132') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委三城一区',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1134') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委高精尖产业',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1136') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委开放创新',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1138') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委深化改革',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1140') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委内设机构',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col746') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委直属机构',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col748') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委行政许可',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1520') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委行政处罚',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1522') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委行政确认',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1524') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委行政奖励',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1526') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '行北京市科委政检查',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1528') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委其他权力',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1542') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委最新政策',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2380') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委科技政策-科技法规规章文件',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2962' || params.channel === 'col2384') {
            return '/gov/beijing/kw/col2384';
          }
        },
      },
      {
        title: '北京市科委科技政策-科委规范性文件',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2962' || params.channel === 'col2386') {
            return '/gov/beijing/kw/col2386';
          }
        },
      },
      {
        title: '北京市科委科技政策-其他科技政策',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2962' || params.channel === 'col2388') {
            return '/gov/beijing/kw/col2388';
          }
        },
      },
      {
        title: '北京市科委国家科技政策',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2964') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委政策解读',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2396') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委通知公告',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col736') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委新闻中心',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col6382') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委要闻',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col6344') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委工作动态',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2330') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委媒体报道',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col2332') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委图片报道',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col6346') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
      {
        title: '北京市科委政府网站年报专栏',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-ke-xue-ji-shu-wei-yuan-hui-zhong-guan-cun-ke-ji-yuan-qu-guan-li-wei-yuan-hui',
        source: ['/col/:channel/index.html'],
        target: (params) => {
          if (params.channel === 'col1008') {
            return '/gov/beijing/kw/:channel';
          }
        },
      },
    ],
    wjw: [
      {
        title: '北京卫生健康委员会',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-wei-sheng-jian-kang-wei-yuan-hui',
        source: '/xwzx_20031/:caty',
        target: '/gov/beijing/mhc/:caty',
      },
    ],
  },
  'bphc.com.cn': {
    _name: '北京保障房中心有限公司',
    gycpt: [
      {
        title: '北京市共有产权住房租赁服务平台',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-shi-bao-zhang-fang-zhong-xin-you-xian-gong-si',
        source: ['/*'],
        target: (params, url) =>
          `/gov/bphc/${
            new URL(url).href.match(/gycpt\.bphc\.com\.cn\/(.*)/)[1]
          }`,
      },
    ],
  },
  'ccdi.gov.cn': {
    _name: '中央纪委国家监委',
    www: [
      {
        title: '要闻',
        docs: 'https://docs.rsshub.app/government.html#zhong-yang-ji-wei-guo-jia-jian-wei-yao-wen',
        source: ['/*'],
        target: (params, url) =>
          `/gov/ccdi/${new URL(url).href.match(/ccdi\.gov\.cn\/(.*)/)[1]}`,
      },
    ],
  },
  'changsha.gov.cn': {
    _name: '湖南省人民政府',
    wlwz: [
      {
        title: '市长信箱',
        docs: 'https://docs.rsshub.app/government.html#hu-nan-sheng-ren-min-zheng-fu',
        source: ['/webapp/cs2020/email/*'],
        target: '/gov/hunan/changsha/major-email',
      },
    ],
  },
  'cmse.gov.cn': {
    _name: '中国载人航天',
    www: [
      {
        title: '综合新闻',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/xwzx/zhxw'],
        target: '/gov/cmse/xwzx/zhxw',
      },
      {
        title: '研制进展',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/xwzx/yzjz'],
        target: '/gov/cmse/xwzx/yzjz',
      },
      {
        title: '官方公告',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/gfgg'],
        target: '/gov/cmse/gfgg',
      },
      {
        title: '飞行任务',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/fxrw'],
        target: '/gov/cmse/fxrw',
      },
      {
        title: '任务动态',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/fxrw/:id/:category'],
        target: '/gov/cmse/fxrw/:id/:category',
      },
      {
        title: '空间科学',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/kjkx/:id'],
        target: '/gov/cmse/kjkx/:id',
      },
      {
        title: '国际合作',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/gjhz'],
        target: '/gov/cmse/gjhz',
      },
      {
        title: '环球视野',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/hqsy/:id'],
        target: '/gov/cmse/hqsy/:id',
      },
      {
        title: '专题报道',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/ztbd/:id'],
        target: '/gov/cmse/ztbd/:id',
      },
      {
        title: '科普教育',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zai-ren-hang-tian',
        source: ['/kpjy/:id'],
        target: '/gov/cmse/kpjy/:id',
      },
    ],
  },
  'cnnic.net.cn': {
    _name: '中国互联网络信息中心',
    www: [
      {
        title: '新闻中心',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-hu-lian-wang-luo-xin-xi-zhong-xin-xin-wen-zhong-xin',
        source: ['/'],
        target: (params, url) =>
          `/gov/cnnic/${new URL(url).match(/cnnic\.net\.cn\/(.*)/)[1]}`,
      },
    ],
  },
  'csrc.gov.cn': {
    _name: '中国证券监督管理委员会',
    neris: [
      {
        title: '申请事项进度',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zheng-quan-jian-du-guan-li-wei-yuan-hui',
        source: ['/alappl/home1/onlinealog'],
        target: (_, url) =>
          `/gov/csrc/auditstatus/${new URL(url).searchParams.get(
            'appMatrCde'
          )}`,
      },
    ],
    www: [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zheng-quan-jian-du-guan-li-wei-yuan-hui',
        source: ['/csrc/*suffix'],
        target: '/gov/csrc/:suffix',
      },
    ],
  },
  'customs.gov.cn': {
    _name: '中华人民共和国海关总署',
    www: [
      {
        title: '拍卖信息 / 海关法规',
        docs: 'https://docs.rsshub.app/government.html#zhong-hua-ren-min-gong-he-guo-hai-guan-zong-shu',
        source: ['/'],
        target: '/gov/customs/list',
      },
    ],
  },
  'deyang.gov.cn': {
    _name: '德阳市人民政府',
    '.': [
      {
        title: '德阳市政府公开信息',
        docs: 'https://docs.rsshub.app/government.html#de-yang-shi-fu-ren-min-zheng-zheng-fu',
        source: ['/*'],
        target: '/sichuan/deyang/govpulicinfo/:countyName',
      },
    ],
  },
  'dianbai.gov.cn': {
    _name: '茂名市电白区人民政府',
    www: [
      {
        title: '茂名市电白区人民政府',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-dian-bai-qu-ren-min-zheng-fu',
        source: ['/*'],
        target: (params, url) =>
          `/gov/dianbai/${
            new URL(url).host.split('.dianbai.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'gaozhou.gov.cn': {
    _name: '高州市人民政府',
    www: [
      {
        title: '高州市人民政府',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-gao-zhou-shi-ren-min-zheng-fu',
        source: ['/*'],
        target: (params, url) =>
          `/gov/gaozhou/${
            new URL(url).host.split('.gaozhou.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'gz.gov.cn': {
    _name: '广州市人民政府',
    www: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/government.html#guang-zhou-shi-ren-min-zheng-fu',
        source: ['/:channel/:category'],
        target: (params) => `/gov/gz/${params.channel}/${params.category}`,
      },
    ],
  },
  'hebei.gov.cn': {
    _name: '河北省人民政府',
    czt: [
      {
        title: '河北省财政厅 - 财政动态',
        docs: 'https://docs.rsshub.app/government.html#he-bei-sheng-cai-zheng-ting-cai-zheng-dong-tai',
        source: ['/xwdt/:category'],
        target: (params) => {
          if (params.category === 'gzdt') {
            return '/gov/hebei/czt/xwdt/:category';
          }
        },
      },
      {
        title: '河北省财政厅 - 综合新闻',
        docs: 'https://docs.rsshub.app/government.html#he-bei-sheng-cai-zheng-ting-zong-he-xin-wen',
        source: ['/xwdt/:category'],
        target: (params) => {
          if (params.category === 'zhxw') {
            return '/gov/hebei/czt/xwdt/:category';
          }
        },
      },
      {
        title: '河北省财政厅 - 通知公告',
        docs: 'https://docs.rsshub.app/government.html#he-bei-sheng-cai-zheng-ting-tong-zhi-gong-gao',
        source: ['/xwdt/:category'],
        target: (params) => {
          if (params.category === 'tzgg') {
            return '/gov/hebei/czt/xwdt/:category';
          }
        },
      },
    ],
  },
  'homeaffairs.gov.au': {
    _name: 'Department of Home Affairs',
    immi: [
      {
        title: 'Immigration and Citizenship',
        docs: 'https://docs.rsshub.app/en/government.html#Australia-Department-of-Home-Affairs',
        source: '/news-media/archive',
        target: () => '/gov/immiau/news',
      },
    ],
  },
  'huazhou.gov.cn': {
    _name: '化州市人民政府',
    www: [
      {
        title: '化州市人民政府',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-hua-zhou-shi-ren-min-zheng-fu',
        source: ['/*'],
        target: (params, url) =>
          `/gov/huazhou/${
            new URL(url).host.split('.huazhou.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'huizhou.gov.cn': {
    _name: '惠州市人民政府',
    www: [
      {
        title: '政务公开 - 政务要闻',
        docs: 'https://docs.rsshub.app/government.html#guang-yan-an-dong-sheng-xing-xian-ren-min-zheng-zheng-fu-hui-zhou-shi-fu-ren-min-zheng-zheng-fu-zheng-zheng-wu-gong-kai',
        source: ['/zwgk/hzsz/:category'],
        target: (params) => {
          if (params.category === 'zwyw') {
            return '/gov/huizhou/zwgk/zwyw';
          }
        },
      },
      {
        title: '政务公开 - 机关动态',
        docs: 'https://docs.rsshub.app/government.html#guang-yan-an-dong-sheng-xing-xian-ren-min-zheng-zheng-fu-hui-zhou-shi-fu-ren-min-zheng-zheng-fu-zheng-zheng-wu-gong-kai',
        source: ['/zwgk/hzsz/:category'],
        target: (params) => {
          if (params.category === 'jgdt') {
            return '/gov/huizhou/zwgk/jgdt';
          }
        },
      },
      {
        title: '政务公开 - 县区要闻',
        docs: 'https://docs.rsshub.app/government.html#guang-yan-an-dong-sheng-xing-xian-ren-min-zheng-zheng-fu-hui-zhou-shi-fu-ren-min-zheng-zheng-fu-zheng-zheng-wu-gong-kai',
        source: ['/zwgk/hzsz/:category'],
        target: (params) => {
          if (params.category === 'xqyw') {
            return '/gov/huizhou/zwgk/xqyw';
          }
        },
      },
    ],
  },
  'maoming.gov.cn': {
    _name: '茂名市人民政府门户网站',
    '.': [
      {
        title: '茂名市人民政府',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-ren-min-zheng-fu-men-hu-wang-zhan',
        source: ['/*'],
        target: (params, url) =>
          `/gov/maoming/${
            new URL(url).host.split('.maoming.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'maonan.gov.cn': {
    _name: '茂名市茂南区人民政府',
    '.': [
      {
        title: '政务公开',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-mao-nan-qu-ren-min-zheng-fu',
        source: ['/zwgk/*'],
        target: '/gov/maonan/zwgk',
      },
      {
        title: '政务新闻',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-mao-nan-qu-ren-min-zheng-fu',
        source: ['/zwxw/*'],
        target: '/gov/maonan/zwxw',
      },
      {
        title: '茂南动态',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-mao-nan-qu-ren-min-zheng-fu',
        source: ['/zwxw/mndt/*'],
        target: '/gov/maonan/mndt',
      },
      {
        title: '重大会议',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-mao-nan-qu-ren-min-zheng-fu',
        source: ['/zwxw/zdhy/*'],
        target: '/gov/maonan/zdhy',
      },
      {
        title: '公告公示',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-mao-nan-qu-ren-min-zheng-fu',
        source: ['/zwgk/tzgg/*'],
        target: '/gov/maonan/tzgg',
      },
      {
        title: '招录信息',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-mao-nan-qu-ren-min-zheng-fu',
        source: ['/zwgk/zlxx/*'],
        target: '/gov/maonan/zlxx',
      },
      {
        title: '政策解读',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-mao-ming-shi-mao-nan-qu-ren-min-zheng-fu',
        source: ['/zwgk/zcjd/*'],
        target: '/gov/maonan/zcjd',
      },
    ],
  },
  'mee.gov.cn': {
    _name: '生态环境部',
    www: [
      {
        title: '要闻动态',
        docs: 'https://docs.rsshub.app/government.html#zhong-hua-ren-min-gong-he-guo-sheng-tai-huan-jing-bu',
        source: ['/ywdt/:category'],
        target: '/gov/mee/ywdt/:category',
      },
    ],
  },
  'mfa.gov.cn': {
    _name: '中华人民共和国外交部',
    www: [
      {
        title: '外交动态',
        docs: 'https://docs.rsshub.app/government.html#zhong-hua-ren-min-gong-he-guo-wai-jiao-bu-wai-jiao-dong-tai',
        source: ['/web/wjdt_674879/:category'],
        target: (params) => `/gov/mfa/wjdt/${params.category.split('_')[0]}`,
      },
    ],
  },
  'mgs.gov.cn': {
    _name: '广东茂名滨海新区政务网',
    www: [
      {
        title: '广东茂名滨海新区政务网',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-guang-dong-mao-ming-bin-hai-xin-qu-zheng-wu-wang',
        source: ['/*'],
        target: (params, url) =>
          `/gov/mgs/${
            new URL(url).host.split('.mgs.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'miit.gov.cn': {
    _name: '工业和信息化部',
    '.': [
      {
        title: '部门 文件发布',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-gong-ye-he-xin-xi-hua-bu',
        source: ['/jgsj/:ministry/wjfb/index.html'],
        target: '/miit/wjfb/:ministry',
      },
      {
        title: '征集意见',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-gong-ye-he-xin-xi-hua-bu',
        source: ['/gzcy/yjzj/index.html'],
        target: '/miit/yjzj',
      },
    ],
  },
  'mmht.gov.cn': {
    _name: '广东茂名高新技术产业开发区',
    www: [
      {
        title: '茂名高新技术产业开发区政务网',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-guang-dong-mao-ming-gao-xin-ji-shu-chan-ye-kai-fa-qu',
        source: ['/*'],
        target: (params, url) =>
          `/gov/mmht/${
            new URL(url).host.split('.mmht.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'moe.gov.cn': {
    _name: '中华人民共和国教育部',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/government.html#zhong-hua-ren-min-gong-he-guo-jiao-yu-bu',
        source: ['/'],
        target: '/gov/moe/newest_file',
      },
      {
        title: '司局通知',
        docs: 'https://docs.rsshub.app/government.html#zhong-hua-ren-min-gong-he-guo-jiao-yu-bu',
        source: ['/s78/:column/tongzhi', '/s78/:column'],
        target: '/gov/moe/s78/:column',
      },
    ],
  },
  'mofcom.gov.cn': {
    _name: '中华人民共和国商务部',
    '.': [
      {
        title: '新闻发布',
        docs: 'https://docs.rsshub.app/government.html#zhong-hua-ren-min-gong-he-guo-shang-wu-bu',
        source: ['/article/*'],
        target: (_, url) =>
          `/gov/mofcom/article/${new URL(url).pathname.replace(
            '/article/',
            ''
          )}`,
      },
    ],
  },
  'moj.gov.tw': {
    _name: '台灣法務部廉政署',
    'www.aac': [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/government.html#zhong-hua-ren-min-gong-he-guo-jiao-yu-bu',
        source: ['/7204/7246/'],
        target: (_params, url) =>
          `/gov/moj/aac/news${
            new URL(url).searchParams.has('type')
              ? '/' + new URL(url).searchParams.get('type')
              : ''
          }`,
      },
    ],
  },
  'nifdc.gov.cn': {
    _name: '国家药品监督管理局医疗器械标准管理中心',
    '.': [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-jian-du-guan-li-ju-yi-liao-qi-xie-biao-zhun-guan-li-zhong-xin',
        source: ['/*path'],
        target: (params) =>
          `/gov/nifdc/${params.path.replace('/index.html', '')}`,
      },
    ],
  },
  'nmpa.gov.cn': {
    _name: '国家药品监督管理局',
    '.': [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-yao-pin-jian-du-guan-li-ju',
        source: ['/*path'],
        target: (params) =>
          `/gov/nmpa/${params.path.replace('/index.html', '')}`,
      },
    ],
  },
  'nopss.gov.cn': {
    _name: '全国哲学社会科学工作办公室',
    '.': [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/government.html#quan-guo-zhe-xue-she-hui-ke-xue-gong-zuo-ban-gong-shi',
        source: ['/*path'],
        target: (params) =>
          `/gov/nopss/${params.path.replace('/index.html', '')}`,
      },
    ],
  },
  'nrta.gov.cn': {
    _name: '国家广播电视总局',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-guang-bo-dian-shi-zong-ju',
        source: ['/col/*category'],
        target: (params) =>
          `/gov/nrta/news/${params.category
            .replace('col', '')
            .replace('/index.html', '')}`,
      },
    ],
  },
  'nsfc.gov.cn': {
    _name: '国家自然科学基金委员会',
    '.': [
      {
        title: '基金要闻',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-zi-ran-ke-xue-ji-jin-wei-yuan-hui-ji-jin-yao-wen',
        source: ['/*'],
        target: '/nsfc/news/jjyw',
      },
      {
        title: '通知公告',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-zi-ran-ke-xue-ji-jin-wei-yuan-hui-ji-jin-yao-wen',
        source: ['/*'],
        target: '/nsfc/news/tzgg',
      },
      {
        title: '资助成果',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-zi-ran-ke-xue-ji-jin-wei-yuan-hui-ji-jin-yao-wen',
        source: ['/*'],
        target: '/nsfc/news/zzcg',
      },
      {
        title: '科普快讯',
        docs: 'https://docs.rsshub.app/other.html#guo-jia-zi-ran-ke-xue-ji-jin-wei-yuan-hui-ji-jin-yao-wen',
        source: ['/*'],
        target: '/nsfc/news/kpkx',
      },
    ],
  },
  'pbc.gov.cn': {
    _name: '中国人民银行',
    '.': [
      {
        title: '沟通交流',
        docs: 'https://docs.rsshub.app/finance.html#zhong-guo-ren-min-yin-xing',
        source: ['/goutongjiaoliu/113456/113469/index.html'],
        target: '/gov/pbc/goutongjiaoliu',
      },
      {
        title: '货币政策司公开市场交易公告',
        docs: 'https://docs.rsshub.app/finance.html#zhong-guo-ren-min-yin-xing',
        source: ['/zhengcehuobisi/125207/125213/125431/125475/index.html'],
        target: '/gov/pbc/zhengcehuobisi',
      },
      {
        title: '政策研究',
        docs: 'https://docs.rsshub.app/finance.html#zhong-guo-ren-min-yin-xing',
        source: ['/redianzhuanti/118742/4122386/4122510/index.html'],
        target: '/gov/pbc/zcyj',
      },
      {
        title: '工作论文',
        docs: 'https://docs.rsshub.app/finance.html#zhong-guo-ren-min-yin-xing',
        source: ['/redianzhuanti/118742/4122386/4122692/index.html'],
        target: '/gov/pbc/gzlw',
      },
    ],
  },
  'sasac.gov.cn': {
    _name: '国务院国有资产监督管理委员会',
    '.': [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/other.html#guo-wu-yuan-guo-you-zi-chan-jian-du-guan-li-wei-yuan-hui',
        source: ['/*path'],
        target: (params) =>
          `/gov/sasac/${params.path.replace('/index.html', '')}`,
      },
    ],
  },
  'sdb.gov.cn': {
    _name: '广东省茂名水东湾新城建设管理委员会',
    www: [
      {
        title: '广东省茂名水东湾新城建设管理委员会',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-guang-dong-sheng-mao-ming-shui-dong-wan-xin-cheng-jian-she-guan-li-wei-yuan-hui',
        source: ['/*'],
        target: (params, url) =>
          `/gov/sdb/${
            new URL(url).host.split('.sdb.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'sh.gov.cn': {
    _name: '上海市人民政府',
    wsjkw: [
      {
        title: '上海卫健委 疫情通报',
        docs: 'https://docs.rsshub.app/other.html#xin-guan-fei-yan-yi-qing-xin-wen-dong-tai-yi-qing-tong-bao-shang-hai-wei-jian-wei',
        source: ['/'],
        target: '/gov/shanghai/wsjkw/yqtb',
      },
    ],
    rsj: [
      {
        title: '上海市职业能力考试院 考试项目',
        docs: 'https://docs.rsshub.app/government.html#shang-hai-shi-ren-min-zheng-fu-shang-hai-shi-zhi-ye-neng-li-kao-shi-yuan-kao-shi-xiang-mu',
        source: ['/'],
        target: '/gov/shanghai/rsj/ksxm',
      },
    ],
    yjj: [
      {
        title: '上海市药品监督管理局',
        docs: 'https://docs.rsshub.app/government.html#shang-hai-shi-ren-min-zheng-fu-shang-hai-shi-yao-pin-jian-du-guan-li-ju',
        source: ['/'],
        target: (params, url) =>
          `/gov/shanghai/yjj/${
            new URL(url).match(/yjj\.sh\.gov\.cn\/(.*)\/index.html/)[1]
          }`,
      },
    ],
  },
  'shaanxi.gov.cn': {
    _name: '陕西省人民政府',
    kjt: [
      {
        title: '陕西省科学技术厅',
        docs: 'https://docs.rsshub.app/government.html#shan-xi-sheng-sheng-ren-min-zheng-fu-sheng-ke-xue-ji-shu-ting',
        source: ['/view/iList.jsp', '/'],
        target: (params, url) =>
          `/gov/shaanxi/kjt/${new URL(url).searchParams.get('cat_id')}`,
      },
    ],
  },
  'stats.gov.cn': {
    _name: '国家统计局',
    www: [
      {
        title: '统计数据 > 最新发布',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-tong-ji-ju-tong-ji-shu-ju-zui-xin-fa-bu',
        source: ['/*'],
        target: (params, url) =>
          `/gov/stats/${new URL(url).href.match(/stats\.gov\.cn\/(.*)/)[1]}`,
      },
    ],
  },
  'sz.gov.cn': {
    _name: '深圳政府在线移动门户',
    hrss: [
      {
        title: '考试院公告',
        docs: 'https://docs.rsshub.app/government.html#guang-dong-sheng-ren-min-zheng-fu-shen-zhen-shi-wei-zu-zhi-bu',
        source: ['/*'],
        target: '/gov/shenzhen/hrss/szksy/:caty/:page?',
      },
    ],
    xxgk: [
      {
        title: '深圳市人民政府',
        docs: 'https://docs.rsshub.app/government.html#guang-dong-sheng-ren-min-zheng-fu-guang-dong-sheng-shen-zhen-shi-ren-min-zheng-fu',
        source: ['/cn/xxgk/zfxxgj/:caty'],
        target: '/gov/shenzhen/hrss/szksy/:caty/:page?',
      },
    ],
    zzb: [
      {
        title: '组工在线公告',
        docs: 'https://docs.rsshub.app/government.html#guang-dong-sheng-ren-min-zheng-fu-shen-zhen-shi-kao-shi-yuan',
        source: ['/*'],
        target: '/gov/shenzhen/zzb/:caty/:page?',
      },
    ],
  },
  'taiyuan.gov.cn': {
    _name: '太原市人民政府',
    rsj: [
      {
        title: '太原市人力资源和社会保障局政府公开信息',
        docs: 'https://docs.rsshub.app/government.html#tai-yuan-shi-ren-min-zheng-fu-tai-yuan-shi-ren-li-zi-yuan-he-she-hui-bao-zhang-ju-zheng-fu-gong-kai-xin-xi',
        source: ['/*'],
        target: '/taiyuan/rsj/:caty/:page?',
      },
    ],
  },
  'tqyb.com.cn': {
    _name: '广州天气',
    www: [
      {
        title: '突发性天气提示',
        docs: 'https://docs.rsshub.app/government.html#guang-zhou-tian-qi-tu-fa-xing-tian-qi-ti-shi',
        source: ['/gz/weatherAlarm/suddenWeather/'],
        target: '/gov/guangdong/tqyb/tfxtq',
      },
      {
        title: '广东省内城市预警信号',
        docs: 'https://docs.rsshub.app/government.html#guang-zhou-tian-qi-guang-dong-sheng-nei-cheng-shi-yu-jing-xin-hao',
        source: ['/gz/weatherAlarm/otherCity/'],
        target: '/gov/guangdong/tqyb/sncsyjxh',
      },
    ],
  },
  'xinyi.gov.cn': {
    _name: '信宜市人民政府',
    www: [
      {
        title: '信宜市人民政府',
        docs: 'https://docs.rsshub.app/government.html#mao-ming-shi-ren-min-zheng-fu-xin-yi-shi-ren-min-zheng-fu',
        source: ['/*'],
        target: (params, url) =>
          `/gov/xinyi/${
            new URL(url).host.split('.xinyi.gov.cn')[0] +
            new URL(url).pathname.replace(/(index.*$)/g, '')
          }`,
      },
    ],
  },
  'www.gov.cn': {
    _name: '中国政府网',
    '.': [
      {
        title: '最新政策',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zheng-fu-wang',
        source: ['/zhengce/zuixin.htm', '/'],
        target: '/gov/zhengce/zuixin',
      },
      {
        title: '最新文件',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zheng-fu-wang',
        source: ['/'],
        target: '/gov/zhengce/wenjian',
      },
      {
        title: '信息稿件',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zheng-fu-wang',
        source: ['/'],
        target: '/gov/zhengce/govall',
      },
      {
        title: '国务院政策文件库',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zheng-fu-wang',
        source: ['/zhengce/zhengceku/:lib'],
        target: (params) => `/gov/zhengce/zhengceku/${params.libs}`,
      },
    ],
  },
  'wuhan.gov.cn': {
    _name: '武汉市人民政府',
    '.': [
      {
        title: '武汉要闻',
        docs: 'https://docs.rsshub.app/government.html#zhong-guo-zheng-fu-wang',
        source: ['/sy/whyw/', '/whyw', '/'],
        target: '/gov/wuhan/sy/whyw',
      },
    ],
  },
  'xz.gov.cn': {
    _name: '徐州市人民政府',
    hrss: [
      {
        title: '徐州市人力资源和社会保障局',
        docs: 'https://docs.rsshub.app/government.html#xu-zhou-shi-ren-min-zheng-fu-xu-zhou-shi-ren-li-zi-yuan-he-she-hui-bao-zhang-ju',
        source: ['/*'],
        target: (params, url) =>
          `/gov/xuzhou/hrss${
            new URL(url).href.match(/\/(\d+)\/subPage.html/)[1] ?? ''
          }`,
      },
    ],
  },
  'gq.com.tw': {
    _name: 'GQ Taiwan',
    '.': [
      {
        title: 'GQ Taiwan',
        docs: 'https://docs.rsshub.app/new-media.html#gq',
        source: ['/*path'],
        target: '/gq/tw/:path',
      },
    ],
  },
  'greasyfork.org': {
    _name: 'Greasy Fork',
    '.': [
      {
        title: 'User scripts',
        docs: 'https://docs.rsshub.app/program-update.html#greasy-fork',
        source: ['/:language', '/:language/scripts/by-site/:domain?'],
        target: '/greasyfork/:language/:domain?',
      },
      {
        title: 'Feedback',
        docs: 'https://docs.rsshub.app/program-update.html#greasy-fork',
        source: '/:language/scripts/:script/feedback',
        target: '/greasyfork/scripts/:script/feedback',
      },
      {
        title: 'Version history',
        docs: 'https://docs.rsshub.app/program-update.html#greasy-fork',
        source: '/:language/scripts/:script/versions',
        target: '/greasyfork/scripts/:script/versions',
      },
    ],
  },
  'guancha.cn': {
    _name: '观察者网',
    '.': [
      {
        title: '头条',
        docs: 'https://docs.rsshub.app/new-media.html#guan-cha-zhe-wang-tou-tiao',
        source: ['/GuanChaZheTouTiao', '/'],
        target: '/guancha/headline',
      },
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#guan-cha-zhe-wang-shou-ye',
        source: ['/'],
        target: '/guancha/:category?',
      },
      {
        title: '观学院',
        docs: 'https://docs.rsshub.app/new-media.html#guan-cha-zhe-wang-guan-xue-yuan',
        source: ['/'],
        target: '/guancha/:category?',
      },
    ],
    app: [
      {
        title: '个人主页文章',
        docs: 'https://docs.rsshub.app/new-media.html#guan-cha-zhe-wang-ge-ren-zhu-ye-wen-zhang',
        source: ['/user/get-published-list', '/'],
        target: (params, url) =>
          `/guancha/personalpage/${new URL(url).searchParams.get('uid')}`,
      },
    ],
    member: [
      {
        title: '观学院',
        docs: 'https://docs.rsshub.app/new-media.html#guan-cha-zhe-wang-guan-xue-yuan',
        source: ['/'],
        target: '/guancha/member/recommend',
      },
    ],
    user: [
      {
        title: '风闻话题',
        docs: 'https://docs.rsshub.app/new-media.html#guan-cha-zhe-wang-feng-wen-hua-ti',
        source: ['/topic/post-list', '/'],
        target: (params, url) =>
          `/guancha/topic/${new URL(url).searchParams.get(
            'topic_id'
          )}/${new URL(url).searchParams.get('order')}`,
      },
    ],
  },
  'guandian.cn': {
    _name: '观点网',
    www: [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#guan-dian-wang-zi-xun',
        source: ['/:category'],
        target: '/guandian/:category',
      },
    ],
  },
  'guangdiu.com': {
    _name: '逛丢',
    '.': [
      {
        title: '折扣',
        docs: 'https://docs.rsshub.app/shopping.html#guang-diu',
        source: ['/', '/cate.php'],
        target: (param, url) =>
          `/guangdiu/${url.indexOf('?') > -1 ? url.split('?')[1] : ''}`,
      },
      {
        title: '一小时风云榜',
        docs: 'https://docs.rsshub.app/shopping.html#guang-diu',
        source: ['/rank'],
        target: '/guangdiu/rank',
      },
      {
        title: '九块九',
        docs: 'https://docs.rsshub.app/shopping.html#guang-diu',
        source: ['/cheaps.php'],
        target: (param, url) =>
          `/guangdiu/${url.indexOf('?') > -1 ? url.split('?')[1] : ''}`,
      },
    ],
  },
  'guanhai.com.cn': {
    _name: '观海新闻',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#guan-hai-xin-wen',
        source: ['/'],
        target: '/guanhai',
      },
    ],
  },
  'guduodata.com': {
    _name: '骨朵数据',
    data: [
      {
        title: '日榜',
        docs: 'https://docs.rsshub.app/other.html#gu-duo-shu-ju',
        source: ['/'],
        target: '/guduodata/daily',
      },
    ],
  },
  'guggenheim.org': {
    _name: 'Solomon R. Guggenheim Museum',
    www: [
      {
        title: 'Exhibitions',
        docs: 'https://docs.rsshub.app/en/travel.html#solomon-r-guggenheim-museum',
      },
    ],
  },
  'gumroad.com': {
    _name: 'Gumroad',
    '.': [
      {
        title: '产品',
        docs: 'https://docs.rsshub.app/shopping.html#gumroad',
        source: ['/l/:products'],
        target: (params, url) => {
          const username = new URL(url).host.split('.')[0];

          return `/gumroad/${username}/${params.products}`;
        },
      },
    ],
  },
  'guokr.com': {
    _name: '果壳网',
    '.': [
      {
        title: '科学人',
        docs: 'https://docs.rsshub.app/new-media.html#guo-ke-wang-ke-xue-ren',
        source: ['/scientific', '/'],
        target: '/guokr/scientific',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/new-media.html#guo-ke-wang-zhuan-lan',
        source: ['/'],
        target: '/guokr/:channel',
      },
    ],
  },
  'gzh360.com': {
    _name: '公众号360',
    web: [
      {
        title: '公众号',
        docs: 'https://docs.rsshub.app/new-media.html#gong-zhong-hao-360',
        source: ['/gzh_articles', '/gzh', '/'],
        target: (params, url) =>
          `/gzh360/gzh/${new URL(url).searchParams.get('id') ?? ''}`,
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#gong-zhong-hao-360',
        source: ['/category', '/'],
        target: (params, url) =>
          `/gzh360/category/${new URL(url).searchParams.get('id') ?? ''}`,
      },
    ],
  },
  'ycombinator.com': {
    _name: 'Hacker News',
    '.': [
      {
        title: 'Section',
        docs: 'https://docs.rsshub.app/programming.html#hacker-news',
        source: ['/:section', '/'],
        target: '/hackernews/:section?/:type?/:user?',
      },
    ],
  },
  'hackertalk.net': {
    _name: 'Hacker Talk 黑客说',
    '.': [
      {
        title: '最新的帖子',
        docs: 'https://docs.rsshub.app/bbs.html#hacker-talk-hei-ke-shuo',
        source: ['/?tab=new', '/'],
        target: '/hackertalk',
      },
    ],
  },
  'hackmd.io': {
    _name: 'HackMD',
    '.': [
      {
        title: 'Profile',
        docs: 'http://docs.rsshub.app/programming.html#hackmd',
        source: ['/:profile'],
        target: (params) => `/hackmd/profile/${params.replace('@', '')}`,
      },
    ],
  },
  'hafu.edu.cn': {
    _name: '河南财政金融学院',
    www: [
      {
        title: '河南财政金融学院 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#he-nan-cai-zheng-jin-rong-xue-yuan',
        source: '/*',
        target: (params, url) => {
          if (url.indexOf('www')) {
            return '/hafu/news/ggtz';
          }
          if (url.indexOf('jwc')) {
            return '/hafu/news/jwc';
          }
          if (url.indexOf('zsjyc')) {
            return '/hafu/news/zsjyc';
          }
        },
      },
    ],
  },
  'hakkatv.org.tw': {
    _name: '客家電視台',
    '.': [
      {
        title: '新聞首頁 - 客家電視台',
        docs: 'https://docs.rsshub.app/traditional-media.html#ke-jia-dian-shi-tai',
        source: '/news',
        target: '/hakkatv/news',
      },
    ],
  },
  'syosetu.org': {
    _name: 'hameln',
    '.': [
      {
        title: '章节更新',
        docs: 'https://docs.rsshub.app/reading.html#hameln-zhang-jie-geng-xin',
        source: ['/novel/:id'],
        target: '/hameln/chapter/:id',
      },
    ],
  },
  'hashnode.dev': {
    _name: 'hashnode',
    '.': [
      {
        title: 'Hashnode Blog',
        docs: 'https://docs.rsshub.app/blog.html#hashnode',
        source: '/',
        target: '/hashnode/blog/:username',
      },
    ],
  },
  'hbr.org': {
    _name: 'Harvard Business Review',
    '.': [
      {
        title: 'Topic',
        docs: 'https://docs.rsshub.app/new-media.html#harvard-business-review-topic',
        source: ['/topic/:topic?', '/'],
        target: '/hbr/topic/:topic?/:type?',
      },
    ],
  },
  'hdu.edu.cn': {
    _name: '杭州电子科技大学',
    computer: [
      {
        title: '计算机学院 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#hang-zhou-dian-zi-ke-ji-da-xue',
        source: '/6738/list.htm',
        target: '/hdu/cs',
      },
      {
        title: '杭电计算机-研究生通知',
        docs: 'https://docs.rsshub.app/university.html#hang-zhou-dian-zi-ke-ji-da-xue',
        source: '/6769/list.htm',
        target: '/hdu/cs/pg',
      },
    ],
  },
  'hellobtc.com': {
    _name: '白话区块链',
    '.': [
      {
        title: '首页-最新',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/'],
        target: '/hellobtc/information/latest',
      },
      {
        title: '首页-应用',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/'],
        target: '/hellobtc/information/application',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/news'],
        target: '/hellobtc/news',
      },
      {
        title: '科普-最新',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/latest',
      },
      {
        title: '科普-比特币',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/bitcoin',
      },
      {
        title: '科普-以太坊',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/ethereum',
      },
      {
        title: '科普-DeFi',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/defi',
      },
      {
        title: '科普-跨链',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/inter_blockchain',
      },
      {
        title: '科普-挖矿',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/mining',
      },
      {
        title: '科普-安全',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/safety',
      },
      {
        title: '科普-中本聪',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/satoshi_nakamoto',
      },
      {
        title: '科普-公链',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/kepu.html'],
        target: '/hellobtc/kepu/public_blockchain',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/new-media.html#bai-hua-qu-kuai-lian',
        source: ['/topic/:id'],
        target: (params) => `/hellobtc/topic/${params.id.split('.')[0]}`,
      },
    ],
  },
  'hellogithub.com': {
    _name: 'HelloGitHub',
    '.': [
      {
        title: '热门',
        docs: 'https://docs.rsshub.app/programming.html#hellogithub-re-men',
        source: ['/'],
        target: (params, url) => {
          const sort = new URL(url).searchParams.get('sort_by');
          const id = new URL(url).searchParams.get('tid');
          return `/hellogithub${sort ? `/sort` : ''}${id ? `/id` : ''}`;
        },
      },
      {
        title: '最近',
        docs: 'https://docs.rsshub.app/programming.html#hellogithub-zui-jin',
        source: ['/'],
        target: (params, url) => {
          const sort = new URL(url).searchParams.get('sort_by');
          const id = new URL(url).searchParams.get('tid');
          return `/hellogithub${sort ? `/sort` : ''}${id ? `/id` : ''}`;
        },
      },
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/programming.html#hellogithub-wen-zhang',
        source: ['/'],
        target: (params, url) => {
          const sort = new URL(url).searchParams.get('sort_by');
          const id = new URL(url).searchParams.get('tid');
          return `/hellogithub/article${sort ? `/sort` : ''}${id ? `/id` : ''}`;
        },
      },
      {
        title: '排行榜',
        docs: 'https://docs.rsshub.app/programming.html#hellogithub-pai-hang-bang',
        source: ['/report/:type', '/'],
        target: '/hellogithub/report/:type',
      },
      {
        title: '月刊',
        docs: 'https://docs.rsshub.app/programming.html#hellogithub-yue-kan',
        source: ['/periodical/volume/:id', '/'],
        target: '/hellogithub/volume',
      },
    ],
  },
  'hex-rays.com': {
    _name: 'Hex-Rays',
    '.': [
      {
        title: 'Hex-Rays News',
        docs: 'https://docs.rsshub.app/programming.html#hex-rays',
        source: ['/', '/blog'],
        target: '/hex-rays/news',
      },
    ],
  },
  'hit.edu.cn': {
    _name: '哈尔滨工业大学',
    jwc: [
      {
        title: '哈尔滨工业大学教务处通知公告',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-ye-da-xue',
        source: '/*',
        target: '/hit/jwc',
      },
    ],
    today: [
      {
        title: '今日哈工大',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-ye-da-xue',
        source: '/category/:category',
        target: '/hit/today/:category',
      },
    ],
    hitgs: [
      {
        title: '哈工大研究生院通知公告',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-ye-da-xue',
        source: '/*',
        target: '/hit/hitgs',
      },
    ],
  },
  'hitsz.edu.cn': {
    _name: '哈尔滨工业大学（深圳）',
    '.': [
      {
        title: '新闻中心',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-ye-da-xue-shen-zhen',
        source: ['/article/:category?', '/subject/:category?'],
        target: (params) =>
          `/hitsz/article/${params.category.replace('.html', '')}`,
      },
    ],
  },
  'hitwh.edu.cn': {
    _name: '哈尔滨工业大学（威海）',
    '.': [
      {
        title: '今日工大 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-ye-da-xue-wei-hai',
        source: ['/1024/list.htm', '/'],
        target: '/hitwh/today',
      },
    ],
  },
  'hizh.cn': {
    _name: '珠海网',
    '.': [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/new-media.html#zhu-hai-wang-lan-mu',
        source: '/',
        target: '/hizu/:column?',
      },
    ],
  },
  'hjedd.com': {
    _name: '海角社区',
    '.': [
      {
        title: '热门',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-re-men',
        source: ['/'],
        target: '/hjedd/hot',
      },
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-xin-wen',
        source: ['/'],
        target: '/hjedd/news',
      },
      {
        title: '大事记',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-da-shi-ji',
        source: ['/article', '/'],
        target: '/hjedd/event',
      },
      {
        title: '原创',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-da-yuan-chuang',
        source: ['/'],
        target: '/hjedd/original',
      },
      {
        title: '精华',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-da-jing-hua',
        source: ['/'],
        target: '/hjedd/top',
      },
      {
        title: '公告',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-da-gong-gao',
        source: ['/'],
        target: '/hjedd/notice',
      },
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-da-zui-xin',
        source: ['/'],
        target: '/hjedd/latest',
      },
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/bbs.html#hai-jiao-she-qu-da-wen-zhang',
        source: ['/article', '/'],
        target: (params, url) =>
          `/hjedd/${new URL(url).searchParams.get('nodeId')}`,
      },
    ],
  },
  'hk01.com': {
    _name: '香港01',
    '.': [
      {
        title: '热门',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-01-re-men',
        source: ['/hot', '/'],
        target: '/hk01/hot',
      },
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-01-lan-mu',
        source: ['/zone/:id', '/'],
        target: '/hk01/zone/:id?',
      },
      {
        title: '子栏目',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-01-zi-lan-mu',
        source: ['/channel/:id', '/'],
        target: '/hk01/channel/:id?',
      },
      {
        title: '专题',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-01-zhuan-ti',
        source: ['/issue/:id', '/'],
        target: '/hk01/issue/:id?',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-01-biao-qian',
        source: ['/tag/:id', '/'],
        target: '/hk01/tag/:id?',
      },
    ],
  },
  'hkej.com': {
    _name: '信报财经新闻',
    '.': [
      {
        title: '即时新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html##xin-bao-cai-jing-xin-wen',
        source: ['/'],
        target: '/hkej/:category?',
      },
    ],
  },
  'hkepc.com': {
    _name: 'HKEPC',
    '.': [
      {
        title: 'HKEPC 电脑领域',
        docs: 'https://docs.rsshub.app/new-media.html#hkepc',
        source: ['/:category?'],
        target: '/hkepc/:category?',
      },
      {
        title: 'HKEPC 电脑领域',
        docs: 'https://docs.rsshub.app/new-media.html#hkepc',
        source: ['/'],
        target: '/hkepc',
      },
    ],
  },
  'hket.com': {
    _name: '香港经济日报',
    china: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-jing-ji-ri-bao',
        source: ['/:category/*'],
        target: '/hket/:category',
      },
    ],
    inews: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-jing-ji-ri-bao',
        source: ['/:category/*'],
        target: '/hket/:category',
      },
    ],
    topick: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-jing-ji-ri-bao',
        source: ['/:category/*'],
        target: '/hket/:category',
      },
    ],
    wealth: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-jing-ji-ri-bao',
        source: ['/:category/*'],
        target: '/hket/:category',
      },
    ],
    www: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#xiang-gang-jing-ji-ri-bao',
        source: ['/'],
        target: '/hket',
      },
    ],
  },
  'hkjunkcall.com': {
    _name: 'HKJunkCall資訊中心',
    '.': [
      {
        title: '近期資訊',
        docs: 'https://docs.rsshub.app/new-media.html#hkjunkcall-zi-xun-zhong-xin-jin-qi-zi-xun',
        source: ['/'],
        target: '/hkjunkcall',
      },
    ],
  },
  'hljucm.net': {
    _name: '黑龙江中医药大学',
    yjsy: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#hei-long-jiang-zhong-yi-yao-da-xue',
        source: ['/index/:category', '/index'],
        target: (params) =>
          `/hljucm/yjsy/${params.category.replace('.htm', '')}`,
      },
    ],
  },
  'voc.com.cn': {
    _name: '华声在线',
    '.': [
      {
        title: '湖南日报',
        docs: 'https://docs.rsshub.app/journal.html#hu-nan-ri-bao-dian-zi-kan-wu',
        source: ['/'],
        target: '/hnrb/:id',
      },
    ],
  },
  'dh.gov.hk': {
    _name: '香港卫生署',
    '.': [
      {
        title: '新闻公报',
        docs: 'https://docs.rsshub.app/government.html#xiang-gang-wei-sheng-shu-xin-wen-gong-bao',
        source: ['/'],
        target: '/hongkong/dh/:language?',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/government.html#xiang-gang-wei-sheng-fang-hu-zhong-xin-fen-lei',
        source: ['/'],
        target: '/hongkong/chp/:category?/:language?',
      },
    ],
  },
  'hotchina.news': {
    _name: '辛華社',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#xin-hua-she-shou-ye',
        source: ['/'],
        target: '/hotchina',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#xin-hua-she-fen-lei',
        source: ['/archives/category/:id', '/'],
        target: '/hotchina/category/:id?',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#xin-hua-she-biao-qian',
        source: ['/archives/tag/:id', '/'],
        target: '/hotchina/tag/:id?',
      },
    ],
  },
  'hotukdeals.com': {
    _name: 'hotukdeals',
    www: [
      {
        title: 'highlights',
        docs: 'https://docs.rsshub.app/shopping.html#hotukdeals',
        source: ['/'],
        target: '/hotukdeals/highlights',
      },
      {
        title: 'hot',
        docs: 'https://docs.rsshub.app/shopping.html#hotukdeals',
        source: ['/'],
        target: '/hotukdeals/hot',
      },
      {
        title: 'new',
        docs: 'https://docs.rsshub.app/shopping.html#hotukdeals',
        source: ['/'],
        target: '/hotukdeals/new',
      },
      {
        title: 'discussed',
        docs: 'https://docs.rsshub.app/shopping.html#hotukdeals',
        source: ['/'],
        target: '/hotukdeals/discussed',
      },
      {
        title: 'hottest',
        docs: 'https://docs.rsshub.app/shopping.html#hotukdeals',
        source: ['/'],
        target: '/hotukdeals/hottest',
      },
    ],
  },
  'houxu.app': {
    _name: '后续',
    '.': [
      {
        title: '热点',
        docs: 'https://docs.rsshub.app/new-media.html#hou-xu-re-dian',
        source: ['/'],
        target: '/houxu',
      },
      {
        title: '跟踪',
        docs: 'https://docs.rsshub.app/new-media.html#hou-xu-gen-zong',
        source: ['/memory', '/'],
        target: '/houxu/memory',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/new-media.html#hou-xu-zhuan-lan',
        source: ['/events', '/'],
        target: '/houxu/events',
      },
      {
        title: 'Live',
        docs: 'https://docs.rsshub.app/new-media.html#hou-xu-live',
        source: ['/lives/:id', '/'],
        target: '/houxu/lives/:id',
      },
    ],
  },
  'hrbeu.edu.cn': {
    _name: '哈尔滨工程大学',
    yjsy: [
      {
        title: '研究生院 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/yjsy/announcement',
      },
      {
        title: '研究生院 - 新闻动态',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/yjsy/news',
      },
      {
        title: '研究生院 - 国家公派项目',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/yjsy/gjgp',
      },
      {
        title: '研究生院 - 国际合作与交流项目',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/yjsy/gjhz',
      },
    ],
    job: [
      {
        title: '就业服务平台 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/job/tzgg',
      },
    ],
    uae: [
      {
        title: '水声学院 - 新闻动态',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/shuisheng/xwdt',
      },
      {
        title: '研究生院 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/shuisheng/tzgg',
      },
    ],
  },
  'hrbust.edu.cn': {
    _name: '哈尔滨理工大学',
    jwzx: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-li-gong-da-xue',
        source: '/homepage/*',
        target: (params, url) =>
          `/hrbust/jwzx/${new URL(url).searchParams.get('columnId')}`,
      },
    ],
  },
  'huangz.me': {
    _name: '黄健宏博客',
    blog: [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/blog.html#huang-jian-hong-bo-ke',
        source: ['/*.html'],
        target: '/huangz',
      },
    ],
  },
  'huanqiu.com': {
    _name: '环球网',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/traditional-media.html#huan-qiu',
        source: '/',
        target: '/news/huanqiu/:category?',
      },
    ],
  },
  'hunanpea.com': {
    _name: '湖南人事考试网',
    rsks: [
      {
        title: '公告',
        docs: 'https://docs.rsshub.app/study.html#hu-nan-ren-shi-kao-shi-wang',
        source: ['/Category/:guid/ArticlesByCategory.do'],
        target: '/hunanpea/rsks/:guid',
      },
    ],
  },
  'hupu.com': {
    _name: '虎扑',
    '': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/bbs.html#hu-pu-shou-ye',
        source: ['/:category', '/'],
        target: '/hupu/:category',
      },
    ],
    bbs: [
      {
        title: '热帖',
        docs: 'https://docs.rsshub.app/bbs.html#hu-pu-re-tie',
        source: ['/:id'],
        target: '/hupu/all/:id',
      },
    ],
    m: [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/bbs.html#hu-pu-shou-ye',
        source: ['/:category', '/'],
        target: '/hupu/:category',
      },
      {
        title: '社区',
        docs: 'https://docs.rsshub.app/bbs.html#hu-pu-she-qu',
        source: ['/bbs/:id', '/'],
        target: '/hupu/bbs/:id/:order',
      },
    ],
  },
  'huxiu.com': {
    _name: '虎嗅',
    '.': [
      {
        title: '首页资讯',
        docs: 'https://docs.rsshub.app/new-media.html#hu-xiu',
        source: ['/article', '/'],
        target: '/huxiu/article',
      },
      {
        title: '24小时',
        docs: 'https://docs.rsshub.app/new-media.html#hu-xiu',
        source: ['/moment', '/'],
        target: '/huxiu/moment',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#hu-xiu',
        source: ['/tags/:id'],
        target: (params) => `/huxiu/tag/${params.id.replace('.html', '')}`,
      },
      { title: '搜索', docs: 'https://docs.rsshub.app/new-media.html#hu-xiu' },
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/new-media.html#hu-xiu',
        source: ['/member/:id/*', '/'],
        target: '/huxiu/author/:id',
      },
      {
        title: '文集',
        docs: 'https://docs.rsshub.app/new-media.html#hu-xiu',
        source: ['/collection/:id', '/'],
        target: (params) =>
          `/huxiu/collection/${params.id.replace('.html', '')}`,
      },
      {
        title: '简报',
        docs: 'https://docs.rsshub.app/new-media.html#hu-xiu',
        source: ['/briefColumn/:id', '/'],
        target: (params) =>
          `/huxiu/briefcolumn/${params.id.replace('.html', '')}`,
      },
    ],
  },
  'hyqss.cn': {
    _name: '衡阳全搜索',
    '.': [
      {
        title: '衡阳日报',
        docs: 'https://docs.rsshub.app/journal.html#heng-yang-quan-sou-suo-heng-yang-ri-bao',
        source: ['/'],
        target: '/hnrb/hyrb/:id?',
      },
      {
        title: '衡阳晚报',
        docs: 'https://docs.rsshub.app/journal.html#heng-yang-quan-sou-suo-heng-yang-wan-bao',
        source: ['/'],
        target: '/hnrb/hywb/:id?',
      },
    ],
    epaper: [
      {
        title: '衡阳日报',
        docs: 'https://docs.rsshub.app/journal.html#heng-yang-quan-sou-suo-heng-yang-ri-bao',
        source: ['/'],
        target: '/hnrb/hyrb/:id?',
      },
      {
        title: '衡阳晚报',
        docs: 'https://docs.rsshub.app/journal.html#heng-yang-quan-sou-suo-heng-yang-wan-bao',
        source: ['/'],
        target: '/hnrb/hywb/:id?',
      },
    ],
  },
  'https://www.icac.org.hk': {
    _name: '廉政公署',
    '.': [
      {
        title: '新闻公布',
        docs: 'https://docs.rsshub.app/government.html#xiang-gang-lian-zheng-gong-shu',
        source: ['/:lang/press/index.html'],
        target: '/icac/news/:lang',
      },
    ],
  },
  'ieee.org': {
    _name: 'IEEE',
    www: [
      {
        title: 'Journal',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: '/*',
        target: (params, url) =>
          `/ieee/journal/${new URL(url).searchParams.get('punumber')}`,
      },
      {
        title: 'Recent',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: '/*',
        target: (params, url) =>
          `/ieee/journal/${new URL(url).searchParams.get('punumber')}/recent`,
      },
    ],
  },
  'ieee-security.org': {
    _name: 'IEEE Computer Society',
    '.': [
      {
        title: 'IEEE Symposium on Security and Privacy',
        docs: 'https://docs.rsshub.app/journal.html#ieee-computer-society',
        source: ['/TC/SP-Index.html', '/'],
        target: '/ieee-security/security-privacy',
      },
    ],
  },
  'neea.cn': {
    _name: '中国教育考试网',
    jlpt: [
      {
        title: '教育部考试中心日本语能力测试重要通知',
        docs: 'https://docs.rsshub.app/study.html#jiao-yu-bu-kao-shi-zhong-xin-ri-ben-yu-neng-li-ce-shi-zhong-yao-tong-zhi',
        source: ['/'],
        target: '/neea/jlpt',
      },
    ],
  },
  'ifeng.com': {
    _name: '凤凰网',
    '.': [
      {
        title: '大风号',
        docs: 'https://docs.rsshub.app/new-media.html#feng-huang-wang',
      },
    ],
    news: [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#feng-huang-wang-zi-xun',
        target: (params, url) =>
          `/ifeng/news${new URL(url).toString().match(/ifeng\.com(.*?)$/)[1]}`,
      },
    ],
  },
  'iguoguo.net': {
    _name: '爱果果',
    '.': [
      {
        title: '最新H5',
        docs: 'https://docs.rsshub.app/design.html#ai-guo-guo-h5',
      },
    ],
  },
  'iiilab.com': {
    _name: '人人都是自媒体',
    www: [
      {
        title: '发现',
        docs: 'https://docs.rsshub.app/new-media.html#ren-ren-dou-shi-zi-mei-ti',
        source: '/',
        target: '/iiilab',
      },
    ],
  },
  'ikea.com': {
    _name: 'IKEA 宜家',
    '.': [
      {
        title: '英国 - 商品上新',
        docs: 'https://docs.rsshub.app/shopping.html#ikea-yi-jia',
        source: ['/gb/en/new/new-products/', '/'],
        target: '/ikea/gb/new',
      },
      {
        title: '英国 - 促销',
        docs: 'https://docs.rsshub.app/shopping.html#ikea-yi-jia',
        source: ['/gb/en/offers', '/'],
        target: '/ikea/gb/offer',
      },
    ],
  },
  'ikea.cn': {
    _name: 'IKEA 宜家',
    '.': [
      {
        title: '中国 - 当季新品推荐',
        docs: 'https://docs.rsshub.app/shopping.html#ikea-yi-jia',
        source: ['/cn/zh/new/', '/'],
        target: '/ikea/cn/new',
      },
      {
        title: '中国 - 低价优选',
        docs: 'https://docs.rsshub.app/shopping.html#ikea-yi-jia',
        source: [
          '/cn/zh/campaigns/wo3-men2-de-chao1-zhi2-di1-jia4-pub8b08af40',
          '/',
        ],
        target: '/ikea/cn/low_price',
      },
      {
        title: '中国 - 会员特惠',
        docs: 'https://docs.rsshub.app/shopping.html#ikea-yi-jia',
        source: ['/cn/zh/offers/family-offers', '/'],
        target: '/ikea/cn/family_offers',
      },
    ],
  },
  'imagemagick.org': {
    _name: 'Changelog',
    '.': [
      {
        title: 'ChangeLog',
        docs: 'https://docs.rsshub.app/program-update.html#imagemagick-changelog',
        source: ['/script/download.php', '/script', '/'],
        target: '/imagemagick/changelog',
      },
    ],
  },
  'independent.co.uk': {
    _name: 'PS5 stock UK - The Independent',
    www: [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/shopping.html#the-independent',
        source: [
          '/extras/indybest/gadgets-tech/video-games-consoles/ps5-stock-uk-restock-live-today-b1938965.html',
        ],
        target: '/ps5-stock-uk',
      },
    ],
  },
  'indiansinkuwait.com': {
    _name: 'Indians in Kuwait',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/en/new-media.html#indians-in-kuwait',
        source: ['/latest-news', '/'],
        target: '/indiansinkuwait/latest',
      },
    ],
  },
  'inewsweek.cn': {
    _name: '中国新闻周刊',
    '.': [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/traditional-media.html#zhong-guo-xin-wen-zhou-kan',
        source: ['/:channel', '/'],
        target: '/inewsweek/:channel',
      },
    ],
  },
  'infoq.cn': {
    _name: 'InfoQ 中文',
    '.': [
      {
        title: '推荐',
        docs: 'https://docs.rsshub.app/new-media.html#infoq-zhong-wen',
        source: ['/'],
        target: '/infoq/recommend',
      },
      {
        title: '话题',
        docs: 'https://docs.rsshub.app/new-media.html#infoq-zhong-wen',
        source: ['/topic/:id'],
        target: '/infoq/topic/:id',
      },
    ],
  },
  'informs.org': {
    _name: 'INFORMS',
    pubsonline: [
      {
        title: 'Decision Analysis',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/deca', '/toc/deca/0/0'],
        target: '/informs/deca',
      },
      {
        title: 'Marketing Science',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/mksc', '/toc/mksc/0/0'],
        target: '/informs/mksc',
      },
      {
        title: 'Information Systems Research',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/isrc', '/toc/isrc/0/0'],
        target: '/informs/isrc',
      },
      {
        title: 'Mathematics of Operations Research',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/moor', '/toc/moor/0/0'],
        target: '/informs/moor',
      },
      {
        title: 'INFORMS Journal on Applied Analytics',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/inte', '/toc/inte/0/0'],
        target: '/informs/inte',
      },
      {
        title: 'Operations Research',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/opre', '/toc/opre/0/0'],
        target: '/informs/opre',
      },
      {
        title: 'INFORMS Journal on Computing',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/ijoc', '/toc/ijoc/0/0'],
        target: '/informs/ijoc',
      },
      {
        title: 'Organization Science',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/orsc', '/toc/orsc/0/0'],
        target: '/informs/orsc',
      },
      {
        title: 'INFORMS Journal on Data Science',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/ijds', '/toc/ijds/0/0'],
        target: '/informs/ijds',
      },
      {
        title: 'Service Science',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/serv', '/toc/serv/0/0'],
        target: '/informs/serv',
      },
      {
        title: 'INFORMS Journal on Optimization',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/ijoo', '/toc/ijoo/0/0'],
        target: '/informs/ijoo',
      },
      {
        title: 'Stochastic Systems',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/stsy', '/toc/stsy/0/0'],
        target: '/informs/stsy',
      },
      {
        title: 'INFORMS Transactions on Education',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/ited', '/toc/ited/0/0'],
        target: '/informs/ited',
      },
      {
        title: 'Strategy Science',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/stsc', '/toc/stsc/0/0'],
        target: '/informs/stsc',
      },
      {
        title: 'Management Science',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/mnsc', '/toc/mnsc/0/0'],
        target: '/informs/mnsc',
      },
      {
        title: 'Transportation Science',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/trsc', '/toc/trsc/0/0'],
        target: '/informs/trsc',
      },
      {
        title: 'Manufacturing & Service Operations Management',
        docs: 'https://docs.rsshub.app/journal.html#ieee-xplore',
        source: ['/journal/msom', '/toc/msom/0/0'],
        target: '/informs/msom',
      },
    ],
  },
  'inoreader.com': {
    _name: 'Inoreader',
    '.': [
      {
        title: 'HTML Clip',
        docs: 'https://docs.rsshub.app/reading.html#inoreader',
        source: ['/stream/user/:user/tag/:tag/*'],
        target: (params, url) => {
          const origin = new URL(url);
          const limit = origin.searchParams.get('n');
          return (
            `/inoreader/html_clip/${params.user}/${params.tag}` +
            (limit ? `?limit=${limit}` : '')
          );
        },
      },
    ],
  },
  'instagram.com': {
    _name: 'Instagram',
    www: [
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/social-media.html#instagram',
        source: ['/:id'],
        target: '/instagram/user/:id',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/social-media.html#instagram',
        source: ['/explore/tags/:key'],
        target: '/instagram/tags/:key',
      },
    ],
  },
  'iq.com': {
    _name: '爱奇艺',
    '.': [
      {
        title: '剧集',
        docs: 'https://docs.rsshub.app/multimedia.html#ai-qi-yi',
        source: ['/album/:id'],
        target: '/iqiyi/:category/:id',
      },
    ],
  },
  'iqiyi.com': {
    _name: '爱奇艺',
    '.': [
      {
        title: '用户视频',
        docs: 'https://docs.rsshub.app/multimedia.html#ai-qi-yi',
        source: ['/u/:uid/*'],
        target: '/iqiyi/user/video/:uid',
      },
    ],
  },
  'iresearch.com.cn': {
    _name: '艾瑞',
    www: [
      {
        title: '研究报告',
        docs: 'https://docs.rsshub.app/other.html#ai-rui-chan-ye-yan-jiu-bao-gao',
        source: ['/report.shtml'],
        target: '/iresearch/report',
      },
      {
        title: '周度市场观察',
        docs: 'https://docs.rsshub.app/other.html#ai-rui-zhou-du-shi-chang-guan-cha',
        source: ['/report.shtml?type=3', ''],
        target: '/iresearch/weekly/:category',
      },
    ],
  },
  'islander.cc': {
    _name: '島民衛星 Islander',
    '.': [
      {
        title: '事件分析',
        docs: 'https://docs.rsshub.app/new-media.html#dao-min-wei-xing-islander',
        source: ['/'],
        target: '/islander/search',
      },
      {
        title: '單日焦點',
        docs: 'https://docs.rsshub.app/new-media.html#dao-min-wei-xing-islander',
        source: ['/top30event', '/'],
        target: '/islander/top30event',
      },
    ],
  },
  'issuehunt.io': {
    _name: 'Issue Hunt',
    '.': [
      {
        title: '项目悬赏',
        docs: 'https://docs.rsshub.app/programming.html#issue-hunt-xiang-mu-xuan-shang',
        source: '/r/:username/:repo',
        target: ({ username, repo }) => `/issuehunt/funded/${username}/${repo}`,
      },
    ],
  },
  'itch.io': {
    _name: 'itch.io',
    '.': [
      {
        title: 'Browse',
        docs: 'https://docs.rsshub.app/game.html#itch-io-browse',
        source: ['/'],
        target: (params, url) =>
          `/itch${new URL(url).toString().split('itch.io').pop()}`,
      },
      {
        title: 'Developer Logs',
        docs: 'https://docs.rsshub.app/game.html#itch-io-developer-logs',
        source: ['/'],
        target: (params, url) => {
          const matches = new URL(url)
            .toString()
            .match(/\/\/(.*?)\.itch\.io\/(.*?)\/devlog/);
          return `/itch/devlog/${matches[1]}/${matches[2]}`;
        },
      },
      {
        title: 'Posts',
        docs: 'https://docs.rsshub.app/game.html#itch-io-posts',
        source: ['/t/:topic/:id'],
        target: '/itch/posts/:topic/:id',
      },
    ],
  },
  'ithome.com': {
    _name: 'IT 之家',
    '.': [
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-zhuan-ti',
        source: ['/tag/:name'],
        target: '/ithome/tag/:name',
      },
      {
        title: '专题',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-zhuan-ti',
        source: ['/zt/:id'],
        target: '/ithome/zt/:id',
      },
      {
        title: '24 小时阅读榜',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-re-bang',
        source: ['', '/*'],
        target: '/ithome/ranking/24h',
      },
      {
        title: '7 天最热',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-re-bang',
        source: ['', '/*'],
        target: '/ithome/ranking/7days',
      },
      {
        title: '月榜',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-re-bang',
        source: ['', '/*'],
        target: '/ithome/ranking/monthly',
      },
    ],
    it: [
      {
        title: 'IT 资讯',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/it',
      },
    ],
    soft: [
      {
        title: '软件之家',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/soft',
      },
    ],
    win10: [
      {
        title: 'win10 之家',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/win10',
      },
    ],
    win11: [
      {
        title: 'win11 之家',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/win11',
      },
    ],
    iphone: [
      {
        title: 'iphone 之家',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/iphone',
      },
    ],
    ipad: [
      {
        title: 'ipad 之家',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/ipad',
      },
    ],
    android: [
      {
        title: 'android 之家',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/android',
      },
    ],
    digi: [
      {
        title: '数码之家',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/digi',
      },
    ],
    next: [
      {
        title: '智能时代',
        docs: 'https://docs.rsshub.app/new-media.html#it-zhi-jia-fen-lei-zi-xun',
        source: '/',
        target: '/ithome/next',
      },
    ],
  },
  'ithome.com.tw': {
    _name: 'iThome',
    www: [
      {
        title: 'Feeds',
        docs: 'https://docs.rsshub.app/new-media.html#ithome-tai-wan',
        source: ['/:category', '/:category/feeds'],
        target: '/ithome/tw/feeds/:category',
      },
    ],
  },
  'iwara.tv': {
    _name: 'iwara',
    ecchi: [
      {
        title: '用户视频',
        docs: '',
        source: '/users/:username',
        target: '/iwara/users/:username?/video',
      },
      {
        title: '用户图片',
        docs: '',
        source: '/users/:username',
        target: '/iwara/users/:username?/image',
      },
      {
        title: '用户订阅列表',
        docs: 'https://docs.rsshub.app/anime.html#iwara',
        source: '',
        target: '/iwara/subscriptions',
      },
    ],
  },
  'ixigua.com': {
    _name: '西瓜视频',
    '.': [
      {
        title: '用户视频投稿',
        docs: 'https://docs.rsshub.app/multimedia.html#xi-gua-shi-pin',
        source: '/home/:uid',
        target: '/ixigua/user/video/:uid',
      },
    ],
  },
  'jandan.net': {
    _name: '煎蛋',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/picture.html#jian-dan-shou-ye',
        source: ['/:category', '/'],
        target: '/jandan/:category?',
      },
      {
        title: '板块',
        docs: 'https://docs.rsshub.app/picture.html#jian-dan-ban-kuai',
        source: ['/:category', '/'],
        target: '/jandan/:category?',
      },
    ],
  },
  'javbus.com': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'javsee.club': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'javsee.icu': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'javsee.work': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'seejav.bar': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'seejav.bid': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'seejav.blog': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'seejav.cloud': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'seejav.club': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'seejav.men': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'seejav.pw': {
    _name: 'JavBus',
    www: [
      {
        title: '有码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus',
      },
      {
        title: '有码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/genre/:id',
      },
      {
        title: '有码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/star/:id',
      },
      {
        title: '有码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/series/:id',
      },
      {
        title: '有码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/studio/:id',
      },
      {
        title: '有码 - 发行商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/label/:id',
        target: '/javbus/label/:id',
      },
      {
        title: '有码 - 导演',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/director/:id',
        target: '/javbus/director/:id',
      },
      {
        title: '有码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/search/:keyword',
      },
      {
        title: '无码 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored',
        target: '/javbus/uncensored',
      },
      {
        title: '无码 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/genre/:id',
        target: '/javbus/uncensored/genre/:id',
      },
      {
        title: '无码 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/star/:id',
        target: '/javbus/uncensored/star/:id',
      },
      {
        title: '无码 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/series/:id',
        target: '/javbus/uncensored/series/:id',
      },
      {
        title: '无码 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/studio/:id',
        target: '/javbus/uncensored/studio/:id',
      },
      {
        title: '无码 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/uncensored/search/:keyword',
        target: '/javbus/uncensored/search/:keyword',
      },
    ],
  },
  'javbus.one': {
    _name: 'JavBus',
    www: [
      {
        title: '欧美 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus/western',
      },
      {
        title: '欧美 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/western/genre/:id',
      },
      {
        title: '欧美 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/western/star/:id',
      },
      {
        title: '欧美 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/western/series/:id',
      },
      {
        title: '欧美 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/western/studio/:id',
      },
      {
        title: '欧美 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/western/search/:keyword',
      },
    ],
  },
  'javbus.org': {
    _name: 'JavBus',
    www: [
      {
        title: '欧美 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus/western',
      },
      {
        title: '欧美 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/western/genre/:id',
      },
      {
        title: '欧美 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/western/star/:id',
      },
      {
        title: '欧美 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/western/series/:id',
      },
      {
        title: '欧美 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/western/studio/:id',
      },
      {
        title: '欧美 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/western/search/:keyword',
      },
    ],
  },
  'javbus.red': {
    _name: 'JavBus',
    www: [
      {
        title: '欧美 - 首页',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/',
        target: '/javbus/western',
      },
      {
        title: '欧美 - 分类',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/genre/:id',
        target: '/javbus/western/genre/:id',
      },
      {
        title: '欧美 - 演员',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/star/:id',
        target: '/javbus/western/star/:id',
      },
      {
        title: '欧美 - 系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/series/:id',
        target: '/javbus/western/series/:id',
      },
      {
        title: '欧美 - 制作商',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/studio/:id',
        target: '/javbus/western/studio/:id',
      },
      {
        title: '欧美 - 搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javbus',
        source: '/search/:keyword',
        target: '/javbus/western/search/:keyword',
      },
    ],
  },
  'javdb.com': {
    _name: 'JavDB',
    '.': [
      {
        title: '主页',
        docs: 'https://docs.rsshub.app/multimedia.html#javdb-zhu-ye',
        source: ['/'],
        target: '/javdb',
      },
      {
        title: '分類',
        docs: 'https://docs.rsshub.app/multimedia.html#javdb-fen-lei',
        source: ['/tags/:category', '/'],
        target: (params, url) =>
          `/javdb/tags/:category/${new URL(url).searchParams.toString()}`,
      },
      {
        title: '排行榜',
        docs: 'https://docs.rsshub.app/multimedia.html#javdb-pai-hang-bang',
        source: ['/rankings/:category', '/'],
        target: (params, url) =>
          `/javdb/rankings/:category/${
            new URL(url).searchParams.get('period') ?? ''
          }`,
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#javdb-sou-suo',
        source: ['/search', '/'],
        target: (params, url) =>
          `/javdb/search/${new URL(url).searchParams.toString()}`,
      },
      {
        title: '演員',
        docs: 'https://docs.rsshub.app/multimedia.html#javdb-yan-yuan',
        source: ['/actors/:id', '/'],
        target: (params, url) =>
          `/javdb/actors/:id/${new URL(url).searchParams.toString()}`,
      },
      {
        title: '系列',
        docs: 'https://docs.rsshub.app/multimedia.html#javdb-xi-lie',
        source: ['/series/:id', '/'],
        target: (params, url) =>
          `/javdb/series/:id/${new URL(url).searchParams.toString()}`,
      },
      {
        title: '片商',
        docs: 'https://docs.rsshub.app/multimedia.html#javdb-pian-shang',
        source: ['/makers/:id', '/'],
        target: (params, url) =>
          `/javdb/makers/:id/${new URL(url).searchParams.toString()}`,
      },
    ],
  },
  'javlibrary.com': {
    _name: 'JAVLibrary',
    '.': [
      {
        title: '最近讨论的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#zui-jin-tao-lun-de-ying-pian',
        source: ['/:language', '/'],
        target: (params) => `/javlibrary/update/${params.language}`,
      },
      {
        title: '新发行的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#xin-fa-xing-de-ying-pian',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/newrelease/${params.language}/${new URL(
            url
          ).searchParams.get('mode')}`,
      },
      {
        title: '最新加入的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#zui-xin-jia-ru-de-ying-pian',
        source: ['/:language', '/'],
        target: (params) => `/javlibrary/update/${params.language}`,
      },
      {
        title: '最想要的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#zui-xiang-yao-de-ying-pian',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/mostwanted/${params.language}/${new URL(
            url
          ).searchParams.get('mode')}`,
      },
      {
        title: '评价最高的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#ping-jia-zui-gao-de-ying-pian',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/bestrated/${params.language}/${new URL(
            url
          ).searchParams.get('mode')}`,
      },
      {
        title: '最佳评论',
        docs: 'https://docs.rsshub.app/multimedia.html#zui-jia-ping-lun',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/bestreviews/${params.language}/${new URL(
            url
          ).searchParams.get('mode')}`,
      },
      {
        title: '影片依分类',
        docs: 'https://docs.rsshub.app/multimedia.html#ying-pian-yi-fen-lei',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/genre/${new URL(url).searchParams.get('g')}/${
            params.language
          }/${new URL(url).searchParams.get('mode')}`,
      },
      {
        title: '影片按演员',
        docs: 'https://docs.rsshub.app/multimedia.html#ying-pian-an-yan-yuan',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/star/${new URL(url).searchParams.get('s')}/${
            params.language
          }/${new URL(url).searchParams.get('mode')}`,
      },
      {
        title: '用户发表的文章',
        docs: 'https://docs.rsshub.app/multimedia.html#yong-hu-fa-biao-de-wen-zhang',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/userposts/${new URL(url).searchParams.get('u')}/${
            params.language
          }`,
      },
      {
        title: '用户想要的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#yong-hu-xiang-yao-de-ying-pian',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/userwanted/${new URL(url).searchParams.get('u')}/${
            params.language
          }`,
      },
      {
        title: '用户看过的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#yong-hu-kan-guo-de-ying-pian',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/userwatched/${new URL(url).searchParams.get('u')}/${
            params.language
          }`,
      },
      {
        title: '用户拥有的影片',
        docs: 'https://docs.rsshub.app/multimedia.html#yong-hu-yong-you-de-ying-pian',
        source: ['/:language', '/'],
        target: (params, url) =>
          `/javlibrary/userowned/${new URL(url).searchParams.get('u')}/${
            params.language
          }`,
      },
    ],
  },
  'jd.com': {
    _name: '京东',
    item: [
      {
        title: '商品价格',
        docs: 'https://docs.rsshub.app/shopping.html#jing-dong-shang-pin-jia-ge',
        source: ['/'],
        target: (params, url) =>
          `/jd/price/${new URL(url).hash.match(/\/(\d+)\.html/)[1]}`,
      },
    ],
  },
  'thejewishmuseum.org': {
    _name: 'Jewish Museum',
    '.': [
      {
        title: 'Exhibitions',
        docs: 'https://docs.rsshub.app/en/travel.html#the-jewish-museum',
      },
    ],
  },
  'jiaoliudao.com': {
    _name: '交流岛资源网',
    '.': [
      {
        title: '最新文章',
        docs: 'https://docs.rsshub.app/blog.html#jiao-liu-dao-zi-yuan-wang',
        source: ['/'],
        target: '/jiaoliudao',
      },
    ],
  },
  'jiemian.com': {
    _name: '界面新闻',
    '.': [
      {
        title: '快报',
        docs: 'https://docs.rsshub.app/traditional-media.html#jie-mian-xin-wen-kuai-bao',
        source: ['/list/:id', '/'],
        target: '/jiemian',
      },
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/traditional-media.html#jie-mian-xin-wen-lan-mu',
        source: ['/list/:id', '/'],
        target: '/jiemian/list/:id',
      },
    ],
  },
  'okjike.com': {
    _name: '即刻',
    m: [
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/social-media.html#ji-ke',
        source: '/users/:uid',
        target: '/jike/user/:uid',
      },
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/social-media.html#ji-ke',
        source: '/reposts/:repostId',
        target: (params, url, document) => {
          const uid = document
            .querySelector('.avatar')
            .getAttribute('href')
            .replace('/users/', '');
          return uid ? `/jike/user/${uid}` : '';
        },
      },
      {
        title: '圈子',
        docs: 'https://docs.rsshub.app/social-media.html#ji-ke',
        source: '/topics/:id',
        target: '/jike/topic/:id',
      },
      {
        title: '圈子 - 纯文字',
        docs: 'https://docs.rsshub.app/social-media.html#ji-ke',
        source: '/topics/:id',
        target: '/jike/topic/text/:id',
      },
    ],
  },
  'jin10.com': {
    _name: '金十数据',
    '.': [
      {
        title: '市场快讯',
        docs: 'https://docs.rsshub.app/finance.html#jin-shi-shu-ju',
        source: ['/'],
        target: '/jin10',
      },
    ],
  },
  'jisilu.cn': {
    _name: '集思录',
    '.': [
      {
        title: '广场',
        docs: 'https://docs.rsshub.app/bbs.html#ji-si-lu-guang-chang',
        source: ['/home/explore', '/explore', '/'],
        target: '/jisilu/:category?/:sort?/:day?',
      },
      {
        title: '用户回复',
        docs: 'https://docs.rsshub.app/bbs.html#ji-si-lu-yong-hu-hui-fu',
        source: ['/people/:user'],
        target: '/jisilu/reply/:user',
      },
      {
        title: '用户主题',
        docs: 'https://docs.rsshub.app/bbs.html#ji-si-lu-yong-hu-zhu-ti',
        source: ['/people/:user'],
        target: '/jisilu/topic/:user',
      },
    ],
  },
  'jornada.com.mx': {
    _name: 'La Jornada',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/traditional-media.html#jornada',
        source: ['/category/:category', '/'],
        target: (params) =>
          params.category
            ? `/jornada/today/${params.category.replacce('.html', '')}`
            : `/jornada/today`,
      },
    ],
  },
  'jseea.cn': {
    _name: '江苏省教育考试院',
    '.': [
      {
        title: '新闻中心',
        docs: 'https://docs.rsshub.app/government.html#jiang-su-sheng-ren-min-zheng-fu',
        source: ['/webfile/news/:type'],
        target: '/jseea/news/:type',
      },
    ],
  },
  'juejin.cn': {
    _name: '掘金',
    '.': [
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin-biao-qian',
        source: '/tag/:tag',
        target: '/juejin/tag/:tag',
      },
      {
        title: '小册',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin-xiao-ce',
        source: '/books',
        target: '/juejin/books',
      },
      {
        title: '沸点',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin-fei-dian',
        source: ['/pins/:type', '/pins/topic/:type'],
        target: (params) =>
          params.type !== 'recommended' ? '/juejin/pins/:type' : '/juejin/pins',
      },
      {
        title: '用户专栏',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin-zhuan-lan',
        source: ['/user/:id', '/user/:id/posts'],
        target: '/juejin/posts/:id',
      },
      {
        title: '收藏集',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin-shou-cang-ji',
        source: ['/user/:id', '/user/:id/collections'],
        target: '/juejin/collections/:id',
      },
      {
        title: '单个收藏夹',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin-dan-ge-shou-cang-jia',
        source: '/collection/:collectionId',
        target: '/juejin/collection/:collectionId',
      },
      {
        title: '分享',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin',
        source: ['/user/:userId', '/user/:userId/shares'],
        target: '/juejin/shares/:userId',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin',
        source: '/column/:id',
        target: '/juejin/column/:id',
      },
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/programming.html#jue-jin',
        source: ['/user/:id', '/user/:id/news'],
        target: '/juejin/news/:userId',
      },
    ],
  },
  'jumpvg.com': {
    _name: 'jump app',
    switch: [
      {
        title: '折扣清单',
        docs: 'https://docs.rsshub.app/game.html#jump',
        source: ['/'],
        target: '/jump/discount/switch',
      },
    ],
  },
  'kakuyomu.jp': {
    _name: 'kakuyomu',
    '.': [
      {
        title: '章节更新',
        docs: 'https://docs.rsshub.app/reading.html#kakuyomu-zhang-jie-geng-xin',
        source: ['/works/:id'],
        target: '/kakuyomu/episode/:id',
      },
    ],
  },
  'kbs.co.kr': {
    _name: 'KBS',
    world: [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/new-media.html#kbs',
        source: '/',
        target: '/kbs/news',
      },
      {
        title: 'Today',
        docs: 'https://docs.rsshub.app/new-media.html#kbs',
        source: '/',
        target: '/kbs/today',
      },
    ],
  },
  'kcna.kp': {
    _name: '朝鲜中央通讯社',
    www: [
      {
        title: '朝鲜劳动党总书记金正恩同志革命活动新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/54c0ca4ca013a92cc9cf95bd4004c61a.kcmsf',
        target: '/kcna/:lang/54c0ca4ca013a92cc9cf95bd4004c61a',
      },
      {
        title: '最新新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source: [
          '/:lang',
          '/:lang/category/articles/q/1ee9bdb7186944f765208f34ecfb5407.kcmsf',
          '/:lang/category/articles.kcmsf',
        ],
        target: '/kcna/:lang',
      },
      {
        title: '主要新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/5394b80bdae203fadef02522cfb578c0.kcmsf',
        target: '/kcna/:lang/5394b80bdae203fadef02522cfb578c0',
      },
      {
        title: '国内新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/b2b3bcc1b0a4406ab0c36e45d5db58db.kcmsf',
        target: '/kcna/:lang/b2b3bcc1b0a4406ab0c36e45d5db58db',
      },
      {
        title: '文件',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/a8754921399857ebdbb97a98a1e741f5.kcmsf',
        target: '/kcna/:lang/a8754921399857ebdbb97a98a1e741f5',
      },
      {
        title: '国际新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/593143484cf15d48ce85c26139582395.kcmsf',
        target: '/kcna/:lang/593143484cf15d48ce85c26139582395',
      },
      {
        title: '社会－生活',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/93102e5a735d03979bc58a3a7aefb75a.kcmsf',
        target: '/kcna/:lang/93102e5a735d03979bc58a3a7aefb75a',
      },
      {
        title: '对外关系',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/0f98b4623a3ef82aeea78df45c423fd0.kcmsf',
        target: '/kcna/:lang/0f98b4623a3ef82aeea78df45c423fd0',
      },
      {
        title: '时事解说',
        docs: 'https://docs.rsshub.app/traditional-media.html#chao-xian-zhong-yang-tong-xun-she',
        source:
          '/:lang/category/articles/q/12c03a49f7dbe829bceea8ac77088c21.kcmsf',
        target: '/kcna/:lang/12c03a49f7dbe829bceea8ac77088c21',
      },
    ],
  },
  'research.ke.com': {
    _name: '贝壳研究院 - 房地产行业研究报告',
    www: [
      {
        title: '研究成果',
        docs: 'https://docs.rsshub.app/other.html#bei-ke-yan-jiu-yuan',
        source: ['/researchResults'],
        target: '/researchResults',
      },
    ],
  },
  'gotokeep.com': {
    _name: 'Keep',
    '.': [
      {
        title: '用户运动日记',
        docs: 'https://docs.rsshub.app/social-media.html#keep',
        source: '/users/:id',
        target: '/keep/user/:id',
      },
    ],
  },
  'kemono.party': {
    _name: 'Kemono',
    '.': [
      {
        title: 'Posts',
        docs: 'https://docs.rsshub.app/anime.html#kemono-posts',
        source: ['/:source/user/:id', '/'],
        target: '/kemono/:source?/:id?',
      },
    ],
  },
  'kimlaw.or.kr': {
    _name: '韓國海事法學會',
    '.': [
      {
        title: '学术论文',
        docs: 'https://docs.rsshub.app/study.html#han-guo-hai-shi-fa-xue-hui',
        source: ['/67', '/'],
        target: '/kimlaw/thesis',
      },
    ],
  },
  'knowmedia.tw': {
    _name: '识媒体',
    '.': [
      {
        title: '近期更新',
        docs: 'https://docs.rsshub.app/game.html#jump',
        source: ['/', '/topics/近期更新'],
        target: '/knowmedia/jqgx',
      },
      {
        title: '精选专栏',
        docs: 'https://docs.rsshub.app/game.html#jump',
        source: ['/', '/topics/精選專欄'],
        target: '/knowmedia/jxzl',
      },
      {
        title: '活动讯息',
        docs: 'https://docs.rsshub.app/game.html#jump',
        source: ['/', '/topics/活動訊息'],
        target: '/knowmedia/hdxx',
      },
      {
        title: '影音专区',
        docs: 'https://docs.rsshub.app/game.html#jump',
        source: ['/', '/topics/影音專區'],
        target: '/knowmedia/yyzq',
      },
    ],
  },
  'kuaidi100.com': {
    _name: '快递 100',
    '.': [
      {
        title: '快递订单追踪',
        docs: 'https://docs.rsshub.app/other.html#kuai-di-100',
        source: '/',
        target: (params, url, document) => {
          const postid = document && document.querySelector('#postid').value;
          const com =
            document &&
            document.querySelector('#selectComBtn').childNodes[1].attributes[1]
              .value;
          if (com && com !== 'default' && postid) {
            return `/kuaidi100/track/${com}/${postid}`;
          }
        },
      },
      {
        title: '支持的快递公司列表',
        docs: 'https://docs.rsshub.app/other.html#kuai-di-100',
        source: '/',
        target: '/kuaidi100/company',
      },
    ],
  },
  'kuwaitlocal.com': {
    _name: 'Kuwait Local',
    '.': [
      {
        title: 'Latest News',
        docs: 'https://docs.rsshub.app/en/new-media.html#kuwait-local',
        source: ['/news/latest', '/news', '/'],
        target: '/kuwaitlocal',
      },
      {
        title: 'Categorised News',
        docs: 'https://docs.rsshub.app/en/new-media.html#kuwait-local',
        source: ['/news/categories/:category'],
        target: '/kuwaitlocal/:category',
      },
    ],
  },
  'kyodonews.net': {
    _name: '共同网',
    china: [
      {
        title: '最新报道',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-tong-wang-zui-xin-bao-dao',
        source: '/',
        target: '/kyodonews/china',
      },
      {
        title: '关键词',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-tong-wang-zui-xin-bao-dao',
        source: '/news/:keyword',
        target: '/kyodonews/china/:keyword?',
      },
    ],
    tchina: [
      {
        title: '最新報道',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-tong-wang-zui-xin-bao-dao',
        source: '/',
        target: '/kyodonews/tchina',
      },
      {
        title: '關鍵詞',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-tong-wang-zui-xin-bao-dao',
        source: '/news/:keyword',
        target: '/kyodonews/tchina/:keyword?',
      },
    ],
  },
  'lang.live': {
    _name: '浪 Play 直播',
    '.': [
      {
        title: '直播间开播',
        docs: 'https://docs.rsshub.app/live.html#lang-play-yuan-zhi-bo',
        source: ['/room/:id'],
        target: '/lang/live/room/:id',
      },
    ],
  },
  'lanqiao.cn': {
    _name: '蓝桥云课',
    '.': [
      {
        title: '作者发布的课程',
        docs: 'https://docs.rsshub.app/programming.html#lan-qiao-yun-ke-zuo-zhe-fa-bu-de-ke-cheng',
        source: ['/users/:uid'],
        target: '/lanqiao/author/:uid',
      },
      {
        title: '全站发布的课程',
        docs: 'https://docs.rsshub.app/programming.html#lan-qiao-yun-ke-quan-zhan-fa-bu-de-ke-cheng',
        source: ['/courses/'],
        target: '/lanqiao/courses/all',
      },
      {
        title: '技术社区',
        docs: 'https://docs.rsshub.app/programming.html#lan-qiao-yun-ke-ji-shu-she-qu',
        source: ['/questions/', '/questions/topics/:id'],
        target: '/lanqiao/questions/:id',
      },
    ],
  },
  'laohu8.com': {
    _name: '老虎社区',
    '.': [
      {
        title: '个人主页',
        docs: 'https://docs.rsshub.app/finance.html#lao-hu-she-qu',
        source: '/personal/:id',
        target: '/laohu8/personal/:id',
      },
    ],
  },
  'latepost.com': {
    _name: '晚点 Latepost',
    '.': [
      {
        title: '报道',
        docs: 'https://docs.rsshub.app/new-media.html#wan-dian-latepost-bao-dao',
        source: '/',
        target: (params, url) =>
          `/latepost/${new URL(url).searchParams.get('proma')}`,
      },
    ],
  },
  'lativ.com.tw': {
    _name: 'lativ',
    www: [
      {
        title: '订阅商品价格',
        docs: 'https://docs.rsshub.app/shopping.html#lativ',
        source: '/Detail/:id',
        target: '/lativ/:id',
      },
    ],
  },
  'layoffs.fyi': {
    _name: 'Layoffs',
    '.': [
      {
        title: 'Data Tracker Feed',
        docs: 'https://docs.rsshub.app/en/other.html#layoffs-fyi',
        source: '/',
        target: '/layoffs',
      },
    ],
  },
  'learnblockchain.cn': {
    _name: '登链社区',
    '.': [
      {
        title: '分类文章',
        docs: 'https://docs.rsshub.app/programming.html#deng-lian-she-qu-wen-zhang',
        source: '/categories/:cid/:sort?',
        target: (params) =>
          `/learnblockchain/posts/${params.cid || 'all'}/${
            params.sort || 'featured'
          }`,
      },
      {
        title: '全部文章',
        docs: 'https://docs.rsshub.app/programming.html#deng-lian-she-qu-wen-zhang',
        source: '*',
        target: () => '/learnblockchain/posts/all/',
      },
    ],
  },
  'learnku.com': {
    _name: 'Learn Ku 社区',
    '.': [
      {
        title: '分区',
        docs: 'https://docs.rsshub.app/bbs.html#learnku',
        source: ['/:community'],
        target: '/learnku/:community',
      },
    ],
  },
  'leetcode.com': {
    _name: 'LeetCode',
    '.': [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/programming.html#leetcode',
        source: ['/articles'],
        target: '/leetcode/articles',
      },
      {
        title: '打卡',
        docs: 'https://docs.rsshub.app/programming.html#leetcode',
        source: ['/:user'],
        target: (params) => {
          if (params.user !== 'articles') {
            return `/leetcode/submission/us/:user`;
          }
        },
      },
      {
        title: '每日一题',
        docs: 'https://docs.rsshub.app/programming.html#leetcode',
        source: ['/'],
        target: '/leetcode/dailyquestion/en',
      },
      {
        title: '每日一题题解',
        docs: 'https://docs.rsshub.app/programming.html#leetcode',
        source: ['/'],
        target: '/leetcode/dailyquestion/solution/en',
      },
    ],
  },
  'leetcode.cn': {
    _name: 'LeetCode',
    '.': [
      {
        title: '打卡',
        docs: 'https://docs.rsshub.app/programming.html#leetcode',
        source: ['/:user'],
        target: (params) => {
          if (params.user !== 'articles') {
            return `/leetcode/submission/cn/:user`;
          }
        },
      },
      {
        title: '每日一题',
        docs: 'https://docs.rsshub.app/programming.html#leetcode',
        source: ['/'],
        target: '/leetcode/dailyquestion/cn',
      },
      {
        title: '每日一题题解',
        docs: 'https://docs.rsshub.app/programming.html#leetcode',
        source: ['/'],
        target: '/leetcode/dailyquestion/solution/cn',
      },
    ],
  },
  'leiphone.com': {
    _name: '雷峰网',
    '.': [
      {
        title: '最新文章',
        docs: 'https://docs.rsshub.app/new-media.html#lei-feng-wang-zui-xin-wen-zhang',
        source: ['/'],
        target: '/leiphone',
      },
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/new-media.html#lei-feng-wang-lan-mu',
        source: ['/category/:catename'],
        target: '/leiphone/category/:catname',
      },
      {
        title: '业界资讯',
        docs: 'https://docs.rsshub.app/new-media.html#lei-feng-wang-ye-jie-zi-xun',
        source: ['/'],
        target: '/leiphone/newsflash',
      },
    ],
  },
  'lever.co': {
    _name: 'Lever',
    '.': [
      {
        title: 'Lever HRIS Job Boards Feed',
        docs: 'https://docs.rsshub.app/other.html#lever',
        source: ['/:domain'],
        target: '/lever/:domain',
      },
    ],
  },
  'iyingdi.com': {
    _name: '旅法师营地',
    www: [
      {
        title: '分区',
        docs: 'https://docs.rsshub.app/game.html#lv-fa-shi-ying-di',
        source: '/tz/tag/:tag',
        target: '/lfsyd/tag/:tag',
      },
      {
        title: '用户发帖',
        docs: 'https://docs.rsshub.app/game.html#lv-fa-shi-ying-di',
        source: ['/tz/people/:id', '/tz/people/:id/*'],
        target: '/lfsyd/user/:id',
      },
    ],
    mob: [
      {
        title: '分区',
        docs: 'https://docs.rsshub.app/game.html#lv-fa-shi-ying-di',
        source: '/fine/:tag',
        target: '/lfsyd/tag/:tag',
      },
    ],
  },
  'lianxh.cn': {
    _name: '连享会',
    '.': [
      {
        title: '精彩资讯',
        docs: 'https://docs.rsshub.app/programming.html#lian-xiang-hui-jing-cai-zi-xun',
        source: ['/blogs.html', '/'],
        target: '/lianxh/:category?',
      },
    ],
  },
  'line.me': {
    _name: 'LINE Today',
    '.': [
      {
        title: 'LINE Today',
        docs: 'https://docs.rsshub.app/new-media.html#line-today',
        source: ['/'],
        target: '/line/today/:edition?/:tab?',
      },
    ],
  },
  'linkedin.com': {
    _name: 'LinkedIn',
    '.': [
      {
        title: 'Job Listing',
        docs: 'https://docs.rsshub.app/en/other.html#linkedin-jobs',
        source: '/jobs/search/',
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          const parseRoute = (searchParam) => {
            if (typeof searchParam !== 'string') {
              return 'all';
            }
            return searchParam.split(',').join('-');
          };
          return `/linkedin/jobs/${parseRoute(
            searchParams.get('f_JT')
          )}/${parseRoute(searchParams.get('f_E'))}/${
            searchParams.get('keywords') || ''
          }`;
        },
      },
    ],
  },
  'linkedin.cn': {
    _name: 'LinkedIn 领英中国',
    '.': [
      {
        title: 'Jobs',
        docs: 'https://docs.rsshub.app/other.html#linkedin-ling-ying-zhong-guo',
        source: '/incareer/jobs/search',
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/linkedin/cn/jobs/${searchParams.get('keywords') || ''}`;
        },
      },
    ],
  },
  linkresearcher: {
    _name: '领研',
    '.': [
      {
        title: '论文',
        docs: 'https://docs.rsshub.app/study.html#ling-yan',
        source: ['/theses', '/information', '/careers'],
        target: (_, url) => {
          const pathname = new URL(url).pathname;
          const searchParams = new URL(url).searchParams;
          return `/linkresearcher/theses/${pathname.replace('/', '')}${
            searchParams.has('filters.subject')
              ? `&subject=${searchParams.get('filters.subject')}`
              : ''
          }${
            searchParams.has('filters.columns')
              ? `&columns=${searchParams.get('filters.columns')}`
              : ''
          }`;
        },
      },
    ],
  },
  'linovelib.com': {
    _name: '哩哔轻小说',
    '.': [
      {
        title: '小说详情',
        docs: 'https://docs.rsshub.app/anime.html#linovelib',
        source: ['/novel/:id'],
        target: '/linovellib/novel/:id',
      },
    ],
  },
  'literotica.com': {
    _name: 'Literotica',
    '.': [
      {
        title: 'New Stories',
        docs: 'https://docs.rsshub.app/reading.html#literotica-new-stories',
        source: ['/'],
        target: '/literotica/new',
      },
      {
        title: 'Category',
        docs: 'https://docs.rsshub.app/reading.html#literotica-category',
        source: ['/c/:category', '/'],
        target: '/literotica/category/:category',
      },
    ],
  },
  'liulinblog.com': {
    _name: '木木博客',
    '.': [
      {
        title: '每天六十秒（60秒）读懂世界',
        docs: 'https://docs.rsshub.app/new-media.html#mu-mu-bo-ke',
        source: ['/kuaixun'],
        target: '/liulinblog/kuaixun',
      },
      {
        title: '互联网早报',
        docs: 'https://docs.rsshub.app/new-media.html#mu-mu-bo-ke',
        source: ['/itnews/:channel'],
        target: (params) => {
          if (params.channel === 'internet') {
            return '/liulinblog/itnews/:channel';
          }
        },
      },
      {
        title: '站长圈',
        docs: 'https://docs.rsshub.app/new-media.html#mu-mu-bo-ke',
        source: ['/itnews/:channel'],
        target: (params) => {
          if (params.channel === 'seo') {
            return '/liulinblog/itnews/:channel';
          }
        },
      },
    ],
  },
  'lkong.com': {
    _name: '龙空',
    '.': [
      {
        title: '分区',
        docs: 'https://docs.rsshub.app/bbs.html#long-kong-fen-qu',
        source: ['/forum/:id', '/'],
        target: '/lkong/forum/:id?/:digest?',
      },
      {
        title: '帖子',
        docs: 'https://docs.rsshub.app/bbs.html#long-kong-tie-zi',
        source: ['/thread/:id', '/'],
        target: '/lkong/thread/:id',
      },
    ],
  },
  'lofter.com': {
    _name: 'Lofter',
    www: [
      {
        title: '话题 (标签)',
        docs: 'https://docs.rsshub.app/social-media.html#lofter',
        source: ['/tag/:name', '/tag/:name/:type'],
        target: (params) => `/lofter/tag/${params.name}/${params.type || ''}`,
      },
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/social-media.html#lofter',
      },
    ],
  },
  'logonews.cn': {
    _name: 'LogoNews 标志情报局',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/design.html#logonews-biao-zhi-qing-bao-ju-shou-ye',
        source: ['/'],
        target: '/logonews',
      },
      {
        title: '文章分类',
        docs: 'https://docs.rsshub.app/design.html#logonews-biao-zhi-qing-bao-ju-wen-zhang-fen-lei',
        source: ['/category/:category/:type?'],
        target: '/logonews/category/:category/:type?',
      },
      {
        title: '文章标签',
        docs: 'https://docs.rsshub.app/design.html#logonews-biao-zhi-qing-bao-ju-wen-zhang-biao-qian',
        source: ['/tag/:tag'],
        target: '/logonews/tag/:tag',
      },
      {
        title: '作品',
        docs: 'https://docs.rsshub.app/design.html#logonews-biao-zhi-qing-bao-ju-zuo-pin',
        source: ['/work'],
        target: '/logonews/work',
      },
      {
        title: '作品分类',
        docs: 'https://docs.rsshub.app/design.html#logonews-biao-zhi-qing-bao-ju-zuo-pin-fen-lei',
        source: ['/work/categorys/:category'],
        target: '/logonews/work/categorys/:category',
      },
      {
        title: '作品标签',
        docs: 'https://docs.rsshub.app/design.html#logonews-biao-zhi-qing-bao-ju-zuo-pin-biao-qian',
        source: ['/work/tags/:tag'],
        target: '/logonews/work/tags/:tag',
      },
    ],
  },
  'garena.tw': {
    _name: 'Garena',
    lol: [
      {
        title: '英雄联盟台服新闻',
        docs: 'https://docs.rsshub.app/game.html#ying-xiong-lian-meng-tai-fu-xin-wen',
        source: ['/news/:category', '/news'],
        target: (params) => '/loltw/news/' + (params.category || ''),
      },
    ],
  },
  'lovelive-anime.jp': {
    _name: 'Love Live 官网',
    www: [
      {
        title: '最新 NEWS',
        docs: 'https://docs.rsshub.app/anime.html#lovelive-anime-love-live-guan-wang-zui-xin-news',
        source: ['/', '/news'],
        target: '/lovelive-anime/news',
      },
      {
        title: '分类 Topics',
        docs: 'https://docs.rsshub.app/anime.html#lovelive-anime-love-live-guan-wang-fen-lei-topics',
        source: ['/:abbr/topics/', '/:abbr/topics.php'],
        target: (params, url) => {
          const cat = url.match(/\?cat=(.*)/);
          return `/lovelive-anime/topics/${params.abbr}/${
            null !== cat && cat.length === 2 ? cat[1] : ''
          }`;
        },
      },
      {
        title: 'Schedule',
        docs: 'https://docs.rsshub.app/anime.html#lovelive-anime-love-live-guan-wang-schedule',
        source: ['/schedule/'],
        target: (params, url) => {
          const cat = url.match(/\?series=(.*)&category=(.*)/);
          return `/lovelive-anime/schedules/${
            null !== cat && cat.length >= 2 ? cat[1] : ''
          }/${null !== cat && cat.length === 3 ? cat[2] : ''}`;
        },
      },
    ],
  },
  'luogu.com.cn': {
    _name: '洛谷',
    '.': [
      {
        title: '日报',
        docs: 'https://docs.rsshub.app/programming.html#luo-gu',
        source: ['/discuss/47327', '/'],
        target: '/luogu/daily',
      },
      {
        title: '比赛列表',
        docs: 'https://docs.rsshub.app/programming.html#luo-gu',
        source: ['/contest/list', '/'],
        target: '/luogu/contest',
      },
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/programming.html#luo-gu',
        source: ['/user/:uid'],
        target: '/luogu/user/feed/:uid',
      },
      {
        title: '用户博客',
        docs: 'https://docs.rsshub.app/programming.html#luo-gu',
        source: ['/blog/:name'],
        target: '/luogu/user/blog/:name',
      },
    ],
  },
  'lvv2.com': {
    _name: 'LVV2',
    '.': [
      {
        title: '热门',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/sort-hot'],
        target: '/lvv2/news/sort-hot',
      },
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/sort-new'],
        target: '/lvv2/news/sort-new',
      },
      {
        title: '得分',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/sort-score', '/sort-score/:sort'],
        target: (params) => {
          if (!params.sort) {
            return '/lvv2/news/sort-score';
          } else {
            return `/lvv2/news/sort-score/${params.sort}`;
          }
        },
      },
      {
        title: '24小时榜',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/sort-realtime', '/sort-realtime/:sort'],
        target: (params) => {
          if (!params.sort) {
            return '/lvv2/news/sort-realtime';
          } else {
            return `/lvv2/news/sort-realtime/${params.sort}`;
          }
        },
      },
      {
        title: '热门 24小时 Top 10',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/', '/sort-hot'],
        target: '/lvv2/top/sort-hot',
      },
      {
        title: '最新 24小时 Top 10',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/sort-new'],
        target: '/lvv2/top/sort-new',
      },
      {
        title: '得分 24小时 Top 10',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/sort-score', '/sort-score/:sort'],
        target: (params) => {
          if (!params.sort) {
            return '/lvv2/top/sort-score';
          } else {
            return `/lvv2/top/sort-score/${params.sort}`;
          }
        },
      },
      {
        title: '24小时榜 24小时 Top 10',
        docs: 'https://docs.rsshub.app/new-media.html#lvv2',
        source: ['/sort-realtime', '/sort-realtime/:sort'],
        target: (params) => {
          if (!params.sort) {
            return '/lvv2/top/sort-realtime';
          } else {
            return `/lvv2/top/sort-realtime/${params.sort}`;
          }
        },
      },
    ],
  },
  'sonymusic.co.jp': {
    _name: 'Sony Music',
    www: [
      {
        title: 'LiSA News',
        docs: 'https://docs.rsshub.app/en/live.html#lisa',
        source: ['/artist/lisa/', '/artist/lisa/info/'],
        target: '/lxixsxa/info',
      },
      {
        title: 'LiSA Albums',
        docs: 'https://docs.rsshub.app/en/live.html#lisa',
        source: ['/artist/lisa/', '/artist/lisa/discography/'],
        target: '/lxixsxa/disco',
      },
    ],
  },
  'lxixsxa.com': {
    _name: 'LiSA Official',
    www: [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/en/live.html#lisa',
        source: ['/', '/info'],
        target: '/lxixsxa/info',
      },
      {
        title: 'Albums',
        docs: 'https://docs.rsshub.app/en/live.html#lisa',
        source: ['/', '/discography'],
        target: '/lxixsxa/disco',
      },
    ],
  },
  'macfilos.com': {
    _name: 'Macfilos',
    '.': [
      {
        title: 'Blog',
        docs: 'https://docs.rsshub.app/new-media.html#macfilos-blog',
        source: ['/blog', '/'],
        target: '/macfilos/blog',
      },
    ],
  },
  'mangadex.org': {
    _name: 'MangaDex',
    '.': [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#mangadex',
        source: ['/title/:id/*', '/title/:id'],
        target: '/mangadex/:id',
      },
    ],
  },
  'manhuagui.com': {
    _name: '漫画柜',
    www: [
      {
        title: '漫画柜个人订阅',
        docs: 'https://docs.rsshub.app/anime.html#kan-man-hua',
        source: '/user/book/shelf',
        target: '/manhuagui/subscribe',
      },
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kan-man-hua',
        source: '/comic/:id/',
        target: '/manhuagui/comic/:id',
      },
    ],
    tw: [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kan-man-hua',
        source: '/comic/:id/',
        target: '/manhuagui/twmanhuagui/comic/:id',
      },
    ],
  },
  'mhgui.com': {
    _name: '漫画柜镜像站',
    www: [
      {
        title: '漫画柜个人订阅',
        docs: 'https://docs.rsshub.app/anime.html#kan-man-hua',
        source: '/user/book/shelf',
        target: '/manhuagui/subscribe',
      },
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#kan-man-hua',
        source: '/comic/:id/',
        target: '/manhuagui/comic/:id',
      },
    ],
  },
  'mcachicago.org': {
    _name: 'MCA Chicago',
    '.': [
      {
        title: 'Exhibitions',
        docs: 'https://docs.rsshub.app/en/travel.html#museum-of-contemporary-art-chicago',
      },
    ],
  },
  'mckinsey.com.cn': {
    _name: 'McKinsey Greater China',
    '.': [
      {
        title: '汽车 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/autos', '/insights'],
        target: '/mckinsey/cn/2',
      },
      {
        title: '金融服务 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/banking-insurance', '/insights'],
        target: '/mckinsey/cn/3',
      },
      {
        title: '消费者 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/consumers', '/insights'],
        target: '/mckinsey/cn/4',
      },
      {
        title: '医药 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/healthcare-pharmaceuticals', '/insights'],
        target: '/mckinsey/cn/5',
      },
      {
        title: '数字化 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/business-technology', '/insights'],
        target: '/mckinsey/cn/7',
      },
      {
        title: '制造业 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/manufacturing', '/insights'],
        target: '/mckinsey/cn/8',
      },
      {
        title: '私募 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/private-equity', '/insights'],
        target: '/mckinsey/cn/9',
      },
      {
        title: '技术，媒体与通信 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/technology-media-and-telecom', '/insights'],
        target: '/mckinsey/cn/10',
      },
      {
        title: '城市化与可持续发展 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/urbanization-sustainability-insights', '/insights'],
        target: '/mckinsey/cn/12',
      },
      {
        title: '创新 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/innovation', '/insights'],
        target: '/mckinsey/cn/13',
      },
      {
        title: '人才与领导力 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/talent-leadership', '/insights'],
        target: '/mckinsey/cn/16',
      },
      {
        title: '宏观经济 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/macroeconomy', '/insights'],
        target: '/mckinsey/cn/18',
      },
      {
        title: '麦肯锡全球研究院 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/mckinsey-global-institute', '/insights'],
        target: '/mckinsey/cn/19',
      },
      {
        title: '洞见 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/insights', '/insights'],
        target: '/mckinsey/cn/25',
      },
      {
        title: '麦肯锡季刊 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/mckinsey-season-publication', '/insights'],
        target: '/mckinsey/cn/37',
      },
      {
        title: '资本项目和基础设施 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/capital-projects-infrastructure', '/insights'],
        target: '/mckinsey/cn/41',
      },
      {
        title: '旅游、运输和物流 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/transport-logistics', '/insights'],
        target: '/mckinsey/cn/42',
      },
      {
        title: '全球基础材料 | 洞见',
        docs: 'https://docs.rsshub.app/finance.html#mai-ken-xi',
        source: ['/insights/global-basic-material', '/insights'],
        target: '/mckinsey/cn/45',
      },
    ],
  },
  'mclaren.com': {
    _name: 'Mclaren Racing',
    www: [
      {
        title: 'Mclaren Racing',
        docs: 'https://docs.rsshub.app/new-media.html#mai-kai-lun-sai-che',
        source: '/racing/articles/',
        target: '/mclaren/en/all',
      },
    ],
    cn: [
      {
        title: '迈凯伦赛车',
        docs: 'https://docs.rsshub.app/new-media.html#mai-kai-lun-sai-che',
        source: '/racing/articles/',
        target: '/mclaren/zh/all',
      },
    ],
    es: [
      {
        title: 'Mclaren Racing',
        docs: 'https://docs.rsshub.app/new-media.html#mai-kai-lun-sai-che',
        source: '/racing/articles/',
        target: '/mclaren/es/all',
      },
    ],
  },
  'mdpi.com': {
    _name: 'MDPI',
    www: [
      {
        title: 'Journal',
        docs: 'https://docs.rsshub.app/journal.html#MDPI',
        source: '/journal/:journal',
        target: '/mdpi/:journal',
      },
    ],
  },
  'medsci.cn': {
    _name: '梅斯医学',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#mei-si-yi-xue-zi-xun',
        source: ['/department/details', '/'],
        target: (params) =>
          `/medsci${
            params.s_id
              ? `/${params.s_id}${params.t_id ? `/${params.s_id}` : ''}`
              : ''
          }`,
      },
    ],
  },
  'meituclub.com': {
    _name: '妹图社',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/picture.html#mei-tu-she-zui-xin',
        source: ['/'],
        target: '/meituclub/latest',
      },
    ],
  },
  'meteor.today': {
    _name: 'Meteor',
    '.': [
      {
        title: '看板',
        docs: 'https://docs.rsshub.app/bbs.html#meteor',
        source: ['/board/:board', '/board/:board/new'],
        target: '/meteor/board/:board',
      },
      {
        title: '看板列表',
        docs: 'https://docs.rsshub.app/bbs.html#meteor',
        source: ['/'],
        target: '/meteor/boards',
      },
    ],
  },
  'metmuseum.org': {
    _name: 'The Metropolitan Museum of Art',
    www: [
      {
        title: 'Exhibitions',
        docs: 'https://docs.rsshub.app/en/travel.html#the-metropolitan-museum-of-art',
      },
    ],
  },
  'hoyoverse.com': {
    _name: '米哈游',
    genshin: [
      {
        title: '原神 - 新闻',
        docs: 'https://docs.rsshub.app/game.html##mi-ha-you',
        source: '/:location/news',
        target: '/mihoyo/ys/:location',
      },
    ],
  },
  'mihoyo.com': {
    _name: '米哈游',
    bbs: [
      {
        title: '米游社 - 官方公告',
        docs: 'https://docs.rsshub.app/game.html#mi-ha-you-mi-you-she-guan-fang-gong-gao',
        source: [
          '/:game/home/28',
          '/:game/home/6',
          '/:game/home/31',
          '/:game/home/33',
          '/:game/home/53',
          '/:game/home/58',
        ],
        target: (params, url) => {
          const GITS_MAP = {
            bh3: 1, // '崩坏三',
            ys: 2, // '原神',
            bh2: 3, // '崩坏二',
            wd: 4, // '未定事件簿',
            sr: 6, // '崩坏：星穹铁道',
            zzz: 8, // '绝区零'
          };
          const { game } = params;
          const gids = GITS_MAP[game];
          if (!gids) {
            return '';
          }
          const { type = '2' } = new URL(url).searchParams;
          const page_size = '20';
          const last_id = '';
          return `/mihoyo/bbs/official/${gids}/${type}/${page_size}/${last_id}`;
        },
      },
    ],
    ys: [
      {
        title: '原神 - 新闻',
        docs: 'https://docs.rsshub.app/game.html##mi-ha-you',
        source: '/:location/news/:category',
        target: '/mihoyo/ys/:location/:category',
      },
    ],
  },
  'mindmeister.com': {
    _name: 'MindMeister',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/study.html#mindmeister',
        source: [
          '/:language/mind-maps/:category',
          '/:language/:category',
          '/:category',
        ],
        target: (params) =>
          `/mindmeister/${params.category}${
            params.language ? `/${params.language}` : ''
          }`,
      },
    ],
  },
  'minecraft.net': {
    _name: '我的世界',
    '.': [
      {
        title: 'Java 版游戏更新',
        docs: 'https://docs.rsshub.app/game.html#minecraft',
        source: ['/'],
        target: '/minecraft/version',
      },
    ],
  },
  'mingpao.com': {
    _name: '明报',
    '.': [
      {
        title: '即时新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#ming-bao',
        source: ['/'],
        target: '/mingpao/ins/:type?',
      },
      {
        title: '每日明报',
        docs: 'https://docs.rsshub.app/traditional-media.html#ming-bao',
        source: ['/'],
        target: '/mingpao/pns/:type?',
      },
    ],
  },
  'mpfinance.com': {
    _name: '明报',
    '.': [
      {
        title: '即时新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#ming-bao',
        source: ['/'],
        target: '/mingpao/ins/:type?',
      },
      {
        title: '每日明报',
        docs: 'https://docs.rsshub.app/traditional-media.html#ming-bao',
        source: ['/'],
        target: '/mingpao/pns/:type?',
      },
    ],
  },
  'miris.design': {
    _name: 'Stratechery by Ben Thompson',
    blog: [
      {
        title: 'Articles',
        docs: 'https://docs.rsshub.app/en/blog.html#stratechery-by-ben-thompson',
      },
    ],
  },
  'mirror.xyz': {
    _name: 'Mirror',
    '.': [
      {
        title: 'User',
        docs: 'https://docs.rsshub.app/new-media.html#mirror-user',
        source: ['/:id', '/'],
        target: (params, url) => {
          const matches = new URL(url)
            .toString()
            .match(/https:\/\/(.*?)\.mirror\.xyz/);
          const id = matches ? matches[1] : params.id;
          return `/mirror/${id}`;
        },
      },
    ],
  },
  'misskey.io': {
    _name: 'Misskey',
    '.': [
      {
        title: 'Featured Notes',
        docs: 'https://docs.rsshub.app/social-media.html#misskey',
        source: ['/explore'],
        target: '/misskey/notes/featured/misskey.io',
      },
    ],
  },
  'madost.one': {
    _name: 'Misskey',
    '.': [
      {
        title: 'Featured Notes',
        docs: 'https://docs.rsshub.app/social-media.html#misskey',
        source: ['/explore'],
        target: '/misskey/notes/featured/madost.one',
      },
    ],
  },
  'mk.nixnet.social': {
    _name: 'Misskey',
    '.': [
      {
        title: 'Featured Notes',
        docs: 'https://docs.rsshub.app/social-media.html#misskey',
        source: ['/explore'],
        target: '/misskey/notes/featured/mk.nixnet.social',
      },
    ],
  },
  'mixcloud.com': {
    _name: 'Mixcloud',
    www: [
      {
        title: 'User',
        docs: 'https://docs.rsshub.app/multimedia.html#mixcloud',
        source: ['/:username/:type?'],
        target: (params) => {
          if (params.username !== undefined) {
            if (
              ['stream', 'uploads', 'favorites', 'listens'].includes(
                params.type
              )
            ) {
              return `/mixcloud/${params.username}/${params.type}`;
            } else if (params.type === undefined) {
              return `/mixcloud/${params.username}/uploads`;
            }
          }
        },
      },
    ],
    '.': [
      {
        title: 'User',
        docs: 'https://docs.rsshub.app/multimedia.html#mixcloud',
        source: ['/:username/:type?'],
        target: (params) => {
          if (params.username !== undefined) {
            if (
              ['stream', 'uploads', 'favorites', 'listens'].includes(
                params.type
              )
            ) {
              return `/mixcloud/${params.username}/${params.type}`;
            } else if (params.type === undefined) {
              return `/mixcloud/${params.username}/uploads`;
            }
          }
        },
      },
    ],
  },
  'mobilism.org': {
    _name: 'Mobilism',
    '.': [
      {
        title: '论坛',
        docs: 'https://docs.rsshub.app/bbs.html#mobilism',
        source: '/',
      },
      {
        title: '门户',
        docs: 'https://docs.rsshub.app/bbs.html#mobilism',
        source: '/portal.php',
        target: (_params, url) =>
          `/mobilism/portal/${new URL(url).searchParams.get('block')}`,
      },
      {
        title: '电子书',
        docs: 'https://docs.rsshub.app/reading.html#mobilism',
        source: '/',
      },
    ],
  },
  'mohw.gov.tw': {
    _name: '台灣衛生福利部',
    '.': [
      {
        title: '即時新聞澄清',
        docs: 'https://docs.rsshub.app/government.html#tai-wan-wei-sheng-fu-li-bu-ji-shi-xin-wen-cheng-qing',
        source: ['/'],
        target: '/mohw/clarification',
      },
    ],
  },
  'mox.moe': {
    _name: 'Mox.moe',
    '.': [
      {
        title: '首頁',
        docs: 'https://docs.rsshub.app/anime.html#mox-moe-shou-ye',
        source: ['/l/:category', '/'],
        target: '/mox/:category?',
      },
    ],
  },
  'mpaypass.com.cn': {
    _name: '移动支付网',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#yi-dong-zhi-fu-wang',
        source: '/',
        target: '/mpaypass/news',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#yi-dong-zhi-fu-wang',
        source: ['/:type', '/'],
        target: (params) =>
          `/mpaypass/main/${params.type.replace('.html', '')}`,
      },
    ],
  },
  'mtime.com': {
    _name: '时光网',
    news: [
      {
        title: '时光新闻',
        docs: 'https://docs.rsshub.app/multimedia.html#shi-guang-wang',
        source: '/',
        target: '/mtime/news',
      },
    ],
  },
  'mwm.net.cn': {
    _name: '管理世界',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/journal.html#guan-li-shi-jie-fen-lei',
        source: ['/web/:category', '/'],
        target: '/mvm/:category?',
      },
    ],
  },
  'mydrivers.com': {
    _name: '快科技',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#kuai-ke-ji-xin-wen',
        source: ['/'],
        target: '/mydrivers/:type?/:id?',
      },
    ],
  },
  'myfigurecollection.net': {
    _name: 'MyFigureCollection',
    '.': [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    de: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    es: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    fi: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    fr: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    it: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    ja: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    nl: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    no: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    pl: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    pt: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    ru: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    sv: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
    zh: [
      {
        title: '活動',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-huo-dong',
        source: ['/browse/activity', '/'],
        target:
          '/myfigurecollection/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?',
      },
      {
        title: '資料庫',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-zi-liao-ku',
        source: ['/browse', '/'],
        target: '/myfigurecollection/:category?/:language?',
      },
      {
        title: '圖片',
        docs: 'https://docs.rsshub.app/shopping.html#MyFigureCollection-tu-pian',
        source: ['/picture/browse/:category', '/'],
        target: (params) => {
          if (
            params.category === 'potd' ||
            params.category === 'potw' ||
            params.category === 'potm'
          ) {
            return '/myfigurecollection/:category?/:language?';
          }
        },
      },
    ],
  },
  'mygopen.com': {
    _name: 'MyGoPen',
    '.': [
      {
        title: '分類',
        docs: 'https://docs.rsshub.app/new-media.html#mygopen-fen-lei',
        source: ['/search/label/:label', '/'],
        target: '/mygopen/:label?',
      },
    ],
  },
  'mysql.com': {
    _name: 'MySQL',
    dev: [
      {
        title: 'Release Notes',
        docs: 'https://docs.rsshub.app/programming.html#mysql-release-notes',
        source: ['/'],
        target: (params, url) =>
          `/mysql/release/${
            new URL(url).toString().match(/\/mysql\/(.*?)\//)[1]
          }`,
      },
    ],
  },
  'nationalgeographic.com': {
    _name: '国家地理',
    '.': [
      {
        title: '每日一图',
        docs: 'https://docs-rsshub.pages.dev/picture.html#guo-jia-di-li',
        source: ['/photo-of-the-day/*', '/'],
        target: '/natgeo/dailyphoto',
      },
    ],
  },
  'natgeomedia.com': {
    _name: '国家地理',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/travel.html#guo-jia-di-li',
        source: ['/:cat/:type', '/'],
        target: '/natgeo/:cat/:type',
      },
    ],
  },
  'nature.com': {
    _name: 'Nature',
    '.': [
      {
        title: '最新成果',
        docs: 'https://docs.rsshub.app/journal.html#nature-xi-lie',
        source: ['/:journal/research-articles', '/:journal', '/'],
        target: '/nature/research/:journal',
      },
      {
        title: '新闻及评论',
        docs: 'https://docs.rsshub.app/journal.html#nature-xi-lie',
        source: ['/:journal/news-and-comment', '/:journal', '/'],
        target: '/nature/news-and-comment/:journal',
      },
      {
        title: '封面故事',
        docs: 'https://docs.rsshub.app/journal.html#nature-xi-lie',
        source: ['/'],
        target: '/nature/cover',
      },
      {
        title: '主刊 - 新闻动态',
        docs: 'https://docs.rsshub.app/journal.html#nature-xi-lie',
        source: ['/latest-news', '/news', '/'],
        target: '/nature/news',
      },
      {
        title: '精彩研究',
        docs: 'https://docs.rsshub.app/journal.html#nature-xi-lie',
        source: [
          '/:journal/articles?type=research-highlight',
          '/:journal',
          '/',
        ],
        target: '/nature/highlight/:journal',
      },
    ],
  },
  'nautil.us': {
    _name: 'Nautilus',
    '.': [
      {
        title: 'Topics',
        docs: 'https://docs.rsshub.app/en/new-media.html#nautilus',
        source: ['/topics/:tid'],
        target: '/nautil/topic/:tid',
      },
    ],
  },
  'nbd.com.cn': {
    _name: '每经网',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/finance.html#mei-jing-wang',
        source: '/',
        target: '/nbd',
      },
      {
        title: '重磅原创',
        docs: 'https://docs.rsshub.app/finance.html#mei-jing-wang',
        source: '/',
        target: '/nbd/daily',
      },
    ],
  },
  'ncepu.edu.cn': {
    _name: '华北电力大学研究生院',
    yjsy: [
      {
        title: '通知公告',
        docs: ' https://docs.rsshub.app/university.html#hua-bei-dian-li-da-xue',
        source: ['/tzgg/index.htm', '/'],
        target: '/ncepu/master/tzgg',
      },
      {
        title: '硕士招生信息',
        docs: 'https://docs.rsshub.app/university.html#hua-bei-dian-li-da-xue',
        source: ['/zsxx/sszsxx/index.htm', '/'],
        target: '/ncepu/master/zsxx',
      },
      {
        title: '研究生培养信息',
        docs: 'https://docs.rsshub.app/university.html#hua-bei-dian-li-da-xue',
        source: ['/pyxx/pyxx/index.htm', '/'],
        target: '/ncepu/master/pyxx',
      },
    ],
  },
  'ncwu.edu.cn': {
    _name: '华北水利水电大学',
    '.': [
      {
        title: '学校通知',
        docs: 'https://docs.rsshub.app/university.html#hua-bei-shui-li-shui-dian-da-xue',
        source: '/xxtz.htm',
        target: '/ncwu/notice',
      },
    ],
  },
  'ndss-symposium.org': {
    _name: 'Network and Distributed System Security (NDSS) Symposium',
    '.': [
      {
        title: 'Accepted papers',
        docs: 'https://docs.rsshub.app/journal.html#network-and-distributed-system-security-ndss-symposium',
        source: ['/'],
        target: '/ndss-symposium/ndss',
      },
    ],
  },
  'neatdownloadmanager.com': {
    _name: 'Neat Download Manager',
    '.': [
      {
        title: 'Download',
        docs: 'https://docs.rsshub.app/program-update.html#neat-download-manager-download',
        source: ['/index.php', '/'],
        target: '/neatdownloadmanager/download/:os?',
      },
    ],
  },
  'neu.edu.cn': {
    _name: '东北大学',
    neunews: [
      {
        title: '新闻网',
        docs: 'https://docs.rsshub.app/university.html#dong-bei-da-xue',
        source: ['/:type/list.htm'],
        target: '/neu/news/:type',
      },
    ],
    'www.bmie': [
      {
        title: '学院新闻 - 医学与生物信息工程学院',
        docs: 'https://docs.rsshub.app/university.html#dong-bei-da-xue',
        source: ['/'],
        target: '/neu/bmie/news',
      },
    ],
  },
  'newmuseum.org': {
    _name: 'New Museum',
    www: [
      {
        title: 'Exhibitions',
        docs: 'https://docs.rsshub.app/en/travel.html#new-museum',
      },
    ],
  },
  'news.cn': {
    _name: '新华网',
    '.': [
      {
        title: '新华社新闻',
        docs: 'https://docs.rsshub.app/new-media.html#xin-hua-wang-xin-hua-she-xin-wen',
        source: ['/'],
        target: '/news/whxw',
      },
    ],
  },
  'newsmarket.com.tw': {
    _name: '上下游News&amp;Market',
    '.': [
      {
        title: '分類',
        docs: 'https://docs.rsshub.app/new-media.html#shang-xia-you-news-market',
        source: ['/blog/category/:category', '/'],
        target: '/newsmarket/:category?',
      },
    ],
  },
  'nextapple.com': {
    _name: '壹蘋新聞網',
    tw: [
      {
        title: '最新新聞',
        docs: 'https://docs.rsshub.app/new-media.html#yi-ping-xin-wen-wang',
        source: ['/', '/realtime/:category'],
        target: '/nextapple/realtime/:category?',
      },
    ],
  },
  'nga.cn': {
    _name: 'NGA',
    bbs: [
      {
        title: '分区帖子',
        docs: 'https://docs.rsshub.app/bbs.html#nga-fen-qu-tie-zi',
        source: '/thread.php',
        target: (params, url) =>
          new URL(url).searchParams.get('fid') &&
          `/nga/forum/${new URL(url).searchParams.get('fid')}`,
      },
      {
        title: '帖子',
        docs: 'https://docs.rsshub.app/bbs.html#nga-tie-zi',
        source: '/read.php',
        target: (params, url) =>
          new URL(url).searchParams.get('tid') &&
          `/nga/post/${new URL(url).searchParams.get('tid')}`,
      },
      {
        title: '帖子 - 只看作者',
        docs: 'https://docs.rsshub.app/bbs.html#nga-tie-zi',
        source: '/read.php',
        target: (params, url, document) => {
          const tid = new URL(url).searchParams.get('tid');
          const authorId = document.documentElement.innerHTML.match(
            /commonui\.userInfo\.setAll\(\s{3}{"(\d+)"/
          )[1];
          return `/nga/post/${tid}/${authorId}`;
        },
      },
    ],
  },
  '178.com': {
    _name: 'NGA',
    nga: [
      {
        title: '分区帖子',
        docs: 'https://docs.rsshub.app/bbs.html#nga-fen-qu-tie-zi',
        source: '/thread.php',
        target: (params, url) =>
          new URL(url).searchParams.get('fid') &&
          `/nga/forum/${new URL(url).searchParams.get('fid')}`,
      },
      {
        title: '帖子',
        docs: 'https://docs.rsshub.app/bbs.html#nga-tie-zi',
        source: '/read.php',
        target: (params, url) =>
          new URL(url).searchParams.get('tid') &&
          `/nga/post/${new URL(url).searchParams.get('tid')}`,
      },
      {
        title: '帖子 - 只看作者',
        docs: 'https://docs.rsshub.app/bbs.html#nga-tie-zi',
        source: '/read.php',
        target: (params, url, document) => {
          const tid = new URL(url).searchParams.get('tid');
          const authorId = document.documentElement.innerHTML.match(
            /commonui\.userInfo\.setAll\(\s{3}{"(\d+)"/
          )[1];
          return `/nga/post/${tid}/${authorId}`;
        },
      },
    ],
  },
  'ngabbs.com': {
    _name: 'NGA',
    '.': [
      {
        title: '分区帖子',
        docs: 'https://docs.rsshub.app/bbs.html#nga-fen-qu-tie-zi',
        source: '/thread.php',
        target: (params, url) =>
          new URL(url).searchParams.get('fid') &&
          `/nga/forum/${new URL(url).searchParams.get('fid')}`,
      },
      {
        title: '帖子',
        docs: 'https://docs.rsshub.app/bbs.html#nga-tie-zi',
        source: '/read.php',
        target: (params, url) =>
          new URL(url).searchParams.get('tid') &&
          `/nga/post/${new URL(url).searchParams.get('tid')}`,
      },
      {
        title: '帖子 - 只看作者',
        docs: 'https://docs.rsshub.app/bbs.html#nga-tie-zi',
        source: '/read.php',
        target: (params, url, document) => {
          const tid = new URL(url).searchParams.get('tid');
          const authorId = document.documentElement.innerHTML.match(
            /commonui\.userInfo\.setAll\(\s{3}{"(\d+)"/
          )[1];
          return `/nga/post/${tid}/${authorId}`;
        },
      },
    ],
  },
  'ngocn2.org': {
    _name: 'NGOCN',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#ngocn2-fen-lei',
        source: ['/'],
        target: '/ngocn2/:category?',
      },
    ],
  },
  'nhk.or.jp': {
    _name: 'NHK',
    www3: [
      {
        title: 'News Web Easy',
        docs: 'https://docs.rsshub.app/traditional-media.html#nhk',
        source: ['/news/easy/', '/'],
        target: '/nhk/news_web_easy',
      },
      {
        title: 'WORLD-JAPAN - 新闻提要',
        docs: 'https://docs.rsshub.app/traditional-media.html#nhk',
        source: ['/nhkworld/:lang/news/list/', '/nhkworld/:lang/news/'],
        target: '/nhk/news/:lang',
      },
    ],
  },
  'nifd.cn': {
    _name: '国家金融与发展实验室',
    www: [
      {
        title: '周报',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === '7a6a826d-b525-42aa-b550-4236e524227f') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '双周刊',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === '128d602c-7041-4546-beff-83e605f8a370') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '月报',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === '0712e220-fa3b-44d4-9226-bc3d57944e19') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '季报',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === 'b66aa691-87ee-4bfe-ac6b-2460386166ee') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '年报',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === 'c714853a-f09e-4510-8835-30a448fff7e3') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '课题报告',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === '17d0b29b-7912-498a-b9c3-d30508220158') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '学术论文',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === 'e6a6d3a5-4bda-4739-9765-e4e41c900bcc') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '工作论文',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === '3d23ba0e-4f46-44c2-9d21-6b38df4cdd70') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '研究评论',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === '3333d2af-91d6-429b-be83-28b92f31b6d7') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
      {
        title: '其他报告',
        docs: 'https://docs.rsshub.app/finance.html#guo-jia-jin-rong-yu-fa-zhan-shi-yan-shi-yan-jiu',
        source: ['/Research'],
        target: (_, url) => {
          const categoryGuid = new URL(url).searchParams.get('categoryGuid');
          if (categoryGuid === '6363bdc7-3e1b-4771-a904-6162cd3a3143') {
            return `/nifd/research/${categoryGuid}`;
          }
        },
      },
    ],
  },
  'nikkei.com': {
    _name: '日本経済新聞',
    www: [
      {
        title: 'ホームページ',
        docs: 'https://docs.rsshub.app/traditional-media.html#ri-ben-jing-ji-xin-wen',
        source: '/',
        target: '/nikkei/index',
      },
    ],
  },
  'nintendo.com': {
    _name: 'Nintendo',
    '.': [
      {
        title: '直面会',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/nintendo-direct/archive', '/'],
        target: '/nintendo/direct',
      },
      {
        title: 'eShop 新发售游戏',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/store/games', '/'],
        target: '/nintendo/eshop/us',
      },
    ],
  },
  'nintendo.com.hk': {
    _name: 'Nintendo',
    '.': [
      {
        title: 'eShop 新发售游戏',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/software/switch', '/'],
        target: '/nintendo/eshop/hk',
      },
      {
        title: '首页资讯（香港）',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/topics', '/'],
        target: '/nintendo/news',
      },
    ],
  },
  'nintendo.co.jp': {
    _name: 'Nintendo',
    '.': [
      {
        title: 'eShop 新发售游戏',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/software/switch/index.html', '/'],
        target: '/nintendo/eshop/jp',
      },
      {
        title: 'Switch 本体更新情报（日本）',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/support/switch/system_update/index.html', '/'],
        target: '/nintendo/system-update',
      },
    ],
  },
  'nintendoswitch.com.cn': {
    _name: 'Nintendo',
    '.': [
      {
        title: 'eShop 新发售游戏',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/software', '/'],
        target: '/nintendo/eshop/cn',
      },
      {
        title: '首页资讯（中国）',
        docs: 'https://docs.rsshub.app/game.html#nintendo',
        source: ['/'],
        target: '/nintendo/news/china',
      },
    ],
  },
  'nippon.com': {
    _name: '走进日本',
    www: [
      {
        title: '政治外交',
        docs: 'https://docs.rsshub.app/travel.html#zou-jin-ri-ben',
        source: ['/nippon/:category?', '/cn'],
        target: '/nippon/:category?',
      },
    ],
  },
  'njit.edu.cn': {
    _name: '南京工程学院',
    jwc: [
      {
        title: '南京工程学院教务处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-gong-cheng-xue-yuan-nan-jing-gong-cheng-xue-yuan-jiao-wu-chu',
        source: '/index/:type',
        target: (params) => `/njit/jwc/${params.type.replace('.htm', '')}`,
      },
    ],
    www: [
      {
        title: '南京工程学院通知公告',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-gong-cheng-xue-yuan-nan-jing-gong-cheng-xue-yuan-tong-zhi-gong-gao',
        source: '/',
        target: '/njit/tzgg',
      },
    ],
  },
  'njnu.edu.cn': {
    _name: '南京师范大学',
    ceai: [
      {
        title: '计算机与电子信息学院-人工智能学院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-shi-fan-da-xue',
        source: '/',
        target: '/njnu/ceai/xygg',
      },
    ],
    jwc: [
      {
        title: '教务通知',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-shi-fan-da-xue',
        source: '/',
        target: '/njnu/jwc/xwdt',
      },
    ],
  },
  'nju.edu.cn': {
    _name: '南京大学',
    admission: [
      {
        title: '本科迎新',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-ben-ke-ying-xin',
        source: ['/tzgg/index.html', '/tzgg', '/'],
        target: '/nju/admission',
      },
    ],
    dafls: [
      {
        title: '大学外语部',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-da-xue-wai-yu-bu',
        source: ['/13167/list.html', '/'],
        target: '/nju/dafls',
      },
    ],
    elite: [
      {
        title: '本科生交换生系统',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-ben-ke-sheng-yuan-jiao-huan-sheng-xi-tong',
        source: ['/exchangesystem/index/more', '/exchangesystem', '/'],
        target: (_, url) =>
          `/nju/exchangesys/${
            new URL(url).searchParams.get('type') === 'xw' ? 'news' : 'proj'
          }`,
      },
    ],
    grawww: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-yan-jiu-sheng-yuan',
        source: ['/main.htm', '/'],
        target: '/nju/gra',
      },
    ],
    hospital: [
      {
        title: '校医院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-xiao-yi-yuan',
        source: ['/ggtz/index.html'],
        target: '/nju/hospital',
      },
    ],
    itsc: [
      {
        title: 'ITSC信息中心',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-itsc-xin-xi-zhong-xin',
        source: ['/tzgg/list.htm'],
        target: '/nju/itsc',
      },
    ],
    jjc: [
      {
        title: '基建处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-ji-jian-chu',
        source: ['/main.htm', '/'],
        target: '/nju/jjc',
      },
    ],
    jw: [
      {
        title: '本科生院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-ben-ke-sheng-yuan',
        source: ['/:type/list.htm'],
        target: '/nju/jw/:type',
      },
    ],
    rczp: [
      {
        title: '人才招聘网',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-ren-cai-zhao-pin-wang',
        source: ['/sylm/:type/index.html'],
        target: '/nju/rczp/:type',
      },
    ],
    scit: [
      {
        title: '科学技术处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-ke-xue-ji-shu-chu',
        source: ['/:type/list.htm'],
        target: (params) =>
          `/nju/scit/${params.type === '11003' ? 'kydt' : 'tzgg'}`,
      },
    ],
    webplus: [
      {
        title: '后勤集团',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-hou-qin-ji-tuan',
        source: ['/_s25/main.psp'],
        target: '/nju/hqjt',
      },
    ],
    zbb: [
      {
        title: '招标办公室',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-zhao-biao-ban-gong-shi',
        source: ['/:type/index.chtml'],
        target: (params) => {
          let type;
          switch (params.type) {
            case 'cgxxhw':
            default:
              type = 'cgxx';
              break;
            case 'cjgshw':
              type = 'cjgs';
              break;
            case 'zfcgyxgk':
              type = params.type;
              break;
          }
          return `/nju/zbb/${type}`;
        },
      },
    ],
    zcc: [
      {
        title: '资产管理处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-da-xue-zi-chan-guan-li-chu',
        source: ['/tzgg/gyfytdglk/index.html', '/tzgg/index.html', '/'],
        target: '/nju/zcc',
      },
    ],
  },
  'njupt.edu.cn': {
    _name: '南京邮电大学',
    jwc: [
      {
        title: '教务处通知与新闻',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-you-dian-da-xue',
        source: '/*/list.htm',
        target: (_params, url) => {
          url = new URL(url);
          if (url.pathname.indexOf('/1594') !== -1) {
            return '/njupt/notice';
          } else if (url.pathname.indexOf('/1596') !== -1) {
            return '/njupt/news';
          }
        },
      },
    ],
  },
  'njust.edu.cn': {
    _name: '南京理工大学',
    jwc: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-li-gong-da-xue',
        source: ['/:type/list.htm'],
        target: (params) => {
          let type = '';
          switch (params.type) {
            case '1216':
              type = 'jstz';
              break;
            case '1217':
              type = 'xstz';
              break;
            case '1218':
              type = 'xw';
              break;
            case '1219':
              type = 'xydt';
              break;
            default:
              return;
          }
          return `/njust/jwc/${type}`;
        },
      },
    ],
    cwc: [
      {
        title: '财务处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-li-gong-da-xue',
        source: ['/:type/list.htm'],
        target: (params) => {
          let type = '';
          switch (params.type) {
            case '12432':
              type = 'tzgg';
              break;
            case '1382':
              type = 'bslc';
              break;
            default:
              return;
          }
          return `/njust/cwc/${type}`;
        },
      },
    ],
    gs: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-li-gong-da-xue',
        source: ['/:type/list.htm'],
        target: '/njust/gs/:type',
      },
    ],
    eoe: [
      {
        title: '电光学院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-li-gong-da-xue',
        source: ['/:type/list.htm'],
        target: (params) => {
          let type = '';
          switch (params.type) {
            case '1920':
              type = 'tzgg';
              break;
            case '1919':
              type = 'xwdt';
              break;
            default:
              return;
          }
          return `/njust/eoe/${type}`;
        },
      },
    ],
    dgxg: [
      {
        title: '电光学院研学网/年级网站',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-li-gong-da-xue',
        source: ['/:type/list.htm', '/:grade/:type/list.htm'],
        target: (params) => {
          if (!params.grade) {
            let type = '';
            switch (params.type) {
              case '6509':
                type = 'gstz';
                break;
              case '6511':
                type = 'xswh';
                break;
              case '6510':
                type = 'jyzd';
                break;
              default:
                return;
            }
            return `/njust/dgxg/${type}`;
          } else {
            return `/njust/eo/${params.grade}/${params.type}`;
          }
        },
      },
    ],
  },
  'njxzc.edu.cn': {
    _name: '南京晓庄学院',
    www: [
      {
        title: '通知公告',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xiao-zhuang-xue-yuan-tong-zhi-gong-gao',
        source: ['/89/list.htm', '/'],
        target: '/njxzc/tzgg',
      },
    ],
  },
  'nltimes.nl': {
    _name: 'NL Times',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/new-media.html#nl-times',
        source: '/categories/:category',
        target: '/nltimes/news/:category',
      },
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/new-media.html#nl-times',
        source: '/top-stories',
        target: '/nltimes/news/top-stories',
      },
    ],
  },
  'nmbxd1.com': {
    _name: 'X岛匿名版',
    www: [
      {
        title: '串',
        docs: 'https://docs.rsshub.app/bbs.html#x-dao-ni-ming-ban',
        source: ['/Forum/timeline/id/:id', '/f/:id'],
        target: '/nmbxd1/:id',
      },
    ],
  },
  'nmtv.cn': {
    _name: '内蒙古广播电视台',
    '.': [
      {
        title: '点播',
        docs: 'https://docs.rsshub.app/traditional-media.html#nei-meng-gu-guang-bo-dian-shi-tai-dian-bo',
        source: ['/'],
        target: (params, url) =>
          `/nmtv/column/${new URL(url).toString.split(/\/folder/).pop()}`,
      },
    ],
  },
  'nodejs.org': {
    _name: 'Node.js',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/programming.html#nodejs-news',
        source: ['/:language/blog', '/'],
        target: '/nodejs/blog/:language?',
      },
    ],
  },
  'nogizaka46.com': {
    _name: '乃木坂46',
    news: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#ban-dao-xi-lie-guan-wang-zi-xun-nai-mu-ban-46-xin-wen',
        source: ['/s/n46/news/list'],
        target: '/nogizaka46/news',
      },
    ],
    blog: [
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/new-media.html#ban-dao-xi-lie-guan-wang-zi-xun-nai-mu-ban-46-bo-ke',
        source: ['/s/n46/diary/MEMBER'],
        target: '/nogizaka46/blog',
      },
    ],
  },
  'news.now.com': {
    _name: 'Now 新聞',
    '.': [
      {
        title: '新聞',
        docs: 'https://docs.rsshub.app/traditional-media.html#now-xin-wen',
        source: ['/'],
        target: '/now/news/:category?/:id?',
      },
    ],
  },
  'nowcoder.com': {
    _name: '牛客网',
    '.': [
      {
        title: '面经',
        docs: 'https://docs.rsshub.app/bbs.html#niu-ke-wang-mian-jing',
        source: ['/'],
        target: '/nowcoder/experience',
      },
      {
        title: '讨论区',
        docs: 'https://docs.rsshub.app/bbs.html#niu-ke-wang',
        source: ['/discuss'],
        target: (_params, url) => {
          const href = new URL(url);
          return `/nowcoder/${href.searchParams.get(
            'type'
          )}/${href.searchParams.get('order')}`;
        },
      },
      {
        title: '实习广场 & 社招广场',
        docs: 'https://docs.rsshub.app/bbs.html#niu-ke-wang',
        source: ['/'],
        target: '/nowcoder/jobcenter',
      },
      {
        title: '校招日程',
        docs: 'https://docs.rsshub.app/bbs.html#niu-ke-wang',
        source: ['/'],
        target: '/nowcoder/schedule',
      },
      {
        title: '求职推荐',
        docs: 'https://docs.rsshub.app/bbs.html#niu-ke-wang',
        source: ['/'],
        target: '/nowcoder/recommend',
      },
    ],
  },
  'npmjs.com': {
    _name: 'npm',
    '.': [
      {
        title: '包',
        docs: 'https://docs.rsshub.app/program-update.html#npm',
        source: ['/package/:name'],
        target: '/npm/package/:name',
      },
    ],
  },
  'ntdtv.com': {
    _name: '新唐人电视台',
    www: [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/traditional-media.html#xin-tang-ren-dian-shi-tai',
        source: '/:language/:id',
        target: '/ntdtv/:language/:id',
      },
    ],
  },
  'nua.edu.cn': {
    _name: '南京艺术学院',
    index: [
      {
        title: '官网信息',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-yi-shu-xue-yuan',
        source: ['/:type/list.htm'],
        target: '/nua/index/:type',
      },
    ],
    sxw: [
      {
        title: '双馨网',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-yi-shu-xue-yuan',
        source: ['/:type/list.htm'],
        target: '/nua/sxw/:type',
      },
    ],
    dc: [
      {
        title: '设计学院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-yi-shu-xue-yuan',
        source: ['/:type/list.htm'],
        target: '/nua/dc/:type',
      },
    ],
    grad: [
      {
        title: '研究生处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-yi-shu-xue-yuan',
        source: ['/:type/list.htm'],
        target: '/nua/gra/:type',
      },
    ],
    lib: [
      {
        title: '图书馆',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-yi-shu-xue-yuan',
        source: ['/:type/list.htm'],
        target: '/nua/lib/:type',
      },
    ],
  },
  'nuaa.edu.cn': {
    _name: '南京航空航天大学',
    aao: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-hang-kong-hang-tian-da-xue',
      },
    ],
    cae: [
      {
        title: '自动化学院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-hang-kong-hang-tian-da-xue',
      },
    ],
    cs: [
      {
        title: '计算机科学与技术学院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-hang-kong-hang-tian-da-xue',
      },
    ],
    'www.graduate': [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-hang-kong-hang-tian-da-xue',
      },
    ],
  },
  'nuist.edu.cn': {
    _name: '南京信息工程大学',
    bulletin: [
      {
        title: '信息公告栏',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/:category/list.htm'],
        target: '/nuist/bulletin/:category',
      },
    ],
    cas: [
      {
        title: '大气科学学院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/index/:category'],
        target: (params) => `/nuist/cas/${params.category.replace('.htm', '')}`,
      },
    ],
    jwc: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/index/:category', '/xxtz/:category'],
        target: (params) => `/nuist/jwc/${params.category.replace('.htm', '')}`,
      },
    ],
    lib: [
      {
        title: '图书馆',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/', '/index/tzgg.htm'],
        target: '/nuist/lib',
      },
    ],
    scs: [
      {
        title: '计软院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/:category/list.htm'],
        target: '/nuist/scs/:category',
      },
    ],
    sese: [
      {
        title: '环科院',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/:category'],
        target: (params) =>
          `/nuist/sese/${params.category.replace('.htm', '')}`,
      },
    ],
    xgc: [
      {
        title: '学生工作处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/', '/419/list.htm'],
        target: '/nuist/xgc',
      },
    ],
    yjs: [
      {
        title: '研究生院学科建设处',
        docs: 'https://docs.rsshub.app/university.html#nan-jing-xin-xi-gong-cheng-da-xue',
        source: ['/'],
        target: '/nuist/jwc/:path+',
      },
    ],
  },
  'nyaa.si': {
    _name: 'nyaa',
    '.': [
      {
        title: 'nyaa 的搜索结果、指定用户、指定用户的搜索结果',
        docs: 'https://docs.rsshub.app/multimedia.html#nyaa',
        source: ['/', '/user/:username'],
        target: (params, url) => {
          url = new URL(url);
          const username = params.username;
          const query = url.searchParams.get('q');

          let currentURL = '/nyaa';
          if (username !== undefined) {
            currentURL = `${currentURL}/user/${username}`;
          }
          if (query !== null) {
            currentURL = `${currentURL}/search/${query}`;
          }
          return currentURL;
        },
      },
    ],
    sukebei: [
      {
        title: 'sukebei 的搜索结果、指定用户、指定用户的搜索结果',
        docs: 'https://docs.rsshub.app/multimedia.html#nyaa',
        source: ['/', '/user/:username'],
        target: (params, url) => {
          url = new URL(url);
          const username = params.username;
          const query = url.searchParams.get('q');

          let currentURL = '/nyaa/sukebei';
          if (username !== undefined) {
            currentURL = `${currentURL}/user/${username}`;
          }
          if (query !== null) {
            currentURL = `${currentURL}/search/${query}`;
          }
          return currentURL;
        },
      },
    ],
  },
  'nytimes.com': {
    _name: '纽约时报',
    '.': [
      {
        title: '新闻简报',
        docs: 'https://docs.rsshub.app/traditional-media.html#niu-yue-shi-bao',
        source: '/zh-hans/series/daily-briefing-chinese',
        target: '/nytimes/daily_briefing_chinese',
      },
      {
        title: '畅销书排行榜',
        docs: 'https://docs.rsshub.app/traditional-media.html#niu-yue-shi-bao',
        source: ['/books/best-sellers/:category', '/books/best-sellers/'],
        target: '/nytimes/book/:category',
      },
      {
        title: '作者新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#niu-yue-shi-bao',
        source: '/by/:byline',
        target: '/nytimes/author/:byline',
      },
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#niu-yue-shi-bao',
        source: '/',
        target: '/nytimes',
      },
    ],
  },
  'oceanengine.com': {
    _name: '巨量算数',
    trendinsight: [
      {
        title: '抖音/头条指数波峰',
        docs: 'https://docs.rsshub.app/other.html#ju-liang-suan-shu-suan-shu-zhi-shu',
        source: ['/arithmetic-index/analysis'],
        target: (params, url) =>
          `/oceanengine/index/${new URL(url).searchParams.get('keyword')}`,
      },
    ],
  },
  'odaily.news': {
    _name: 'Odaily 星球日报',
    '.': [
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-kuai-xun',
        source: ['/newsflash', '/'],
        target: '/odaily/newsflash',
      },
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-wen-zhang',
        source: ['/'],
        target: '/odaily/:id?',
      },
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-yong-hu-wen-zhang',
        source: ['/user/:id', '/'],
        target: '/odaily/user/:id',
      },
      {
        title: '活动',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-huo-dong',
        source: ['/activityPage', '/'],
        target: '/odaily/activity',
      },
    ],
  },
  '0daily.com': {
    _name: 'Odaily 星球日报',
    '.': [
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-kuai-xun',
        source: ['/newsflash', '/'],
        target: '/odaily/newsflash',
      },
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-wen-zhang',
        source: ['/'],
        target: '/odaily/:id?',
      },
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-yong-hu-wen-zhang',
        source: ['/user/:id', '/'],
        target: '/odaily/user/:id',
      },
      {
        title: '活动',
        docs: 'https://docs.rsshub.app/new-media.html#odaily-xing-qiu-ri-bao-huo-dong',
        source: ['/activityPage', '/'],
        target: '/odaily/activity',
      },
    ],
  },
  'oilchem.net': {
    _name: '隆众资讯',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/new-media.html#long-zhong-zi-xun',
      },
    ],
  },
  'on.cc': {
    _name: '东网',
    hk: [
      {
        title: '港澳',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-wang',
        source: ['/hk/news/index.html', '/hk/news/index_cn.html'],
        target: '/oncc/zh-hans/news',
      },
      {
        title: '两岸',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-wang',
        source: ['/hk/cnnews/index.html', '/hk/cnnews/index_cn.html'],
        target: '/oncc/zh-hans/cnnews',
      },
      {
        title: '国际',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-wang',
        source: ['/hk/intnews/index.html', '/hk/intnews/index_cn.html'],
        target: '/oncc/zh-hans/intnews',
      },
      {
        title: '评论',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-wang',
        source: ['/hk/commentary/index.html', '/hk/commentary/index_cn.html'],
        target: '/oncc/zh-hans/commentary',
      },
      {
        title: '产经',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-wang',
        source: ['/hk/finance/index.html', '/hk/finance/index_cn.html'],
        target: '/oncc/zh-hans/finance',
      },
    ],
    money18: [
      {
        title: '產經',
        docs: 'https://docs.rsshub.app/traditional-media.html#dong-wang',
        source: ['/finnews/news_breaking.html'],
        target: (params, url) =>
          `/oncc/money18/${new URL(url).searchParams.get('section')}`,
      },
    ],
  },
  'oo-software.com': {
    _name: 'O&O Software',
    '.': [
      {
        title: 'Changelog',
        docs: 'https://docs.rsshub.app/program-update.html#oo-software-changelog',
        source: ['/en/changelog'],
        target: (params, url) =>
          `/oo-software/changelog/${
            new URL(url).match(/\/en\/(.*?)\/changelog/)[1]
          }`,
      },
    ],
  },
  'openwrt.org': {
    _name: 'Openwrt',
    '.': [
      {
        title: 'Model Releases',
        docs: 'https://docs.rsshub.app/program-update.html#openwrt',
        source: '/toh/:band/:model',
        target: '/openwrt/releases/:model',
      },
    ],
  },
  'orcid.org': {
    _name: 'ORCID',
    '.': [
      {
        title: '作品列表',
        docs: 'https://docs.rsshub.app/study.html#orcid',
        source: ['/:id', '/'],
        target: '/ocrid/:id',
      },
    ],
  },
  'oreno3d.com': {
    _name: '俺の3Dエロ動画',
    '.': [
      {
        title: '关键词搜索',
        docs: 'https://docs.rsshub.app/anime.htm#an-の3dエロ-dong-hua-oreno3d-guan-jian-ci-sou-suo',
        source: ['/search'],
        target: (_params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/oreno3d/search/${searchParams.get('keyword')}${
            searchParams.has('sort') ? '/' + searchParams.get('sort') : ''
          }`;
        },
      },
      {
        title: '角色搜索',
        docs: 'https://docs.rsshub.app/anime.html#an-の3dエロ-dong-hua-oreno3d-jiao-se-sou-suo',
        source: ['/characters/:characterid'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/oreno3d/characters/${params.characterid}${
            searchParams.has('sort') ? '/' + searchParams.get('sort') : ''
          }`;
        },
      },
      {
        title: '作者搜索',
        docs: 'https://docs.rsshub.app/anime.html#an-の3dエロ-dong-hua-oreno3d-zuo-zhe-sou-suo',
        source: ['/authors/:authorid'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/oreno3d/authors/${params.authorid}${
            searchParams.has('sort') ? '/' + searchParams.get('sort') : ''
          }`;
        },
      },
      {
        title: '标签搜索',
        docs: 'https://docs.rsshub.app/anime.html#an-の3dエロ-dong-hua-oreno3d-biao-qian-sou-suo',
        source: ['/tags/:tagid'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/oreno3d/tags/${params.tagid}${
            searchParams.has('sort') ? '/' + searchParams.get('sort') : ''
          }`;
        },
      },
      {
        title: '原作搜索',
        docs: 'https://docs.rsshub.app/anime.html#an-の3dエロ-dong-hua-oreno3d-yuan-zuo-sou-suo',
        source: ['/origins/:originid'],
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          return `/oreno3d/origins/${params.originid}${
            searchParams.has('sort') ? '/' + searchParams.get('sort') : ''
          }`;
        },
      },
    ],
  },
  'oschina.net': {
    _name: '开源中国',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/programming.html#kai-yuan-zhong-guo',
        source: ['/news/:category'],
        target: '/oschina/news/:category',
      },
      {
        title: '问答主题',
        docs: 'https://docs.rsshub.app/programming.html#kai-yuan-zhong-guo',
        source: ['/question/topic/:topic'],
        target: '/oschina/topic/:topic',
      },
    ],
    my: [
      {
        title: '用户博客',
        docs: 'https://docs.rsshub.app/programming.html#kai-yuan-zhong-guo',
        source: ['/:id'],
        target: '/oschina/user/:id',
      },
      {
        title: '数字型账号用户博客',
        docs: 'https://docs.rsshub.app/programming.html#kai-yuan-zhong-guo',
        source: ['/u/:uid'],
        target: '/oschina/u/:uid',
      },
    ],
  },
  'oup.com': {
    _name: 'Oxford University Press',
    academic: [
      {
        title: '期刊',
        docs: 'https://docs.rsshub.app/journal.html#oxford-university-press',
        source: ['/', '/:name/issue'],
        target: '/oup/journals/:name',
      },
    ],
  },
  'outage.report': {
    _name: 'Outage.Report',
    '.': [
      {
        title: 'Report',
        docs: 'https://docs.rsshub.app/forecast.html#outage-report',
        source: ['/'],
        target: (params, url) =>
          `/outagereport/${new URL(url).toString().split('/').pop()}`,
      },
    ],
  },
  'panewslab.com': {
    _name: 'PANews',
    '.': [
      {
        title: '深度',
        docs: 'https://docs.rsshub.app/new-media.html#panews-shen-du',
        source: '/',
        target: '/panewslab/:category?',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#panews-kuai-xun',
        source: '/',
        target: '/panewslab/news',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/new-media.html#panews-zhuan-lan',
        source: '/',
        target: '/panewslab/author/:id',
      },
      {
        title: '专题',
        docs: 'https://docs.rsshub.app/new-media.html#panews-zhuan-ti',
        source: '/',
        target: '/panewslab/topic/:id',
      },
    ],
  },
  'paradigm.xyz': {
    _name: 'Paradigm',
    '.': [
      {
        title: 'Writing',
        docs: 'https://docs.rsshub.app/finance.html#paradigm',
        source: ['/writing'],
        target: '/paradigm/writing',
      },
    ],
  },
  'penguinrandomhouse.com': {
    _name: 'Penguin Random House',
    '.': [
      {
        title: 'Penguin Random House Book Lists',
        docs: 'https://docs.rsshub.app/reading.html#penguin-random-house',
        source: ['/the-read-down'],
        target: '/penguin-random-house/the-read-down',
      },
      {
        title: 'Penguin Random House Articles',
        docs: 'https://docs.rsshub.app/reading.html#penguin-random-house',
        source: ['/articles'],
        target: '/penguin-random-house/articles',
      },
    ],
  },
  'people.com.cn': {
    _name: '人民网',
    '.': [
      {
        title: '通用',
        docs: 'https://docs.rsshub.app/traditional-media.html#ren-min-wang-tong-yong',
        source: '/',
        target: '/people/:site?/:category?',
      },
    ],
    liuyan: [
      {
        title: '领导留言板',
        docs: 'https://docs.rsshub.app/traditional-media.html#ren-min-wang-ling-dao-liu-yan-ban',
        source: '/',
        target: '/people/liuyan/:id/:state?',
      },
    ],
  },
  'peopo.org': {
    _name: 'PeoPo 公民新聞',
    '.': [
      {
        title: '新聞分類',
        docs: 'https://docs.rsshub.app/new-media.html#peopo-gong-min-xin-wen',
        source: '/topic/:topicId',
        target: '/peopo/topic/:topicId',
      },
    ],
  },
  'phoronix.com': {
    _name: 'Phoronix',
    '.': [
      {
        title: '新闻与评测',
        docs: 'https://docs.rsshub.app/new-media.html#phoronix',
        source: ['/*'],
        target: '/phoronix/news',
      },
    ],
  },
  'pianyuan.org': {
    _name: '片源网',
    '.': [
      {
        title: '电影和剧集',
        docs: 'https://docs.rsshub.app/multimedia.html#pian-yuan',
        source: '/',
        target: '/pianyuan/index',
      },
    ],
  },
  'picnob.com': {
    _name: 'Picnob',
    '.': [
      {
        title: 'User profile',
        docs: 'https://docs.rsshub.app/en/social-media.html#picnob',
        source: ['/profile/:id/*'],
        target: '/picnob/user/:id',
      },
    ],
  },
  'picuki.com': {
    _name: 'Picuki',
    www: [
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/social-media.html#picuki-yong-hu',
        source: '/profile/:id',
        target: '/picuki/profile/:id',
      },
    ],
  },
  'pikabu.ru': {
    _name: 'Pikabu',
    '.': [
      {
        title: 'Community',
        docs: 'https://docs.rsshub.app/en/bbs.html#pikabu',
        source: ['/community/:name'],
        target: '/pikabu/community/:name',
      },
      {
        title: 'Tag',
        docs: 'https://docs.rsshub.app/en/bbs.html#pikabu',
        source: ['/tag/:name'],
        target: '/pikabu/tag/:name',
      },
      {
        title: 'User',
        docs: 'https://docs.rsshub.app/en/bbs.html#pikabu',
        source: ['/:name'],
        target: '/pikabu/user/:name',
      },
    ],
  },
  'pincong.rocks': {
    _name: '品葱',
    '.': [
      {
        title: '发现',
        docs: 'https://docs.rsshub.app/bbs.html#pin-cong',
        source: '/',
        target: (_params, url) => {
          const sortMap = {
            'sort_type-new': 'new',
            'recommend-1': 'recommend',
            'sort_type-hot__day2': 'hot',
          };
          const path = new URL(url).pathname;
          const category = (
            /__category/.test(path) ? path.split('__')[1] : path
          ).replace('category-', '');
          const sort =
            sortMap[
              /__category/.test(path) ? path.split('__')[0] : 'recommend-1'
            ];
          return `/pincong/category/${category}/${sort}`;
        },
      },
      {
        title: '精选',
        docs: 'https://docs.rsshub.app/bbs.html#pin-cong',
        source: ['/hot/:category'],
        target: (params) =>
          `/pincong/hot${
            params.category
              ? `/${params.category.replace('category-', '')}`
              : ''
          }`,
      },
      {
        title: '话题',
        docs: 'https://docs.rsshub.app/bbs.html#pin-cong',
        source: '/topic/:topic',
        target: '/pincong/topic/:topic',
      },
    ],
  },
  'pixabay.com': {
    _name: 'Pixabay',
    '.': [
      {
        title: 'Search',
        docs: 'https://docs.rsshub.app/en/picture.html#pixabay',
        source: ['/:searchType/search/:q'],
        target: '/pixabay/search/:q',
      },
    ],
  },
  'pixiv.net': {
    _name: 'Pixiv',
    www: [
      {
        title: '用户收藏',
        docs: 'https://docs.rsshub.app/social-media.html#pixiv',
        source: '/users/:id/bookmarks/artworks',
        target: '/pixiv/user/bookmarks/:id',
      },
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/social-media.html#pixiv',
        source: '/users/:id',
        target: '/pixiv/user/:id',
      },
      {
        title: '用户小说',
        docs: 'https://docs.rsshub.app/social-media.html#pixiv',
        source: '/users/:id/novels',
        target: '/pixiv/user/novels/:id',
      },
      {
        title: '排行榜',
        docs: 'https://docs.rsshub.app/social-media.html#pixiv',
        source: '/ranking.php',
        target: (params, url) =>
          `/pixiv/ranking/${new URL(url).searchParams.get('mode') || 'daily'}`,
      },
      {
        title: '关键词',
        docs: 'https://docs.rsshub.app/social-media.html#pixiv',
        source: ['/tags/:keyword', '/tags/:keyword/:type?'],
        target: (params, url) =>
          `/pixiv/search/:keyword/${new URL(url).searchParams.get(
            'order'
          )}/${new URL(url).searchParams.get('mode')}`,
      },
      {
        title: '关注的新作品',
        docs: 'https://docs.rsshub.app/social-media.html#pixiv',
        source: '/bookmark_new_illust.php',
        target: '/pixiv/user/illustfollows',
      },
    ],
  },
  'piyao.org.cn': {
    _name: '中国互联网联合辟谣平台',
    '.': [
      {
        title: '今日辟谣',
        docs: 'https://docs.rsshub.app/other.html#zhong-guo-hu-lian-wang-lian-he-pi-yao-ping-tai',
        source: ['/jrpy/index.htm'],
        target: '/piyao/jrpy',
      },
    ],
  },
  'pku.edu.cn': {
    _name: '北京大学',
    admission: [
      {
        title: '硕士招生',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/zsxx/sszs/index.htm', '/'],
        target: '/pku/admission/sszs',
      },
    ],
    bbs: [
      {
        title: '北大未名 BBS 全站十大',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/v2/hot-topic.php', '/'],
        target: '/pku/bbs/hot',
      },
    ],
    bio: [
      {
        title: '生命科学学院近期讲座',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/homes/Index/news_jz/7/7.html', '/'],
        target: '/pku/cls/lecture',
      },
    ],
    eecs: [
      {
        title: '信科公告通知',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/xygk1/ggtz/:type', '/xygk1/ggtz.htm', '/'],
        target: (params) => {
          let type = params.type;
          switch (type) {
            case 'qb.htm':
              type = 0;
              break;
            case 'xytz.htm':
              type = 1;
              break;
            case 'rstz.htm':
              type = 2;
              break;
            case 'jwtz.htm':
              type = 6;
              break;
            case 'xgtz.htm':
              type = 8;
              break;
            case 'kytz.htm':
              type = 7;
              break;
            case 'cwtz.htm':
              type = 5;
              break;
            case 'ghtz.htm':
              type = 3;
              break;
            case 'yytz.htm':
              type = 4;
              break;
            default:
              type = 0;
              break;
          }
          return `/pku/eecs/${type}`;
        },
      },
    ],
    hr: [
      {
        title: '人事处',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue-ren-shi-chu',
        source: ['/'],
        target: '/pku/hr/:category?',
      },
    ],
    nsd: [
      {
        title: '观点 - 北京大学国家发展研究院',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/'],
        target: '/pku/nsd/gd',
      },
    ],
    'www.rccp': [
      {
        title: '每周一推 - 中国政治学研究中心',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue-ren-shi-chu',
        source: ['/'],
        target: '/pku/rccp/mzyt',
      },
    ],
    scc: [
      {
        title: '学生就业指导服务中心',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue-ren-shi-chu',
        source: ['/*path'],
        target: (params) => {
          let type;
          switch (params.path) {
            case 'home!newsHome.action?category=12':
              type = 'xwrd';
              break;
            case 'home!newsHome.action?category=13':
              type = 'tzgg';
              break;
            case 'home!recruit.action?category=1&jobType=110001':
              type = 'zpxx';
              break;
            case 'home!recruitList.action?category=1&jobType=110002':
              type = 'gfjgxx';
              break;
            case 'home!recruitList.action?category=2':
              type = 'sxxx';
              break;
            case 'home!newsHome.action?category=11':
              type = 'cyxx';
              break;
            default:
              type = 'zpxx';
              break;
          }
          return `/pku/scc/recruit/${type}`;
        },
      },
    ],
    ss: [
      {
        title: '软微-通知公告',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/index.php/newscenter/notice', '/'],
        target: '/pku/ss/notice',
      },
      {
        title: '软微-招生通知',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/admission/admnotice', '/'],
        target: '/pku/ss/admission',
      },
      {
        title: '软微-硕士统考招生',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-da-xue',
        source: ['/admission/admbrochure/admission01', '/'],
        target: '/pku/ss/pgadmin',
      },
    ],
  },
  'playno1.com': {
    _name: 'PLAYNO.1玩樂達人',
    stno1: [
      {
        title: '情趣',
        docs: 'https://docs.rsshub.app/bbs.html#playno-1-wan-le-da-ren',
        source: ['/stno1/:catid/'],
        target: '/playno1/st/:catid',
      },
    ],
    www: [
      {
        title: 'AV',
        docs: 'https://docs.rsshub.app/bbs.html#playno-1-wan-le-da-ren',
        source: ['/portal.php'],
        target: (_params, url) =>
          `/playno1/av/${new URL(url).searchParams.get('catid')}`,
      },
    ],
  },
  'plurk.com': {
    _name: 'Plurk',
    '.': [
      {
        title: '話題',
        docs: 'https://docs.rsshub.app/social-media.html#plurk',
        source: ['/topic/:topic'],
        target: '/plurk/topic/:topic',
      },
      {
        title: '話題排行榜',
        docs: 'https://docs.rsshub.app/social-media.html#plurk',
        source: ['/top'],
        target: (_, url) => {
          const hash = new URL(url).hash;
          return `/plurk/top/${hash ? hash.slice(1) : 'topReplurks'}`;
        },
      },
      {
        title: '偷偷說',
        docs: 'https://docs.rsshub.app/social-media.html#plurk',
        source: ['/anonymous'],
        target: '/plurk/anonymous',
      },
      {
        title: '搜尋',
        docs: 'https://docs.rsshub.app/social-media.html#plurk',
        source: ['/search'],
        target: (_, url) =>
          `/plurk/search/${new URL(url).searchParams.get('q')}`,
      },
      {
        title: '最近分享',
        docs: 'https://docs.rsshub.app/social-media.html#plurk',
        source: ['/hotlinks'],
        target: '/plurk/hotlinks',
      },
      {
        title: '噗浪消息',
        docs: 'https://docs.rsshub.app/social-media.html#plurk',
        source: ['/news'],
        target: '/plurk/news',
      },
      {
        title: '用戶',
        docs: 'https://docs.rsshub.app/social-media.html#plurk',
        source: ['/:user'],
        target: (params) => {
          if (
            params.user !== 'portal' &&
            params.user !== 'top' &&
            params.user !== 'anonymous' &&
            params.user !== 'search' &&
            params.user !== 'hotlinks' &&
            params.user !== 'news'
          ) {
            return `/plurk/user/${params.user}`;
          }
        },
      },
    ],
  },
  'pmthinking.com': {
    _name: '产品沉思录',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#chan-pin-chen-si-lu-shou-ye',
        source: ['/'],
        target: '/pmthinking',
      },
    ],
  },
  'pnas.org': {
    _name: 'Proceedings of the National Academy of Sciences',
    '.': [
      {
        title: '期刊',
        docs: 'https://docs.rsshub.app/journal.html#proceedings-of-the-national-academy-of-sciences',
        source: ['/*topicPath'],
        target: '/pnas/:topicPath',
      },
    ],
  },
  'polkadot.network': {
    _name: 'Polkadot',
    '.': [
      {
        title: 'Blog',
        docs: 'https://docs.rsshub.app/blog.html#polkadot',
        source: ['/', '/blog/', '/blog/*'],
        target: '/polkadot/blog',
      },
    ],
  },
  'polkaworld.org': {
    _name: 'PolkaWorld',
    www: [
      {
        title: '最新资讯',
        docs: 'https://docs.rsshub.app/blog.html#polkaworld',
        source: ['/', '/articles/:name'],
        target: '/polkaworld/newest',
      },
    ],
  },
  'postman.com': {
    _name: 'Postman',
    '.': [
      {
        title: 'Release Notes',
        docs: 'https://docs.rsshub.app/program-update.html#postman-release-notes',
        source: ['/downloads/release-notes', '/'],
        target: '/postman/release-notes',
      },
    ],
  },
  'prestige-av.com': {
    _name: 'Prestige 蚊香社',
    '.': [
      {
        title: '系列作品',
        docs: 'https://docs.rsshub.app/multimedia.html#prestige-wen-xiang-she',
        source: ['/goods/goods_list.php'],
        target: (_params, url) => {
          const link = new URL(url);
          if (link.searchParams.get('mode') === 'series') {
            return link.searchParams.has('sort')
              ? `/prestige-av/series/${link.searchParams.get(
                  'mid'
                )}/${link.searchParams.get('sort')}`
              : `/prestige-av/series/${link.searchParams.get('mid')}`;
          }
        },
      },
    ],
  },
  'producthunt.com': {
    _name: 'Product Hunt',
    www: [
      {
        title: 'Today Popular',
        docs: 'https://docs.rsshub.app/other.html#product-hunt',
        source: ['/'],
        target: '/producthunt/today',
      },
    ],
  },
  'pts.org.tw': {
    _name: '公視新聞網 PNN',
    news: [
      {
        title: '即時新聞',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-ji-shi-xin-wen',
        source: ['/dailynews', '/'],
        target: '/pts/dailynews',
      },
      {
        title: '專題策展',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-zhuan-ti-ce-zhan',
        source: ['/curations', '/'],
        target: '/pts/curations',
      },
      {
        title: '整理報導',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-zheng-li-bao-dao',
        source: ['/live/:id', '/'],
        target: '/pts/live/:id',
      },
      {
        title: '觀點',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-guan-dian',
        source: ['/opinion', '/'],
        target: '/pts/opinion',
      },
      {
        title: '數位敘事',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-shu-wei-xu-shi',
        source: ['/projects', '/'],
        target: '/pts/projects',
      },
      {
        title: '深度報導',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-shen-du-bao-dao',
        source: ['/report', '/'],
        target: '/pts/report',
      },
      {
        title: '分類',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-fen-lei',
        source: ['/category/:id', '/'],
        target: '/pts/category/:id',
      },
      {
        title: '標籤',
        docs: 'https://docs.rsshub.app/traditional-media.html#gong-shi-xin-wen-wang-biao-qian',
        source: ['/tag/:id', '/'],
        target: '/pts/tag/:id',
      },
    ],
  },
  'pubmed.ncbi.nlm.nih.gov': {
    _name: 'PubMed',
    '.': [
      {
        title: 'Trending articles',
        docs: 'https://docs.rsshub.app/journal.html#pubmed-trending-articles',
        source: ['/trending', '/'],
        target: (params, url) =>
          `/pubmed/trending/${new URL(url).searchParams
            .getAll('filter')
            .join(',')}`,
      },
    ],
  },
  'chiark.greenend.org.uk': {
    _name: 'PuTTY',
    www: [
      {
        title: 'Change Log',
        docs: 'https://docs.rsshub.app/program-update.html#putty-change-log',
        source: ['/~sgtatham/putty/changes.html', '/'],
        target: '/putty/changes',
      },
    ],
  },
  'qbittorrent.org': {
    _name: 'qBittorrent',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/program-update.html#qbittorrent',
        source: ['/news.php', '/'],
        target: '/qbittorrent/news',
      },
    ],
  },
  'qianzhan.com': {
    _name: '前瞻网',
    '.': [
      {
        title: '文章列表',
        docs: 'https://docs.rsshub.app/finance.html#qian-zhan-wang',
        source: ['/analyst', '/analyst/list/:html'],
        target: (params) => {
          if (params.html) {
            const type = params.html.match(/\d+/)[0];
            return '/qianzhan/analyst/column/' + type;
          } else {
            return '/qianzhan/analyst/column/all';
          }
        },
      },
      {
        title: '排行榜',
        docs: 'https://docs.rsshub.app/finance.html#qian-zhan-wang',
        source: ['/analyst', '/'],
        target: '/qianzhan/analyst/rank',
      },
    ],
  },
  'qidian.com': {
    _name: '起点',
    book: [
      {
        title: '章节',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian',
        source: '/info/:id',
        target: '/qidian/chapter/:id',
      },
      {
        title: '讨论区',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian',
        source: '/info/:id',
        target: '/qidian/forum/:id',
      },
    ],
    my: [
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian',
        source: '/author/:id',
        target: '/qidian/author/:id',
      },
    ],
    www: [
      {
        title: '限免',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian',
        source: '/free',
        target: '/qidian/free',
      },
      {
        title: '女生限免',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian',
        source: '/mm/free',
        target: '/qidian/free/mm',
      },
    ],
  },
  'qidiantu.com': {
    _name: '起点图',
    '.': [
      {
        title: '首订',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian-tu-shou-ding',
        source: ['/shouding', '/'],
        target: '/qidiantu/shouding',
      },
      {
        title: '榜单',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian-tu-bang-dan',
        source: ['/bang/:category/:type', '/'],
        target: '/qidiantu/:category?/:type?/:is_history?',
      },
    ],
  },
  'qingting.fm': {
    _name: '蜻蜓 FM',
    '.': [
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/multimedia.html#qing-ting-fm',
        source: '/channels/:id',
        target: '/qingting/channels/:id',
      },
      {
        title: '播客',
        docs: 'https://docs.rsshub.app/multimedia.html#qing-ting-fm',
        source: '/channels/:id',
        target: '/qingting/podcast/:id',
      },
    ],
  },
  'qipamaijia.com': {
    _name: '奇葩买家秀',
    '.': [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/reading.html#qi-dian-tu-shou-ding',
        source: ['/', '/:cate'],
        target: '/qipamaijia/:cate',
      },
    ],
  },
  'qiyoujiage.com': {
    _name: '汽油价格网',
    '.': [
      {
        title: '今日油价查询',
        docs: 'https://docs.rsshub.app/other.html#qi-you-jia-ge-wang',
        source: ['/*'],
        target: (_, url) =>
          `/qiyoujiage${new URL(url).pathname.replace('.shtml', '')}`,
      },
    ],
  },
  'qlu.edu.cn': {
    _name: '齐鲁工业大学',
    '.': [
      {
        title: '通知公告',
        docs: 'https://docs.rsshub.app/university.html#qi-lu-gong-ye-da-xue',
        source: ['/tzggsh/list1.htm'],
        target: '/qlu/notice',
      },
    ],
  },
  'qm120.com': {
    _name: '全民健康网',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#quan-min-jian-kang-wang-xin-wen',
        source: ['/'],
        target: '/qm120/news/:category?',
      },
    ],
  },
  'qoo-app.com': {
    _name: 'QooApp',
    apps: [
      {
        title: '遊戲庫 - 評論',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/app-comment/:id', '/app-comment/:id', '/app/:id'],
        target: (params) =>
          `/qoo-app/apps${params.lang ? `/${params.lang}` : ''}/comment/:id`,
      },
      {
        title: '遊戲庫 - 情報',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/app-post/:id', '/app-post/:id', '/app/:id'],
        target: (params) =>
          `/qoo-app/apps${params.lang ? `/${params.lang}` : ''}/post/:id`,
      },
      {
        title: '遊戲庫 - 筆記',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/app-note/:id', '/app-note/:id', '/app/:id'],
        target: (params) =>
          `/qoo-app/apps${params.lang ? `/${params.lang}` : ''}/note/:id`,
      },
      {
        title: '遊戲庫 - 曬卡',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/app-card/:id', '/app-card/:id', '/app/:id'],
        target: (params) =>
          `/qoo-app/apps${params.lang ? `/${params.lang}` : ''}/card/:id`,
      },
    ],
    news: [
      {
        title: '資訊',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang', '/'],
        target: (params) =>
          `/qoo-app/news${params.lang ? `/${params.lang}` : ''}`,
      },
    ],
    notes: [
      {
        title: '筆記留言',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/note/:id', '/note/:id'],
        target: (params) =>
          `/qoo-app/notes${params.lang ? `/${params.lang}` : ''}/note/:id`,
      },
      {
        title: '熱門話題',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/topic/:topic', '/topic/:topic'],
        target: (params) =>
          `/qoo-app/notes${params.lang ? `/${params.lang}` : ''}/topic/:topic`,
      },
      {
        title: '用户筆記',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/user/:uid', '/user/:uid'],
        target: (params) =>
          `/qoo-app/notes${params.lang ? `/${params.lang}` : ''}/user/:uid`,
      },
    ],
    user: [
      {
        title: '遊戲評論',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/:uid', '/:uid'],
        target: (params) =>
          `/qoo-app/user${
            params.lang ? `/${params.lang}` : ''
          }/appComment/:uid`,
      },
      {
        title: '用户筆記',
        docs: 'https://docs.rsshub.app/anime.html#qooapp',
        source: ['/:lang/:uid', '/:uid'],
        target: (params) =>
          `/qoo-app/notes${params.lang ? `/${params.lang}` : ''}/user/:uid`,
      },
    ],
  },
  'qq.com': {
    _name: '腾讯',
    egame: [
      {
        title: '企鹅电竞直播间',
        docs: 'https://docs.rsshub.app/live.html#qi-e-dian-jing-zhi-bo-jian-kai-bo',
        source: '/:id',
        target: (params) => {
          if (params.id.match(/^\d+$/)) {
            return '/egameqq/room/:id';
          }
        },
      },
    ],
    'mp.weixin': [
      {
        title: '微信公众号栏目',
        docs: 'https://docs.rsshub.app/new-media.html#gong-zhong-hao-lan-mu-fei-tui-song-li-shi-xiao-xi',
        source: '/mp/homepage',
        target: (params, url) =>
          `/wechat/mp/homepage/${new URL(url).searchParams.get(
            '__biz'
          )}/${new URL(url).searchParams.get('hid')}/${
            new URL(url).searchParams.get('cid')
              ? new URL(url).searchParams.get('cid')
              : ''
          }`,
      },
      {
        title: '微信公众号话题',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin-gong-zhong-hao-wen-zhang-hua-ti-tag',
        source: '/mp/appmsgalbum',
        target: (params, url) =>
          `/wechat/mp/msgalbum/${new URL(url).searchParams.get(
            '__biz'
          )}/${new URL(url).searchParams.get('album_id')}`,
      },
    ],
    news: [
      {
        title: '腾讯新闻 - 新型冠状病毒肺炎疫情实时追踪',
        docs: 'https://docs.rsshub.app/other.html#xin-guan-fei-yan-yi-qing-xin-wen-dong-tai',
        source: ['/zt2020/page/feiyan.htm#/'],
        target: '/tencent/news/coronavirus/total',
      },
    ],
    pvp: [
      {
        title: '王者荣耀 - 新闻中心',
        docs: 'https://docs.rsshub.app/game.html#wang-zhe-rong-yao',
        source: ['/web201706/*', '/'],
        target: '/tencent/pvp/newsindex/all',
      },
    ],
    v: [
      {
        title: '视频 - 播放列表',
        docs: 'https://docs.rsshub.app/multimedia.html#teng-xun-shi-pin',
        source: '/x/cover/:id',
        target: (params) => {
          const id = params.id.match('(.*).html')[1];
          return id ? `/tencentvideo/playlist/${id}` : '';
        },
      },
      {
        title: '视频 - 播放列表',
        docs: 'https://docs.rsshub.app/multimedia.html#teng-xun-shi-pin',
        source: '/x/cover/:id/:detail',
        target: '/tencentvideo/playlist/:id',
      },
    ],
    'wiki.connect': [
      {
        title: 'QQ 互联 SDK 更新日志',
        docs: 'https://docs.rsshub.app/program-update.html#qq-hu-lian-sdk',
        source: '/',
        target: (_params, url) =>
          `/tencent/qq/sdk/changelog/${
            new URL(url).pathname === '/ios_sdk历史变更' ? 'iOS' : 'Android'
          }`,
      },
    ],
  },
  'qq88.info': {
    _name: '秋爸日字',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/multimedia.html#qiu-ba-ri-zi',
        source: '/',
        target: (_params, url) =>
          new URL(url).searchParams.get('cat')
            ? `/qq88/${new URL(url).searchParams.get('cat')}`
            : '/qq88',
      },
    ],
  },
  'getquicker.net': {
    _name: 'Quicker',
    '.': [
      {
        title: '动作分享',
        docs: 'https://docs.rsshub.app/programming.html#quicker-dong-zuo-fen-xiang',
        source: ['/Share/:category', '/'],
        target: '/quicker/share/:category?',
      },
      {
        title: '讨论区',
        docs: 'https://docs.rsshub.app/programming.html#quicker-tao-lun-qu',
        source: ['/QA', '/'],
        target: (params, url) =>
          `/quicker/qa/${new URL(url).searchParams.get('category') ?? ''}/${
            new URL(url).searchParams.get('state') ?? ''
          }`,
      },
      {
        title: '用户动作更新',
        docs: 'https://docs.rsshub.app/programming.html#quicker-yong-hu-dong-zuo-geng-xin',
        source: ['/QA', '/'],
        target: (params, url) =>
          `/quicker/qa/${new URL(url).searchParams.get('category') ?? ''}/${
            new URL(url).searchParams.get('state') ?? ''
          }`,
      },
      {
        title: '版本更新',
        docs: 'https://docs.rsshub.app/programming.html#quicker-ban-ben-geng-xin',
        source: ['/Help/Versions', '/'],
        target: '/quicker/versions',
      },
    ],
  },
  'radio.cn': {
    _name: '云听',
    '.': [
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/multimedia.html#yun-ting-zhuan-ji',
        source: ['/pc-portal/sanji/detail.html', '/share/albumDetail', '/'],
        target: (params, url) =>
          `/radio/album/${new URL(url).searchParams.get('columnId')}`,
      },
      {
        title: '节目',
        docs: 'https://docs.rsshub.app/multimedia.html#yun-ting-jie-mu',
        source: ['/pc-portal/sanji/detail.html', '/share/albumDetail', '/'],
        target: (params, url) =>
          `/radio/${new URL(url).searchParams.get('columnId')}`,
      },
      {
        title: '直播',
        docs: 'https://docs.rsshub.app/multimedia.html#yun-ting-zhi-bo',
        source: ['/pc-portal/sanji/zhibo_2.html', '/'],
        target: (params, url) =>
          `/radio/zhibo/${new URL(url).searchParams.get('name')}`,
      },
    ],
  },
  'ici.radio-canada.ca': {
    _name: 'Radio Canada',
    '.': [
      {
        title: 'Latest News',
        docs: 'https://docs.rsshub.app/new-media.html#jia-na-da-guo-ji-guang-bo-dian-tai-zui-xin-xiao-xi',
        source: ['/rci/:lang', '/'],
        target: '/radio-canada/latest/:language?',
      },
    ],
  },
  'rarehistoricalphotos.com': {
    _name: 'Rare Historical Photos',
    '.': [
      {
        title: 'Home',
        docs: 'https://docs.rsshub.app/en/picture.html#rare-historical-photos',
        source: ['/'],
        target: '/rarehistoricalphotos',
      },
    ],
  },
  'readhub.cn': {
    _name: 'Readhub',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#readhub',
        source: ['/', '/:category'],
        target: (params) =>
          `/readhub/${params.category ? params.category : ''}`,
      },
    ],
  },
  'remnote.com': {
    _name: 'RemNote',
    '.': [
      {
        title: 'Changelog',
        docs: 'https://docs.rsshub.app/program-update.html#remnote',
        source: ['/changelog', '/'],
        target: '/remnote/changelog',
      },
    ],
  },
  'researchgate.net': {
    _name: 'ResearchGate',
    '.': [
      {
        title: 'Publications',
        docs: 'https://docs.rsshub.app/study.html#researchgate',
        source: ['/profile/:username'],
        target: '/researchgate/publications/:username',
      },
    ],
  },
  'reuters.com': {
    _name: '路透社',
    '.': [
      {
        title: '分类/话题/作者',
        docs: 'https://docs.rsshub.app/traditional-media.html#lu-tou-she',
        source: ['/:category/:topic?', '/'],
        target: '/reuters/:category/:topic?',
      },
      {
        title: '深度调查栏目',
        docs: 'https://docs.rsshub.app/traditional-media.html#lu-tou-she',
        source: ['/investigates'],
        target: '/reuters/inverstigates',
      },
    ],
  },
  'rfa.org': {
    _name: '自由亚洲电台',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#zi-you-ya-zhou-dian-tai',
        source: '/:language/:channel/:subChannel',
        target: '/rfa/:language/:channel/:subChannel',
      },
    ],
  },
  'rfi.fr': {
    _name: '法国国际广播电台',
    '.': [
      {
        title: '滚动新闻',
        docs: 'https://docs.rsshub.app/multimedia.html#fa-guo-guo-ji-guang-bo-dian-tai-gun-dong-xin-wen',
        source: ['/'],
        target: '/rfi/news',
      },
    ],
  },
  'rodong.rep.kp': {
    _name: '劳动新闻',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#lao-dong-xin-wen',
        source: [
          '/cn/index.php',
          '/en/index.php',
          '/ko/index.php',
          '/cn',
          '/en',
          '/ko',
        ],
        target: '/rodong/news',
      },
    ],
  },
  'rsshub.app': {
    _name: 'RSSHub',
    docs: [
      {
        title: '有新路由啦',
        docs: 'https://docs.rsshub.app/program-update.html#rsshub',
        source: ['', '/*tpath'],
        target: '/rsshub/routes',
      },
      {
        title: '有新赞助商啦',
        docs: 'https://docs.rsshub.app/program-update.html#rsshub',
        source: ['', '/*tpath'],
        target: '/rsshub/sponsors',
      },
    ],
  },
  'ruancan.com': {
    _name: '软餐',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#ruan-can-shou-ye',
        source: ['/'],
        target: '/ruancan',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#ruan-can-fen-lei',
        source: ['/cat/:category', '/'],
        target: '/ruancan/category/:category',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/new-media.html#ruan-can-sou-suo',
        source: ['/'],
        target: (params, url) =>
          `/ruancan/search/${new URL(url).searchParams.get('s')}`,
      },
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/new-media.html#ruan-can-yong-hu-wen-zhang',
        source: ['/i/:id', '/'],
        target: '/ruancan/user/:id',
      },
    ],
  },
  'ruc.edu.cn': {
    _name: '中国人民大学',
    hr: [
      {
        title: '人事处',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ren-min-da-xue-ren-shi-chu',
        source: ['/'],
        target: '/ruc/hr/:category?',
      },
    ],
  },
  'rustcc.cn': {
    _name: 'Rust语言中文社区',
    '.': [
      {
        title: '招聘',
        docs: 'https://docs.rsshub.app/programming.html#rust-yu-yan-zhong-wen-she-qu',
        source: ['/'],
        target: '/rustcc/jobs',
      },
    ],
  },
  'sakurazaka46.com': {
    _name: '櫻坂46',
    '.': [
      {
        title: '公式ブログ',
        docs: 'https://docs.rsshub.app/new-media.html#ban-dao-xi-lie-guan-wang-zi-xun-ying-ban-46-bo-ke',
        source: ['/s/s46/diary/blog/list', '/'],
        target: (params, url) =>
          `/sakurazaka46/blog/${new URL(url).searchParams.get('ct')}`,
      },
      {
        title: 'ニュース',
        docs: 'https://docs.rsshub.app/new-media.html#ban-dao-xi-lie-guan-wang-zi-xun-ying-ban-46-xin-wen',
        source: ['/s/s46/news/list', '/'],
        target: '/sakurazaka46/news',
      },
    ],
  },
  'samsung.com': {
    _name: 'Samsung',
    research: [
      {
        title: 'Research Blog',
        docs: 'https://docs.rsshub.app/new-media.html#samsung-research-blog',
        source: ['/blog', '/'],
        target: '/samsung/research/blog',
      },
    ],
  },
  'saraba1st.com': {
    _name: 'Saraba1st',
    bbs: [
      {
        title: '论坛',
        docs: 'https://docs.rsshub.app/bbs.html#saraba1st',
        source: '/2b/:id',
        target: (params) => {
          let id = params.id;
          // For Digest
          if (id.match('forum') !== null) {
            id = id.substring(0, id.length - 5);
            return `/saraba1st/digest/${id}`;
          }
          // For Thread
          else if (id.match('thread') !== null) {
            id = params.id.includes('thread') ? params.id.split('-')[1] : '';
            return id ? `/saraba1st/thread/${id}` : '';
          }
        },
      },
    ],
  },
  'science.org': {
    _name: 'Science Magazine',
    '.': [
      {
        title: '本期刊物',
        docs: 'https://docs.rsshub.app/journal.html#science-xi-lie',
        source: ['/journal/:journal', '/toc/:journal/current'],
        target: '/science/current/:journal',
      },
      {
        title: '封面故事',
        docs: 'https://docs.rsshub.app/journal.html#science-xi-lie',
        source: ['/'],
        target: '/science/cover',
      },
      {
        title: '在线发表',
        docs: 'https://docs.rsshub.app/journal.html#science-xi-lie',
        source: ['/journal/:journal', '/toc/:journal/0/0'],
        target: '/science/early/:journal',
      },
    ],
  },
  'sciencenet.cn': {
    _name: '科学网',
    blog: [
      {
        title: '精选博客',
        docs: 'https://docs.rsshub.app/new-media.html#ke-xue-wang-jing-xuan-bo-ke',
        source: ['/blog.php', '/'],
        target: (params, url) =>
          `/sciencenet/blog/${new URL(url).searchParams.get('mod')}/${new URL(
            url
          ).searchParams.get('op')}/${new URL(url).searchParams.get('ord')}`,
      },
      {
        title: '用户博客',
        docs: 'https://docs.rsshub.app/new-media.html#ke-xue-wang-jing-xuan-bo-ke',
        source: ['/u/:id', '/'],
        target: '/sciencenet/user/:id',
      },
    ],
  },
  'scitation.org': {
    _name: 'scitation',
    '.': [
      {
        title: 'journal',
        docs: 'https://docs.rsshub.app/journal.html#scitation',
        source: ':pub.scitation.org/toc/:jrn',
        target: '/scitation/:pub/:jrn',
      },
      {
        title: 'section',
        docs: 'https://docs.rsshub.app/journal.html#scitation',
        source: ':pub.scitation.org/toc/:jrn',
        target: (params, url) =>
          `/scitation/:pub/:jrn/${new URL(url).searchParams.get('tocSection')}`,
      },
    ],
  },
  'scmp.com': {
    _name: 'South China Morning Post',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/en/traditional-media.html#south-china-morning-post',
        source: ['/rss/:category_id/feed'],
        target: '/scmp/:category_id',
      },
    ],
  },
  'sctv.com': {
    _name: '四川广播电视台',
    '.': [
      {
        title: '电视回放',
        docs: 'https://docs.rsshub.app/traditional-media.html#si-chuan-guang-bo-dian-shi-tai-dian-shi-hui-fang',
        source: ['/column/list', '/column/detail', '/'],
        target: (params, url) =>
          `/sctv/programme/${new URL(url).searchParams.get('programmeId')}`,
      },
    ],
  },
  'scvtc.edu.cn': {
    _name: '四川职业技术学院',
    '.': [
      {
        title: '学院公告',
        docs: 'https://docs.rsshub.app/university.html#si-chuan-zhi-ye-ji-shu-xue-yuan',
        source: ['/ggfw1/xygg.htm', '/'],
        target: '/scvtc/xygg',
      },
    ],
  },
  'sdu.edu.cn': {
    _name: '山东大学',
    'xinwen.wh': [
      {
        title: '(威海)新闻网|校园要闻',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/xyyw',
      },
      {
        title: '(威海)新闻网|学生动态',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/xsdt',
      },
      {
        title: '(威海)新闻网|综合新闻',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/zhxw',
      },
      {
        title: '(威海)新闻网|山大视点',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/sdsd',
      },
      {
        title: '(威海)新闻网|菁菁校园',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/jjxy',
      },
      {
        title: '(威海)新闻网|校园简讯',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/xyjx',
      },
      {
        title: '(威海)新闻网|玛珈之窗',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/mjzc',
      },
      {
        title: '(威海)新闻网|热点专题',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/rdzt',
      },
      {
        title: '(威海)新闻网|媒体视角',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/mtsj',
      },
      {
        title: '(威海)新闻网|高教视野',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/gjsy',
      },
      {
        title: '(威海)新闻网|理论学习',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/news/llxx',
      },
    ],
    'jwc.wh': [
      {
        title: '(威海)教务处|规章制度',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/gzzd',
      },
      {
        title: '(威海)教务处|专业建设',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/zyjs',
      },
      {
        title: '(威海)教务处|实践教学',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/sjjx',
      },
      {
        title: '(威海)教务处|支部风采',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/zbfc',
      },
      {
        title: '(威海)教务处|服务指南',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/fwzn',
      },
      {
        title: '(威海)教务处|教务要闻',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/jwyw',
      },
      {
        title: '(威海)教务处|工作通知',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/gztz',
      },
      {
        title: '(威海)教务处|教务简报',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/jwjb',
      },
      {
        title: '(威海)教务处|常用下载',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue-wei-hai',
        source: ['/*path', '/'],
        target: '/sdu/wh/jwc/cyxz',
      },
    ],
    'www.cmse': [
      {
        title: '材料科学与工程学院通知',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue',
        source: ['/*path', '/'],
        target: (params) => {
          let type;
          switch (params.path) {
            case 'zxzx/tzgg.htm':
              type = '0';
              break;
            case 'zxzx/xyxw.htm':
              type = '1';
              break;
            case 'zxzx/bksjy.htm':
              type = '2';
              break;
            case 'zxzx/yjsjy.htm':
              type = '3';
              break;
            case 'zxzx/xsdt.htm':
              type = '4';
              break;
            default:
              type = '0';
              break;
          }
          return `/sdu/cmse/${type}`;
        },
      },
    ],
    'www.cs': [
      {
        title: '计算机科学与技术学院通知',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue',
        source: ['/*path', '/'],
        target: (params) => {
          let type;
          switch (params.path) {
            case 'xygg.htm':
              type = '0';
              break;
            case 'xsbg.htm':
              type = '1';
              break;
            case 'kjjx.htm':
              type = '2';
              break;
            default:
              type = '0';
              break;
          }
          return `/sdu/cs/${type}`;
        },
      },
    ],
    'www.epe': [
      {
        title: '能源与动力工程学院通知',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue',
        source: ['/*path', '/'],
        target: (params) => {
          let type;
          switch (params.path) {
            case 'zxzx/xydt.htm':
              type = '0';
              break;
            case 'zxzx/tzgg.htm':
              type = '1';
              break;
            case 'zxzx/xslt.htm':
              type = '2';
              break;
            default:
              type = '0';
              break;
          }
          return `/sdu/epe/${type}`;
        },
      },
    ],
    'www.mech': [
      {
        title: '机械工程学院通知',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue',
        source: ['/*path', '/'],
        target: (params) => {
          let type;
          switch (params.path) {
            case 'xwdt/tzgg.htm':
              type = '0';
              break;
            case 'xwdt/ysxw.htm':
              type = '1';
              break;
            case 'xwdt/jxxx.htm':
              type = '2';
              break;
            case 'xwdt/xsdt.htm':
              type = '3';
              break;
            case 'xwdt/xyjb.htm':
              type = '4';
              break;
            default:
              type = '0';
              break;
          }
          return `/sdu/mech/${type}`;
        },
      },
    ],
    'www.sc': [
      {
        title: '软件学院通知',
        docs: 'https://docs.rsshub.app/university.html#shan-dong-da-xue',
        source: ['/*path', '/'],
        target: (params) => {
          let type;
          switch (params.path) {
            case 'tzgg.htm':
              type = '0';
              break;
            case 'kxyj/xsyg.htm':
              type = '1';
              break;
            case 'rcpy/bkjy.htm':
              type = '2';
              break;
            case 'rcpy/yjsjy.htm':
              type = '3';
              break;
            default:
              type = '0';
              break;
          }
          return `/sdu/sc/${type}`;
        },
      },
    ],
  },
  'secrss.com': {
    _name: '安全内参',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/programming.html#an-quan-nei-can',
        source: ['/articles', '/'],
        target: (_, url) =>
          `/secrss/category${
            new URL(url).searchParams.has('tag')
              ? `/${new URL(url).searchParams.get('tag')}`
              : ''
          }`,
      },
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/programming.html#an-quan-nei-can',
        source: ['/articles', '/'],
        target: (_, url) =>
          `/secrss/author${new URL(url).searchParams.get('author')}`,
      },
    ],
  },
  'seekingalpha.com': {
    _name: 'Seeking Alpha',
    '.': [
      {
        title: 'Summary',
        docs: 'https://docs.rsshub.app/en/finance.html#seeking-alpha',
        source: [
          '/symbol/:symbol/:category',
          '/symbol/:symbol/earnings/:category',
        ],
        target: '/seekingalpha/:symbol/:category',
      },
    ],
  },
  'segmentfault.com': {
    _name: 'SegmentFault',
    '.': [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/programming.html#segmentfault',
        source: ['/channel/:name'],
        target: '/segmentfault/channel/:name',
      },
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/programming.html#segmentfault',
        source: ['/u/:name'],
        target: '/segmentfault/user/:name',
      },
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/programming.html#segmentfault',
        source: ['/t/:tag/blogs'],
        target: '/segmentfault/blogs/:tag',
      },
    ],
  },
  'sehuatang.net': {
    _name: '色花堂',
    '.': [
      {
        title: '分区帖子',
        docs: 'https://docs.rsshub.app/multimedia.html#se-hua-tang-fen-qu-tie-zi',
        source: ['/:category', '/'],
        target: (params, url) => {
          const theUrl = new URL(url);
          const matches = theUrl.href.match(/forum-(\d)+-\d+/);
          const fid =
            theUrl.searchParams.get('fid') || (matches ? matches[1] : '');
          const tid = theUrl.searchParams.get('typeid');
          return `/sehuatang${fid ? `/${fid}` : ''}${tid ? `/${tid}` : ''}`;
        },
      },
    ],
  },
  'sensortower.com': {
    _name: 'Sensor Tower',
    '.': [
      {
        title: 'Blog',
        docs: 'https://docs.rsshub.app/new-media.html#sensor-tower-blog',
        source: ['/blog', '/zh-CN/blog', '/ja/blog', '/ko/blog', '/'],
        target: '/sensortower/blog',
      },
    ],
  },
  'shiep.edu.cn': {
    _name: '上海电力大学',
    dqxy: [
      {
        title: '电气工程学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/dqxy/:id',
      },
    ],
    dxxy: [
      {
        title: '电子信息工程学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/dxxy/:id',
      },
    ],
    energy: [
      {
        title: '能源与机械工程学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/energy/:id',
      },
    ],
    fao: [
      {
        title: '国际交流与合作处（港澳台办公室）',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/fao/:id',
      },
    ],
    gjjlxy: [
      {
        title: '国际交流学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/gjjlxy/:id',
      },
    ],
    hhxy: [
      {
        title: '环境与化学工程学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/hhxy/:id',
      },
    ],
    jgxy: [
      {
        title: '经济与管理学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/jgxy/:id',
      },
    ],
    jjxy: [
      {
        title: '继续教育学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/jjxy/:id',
      },
    ],
    jsjxy: [
      {
        title: '计算机科学与技术学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/jsjxy/:id',
      },
    ],
    jwc: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/jwc/:id',
      },
    ],
    kyc: [
      {
        title: '科研处',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/kyc/:id',
      },
    ],
    news: [
      {
        title: '新闻网',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/news/:id',
      },
    ],
    rsc: [
      {
        title: '党委教师工作部、人事处',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/rsc/:id',
      },
    ],
    skb: [
      {
        title: '马克思主义学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/skb/:id',
      },
    ],
    slxy: [
      {
        title: '数理学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/slxy/:id',
      },
    ],
    tyb: [
      {
        title: '体育学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/tyb/:id',
      },
    ],
    wgyxy: [
      {
        title: '外国语学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/wgyxy/:id',
      },
    ],
    xxgk: [
      {
        title: '信息公开网',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/xxgk/:id',
      },
    ],
    yjsc: [
      {
        title: '研究生院/研工部',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/yjsc/:id',
      },
    ],
    yjzx: [
      {
        title: '人文艺术学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/yjzx/:id',
      },
    ],
    zdhxy: [
      {
        title: '自动化工程学院',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/zdhxy/:id',
      },
    ],
    zs: [
      {
        title: '本科招生网',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:id/list.htm'],
        target: '/shiep/zs/:id',
      },
    ],
  },
  'shmeea.edu.cn': {
    _name: '上海市教育考试院',
    www: [
      {
        title: '消息速递',
        docs: 'https://docs.rsshub.app/other.html#shang-hai-shi-jiao-yu-kao-shi-yuan',
        source: ['/'],
        target: '/shmeea',
      },
      {
        title: '自学考试通知公告',
        docs: 'https://docs.rsshub.app/other.html#shang-hai-shi-jiao-yu-kao-shi-yuan',
        source: ['/page/04000/index.html', '/'],
        target: '/shmeea/self-study',
      },
    ],
  },
  'shmtu.edu.cn': {
    _name: '上海海事大学',
    jwc: [
      {
        title: '教务信息',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:type'],
        target: '/shmtu/jwc/:type',
      },
    ],
    portal: [
      {
        title: '数字平台',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:type'],
        target: '/shmtu/portal/:type',
      },
    ],
    www: [
      {
        title: '官网信息',
        docs: 'https://docs.rsshub.app/university.html#shang-hai-dian-li-da-xue',
        source: ['/:type'],
        target: '/shmtu/www/:type',
      },
    ],
  },
  'shopback.com.tw': {
    _name: 'ShopBack',
    '.': [
      {
        title: 'Store',
        docs: 'https://docs.rsshub.app/shopping.html#shopback-store',
        source: ['/:category', '/'],
        target: '/shopback/:store',
      },
    ],
  },
  'shoppingdesign.com.tw': {
    _name: 'Shopping Design',
    www: [
      {
        title: '文章列表',
        docs: 'https://docs.rsshub.app/design.html#shopping-design',
        source: '/post',
        target: '/shoppingdesign/posts',
      },
    ],
  },
  'shuiguopai.com': {
    _name: '水果派',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#shui-guo-pai-shou-ye',
        source: ['/'],
        target: '/shuiguopai',
      },
    ],
  },
  'sicau.edu.cn': {
    _name: '',
    dky: [
      {
        title: '招生就业',
        docs: 'https://docs.rsshub.app/university.html#si-chuan-nong-ye-da-xue-zhao-sheng-jiu-ye',
        source: ['/'],
        target: '/sicau/zsjy/:category?',
      },
      {
        title: '动物科技学院',
        docs: 'https://docs.rsshub.app/university.html#si-chuan-nong-ye-da-xue',
        source: ['/'],
        target: '/sicau/dky/:category?',
      },
    ],
    yan: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#si-chuan-nong-ye-da-xue',
        source: ['/'],
        target: '/sicau/yan/:category?',
      },
    ],
  },
  'sigsac.org': {
    _name: 'ACM Special Interest Group on Security Audit and Control',
    '.': [
      {
        title: 'ACM Conference on Computer and Communications Security',
        docs: 'https://docs.rsshub.app/journal.html#acm-special-interest-group-on-security-audit-and-control',
        source: ['/ccs.html', '/'],
        target: '/sigsac/ccs',
      },
    ],
  },
  'blog.simpleinfo.cc': {
    _name: '簡訊設計',
    '.': [
      {
        title: '志祺七七',
        docs: 'https://docs.rsshub.app/new-media.html#jian-xun-she-ji',
        source: '/shasha77',
        target: (_, url) =>
          `/simpleinfo/${new URL(url).searchParams.get('category')}`,
      },
      {
        title: '夥伴聊聊 / 專案作品',
        docs: 'https://docs.rsshub.app/new-media.html#jian-xun-she-ji',
        source: '/blog/:category',
        target: '/simpleinfo/:category',
      },
    ],
  },
  'sinchew.com.my': {
    _name: '星洲网',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/traditional-media.html#xing-zhou-wang-shou-ye',
        source: ['/'],
        target: '/sinchew',
      },
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/traditional-media.html#xing-zhou-wang-zui-xin',
        source: ['/latest', '/'],
        target: '/sinchew/latest',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/traditional-media.html#xing-zhou-wang-fen-lei',
        source: ['/category/:category', '/'],
        target: (params, url) =>
          `/sinchew/category/${
            new URL(url).toString().match(/\/category\/(.*)$/)[1]
          }`,
      },
    ],
  },
  'sis001.com': {
    _name: '第一会所',
    '.': [
      {
        title: '子版块',
        docs: 'https://docs.rsshub.app/bbs.html#di-yi-hui-suo',
        source: ['/forum/:id'],
        target: (params) =>
          `/sis001/forum/${params.id
            .replace('forum-', '')
            .replace('-1.html', '')}`,
      },
    ],
  },
  'skysports.com': {
    _name: 'Sky Sports',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/new-media.html#sky-sports-news',
        source: ['/'],
        target: (params, url) =>
          `/skysports/news/${new URL(url).toString().match(/\/(.*)-news$/)[1]}`,
      },
    ],
  },
  'slowmist.com': {
    _name: '慢雾科技 SLOWMIST',
    '.': [
      {
        title: '动态',
        docs: 'https://docs.rsshub.app/new-media.html#man-wu-ke-ji',
        source: ['/zh/news.html'],
        target: '/slowmist/:type?',
      },
    ],
  },
  'smzdm.com': {
    _name: '什么值得买',
    post: [
      {
        title: '好文',
        docs: 'https://docs.rsshub.app/shopping.html#shen-me-zhi-de-mai',
        source: '/:day',
        target: (params) => `/smzdm/haowen/${params.day.replace('hot_', '')}`,
      },
      {
        title: '好文分类',
        docs: 'https://docs.rsshub.app/shopping.html#shen-me-zhi-de-mai',
        source: ['/fenlei/:name'],
        target: '/smzdm/haowen/fenlei/:name',
      },
    ],
    search: [
      {
        title: '关键词',
        docs: 'https://docs.rsshub.app/shopping.html#shen-me-zhi-de-mai',
        source: '/',
        target: (_, url) =>
          `/smzdm/keyword/${new URL(url).searchParams.get('s')}`,
      },
    ],
    www: [
      {
        title: '排行榜',
        docs: 'https://docs.rsshub.app/shopping.html#shen-me-zhi-de-mai',
        source: '/top',
      },
    ],
    zhiyou: [
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/shopping.html#shen-me-zhi-de-mai',
        source: '/member/:uid/article',
        target: '/smzdm/article/:uid',
      },
      {
        title: '用户爆料',
        docs: 'https://docs.rsshub.app/shopping.html#shen-me-zhi-de-mai',
        source: '/member/:uid/baoliao',
        target: '/smzdm/baoliao/:uid',
      },
    ],
  },
  'sobooks.net': {
    _name: 'SoBooks',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/reading.html#sobooks',
        source: ['/:category'],
        target: '/sobooks/:category',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/reading.html#sobooks',
        source: ['/books/tag/:tag'],
        target: '/sobooks/tag/:tag',
      },
      {
        title: '归档',
        docs: 'https://docs.rsshub.app/reading.html#sobooks',
        source: ['/books/date/*date'],
        target: (params) => `/sobooks/date/${params.date.repalce('/', '-')}`,
      },
    ],
  },
  'sohu.com': {
    _name: '搜狐',
    '.': [
      {
        title: '搜狐号',
        docs: 'https://docs.rsshub.app/new-media.html#sou-hu-hao',
        source: ['/a/:id'],
        target: (params) => `/sohu/mp/${params.id.split('_')[1]}`,
      },
    ],
  },
  'solidot.org': {
    _name: 'Solidot',
    www: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/www',
      },
    ],
    linux: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/linux',
      },
    ],
    science: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/science',
      },
    ],
    technology: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/technology',
      },
    ],
    mobile: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/mobile',
      },
    ],
    apple: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/apple',
      },
    ],
    hardware: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/hardware',
      },
    ],
    software: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/software',
      },
    ],
    security: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/security',
      },
    ],
    games: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/games',
      },
    ],
    books: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/books',
      },
    ],
    idle: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/idle',
      },
    ],
    cloud: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/cloud',
      },
    ],
    story: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/traditional-media.html#solidot',
        source: ['/'],
        target: '/solidot/story',
      },
    ],
  },
  'soundofhope.org': {
    _name: '希望之声',
    '.': [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/traditional-media.html#xi-wang-zhi-sheng',
        source: ['/:channel/:id'],
        target: '/soundofhope/:channel/:id',
      },
    ],
  },
  'spotify.com': {
    _name: 'Spotify',
    open: [
      {
        title: '播放列表',
        docs: 'https://docs.rsshub.app/multimedia.html#spotify',
        source: ['/playlist/:id'],
        target: '/spotify/playlist/:id',
      },
      {
        title: '歌手专辑',
        docs: 'https://docs.rsshub.app/multimedia.html#spotify',
        source: ['/artist/:id'],
        target: '/spotify/artist/:id',
      },
      {
        title: '用户 Saved Tracks',
        docs: 'https://docs.rsshub.app/multimedia.html#spotify',
        source: ['/collection/tracks'],
        target: '/spotify/saved',
      },
      {
        title: '用户 Top Tracks',
        docs: 'https://docs.rsshub.app/multimedia.html#spotify',
        source: ['/'],
        target: '/spotify/top/tracks',
      },
      {
        title: '用户 Top Artists',
        docs: 'https://docs.rsshub.app/multimedia.html#spotify',
        source: ['/'],
        target: '/spotify/top/artists',
      },
    ],
  },
  'springer.com': {
    _name: 'Springer',
    www: [
      {
        title: 'latest',
        docs: 'https://docs.rsshub.app/journal.html#Springer',
        source: '/journal/:journal/*',
        target: '/springer/journal/:journal',
      },
    ],
  },
  'sputniknews.cn': {
    _name: '俄罗斯卫星通讯社',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/traditional-media.html#e-luo-si-wei-xing-tong-xun-she-fen-lei',
        source: ['/:category', '/'],
        target: '/sputniknews/:category/:language',
      },
    ],
  },
  'sse.com.cn': {
    _name: '上海证券交易所',
    bond: [
      {
        title: '可转换公司债券公告',
        docs: 'https://docs.rsshub.app/finance.html#shang-hai-zheng-quan-jiao-yi-suo',
        source: ['/disclosure/announ/convertible', '/'],
      },
    ],
    kcb: [
      {
        title: '科创板项目动态',
        docs: 'https://docs.rsshub.app/finance.html#shang-hai-zheng-quan-jiao-yi-suo',
        source: ['/home', '/'],
        target: '/sse/renewal',
      },
    ],
    www: [
      {
        title: '监管问询',
        docs: 'https://docs.rsshub.app/finance.html#shang-hai-zheng-quan-jiao-yi-suo',
        source: ['/disclosure/credibility/supervision/inquiries', '/'],
        target: '/sse/inquire',
      },
      {
        title: '上市公司信息最新公告披露',
        docs: 'https://docs.rsshub.app/finance.html#shang-hai-zheng-quan-jiao-yi-suo',
        source: ['/assortment/stock/list/info/announcement/index.shtml', '/'],
      },
      {
        title: '本所业务指南与流程',
        docs: 'https://docs.rsshub.app/finance.html#shang-hai-zheng-quan-jiao-yi-suo',
        source: ['/lawandrules/guide/*slug', '/'],
        target: (params) =>
          `/sse/lawandrules/${params.slug.replace(/\//g, '-')}`,
      },
    ],
  },
  'ssm.gov.mo': {
    _name: '澳门卫生局',
    www: [
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/government.html#ao-men-wei-sheng-ju-zui-xin-xiao-xi',
        source: ['/', '/portal'],
        target: '/ssm/news',
      },
    ],
  },
  'sspai.com': {
    _name: '少数派',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/index',
        target: '/sspai/index',
      },
      {
        title: '最新上架付费专栏',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/series',
        target: '/sspai/series',
      },
      {
        title: '付费专栏文章更新',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: ['/series/:id', '/series/:id/list', '/series/:id/metadata'],
        target: '/sspai/series/:id',
      },
      {
        title: 'Matrix',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/matrix',
        target: '/sspai/matrix',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/column/:id',
        target: '/sspai/column/:id',
      },
      {
        title: '作者动态',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/u/:id/updates',
        target: '/sspai/activity/:id',
      },
      {
        title: '作者已发布文章',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/u/:id/posts',
        target: '/sspai/author/:id',
      },
      {
        title: '用户收藏',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: ['/u/:slug/bookmark_posts'],
        target: '/sspai/bookmarks/:slug',
      },
      {
        title: '专题',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/topics',
        target: '/sspai/topics',
      },
      {
        title: '专题内文章更新',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/topic/:id',
        target: '/sspai/topic/:id',
      },
      {
        title: '标签订阅',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: '/tag/:keyword',
        target: '/sspai/tag/:keyword',
      },
    ],
    shortcuts: [
      {
        title: 'Shortcuts Gallery',
        docs: 'https://docs.rsshub.app/new-media.html#shao-shu-pai-sspai',
        source: ['', '/*tpath'],
        target: '/sspai/shortcuts',
      },
    ],
  },
  'startuplatte.com': {
    _name: '創新拿鐵',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#chuang-xin-na-tie-fen-lei',
        source: ['/category/:category', '/'],
        target: '/startuplatte/:category?',
      },
    ],
  },
  'stcn.com': {
    _name: '证券时报网',
    '.': [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/finance.html#zheng-quan-shi-bao-wang-lan-mu',
        source: ['/'],
        target: (params, url) =>
          `/stcn/${
            new URL(url).toString().match(/article\/list\/(.*)\.html/)[1]
          }`,
      },
    ],
  },
  'stheadline.com': {
    _name: '星島日報',
    std: [
      {
        title: '即時',
        docs: 'https://docs.rsshub.app/traditional-media.html#xing-dao-ri-bao',
        source: ['/realtime/*category'],
        target: (params) => `/stdheadline/std/realtime/${params.category}`,
      },
    ],
  },
  'storm.mg': {
    _name: '風傳媒',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#feng-chuan-mei',
        source: ['/:category/:id'],
        target: '/storm/:category?/:id?',
      },
    ],
  },
  'studygolang.com': {
    _name: 'Go 语言中文网',
    '.': [
      {
        title: '招聘',
        docs: 'https://docs.rsshub.app/programming.html#go-yu-yan-zhong-wen-wang',
        source: ['/'],
        target: '/studygolang/jobs',
      },
    ],
  },
  'subhd.tv': {
    _name: 'Sub HD',
    '.': [
      {
        title: '字幕',
        docs: 'https://docs.rsshub.app/multimedia.html#subhd-zi-mu',
        source: ['/sub/:category', '/'],
        target: '/subhd/sub/:category?',
      },
      {
        title: '字幕组',
        docs: 'https://docs.rsshub.app/multimedia.html#subhd-zi-mu-zu',
        source: ['/zu/:category', '/'],
        target: '/subhd/zu/:category?',
      },
    ],
  },
  'supchina.com': {
    _name: 'SupChina',
    '.': [
      {
        title: 'Feed',
        docs: 'https://docs.rsshub.app/new-media.html#supchina-feed',
        source: ['/feed', '/'],
        target: '/supchina',
      },
      {
        title: 'Podcasts',
        docs: 'https://docs.rsshub.app/new-media.html#supchina-podcasts',
        source: ['/podcasts', '/'],
        target: '/supchina/podcasts',
      },
    ],
  },
  'swissinfo.ch': {
    _name: 'swissinfo',
    '.': [
      {
        title: 'Category',
        docs: 'https://docs.rsshub.app/new-media.html#swissinfo-category',
        source: ['/:language/:category', '/'],
        target: '/swissinfo/:language?/:category?',
      },
    ],
  },
  'swjtu.edu.cn': {
    _name: '西南交通大学',
    ctt: [
      {
        title: '交通运输与物流学院 - 研究生通知',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-jiao-tong-da-xue',
        source: ['/yethan/WebIndexAction', '/'],
        target: (_, url) =>
          new URL(url).searchParams.get('setAction') === 'newsList' &&
          new URL(url).searchParams.get('bigTypeId') === '0E4BF4D36E232918'
            ? '/swjtu/jtys/yjs'
            : null,
      },
    ],
    jiuye: [
      {
        title: '就业招聘信息',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-jiao-tong-da-xue',
        source: ['/career', '/'],
        target: '/swjtu/jyzpxx',
      },
    ],
  },
  'swpu.edu.cn': {
    _name: '西南石油大学',
    '.': [
      {
        title: '办公网',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-shi-you-da-xue',
        source: ['/'],
        target: '',
      },
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-shi-you-da-xue',
        source: ['/'],
        target: '',
      },
      {
        title: '计算机科学学院',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-shi-you-da-xue',
        source: ['/'],
        target: '',
      },
      {
        title: '电气信息学院',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-shi-you-da-xue',
        source: ['/'],
        target: '',
      },
      {
        title: '信息学院',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-shi-you-da-xue',
        source: ['/'],
        target: '',
      },
      {
        title: '财经学院',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-shi-you-da-xue',
        source: ['/'],
        target: '',
      },
    ],
  },
  'syosetu.com': {
    _name: 'syosetu',
    ncode: [
      {
        title: '章节更新',
        docs: 'https://docs.rsshub.app/reading.html#syosetu-zhang-jie-geng-xin',
        source: ['/:id'],
        target: '/syosetu/chapter/:id',
      },
    ],
    novel18: [
      {
        title: '章节更新',
        docs: 'https://docs.rsshub.app/reading.html#syosetu-zhang-jie-geng-xin',
        source: ['/:id'],
        target: '/syosetu/chapter/:id',
      },
    ],
  },
  'sysu.edu.cn': {
    _name: '中山大学',
    cse: [
      {
        title: '计算机学院（软件学院）',
        docs: 'https://docs.rsshub.app/universities.html#zhong-shan-da-xue-ji-suan-ji-xue-yuan',
        source: ['/'],
        target: '/sysu/cse',
      },
    ],
  },
  'szse.cn': {
    _name: '深圳证券交易所',
    '.': [
      {
        title: '上市公告 - 可转换债券',
        docs: 'https://docs.rsshub.app/finance.html#shen-zhen-zheng-quan-jiao-yi-suo-shang-shi-gong-gao-ke-zhu-huan-zheng-zhi-quan',
        source: ['/disclosure/notice/company/index.html', '/'],
        target: '/szse/notice',
      },
      {
        title: '问询函件',
        docs: 'https://docs.rsshub.app/finance.html#shen-zhen-zheng-quan-jiao-yi-suo-wen-xun-huan-jian',
        source: ['/disclosure/supervision/inquire/index.html', '/'],
        target: '/szse/inquire',
      },
      {
        title: '最新规则',
        docs: 'https://docs.rsshub.app/finance.html#shen-zhen-zheng-quan-jiao-yi-suo-zui-xin-gui-ze',
        source: ['/lawrules/rule/new', '/'],
        target: '/szse/rule',
      },
    ],
    listing: [
      {
        title: '创业板项目动态',
        docs: 'https://docs.rsshub.app/finance.html#shen-zhen-zheng-quan-jiao-yi-suo-chuang-ye-ban-xiang-mu-dong-tai',
        source: [
          '/projectdynamic/1/index.html',
          '/projectdynamic/2/index.html',
          '/projectdynamic/3/index.html',
          '/',
        ],
        target: '/szse/projectdynamic/:type?/:stage?/:status?',
      },
    ],
  },
  'taiwannews.com.tw': {
    _name: '台灣英文新聞',
    '.': [
      {
        title: '最新熱門消息',
        docs: 'httsp://docs.rsshub.app/traditional-media.html#tai-wan-ying-wen-xin-wen',
        source: '/:lang/index',
        target: '/taiwannews/hot/:lang',
      },
    ],
  },
  'taobao.com': {
    _name: '淘宝',
    izhongchou: [
      {
        title: '淘宝众筹全部',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (new URLSearchParams(new URL(url).search).get('type') === '') {
            return '/taobao/zhongchou/all';
          }
        },
      },
      {
        title: '淘宝众筹科技',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') === '121288001'
          ) {
            return '/taobao/zhongchou/tech';
          }
        },
      },
      {
        title: '淘宝众筹食品',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') ===
            '123330001,125672021'
          ) {
            return '/taobao/zhongchou/agriculture';
          }
        },
      },
      {
        title: '淘宝众筹动漫',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') === '122018001'
          ) {
            return '/taobao/zhongchou/acg';
          }
        },
      },
      {
        title: '淘宝众筹设计',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') ===
            '121292001,126176002,126202001'
          ) {
            return '/taobao/zhongchou/design';
          }
        },
      },
      {
        title: '淘宝众筹公益',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') === '121280001'
          ) {
            return '/taobao/zhongchou/love';
          }
        },
      },
      {
        title: '淘宝众筹娱乐',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') === '121284001'
          ) {
            return '/taobao/zhongchou/tele';
          }
        },
      },
      {
        title: '淘宝众筹影音',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') === '121278001'
          ) {
            return '/taobao/zhongchou/music';
          }
        },
      },
      {
        title: '淘宝众筹书籍',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') === '121274002'
          ) {
            return '/taobao/zhongchou/book';
          }
        },
      },
      {
        title: '淘宝众筹游戏',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') === '122020001'
          ) {
            return '/taobao/zhongchou/game';
          }
        },
      },
      {
        title: '淘宝众筹其他',
        docs: 'https://docs.rsshub.app/shopping.html#tao-bao-zhong-chou-zhong-chou-xiang-mu',
        source: ['/list.htm'],
        target: (params, url) => {
          if (
            new URLSearchParams(new URL(url).search).get('type') ===
            '125706031,125888001,125886001,123332001'
          ) {
            return '/taobao/zhongchou/other';
          }
        },
      },
    ],
  },
  'taoguba.com.cn': {
    _name: '淘股吧',
    '.': [
      {
        title: '淘股论坛',
        docs: 'https://docs.rsshub.app/finance.html#tao-gu-ba-tao-gu-lun-tan',
        source: ['/:category', '/'],
        target: '/taoguba/:category',
      },
      {
        title: '用户博客',
        docs: 'https://docs.rsshub.app/finance.html#tao-gu-ba-yong-hu-bo-ke',
        source: ['/blog/:id', '/'],
        target: '/taoguba/blog/:id',
      },
    ],
  },
  'taptap.com': {
    _name: 'TapTap',
    '.': [
      {
        title: '游戏论坛',
        docs: 'https://docs.rsshub.app/game.html#taptap',
        source: ['/app/:id/topic', '/app/:id'],
        target: '/taptap/topic/:id',
      },
      {
        title: '游戏更新',
        docs: 'https://docs.rsshub.app/game.html#taptap',
        source: ['/app/:id'],
        target: '/taptap/changelog/:id',
      },
      {
        title: '游戏评价',
        docs: 'https://docs.rsshub.app/game.html#taptap',
        source: ['/app/:id/review', '/app/:id'],
        target: '/taptap/review/:id',
      },
    ],
  },
  'taptap.io': {
    _name: 'TapTap International',
    '.': [
      {
        title: 'Changelog',
        docs: 'https://docs.rsshub.app/game.html#taptap',
        source: ['/app/:id'],
        target: '/taptap/intl/changelog/:id',
      },
      {
        title: 'Ratings & Reviews',
        docs: 'https://docs.rsshub.app/game.html#taptap',
        source: ['/app/:id/review', '/app/:id'],
        target: '/taptap/intl/review/:id',
      },
    ],
  },
  'techflowpost.com': {
    _name: '深潮TechFlow',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#shen-chao-techflow-shou-ye',
        source: ['/'],
        target: '/techflowpost',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#shen-chao-techflow-kuai-xun',
        source: ['/express'],
        target: '/techflowpost/express',
      },
    ],
  },
  't.me': {
    _name: 'Telegram',
    '.': [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/social-media.html#telegram',
        source: '/:username',
        target: (params, url, document) => {
          const isChannel =
            document && document.querySelector('.tgme_action_button_label');
          if (isChannel) {
            return '/telegram/channel/:username';
          }
        },
      },
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/social-media.html#telegram',
        source: '/s/:username',
        target: '/telegram/channel/:username',
      },
    ],
  },
  'telegram.org': {
    _name: 'Telegram',
    '.': [
      {
        title: 'Telegram Blog',
        docs: 'https://docs.rsshub.app/social-media.html#telegram-telegram-blog',
        source: '/blog',
        target: '/telegram/blog',
      },
    ],
  },
  'tencent.com': {
    _name: '腾讯云',
    '.': [
      {
        title: '云+社区专栏',
        docs: 'https://docs.rsshub.app/programming.html#teng-xun-yun-yun-she-qu-zhuan-lan',
        source: ['/developer/column/:id', '/developer/column/:id/:tag', '/'],
        target: (params, url) =>
          `/tencent/cloud/column/${url.match(/column\/(\d+)/)[1]}${
            /\/tag-\d+/.test(url) ? `/${url.match(/\/tag-(\d+)/)[1]}` : ''
          }`,
      },
    ],
  },
  'tesla.cn': {
    _name: '特斯拉中国',
    '.': [
      {
        title: '价格',
        docs: 'https://docs.rsshub.app/shopping.html#te-si-la-zhong-guo',
        source: ['/model3/design', '/'],
        target: '/tesla/price',
      },
    ],
  },
  'thecatcity.com': {
    _name: '貓奴日常',
    '.': [
      {
        title: '貓物分享｜流行小物、貓咪用品',
        docs: 'https://docs.rsshub.app/new-media.html#mao-nu-ri-chang',
        source: ['/category/cute-item', '/'],
        target: '/thecatcity/1',
      },
      {
        title: '貓咪新聞｜貓界人氣熱話、貓電影',
        docs: 'https://docs.rsshub.app/new-media.html#mao-nu-ri-chang',
        source: ['/category/funny-news', '/'],
        target: '/thecatcity/2',
      },
      {
        title: '養貓大全｜貓咪飲食與醫療、行為心理、貓測驗與冷知識',
        docs: 'https://docs.rsshub.app/new-media.html#mao-nu-ri-chang',
        source: ['/category/knowledge', '/'],
        target: '/thecatcity/3',
      },
      {
        title: '貓奴景點｜貓咪咖啡廳與餐廳、貓奴旅行景點推薦',
        docs: 'https://docs.rsshub.app/new-media.html#mao-nu-ri-chang',
        source: ['/category/hot-spot', '/'],
        target: '/thecatcity/4',
      },
      {
        title: '新手養貓教學｜養貓準備與花費、日常照顧',
        docs: 'https://docs.rsshub.app/new-media.html#mao-nu-ri-chang',
        source: ['/category/raise-cats', '/'],
        target: '/thecatcity/5',
      },
      {
        title: 'CatCity 貓奴日常 | 貓咪日常照顧、新手準備、貓用品、貓咪醫療',
        docs: 'https://docs.rsshub.app/new-media.html#mao-nu-ri-chang',
        source: ['/'],
        target: '/thecatcity',
      },
    ],
  },
  'thecover.cn': {
    _name: '封面新闻',
    '.': [
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/new-media.html#the-cover',
        source: ['/:id', '/'],
        target: (params) =>
          `/thecover/channel/${params.id.replace('channel_', '')}`,
      },
    ],
  },
  'theinitium.com': {
    _name: '端传媒',
    '.': [
      {
        title: '专题・栏目',
        docs: 'https://docs.rsshub.app/new-media.html#duan-chuan-mei',
        source: '/channel/:type',
        target: '/theinitium/channel/:type',
      },
      {
        title: '话题・标签',
        docs: 'https://docs.rsshub.app/new-media.html#duan-chuan-mei',
        source: '/tags/:type',
        target: '/theinitions/tags/:type',
      },
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/new-media.html#duan-chuan-mei',
        source: '/author/:type',
        target: '/theinitium/author/:type',
      },
    ],
  },
  'thenewslens.com': {
    _name: 'The News Lens 關鍵評論',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/latest-article/:sort?', '/'],
        target: '/thenewslens/latest-article/:sort?',
      },
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/news/:sort?', '/'],
        target: '/thenewslens/news/:sort?',
      },
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/author/:id/:sort?', '/'],
        target: '/thenewslens/author/:id/:sort?',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/category/:id/:sort?', '/'],
        target: '/thenewslens/category/:id/:sort?',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/tag/:id/:sort?', '/'],
        target: '/thenewslens/tag/:id/:sort?',
      },
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/channel/:id/:sort?', '/'],
        target: '/thenewslens/channel/:id/:sort?',
      },
      {
        title: '评论',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/review/:sort?', '/'],
        target: '/thenewslens/review/:sort?',
      },
      {
        title: '影音',
        docs: 'https://docs.rsshub.app/new-media.html#the-news-lens-guan-jian-ping-lun',
        source: ['/videos/Projects/:sort?', '/'],
        target: '/thenewslens/videos/Projects/:sort?',
      },
    ],
  },
  'thepaper.cn': {
    _name: '澎湃新闻',
    '.': [
      {
        title: '首页头条',
        docs: 'https://docs.rsshub.app/traditional-media.html#peng-pai-xin-wen-shou-ye-tou-tiao',
        source: ['/'],
        target: '/thepaper/featured',
      },
      {
        title: '侧边栏',
        docs: 'https://docs.rsshub.app/traditional-media.html#peng-pai-xin-wen-ce-bian-lan',
        source: ['/'],
        target: '/thepaper/sidebar',
      },
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/traditional-media.html#peng-pai-xin-wen-pin-dao',
        source: ['/'],
        target: (params, url) =>
          `/thepaper/channel/${new URL(url).search(/channel_(\d+)/)}`,
      },
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/traditional-media.html#peng-pai-xin-wen-lie-biao',
        source: ['/'],
        target: (params, url) =>
          `/thepaper/list/${new URL(url).search(/list_(\d+)/)}`,
      },
      {
        title: '澎湃美数组作品集',
        docs: 'https://docs.rsshub.app/traditional-media.html#peng-pai-xin-wen-peng-pai-mei-shu-zuo-pin-ji',
        source: ['/'],
        target: '/thepaper/839studio/:id',
      },
    ],
  },
  'factpaper.cn': {
    _name: '澎湃新闻',
    '.': [
      {
        title: '明查',
        docs: 'https://docs.rsshub.app/traditional-media.html#peng-pai-xin-wen-ming-cha',
        source: ['/'],
        target: '/thepaper/factpaper/:status',
      },
    ],
  },
  'theverge.com': {
    _name: 'The Verge',
    '.': [
      {
        title: 'The Verge',
        docs: 'https://docs.rsshub.app/new-media.html#the-verge',
        source: ['/:hub', '/'],
        target: '/theverge/:hub?',
      },
    ],
  },
  'thwiki.cc': {
    _name: 'THBWiki',
    '.': [
      {
        title: '日历',
        docs: 'https://docs.rsshub.app/#thbwiki',
        source: ['/', '/日程表'],
        target: '/thwiki/calendar',
      },
    ],
  },
  'tiktok.com': {
    _name: 'TikTok',
    '.': [
      {
        title: 'User',
        docs: 'https://docs.rsshub.app/en/social-media.html#tiktok',
        source: ['/:user'],
        target: '/tiktok/user/:user',
      },
    ],
  },
  'timednews.com': {
    _name: '时刻新闻',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/new-media.html#shi-ke-xin-wen',
        source: ['/topic/:type/:id'],
        target: ({ type, id }) => {
          let name = '';
          if (type === 'cat') {
            if (id === '1') {
              name = 'all';
            }
          } else if (type === 'subcat') {
            switch (id) {
              case '1':
                name = 'currentAffairs';
                break;
              case '2':
                name = 'finance';
                break;
              case '3':
                name = 'technology';
                break;
              case '4':
                name = 'social';
                break;
              case '5':
                name = 'sports';
                break;
              case '6':
                name = 'international';
                break;
              case '7':
                name = 'usa';
                break;
              case '8':
                name = 'cn';
                break;
              case '9':
                name = 'europe';
                break;
              case '14':
                name = 'comments';
                break;
              default:
                break;
            }
          }

          return `/timednews/news/${name}`;
        },
      },
    ],
  },
  'dl.gov.cn': {
    _name: '停水通知',
    swj: [
      {
        title: '大连市',
        docs: 'https://docs.rsshub.app/forecast.html#ting-shui-tong-zhi',
        source: ['/col/col4296/index.html', '/'],
        target: '/tingshuitz/dalian',
      },
    ],
  },
  'hzwgc.com': {
    _name: '停水通知',
    www: [
      {
        title: '杭州市',
        docs: 'https://docs.rsshub.app/forecast.html#ting-shui-tong-zhi',
        source: ['/public/stop_the_water', '/'],
        target: '/tingshuitz/hangzhou',
      },
    ],
  },
  'jlwater.com': {
    _name: '停水通知',
    '.': [
      {
        title: '南京市',
        docs: 'https://docs.rsshub.app/forecast.html#ting-shui-tong-zhi',
        source: ['/portal/10000013', '/'],
        target: '/tingshuitz/nanjing',
      },
    ],
  },
  'supplywater.com': {
    _name: '停水通知',
    www: [
      {
        title: '长沙市',
        docs: 'https://docs.rsshub.app/forecast.html#ting-shui-tong-zhi',
        source: ['/*'],
      },
    ],
  },
  'whwater.com': {
    _name: '停水通知',
    '.': [
      {
        title: '武汉市',
        docs: 'https://docs.rsshub.app/forecast.html#ting-shui-tong-zhi',
        source: ['/IWater.shtml', '/'],
        target: '/tingshuitz/wuhan',
      },
    ],
  },
  'xswater.com': {
    _name: '停水通知',
    www: [
      {
        title: '萧山区',
        docs: 'https://docs.rsshub.app/forecast.html#ting-shui-tong-zhi',
        source: ['/gongshui/channels/227.html', '/'],
        target: '/tingshuitz/xiaoshan',
      },
    ],
  },
  'yjsswjt.com': {
    _name: '停水通知',
    '.': [
      {
        title: '阳江市',
        docs: 'https://docs.rsshub.app/forecast.html#ting-shui-tong-zhi',
        source: ['/zxdt_list.jsp', '/'],
        target: '/tingshuitz/yangjiang',
      },
    ],
  },
  'tisi.org': {
    _name: '腾讯研究院',
    '.': [
      {
        title: '最近更新',
        docs: 'https://docs.rsshub.app/new-media.html#teng-xun-yan-jiu-yuan',
        source: ['/'],
        target: (_params, url) => {
          if (new URL(url).searchParams.get('page_id') === '11151') {
            return '/tisi/latest';
          }
        },
      },
    ],
  },
  'tju.edu.cn': {
    _name: '天津大学',
    cic: [
      {
        title: '智能与计算学部 - 学部新闻',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-zhi-neng-yu-ji-suan-xue-bu',
        source: ['/xwzx/xyxw.htm', '/'],
        target: '/tju/cic/news',
      },
      {
        title: '智能与计算学部 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-zhi-neng-yu-ji-suan-xue-bu',
        source: ['/xwzx/tzgg.htm', '/'],
        target: '/tju/cic/notification',
      },
      {
        title: '智能与计算学部 - 北洋智算论坛',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-zhi-neng-yu-ji-suan-xue-bu',
        source: ['/byzslt.htm', '/'],
        target: '/tju/cic/forum',
      },
    ],
    news: [
      {
        title: '新闻网 - 聚焦天大',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-xin-wen-wang',
        source: ['/jjtd.htm', '/'],
        target: '/tju/news/focus',
      },
      {
        title: '新闻网 - 综合新闻',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-xin-wen-wang',
        source: ['/zhxw.htm', '/'],
        target: '/tju/news/general',
      },
      {
        title: '新闻网 - 校内新闻',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-xin-wen-wang',
        source: ['/xnxw1/qb.htm', '/'],
        target: '/tju/news/internal',
      },
      {
        title: '新闻网 - 媒体报道',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-xin-wen-wang',
        source: ['/mtbd.htm', '/'],
        target: '/tju/news/media',
      },
      {
        title: '新闻网 - 图说天大',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-xin-wen-wang',
        source: ['/tstd.htm', '/'],
        target: '/tju/news/picture',
      },
    ],
    oaa: [
      {
        title: '教务处 - 新闻动态',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-jiao-wu-chu',
        source: ['/xwdt.htm', '/'],
        target: '/tju/oaa/news',
      },
      {
        title: '教务处 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-jiao-wu-chu',
        source: ['/tzgg.htm', '/'],
        target: '/tju/oaa/notification',
      },
    ],
    yzb: [
      {
        title: '研究生招生网 - 校级公告',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-yan-jiu-sheng-zhao-sheng-wang',
        source: ['/xwzx/zxxx/', '/'],
        target: '/tju/yzb/notice',
      },
      {
        title: '研究生招生网 - 统考硕士',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-yan-jiu-sheng-zhao-sheng-wang',
        source: ['/xwzx/tkss_xw/', '/'],
        target: '/tju/yzb/master',
      },
      {
        title: '研究生招生网 - 统考博士',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-yan-jiu-sheng-zhao-sheng-wang',
        source: ['/xwzx/tkbs_xw/', '/'],
        target: '/tju/yzb/doctor',
      },
      {
        title: '研究生招生网 - 在职学位',
        docs: 'https://docs.rsshub.app/university.html#tian-jin-da-xue-yan-jiu-sheng-zhao-sheng-wang',
        source: ['/xwzx/zzxw/', '/'],
        target: '/tju/yzb/job',
      },
    ],
  },
  'tokeninsight.com': {
    _name: 'TokenInsight',
    '.': [
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/new-media.html#tokeninsight',
        source: ['/:lang/blogs'],
        target: '/tokeninsight/blog/:lang',
      },
      {
        title: '快讯',
        docs: 'https://docs.rsshub.app/new-media.html#tokeninsight',
        source: ['/:lang/latest'],
        target: '/tokeninsight/bulletin/:lang',
      },
      {
        title: '报告',
        docs: 'https://docs.rsshub.app/new-media.html#tokeninsight',
        source: ['/:lang/report'],
        target: '/tokeninsight/report/:lang',
      },
    ],
  },
  'topys.cn': {
    _name: 'TOPYS',
    '.': [
      {
        title: '关键字',
        docs: 'https://docs.rsshub.app/new-media.html#topys-guan-jian-zi',
        source: ['/search/:keyword', '/'],
        target: '/topys/:keyword?',
      },
    ],
  },
  'tradingview.com': {
    _name: 'TradingView',
    '.': [
      {
        title: 'Blog',
        docs: 'https://docs.rsshub.app/program-update.html#tradingview-blog',
        source: ['/blog/:language', '/'],
        target: '/tradingview/blog',
      },
    ],
  },
  'toutiao.com': {
    _name: '今日头条',
    so: [
      {
        title: '热搜关键词聚合追踪',
        docs: 'https://docs.rsshub.app/social-media.html#re-sou-ju-he',
        source: ['/search'],
        target: (params, url) =>
          `/trending/${new URL(url).searchParams.get('keyword')}`,
      },
    ],
  },
  'weibo.com': {
    _name: '微博',
    '.': [
      {
        title: '博主',
        docs: 'https://docs.rsshub.app/social-media.html#wei-bo',
        source: ['/u/:id', '/:id'],
        target: (params, url, document) => {
          let uid = document?.documentElement.innerHTML.match(
            /\$CONFIG\['oid']='(\d+)'/
          )?.[1];
          if (!uid && !isNaN(params.id)) {
            uid = params.id;
          }
          return uid ? `/weibo/user/${uid}` : '';
        },
      },
      {
        title: '关键词',
        docs: 'https://docs.rsshub.app/social-media.html#wei-bo',
      },
      {
        title: '超话',
        docs: 'https://docs.rsshub.app/social-media.html#wei-bo',
        source: '/p/:id/super_index',
        target: '/weibo/super_index/:id',
      },
    ],
    s: [
      {
        title: '热搜榜',
        docs: 'https://docs.rsshub.app/social-media.html#wei-bo',
        source: '/top/summary',
        target: '/weibo/search/hot',
      },
    ],
  },
  'zhihu.com': {
    _name: '知乎',
    www: [
      {
        title: '收藏夹',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/collection/:id',
        target: '/zhihu/collection/:id',
      },
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/people/:id',
        target: '/zhihu/people/activities/:id',
      },
      {
        title: '用户回答',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/people/:id/answers',
        target: '/zhihu/people/answers/:id',
      },
      {
        title: '用户想法',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/people/:id/pins',
        target: '/zhihu/people/pins/:id',
      },
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/:usertype/:id/posts',
        target: '/zhihu/posts/:usertype/:id',
      },
      {
        title: '热榜',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/hot',
        target: '/zhihu/hotlist',
      },
      {
        title: '想法热榜',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        target: '/zhihu/pin/hotlist',
      },
      {
        title: '问题',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/question/:questionId',
        target: '/zhihu/question/:questionId',
      },
      {
        title: '话题',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/topic/:topicId/:type',
        target: '/zhihu/topic/:topicId',
      },
      {
        title: '新书',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/zhihu/bookstore/newest',
        target: '/zhihu/pin/hotlist',
      },
      {
        title: '想法-24 小时新闻汇总',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/pin/special/972884951192113152',
        target: '/zhihu/pin/daily',
      },
      {
        title: '书店-周刊',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/pub/weekly',
        target: '/zhihu/weekly',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/column/:id',
        target: '/zhihu/zhuanlan/:id',
      },
    ],
    zhuanlan: [
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/:id',
        target: '/zhihu/zhuanlan/:id',
      },
    ],
    daily: [
      {
        title: '日报',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '',
        target: '/zhihu/daily',
      },
      {
        title: '日报',
        docs: 'https://docs.rsshub.app/social-media.html#zhi-hu',
        source: '/*tpath',
        target: '/zhihu/daily',
      },
    ],
  },
  'tribalfootball.com': {
    _name: 'Tribal Football',
    '.': [
      {
        title: 'Latest News',
        docs: 'https://docs.rsshub.app/new-media.html#tribal-football',
        source: ['/'],
        target: '/tribalfootball',
      },
    ],
  },
  'trow.cc': {
    _name: 'The Ring of Wonder',
    '.': [
      {
        title: '首页更新',
        docs: 'https://docs.rsshub.app/bbs.html#the-ring-of-wonder',
        source: ['/'],
        target: '/portal',
      },
    ],
  },
  'tvb.com': {
    _name: '无线新闻',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#wu-xian-xin-wen-xin-wen',
        source: ['/:language/:category', '/'],
        target: '/tvb/news/:category?/:language?',
      },
    ],
  },
  'twitter.com': {
    _name: 'Twitter',
    '.': [
      {
        title: '用户时间线',
        docs: 'https://docs.rsshub.app/social-media.html#twitter',
        source: '/:id',
        target: (params) => {
          if (
            params.id !== 'home' &&
            params.id !== 'explore' &&
            params.id !== 'notifications' &&
            params.id !== 'messages' &&
            params.id !== 'explore' &&
            params.id !== 'search'
          ) {
            return '/twitter/user/:id';
          }
        },
      },
      {
        title: '用户媒体时间线',
        docs: 'https://docs.rsshub.app/social-media.html#twitter',
        source: '/:id/media',
        target: (params) => {
          if (
            ![
              'home',
              'explore',
              'notifications',
              'messages',
              'explore',
              'search',
            ].includes(params.id)
          ) {
            return '/twitter/media/:id';
          }
        },
      },
      {
        title: '用户关注时间线',
        docs: 'https://docs.rsshub.app/social-media.html#twitter',
        source: '/:id',
        target: (params) => {
          if (
            params.id !== 'home' &&
            params.id !== 'explore' &&
            params.id !== 'notifications' &&
            params.id !== 'messages' &&
            params.id !== 'explore' &&
            params.id !== 'search'
          ) {
            return '/twitter/followings/:id';
          }
        },
      },
      {
        title: '用户喜欢列表',
        docs: 'https://docs.rsshub.app/social-media.html#twitter',
        source: '/:id',
        target: (params) => {
          if (
            params.id !== 'home' &&
            params.id !== 'explore' &&
            params.id !== 'notifications' &&
            params.id !== 'messages' &&
            params.id !== 'explore' &&
            params.id !== 'search'
          ) {
            return '/twitter/likes/:id';
          }
        },
      },
      {
        title: '列表时间线',
        docs: 'https://docs.rsshub.app/social-media.html#twitter',
        source: '/:id/lists/:name',
        target: (params) => {
          if (
            params.id !== 'home' &&
            params.id !== 'explore' &&
            params.id !== 'notifications' &&
            params.id !== 'messages' &&
            params.id !== 'explore' &&
            params.id !== 'search'
          ) {
            return '/twitter/list/:id/:name';
          }
        },
      },
      {
        title: '关键词',
        docs: 'https://docs.rsshub.app/social-media.html#twitter',
        source: '/search',
        target: (params, url) =>
          `/twitter/keyword/${new URL(url).searchParams.get('q')}`,
      },
      {
        title: '推文收集',
        docs: 'https://docs.rsshub.app/social-media.html#twitter',
        source: '/:uid/timelines/:collectionId',
        target: (params) => {
          if (
            params.uid !== 'home' &&
            params.uid !== 'explore' &&
            params.uid !== 'notifications' &&
            params.uid !== 'messages' &&
            params.uid !== 'explore' &&
            params.uid !== 'search'
          ) {
            return '/twitter/collection/:uid/:collectionId';
          }
        },
      },
    ],
  },
  'twreporter.org': {
    _name: '報導者',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/new-media.html#bao-dao-zhe',
        source: ['/'],
        target: '/twreporter/newest',
      },
      {
        title: '摄影',
        docs: 'https://docs.rsshub.app/new-media.html#bao-dao-zhe',
        source: ['/photography'],
        target: '/twreporter',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#bao-dao-zhe',
        source: ['/categories/:tid'],
        target: '/twreporter/category/:tid',
      },
    ],
  },
  'txrjy.com': {
    _name: '通信人家园',
    '.': [
      {
        title: '论坛 频道',
        docs: 'https://docs.rsshub.app/bbs.html#tong-xin-ren-jia-yuan',
        source: ['/c114-listnewtopic.php'],
        target: (params, url) => {
          const channel = new URL(url).searchParams.get('typeid');

          return `/txrjy/fornumtopic/${channel ? channel : ''}`;
        },
      },
    ],
  },
  'tynu.edu.cn': {
    _name: '太原师范学院',
    '.': [
      {
        title: '通知公告',
        docs: 'https://docs.rsshub.app/university.html#tai-yuan-shi-fan-xue-yuan',
        source: ['/index/tzgg.htm', '/index.htm', '/'],
        target: '/tynu',
      },
    ],
  },
  'typora.io': {
    _name: 'Typora',
    '.': [
      {
        title: 'Dev Release Changelog',
        docs: 'https://docs.rsshub.app/program-update.html#typora',
        source: ['/releases/dev'],
        target: '/typora/changelog/dev',
      },
    ],
    support: [
      {
        title: 'Changelog',
        docs: 'https://docs.rsshub.app/program-update.html#typora',
        source: ['/'],
        target: '/typora/changelog',
      },
    ],
  },
  'u3c3.com': {
    _name: 'u3c3',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/multimedia.html#u3c3-fen-lei',
        source: '/',
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          const type = searchParams.has('type') ? searchParams.get('type') : '';
          return `/u3c3/${type}`;
        },
      },
      {
        title: '关键词搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#u3c3-guan-jian-ci-sou-suo',
        source: '/',
        target: (params, url) => {
          const searchParams = new URL(url).searchParams;
          if (searchParams.has('search')) {
            const keyword = searchParams.get('search');
            return `/u3c3/search/${keyword}`;
          }
        },
      },
    ],
  },
  'u9a9.com': {
    _name: 'U9A9',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/multimedia.html#u9a9',
        source: ['/'],
        target: '/u9a9',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/multimedia.html#u9a9',
        source: ['/'],
        target: (_, url) =>
          `/u9a9/search/${new URL(url).searchParams.get('search')}`,
      },
    ],
  },
  'uber.com': {
    _name: 'Uber Blog',
    www: [
      {
        title: 'Engineering',
        docs: 'https://docs.rsshub.app/blog.html#you-bu',
        source: ['/blog/pittsburgh/engineering'],
        target: '/uber/blog',
      },
    ],
  },
  'journals.uchicago.edu': {
    _name: 'The University of Chicago Press: Journals',
    '.': [
      {
        title: 'Current Issue',
        docs: 'https://docs.rsshub.app/journal.html#the-university-of-chicago-press-journals',
        source: ['/toc/:journal/current', '/journal/:journal'],
        target: '/uchicago/journals/current/:journal',
      },
    ],
  },
  'udn.com': {
    _name: '聯合新聞網',
    '.': [
      {
        title: '即時新聞',
        docs: 'https://docs.rsshub.app/new-media.html#lian-he-xin-wen-wang-ji-shi-xin-wen',
        source: ['/news/breaknews/1/:id', '/'],
        target: '/udn/news/breakingnews/:id',
      },
    ],
    global: [
      {
        title: '轉角國際 - 首頁',
        docs: 'https://docs.rsshub.app/new-media.html#lian-he-xin-wen-wang-zhuan-jiao-guo-ji-shou-ye',
        source: ['/global_vision/index/:category', '/'],
        target: '/udn/global/:category?',
      },
      {
        title: '轉角國際 - 標籤',
        docs: 'https://docs.rsshub.app/new-media.html#lian-he-xin-wen-wang-zhuan-jiao-guo-ji-biao-qian',
        source: ['/search/tagging/1020/:tag', '/'],
        target: '/udn/global/tag/:tag?',
      },
    ],
  },
  'uibe.edu.cn': {
    _name: '对外经济贸易大学',
    hr: [
      {
        title: '人力资源处',
        docs: 'https://docs.rsshub.app/university.html#dui-wai-jing-ji-mao-yi-da-xue-ren-li-zi-yuan-chu',
        source: ['/:category/:type', '/:category', '/'],
        target: '/uibe/hr/:category?/:type?',
      },
    ],
  },
  'ulapia.com': {
    _name: '乌拉邦 ulapia',
    www: [
      {
        title: '今日晨报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-pin-dao',
        source: ['/'],
        target: '/ulapia/reports/brokerage_news',
      },
      {
        title: '最新研报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-zui-xin-yan-bao',
        source: ['/'],
        target: '/ulapia/research/latest',
      },
      {
        title: '个股研报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-pin-dao',
        source: ['/reports/stock_research'],
        target: '/ulapia/reports/stock_research',
      },
      {
        title: '行业研报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-pin-dao',
        source: ['/reports/industry_research'],
        target: '/ulapia/reports/industry_research',
      },
      {
        title: '策略研报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-pin-dao',
        source: ['/reports/strategy_research'],
        target: '/ulapia/reports/strategy_research',
      },
      {
        title: '宏观研报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-pin-dao',
        source: ['/reports/macro_research'],
        target: '/ulapia/reports/macro_research',
      },
      {
        title: '新股研报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-pin-dao',
        source: ['/reports/ipo_research'],
        target: '/ulapia/reports/ipo_research',
      },
      {
        title: '券商晨报',
        docs: 'https://docs.rsshub.app/finance.html#wu-la-bang-pin-dao',
        source: ['/reports/brokerage_news'],
        target: '/ulapia/reports/brokerage_news',
      },
    ],
  },
  'unusualwhales.com': {
    _name: 'Unusual Whales',
    '.': [
      {
        title: 'News Flow',
        docs: 'https://docs.rsshub.app/en/finance.html#unusual-whales',
        source: ['/news', '/'],
        target: '/unusualwhales/news',
      },
    ],
  },
  'uptimerobot.com': {
    _name: 'Uptime Robot',
    rss: [
      {
        title: 'RSS',
        docs: 'https://docs.rsshub.app/forecast.html#uptime-robot',
        source: ['/:id'],
        target: '/uptimerobot/rss/:id',
      },
    ],
  },
  'uraaka-joshi.com': {
    _name: '裏垢女子まとめ',
    '.': [
      {
        title: '主页',
        docs: 'https://docs-rsshub.pages.dev/other.html#li-gou-nu-zi-まとめ',
        source: ['/'],
        target: '/uraaka-joshi',
      },
      {
        title: '用户',
        docs: 'https://docs-rsshub.pages.dev/other.html#li-gou-nu-zi-まとめ',
        source: ['/:id'],
        target: '/uraaka-joshi/:id',
      },
    ],
  },
  'urbandictionary.com': {
    _name: 'Urban Dictionary',
    '.': [
      {
        title: 'Random words',
        docs: 'https://docs.rsshub.app/en/other.html#urban-dictionary',
        source: ['/random.php', '/'],
        target: '/urbandictionary/random',
      },
    ],
  },
  'usenix.org': {
    _name: 'USENIX',
    '.': [
      {
        title: 'Security Symposia',
        docs: 'https://docs.rsshub.app/journal.html#usenix',
        source: ['/conferences/all', '/conferences', '/'],
        target: '/usenix/usenix-security-sympoium',
      },
    ],
  },
  'usepanda.com': {
    _name: 'Panda',
    '.': [{ title: 'Feeds', docs: 'https://docs.rsshub.app/other.html#panda' }],
  },
  'ustb.edu.cn': {
    _name: '北京科技大学',
    gs: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#bei-jing-ke-ji-da-xue',
        source: '/:type',
        target: '/ustb/yjsy/news/:type',
      },
    ],
  },
  'ustc.edu.cn': {
    _name: '中国科学技术大学',
    '.': [
      {
        title: '官网通知公告',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-ji-shu-da-xue',
        source: '/',
        target: '/ustc/news',
      },
    ],
    'www.teach': [
      {
        title: '教务处通知新闻',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-ji-shu-da-xue',
        source: '/',
        target: '/ustc/jwc',
      },
    ],
    job: [
      {
        title: '就业信息网',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-ji-shu-da-xue',
        source: '/',
        target: '/ustc/job',
      },
    ],
    gradschool: [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-ji-shu-da-xue',
        source: '/',
        target: '/ustc/gs',
      },
    ],
    sist: [
      {
        title: '信息科学技术学院',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-ji-shu-da-xue',
        source: '/',
        target: '/ustc/sist',
      },
    ],
    eeis: [
      {
        title: '电子工程与信息科学系',
        docs: 'https://docs.rsshub.app/university.html#zhong-guo-ke-xue-ji-shu-da-xue',
        source: '/',
        target: '/ustc/eeis',
      },
    ],
  },
  'usts.edu.cn': {
    _name: '苏州科技大学',
    jwch: [
      {
        title: '教务动态',
        docs: 'https://docs.rsshub.app/university.html#su-zhou-ke-ji-da-xue',
        source: ['/jwdt.htm'],
        target: '/wsts/jwch/jwdt',
      },
      {
        title: '公告在线',
        docs: 'https://docs.rsshub.app/university.html#su-zhou-ke-ji-da-xue',
        source: ['/ggzx.htm'],
        target: '/wsts/jwch/ggzx',
      },
      {
        title: '选课通知',
        docs: 'https://docs.rsshub.app/university.html#su-zhou-ke-ji-da-xue',
        source: ['/xktz.htm'],
        target: '/wsts/jwch/xktz',
      },
    ],
  },
  'gixnetwork.org': {
    _name: 'University of Washington',
    '.': [
      {
        title: 'Global Innovation Exchange News',
        docs: 'https://docs.rsshub.app/university.html#university-of-washington',
        source: ['/news/:category'],
        target: '/uw/gix/news/:category',
      },
    ],
  },
  'baden-wuerttemberg.de': {
    _name: 'Constitutional Court of Baden-Württemberg (Germany)',
    verfgh: [
      {
        title: 'Press releases',
        docs: 'https://docs.rsshub.app/en/government.html#constitutional-court-of-baden-wurttemberg-germany',
        source: ['/de/presse-und-service/pressemitteilungen/'],
        target: '/verfghbw/press',
      },
    ],
  },
  'verse.com.tw': {
    _name: 'VERSE',
    www: [
      {
        title: '專文',
        docs: 'https://docs.rsshub.app/new-media.html#verse',
        source: '/articles/:category?',
        target: '/verse/articles/:category?',
      },
    ],
  },
  'vimeo.com': {
    _name: 'Vimeo',
    '.': [
      {
        title: 'User videos',
        docs: 'https://docs.rsshub.app/social-media.html#vimeo-yong-hu-ye-mian',
        source: '/:username/',
        target: (params, url, document) => {
          const uid =
            document &&
            document
              .querySelector('html')
              .innerHTML.match(/app.vimeo.com\/users\/([0-9]+)/)[1];
          return uid ? `/vimeo/user/${uid}` : '';
        },
      },
      {
        title: 'User Video Category',
        docs: 'https://docs.rsshub.app/social-media.html#vimeo-yong-hu-ye-mian',
        source: '/',
      },
      {
        title: 'Channel',
        docs: 'https://docs.rsshub.app/social-media.html#vimeo-channel',
        source: [
          '/channels/:channel',
          '/channels/:channel/videos',
          '/channels/:channel/videos/:sort/:format',
        ],
        target: '/vimeo/channel/:channel',
      },
      {
        title: 'Category',
        docs: 'https://docs.rsshub.app/social-media.html#vimeo-category',
        source: [
          '/categories/:category',
          '/categories/:category/:subcategory',
          '/categories/:category/:subcategory/videos',
        ],
        target: (params) =>
          `/vimeo/category/:category${
            params.subcategory ? `/` + params.subcategory : ''
          }`,
      },
    ],
  },
  'vlive.tv': {
    _name: 'V LIVE',
    '.': [
      {
        title: 'Board',
        docs: 'https://docs.rsshub.app/en/live.html#v-live',
        source: '/channel/:board/board/:board',
        target: '/vlive/channel/:board/board/:board',
      },
    ],
  },
  'vmware.com': {
    _name: 'VMware',
    flings: [
      {
        title: 'Flings',
        docs: 'https://docs.rsshub.app/program-update.html#vmware-flings',
        source: ['/flings', '/'],
        target: '/vmware/flings',
      },
    ],
  },
  'vocus.cc': {
    _name: '方格子',
    '.': [
      {
        title: '出版專題',
        docs: 'https://docs.rsshub.app/social-media.html#fang-ge-zi',
        source: ['/:id/home', '/:id/introduce'],
        target: '/vocus/publication/:id',
      },
      {
        title: '用户个人文章',
        docs: 'https://docs.rsshub.app/social-media.html#fang-ge-zi',
        source: ['/user/:id'],
        target: (params) => `/vocus/user/${params.id.replace('@', '')}`,
      },
    ],
  },
  'vom.mn': {
    _name: '蒙古之声',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#meng-gu-zhi-sheng',
        source: ['/:lang', '/'],
        target: '/vom/featured/:lang',
      },
    ],
  },
  'wallhaven.cc': {
    _name: 'wallhaven',
    '.': [
      {
        title: 'Latest',
        docs: 'https://docs.rsshub.app/picture.html#wallhaven-zhu-zhu-ti',
        source: ['/:category', '/'],
        target: (params) => {
          if (params.category === 'latest') {
            return '/wallhaven/latest';
          }
        },
      },
      {
        title: 'Hot',
        docs: 'https://docs.rsshub.app/picture.html#wallhaven-zhu-zhu-ti',
        source: ['/:category', '/'],
        target: (params) => {
          if (params.category === 'hot') {
            return '/wallhaven/hot';
          }
        },
      },
      {
        title: 'TopList',
        docs: 'https://docs.rsshub.app/picture.html#wallhaven-zhu-zhu-ti',
        source: ['/:category', '/'],
        target: (params) => {
          if (params.category === 'toplist') {
            return '/wallhaven/toplist';
          }
        },
      },
      {
        title: 'Random',
        docs: 'https://docs.rsshub.app/picture.html#wallhaven-zhu-zhu-ti',
        source: ['/:category', '/'],
        target: (params) => {
          if (params.category === 'random') {
            return '/wallhaven/random';
          }
        },
      },
      {
        title: 'Search',
        docs: 'https://docs.rsshub.app/picture.html#wallhaven-sou-xiao-sou-shao-suo',
        source: ['/'],
        target: '/wallhaven/search/:filter?/:needDetails?',
      },
    ],
  },
  'wallpaperhub.app': {
    _name: 'WallpaperHub',
    '.': [
      {
        title: '壁纸',
        docs: 'https://docs.rsshub.app/picture.html#wallpaperhub',
        source: ['/wallpaperhub', '/'],
        target: '/wallpaperhub',
      },
    ],
  },
  'wallstreetcn.com': {
    _name: '华尔街见闻',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/traditional-media.html#hua-er-jie-jian-wen-zi-xun',
        source: ['/news/:category', '/'],
        target: '/wallstreetcn/news/:category?',
      },
      {
        title: '实时快讯',
        docs: 'https://docs.rsshub.app/traditional-media.html#hua-er-jie-jian-wen-shi-shi-kuai-xun',
        source: ['/live/:category', '/'],
        target: '/wallstreetcn/live/:category?',
      },
      {
        title: '最热文章',
        docs: 'https://docs.rsshub.app/traditional-media.html#hua-er-jie-jian-wen-zui-re-wen-zhang',
        source: ['/'],
        target: '/wallstreetcn/hot/:period?',
      },
    ],
  },
  'wangqiutiyu.com': {
    _name: '旺球体育',
    '.': [
      {
        title: '直播间开播',
        docs: 'https://docs.rsshub.app/live.html#wang-qiu-ti-yu-zhi-bo-jian-kai-bo',
        source: ['/anchor/:id', '/'],
        target: '/wangqiutiyu/anchor/:id',
      },
    ],
  },
  'warthunder.com': {
    _name: 'War Thunder',
    '.': [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/game.html#war-thunder-ying-wen-news',
        source: ['/en/news', '/'],
        target: '/warthunder/news',
      },
    ],
  },
  'watchout.tw': {
    _name: '沃草',
    '.': [
      {
        title: '文件列表',
        docs: 'https://docs.rsshub.app/new-media.html#wo-cao-wen-jian-lie-biao',
        source: ['/'],
        target: '/watchout',
      },
    ],
  },
  'wdc.com': {
    _name: '',
    support: [
      {
        title: 'Western Digital',
        docs: 'https://docs.rsshub.app/program-update.html#western-digital-download',
        source: ['/downloads.aspx', '/'],
        target: (params, url) =>
          `/wdc/download/${new URL(url).searchParams.get('p')}`,
      },
    ],
  },
  'web3caff.com': {
    _name: 'web3caff',
    '.': [
      {
        title: '发现',
        docs: 'https://docs.rsshub.app/new-media.html#web3caff-fa-xian',
        source: ['/'],
        target: (params, url) =>
          `/web3caff${new URL(url).toString().match(/\.com(.*)/)[1]}`,
      },
    ],
  },
  'careerengine.us': {
    _name: '微信',
    posts: [
      {
        title: '公众号（CareerEngine 来源）',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
        source: ['/author/*id/posts'],
        target: (params) => `/wechat/ce/${params.id}`,
      },
    ],
  },
  'cimidata.com': {
    _name: '微信',
    '.': [
      {
        title: '公众号（二十次幂来源）',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
        source: ['/a/:id'],
        target: '/wechat/ce/:id',
      },
    ],
  },
  'data258.com': {
    _name: '微信',
    mp: [
      {
        title: '公众号（微阅读来源）',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
        source: ['/', '/article/category/:id'],
        target: '/wechat/data258/:id?',
      },
    ],
  },
  'feeddd.org': {
    _name: '微信',
    '.': [
      {
        title: '公众号（feeddd 来源）',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
        source: ['/'],
      },
    ],
  },
  'mp.weixin.qq.com': {
    _name: '微信',
    '.': [
      {
        title: '公众平台系统公告栏目',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
        source: ['/cgi-bin/announce'],
        target: '/wechat/announce',
      },
    ],
  },
  'privacyhide.com': {
    _name: '微信',
    wechat: [
      {
        title: '公众号（wechat-feeds 来源）',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
      },
    ],
  },
  'wxnmh.com': {
    _name: '微信',
    '.': [
      {
        title: '公众号（wxnmh.com 来源）',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
        source: ['/:id'],
        target: (params) =>
          `/wechat/wxnmh/${params.id.replace('user-', '').replace('.htm', '')}`,
      },
    ],
  },
  'xlab.app': {
    _name: '微信',
    wechat2rss: [
      {
        title: '公众号（wechat2rss 来源）',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xin',
        source: ['/feed/:id'],
        target: (params) =>
          `/wechat/wechat2rss/${params.id.replace('.xml', '')}`,
      },
    ],
  },
  'weekendhk.com': {
    _name: '新假期周刊',
    '.': [
      {
        title: '最新文章',
        docs: 'https://docs.rsshub.app/traditional-media.html#xin-jia-qi-zhou-kan',
        source: ['/'],
        target: '/weekendhk',
      },
    ],
  },
  'weibo.cn': {
    _name: '微博',
    m: [
      {
        title: '博主',
        docs: 'https://docs.rsshub.app/social-media.html#wei-bo',
        source: ['/u/:uid', '/profile/:uid'],
        target: '/weibo/user/:uid',
      },
    ],
  },
  'wenku8.net': {
    _name: '轻小说文库',
    www: [
      {
        title: '轻小说列表',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-shou-ye-fen-lei',
        source: ['/modules/article/articlelist.php'],
        target: (_, url) => {
          const fullflag = new URL(url).searchParams.get('fullflag');
          if (!fullflag) {
            return '/wenku8/fullflag';
          }
        },
      },
      {
        title: '热门轻小说',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-shou-ye-fen-lei',
        source: ['/modules/article/toplist.php'],
        target: (_, url) => {
          const sort = new URL(url).searchParams.get('sort');
          if (sort === 'allvisit') {
            return '/wenku8/allvisit';
          }
        },
      },
      {
        title: '动画化作品',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-shou-ye-fen-lei',
        source: ['/modules/article/toplist.php'],
        target: (_, url) => {
          const sort = new URL(url).searchParams.get('sort');
          if (sort === 'anime') {
            return '/wenku8/anime';
          }
        },
      },
      {
        title: '新书一览',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-shou-ye-fen-lei',
        source: ['/modules/article/toplist.php'],
        target: (_, url) => {
          const sort = new URL(url).searchParams.get('sort');
          if (sort === 'postdate') {
            return '/wenku8/postdate';
          }
        },
      },
      {
        title: '完结全本',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-shou-ye-fen-lei',
        source: ['/modules/article/articlelist.php'],
        target: (_, url) => {
          const fullflag = new URL(url).searchParams.get('fullflag');
          if (fullflag === '1') {
            return '/wenku8/fullflag';
          }
        },
      },
      {
        title: '今日更新',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-shou-ye-fen-lei',
        source: ['/modules/article/toplist.php'],
        target: (_, url) => {
          const sort = new URL(url).searchParams.get('sort');
          if (sort === 'lastupdate') {
            return '/wenku8/lastupdate';
          }
        },
      },
      {
        title: '章节',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-zhang-jie',
        source: ['/book/:id'],
        target: (params) => `/wenku8/chapter/${params.id.split('.')[0]}`,
      },
      {
        title: '最新卷',
        docs: 'https://docs.rsshub.app/reading.html#qing-xiao-shuo-wen-ku-zui-xin-juan',
        source: ['/book/:id'],
        target: (params) => `/wenku8/volume/${params.id.split('.')[0]}`,
      },
    ],
  },
  'wfu.edu.cn': {
    _name: '潍坊学院',
    jwc: [
      {
        title: '教务处通知',
        docs: 'https://docs.rsshub.app/university.html#wei-fang-xue-yuan',
        source: '/',
        target: '/wfu/jwc',
      },
    ],
    news: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/university.html#wei-fang-xue-yuan',
        source: '/',
        target: '/wfu/news',
      },
    ],
  },
  'whitehouse.gov': {
    _name: '美国白宫办公厅',
    '.': [
      {
        title: '简报室',
        docs: 'https://docs.rsshub.app/government.html#mei-guo-bai-gong-ban-gong-ting',
        source: ['/briefing-room/:category', '/'],
        target: '/whitehouse/briefing-room/:category',
      },
      {
        title: '科技政策办公室',
        docs: 'https://docs.rsshub.app/government.html#mei-guo-bai-gong-ban-gong-ting',
        source: ['/ostp', '/'],
        target: '/whitehouse/ostp',
      },
    ],
  },
  'who.int': {
    _name: '世界卫生组织 WHO',
    '.': [
      {
        title: '新闻稿',
        docs: 'https://docs.rsshub.app/government.html#shi-jie-wei-sheng-zu-zhi-who',
        source: '/news',
        target: '/who/news',
      },
      {
        title: '媒体中心',
        docs: 'https://docs.rsshub.app/government.html#shi-jie-wei-sheng-zu-zhi-who',
        source: '/news-room/:type',
        target: '/who/news-room/:type',
      },
      {
        title: '总干事的讲话',
        docs: 'https://docs.rsshub.app/government.html#shi-jie-wei-sheng-zu-zhi-who',
        source: '/director-general/speeches',
        target: '/who/speeches',
      },
    ],
  },
  'whoscall.com': {
    _name: 'Whoscall',
    '.': [
      {
        title: '最新文章',
        docs: 'https://docs.rsshub.app/blog.html#whoscall-zui-xin-wen-zhang',
        source: ['/zh-hant/blog/articles', '/'],
        target: '/whoscall',
      },
      {
        title: '分類',
        docs: 'https://docs.rsshub.app/blog.html#whoscall-fen-lei',
        source: ['/zh-hant/blog/categories/:category', '/'],
        target: '/whoscall/categories/:category?',
      },
      {
        title: '標籤',
        docs: 'https://docs.rsshub.app/blog.html#whoscall-biao-qian',
        source: ['/zh-hant/blog/tags/:tag', '/'],
        target: '/whoscall/tags/:tag?',
      },
    ],
  },
  'wikinews.org': {
    _name: '维基新闻',
    zh: [
      {
        title: '最新新闻',
        docs: 'https://docs.rsshub.app/new-media.html#wei-ji-xin-wen',
        source: ['/wiki/Special:新闻订阅'],
        target: '/wikinews/latest',
      },
    ],
  },
  'wise.com': {
    _name: 'Wise',
    '.': [
      {
        title: '昨日汇率变动',
        docs: 'https://docs-rsshub.pages.dev/other.html#wise',
      },
    ],
  },
  'antibody-software.com': {
    _name: 'WizFile',
    '.': [
      {
        title: '更新日志',
        docs: 'https://docs.rsshub.app/new-media.html#wei-ji-xin-wen',
        source: ['/wizfile/download'],
        target: '/wizfile/updates',
      },
    ],
  },
  'wnacg.org': {
    _name: '紳士漫畫',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/anime.html#shen-shi-man-hua',
        source: ['/albums.html', '/'],
        target: '/wnacg',
      },
      {
        title: '分类更新',
        docs: 'https://docs.rsshub.app/anime.html#shen-shi-man-hua',
        source: ['/*'],
        target: (_, url) =>
          `/wnacg/category/${
            new URL(url).pathname.match(/albums-index-cate-(\d+)\.html$/)[1]
          }`,
      },
      {
        title: '標籤更新',
        docs: 'https://docs.rsshub.app/anime.html#shen-shi-man-hua',
        source: ['/*'],
        target: (_, url) =>
          `/wnacg/tag/${
            new URL(url).pathname.match(/albums-index-tag-(.+?)\.html$/)[1]
          }`,
      },
    ],
  },
  'worldjournal.com': {
    _name: '世界新聞網',
    '.': [
      {
        title: '新聞',
        docs: 'https://docs.rsshub.app/new-media.html#shi-jie-xin-wen-wang',
        source: ['/wj/*path'],
        target: '/worldjournal/:path',
      },
    ],
  },
  'woshipm.com': {
    _name: '人人都是产品经理',
    '.': [
      {
        title: '热门文章',
        docs: 'https://docs.rsshub.app/new-media.html#ren-ren-dui-shi-chan-pin-jing-li',
        source: ['/'],
        target: '/woshipm/popular',
      },
      {
        title: '用户收藏',
        docs: 'https://docs.rsshub.app/new-media.html#ren-ren-dui-shi-chan-pin-jing-li',
        source: ['/u/:id'],
        target: '/woshipm/bookmarks/:id',
      },
      {
        title: '用户文章',
        docs: 'https://docs.rsshub.app/new-media.html#ren-ren-dui-shi-chan-pin-jing-li',
        source: ['/u/:id'],
        target: '/woshipm/user_article/:id',
      },
      {
        title: '最新文章',
        docs: 'https://docs.rsshub.app/new-media.html#ren-ren-dui-shi-chan-pin-jing-li',
        source: ['/'],
        target: '/woshipm/latest',
      },
    ],
    wen: [
      {
        title: '天天问',
        docs: 'https://docs.rsshub.app/new-media.html#ren-ren-dui-shi-chan-pin-jing-li',
        source: ['/'],
        target: '/woshipm/wen',
      },
    ],
  },
  'wp-china.com': {
    _name: '中国工人出版社',
    '.': [
      {
        title: '新闻中心',
        docs: 'https://docs.rsshub.app/new-media.html#zhong-guo-gong-ren-chu-ban-she',
        source: ['/'],
        target: '/wp-china/news',
      },
    ],
  },
  'wsj.com': {
    _name: '华尔街日报 The Wall Street Journal (WSJ)',
    cn: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#hua-er-jie-ri-bao-the-wall-street-journal-wsj',
        souce: '/',
        target: '/wsj/zh-cn',
      },
    ],
    www: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#hua-er-jie-ri-bao-the-wall-street-journal-wsj',
        souce: '/',
        target: '/wsj/en-us',
      },
    ],
  },
  'wsyu.edu.cn': {
    _name: '新闻中心',
    www: [
      {
        title: '学校要闻',
        docs: 'https://docs.rsshub.app/other.html#wu-chang-shou-yi-xue-yuan',
        source: '/*',
        target: '/wsyu/news/xxyw',
      },
      {
        title: '综合新闻',
        docs: 'https://docs.rsshub.app/other.html#wu-chang-shou-yi-xue-yuan',
        source: '/*',
        target: '/wsyu/news/zhxw',
      },
      {
        title: '媒体聚焦',
        docs: 'https://docs.rsshub.app/other.html#wu-chang-shou-yi-xue-yuan',
        source: '/*',
        target: '/wsyu/news/mtjj',
      },
    ],
  },
  'wxkol.com': {
    _name: '微小领',
    '.': [
      {
        title: '微信公众号',
        docs: 'https://docs.rsshub.app/new-media.html#wei-xiao-ling',
        source: ['/show/:id'],
        target: (params) => `/wxkol/show/${params.id.replace('.html', '')}`,
      },
    ],
  },
  'wyzxwk.com': {
    _name: '乌有之乡',
    '.': [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/new-media.html#wu-you-zhi-xiang-lan-mu',
        source: ['/Article/:id', '/'],
        target: '/wyzxwk/article/:id?',
      },
    ],
  },
  'wzu.edu.cn': {
    _name: '温州大学',
    '.': [
      {
        title: '温州大学 - 主站新闻',
        docs: 'https://docs.rsshub.app/university.html#wen-zhou-da-xue',
      },
    ],
  },
  'x6d.com': {
    _name: '小刀娱乐网',
    xd: [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/new-media.html#xiao-dao-yu-le-wang',
        source: ['/html/:id'],
        target: (params) => `/x6d/${params.id.replace('.html', '')}`,
      },
    ],
  },
  'xaufe.edu.cn': {
    _name: '西安财经大学',
    jiaowu: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#xi-an-cai-jing-da-xue',
      },
    ],
  },
  'xaut.edu.cn': {
    _name: '西安理工大学',
    index: [
      {
        title: '学校官网',
        docs: 'https://docs.rsshub.app/university.html#xi-an-li-gong-da-xue',
      },
    ],
    jwc: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#xi-an-li-gong-da-xue',
      },
    ],
    rsc: [
      {
        title: '人事处',
        docs: 'https://docs.rsshub.app/university.html#xi-an-li-gong-da-xue',
      },
    ],
  },
  'xiaohongshu.com': {
    _name: '小红书',
    '.': [
      {
        title: '用户笔记',
        docs: 'https://docs.rsshub.app/social-media.html#xiao-hong-shu',
        source: '/user/profile/:user_id',
        target: '/xiaohongshu/user/:user_id/notes',
      },
      {
        title: '用户收藏',
        docs: 'https://docs.rsshub.app/social-media.html#xiao-hong-shu',
        source: '/user/profile/:user_id',
        target: '/xiaohongshu/user/:user_id/collect',
      },
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/social-media.html#xiao-hong-shu',
        source: '/board/:board_id',
        target: '/xiaohongshu/board/:board_id',
      },
    ],
  },
  'xiaomiyoupin.com': {
    _name: '小米有品',
    '.': [
      {
        title: '小米有品众筹',
        docs: 'https://docs.rsshub.app/shopping.html#xiao-mi-you-pin-xiao-mi-you-pin-zhong-chou',
        source: ['/'],
        target: '/xiaomiyoupin/crowdfunding',
      },
      {
        title: '小米有品每日上新',
        docs: 'https://docs.rsshub.app/shopping.html#xiao-mi-you-pin-xiao-mi-you-pin-mei-ri-shang-xin',
        source: ['/'],
        target: '/xiaomiyoupin/latest',
      },
    ],
  },
  'xiaoyuzhoufm.com': {
    _name: '小宇宙',
    '.': [
      {
        title: '发现',
        docs: 'https://docs.rsshub.app/multimedia.html#xiao-yu-zhou',
        source: ['/'],
        target: '/xiaoyuzhou',
      },
      {
        title: '播客',
        docs: 'https://docs.rsshub.app/multimedia.html#xiao-yu-zhou',
        source: ['/podcast/:id'],
        target: '/xiaoyuzhou/podcast/:id',
      },
    ],
  },
  'xiaozhuanlan.com': {
    _name: '小专栏',
    '.': [
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/new-media.html#xiao-zhuan-lan',
        source: '/:id',
        target: '/xiaozhuanlan/column/:id',
      },
    ],
  },
  'xidian.edu.cn': {
    _name: '西安电子科技大学',
    jwc: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#xi-an-dian-zi-ke-ji-da-xue',
        source: ['/:category'],
        target: (params) =>
          `/xidian/jwc${params.category ? `/${params.category}` : ''}`,
      },
    ],
  },
  'xjtu.edu.cn': {
    _name: '西安交通大学',
    '2yuan': [
      {
        title: '第二附属医院新闻',
        docs: 'https://docs.rsshub.app/university.html#xi-an-jiao-tong-da-xue-di-er-fu-shu-yi-yuan-xin-wen',
        source: ['/'],
        target: (params, url) =>
          `/xjtu/2yuan/news/${
            new URL(url).toString().match(/\/Columns\/(\d+)\//)[1]
          }`,
      },
    ],
    dean: [
      {
        title: '教务处',
        docs: 'https://docs.rsshub.app/university.html#xi-an-jiao-tong-da-xue-jiao-wu-chu',
        source: ['/'],
        target: '/xjtu/dean/:subpath+',
      },
    ],
    ee: [
      {
        title: '电气学院',
        docs: 'https://docs.rsshub.app/university.html#xi-an-jiao-tong-da-xue-dian-qi-xue-yuan',
        source: ['/'],
        target: '/xjtu/ee/:id?',
      },
    ],
    gs: [
      {
        title: '研究生院通知公告',
        docs: 'https://docs.rsshub.app/university.html#xi-an-jiao-tong-da-xue-yan-jiu-sheng-xue-yuan-tong-zhi-gong-gao',
        source: ['/'],
        target: '/xjtu/gs/tzgg',
      },
    ],
    international: [
      {
        title: '国际处通知',
        docs: 'https://docs.rsshub.app/university.html#xi-an-jiao-tong-da-xue-guo-ji-chu-tong-zhi',
        source: ['/'],
        target: '/xjtu/international/:subpath+',
      },
    ],
    std: [
      {
        title: '科技在线',
        docs: 'https://docs.rsshub.app/university.html#xi-an-jiao-tong-da-xue-ke-ji-zai-xian',
        source: ['/tzgg/:category', '/'],
        target: (params, url) =>
          `/xjtu/std/${new URL(url).toString().match(/\/(\w+)\.htm/)[1]}`,
      },
    ],
    'www.dyyy': [
      {
        title: '第一附属医院新闻',
        docs: 'https://docs.rsshub.app/university.html#xi-an-jiao-tong-da-xue',
        source: ['/*'],
        target: (_, url) =>
          `/xjtu/dyyy${new URL(url).pathname.replace('.htm', '')}`,
      },
    ],
  },
  'xmanhua.com': {
    _name: 'X 漫画',
    '.': [
      {
        title: '最新动态',
        docs: 'https://docs.rsshub.app/anime.html#x-man-hua',
        source: ['/:uid'],
        target: '/xmanhua/:uid',
      },
    ],
  },
  'xmnn.cn': {
    _name: '厦门网',
    epaper: [
      {
        title: '数字媒体',
        docs: 'https://docs.rsshub.app/traditional-media.html#xia-men-wang-shu-zi-mei-ti',
        source: ['/:id', '/'],
        target: '/xmnn/epaper/:id',
      },
    ],
  },
  'danjuanapp.com': {
    _name: '雪球',
    '.': [
      {
        title: '蛋卷基金净值更新',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/funding/:id'],
        target: '/xueqiu/funding/:id',
      },
    ],
  },
  'xueqiu.com': {
    _name: '雪球',
    '.': [
      {
        title: '今日话题',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/today'],
        target: '/xueqiu/today',
      },
      {
        title: '用户动态',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/u/:id'],
        target: '/xueqiu/user/:id',
      },
      {
        title: '用户收藏动态',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/u/:id'],
        target: '/xueqiu/favorite/:id',
      },
      {
        title: '用户自选动态',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/u/:id'],
        target: '/xueqiu/user_stock/:id',
      },
      {
        title: '用户专栏',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/:id/column'],
        target: '/xueqiu/column/:id',
      },
      {
        title: '组合最新调仓信息',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/p/:id'],
        target: '/xueqiu/snb/:id',
      },
      {
        title: '股票信息',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/S/:id'],
        target: '/xueqiu/stock_info/:id',
      },
      {
        title: '股票评论',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/S/:id'],
        target: '/xueqiu/stock_comments/:id',
      },
      {
        title: '热帖',
        docs: 'https://docs.rsshub.app/finance.html#xue-qiu',
        source: ['/'],
        target: '/xueqiu/hots',
      },
    ],
  },
  'xunhupay.com': {
    _name: '虎皮椒',
    www: [
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/blog.html#hu-pi-jiao',
        source: ['/blog'],
        target: '/xunhupay/blog',
      },
    ],
  },
  'xwlb.com.cn': {
    _name: '羊城晚报金羊网',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#yang-cheng-wan-bao-jin-yang-wang',
        source: ['/'],
      },
    ],
  },
  'xys.org': {
    _name: '新语丝',
    '.': [
      {
        title: '新到资料',
        docs: 'https://docs.rsshub.app/blog.html#xin-yu-si',
        source: ['/', '/new.html'],
        target: '/xys/new',
      },
    ],
  },
  'xyzrank.com': {
    _name: '中文播客榜',
    '.': [
      {
        title: '热门节目',
        docs: 'https://docs.rsshub.app/multimedia.html#zhong-wen-bo-ke-bang-re-men-jie-mu',
        source: ['/#/', '/'],
        target: '/xyzrank',
      },
      {
        title: '热门播客',
        docs: 'https://docs.rsshub.app/multimedia.html#zhong-wen-bo-ke-bang-re-men-bo-ke',
        source: ['/#/hot-podcasts', '/'],
        target: '/xyzrank/hot-podcasts',
      },
      {
        title: '新锐节目',
        docs: 'https://docs.rsshub.app/multimedia.html#zhong-wen-bo-ke-bang-xin-rui-jie-mu',
        source: ['/#/hot-episodes-new', '/'],
        target: '/xyzrank/hot-episodes-new',
      },
      {
        title: '新锐播客',
        docs: 'https://docs.rsshub.app/multimedia.html#zhong-wen-bo-ke-bang-xin-rui-bo-ke',
        source: ['/#/new-podcasts', '/'],
        target: '/xyzrank/new-podcasts',
      },
    ],
  },
  'yahoo.com': {
    _name: 'Yahoo',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#yahoo',
        source: ['/'],
        target: '/yahoo/news/:region/:category?',
      },
    ],
  },
  'yaohuo.me': {
    _name: '妖火',
    '.': [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/new-media.html#yao-huo-shou-ye',
        source: ['/'],
        target: '/yaohuo',
      },
    ],
  },
  'yicai.com': {
    _name: '第一财经',
    '.': [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-zui-xin',
        source: ['/'],
        target: '/yicai/latest',
      },
      {
        title: '头条',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-tou-tiao',
        source: ['/'],
        target: '/yicai/headline',
      },
      {
        title: 'VIP 频道',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-vip-pin-dao',
        source: ['/vip/product/:id', '/'],
        target: '/yicai/vip/:id',
      },
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-xin-wen',
        source: ['/news/:id', '/news'],
        target: '/yicai/news/:id',
      },
      {
        title: '关注',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-guan-zhu',
        source: ['/feed/:id', '/feed'],
        target: '/yicai/feed/:id',
      },
      {
        title: '视听',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-shi-ting',
        source: ['/video/:id', '/video'],
        target: '/yicai/video/:id',
      },
      {
        title: '正在',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-zheng-zai',
        source: ['/brief'],
        target: '/yicai/brief',
      },
      {
        title: '一财号',
        docs: 'https://docs.rsshub.app/traditional-media.html#di-yi-cai-jing-yi-cai-hao',
        source: ['/author/:id', '/author'],
        target: '/yicai/author/:id',
      },
    ],
  },
  'ymgal.games': {
    _name: '月幕 Galgame',
    '.': [
      {
        title: '全部文章',
        docs: 'https://docs.rsshub.app/anime.html#yue-mu-galgame',
        source: ['/co/article'],
        target: '/ymgal/article/all',
      },
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/anime.html#yue-mu-galgame',
        source: ['/co/article'],
        target: '/ymgal/article/news',
      },
      {
        title: '专栏',
        docs: 'https://docs.rsshub.app/anime.html#yue-mu-galgame',
        source: ['/co/article'],
        target: '/ymgal/article/column',
      },
      {
        title: '本月新作',
        docs: 'https://docs.rsshub.app/anime.html#yue-mu-galgame',
        source: ['/'],
        target: '/ymgal/game/release',
      },
    ],
  },
  'yoasobi-music.jp': {
    _name: 'Yoasobi Official',
    www: [
      {
        title: 'News',
        docs: 'https://docs.rsshub.app/en/live.html#yoasobi',
        source: ['/', '/:category'],
        target: '/yoasobi-music/info/:category',
      },
      {
        title: 'Biography',
        docs: 'https://docs.rsshub.app/en/live.html#yoasobi',
        source: ['/', '/:category'],
        target: '/yoasobi-music/info/:category',
      },
      {
        title: 'Live',
        docs: 'https://docs.rsshub.app/en/live.html#yoasobi',
        source: ['/', '/live'],
        target: '/yoasobi-music/live',
      },
      {
        title: 'Media',
        docs: 'https://docs.rsshub.app/en/live.html#yoasobi',
        source: ['/', '/media'],
        target: '/yoasobi-music/media',
      },
    ],
  },
  'yomiuri.co.jp': {
    _name: '読売新聞',
    www: [
      {
        title: '読売新聞',
        docs: 'https://docs.rsshub.app/traditional-media.html#du-mai-xin-wen',
        source: ['/:category'],
        target: '/yomiuri/:category',
      },
    ],
  },
  'youku.com': {
    _name: '优酷',
    i: [
      {
        title: '订阅作者',
        docs: 'https://docs.rsshub.app/multimedia.html#you-ku',
        source: ['/i/:id'],
        target: '/youku/channel/:id',
      },
    ],
  },
  'youtube.com': {
    _name: 'YouTube',
    charts: [
      {
        title: '音乐排行榜',
        docs: 'https://docs.rsshub.app/social-media.html#youtube',
        source: [
          '/charts/:category/:country/*',
          '/charts/:category/:country',
          '/charts/:category',
        ],
        target: (params) =>
          `/youtube/charts/${params.category}${
            params.country ? params.country : ''
          }`,
      },
    ],
    www: [
      {
        title: '用户',
        docs: 'https://docs.rsshub.app/social-media.html#youtube',
        source: '/user/:username',
        target: '/youtube/user/:username',
      },
      {
        title: '频道',
        docs: 'https://docs.rsshub.app/social-media.html#youtube',
        source: '/channel/:id',
        target: '/youtube/channel/:id',
      },
      {
        title: '自定义网址',
        docs: 'https://docs.rsshub.app/social-media.html#youtube',
        source: '/c/:id',
        target: '/youtube/c/:id',
      },
      {
        title: '社群',
        docs: 'https://docs.rsshub.app/social-media.html#youtube',
        source: [
          '/channel/:handle/community',
          '/channel/:handle',
          '/:handle/community',
          '/:handle/featured',
          '/:handle',
        ],
        target: (params) =>
          params.handle.startsWith('@') || params.handle.startsWith('UC')
            ? `/youtube/community/${params.handle}`
            : '',
      },
      {
        title: '播放列表',
        docs: 'https://docs.rsshub.app/social-media.html#youtube',
        source: '/playlist',
        target: (params, url) =>
          `/youtube/playlist/${new URL(url).searchParams.get('list')}`,
      },
      {
        title: '订阅列表',
        docs: 'https://docs.rsshub.app/social-media.html#youtube',
        source: ['/feed/subscriptions', '/feed/channels'],
        target: '/youtube/subscriptions',
      },
    ],
  },
  'youzhiyouxing.cn': {
    _name: '有知有行',
    '.': [
      {
        title: '有知 - 全部',
        docs: 'https://docs.rsshub.app/finance.html#you-you-wei-zhi-zhi-you-you-wei-xing-hang-xing-hang-heng-you-you-wei-zhi-zhi-wen-zhang-zhang',
        source: ['/materials'],
        target: '/youzhiyouxing/materials',
      },
      {
        title: '有知 - 知行小酒馆',
        docs: 'https://docs.rsshub.app/finance.html#you-you-wei-zhi-zhi-you-you-wei-xing-hang-xing-hang-heng-you-you-wei-zhi-zhi-wen-zhang-zhang',
        source: ['/materials'],
        target: (_params, url) => {
          if (new URL(url).searchParams.get('column_id') === '4') {
            return '/youzhiyouxing/materials/4';
          }
        },
      },
      {
        title: '有知 - 知行黑板报',
        docs: 'https://docs.rsshub.app/finance.html#you-you-wei-zhi-zhi-you-you-wei-xing-hang-xing-hang-heng-you-you-wei-zhi-zhi-wen-zhang-zhang',
        source: ['/materials'],
        target: (_params, url) => {
          if (new URL(url).searchParams.get('column_id') === '2') {
            return '/youzhiyouxing/materials/2';
          }
        },
      },
      {
        title: '有知 - 无人知晓',
        docs: 'https://docs.rsshub.app/finance.html#you-you-wei-zhi-zhi-you-you-wei-xing-hang-xing-hang-heng-you-you-wei-zhi-zhi-wen-zhang-zhang',
        source: ['/materials'],
        target: (_params, url) => {
          if (new URL(url).searchParams.get('column_id') === '10') {
            return '/youzhiyouxing/materials/10';
          }
        },
      },
      {
        title: '有知 - 孟岩专栏',
        docs: 'https://docs.rsshub.app/finance.html#you-you-wei-zhi-zhi-you-you-wei-xing-hang-xing-hang-heng-you-you-wei-zhi-zhi-wen-zhang-zhang',
        source: ['/materials'],
        target: (_params, url) => {
          if (new URL(url).searchParams.get('column_id') === '1') {
            return '/youzhiyouxing/materials/1';
          }
        },
      },
      {
        title: '有知 - 知行读书会',
        docs: 'https://docs.rsshub.app/finance.html#you-you-wei-zhi-zhi-you-you-wei-xing-hang-xing-hang-heng-you-you-wei-zhi-zhi-wen-zhang-zhang',
        source: ['/materials'],
        target: (_params, url) => {
          if (new URL(url).searchParams.get('column_id') === '3') {
            return '/youzhiyouxing/materials/3';
          }
        },
      },
      {
        title: '有知 - 你好，同路人',
        docs: 'https://docs.rsshub.app/finance.html#you-you-wei-zhi-zhi-you-you-wei-xing-hang-xing-hang-heng-you-you-wei-zhi-zhi-wen-zhang-zhang',
        source: ['/materials'],
        target: (_params, url) => {
          if (new URL(url).searchParams.get('column_id') === '11') {
            return '/youzhiyouxing/materials/11';
          }
        },
      },
    ],
  },
  'yunspe.com': {
    _name: '云奇网',
    '.': [
      {
        title: '微语简报',
        docs: 'https://docs.rsshub.app/new-media.html#wei-yu-jian-bao',
        source: ['/newsflashes/微语简报', '/newsflashes', '/'],
        target: '/yunspe/newsflashes',
      },
    ],
  },
  'yuque.com': {
    _name: '语雀',
    '.': [
      {
        title: '知识库',
        docs: 'https://docs.rsshub.app/study.html#yu-que',
        source: [':name/:book'],
        target: '/yuque/:name/:book',
      },
    ],
  },
  'yxdown.com': {
    _name: '游讯网',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/game.html#you-xun-wang',
        source: ['/news/:category', '/news'],
        target: (params) =>
          `/yxdown/news${params.category ? `/${params.category}` : ''}`,
      },
      {
        title: '精彩推荐',
        docs: 'https://docs.rsshub.app/game.html#you-xun-wang',
        source: ['/'],
        target: '/yxdown/recommend',
      },
    ],
  },
  'yxdzqb.com': {
    _name: '游戏打折情报',
    '.': [
      {
        title: '游戏折扣',
        docs: 'https://docs.rsshub.app/game.html#you-xi-da-zhe-qing-bao-you-xi-zhe-kou',
        source: '/',
        target: '/yxdzqb/:type',
      },
    ],
  },
  'yxrb.net': {
    _name: '游戏日报',
    news: [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/game.html#you-xi-ri-bao',
        source: ['/:category', '/'],
        target: '/yxrb/:category',
      },
    ],
  },
  'yysub.net': {
    _name: '人人影视',
    '.': [
      {
        title: '影视资讯',
        docs: 'https://docs.rsshub.app/multimedia#ren-ren-ying-shi',
        source: '/article',
        target: (_params, url) =>
          `/yyets/article${
            new URL(url).searchParams.has('type')
              ? '/' + new URL(url).searchParams.get('type')
              : ''
          }`,
      },
      {
        title: '今日播出',
        docs: 'https://docs.rsshub.app/multimedia#ren-ren-ying-shi',
        source: ['/tv/schedule', '/'],
        target: '/yyets/today',
      },
    ],
  },
  'yystv.cn': {
    _name: '游研社',
    '.': [
      {
        title: '推游',
        docs: 'https://docs.rsshub.app/game.html#you-yan-she',
        source: '/b/recommend',
        target: '/yystv/category/recommend',
      },
      {
        title: '游戏史',
        docs: 'https://docs.rsshub.app/game.html#you-yan-she',
        source: '/b/history',
        target: '/yystv/category/history',
      },
      {
        title: '大事件',
        docs: 'https://docs.rsshub.app/game.html#you-yan-she',
        source: '/b/big',
        target: '/yystv/category/big',
      },
      {
        title: '文化',
        docs: 'https://docs.rsshub.app/game.html#you-yan-she',
        source: '/b/culture',
        target: '/yystv/category/culture',
      },
      {
        title: '趣闻',
        docs: 'https://docs.rsshub.app/game.html#you-yan-she',
        source: '/b/news',
        target: '/yystv/category/news',
      },
      {
        title: '经典回顾',
        docs: 'https://docs.rsshub.app/game.html#you-yan-she',
        source: '/b/retro',
        target: '/yystv/category/retro',
      },
      {
        title: '全部文章',
        docs: 'https://docs.rsshub.app/game.html#you-yan-she',
        source: '/docs',
        target: '/yystv/docs',
      },
    ],
  },
  'myzaker.com': {
    _name: 'ZAKER',
    '.': [
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#zaker',
        source: ['/:type/:id'],
        target: '/zaker/:type/:id',
      },
      {
        title: '精读',
        docs: 'https://docs.rsshub.app/new-media.html#zaker',
        source: ['/'],
        target: '/zaker/focusread',
      },
    ],
  },
  'zaobao.com': {
    _name: '联合早报',
    www: [
      {
        title: '新闻-新加坡',
        docs: 'https://docs.rsshub.app/traditional-media.html#lian-he-zao-bao-xin-wen',
        source: ['/', '/news', '/news/singapore'],
        target: '/zaobao/znews/singapore',
      },
      {
        title: '新闻-中国',
        docs: 'https://docs.rsshub.app/traditional-media.html#lian-he-zao-bao-xin-wen',
        source: ['/', '/news', '/news/china'],
        target: '/zaobao/znews/china',
      },
      {
        title: '新闻-国际',
        docs: 'https://docs.rsshub.app/traditional-media.html#lian-he-zao-bao-xin-wen',
        source: ['/', '/news', '/news/world'],
        target: '/zaobao/znews/world',
      },
    ],
  },
  'zaobao.com.sg': {
    _name: '联合早报',
    www: [
      {
        title: '新闻-新加坡',
        docs: 'https://docs.rsshub.app/traditional-media.html#lian-he-zao-bao-xin-wen',
        source: ['/', '/news', '/news/singapore'],
        target: '/zaobao/znews/singapore',
      },
      {
        title: '新闻-中国',
        docs: 'https://docs.rsshub.app/traditional-media.html#lian-he-zao-bao-xin-wen',
        source: ['/', '/news', '/news/china'],
        target: '/zaobao/znews/china',
      },
      {
        title: '新闻-国际',
        docs: 'https://docs.rsshub.app/traditional-media.html#lian-he-zao-bao-xin-wen',
        source: ['/', '/news', '/news/world'],
        target: '/zaobao/znews/world',
      },
    ],
  },
  'zaozao.run': {
    _name: '前端早早聊',
    www: [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/programming.html#qian-duan-zao-zao-liao',
        source: ['/article/:type'],
        target: '/zaozao/article/:type',
      },
    ],
  },
  'zcmu.edu.cn': {
    _name: '浙江中医药大学',
    jwc: [
      {
        title: '教务处 - 教务管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: '/jwgl',
        target: '/zcmu/jwc/0',
      },
      {
        title: '教务处 - 成绩管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: '/jwgl/cjgl',
        target: '/zcmu/jwc/1',
      },
      {
        title: '教务处 - 学籍管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: '/jwgl/xjgl',
        target: '/zcmu/jwc/2',
      },
      {
        title: '教务处 - 考试管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: '/jwgl/ksgl',
        target: '/zcmu/jwc/3',
      },
      {
        title: '教务处 - 选课管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: '/jwgl/xkgl',
        target: '/zcmu/jwc/4',
      },
      {
        title: '教务处 - 排课管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: '/jwgl/pkgl',
        target: '/zcmu/jwc/5',
      },
    ],
    yxy: [
      {
        title: '药学院 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: 'index/tzgg',
        target: '/zcmu/yxy/0',
      },
      {
        title: '药学院 - 评优评奖',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: 'xsgz/pypj',
        target: '/zcmu/yxy/1',
      },
      {
        title: '药学院 - 文明规范',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: 'xsgz/wmgf',
        target: '/zcmu/yxy/2',
      },
      {
        title: '药学院 - 创新创业',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: 'xsgz/cxcy',
        target: '/zcmu/yxy/3',
      },
      {
        title: '药学院 - 校园文化',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: 'xsgz/xywh',
        target: '/zcmu/yxy/4',
      },
      {
        title: '药学院 - 心理驿站',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: 'xsgz/xlyz',
        target: '/zcmu/yxy/5',
      },
      {
        title: '药学院 - 日常通知',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-zhong-yi-yao-da-xue',
        source: 'xsgz/rctz',
        target: '/zcmu/yxy/6',
      },
    ],
  },
  'zcool.com.cn': {
    _name: '站酷',
    www: [
      {
        title: '发现',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: ['/discover', '/'],
        target: (params, url) =>
          `/zcool/discover/${new URL(url).toString().split('?').pop()}`,
      },
      {
        title: '发现 - 精选 - 全部推荐',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: '',
        target: '/zcool/discover/all',
      },
      {
        title: '发现 - 精选 - 首页推荐',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: '',
        target: '/zcool/discover/home',
      },
      {
        title: '发现 - 精选 - 编辑精选',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: '',
        target: '/zcool/discover/home',
      },
      {
        title: '发现 - 精选 - 文章 - 编辑精选',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: '',
        target: '/zcool/discover/article',
      },
      {
        title: '作品榜单',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: '',
        target: '/zcool/top/design',
      },
      {
        title: '文章榜单',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: '',
        target: '/zcool/top/article',
      },
      {
        title: '用户作品',
        docs: 'https://docs.rsshub.app/design.html#zhan-ku',
        source: ['/u/:id'],
        target: '/zcool/user/:id',
      },
    ],
  },
  'zhangyoubao.com': {
    _name: '掌游宝',
    mobile: [
      {
        title: '推荐',
        docs: 'https://docs.rsshub.app/game.html#zhang-you-bao-tui-jian',
        source: ['/:category/'],
        target: '/zhangyoubao/:category',
      },
    ],
  },
  'zhibo8.cc': {
    _name: '直播吧',
    '.': [
      {
        title: '录像',
        docs: 'https://docs.rsshub.app/multimedia.html#zhi-bo-ba',
        source: ['/:category/luxiang.htm'],
        target: '/zhibo8/luxiang/:category',
      },
    ],
    bbs: [
      {
        title: '子论坛',
        docs: 'https://docs.rsshub.app/bbs.html#zhi-bo-ba',
        source: ['/'],
        target: (_params, url) =>
          `/zhibo8/forum/${new URL(url).searchParams.get('fid')}`,
      },
      {
        title: '回帖',
        docs: 'https://docs.rsshub.app/bbs.html#zhi-bo-ba',
        source: ['/'],
        target: (_params, url) =>
          `/zhibo8/post/${new URL(url).searchParams.get('tid')}`,
      },
    ],
    news: [
      {
        title: '滚动新闻',
        docs: 'https://docs.rsshub.app/bbs.html#zhi-bo-ba',
        source: ['/:category'],
        target: '/zhibo8/more/:category',
      },
    ],
  },
  'zhitongcaijing.com': {
    _name: '智通财经',
    '.': [
      {
        title: '资讯',
        docs: 'https://docs.rsshub.app/finance.html#zhi-tong-cai-jing-zi-xun',
        source: ['/:category', '/'],
        target: (params, url) => {
          const id = new URL(url).toString().match(/\/(\w+)\.html/)[1];
          const category = new URL(url).searchParams.get('category_key');
          return `/zhitongcaijing/${id}${category ? `/${category}` : ''}`;
        },
      },
    ],
  },
  'zhiy.cc': {
    _name: '知园',
    '.': [
      {
        title: 'Newsletter',
        docs: 'https://docs.rsshub.app/new-media.html#zhi-yuan',
        source: ['/:author'],
        target: '/zhiy/letters/:author',
      },
      {
        title: '笔记',
        docs: 'https://docs.rsshub.app/new-media.html#zhi-yuan',
        source: ['/:author'],
        target: '/zhiy/posts/:author',
      },
    ],
  },
  'zhubai.love': {
    _name: '竹白',
    '.': [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/blog.html#zhu-bai',
        source: ['/'],
      },
    ],
  },
  'zjgtjy.cn': {
    _name: '浙江省土地使用权网上交易系统',
    '.': [
      {
        title: '全部更新',
        docs: 'https://docs.rsshub.app/government.html',
        source: '/',
        target: '/zjgtjy/all',
      },
      {
        title: '挂牌公告',
        docs: 'https://docs.rsshub.app/government.html',
        source: '/',
        target: '/zjgtjy/gpgg',
      },
      {
        title: '拍卖公告',
        docs: 'https://docs.rsshub.app/government.html',
        source: '/',
        target: '/zjgtjy/pmgg',
      },
      {
        title: '补充公告',
        docs: 'https://docs.rsshub.app/government.html',
        source: '/',
        target: '/zjgtjy/bcgg',
      },
    ],
  },
  'zju.edu.cn': {
    _name: '浙江大学',
    physics: [
      {
        title: '物理学院',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: ['/*path'],
        target: (params) => {
          let type;
          switch (params.path) {
            case '39060/list.htm':
              type = '1';
              break;
            case '39070/list.htm':
              type = '2';
              break;
            case '39079/list.htm':
              type = '3';
              break;
            default:
              type = '1';
              break;
          }
          return `/zju/physics/${type}`;
        },
      },
    ],
    www: [
      {
        title: '普通栏目',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: ['/*path'],
        target: (params) => `/zju/list/${params.path.replace('/list.htm', '')}`,
      },
    ],
    'www.career': [
      {
        title: '就业服务平台',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: ['/'],
        target: '/zju/career/1',
      },
    ],
    'www.cst': [
      {
        title: '软件学院 - 全部通知',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: ['', '/*tpath'],
        target: '/zju/cst/0',
      },
      {
        title: '软件学院 - 招生信息',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/32178/list.htm',
        target: '/zju/cst/1',
      },
      {
        title: '软件学院 - 教务管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36216/list.htm',
        target: '/zju/cst/2',
      },
      {
        title: '软件学院 - 论文管理',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36217/list.htm',
        target: '/zju/cst/3',
      },
      {
        title: '软件学院 - 思政工作',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36192/list.htm',
        target: '/zju/cst/4',
      },
      {
        title: '软件学院 - 评奖评优',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36228/list.htm',
        target: '/zju/cst/5',
      },
      {
        title: '软件学院 - 实习就业',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36193/list.htm',
        target: '/zju/cst/6',
      },
      {
        title: '软件学院 - 国际实习',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36235/list.htm',
        target: '/zju/cst/7',
      },
      {
        title: '软件学院 - 国内合作科研',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36194/list.htm',
        target: '/zju/cst/8',
      },
      {
        title: '软件学院 - 国际合作科研',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: '/36246/list.htm',
        target: '/zju/cst/9',
      },
    ],
    'www.grs': [
      {
        title: '研究生院',
        docs: 'https://docs.rsshub.app/university.html#zhe-jiang-da-xue',
        source: ['/*path', '/'],
        target: (params) => {
          let type;
          switch (params.path) {
            case 'qbgg/list.htm':
              type = 1;
              break;
            case 'jxgl/list.htm':
              type = 2;
              break;
            case 'glzz/list.htm':
              type = 3;
              break;
            case 'xkjs/list.htm':
              type = 4;
              break;
            case 'hwjl/list.htm':
              type = 5;
              break;
            default:
              type = 1;
              break;
          }
          return `/zju/grs/${type}`;
        },
      },
    ],
  },
  'zodgame.xyz': {
    _name: 'zodgame',
    '.': [
      {
        title: '论坛版块',
        docs: 'https://docs.rsshub.app/bbs.html#zodgame',
        source: '/forum.php',
        target: (params, url) => {
          const fid = new URL(url).searchParams.get('fid');
          if (fid) {
            return `/zodgame/forum/${fid}`;
          }
        },
      },
    ],
  },
  'zoo.team': {
    _name: '政采云前端技术团队',
    weekly: [
      {
        title: '小报',
        docs: 'https://docs.rsshub.app/blog.html#zheng-cai-yun-qian-duan-ji-shu-tuan-dui',
        source: '/',
        target: '/zooTeam/weekly',
      },
    ],
    www: [
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/blog.html#zheng-cai-yun-qian-duan-ji-shu-tuan-dui',
        source: '/',
        target: '/zooTeam/blog',
      },
    ],
  },
  'zotero.org': {
    _name: 'Zotero',
    '.': [
      {
        title: 'Version History',
        docs: 'https://docs.rsshub.app/program-update.html#zotero',
        source: ['/', '/support/changelog'],
        target: '/zotero/versions',
      },
    ],
  },
  'zuel.edu.cn': {
    _name: '中南财经政法大学',
    wap: [
      {
        title: '通知公告',
        docs: 'https://docs.rsshub.app/univeristy.html#zhong-nan-cai-jing-zheng-fa-da-xue-tong-zhi-gong-gao',
        source: ['/', '/notice/list.htm'],
        target: '/zuel/notice',
      },
    ],
  },
  'zuvio.com.tw': {
    _name: 'Zuvio',
    irs: [
      {
        title: '校園話題',
        docs: 'https://docs.rsshub.app/bbs.html#zuvio',
        source: [
          '/student5/chickenM/articles/:board',
          '/student5/chickenM/articles',
        ],
        target: (params) =>
          `/zuvio/student5${params.board ? `/${params.board}` : ''}`,
      },
    ],
  },
  'zyshow.net': {
    _name: '综艺秀',
    '.': [
      {
        title: '综艺',
        docs: 'https://docs.rsshub.app/multimedia.html#zong-yi-xiu-zong-yi',
        source: ['/:region/:id', '/:id', '/'],
        target: (params, url) =>
          `/zyshow/${new URL(url)
            .toString()
            .split(/zyshow\.net/)
            .pop()}`,
      },
    ],
  },
  'ximalaya.com': {
    _name: '喜马拉雅',
    '.': [
      {
        title: '专辑',
        docs: 'https://docs.rsshub.app/multimedia.html#xi-ma-la-ya',
        source: '/:type/:id',
        target: (params) => {
          if (parseInt(params.id) + '' === params.id) {
            return '/ximalaya/:type/:id/';
          }
        },
      },
    ],
  },
  'algocasts.io': {
    _name: 'AlgoCasts',
    '.': [
      {
        title: '视频更新',
        docs: 'https://docs.rsshub.app/programming.html#algocasts',
        source: '/episodes',
        target: '/algocasts',
      },
    ],
  },
  'soulapp.cn': {
    _name: 'Soul',
    '.': [
      {
        title: '瞬间更新',
        docs: 'https://docs.rsshub.app/social-media.html#soul',
      },
    ],
  },
  'anime1.me': {
    _name: 'Anime1',
    '.': [
      {
        title: '動畫',
        docs: 'https://docs.rsshub.app/anime.html#anime1',
        source: '/category/:time/:name',
        target: '/anime1/anime/:time/:name',
      },
      {
        title: '搜尋',
        docs: 'https://docs.rsshub.app/anime.html#anime1',
        source: '/',
        target: (params, url) => {
          const keyword = new URL(url).searchParams.get('s');
          return keyword ? `/anime1/search/${keyword}` : '';
        },
      },
    ],
  },
  'swufe.edu.cn': {
    _name: '西南财经大学',
    it: [
      {
        title: '经济信息工程学院 - 通知公告',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-cai-jing-da-xue',
        source: '/index/tzgg.htm',
        target: '/swufe/seie/tzgg',
      },
      {
        title: '经济信息工程学院 - 学院新闻',
        docs: 'https://docs.rsshub.app/university.html#xi-nan-cai-jing-da-xue',
        source: '/index/xyxw.htm',
        target: '/swufe/seie/xyxw',
      },
    ],
  },
  'ishuhui.com': {
    _name: '鼠绘漫画',
    www: [
      {
        title: '鼠绘漫画',
        docs: 'https://docs.rsshub.app/anime.html#shu-hui-man-hua',
        source: '/comics/anime/:id',
        target: '/shuhui/comics/:id',
      },
    ],
  },
  'www.chicagotribune.com': {
    _name: 'Chicago Tribune',
    www: [
      {
        title: 'Chicago Tribune',
        docs: 'https://docs.rsshub.app/traditional_media.html#chicago-tribune',
        source: '/',
      },
    ],
  },
  'haimaoba.com': {
    _name: '海猫吧',
    www: [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#hai-mao-ba',
        source: '/catalog/:id',
        target: '/haimaoba/:id',
      },
    ],
  },
  'pgyer.com': {
    _name: '蒲公英应用分发',
    www: [
      {
        title: 'app更新',
        docs: 'https://docs.rsshub.app/program-update.html#pu-gong-ying-ying-yong-fen-fa',
        source: '/:app',
        target: '/pgyer/:app',
      },
    ],
  },
  'wineyun.com': {
    _name: '酒云网',
    www: [
      {
        title: '最新商品',
        docs: 'https://docs.rsshub.app/other.html#jiu-yun-wang',
        source: ['/:category'],
        target: '/wineyun/:category',
      },
    ],
  },
  'epicgames.com': {
    _name: 'Epic Games',
    www: [
      {
        title: '每周免费游戏',
        docs: 'https://docs.rsshub.app/game.html#epicgames-freegame',
        source: '/store/zh-CN/free-games',
        target: '/epicgames/freegames',
      },
    ],
  },
  'playstation.com': {
    _name: 'PlayStation',
    store: [
      {
        title: '游戏列表',
        docs: 'https://docs.rsshub.app/game.html#playstation',
        source: '/zh-hans-hk/grid/:id/:page',
        target: '/ps/list/:id',
      },
      {
        title: '折扣|价格',
        docs: 'https://docs.rsshub.app/game.html#playstation',
        source: ['/:lang/product/:gridName'],
        target: '/ps/:lang/product/:gridName',
      },
    ],
    www: [
      {
        title: '用户奖杯',
        docs: 'https://docs.rsshub.app/game.html#playstation',
      },
      {
        title: '系统更新纪录',
        docs: 'https://docs.rsshub.app/game.html#playstation',
      },
    ],
  },
  'monsterhunter.com': {
    _name: '怪物猎人世界',
    www: [
      {
        title: '更新情报',
        docs: 'https://docs.rsshub.app/game.html#guai-wu-lie-ren-shi-jie',
        source: ['', '/*tpath'],
        target: '/mhw/update',
      },
      {
        title: '最新消息',
        docs: 'https://docs.rsshub.app/game.html#guai-wu-lie-ren-shi-jie',
        source: ['', '/*tpath'],
        target: '/mhw/news',
      },
    ],
  },
  'vgtime.com': {
    _name: '游戏时光',
    www: [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/game.html#you-xi-shi-guang',
        source: '/topic/index.jhtml',
        target: '/vgtime/news',
      },
      {
        title: '游戏发售表',
        docs: 'https://docs.rsshub.app/game.html#you-xi-shi-guang',
        source: '/game/release.jhtml',
        target: '/vgtime/release',
      },
      {
        title: '关键词资讯',
        docs: 'https://docs.rsshub.app/game.html#you-xi-shi-guang',
        source: '/search/list.jhtml',
        target: (params, url) =>
          `/vgtime/keyword/${new URL(url).searchParams.get('keyword')}`,
      },
    ],
  },
  'bing.com': {
    _name: 'Bing',
    www: [
      {
        title: '每日壁纸',
        docs: 'https://docs.rsshub.app/picture.html#bing-bi-zhi',
        source: '',
        target: '/bing',
      },
    ],
  },
  'wegene.com': {
    _name: 'WeGene',
    www: [
      {
        title: '最近更新',
        docs: 'https://docs.rsshub.app/other.html#wegene',
        source: '',
        target: '/wegene/newest',
      },
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/other.html#wegene',
        source: '/crowdsourcing',
        target: '/wegene/column/all/all',
      },
    ],
  },
  'qdaily.com': {
    _name: '好奇心日报',
    www: [
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#hao-qi-xin-ri-bao',
        source: '/tags/:idd',
        target: (params) => `/qdaily/tag/${params.idd.replace('.html', '')}`,
      },
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/new-media.html#hao-qi-xin-ri-bao',
        source: '/special_columns/:idd',
        target: (params) => `/qdaily/column/${params.idd.replace('.html', '')}`,
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/new-media.html#hao-qi-xin-ri-bao',
        source: '/categories/:idd',
        target: (params) =>
          `/qdaily/category/${params.idd.replace('.html', '')}`,
      },
    ],
  },
  '3ycy.com': {
    _name: '三界异次元',
    www: [
      {
        title: '最近更新',
        docs: 'https://docs.rsshub.app/anime.html#san-jie-yi-ci-yuan',
        source: '/',
        target: '/3ycy/home',
      },
    ],
  },
  'emi-nitta.net': {
    _name: 'Emi Nitta',
    '.': [
      {
        title: '最近更新',
        docs: 'https://docs.rsshub.app/other.html#xin-tian-hui-hai-guan-fang-wang-zhan',
        source: '/updates',
        target: '/emi-nitta/updates',
      },
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/other.html#xin-tian-hui-hai-guan-fang-wang-zhan',
        source: '/contents/news',
        target: '/emi-nitta/news',
      },
    ],
  },
  'alter-shanghai.cn': {
    _name: 'Alter',
    '.': [
      {
        title: '新闻',
        docs: 'https://docs.rsshub.app/shopping.html#alter-zhong-guo',
        source: '/cn/news.html',
        target: '/alter-cn/news',
      },
    ],
  },
  'itslide.com': {
    _name: 'ITSlide',
    www: [
      {
        title: '最新',
        docs: 'https://docs.rsshub.app/programming.html#itslide',
        source: '/*',
        target: '/itslide/new',
      },
    ],
  },
  'leboncoin.fr': {
    _name: 'leboncoin',
    www: [
      {
        title: 'ads',
        docs: 'https://docs.rsshub.app/en/shopping.html#leboncoin',
        source: '/recherche',
        target: (params, url) => '/leboncoin/ad/' + url.split('?')[1],
      },
    ],
  },
  'yuancheng.work': {
    _name: '远程.work',
    '.': [
      {
        title: '招聘信息',
        docs: 'https://docs.rsshub.app/other.html#yuan-cheng-work',
        source: '/:caty',
        target: (params, url) => {
          if (!url) {
            return '/remote-work';
          }
          return '/remote-work/' + /\w+-(\w+)-\w+/.exec(url)[1];
        },
      },
    ],
  },
  'chinatimes.com': {
    _name: '中時電子報',
    www: [
      {
        title: '新聞',
        docs: 'https://docs.rsshub.app/traditional-media.html#zhong-shi-dian-zi-bao',
        source: '/:caty',
        target: (params) => '/chinatimes/' + params.caty,
      },
    ],
  },
  'govopendata.com': {
    _name: '新闻联播文字版',
    cn: [
      {
        title: '新闻联播文字版',
        docs: 'https://docs.rsshub.app/traditional-media.html#xin-wen-lian-bo-wen-zi-ban',
        source: '/xinwenlianbo',
        target: '/xinwenlianbo/index',
      },
    ],
  },
  'steampowered.com': {
    _name: 'Steam',
    store: [
      {
        title: 'search',
        docs: 'https://docs.rsshub.app/game.html#steam',
        source: '/search/',
        target: (params, url) => `/steam/search/${new URL(url).searchParams}`,
      },
    ],
  },
  'xiaomi.cn': {
    _name: '小米社区',
    www: [
      {
        title: '圈子',
        docs: 'https://docs.rsshub.app/bbs.html#xiao-mi-she-qu',
        source: '/board/:boardId',
        target: '/mi/bbs/board/:boardId',
      },
    ],
  },
  'suzhou.gov.cn': {
    _name: '苏州市政府',
    www: [
      {
        title: '政府新闻',
        docs: 'https://docs.rsshub.app/government.html#su-zhou-shi-ren-min-zheng-fu',
        source: '/szsrmzf/:uid/nav_list.shtml',
        target: '/gov/suzhou/news/:uid',
      },
    ],
  },
  'mqube.net': {
    _name: 'MQube',
    www: [
      {
        title: '全站最近更新',
        docs: 'https://docs.rsshub.app/multimedia.html#mqube',
        source: '/',
        target: '/mqube/latest',
      },
      {
        title: '全站每日排行',
        docs: 'https://docs.rsshub.app/multimedia.html#mqube',
        source: '/',
        target: '/mqube/top',
      },
      {
        title: '个人最近更新',
        docs: 'https://docs.rsshub.app/multimedia.html#mqube',
        source: '/user/:user',
        target: '/mqube/user/:user',
      },
      {
        title: '标签最近更新',
        docs: 'https://docs.rsshub.app/multimedia.html#mqube',
        source: '/search/tag/:tag',
        target: '/mqube/tag/:tag',
      },
    ],
  },
  'last.fm': {
    _name: 'Last.fm',
    www: [
      {
        title: '用户播放记录',
        docs: 'https://docs.rsshub.app/multimedia.html#last-fm',
        source: ['/user/:user', '/user/:user/*'],
        target: '/lastfm/recent/:user',
      },
      {
        title: '用户 Love 记录',
        docs: 'https://docs.rsshub.app/multimedia.html#last-fm',
        source: ['/user/:user', '/user/:user/*'],
        target: '/lastfm/loved/:user',
      },
      {
        title: '站内 Top 榜单',
        docs: 'https://docs.rsshub.app/multimedia.html#last-fm',
        source: '/charts',
        target: '/lastfm/top',
      },
    ],
  },
  'ddrk.me': {
    _name: '低端影视',
    www: [
      {
        title: '首页',
        docs: 'https://docs.rsshub.app/multimedia.html#di-duan-ying-shi',
        source: '/',
        target: '/ddrk/index',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/multimedia.html#di-duan-ying-shi',
        source: '/tag/:tag',
        target: '/ddrk/tag/:tag',
      },
      {
        title: '分类',
        docs: 'https://docs.rsshub.app/multimedia.html#di-duan-ying-shi',
        source: ['/category/:category', '/category/:uplevel/:category'],
        target: '/ddrk/category/:category',
      },
      {
        title: '影视剧集更新',
        docs: 'https://docs.rsshub.app/multimedia.html#di-duan-ying-shi',
        source: ['/:name', '/:name/:season'],
        target: (params) => {
          if (
            params.name !== 'category' &&
            params.name !== 'tag' &&
            params.name !== 'ddrklogin' &&
            params.name !== 'about' &&
            params.name !== 'deleted'
          ) {
            return `/ddrk/update/${params.name}${
              params.season ? '/' + params.season : ''
            }`;
          }
        },
      },
    ],
  },
  'hackerone.com': {
    _name: 'HackerOne',
    '.': [
      {
        title: 'HackerOne Hacker Activity',
        docs: 'https://docs.rsshub.app/other.html#hackerone-hacker-activity',
        source: '/hacktivity',
        target: '/hackerone/hacktivity',
      },
    ],
  },
  'cowlevel.net': {
    _name: '奶牛关',
    '.': [
      {
        title: '元素文章',
        docs: 'https://docs.rsshub.app/game.html#nai-niu-guan',
        source: ['/element/:id', '/element/:id/article'],
        target: '/cowlevel/element/:id',
      },
    ],
  },
  'ynu.edu.cn': {
    _name: '云南大学',
    home: [
      {
        title: '官网消息通告',
        docs: 'https://docs.rsshub.app/university.html#yun-nan-da-xue',
        source: '/tzgg.htm',
        target: '/ynu/home',
      },
    ],
    jwc: [
      {
        title: '教务处教务科通知',
        docs: 'https://docs.rsshub.app/university.html#yun-nan-da-xue',
        source: '/*',
        target: '/jwc/1',
      },
      {
        title: '教务处学籍科通知',
        docs: 'https://docs.rsshub.app/university.html#yun-nan-da-xue',
        source: '/*',
        target: '/jwc/2',
      },
      {
        title: '教务处教学研究科通知',
        docs: 'https://docs.rsshub.app/university.html#yun-nan-da-xue',
        source: '/*',
        target: '/jwc/3',
      },
      {
        title: '教务处实践科学科通知',
        docs: 'https://docs.rsshub.app/university.html#yun-nan-da-xue',
        source: '/*',
        target: '/jwc/4',
      },
    ],
    grs: [
      {
        title: '研究生院通知',
        docs: 'https://docs.rsshub.app/university.html#yun-nan-da-xue',
        source: '/*',
        target: '',
      },
    ],
  },
  'gongxue.cn': {
    _name: '工学网',
    '.': [
      {
        title: '要闻',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/gongxue/yw',
      },
      {
        title: '时讯',
        docs: 'https://docs.rsshub.app/university.html#ha-er-bin-gong-cheng-da-xue',
        source: '/*',
        target: '/heu/gongxue/sx',
      },
    ],
  },
  'japanpost.jp': {
    _name: '日本郵便',
    'trackings.post': [
      {
        title: '郵便・荷物の追跡',
        docs: 'https://docs.rsshub.app/other.html#ri-ben-you-bian-you-bian-zhui-ji-サービス',
        source: '/services/srv/search/direct',
        target: (params, url) => {
          const reqCode = new URL(url).searchParams
            .get('reqCodeNo1')
            .toUpperCase();
          const locale = new URL(url).searchParams.get('locale').toLowerCase();
          if (
            (reqCode.search(/^(?:\d{11,12}|[A-Z]{2}\d{9}[A-Z]{2})$/) === 0 &&
              locale === 'ja') ||
            locale === 'en'
          ) {
            return `/japanpost/track/${reqCode}/${locale}`;
          }
        },
      },
    ],
  },
  'matters.news': {
    _name: 'Matters',
    '.': [
      {
        title: '最新排序',
        docs: 'https://docs.rsshub.app/new-media.html#matters',
        source: '',
        target: '/matters/latest',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/new-media.html#matters',
        source: '/tags/:tid',
        target: '/matters/tags/:tid',
      },
      {
        title: '作者',
        docs: 'https://docs.rsshub.app/new-media.html#matters',
        source: ['/:id', '/:id/comments'],
        target: (params) => {
          const uid = params.id.replace('@', '');
          return uid ? `/matters/author/${uid}` : '';
        },
      },
    ],
  },
  'zhaishuyuan.com': {
    _name: '斋书苑',
    '.': [
      {
        title: '最新章节',
        docs: 'https://docs.rsshub.app/reading.html#zhai-shu-yuan',
        source: ['/book/:id', '/read/:id'],
        target: '/novel/zhaishuyuan/:id',
      },
    ],
  },
  'hbut.edu.cn': {
    _name: '湖北工业大学',
    www: [
      {
        title: '新闻中心',
        docs: 'http://docs.rsshub.app/university.html#hu-bei-gong-ye-da-xue',
        source: '/xwzx/:name',
        target: (params) => {
          const type = params.name.replace('.htm', '');
          return type ? `/hbut/news/${type}` : '/hbut/news/tzgg';
        },
      },
    ],
    jsjxy: [
      {
        title: '新闻动态',
        docs: 'http://docs.rsshub.app/university.html#hu-bei-gong-ye-da-xue',
        source: '/index/xwdt.htm',
        target: '/hbut/cs/xwdt',
      },
      {
        title: '通知公告',
        docs: 'http://docs.rsshub.app/university.html#hu-bei-gong-ye-da-xue',
        source: '/index/tzgg.htm',
        target: '/hbut/cs/tzgg',
      },
      {
        title: '教学信息',
        docs: 'http://docs.rsshub.app/university.html#hu-bei-gong-ye-da-xue',
        source: '/jxxx.htm',
        target: '/hbut/cs/jxxx',
      },
      {
        title: '科研动态',
        docs: 'http://docs.rsshub.app/university.html#hu-bei-gong-ye-da-xue',
        source: '/kxyj/kydt.htm',
        target: '/hbut/cs/kydt',
      },
      {
        title: '党建活动',
        docs: 'http://docs.rsshub.app/university.html#hu-bei-gong-ye-da-xue',
        source: '/djhd/djhd.htm',
        target: '/hbut/cs/djhd',
      },
    ],
  },
  'zhuixinfan.com': {
    _name: '追新番日剧站',
    '.': [
      {
        title: '更新列表',
        docs: 'https://docs.rsshub.app/multimedia.html#zhui-xin-fan-ri-ju-zhan',
        source: ['/main.php'],
        target: '/zhuixinfan/list',
      },
    ],
  },
  'etoland.co.kr': {
    _name: 'eTOLAND',
    '.': [
      {
        title: '主题贴',
        docs: 'https://docs.rsshub.app/bbs.html#etoland',
        source: ['/bbs/board.php', '/plugin/mobile/board.php'],
        target: (params, url) =>
          `/etoland/${new URL(url).searchParams.get('bo_table')}`,
      },
    ],
  },
  'onejav.com': {
    _name: 'OneJAV BT',
    '.': [
      {
        title: '今日种子',
        docs: 'https://docs.rsshub.app/multimedia.html#onejav',
        source: '/',
        target: (params, url, document) => {
          const today = document
            .querySelector('div.card.mb-1.card-overview')
            .getAttribute('data-date')
            .replace(/-/g, '');
          return `/onejav/day/${today}`;
        },
      },
      {
        title: '今日演员',
        docs: 'https://docs.rsshub.app/multimedia.html#onejav',
        source: '/',
        target: (params, url, document) => {
          const star = document
            .querySelector('div.card-content > div > a')
            .getAttribute('href');
          return `/onejav${star}`;
        },
      },
      {
        title: '页面种子',
        docs: 'https://docs.rsshub.app/multimedia.html#onejav',
        source: ['/:type', '/:type/:key', '/:type/:key/:morekey'],
        target: (params, url, document) => {
          const itype =
            params.morekey === undefined
              ? params.type
              : params.type === 'tag'
              ? 'tag'
              : 'day';
          let ikey = `${itype === 'day' ? params.type : ''}${params.key || ''}${
            itype === 'tag' && params.morekey !== undefined ? '%2F' : ''
          }${params.morekey || ''}`;
          if (ikey === '' && itype === 'tag') {
            ikey = document
              .querySelector('div.thumbnail.is-inline > a')
              .getAttribute('href')
              .replace('/tag/', '')
              .replace('/', '%2F');
          } else if (ikey === '' && itype === 'actress') {
            ikey = document
              .querySelector('div.card > a')
              .getAttribute('href')
              .replace('/actress/', '');
          }
          return `/onejav/${itype}/${ikey}`;
        },
      },
    ],
  },
  '141jav.com': {
    _name: '141JAV BT',
    '.': [
      {
        title: '今日种子',
        docs: 'https://docs.rsshub.app/multimedia.html#141jav',
        source: '/',
        target: (params, url, document) => {
          const today = document
            .querySelector('div.card.mb-1.card-overview')
            .getAttribute('data-date')
            .replace(/-/g, '');
          return `/141jav/day/${today}`;
        },
      },
      {
        title: '今日演员',
        docs: 'https://docs.rsshub.app/multimedia.html#141jav',
        source: '/',
        target: (params, url, document) => {
          const star = document
            .querySelector('div.card-content > div > a')
            .getAttribute('href');
          return `/141jav${star}`;
        },
      },
      {
        title: '页面种子',
        docs: 'https://docs.rsshub.app/multimedia.html#141jav',
        source: ['/:type', '/:type/:key', '/:type/:key/:morekey'],
        target: (params, url, document) => {
          const itype =
            params.morekey === undefined
              ? params.type
              : params.type === 'tag'
              ? 'tag'
              : 'day';
          let ikey = `${itype === 'day' ? params.type : ''}${params.key || ''}${
            itype === 'tag' && params.morekey !== undefined ? '%2F' : ''
          }${params.morekey || ''}`;
          if (ikey === '' && itype === 'tag') {
            ikey = document
              .querySelector('div.thumbnail.is-inline > a')
              .getAttribute('href')
              .replace('/tag/', '')
              .replace('/', '%2F');
          } else if (ikey === '' && itype === 'actress') {
            ikey = document
              .querySelector('div.card > a')
              .getAttribute('href')
              .replace('/actress/', '');
          }
          return `/141jav/${itype}/${ikey}`;
        },
      },
    ],
  },
  '141ppv.com': {
    _name: '141ppv BT',
    '.': [
      {
        title: '今日种子',
        docs: 'https://docs.rsshub.app/multimedia.html#141pvp',
        source: '/',
        target: (params, url, document) => {
          const today = document
            .querySelector('div.card.mb-1.card-overview')
            .getAttribute('data-date')
            .replace(/-/g, '');
          return `/141ppv/day/${today}`;
        },
      },
      {
        title: '今日演员',
        docs: 'https://docs.rsshub.app/multimedia.html#141ppv',
        source: '/',
        target: (params, url, document) => {
          const star = document
            .querySelector('div.card-content > div > a')
            .getAttribute('href');
          return `/141ppv${star}`;
        },
      },
      {
        title: '页面种子',
        docs: 'https://docs.rsshub.app/multimedia.html#141ppv',
        source: ['/:type', '/:type/:key', '/:type/:key/:morekey'],
        target: (params, url, document) => {
          const itype =
            params.morekey === undefined
              ? params.type
              : params.type === 'tag'
              ? 'tag'
              : 'day';
          let ikey = `${itype === 'day' ? params.type : ''}${params.key || ''}${
            itype === 'tag' && params.morekey !== undefined ? '%2F' : ''
          }${params.morekey || ''}`;
          if (ikey === '' && itype === 'tag') {
            ikey = document
              .querySelector('div.thumbnail.is-inline > a')
              .getAttribute('href')
              .replace('/tag/', '')
              .replace('/', '%2F');
          } else if (ikey === '' && itype === 'actress') {
            ikey = document
              .querySelector('div.card > a')
              .getAttribute('href')
              .replace('/actress/', '');
          }
          return `/141ppv/${itype}/${ikey}`;
        },
      },
    ],
  },
  'sexinsex.net': {
    _name: 'sexinsex',
    '.': [
      {
        title: '分区帖子',
        docs: 'https://docs.rsshub.app/multimedia.html#sexinsex',
        source: '/bbs/:path',
        target: (params, url) => {
          let pid, typeid;
          const static_matched = params.path.match(/forum-(\d+)-\d+.html/);
          if (static_matched) {
            pid = static_matched[1];
          } else if (params.path === 'forumdisplay.php') {
            pid = new URL(url).searchParams.get('fid');
            typeid = new URL(url).searchParams.get('typeid');
          } else {
            return false;
          }
          return `/sexinsex/${pid}/${typeid ? typeid : ''}`;
        },
      },
    ],
  },
  't66y.com': {
    _name: '草榴社区',
    www: [
      {
        title: '分区帖子',
        docs: 'https://docs.rsshub.app/multimedia.html#cao-liu-she-qu',
        source: '/thread0806.php',
        target: (params, url) => {
          const id = new URL(url).searchParams.get('fid');
          const type = new URL(url).searchParams.get('type');
          return `/t66y/${id}/${type ? type : ''}`;
        },
      },
    ],
  },
  'umass.edu': {
    _name: 'UMASS Amherst',
    ece: [
      {
        title: 'ECE News',
        docs: 'http://docs.rsshub.app/en/university.html#umass-amherst',
        source: '/news',
        target: '/umass/amherst/ecenews',
      },
      {
        title: 'ECE Seminar',
        docs: 'http://docs.rsshub.app/en/university.html#umass-amherst',
        source: '/seminars',
        target: '/umass/amherst/eceseminar',
      },
    ],
    'www.cics': [
      {
        title: 'CICS News',
        docs: 'http://docs.rsshub.app/en/university.html#umass-amherst',
        source: '/news',
        target: '/umass/amherst/csnews',
      },
    ],
    www: [
      {
        title: 'IPO Events',
        docs: 'http://docs.rsshub.app/en/university.html#umass-amherst',
        source: '/ipo/iss/events',
        target: '/umass/amherst/ipoevents',
      },
      {
        title: 'IPO Featured Stories',
        docs: 'http://docs.rsshub.app/en/university.html#umass-amherst',
        source: '/ipo/iss/featured-stories',
        target: '/umass/amherst/ipostories',
      },
    ],
  },
  'bjeea.com': {
    _name: '北京考试院',
    www: [
      {
        title: '首页 / 通知公告',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-jiao-yu-kao-shi-yuan',
        source: ['/html/bjeeagg'],
        target: '/gov/beijing/bjeea/bjeeagg',
      },
      {
        title: '首页 / 招考政策',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-jiao-yu-kao-shi-yuan',
        source: ['/html/zkzc'],
        target: '/gov/beijing/bjeea/zkzc',
      },
      {
        title: '首页 / 自考快递',
        docs: 'https://docs.rsshub.app/government.html#bei-jing-jiao-yu-kao-shi-yuan',
        source: ['/html/zkkd'],
        target: '/gov/beijing/bjeea/zkkd',
      },
    ],
  },
  'popiapp.cn': {
    _name: 'Popi 提问箱',
    www: [
      {
        title: '提问箱新回答',
        docs: 'https://docs.rsshub.app/social-media.html#popi-ti-wen-xiang',
        source: '/:id',
        target: (params) => {
          if (params.id) {
            return '/popiask/:id';
          }
        },
      },
    ],
  },
  'nppa.gov.cn': {
    _name: '国家新闻出版署',
    www: [
      {
        title: '栏目',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-xin-wen-chu-ban-shu',
        source: '/nppa/channels/:channel',
        target: (params, url) =>
          `/gov/nppa/${/nppa\/channels\/(\d+)\.shtml/.exec(url)[1]}`,
      },
      {
        title: '内容',
        docs: 'https://docs.rsshub.app/government.html#guo-jia-xin-wen-chu-ban-shu',
        source: '/nppa/contents/:channel/:content',
        target: (params, url) =>
          `/gov/nppa/${/nppa\/contents\/(\d+\/\d+)\.shtml/.exec(url)[1]}`,
      },
    ],
  },
  'jjmhw.cc': {
    _name: '漫小肆',
    www: [
      {
        title: '漫画更新',
        docs: 'https://docs.rsshub.app/anime.html#man-xiao-si',
        source: '/book/:id',
        target: '/manxiaosi/book/:id',
      },
    ],
  },
  'wenxuecity.com': {
    _name: '文学城',
    blog: [
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/bbs.html#wen-xue-cheng-bo-ke',
        source: '/myblog/:id',
        target: '/wenxuecity/blog/:id',
      },
      {
        title: '博客',
        docs: 'https://docs.rsshub.app/bbs.html#wen-xue-cheng-bo-ke',
        source: '/myoverview/:id',
        target: '/wenxuecity/blog/:id',
      },
    ],
    bbs: [
      {
        title: '最新主题',
        docs: 'https://docs.rsshub.app/bbs.html#wen-xue-cheng-zui-xin-zhu-ti',
        source: '/:cat',
        target: '/wenxuecity/bbs/:cat',
      },
      {
        title: '最新主题 - 精华区',
        docs: 'https://docs.rsshub.app/bbs.html#wen-xue-cheng-zui-xin-zhu-ti',
        source: '/:cat',
        target: '/wenxuecity/bbs/:cat/1',
      },
      {
        title: '最热主题',
        docs: 'https://docs.rsshub.app/bbs.html#wen-xue-cheng-zui-re-zhu-ti',
        source: '/?cid=*',
        target: (params, url, document) => {
          const cid =
            document && new URL(document.location).searchParams.get('cid');
          return `/wenxuecity/hot/${cid}`;
        },
      },
    ],
  },
  'buaq.net': {
    _name: '不安全资讯',
    '.': [
      {
        title: '不安全资讯',
        docs: 'http://docs.rsshub.app/new-media.html#bu-an-quan',
        source: '/',
        target: '/buaq',
      },
    ],
  },
  'jian-ning.com': {
    _name: '建宁闲谈',
    '.': [
      {
        title: '文章',
        docs: 'https://docs.rsshub.app/blog.html#jian-ning-xian-tan',
        source: '/*',
        target: '/blogs/jianning',
      },
    ],
  },
  'matataki.io': {
    _name: 'matataki',
    www: [
      {
        title: '最热作品',
        docs: 'https://docs.rsshub.app/new-media.html#matataki',
        source: '/article/',
        target: '/matataki/posts/hot',
      },
      {
        title: '最新作品',
        docs: 'https://docs.rsshub.app/new-media.html#matataki',
        source: '/article/latest',
        target: '/matataki/posts/latest',
      },
      {
        title: '作者创作',
        docs: 'https://docs.rsshub.app/new-media.html#matataki',
        source: '/user/:uid',
        target: (params) => `/matataki/users/${params.uid}/posts`,
      },
      {
        title: 'Fan票关联作品',
        docs: 'https://docs.rsshub.app/new-media.html#matataki',
        source: ['/token/:tokenId', '/token/:tokenId/circle'],
        target: (params) => `/matataki/tokens/${params.tokenId}/posts`,
      },
      {
        title: '标签关联作品',
        docs: 'https://docs.rsshub.app/new-media.html#matataki',
        source: ['/tag/:tagId'],
        target: (params, url) => {
          const tagName = new URL(url).searchParams.get('name');
          return `/matataki/tags/${params.tagId}/${tagName}/posts`;
        },
      },
      {
        title: '收藏夹',
        docs: 'https://docs.rsshub.app/new-media.html#matataki',
        source: '/user/:uid/favlist/:fid',
        target: (params) =>
          `/matataki/users/${params.uid}/favorites/${params.fid}/posts`,
      },
    ],
  },
  'huya.com': {
    _name: '虎牙直播',
    '.': [
      {
        title: '直播间开播',
        docs: 'https://docs.rsshub.app/live.html#hu-ya-zhi-bo-zhi-bo-jian-kai-bo',
        source: '/:id',
        target: '/huya/live/:id',
      },
    ],
  },
  'craigslist.org': {
    _name: 'Craigslist',
    '.': [
      {
        title: '商品搜索列表',
        docs: 'https://docs.rsshub.app/shopping.html#craigslist',
      },
    ],
  },
  'scboy.com': {
    _name: 'scboy 论坛',
    www: [
      {
        title: '帖子',
        docs: 'https://docs.rsshub.app/bbs.html#scboy',
        source: '',
        target: (params, url) => {
          const id = url.includes('thread')
            ? url.split('-')[1].split('.')[0]
            : '';
          return id ? `/scboy/thread/${id}` : '';
        },
      },
    ],
  },
  'cqut.edu.cn': {
    _name: '重庆理工大学',
    tz: [
      {
        title: '通知',
        docs: 'https://docs.rsshub.app/university.html#chong-qing-li-gong-da-xue',
        source: '/*',
      },
    ],
    lib: [
      {
        title: '图书馆通知',
        docs: 'https://docs.rsshub.app/university.html#chong-qing-li-gong-da-xue',
        source: '/*',
      },
    ],
  },
  'trakt.tv': {
    _name: 'Trakt.tv',
    '.': [
      {
        title: '用户收藏',
        docs: 'https://docs.rsshub.app/multimedia.html#trakt-tv-yong-hu-shou-cang',
        source: [
          '/users/:username/collection/:type/added',
          '/users/:username/collection',
        ],
        target: (params) =>
          `/trakt/collection/${params.username}/${params.type || 'all'}`,
      },
    ],
  },
  'furaffinity.net': {
    _name: 'Fur Affinity',
    www: [
      {
        title: '主页',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/',
        target: '/furaffinity/home',
      },
      {
        title: '浏览',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/browse/',
        target: '/furaffinity/browse',
      },
      {
        title: '站点状态',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/',
        target: '/furaffinity/status',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/search/',
        target: (params, url) => {
          const keyword = new URL(url).searchParams.get('q');
          if (keyword) {
            return `/furaffinity/search/${keyword}`;
          }
        },
      },
      {
        title: '用户主页简介',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/user/:username/',
        target: '/furaffinity/user/:username',
      },
      {
        title: '用户关注列表',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/watchlist/by/:username/',
        target: '/furaffinity/watching/:username',
      },
      {
        title: '用户被关注列表',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/watchlist/to/:username/',
        target: '/furaffinity/watchers/:username',
      },
      {
        title: '用户接受委托信息',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/commissions/:username/',
        target: '/furaffinity/commissions/:username',
      },
      {
        title: '用户的 Shouts 留言',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/user/:username/',
        target: '/furaffinity/shouts/:username',
      },
      {
        title: '用户的日记',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/journals/:username/',
        target: '/furaffinity/journals/:username',
      },
      {
        title: '用户的创作画廊',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/gallery/:username/',
        target: '/furaffinity/gallery/:username',
      },
      {
        title: '用户非正式作品',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/scraps/:username/',
        target: '/furaffinity/scraps/:username',
      },
      {
        title: '用户的喜爱列表',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/favorites/:username/',
        target: '/furaffinity/favorites/:username',
      },
      {
        title: '作品评论区',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/view/:id/',
        target: '/furaffinity/submission_comments/:id',
      },
      {
        title: '日记评论区',
        docs: 'https://docs.rsshub.app/social-media.html#fur-affinity',
        source: '/journal/:id/',
        target: '/furaffinity/journal_comments/:id',
      },
    ],
  },
  'e-hentai.org/': {
    _name: 'E-Hentai',
    '.': [
      {
        title: '收藏',
        docs: 'https://docs.rsshub.app/picture.html#ehentai',
        source: '/favorites.php',
        target: '/ehentai/favorites',
      },
      {
        title: '标签',
        docs: 'https://docs.rsshub.app/picture.html#ehentai',
        source: '/tag/:tag',
        target: '/ehentai/tag/:tag',
      },
      {
        title: '搜索',
        docs: 'https://docs.rsshub.app/picture.html#ehentai',
        source: '/',
        target: (params, url) => {
          const keyword = new URL(url).searchParams.toString();
          if (keyword) {
            return `/ehentai/search/${keyword}`;
          }
        },
      },
    ],
  },
  'macwk.com': {
    _name: 'MacWk',
    '.': [
      {
        title: '应用更新',
        docs: 'https://docs.rsshub.app/program-update.html#macwk',
        source: '/soft/:name',
        target: '/macwk/soft/:name',
      },
    ],
  },
};
