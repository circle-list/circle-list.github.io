export default {
    menu: [
        {
            name: 'メモ',
            url: '/memo',
            icon: 'mdi-pen'
        }, {
            name: '情報',
            url: '/status',
            icon: 'mdi-information-outline'
        }, {
            name: 'バックアップ/復元',
            url: '/backup',
            icon: 'mdi-backup-restore'
        }, {
            name: '設定',
            url: '/settings',
            icon: 'mdi-cog'
        }
    ],

    navigation : [
        {
            name: 'ホーム',
            url: '/',
            icon: 'mdi-home'
        }, {
            name: 'サークル',
            url: '/circles',
            icon: 'mdi-format-list-checks'
        }, {
            name: 'マップ',
            url: '/map',
            icon: 'mdi-map'
        }
    ],

    comiketData: {
        date: [1, 2, 3, 4],
        date_jp: ['日曜日', '月曜日', '火曜日', '水曜日'],
        islands: {
            1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
            2: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ'],
            3: ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ' , 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'],
            4: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ']
        },
        numbers: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
        tables: ['a', 'b', 'ab']
    }
}