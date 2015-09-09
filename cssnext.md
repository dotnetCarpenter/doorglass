
  Usage: cssnext [options] [<input> [<output>]]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -C, --config <file>         use the config file
    -b, --browsers <items>      browsers list (comma separated)
    -I, --no-import             do not inline @import
    -U, --no-url                do not adjust url()
    -c, --compress              compress output
    -s, --sourcemap             add sourcemap
    -w, --watch                 watch the input file for changes
    -v, --verbose               verbose output
    --no-custom-properties      disable custom properties support
    --no-calc                   disable calc support
    --no-custom-media           disable custom media support
    --no-media-queries-range    disable media queries range support
    --no-custom-selectors       disable custom selectors support
    --no-color-rebeccapurple    disable color rebeccapurple support
    --no-color-hwb              disable color hwb support
    --no-color-gray             disable color gray support
    --no-color-hex-alpha        disable color hex alpha support
    --no-color-function         disable color function support
    --no-font-variant           disable font variant support
    --no-filter                 disable filter support
    --no-rem                    disable rem support
    --no-pseudo-elements        disable pseudo elements support
    --no-pseudo-class-matches   disable pseudo class matches support
    --no-pseudo-class-not       disable pseudo class not support
    --no-pseudo-class-any-link  disable pseudo class any link support
    --no-color-rgba             disable color rgba support
    --no-autoprefixer           disable autoprefixer support

                            Examples:
                            # pass an input and output file
                            $ cssnext input.css output.css
                            # start cssnext watcher (need input & output)
                            $ cssnext --watch input.css output.css
                            # using stdin and stdout
                            $ cat input.css | cssnext > output.css
