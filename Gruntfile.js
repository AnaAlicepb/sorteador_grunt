module.exports = function(grunt) { // Define a função que será exportada como módulo
    
    grunt.initConfig({ // Inicializa a configuração do Grunt
        pkg: grunt.file.readJSON('package.json'), // Lê o arquivo package.json e o armazena na variável pkg
        
        less: { // Define a tarefa 'less' para compilar arquivos Less
            development: { // Define uma configuração 'development' para a tarefa 'less'
                files: { // Define arquivos de saída
                    'dev/styles/main.css': 'src/styles/main.less' // Define o arquivo de saída 'main.css' e o arquivo de entrada 'main.less' na pasta 'src/styles'
                }
            },
            production: { // Define uma configuração 'production' para a tarefa 'less'
                options: { // Define opções para a tarefa 'less' em ambiente de produção
                    compress: true // Habilita a compressão do arquivo de saída
                },
                files: { // Define arquivos de saída
                    'dist/styles/main.min.css': 'src/styles/main.less' // Nomeie o arquivo de saída como 'main.min.css' para o ambiente de produção
                }
            }
        },
        
        watch: { // Define a tarefa 'watch' para observar mudanças em arquivos Less e HTML
            less: { // Define uma configuração para a tarefa 'less' dentro do watch
                files: ['src/styles/**/*.less'], // Define quais arquivos Less serão observados
                tasks: ['less:development'] // Define quais tarefas serão executadas quando houver mudanças nos arquivos Less
            },
            html: { // Define uma configuração para a tarefa 'html' dentro do watch
                files: ['src/index.html'], // Define quais arquivos HTML serão observados
                tasks: ['replace:dev'] // Define quais tarefas serão executadas quando houver mudanças nos arquivos HTML
            }
        },

        replace: { // Define a tarefa 'replace' para substituir texto em arquivos específicos
            dev: { // Define uma configuração chamada 'dev' para a tarefa 'replace'
                options: { // Define as opções para a tarefa 'replace' em ambiente de desenvolvimento
                    patterns: [ // Define os padrões de substituição
                        {
                            match: 'ENDERECO_DO_CSS', // Texto a ser substituído
                            replacement: './styles/main.css' // Novo texto que substituirá o texto antigo
                        },
                        {
                            match: 'ENDERECO_DO_JS', 
                            replacement: '../src/scripts/main.js' 
                        }  
                    ]
                },
                files: [ // Define os arquivos em que a substituição será realizada
                    {
                        expand: true, // Habilita a expansão de padrões
                        flatten: true, // Não mantém a estrutura de diretórios original
                        src: ['src/index.html'], // Define os arquivos de origem
                        dest: 'dev/' // Define o diretório de destino para os arquivos modificados
                    }
                ]
            },
            dist: { // Define uma configuração chamada 'dist' para a tarefa 'replace'
                options: { // Define as opções para a tarefa 'replace' em ambiente de produção
                    patterns: [ // Define os padrões de substituição
                        {
                            match: 'ENDERECO_DO_CSS', // Texto a ser substituído
                            replacement: './styles/main.min.css' // Novo texto que substituirá o texto antigo
                        } 
                    ]
                },
                files: [ // Define os arquivos em que a substituição será realizada
                    {
                        expand: true, // Habilita a expansão de padrões
                        flatten: true, // Não mantém a estrutura de diretórios original
                        src: ['prebuild/index.html'], // Define os arquivos de origem
                        dest: 'dist/' // Define o diretório de destino para os arquivos modificados
                    }
                ]
            }
        },

        htmlmin: { // Define a tarefa 'htmlmin' para minificar arquivos HTML
            dist: { // Define uma configuração 'dist' para a tarefa 'htmlmin'
                options: { // Define opções para a tarefa 'htmlmin'
                    removeComments: true, // Define se os comentários HTML devem ser removidos
                    collapseWhitespace: true // Define se os espaços em branco devem ser colapsados
                },
                files: { // Define os arquivos a serem minificados
                    'prebuild/index.html': 'src/index.html' // Define o arquivo de origem e o arquivo de destino da minificação
                }
            }
        },
        
        clean: ['prebuild'] // Define a tarefa 'clean' para limpar o diretório 'prebuild'
    });

    // Carrega os plugins necessários para as tarefas definidas anteriormente
    grunt.loadNpmTasks('grunt-contrib-less'); // Carrega o pacote 'grunt-contrib-less' para compilar arquivos Less
    grunt.loadNpmTasks('grunt-contrib-watch'); // Carrega o pacote 'grunt-contrib-watch' para observar mudanças em tempo real nos arquivos
    grunt.loadNpmTasks('grunt-replace'); // Carrega o pacote 'grunt-replace' para substituir texto em arquivos
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // Carrega o pacote 'grunt-contrib-htmlmin' para minificar arquivos HTML
    grunt.loadNpmTasks('grunt-contrib-clean'); // Carrega o pacote 'grunt-contrib-clean' para limpar diretórios
    
    // Define a tarefa 'default' como padrão
    grunt.registerTask('default', ['watch']); // Define a tarefa 'watch' como padrão, observando mudanças nos arquivos Less para o ambiente de desenvolvimento
    
    // Define a tarefa 'build' para compilar arquivos Less e minificar arquivos HTML para produção
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean']); // Define a tarefa 'build' para compilar arquivos Less e minificar arquivos HTML para o ambiente de produção
};
