var _moment = require('moment');

var logger = require('../module/logger')(module);
require('./types');

// // RSA private/public key
// logger.info('generating RSA keypair ...')
// var jsencrypt = new (require('../utils/jsencrypt'))({
//     default_key_size: 2048,
// });
// console.log('private key', jsencrypt.getPrivateKey());
// console.log('public key', jsencrypt.getPublicKey());
// return;

var now_datetime = _moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ')

module.exports = {
    baseurl: {
        console: '/console',
        gateway: '/gateway',
        service: '/service'
    },
    es_version: 6,
    cookie: {
        locale: 'openquery-console-locale'
    },
    morgan: {
        format: '":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
    },
    date: {
        format: {
            timezone: 'Z',
            date_time: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
            date_time_no_millis: 'YYYY-MM-DDTHH:mm:ssZ',
            date: 'YYYY-MM-DD',
            date_hour: 'YYYY-MM-DD HH',
            date_hour_minute: 'YYYY-MM-DD HH:mm',
            date_hour_minute_second: 'YYYY-MM-DD HH:mm:ss',
            yyyymmdd: 'YYYYMMDD',
            csv: 'YYYYMMDD-hhmmss-SSS'
        }
    },
    schedule: {
        system: '10 0 * * *',
        monitor: '0-59/10 * * * * *',
        dropindex: '30 0 * * *',
        popquery: '0 * * * *',
        speller: '0-59/10 * * * * *',
        autocomplete: '0 * * * *',
        related: '0 * * * *',
    },
    menu: {
        10: {
            use: true,
            path: 'dashboard',
            name: '${message_menu_dashboard}',
            html: '<ul class="clk" type="${path}"><li class="ig ion ion-monitor"></li><li class="txt">${name}</li></ul>',
            quick: ['대시보드', 'Dashboard'],
            submenu: {
            }
        },
        20: {
            use: true,
            path: 'cluster',
            name: '${message_menu_cluter}',
            html: '<ul class="clk" type="${path}"><li class="ig ion ion-social-buffer"></li><li class="txt">${name}</li></ul>',
            quick: ['클러스터', 'Cluster'],
            submenu: {
                10: {
                    use: true,
                    path: 'overview',
                    name: '${message_menu_cluter_overview}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['OverView']
                },
                20: {
                    use: true,
                    path: 'routing',
                    name: '${message_menu_cluter_routing}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['라우팅', 'Routing']
                }
            }
        },
        30: {
            use: true,
            path: 'stats',
            name: '${message_menu_stats}',
            html: '<ul class="clk" type="${path}"><li class="ig ion ion-stats-bars"></li><li class="txt">${name}</li></ul>',
            quick: ['통계', 'Statistics'],
            submenu: {
                10: {
                    use: true,
                    path: 'query',
                    name: '${message_menu_stats_query}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['검색어통계', 'Query Statistics']
                },
                20: {
                    use: true,
                    path: 'popquery',
                    name: '${message_menu_service_popquery}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['인기검색어', 'Popular Query']
                },
                30: {
                    use: false,
                    path: 'trend',
                    name: '${message_menu_stats_trend}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['트랜드분석', 'Trend Analysis']
                },
                40: {
                    use: true,
                    path: 'data',
                    name: '${message_menu_stats_data}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['데이터조회', 'Data Search']
                }
            }
        },
        35: {
            use: true,
            path: 'management',
            name: '${message_menu_management}',
            html: '<ul class="clk" type="${path}"><li class="ig ion ion-ios-list"></li><li class="txt">${name}</li></ul>',
            quick: ['색인관리', 'Index Management'],
            submenu: {
                10: {
                    use: true,
                    path: 'templates',
                    name: '${message_menu_management_templates}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['색인템플릿', 'Index Template']
                },
                20: {
                    use: true,
                    path: 'indices',
                    name: '${message_menu_management_indices}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['색인구성', 'Index Schema']
                }
            }
        },
        40: {
            use: true,
            path: 'service',
            name: '${message_menu_service}',
            html: '<ul class="clk" type="${path}"><li class="ig ion ion-cube"></li><li class="txt">${name}</li></ul>',
            quick: ['서비스', 'Service'],
            submenu: {
                10: {
                    use: true,
                    path: 'theme',
                    name: '${message_menu_service_theme}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['검색어테마', 'Theme Keyword']
                },
                20: {
                    use: true,
                    path: 'recommend',
                    name: '${message_menu_dictionary_recommend}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['추천검색어', 'Recommend']
                },
                30: {
                    use: true,
                    path: 'related',
                    name: '${message_menu_dictionary_related}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['연관검색어', 'Related']
                }
            }
        },
        50: {
            use: true,
            path: 'dictionary',
            name: '${message_menu_dictionary}',
            html: '<ul class="clk" type="${path}"><li class="ig ion ion-ios-bookmarks"></li><li class="txt">${name}</li></ul>',
            quick: ['사전', 'Dictionary'],
            submenu: {
                10: {
                    use: true,
                    path: 'autocomplete',
                    name: '${message_menu_dictionary_autocomplete}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['자동완성', 'Auto-Complete']
                },
                20: {
                    use: true,
                    path: 'speller',
                    name: '${message_menu_dictionary_speller}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['오타교정', 'Speller']
                },
                30: {
                    use: true,
                    path: 'kobrick',
                    name: '${message_menu_dictionary_kobrick}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['형태소사전', 'Dictionary', 'KoBRICK']
                }
            }
        },
        60: {
            use: true,
            path: 'system',
            name: '${message_menu_system}',
            html: '<ul class="clk" type="${path}"><li class="ig ion ion-gear-a"></li><li class="txt">${name}</li></ul>',
            quick: ['시스템설정', 'System'],
            submenu: {
                10: {
                    use: true,
                    path: 'status',
                    name: '${message_menu_system_status}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['시스템현황', 'System Environment']
                },
                20: {
                    use: true,
                    path: 'alert',
                    name: '${message_menu_system_alert}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['알림조회', 'Alert']
                },
                30: {
                    use: true,
                    path: 'users',
                    name: '${message_menu_system_users}',
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ['사용자관리', 'User Management']
                }
            }
        },
        70: {
            use: true,
            path: "toolkit",
            name: "${message_menu_toolkit}",
            html:
                '<ul class="clk" type="${path}"><li class="ig ion ion-medkit"></li><li class="txt">${name}</li></ul>',
            quick: ["점검도구", "toolkit"],
            submenu: {
                10: {
                    use: true,
                    path: "morpheme",
                    name: "${message_menu_toolkit_morpheme}",
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ["형태소분석", "Morpheme Analysis"],
                },
                20: {
                    use: true,
                    path: "diagnosis",
                    name: "${message_menu_toolkit_diagnosis}",
                    html: '<ul class="clk" type="${path}"><li>${name}</li></ul>',
                    quick: ["ES 진단", "ES Diagnosis"],
                },
            },
        }
    },
    data: {
        openquery: {
            client: 'service',
            template: {
                name: '.openquery',
                body: {
                    index_patterns: ['.openquery'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                account: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        username: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        salt: {
                                            type: 'text',
                                            index: false
                                        },
                                        password: {
                                            type: 'text',
                                            index: false
                                        },
                                        password_changed: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        password_mismatch: {
                                            type: 'long'
                                        },
                                        activated: {
                                            type: 'boolean',
                                        },
                                        name: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        },
                                        email: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                simple: {
                                                    type: 'text',
                                                    analyzer: 'simple'
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        },
                                        optionsJSON: {
                                            type: 'text',
                                        }
                                    }
                                },
                                alert: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        confirm: {
                                            type: 'boolean'
                                        },
                                        level: {
                                            type: 'text', // info, error
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        code: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        section: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        message: {
                                            type: 'text',
                                            analyzer: 'standard'
                                        },
                                        details: {
                                            type: 'text',
                                            analyzer: 'standard'
                                        }
                                    }
                                },
                                querystats: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        title: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        desc: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        indices: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        }
                                    }
                                },
                                popquery: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        query_stats_label: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        title: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        desc: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        optionsJSON: {
                                            type: 'text'
                                        },
                                        lastrun: {
                                            type: 'date',
                                            format: 'date_time'
                                        }
                                    }
                                },
                                theme: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        title: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        desc: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        }
                                    }
                                },
                                recommend: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        title: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        desc: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        }
                                    }
                                },
                                speller: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        title: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        desc: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        }
                                    }
                                },
                                autocomplete: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        title: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        desc: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        optionsJSON: {
                                            type: 'text'
                                        },
                                        configsJSON: {
                                            type: 'text'
                                        },
                                        lastrun: {
                                            type: 'date',
                                            format: 'date_time'
                                        }
                                    }
                                },
                                related: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        title: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        desc: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        optionsJSON: {
                                            type: 'text'
                                        },
                                        configsJSON: {
                                            type: 'text'
                                        },
                                        lastrun: {
                                            type: 'date',
                                            format: 'date_time'
                                        }
                                    }
                                },
                                prefer: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        popquery_id: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        query: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        },
                                        rank: {
                                            type: 'integer'
                                        },
                                        use: {
                                            type: 'boolean'
                                        }
                                    }
                                },
                                forbid: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        popquery_id: {
                                            type: 'text',
                                            analyzer: 'keyword'
                                        },
                                        query: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        }
                                    }
                                },
                                settings: {
                                    properties: {
                                        settingsJSON: {
                                            type: 'text'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery',
                defaults: [
                    {
                        id: 'account:' + uuid(),
                        doc: {
                            account: {
                                timestamp: now_datetime,
                                madeby: 'admin',
                                username: 'admin',
                                salt: '53801b001bb1152ba394292678a6a51684e16b37f936206a5667a0344be6f4cc754fc1c4315fcaab0fde84600f65caf58d5e574a2ebd701bf061394d0515af1e',
                                password: '864045c5fc0ce210b3d7a7e55f64c7a3500b003ffcde8f13b895ffbcfc2e0aed821aa8f6996ca3b7c7d4fd2bcf3ab9d519b99c01d9eeb170c5d7e8b3321a98ca',
                                password_changed: null,
                                password_mismatch: 0,
                                activated: true,
                                name: 'Admin',
                                email: 'admin@admin.com',
                                optionsJSON: JSON.stringify({
                                    authority: {
                                        read: {
                                            '*': true
                                        },
                                        write: {
                                            '*': true
                                        }
                                    },
                                    indices: {
                                        '*': true
                                    }
                                })
                            }
                        }
                    },
                    {
                        id: 'alert:' + uuid(),
                        doc: {
                            alert: {
                                timestamp: now_datetime,
                                confirm: true,
                                level: 'info',
                                code: '0',
                                section: 'Install',
                                message: 'openQuery was installed',
                                details: ''
                            }
                        }
                    },
                    {
                        id: 'querystats:_all',
                        doc: {
                            querystats: {
                                timestamp: now_datetime,
                                madeby: 'admin',
                                label: '*',
                                title: 'All',
                                desc: 'Statistics for all queries',
                                indices: []
                            }
                        }
                    },
                    {
                        id: 'settings:settings',
                        doc: {
                            settings: {
                                settingsJSON: JSON.stringify({
                                    drop: {
                                        monitor: 7,
                                        querylog: 30
                                    }
                                })
                            }
                        }
                    }
                ]
            }
        },
        autocomplete: {
            client: 'service',
            template: {
                name: '.openquery-autocomplete',
                body: {
                    index_patterns: ['.openquery-autocomplete_*'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        max_result_window: 10000000,
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                },
                                keyword_analyzer: {
                                    tokenizer: 'keyword',
                                    filter: [
                                        'lowercase'
                                    ]
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                },
                                whitespace_path_tokenizer: {
                                    type: 'path_hierarchy',
                                    delimiter: ' ',
                                    reverse: true
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                keyword: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword_analyzer',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        },
                                        autocomplete: {
                                            type: 'text',
                                            analyzer: 'autocomplete_index',
                                            search_analyzer: 'autocomplete_search'
                                        },
                                        autocomplete_middle: {
                                            type: 'text',
                                            analyzer: 'autocomplete_index_middle',
                                            search_analyzer: 'autocomplete_search'
                                        },
                                        autocomplete_reverse: {
                                            type: 'text',
                                            analyzer: 'autocomplete_index_reverse',
                                            search_analyzer: 'autocomplete_search'
                                        }
                                    }
                                },
                                weight: {
                                    type: 'short'
                                },
                                custom: {
                                    type: 'text',
                                    index: false
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-autocomplete_',
                defaults: []
            }
        },
        autocomplete_stopword: {
            client: 'service',
            template: {
                name: '.openquery-autocomplete-stopword',
                body: {
                    index_patterns: ['.openquery-autocomplete-stopword'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        max_result_window: 10000000,
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                },
                                keyword_analyzer: {
                                    tokenizer: 'keyword',
                                    filter: [
                                        'lowercase'
                                    ]
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                label: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                term: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-autocomplete-stopword',
                defaults: []
            }
        },
        kobrick: {
            client: 'service',
            template: {
                name: '.openquery-kobrick',
                body: {
                    index_patterns: ['.openquery-kobrick'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                type: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                usernoun: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        term: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        },
                                        info: {
                                            type: 'text'
                                        }
                                    }
                                },
                                synonym: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        term: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        },
                                        synonyms: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        }
                                    }
                                },
                                stopword: {
                                    properties: {
                                        timestamp: {
                                            type: 'date',
                                            format: 'date_time'
                                        },
                                        madeby: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        label: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        term: {
                                            type: 'text',
                                            fields: {
                                                keyword: {
                                                    type: 'text',
                                                    analyzer: 'keyword',
                                                    fielddata: true
                                                },
                                                prefix: {
                                                    type: 'text',
                                                    analyzer: 'prefix_analyzer',
                                                    search_analyzer: 'prefix_analyzer_search'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-kobrick',
                defaults: [
                    {
                        id: 'usernoun:' + uuid(),
                        doc: {
                            type: 'usernoun',
                            usernoun: {
                                timestamp: now_datetime,
                                madeby: 'admin',
                                label: 'common',
                                term: '아이브릭스',
                                info: '아이/nnu+브릭스/nnu'
                            }
                        }
                    },
                    {
                        id: 'synonym:' + uuid(),
                        doc: {
                            type: 'synonym',
                            synonym: {
                                timestamp: now_datetime,
                                madeby: 'admin',
                                label: 'common',
                                term: '아이브릭스',
                                synonyms: [
                                    'i-bricks',
                                    'ibricks'
                                ]
                            }
                        }
                    },
                    {
                        id: 'stopword:' + uuid(),
                        doc: {
                            type: 'stopword',
                            stopword: {
                                timestamp: now_datetime,
                                madeby: 'admin',
                                label: 'common',
                                term: '바보'
                            }
                        }
                    }
                ]
            }
        },
        speller: {
            client: 'service',
            template: {
                name: '.openquery-speller',
                body: {
                    index_patterns: ['.openquery-speller'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                },
                                keyword_analyzer: {
                                    tokenizer: 'keyword',
                                    filter: [
                                        'lowercase'
                                    ]
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                keyword: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword_analyzer',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                },
                                label: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                weight: {
                                    type: 'short'
                                },
                                typo: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-speller',
                defaults: []
            }
        },
        recommend: {
            client: 'service',
            template: {
                name: '.openquery-recommend',
                body: {
                    index_patterns: ['.openquery-recommend'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                },
                                keyword_analyzer: {
                                    tokenizer: 'keyword',
                                    filter: [
                                        'lowercase'
                                    ]
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                keyword: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword_analyzer',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                },
                                label: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                recommend: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-recommend',
                defaults: []
            }
        },
        related: {
            client: 'service',
            template: {
                name: '.openquery-related',
                body: {
                    index_patterns: ['.openquery-related'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        max_result_window: 100000,
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                },
                                keyword_analyzer: {
                                    tokenizer: 'keyword',
                                    filter: [
                                        'lowercase'
                                    ]
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                label: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                keyword: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword_analyzer',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                },
                                related: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-related',
                defaults: []
            }
        },
        related_stopword: {
            client: 'service',
            template: {
                name: '.openquery-related-stopword',
                body: {
                    index_patterns: ['.openquery-related-stopword'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        max_result_window: 10000000,
                        analysis: {
                            analyzer: {
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                },
                                keyword_analyzer: {
                                    tokenizer: 'keyword',
                                    filter: [
                                        'lowercase'
                                    ]
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                label: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                term: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-related-stopword',
                defaults: []
            }
        },
        theme: {
            client: 'service',
            template: {
                name: '.openquery-theme',
                body: {
                    index_patterns: ['.openquery-theme'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                        analysis: {
                            analyzer: {
                                keyword_analyzer: {
                                    tokenizer: 'keyword',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer: {
                                    tokenizer: 'prefix_tokenizer',
                                    filter: [
                                        'lowercase'
                                    ]
                                },
                                prefix_analyzer_search: {
                                    tokenizer: 'lowercase'
                                }
                            },
                            tokenizer: {
                                prefix_tokenizer: {
                                    type: 'edge_ngram',
                                    min_gram: 1,
                                    max_gram: 30,
                                    token_chars: [
                                        'letter',
                                        'digit'
                                    ]
                                }
                            }
                        }
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                label: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                keywords: {
                                    type: 'text',
                                    fields: {
                                        keyword: {
                                            type: 'text',
                                            analyzer: 'keyword_analyzer',
                                            fielddata: true
                                        },
                                        prefix: {
                                            type: 'text',
                                            analyzer: 'prefix_analyzer',
                                            search_analyzer: 'prefix_analyzer_search'
                                        }
                                    }
                                },
                                contents: {
                                    type: 'text',
                                    index: false
                                },
                                images: {
                                    type: 'text',
                                    index: false
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-theme',
                defaults: []
            }
        },
        popquery: {
            client: 'service',
            template: {
                name: '.openquery-popquery',
                body: {
                    index_patterns: ['.openquery-popquery'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        auto_expand_replicas: "0-2",
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                madeby: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                label: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                popqueryJSON: {
                                    type: 'text',
                                },
                                hotqueryJSON: {
                                    type: 'text',
                                },
                                rawqueryJSON: {
                                    type: 'text',
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-popquery',
                defaults: [
                ]
            }
        },
        querylog: {
            client: 'stats',
            template: {
                name: '.openquery-querylog',
                body: {
                    index_patterns: ['.openquery-querylog-*'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        number_of_replicas: 0,
                        refresh_interval: '3s'
                    },
                    mappings: {
                        doc: {
                            dynamic: 'strict',
                            properties: {
                                indices: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                timestamp: {
                                    type: 'date',
                                    format: 'date_time'
                                },
                                query: {
                                    type: 'text',
                                    analyzer: 'keyword',
                                    fielddata: true
                                },
                                total: {
                                    type: 'long'
                                },
                                took: {
                                    type: 'long'
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-querylog-',
                defaults: [
                ]
            }
        },
        monitor_cluster: {
            client: 'stats',
            template: {
                name: '.openquery-monitor-cluster',
                body: {
                    index_patterns: ['.openquery-monitor-cluster-*'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        number_of_replicas: 0,
                        refresh_interval: '3s'
                    },
                    mappings: {
                    }
                }
            },
            index: {
                name: '.openquery-monitor-cluster-',
                defaults: [
                ]
            }
        },
        monitor_nodes: {
            client: 'stats',
            template: {
                name: '.openquery-monitor-nodes',
                body: {
                    index_patterns: ['.openquery-monitor-nodes-*'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        number_of_replicas: 0,
                        refresh_interval: '3s'
                    },
                    mappings: {
                        doc: {
                            properties: {
                                indices: {
                                    properties: {
                                        search: {
                                            properties: {
                                                search_rate: {
                                                    type: 'float'
                                                },
                                                search_latency: {
                                                    type: 'float'
                                                }
                                            }
                                        },
                                        indexing: {
                                            properties: {
                                                index_rate: {
                                                    type: 'float'
                                                },
                                                index_latency: {
                                                    type: 'float'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-monitor-nodes-',
                defaults: [
                ]
            }
        },
        monitor_indices: {
            client: 'stats',
            template: {
                name: '.openquery-monitor-indices',
                body: {
                    index_patterns: ['.openquery-monitor-indices-*'],
                    order: 0,
                    settings: {
                        number_of_shards: 1,
                        number_of_replicas: 0,
                        refresh_interval: '3s'
                    },
                    mappings: {
                        doc: {
                            properties: {
                                total: {
                                    properties: {
                                        search: {
                                            properties: {
                                                search_rate: {
                                                    type: 'float'
                                                },
                                                search_latency: {
                                                    type: 'float'
                                                }
                                            }
                                        },
                                        indexing: {
                                            properties: {
                                                index_rate: {
                                                    type: 'float'
                                                },
                                                index_latency: {
                                                    type: 'float'
                                                }
                                            }
                                        }
                                    }
                                },
                                primaries: {
                                    properties: {
                                        search: {
                                            properties: {
                                                search_rate: {
                                                    type: 'float'
                                                },
                                                search_latency: {
                                                    type: 'float'
                                                }
                                            }
                                        },
                                        indexing: {
                                            properties: {
                                                index_rate: {
                                                    type: 'float'
                                                },
                                                index_latency: {
                                                    type: 'float'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            index: {
                name: '.openquery-monitor-indices-',
                defaults: [
                ]
            }
        }
    },
    security: {
        rsa: {
            privatekey:
                '-----BEGIN RSA PRIVATE KEY-----' + '\n' +
                'MIIEpQIBAAKCAQEAsQmuONoJMaE1lIBOm7goZqhhUcAJ1ghr4xW3uvE6u+bArgMW' + '\n' +
                '8/nJo4ja5YJ4RRjftefTScEX1KFAQzCZk2HPFMTO4jnWxc6y/dNVCqMz3yQn1I9M' + '\n' +
                'FTGuUXoPn0cajAslNTd0bsHkY2LrmH6fqMYkD+SAkEc6sTceDJueNh7gKLVxLeLS' + '\n' +
                'MBAu01ngSVfLTc2TzJOWHp2hWHKTuaeLHI+9Gw1xI5WEDCcE5f1o7/83wJnSRZau' + '\n' +
                'wpRTKwsCyXV7uOgZKuKexswcZxtWM7OM6OaKTuuWy85PSjk/tUpyvYID3Z3CYEc0' + '\n' +
                'w2CumIeb15kw5AZ9m2MKI0m5TX/jjzQvHh4GmwIDAQABAoIBAQCatWH5rpgwNbez' + '\n' +
                '8ThAnns30tdQ8GfoEW3ugVEQ3bO89pbUukB5roSGE5duz0g44dbFiTQ8FLC1kMCu' + '\n' +
                'tq7Oe7/SX3aHfZHxRINoiyCa7inrSxY/i4YqU0MJUoiKYUGStj6qta5bB7eFHrHR' + '\n' +
                'jn4JqDVlagLrkkN5EDiDPg7RLsQm7YiWroiiHkQF2VFg0z6VKDMMMf6W72rbUrO4' + '\n' +
                'avAegwdjT7PaSsds+sRpiLIoGODjzBLp5gceJ9yWx3wDbSQV9sHJW+8SKbl0HF3z' + '\n' +
                'yQcARQ7MccTYnyrwc0EDfjoH3e0xid2b+wBGAG+9rTqqrYa7pSNmqTVbc3wkQvEG' + '\n' +
                '+dFqSkC5AoGBAPUUHKJ0WroaMrw7axOXb51sOLAQMvxl0UiOqBALz3W7WeaY2xpy' + '\n' +
                'PinCN7jy+wAwnU8Pxy4pEKYC2wOhEX5wYsKHSl2RFmVcdKJY6i8nvlnNvcfvzKFB' + '\n' +
                'kbFAU3hP4bzCH/waBtRm3tVrFph6oFFqdMdn9ZKYVGb9xAGuHWmbOZqnAoGBALjt' + '\n' +
                'WdrtCjgvlDPopG1m1W9dDA7k8tYkGeuSkHrZTy80AcT9yFQsWFuZ3TElDvDJSqhv' + '\n' +
                'sCU4GIX09zhR+oJSnWELbLKF9Kv/PXl9Tlp7LeNtMzhKfauDst0KSswArNH7pZ1f' + '\n' +
                '9KCHITaM4m/vUX0HARgpS8EbUkNaAWujyvju9JbtAoGANzEjTbaUZArYWCmtcIkP' + '\n' +
                'Gs2van8LbGnlmsh9srdmLiZWFadg2HDX7QGPGPinbCCGnLJ58bxPwoMsHYIddXML' + '\n' +
                '2rErHy04dPVAUvthKeNya7j4v1kSpVIl5FwPMC4VMTQqjdSyqwzLrBZkzUv4ZL1r' + '\n' +
                'tSiFVlE12MfXZ2V1vD232EsCgYEAsIVwRjgKj0NrdnlVq1CD3/+zqOwGmT5wt5t5' + '\n' +
                '6qpQmcBNCBswBJkn5phiuaykLFgYuduTCpQXZJdG/S3TsF7n92COa4LO4PeNWNCx' + '\n' +
                '4FDAptzwDYWdnADk1XYjm8PxM6fAmQ6lVi5nF8k3xJ1u7aen9cZFl5la1wutW3BI' + '\n' +
                'KYL/WqkCgYEAr/8lbhhrRfGO2QJV7YSxb7B+bClCdBpovBcH/W8m2P1v4SrwKkkY' + '\n' +
                '9808ihyjoFDx23PEWW7b9jTx1fhZWWd3pfBt2XCmaU7NuAJpIvuvflg54f/iZV9e' + '\n' +
                '/H7/tSldIbGHad1O4fQ6Cm4G+kfeIkrQp6L4orwmZs9au6oyhAaQAXE=' + '\n' +
                '-----END RSA PRIVATE KEY-----',
            publickey:
                '-----BEGIN PUBLIC KEY-----' + '\n' +
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsQmuONoJMaE1lIBOm7go' + '\n' +
                'ZqhhUcAJ1ghr4xW3uvE6u+bArgMW8/nJo4ja5YJ4RRjftefTScEX1KFAQzCZk2HP' + '\n' +
                'FMTO4jnWxc6y/dNVCqMz3yQn1I9MFTGuUXoPn0cajAslNTd0bsHkY2LrmH6fqMYk' + '\n' +
                'D+SAkEc6sTceDJueNh7gKLVxLeLSMBAu01ngSVfLTc2TzJOWHp2hWHKTuaeLHI+9' + '\n' +
                'Gw1xI5WEDCcE5f1o7/83wJnSRZauwpRTKwsCyXV7uOgZKuKexswcZxtWM7OM6OaK' + '\n' +
                'TuuWy85PSjk/tUpyvYID3Z3CYEc0w2CumIeb15kw5AZ9m2MKI0m5TX/jjzQvHh4G' + '\n' +
                'mwIDAQAB' + '\n' +
                '-----END PUBLIC KEY-----'
        }
    }
};
