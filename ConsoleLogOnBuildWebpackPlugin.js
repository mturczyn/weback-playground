const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, (compilation) => {
            console.log(
                '========================================================================'
            )
            console.log(
                '================ The webpack build process is starting! ================'
            )
            console.log(
                '========================================================================'
            )
        })
    }
}

module.exports = ConsoleLogOnBuildWebpackPlugin
