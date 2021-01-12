const MODE = process.env.NODE_ENV.toUpperCase()

const links = {
  backend: process.env[`REACT_APP_${MODE}_BACK`]
}

export default links
