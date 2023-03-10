import fs from 'fs'
import path from 'path'

export function init(args, configs) {
  let messages = []

  let tailwindConfigLocation = path.resolve(args['_'][1] ?? `./${configs.tailwind}`)
  if (fs.existsSync(tailwindConfigLocation)) {
    messages.push(`${path.basename(tailwindConfigLocation)} already exists.`)
  } else {
    let stubFile = fs.readFileSync(
      args['--full']
        ? path.resolve(__dirname, '../../../../stubs/defaultConfig.stub.js')
        : path.resolve(__dirname, '../../../../stubs/simpleConfig.stub.js'),
      'utf8'
    )

    // Change colors import
    stubFile = stubFile.replace('../colors', 'tailwindcss/colors')

    fs.writeFileSync(tailwindConfigLocation, stubFile, 'utf8')

    messages.push(`Created Tailwind CSS config file: ${path.basename(tailwindConfigLocation)}`)
  }

  if (messages.length > 0) {
    console.log()
    for (let message of messages) {
      console.log(message)
    }
  }
}
